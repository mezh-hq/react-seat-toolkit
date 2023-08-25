import { ErrorBoundary } from "@/components";

const ErroredComponent = () => {
  throw new Error("I am an error");
};

export default function ErrorBoundaryExample({ className }) {
  return (
    <ErrorBoundary className={className}>
      <ErroredComponent />
    </ErrorBoundary>
  );
}
