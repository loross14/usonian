import Link from "next/link";
import architectsData from "@/data/architects.json";
import propertiesData from "@/data/properties.json";
import { PrairieLines } from "@/components/ui/PrairieLines";
import { NewsletterCTA } from "@/components/ui/NewsletterCTA";
import { StarIcon } from "@/components/icons/StarIcon";
import { type Architect, type Property } from "@/types";

// Cast to proper types
const architects = architectsData as Architect[];
const properties = propertiesData as Property[];

export const metadata = {
  title: "Architects | Usonian",
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

  // Stats
  const totalArchitects = architects.length;
  const taliesinCount = architects.filter((a) => a.fellowship_years).length;
  const totalProperties = properties.length;

  // Get year range
  const years = architects
    .flatMap((a) => [a.birth_year, a.death_year])
    .filter((y): y is number => y !== null && y !== undefined);
  const yearRange = years.length > 0
    ? `${Math.min(...years)}-${new Date().getFullYear()}`
    : "—";

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-black">
        <div className="container py-16 md:py-24">
          <h1 className="animate-fade-up mb-4">ARCHITECTS</h1>
          <p className="text-xs tracking-[0.15em] opacity-50 max-w-xl animate-fade-up animate-delay-1">
            <span className="text-red font-bold">{totalArchitects}</span> MASTERS OF THE ORGANIC TRADITION.
            BROWSE ALPHABETICALLY OR FILTER BY FELLOWSHIP.
          </p>
        </div>
      </section>

      {/* Prairie Lines */}
      <div className="container">
        <PrairieLines />
      </div>

      {/* Stats Bar */}
      <section className="border-b border-black">
        <div className="data-grid grid-cols-2 md:grid-cols-4">
          <div className="data-cell animate-fade-up animate-delay-1">
            <div className="data-label">Architects</div>
            <div className="data-value">{totalArchitects}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-2">
            <div className="data-label">Taliesin Fellows</div>
            <div className="data-value text-red">{taliesinCount}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-3">
            <div className="data-label">Properties</div>
            <div className="data-value">{totalProperties}</div>
          </div>
          <div className="data-cell animate-fade-up animate-delay-4">
            <div className="data-label">Time Span</div>
            <div className="data-value">{yearRange}</div>
          </div>
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
                        <StarIcon size={14} active={isTaliesin} />
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

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
