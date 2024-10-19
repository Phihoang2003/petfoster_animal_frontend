import DetailOrderHistoryPage from "@/components/pages/order-histories/DetailOrderHistoryPage";
import * as React from "react";

export interface IDetailOrderProps {
  params: { id: string };
}

export default function DetailOrder(params: IDetailOrderProps) {
  return <DetailOrderHistoryPage id={params.params.id} />;
}
