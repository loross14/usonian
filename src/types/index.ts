// Usonian Platform - TypeScript Interfaces
// Based on database-schema-guide.txt

export interface Property {
  id: string;
  slug: string;
  home_name: string;
  full_address: string | null;
  parsed_city: string | null;
  parsed_state: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  year_built: number;
  architect_id: string;
  client_owner: string | null;
  current_owner: string | null;
  preservation_status: string | null;
  significance: string | null;
  description: string | null;
  curator_notes: string | null;
  square_footage: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  status: string;
  best_image_url: string | null;
  hero_image?: string;
  last_sale_price?: number | null;
  last_sale_date?: string | null;
  listing_price?: number | null;  // Current listing price for active properties
  listing_source_url?: string | null;  // Source URL for listing price
  is_visitable?: boolean;  // Can you tour/visit this property?
  is_rental?: boolean;     // Can you rent/stay overnight?
  visit_url?: string;      // Link to tour booking
  rental_url?: string;     // Link to Airbnb/rental listing
  created_at: string;
  updated_at: string;
}

export type PropertyStatus =
  | 'active'
  | 'sold'
  | 'archived'
  | 'donated'
  | 'museum';

export type PreservationStatus =
  | 'NRHP'
  | 'NHL'
  | 'Historic-Cultural Monument'
  | 'State Register'
  | 'Local Landmark';

export interface Architect {
  id: string;
  slug: string;
  name: string;
  birth_year: number | null;
  death_year: number | null;
  birthplace: string | null;
  biography: string | null;
  fellowship_years: string | null;
  image_url: string | null;
  wikipedia_url: string | null;
  property_count?: number;
}

export interface PropertySale {
  id: string;
  property_id: string;
  sale_date: string | null;
  sale_price: number | null;
  buyer: string | null;
  seller: string | null;
  notes: string | null;
  source: string | null;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  caption: string | null;
  is_best: boolean;
  sort_order: number;
}

export interface PropertyAlert {
  id: string;
  property_id: string;
  email: string;
  status: 'active' | 'notified' | 'unsubscribed';
  created_at: string;
  notified_at: string | null;
  unsubscribed_at: string | null;
}

// Extended types with relations
export interface PropertyWithRelations extends Property {
  architect?: Architect;
  sales?: PropertySale[];
  images?: PropertyImage[];
}

export interface ArchitectWithRelations extends Architect {
  properties?: Property[];
}

// Filter types
export interface PropertyFilters {
  status?: PropertyStatus;
  architect_id?: string;
  parsed_state?: string;
  preservation_status?: PreservationStatus;
}

// URL filter types - Experience-based filtering
export type ExperienceFilter = 'all' | 'sale' | 'visit' | 'stay' | 'offmarket';

// Legacy type alias for backwards compatibility
export type StatusFilter = ExperienceFilter;

// Filter logic helper - determines if a property matches a filter
export function matchesExperienceFilter(property: Property, filter: ExperienceFilter): boolean {
  switch (filter) {
    case 'all':
      return true;
    case 'sale':
      return property.status === 'active';
    case 'visit':
      return property.is_visitable === true;
    case 'stay':
      return property.is_rental === true;
    case 'offmarket':
      // Everything that's not for sale, visitable, or rentable
      return property.status !== 'active' &&
             property.is_visitable !== true &&
             property.is_rental !== true;
    default:
      return true;
  }
}

// Legacy STATUS_FILTER_MAP for any remaining usages
export const STATUS_FILTER_MAP: Record<string, PropertyStatus[] | null> = {
  all: null,
  active: ['active'],
  sale: ['active'],
  sold: ['sold', 'archived'],
  museum: ['museum', 'donated'],
};

// Display helpers
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: 'For Sale',
    sold: 'Off-Market',
    archived: 'Off-Market',
    donated: 'Donated',
    museum: 'Museum',
    // Experience-based labels
    visit: 'Visit',
    stay: 'Stay',
  };
  return labels[status] || status;
}

// Get the primary experience badge for a property (priority-ordered)
export function getPropertyBadgeType(property: Property): string {
  if (property.status === 'active') return 'active';
  if (property.is_rental === true) return 'stay';
  if (property.is_visitable === true) return 'visit';
  return property.status; // fallback to actual status (sold, archived, etc.)
}

export function getStatusBadgeClass(status: string): string {
  const classes: Record<string, string> = {
    active: 'badge-for-sale',
    sold: 'badge-sold',
    archived: 'badge-sold',
    donated: 'badge-museum',
    museum: 'badge-museum',
  };
  return classes[status] || 'badge-sold';
}

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return 'Price Upon Request';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatYear(year: number | null): string {
  return year ? year.toString() : 'Unknown';
}

export function formatLocation(city: string | null, state: string | null): string {
  if (city && state) return `${city}, ${state}`;
  if (city) return city;
  if (state) return state;
  return 'Location Unknown';
}
