import { z } from 'zod';

export const ServiceSubcategory = z.object({
  id: z.string(),
  service_id: z.string(),
  name: z.string().nullable(),
  display_name: z.string().nullable(),
  description: z.string().nullable(),
  enabled: z.boolean(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const CreateServiceSubcategoryBody = z.object({
  service_id: z.string(),
  name: z.string().nullable(),
  display_name: z.string().nullable(),
  description: z.string().nullable(),
  enabled: z.boolean(),
});

export const UpdateServiceSubcategoryBody = z.object({
  name: z.string().nullable(),
  display_name: z.string().nullable(),
  description: z.string().nullable(),
  enabled: z.boolean(),
});
