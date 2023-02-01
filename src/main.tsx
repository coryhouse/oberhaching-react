import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import App from "./App";
import "./index.css";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </ErrorBoundary>
);
