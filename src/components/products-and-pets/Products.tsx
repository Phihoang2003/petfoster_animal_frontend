import BoxTitle from "@/components/boxs/BoxTitle";
import { IProduct } from "@/configs/interface";
import classNames from "classnames";
import React from "react";
import styles from "./styles/products.module.css";
import Link from "next/link";
import { links } from "@/data/links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Product from "@/components/products-and-pets/Product";
export interface IProductsProps {
  id?: string;
  data: IProduct[];
  title: string;
  pagination?: boolean;
  onPage?: (value: number) => void;
  totalPage?: number;
  loading?: boolean;
}
export default function Products({
  data,
  title,
  pagination,
  totalPage,
  loading,
  id,
  onPage,
}: IProductsProps) {
  return (
    <BoxTitle
      id={id}
      underlineTitle
      title={title}
      locationTitle="left"
      actions={
        <>
          <div
            className={classNames("flex items-center gap-2", {
              [styles["products-hover"]]: true,
            })}
          >
            <Link
              className="text-lg hover:underline"
              href={links.products + "products"}
            >
              See all
            </Link>

            <FontAwesomeIcon
              className={classNames("text-sm", {
                [styles["products-hover-item"]]: true,
              })}
              icon={faChevronRight}
            />
          </div>
        </>
      }
    >
      {!loading && data && data.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-6">
            {data.map((product) => {
              return <Product key={product.id} data={product} />;
            })}
          </div>
          {/* {pagination && <Pagination pages={totalPage || 1} onPage={onPage} />} */}
        </>
      )}
    </BoxTitle>
  );
}
