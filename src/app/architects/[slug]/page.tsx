import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import architectsData from "@/data/architects.json";
import propertiesData from "@/data/properties.json";
import { type Architect, type Property } from "@/types";
import { ReferenceLink } from "@/components/ui/ReferenceLink";
import { ArchitectPropertiesClient } from "./ArchitectPropertiesClient";
import { isValidUrl } from "@/lib/url-helpers";

// Cast to proper types
const architects = architectsData as Architect[];
const properties = propertiesData as Property[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return architects.map((architect) => ({
    slug: architect.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const architect = architects.find((a) => a.slug === slug);
  if (!architect) return { title: "Architect Not Found" };

  return {
    title: "Usonian",
    description: architect.biography?.slice(0, 160) || `Properties by ${architect.name}`,
  };
}

export default async function ArchitectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const architect = architects.find((a) => a.slug === slug);

  if (!architect) {
    notFound();
  }

  // Get all properties by this architect
  const architectProperties = properties
    .filter((p) => p.architect_id === architect.id)
    .map((p) => ({
      ...p,
      architect_name: architect.name,
    }));

  const isTaliesin = architect.fellowship_years !== null;
  const propertyCount = architectProperties.length;
  // Split name for stacked display
  const nameParts = architect.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <>
      {/* Hero Section - Split Layout (matching property page) */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="flex-1">
              {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <Link
                href="/architects"
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
                <span className="opacity-60">ARCHITECTS</span>
                <span className="opacity-60">/</span>
                <span>{architect.name.toUpperCase()}</span>
              </Link>
            </nav>

            {/* Stacked Name */}
            <h1 className="animate-fade-up mb-6">
              {firstName}<br />
              {lastName && <span className="text-red">{lastName}</span>}
            </h1>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.1em]">
              <span className="font-bold">{propertyCount} PROPERTIES</span>
              {isTaliesin && (
                <>
                  <span className="opacity-30" aria-hidden="true">{"/"}</span><span className="opacity-30" aria-hidden="true">{"/"}</span>
                  <span className="opacity-60">TALIESIN &apos;{architect.fellowship_years?.split('-')[0]?.slice(-2)}-&apos;{architect.fellowship_years?.split('-')[1]?.slice(-2)}</span>
                </>
              )}
            </div>
            </div>

            {/* Right Column - Biography */}
            <div className="flex-1">
              <p className="text-sm leading-relaxed opacity-80 whitespace-pre-line">
                {architect.biography || `${architect.name} was a master architect of the organic architecture tradition.`}
              </p>

              {isValidUrl(architect.wikipedia_url) && (
                <>
                  <div className="border-t border-black/20 my-6"></div>
                  <div>
                    <h4 className="mb-3 text-[10px] tracking-[0.2em] opacity-50">LEARN MORE</h4>
                    <ReferenceLink url={architect.wikipedia_url} label="Wikipedia" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid Section - uses client component for sorting */}
      <section className="border-b border-black">
        <div className="container py-16">
          <ArchitectPropertiesClient
            properties={architectProperties}
            architectName={architect.name}
          />
        </div>
      </section>

    </>
  );
}
