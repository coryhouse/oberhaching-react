import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "./About";
import Books from "./Books";
import ManageBook from "./ManageBook";
import PageNotFound from "./PageNotFound";
import { Book, bookSchema } from "./types/Book.types";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      const resp = await fetch("http://localhost:3001/books");
      if (!resp.ok) throw resp;
      const bookJson = await resp.json();

      // This throws an error if the JSON returned doesn't match our schema
      try {
        bookJson.map((book: any) => bookSchema.parse(book));
      } catch (error) {
        alert("Error parsing JSON: " + error);
      }
      setIsLoading(false);
      setBooks(bookJson);
    }
    fetchBooks();
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary fallback={<p>Books failed. :(</p>}>
                  <Books
                    books={books}
                    setBooks={setBooks}
                    isLoading={isLoading}
                  />
                </ErrorBoundary>
              }
            />
            <Route
              path="/book"
              element={<ManageBook books={books} setBooks={setBooks} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </React.StrictMode>
  );
}
