import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Client Login — Consequence",
  description: "Sign in to Consequence Shop and treasury surfaces.",
};

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      title="Client login"
      lede="Access your studio catalog, settlement history, and partner dashboards. Sessions persist in this browser for the demo."
    />
  );
}
