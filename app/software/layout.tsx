import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WorkSpace — The engine",
  description:
    "Inference, simulation, and digital twins — full narrative on the Consequence homepage.",
};

export default function SoftwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
