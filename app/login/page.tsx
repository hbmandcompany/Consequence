import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = softwareMetadata({
  title: "Client Login",
  description: "Sign in to Consequence.software — studio, treasury, and marketplace access.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      title="Client login"
      lede="Access your studio catalog, settlement history, and partner dashboards. Sessions persist in this browser for the demo."
    />
  );
}
