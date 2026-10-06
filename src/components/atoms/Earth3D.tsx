"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Mesh, TextureLoader, SRGBColorSpace, Color, AdditiveBlending, DoubleSide, ShaderMaterial, FrontSide, NoToneMapping } from 'three';

const EARTH_TEXTURE = '/assets/earth.jpg';
const EARTH_NORMAL = '/assets/images/earth_normal.jpg';
const EARTH_SPECULAR = '/assets/images/earth_specular.jpg';
const EARTH_CLOUDS = '/assets/images/earth_clouds.png';

interface Earth3DProps {
  /** Diameter in logical pixels for the container */
  size: number;
}

/**
 * The Earth sphere mesh — auto-rotates and applies the day-map texture.
 * Exact 1:1 port of Vedic Clock app (Earth3D.native.tsx).
 */
function EarthSphere(): React.JSX.Element {
  const meshRef = useRef<Mesh>(null);

  const [dayMap, normalMap, specularMap] = useLoader(TextureLoader, [
    EARTH_TEXTURE,
    EARTH_NORMAL,
    EARTH_SPECULAR,
  ]);

  const { gl } = useThree();
  const maxAnisotropy = useMemo(() => gl.capabilities.getMaxAnisotropy(), [gl]);

  useMemo(() => {
    dayMap.colorSpace = SRGBColorSpace;
    dayMap.needsUpdate = true;
    
    dayMap.anisotropy = maxAnisotropy;
    normalMap.anisotropy = maxAnisotropy;
    specularMap.anisotropy = maxAnisotropy;
    
    normalMap.needsUpdate = true;
    specularMap.needsUpdate = true;
  }, [dayMap, normalMap, specularMap, maxAnisotropy]);

  // Slow continuous rotation
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.04 * delta; // ~2.4° per second
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 23.44 * (Math.PI / 180)]}>
      <sphereGeometry args={[1, 256, 256]} />
      <meshPhongMaterial
        map={dayMap}
        normalMap={normalMap}
        specularMap={specularMap}
        specular={new Color(0x444444)}
        shininess={25}
        onBeforeCompile={(shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <specularmap_fragment>',
            `
            #include <specularmap_fragment>
            #ifdef USE_SPECULARMAP
              // Deepen ocean water to deep cosmic sapphire
              diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.52, specularStrength);
            #endif

            // Contrast: deepen darks and rich midtones (rich emerald green & deep ocean blue)
            diffuseColor.rgb = pow(diffuseColor.rgb, vec3(1.22));

            // Saturation boost: make colors intensely poppy and vibrant
            float luma = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
            diffuseColor.rgb = mix(vec3(luma), diffuseColor.rgb, 1.55);
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

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0475 * delta;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 23.44 * (Math.PI / 180)]} scale={[1.006, 1.006, 1.006]}>
      <sphereGeometry args={[1, 256, 256]} />
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
            vec3(0.18, 0.45, 0.95),
            vec3(0.45, 0.75, 1.0),
            fresnel
          );
          gl_FragColor = vec4(atmosphereColor, fresnel * 0.65);
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
      <sphereGeometry args={[1, 256, 256]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

/**
 * Scene setup — camera, lights, and the earth + atmosphere meshes.
 * Exact 1:1 port of Vedic Clock app.
 */
function EarthScene(): React.JSX.Element {
  return (
    <>
      {/* Ambient fill tuned so colors stay punchy and saturated */}
      <ambientLight intensity={0.18} />
      {/* Main sunlight from upper-right */}
      <directionalLight position={[5, 3, 5]} intensity={1.45} />
      {/* Subtle rim light from behind */}
      <directionalLight position={[-3, -1, -5]} intensity={0.2} />

      <group scale={[0.8505, 0.8505, 0.8505]}>
        <EarthSphere />
        <CloudSphere />
        <AtmosphereGlow />
      </group>
    </>
  );
}

class EarthErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width: '100%', height: '100%', backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/assets/earth.jpg" alt="Earth fallback" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Main exported component ────────────────────────────────────────────

export function Earth3D({ size }: Earth3DProps): React.JSX.Element {
  return (
    <div
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
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: NoToneMapping,
            outputColorSpace: SRGBColorSpace,
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = NoToneMapping;
            gl.outputColorSpace = SRGBColorSpace;
          }}
          camera={{ position: [0, 0, 2.8], fov: 45 }}
          style={{
            width: size,
            height: size,
            backgroundColor: 'transparent',
          }}
        >
          <React.Suspense fallback={null}>
            <EarthScene />
          </React.Suspense>
        </Canvas>
      </EarthErrorBoundary>
    </div>
  );
}
