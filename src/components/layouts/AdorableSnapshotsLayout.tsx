import ContainerContent from "@/components/common/common-components/ContainerContent";
import React, { ReactNode } from "react";

export interface IAdorableSnapshotsLayoutProps {
  children: ReactNode;
}
export default function AdorableLayout({
  children,
}: IAdorableSnapshotsLayoutProps) {
  return (
    <ContainerContent className="h-full">
      <div className="flex items-center justify-center pt-6 md:pt-12 pb-8 border-b border-violet-post-primary">
        <h1 className="text-[2rem] md:text-[2.4rem] font-bold text-gradient block">
          ADORABLE PETS CORNER
        </h1>
      </div>
      {children}
    </ContainerContent>
  );
}
