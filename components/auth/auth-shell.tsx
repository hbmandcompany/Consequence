import Link from "next/link";
import { Mark } from "@/components/mark";
import { Container, Display, Section } from "@/components/ui";
import { AuthForm } from "./auth-form";

export function AuthShell({
  mode,
  title,
  lede,
}: {
  mode: "login" | "signup";
  title: string;
  lede: string;
}) {
  return (
    <Section className="min-h-[calc(100vh-4rem)] pt-28 pb-24 flex items-center">
      <Container className="w-full">
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-center">
          <div className="col-span-12 md:col-span-5 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group mb-10">
              <Mark className="w-6 h-6 text-ink transition-transform duration-700 group-hover:rotate-180" />
              <span className="font-display text-xl tracking-tight">Consequence</span>
            </Link>
            <Display as="h1" className="text-[clamp(36px,5vw,72px)] max-w-[14ch]">
              {title}
            </Display>
            <p className="mt-8 max-w-[40ch] text-[15px] text-ink/65 leading-[1.7]">{lede}</p>
            <p className="mt-6 text-[11px] tabular uppercase tracking-[0.18em] text-ink/40">
              Demo auth · local session · no server required
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
            <div className="bg-snow-0 border border-ink/10 p-8 lg:p-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.12)]">
              <AuthForm mode={mode} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
