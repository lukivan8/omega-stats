import React from "react";

export default function Cross({ className }: { className?: string }) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 5L5 19M5.00001 5L19 19"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
