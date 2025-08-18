"use client";

import ProgramHeaderTabs from "@/layout/ProgramHeader";
import React from "react";

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <ProgramHeaderTabs />

      {/* Card Body */}
      {children}
    </div>
  );
}
