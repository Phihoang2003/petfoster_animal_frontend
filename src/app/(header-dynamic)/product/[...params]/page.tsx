import DetailProductPage from "@/components/pages/detail-product/DetailProductPage";
import * as React from "react";

export interface IDetailProductProps {
  params: { params: [string, string] };
}

export default function DetailProduct({ params }: IDetailProductProps) {
  const [id, name] = params.params;
  return <DetailProductPage params={{ id, name }} />;
}
