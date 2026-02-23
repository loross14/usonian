import Link from "next/link";
import Image from "next/image";
import architectsData from "@/data/architects.json";
import { CompassIcon } from "@/components/icons/CompassIcon";
import { type Architect } from "@/types";

// Cast to proper types
const architects = architectsData as Architect[];

export const metadata = {
  title: "Usonian",
  description:
    "Explore our collection of master architects, from Taliesin Fellows to independent visionaries.",
};

export default function ArchitectsPage() {
  // Sort architects alphabetically by name
  const sortedArchitects = [...architects].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Group architects by first letter
  const groupedArchitects = sortedArchitects.reduce((acc, architect) => {
    const letter = architect.name.charAt(0).toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(architect);
    return acc;
  }, {} as Record<string, Architect[]>);

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

      {/* Architects by Letter */}
      <section className="border-b border-black">
        <div className="container py-10">
          {Object.entries(groupedArchitects).map(([letter, letterArchitects]) => (
            <div key={letter} className="mb-16 last:mb-0">
              {/* Letter Marker */}
              <div className="letter-marker">{letter}</div>

              {/* Architect List */}
              <div className="flex flex-col">
                {letterArchitects.map((architect) => {
                  const isTaliesin = architect.fellowship_years !== null;
                  const yearStr = architect.birth_year
                    ? `${architect.birth_year}${architect.death_year ? ` - ${architect.death_year}` : ' - present'}`
                    : "—";
                  const propertyCount = architect.property_count || 0;

                  return (
                    <Link
                      key={architect.id}
                      href={`/architects/${architect.slug}`}
                      className="group grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 md:gap-10 py-5 border-b border-black/10 hover:bg-black/[0.02] hover:pl-5 hover:-ml-5 hover:pr-5 hover:-mr-5 transition-all"
                    >
                      {/* Name & Fellowship */}
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="font-bold text-sm tracking-[0.02em] uppercase group-hover:underline underline-offset-4">
                          {architect.name}
                        </span>
                        {isTaliesin && (
                          <span className="fellowship-badge">
                            Taliesin {architect.fellowship_years}
                          </span>
                        )}
                      </div>

                      {/* Years */}
                      <div className="hidden md:block text-sm opacity-50 whitespace-nowrap">
                        {yearStr}
                      </div>

                      {/* Property Count */}
                      <div className="text-sm text-right min-w-[140px]">
                        <span className="font-bold">{propertyCount}</span>
                        <span className="opacity-50 ml-1">
                          {propertyCount === 1 ? 'property' : 'properties'}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
