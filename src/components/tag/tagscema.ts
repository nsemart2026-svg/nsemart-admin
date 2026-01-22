import { z } from "zod";

// Define tag type enum

// Create Tag schema
export const createTagFrontendSchema = z.object({
  name: z.string().min(1, { message: "Tag name cannot be empty." }),
  details: z.string().min(1, { message: "Details cannot be empty." }),
  type: z.string(), // required by default
  iconName: z.string().optional(),
  iconUrl: z.string().optional(),
  image: z.any().optional(), // frontend file can be File object
});

// Update Tag schema (all fields optional)
export const updateTagFrontendSchema = createTagFrontendSchema.partial();
