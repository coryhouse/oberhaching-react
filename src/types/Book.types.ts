import { z } from "zod";

export const bookSchema = z.object({
  id: z.number(),
  // Notice how Zod is more powerful than TypeScript
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(2),
  subject: z.string().min(2),
});

export type Book = z.infer<typeof bookSchema>;

export type NewBook = Omit<Book, "id">;
