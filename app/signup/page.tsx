import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = softwareMetadata({
  title: "Sign Up",
  description: "Create your producer identity on Consequence.software.",
  path: "/signup",
  noIndex: true,
});

export default function SignupPage() {
  return (
    <AuthShell
      mode="signup"
      title="Sign up"
      lede="Create your producer identity on Consequence — publish to the marketplace, split royalties, and settle in USDC when you are ready."
    />
  );
}
