import ky from "ky";
import { Book, bookSchema, NewBook } from "../types/Book.types";

export async function addBook(book: NewBook): Promise<Book> {
  const resp = await ky
    .post("http://localhost:3001/books", { json: book })
    .json();
  return bookSchema.parse(resp);
}
