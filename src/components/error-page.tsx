import Image from "next/image";
import Link from "next/link";
import React from "react";

export function UnexpectedError() {
  return (
    <div>
      <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-10 md:flex-row">
        <Image
          width={200}
          height={200}
          src={"/emotes/EmoticonData_DubuShocked.png"}
          alt={"error"}
        />
        <p className="text-3xl md:text-4xl xl:text-6xl">
          Unexpected error occured
        </p>
      </div>
    </div>
  );
}

export function NotFound({ username }: { username: string }) {
  return (
    <div>
      <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-10 md:h-[80vh] md:flex-row">
        <Image
          width={200}
          height={200}
          src={"/emotes/EmoticonData_DrekarDetective.png"}
          alt={"404"}
        />
        <div className="flex flex-col items-end">
          <p className="text-3xl md:text-4xl xl:text-6xl">
            This player doesn&apos;t exist
          </p>
          <p className="text-xl text-gray-400 md:text-2xl xl:text-4xl">
            Username: {username}
          </p>
        </div>
      </div>
    </div>
  );
}
