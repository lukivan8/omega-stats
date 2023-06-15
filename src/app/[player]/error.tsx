"use client";
import { UnexpectedError } from "@/components/error-page";

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <UnexpectedError />;
}
