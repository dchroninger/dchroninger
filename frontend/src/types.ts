export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  total: number;
  per_page: number;
  total_pages: number;
};

export type Location = {
  id: string;
  name: string;
  abbreviation: string;
  division: string;
  legalName: string;
  dbaName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
};

export type LocationForm = Omit<
  Location,
  "id" | "createdAt" | "updatedAt" | "address2" | "legalName" | "dbaName"
> & { address2?: string };
