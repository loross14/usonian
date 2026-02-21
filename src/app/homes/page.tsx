import { PropertyGrid } from "@/components/property/PropertyGrid";
import propertiesData from "@/data/properties.json";
import architectsData from "@/data/architects.json";

export const metadata = {
  title: "Homes | Usonian",
  description:
    "Browse our curated collection of architect-designed homes by master architects.",
};

export default function HomesPage() {
  // Join properties with architect names
  const properties = propertiesData.map((property) => {
    const architect = architectsData.find((a) => a.id === property.architect_id);
    return {
      ...property,
      architect_name: architect?.name,
    };
  });

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <h1 className="mb-4">Homes</h1>
          <p className="text-slate max-w-2xl text-lg">
            A curated collection of architect-designed homes, from iconic
            landmarks to hidden gems awaiting their next steward.
          </p>
        </header>

        {/* Filter Bar (minimal for MVP) */}
        <div className="flex flex-wrap gap-4 mb-12 pb-8 border-b border-sand">
          <span className="text-sm text-slate">
            {properties.length} properties
          </span>
        </div>

        {/* Property Grid */}
        <PropertyGrid properties={properties} />
      </div>
    </div>
  );
}
