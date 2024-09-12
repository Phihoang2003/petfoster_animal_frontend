import LoadingPrimary from "@/components/common/loadings/LoadingPrimary";
import * as React from "react";

export interface ILoadingProps {}

export default function Loading(props: ILoadingProps) {
  return <LoadingPrimary color="#3E3771" />;
}
