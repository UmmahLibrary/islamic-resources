export type ResourceCategory =
  | 'quran'
  | 'hadith'
  | 'prayer-times'
  | 'tafsir'
  | 'duas'
  | 'calendar'
  | 'names'
  | 'fonts'
  | 'general';

export type ResourceFormat =
  | 'rest-api'
  | 'npm'
  | 'pip'
  | 'swift'
  | 'maven'
  | 'cargo'
  | 'pub'
  | 'json'
  | 'xml'
  | 'csv'
  | 'graphql'
  | 'sqlite'
  | 'source'
  | 'font'
  | 'image';

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  subcategory?: string;
  url: string;
  docs?: string;
  repo?: string;
  /** Exact install/import name for package formats (npm, pip, cargo, pub, swift, maven). */
  package?: string;
  /** Example request URL for rest-api/graphql/data formats; preferred over `url` in snippets. */
  endpoint?: string;
  license: string;
  languages: string[];
  format: ResourceFormat;
  free: boolean;
  auth_required: boolean;
  scholar_reviewed: boolean;
  maintained: boolean;
  tags: string[];
  adapter?: string;
  added: string;
  attribution?: string;
}

export interface ResourceRegistry {
  resources: Resource[];
}
