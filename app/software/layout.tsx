import { softwareMetadata } from "@/lib/seo/metadata";

export const metadata = softwareMetadata({
  title: "Software",
  description: "Consequence.software — inference, simulation, and digital twins.",
  path: "/software",
});

export default function SoftwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
