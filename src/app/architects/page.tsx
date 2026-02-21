import Link from "next/link";
import architectsData from "@/data/architects.json";

export const metadata = {
  title: "Architects | Usonian",
  description:
    "Explore our collection of master architects, from Taliesin Fellows to independent visionaries.",
};

export default function ArchitectsPage() {
  // Sort architects by property count
  const architects = [...architectsData].sort(
    (a, b) => (b.property_count || 0) - (a.property_count || 0)
  );

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <h1 className="mb-4">Architects</h1>
          <p className="text-slate max-w-2xl text-lg">
            The masters of architectural design. Browse properties by architect,
            from Frank Lloyd Wright apprentices to independent visionaries.
          </p>
        </header>

        {/* Architects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architects.map((architect) => (
            <Link
              key={architect.id}
              href={`/architects/${architect.slug}`}
              className="group block p-6 bg-sand rounded-lg hover:bg-sand-dark transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading text-xl text-charcoal group-hover:text-terracotta transition-colors">
                    {architect.name}
                  </h3>
                  {architect.birth_year && (
                    <p className="text-sm text-slate mt-1">
                      {architect.birth_year}
                      {architect.death_year && ` - ${architect.death_year}`}
                    </p>
                  )}
                </div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-warm-white text-terracotta font-medium">
                  {architect.property_count || 0}
                </span>
              </div>

              {architect.fellowship_years && (
                <p className="text-sm text-cypress mb-3">
                  Taliesin Fellowship {architect.fellowship_years}
                </p>
              )}

              <p className="text-sm text-charcoal line-clamp-2">
                {architect.biography?.slice(0, 120)}...
              </p>

              <div className="mt-4 flex items-center gap-2 text-terracotta text-sm font-medium">
                View Properties
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
