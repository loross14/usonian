import Link from "next/link";
import Image from "next/image";
import architectsData from "@/data/architects.json";
import { CompassIcon } from "@/components/icons/CompassIcon";
import { ArchitectsDirectoryClient } from "./ArchitectsDirectoryClient";
import { type Architect } from "@/types";

// Cast to proper types
const architects = architectsData as Architect[];

export const metadata = {
  title: "Usonian",
  description:
    "Explore our collection of master architects, from Taliesin Fellows to independent visionaries.",
};

export default function ArchitectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/homes"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.1em] hover:underline underline-offset-4 transition-opacity"
            >
              <Image
                src="/icons/logo-transparent.png"
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="opacity-60">ARCHIVE</span>
              <span className="opacity-60">/</span>
              <span>ARCHITECTS</span>
            </Link>
          </nav>

          <h1 className="animate-fade-up">
            ARCHITECTS<CompassIcon size="period" className="ml-1 align-baseline" />
          </h1>
        </div>
      </section>

      {/* Architects Directory - uses client component for sorting */}
      <section className="border-b border-black">
        <div className="container py-10">
          <ArchitectsDirectoryClient architects={architects} />
        </div>
      </section>
    </>
  );
}
