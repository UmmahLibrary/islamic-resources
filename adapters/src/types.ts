export type ResourceCategory =
  | 'quran'
  | 'hadith'
  | 'prayer-times'
  | 'tafsir'
  | 'duas'
  | 'calendar'
  | 'names'
  | 'general';

export type ResourceFormat =
  | 'rest-api'
  | 'npm'
  | 'json'
  | 'xml'
  | 'csv'
  | 'graphql'
  | 'sqlite';

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  subcategory?: string;
  url: string;
  docs?: string;
  repo?: string;
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
