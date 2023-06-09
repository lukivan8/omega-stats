import Navbar from "@/components/navbar";
import React from "react";

type PropType = {
  children: React.ReactNode;
};

export default function Layout({ children }: PropType) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
