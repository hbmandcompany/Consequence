import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Sign Up — Consequence",
  description: "Create a Consequence account for Shop and treasury access.",
};

export default function SignupPage() {
  return (
    <AuthShell
      mode="signup"
      title="Sign up"
      lede="Create your producer identity on Consequence — publish to the marketplace, split royalties, and settle in USDC when you are ready."
    />
  );
}
