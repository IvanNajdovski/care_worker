import { z } from 'zod';

import { ServiceSubcategory } from './servicesSubcategory';

export const Service = z.object({
  id: z.string(),
  name: z.string().nullable(),
  display_name: z.string().nullable(),
  description: z.string().nullable(),
  provider_description: z.string().nullable(),
  client_description: z.string().nullable(),
  enabled: z.boolean(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  subcategories: ServiceSubcategory.array().optional(),
});

export const CreateServiceBody = z.object({
  name: z.string().nullable(),
  display_name: z.string().nullable(),
  description: z.string().nullable(),
  provider_description: z.string().nullable(),
  client_description: z.string().nullable(),
  enabled: z.boolean(),
});

export const UpdateServiceBody = z.object({
  name: z.string().nullable(),
  display_name: z.string().nullable(),
  description: z.string().nullable(),
  provider_description: z.string().nullable(),
  client_description: z.string().nullable(),
  enabled: z.boolean(),
});
