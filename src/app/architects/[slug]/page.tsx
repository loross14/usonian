import { notFound } from "next/navigation";
import Link from "next/link";
import architectsData from "@/data/architects.json";
import propertiesData from "@/data/properties.json";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getArchitectPortraitUrl, getArchitectPortraitWideUrl } from "@/lib/architect-portraits";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return architectsData.map((architect) => ({
    slug: architect.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const architect = architectsData.find((a) => a.slug === slug);
  if (!architect) return { title: "Architect Not Found" };

  return {
    title: `${architect.name} | Usonian`,
    description: architect.biography?.slice(0, 160) || `Properties by ${architect.name}`,
  };
}

export default async function ArchitectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const architect = architectsData.find((a) => a.slug === slug);

  if (!architect) {
    notFound();
  }

  // Get all properties by this architect
  const properties = propertiesData
    .filter((p) => p.architect_id === architect.id)
    .map((p) => ({
      ...p,
      architect_name: architect.name,
    }));

  // Get architect portrait URLs
  const portraitUrl = getArchitectPortraitUrl(architect.slug);
  const portraitWideUrl = getArchitectPortraitWideUrl(architect.slug);

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-charcoal">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <ol className="flex items-center gap-2 text-sm text-slate-light">
                  <li>
                    <Link href="/architects" className="hover:text-warm-white transition-colors">
                      Architects
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-warm-white">{architect.name}</li>
                </ol>
              </nav>

              {/* Name */}
              <h1 className="text-warm-white mb-4">{architect.name}</h1>

              {/* Dates */}
              {architect.birth_year && (
                <p className="text-slate-light text-lg mb-2">
                  {architect.birth_year}
                  {architect.death_year && ` - ${architect.death_year}`}
                  {architect.birthplace && ` · Born in ${architect.birthplace}`}
                </p>
              )}

              {/* Fellowship */}
              {architect.fellowship_years && (
                <p className="text-gold font-medium mb-6">
                  Taliesin Fellowship {architect.fellowship_years}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-8 pt-6 border-t border-slate">
                <div>
                  <p className="text-3xl font-heading text-terracotta">
                    {properties.length}
                  </p>
                  <p className="text-sm text-slate-light">Properties</p>
                </div>
                {architect.birth_year && architect.death_year && (
                  <div>
                    <p className="text-3xl font-heading text-terracotta">
                      {architect.death_year - architect.birth_year}
                    </p>
                    <p className="text-sm text-slate-light">Years</p>
                  </div>
                )}
              </div>
            </div>

            {/* Architect Portrait */}
            {portraitWideUrl ? (
              <div className="bg-warm-white/5 rounded-lg overflow-hidden">
                <img
                  src={portraitWideUrl}
                  alt={`Portrait of ${architect.name}`}
                  className="w-full h-auto"
                />
              </div>
            ) : portraitUrl ? (
              <div className="flex justify-center lg:justify-end">
                <div className="bg-warm-white/5 p-6 rounded-lg">
                  <img
                    src={portraitUrl}
                    alt={`Portrait of ${architect.name}`}
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="section bg-warm-white">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="mb-6">Biography</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-charcoal leading-relaxed whitespace-pre-line">
                {architect.biography}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section className="section bg-sand">
        <div className="container">
          <h2 className="mb-8">Properties by {architect.name}</h2>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-slate text-lg">
              No properties currently listed for this architect.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-warm-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-charcoal rounded-lg">
            <div>
              <h3 className="text-warm-white mb-2">Explore More Architects</h3>
              <p className="text-slate-light">
                Discover other masters of architectural design
              </p>
            </div>
            <Link
              href="/architects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-warm-white font-medium rounded hover:bg-terracotta-dark transition-colors"
            >
              View All Architects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
