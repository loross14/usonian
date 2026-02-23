// URL Helper Utilities
// Extract friendly source names from URLs

const KNOWN_SOURCES: Record<string, string> = {
  'wikipedia.org': 'Wikipedia',
  'dwell.com': 'Dwell',
  'archdaily.com': 'ArchDaily',
  'dezeen.com': 'Dezeen',
  'architecturaldigest.com': 'AD',
  'laconservancy.org': 'LA Conservancy',
  'getty.edu': 'Getty',
  'gettyimages.com': 'Getty Images',
  'loc.gov': 'Library of Congress',
  'moma.org': 'MoMA',
  'guggenheim.org': 'Guggenheim',
  'preservationhouston.org': 'Preservation Houston',
  'nps.gov': 'National Park Service',
  'historicplaces.ca': 'Historic Places Canada',
  'zillow.com': 'Zillow',
  'realtor.com': 'Realtor',
  'redfin.com': 'Redfin',
  'flickr.com': 'Flickr',
  'commons.wikimedia.org': 'Wikimedia Commons',
  'architizer.com': 'Architizer',
  'curbed.com': 'Curbed',
};

/**
 * Extract a friendly source name from a URL
 * e.g., "https://www.dwell.com/article/..." → "Dwell"
 * e.g., "https://en.wikipedia.org/wiki/..." → "Wikipedia"
 */
export function getSourceName(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');

    // Check for exact matches first
    for (const [domain, name] of Object.entries(KNOWN_SOURCES)) {
      if (hostname === domain || hostname.endsWith('.' + domain)) {
        return name;
      }
    }

    // Fallback: capitalize the domain name
    const parts = hostname.split('.');
    const mainDomain = parts.length > 1 ? parts[parts.length - 2] : parts[0];
    return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
  } catch {
    return 'External Link';
  }
}

/**
 * Check if a URL is valid
 */
export function isValidUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
