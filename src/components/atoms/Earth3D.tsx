"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Mesh, TextureLoader, SRGBColorSpace, Color, AdditiveBlending, DoubleSide, ShaderMaterial, FrontSide, NoToneMapping } from 'three';

const EARTH_TEXTURE = '/assets/earth.webp';
const EARTH_NORMAL = '/assets/images/earth_normal.webp';
const EARTH_SPECULAR = '/assets/images/earth_specular.webp';
const EARTH_NIGHT = '/assets/images/earth_night.webp';
const EARTH_CLOUDS = '/assets/images/earth_clouds.webp';

interface Earth3DProps {
  /** Diameter in logical pixels for the container */
  size: number;
}

/**
 * The Earth sphere mesh — auto-rotates and applies the day-map, normal relief,
 * specular oceans, and night lights with smooth terminator.
 * Exact 1:1 match of reference 3D dark globe.
 */
function EarthSphere({ onLoaded }: { onLoaded?: () => void }): React.JSX.Element {
  const meshRef = useRef<Mesh>(null);

  const [dayMap, normalMap, specularMap, nightMap] = useLoader(TextureLoader, [
    EARTH_TEXTURE,
    EARTH_NORMAL,
    EARTH_SPECULAR,
    EARTH_NIGHT,
  ]);

  const { gl } = useThree();
  const maxAnisotropy = useMemo(() => gl.capabilities.getMaxAnisotropy(), [gl]);

  useEffect(() => {
    /* eslint-disable react-hooks/immutability */
    dayMap.colorSpace = SRGBColorSpace;
    dayMap.needsUpdate = true;

    nightMap.colorSpace = SRGBColorSpace;
    nightMap.needsUpdate = true;

    const anisotropy = Math.min(maxAnisotropy, 4);
    dayMap.anisotropy = anisotropy;
    nightMap.anisotropy = anisotropy;
    normalMap.anisotropy = anisotropy;
    specularMap.anisotropy = anisotropy;

    normalMap.needsUpdate = true;
    specularMap.needsUpdate = true;

    if (gl && typeof gl.initTexture === 'function') {
      try {
        gl.initTexture(dayMap);
        gl.initTexture(nightMap);
        gl.initTexture(normalMap);
        gl.initTexture(specularMap);
      } catch {
        // Safe no-op
      }
    }

    onLoaded?.();
    /* eslint-enable react-hooks/immutability */
  }, [dayMap, nightMap, normalMap, specularMap, maxAnisotropy, gl, onLoaded]);

  // Slow continuous rotation (~2.4° per second)
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.04 * delta;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 23.44 * (Math.PI / 180)]}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshPhongMaterial
        map={dayMap}
        normalMap={normalMap}
        specularMap={specularMap}
        specular={new Color(0x333333)}
        shininess={15}
        onBeforeCompile={(shader) => {
          shader.uniforms.tNight = { value: nightMap };

          shader.fragmentShader = `
            uniform sampler2D tNight;
            ${shader.fragmentShader}
          `;

          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <emissivemap_fragment>',
            `
            #include <emissivemap_fragment>
            
            vec4 nightColor = texture2D( tNight, vMapUv );
            
            // Assume sun light is at [5.0, 3.0, 5.0] in world space
            vec3 lightDirWorld = normalize(vec3(5.0, 3.0, 5.0));
            vec3 lightDirView = normalize((viewMatrix * vec4(lightDirWorld, 0.0)).xyz);
            
            // Dot product of normal and light dir
            float nDotL = dot(vNormal, lightDirView);
            
            // When nDotL is less than 0, it is night. Smoothstep gives a soft terminator.
            float nightFactor = smoothstep(0.1, -0.2, nDotL);
            
            // Add night lights to totalEmissiveRadiance
            totalEmissiveRadiance += nightColor.rgb * nightFactor * vec3(1.0, 0.9, 0.8) * 1.5;
            `
          ).replace(
            '#include <specularmap_fragment>',
            `
            #include <specularmap_fragment>
            #ifdef USE_SPECULARMAP
              // Deepen and darken the water where specular map is bright
              diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.4, specularStrength);
            #endif
            `
          );
        }}
      />
    </mesh>
  );
}

/**
 * Cloud layer — slightly larger sphere wrapping the Earth.
 */
function CloudSphere(): React.JSX.Element {
  const meshRef = useRef<Mesh>(null);
  const cloudMap = useLoader(TextureLoader, EARTH_CLOUDS);
  const { gl } = useThree();

  useEffect(() => {
    if (cloudMap) {
      /* eslint-disable react-hooks/immutability */
      cloudMap.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), 4);
      cloudMap.needsUpdate = true;
      if (gl && typeof gl.initTexture === 'function') {
        try {
          gl.initTexture(cloudMap);
        } catch {
          // Safe no-op
        }
      }
      /* eslint-enable react-hooks/immutability */
    }
  }, [cloudMap, gl]);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0475 * delta;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 23.44 * (Math.PI / 180)]} scale={[1.006, 1.006, 1.006]}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshPhongMaterial
        map={cloudMap}
        transparent={true}
        opacity={0.8}
        blending={AdditiveBlending}
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  );
}

/**
 * Atmosphere glow — a slightly larger, semi-transparent sphere with a
 * custom Fresnel shader that brightens at the edges (limb darkening
 * inversion) to simulate atmospheric scattering.
 */
function AtmosphereGlow(): React.JSX.Element {
  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = 1.0 - dot(viewDir, vNormal);
          fresnel = pow(fresnel, 3.0);
          vec3 atmosphereColor = mix(
            vec3(0.3, 0.6, 1.0),
            vec3(0.6, 0.8, 1.0),
            fresnel
          );
          gl_FragColor = vec4(atmosphereColor, fresnel * 0.6);
        }
      `,
      transparent: true,
      side: FrontSide,
      depthWrite: false,
      blending: AdditiveBlending,
    });
  }, []);

  return (
    <mesh scale={[1.08, 1.08, 1.08]}>
      <sphereGeometry args={[1, 96, 96]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

/**
 * Scene setup — camera, lights, and the earth + atmosphere meshes.
 */
function EarthScene({ onLoaded }: { onLoaded?: () => void }): React.JSX.Element {
  return (
    <>
      {/* Ambient fill so the dark side isn't pitch black */}
      <ambientLight intensity={0.3} />
      {/* Main sunlight from upper-right */}
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      {/* Subtle rim light from behind */}
      <directionalLight position={[-3, -1, -5]} intensity={0.2} />

      <group scale={[0.8505, 0.8505, 0.8505]}>
        <EarthSphere onLoaded={onLoaded} />
        <CloudSphere />
        <AtmosphereGlow />
      </group>
    </>
  );
}

class EarthErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean }> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: unknown) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} />
      );
    }
    return this.props.children;
  }
}

// ── Main exported component ────────────────────────────────────────────

export function Earth3D({ size }: Earth3DProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'transparent',
      }}
    >
      <EarthErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          frameloop={isVisible ? 'always' : 'never'}
          gl={{
            alpha: true,
            antialias: true,
            stencil: false,
            powerPreference: 'high-performance',
            toneMapping: NoToneMapping,
            outputColorSpace: SRGBColorSpace,
          }}
          camera={{ position: [0, 0, 2.8], fov: 45 }}
          style={{
            width: size,
            height: size,
            backgroundColor: 'transparent',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease-out',
          }}
        >
          <React.Suspense fallback={null}>
            <EarthScene onLoaded={handleLoaded} />
          </React.Suspense>
        </Canvas>
      </EarthErrorBoundary>
    </div>
  );
}
