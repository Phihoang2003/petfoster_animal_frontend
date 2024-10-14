"use client";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import LineProgress from "@/components/pages/payments/LineProgress";
import { links } from "@/data/links";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export default function PaymentPage() {
  const [line, setLine] = useState(2);
  return (
    <ContainerContent className="pt-12 select-none">
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href={links.users.cart}>
            Cart
          </Link>
          <Link
            className="text-black-main hover:underline "
            href={links.users.payment}
          >
            Payment
          </Link>
        </Breadcrumbs>
      </div>
      <LineProgress progressNun={line} />
    </ContainerContent>
  );
}
