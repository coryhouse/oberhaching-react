import { Book, bookSchema, NewBook } from "../types/Book.types";

export async function addBook(book: NewBook): Promise<Book> {
  const resp = await fetch("http://localhost:3001/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!resp.ok) {
    throw new Error("Failed to add book");
  }

  return bookSchema.parse(await resp.json());
}
