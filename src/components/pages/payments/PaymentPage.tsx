"use client";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import AddressInfoPayment from "@/components/common/inputs/address/AddressInfoPayment";
import LineProgress from "@/components/pages/payments/LineProgress";
import { links } from "@/data/links";
import { Breadcrumbs, Grid, Grid2, Stack } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PaymentPage() {
  const [line, setLine] = useState(2);
  const [isClient, setIsClient] = useState(false);
  const handleOpenConfirm = () => {};

  useEffect(() => {
    setIsClient(true);
  }, []);

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

      {/* AddressInfo */}
      <Grid2
        container
        spacing={"48px"}
        mt={"34px"}
        component={"form"}
        onSubmit={handleOpenConfirm}
      >
        <Grid2 size={{ sm: 12, md: 12, lg: 6 }}>
          {isClient && (
            <Stack spacing={"40px"}>
              <AddressInfoPayment />
            </Stack>
          )}
        </Grid2>

        <Grid2 size={{ sm: 12, md: 12, lg: 6 }}>
          <div>Right side</div>
        </Grid2>
      </Grid2>
    </ContainerContent>
  );
}
