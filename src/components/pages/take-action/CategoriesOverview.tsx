import * as React from "react";
import Link from "next/link";
import { takeActionData } from "@/data/take-action";
import ImageAnimation from "@/components/animations/ImageAnimation";

export default function CategoriesOverview() {
  return (
    <div className="my-[68px] flex flex-col lg:flex-row items-center justify-center gap-[50px]">
      {takeActionData.categoriesOverview.map((item) => {
        return (
          <Link
            href={item.link}
            key={item.id}
            className="w-[180px] h-[180px] rounded-full overflow-hidden border-[3px] border-[#FF7A00]"
          >
            <ImageAnimation
              animation="scale"
              className="w-full h-full object-cover cursor-pointer"
              src={item.thumbnail}
              alt={item.thumbnail}
            />
            ;
          </Link>
        );
      })}
    </div>
  );
}
