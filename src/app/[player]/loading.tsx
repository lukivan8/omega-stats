import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <Image
        src={"/emoticons/luna-calculating.webp"}
        alt={"Loading"}
        width={400}
        height={400}
        fetchPriority="high"
      />
    </div>
  );
}
