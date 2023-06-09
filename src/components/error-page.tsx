import Image from "next/image";
import Link from "next/link";
import React from "react";

export function UnexpectedError() {
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full justify-center h-[70vh] items-center gap-10">
        <Image
          width={200}
          height={200}
          src={"/emoticons/dubu-shock.png"}
          alt={"error"}
        />
        <p className="xl:text-6xl md:text-4xl text-3xl">
          Unexpected error occured
        </p>
      </div>
    </div>
  );
}

export function NotFound({ username }: { username: string }) {
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full justify-center md:h-[80vh] h-[70vh] items-center gap-10">
        <Image
          width={200}
          height={200}
          src={"/emoticons/drekar_what.png"}
          alt={"404"}
        />
        <div className="flex flex-col items-end">
          <p className="xl:text-6xl md:text-4xl text-3xl">
            This player doesn&apos;t exist
          </p>
          <p className="text-gray-400 xl:text-4xl md:text-2xl text-xl">
            Username: {username}
          </p>
        </div>
      </div>
    </div>
  );
}
