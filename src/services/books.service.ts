import ky, { ResponsePromise } from "ky";
import { Book, bookSchema, NewBook } from "../types/Book.types";

export async function getBooks(): Promise<Book[]> {
  const resp = (await ky
    .get(import.meta.env.VITE_API_BASE_URL + "/books")
    .json()) as Book[];
  return resp.map((book: any) => bookSchema.parse(book));
}

export async function addBook(book: NewBook): Promise<Book> {
  const resp = await ky
    .post(import.meta.env.VITE_API_BASE_URL + "/books", { json: book })
    .json();
  return bookSchema.parse(resp);
}

export async function deleteBook(bookId: number): Promise<ResponsePromise> {
  return ky.delete(import.meta.env.VITE_API_BASE_URL + "/books/" + bookId);
}
