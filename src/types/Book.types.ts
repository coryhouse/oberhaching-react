export interface Book {
  id: number;
  title: string;
  subject: string;
}

export type NewBook = Omit<Book, "id">;
