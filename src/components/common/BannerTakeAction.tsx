import ContainerContent from "@/components/common/common-components/ContainerContent";
import { takeActionData } from "@/data/take-action";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import styles from "./styles/banner-take-action.module.css";
import Image from "next/image";

export default function BannerTakeAction() {
  return (
    <ContainerContent>
      <nav className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] mt-[73px] mb-[88px]">
        {takeActionData.banners.map((item) => {
          return (
            <Link
              href={item.link}
              content={item.content}
              key={item.image}
              className={classNames(
                `lg:[&:nth-child(2)]:col-span-2 [&:nth-child(3)]:col-span-2 lg:[&:nth-child(3)]:col-span-1 
                            lg:[&:nth-child(2)]:row-span-2 [&:nth-child(3)]:row-span-2 lg:[&:nth-child(3)]:row-span-1 
                            h-[158px] relative lg:[&:nth-child(2)]:h-auto overflow-hidden before:text-lg before:uppercase
                             before:font-semibold `,
                {
                  [styles["item"]]: true,
                }
              )}
            >
              <Image
                className="w-full h-full object-cover"
                fill
                src={item.image}
                alt={item.image}
              />
            </Link>
          );
        })}
      </nav>
    </ContainerContent>
  );
}
