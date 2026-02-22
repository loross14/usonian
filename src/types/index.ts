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
  last_sale_price?: number | null;
  last_sale_date?: string | null;
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

// URL filter types
export type StatusFilter = 'all' | 'active' | 'sold' | 'museum';

export const STATUS_FILTER_MAP: Record<StatusFilter, PropertyStatus[] | null> = {
  all: null,
  active: ['active'],
  sold: ['sold', 'archived'],
  museum: ['museum', 'donated'],
};

// Display helpers
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: 'For Sale',
    sold: 'Sold',
    archived: 'Off-Market',
    donated: 'Donated',
    museum: 'Museum',
  };
  return labels[status] || status;
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
