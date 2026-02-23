import Link from "next/link";
import Image from "next/image";
import architectsData from "@/data/architects.json";
import { CompassIcon } from "@/components/icons/CompassIcon";
import { ArchitectsDirectoryClient } from "./ArchitectsDirectoryClient";
import { type Architect } from "@/types";
import { SiteHeader } from "@/components/layout/SiteHeader";

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
      {/* Site Header with Breadcrumb */}
      <SiteHeader title="Architects" />

      {/* Architects Directory - uses client component for sorting */}
      <section className="border-b border-black">
        <div className="container py-10">
          <ArchitectsDirectoryClient architects={architects} />
        </div>
      </section>
    </>
  );
}
