import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
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
