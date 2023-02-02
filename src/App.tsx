import { lazy, StrictMode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Books from "./Books";
import ManageBook from "./ManageBook";
import PageNotFound from "./PageNotFound";

const About = lazy(() => import("./About"));

export default function App() {
  return (
    <StrictMode>
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
                  <Books />
                </ErrorBoundary>
              }
            />
            <Route path="/book" element={<ManageBook />} />
            <Route
              path="/about"
              element={
                <Suspense fallback={<p>Loading about...</p>}>
                  <About />
                </Suspense>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </StrictMode>
  );
}
