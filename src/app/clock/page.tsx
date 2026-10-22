import { redirect } from "next/navigation";
import { VEDIC_CLOCK_APP_URL } from "@/config";

export default function ClockPage() {
  redirect(VEDIC_CLOCK_APP_URL);
}
