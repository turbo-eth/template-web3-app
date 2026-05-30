export interface ENSProfile {
  name: string | null;
  address: string | null;
  avatar: string | null;
  resolvedAt: number;
}

export interface ENSLookupResult {
  address: string | null;
  name: string | null;
  error?: string;
}
