import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "./About";
import Books from "./Books";
import PageNotFound from "./PageNotFound";
import { Book } from "./types/Book.types";

let initialBooks: Book[] = [
  {
    id: 1,
    title: "Essentialism",
    subject: "Productivity",
  },
  {
    id: 2,
    title: "The 4-Hour Workweek",
    subject: "Productivity",
  },
];

export default function App() {
  const [books, setBooks] = useState(initialBooks);

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
              element={<Books books={books} setBooks={setBooks} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </React.StrictMode>
  );
}
