"use client";
import BoxPost from "@/components/boxs/posts/BoxPost";
import InfinityPosts from "@/components/boxs/posts/InfinityPosts";
import PrimaryPostButton from "@/components/buttons/PrimaryPostButton";
import SearchInput from "@/components/common/inputs/SearchInput";
import PostDetailDialog from "@/components/dialogs/posts/PostDetailDialog";
import { RootState } from "@/configs/types";
import { links } from "@/data/links";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setOpenPostModal } from "@/redux/slice/adorableSlice";
import { appService } from "@/services/appService";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";

export default function AdorableSnapshotsPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [uuid, setUuid] = useQueryState("uuid");
  const [autoOpen, setAutoOpen] = useQueryState("open");
  const dispatch = useAppDispatch();
  const [autoOpenPostDetail, setAutoOpenPostDetail] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const handleOpenPostModal = () => {
    if (!user) return appService.handleNonLogin(pathname, router);
    dispatch(setOpenPostModal(true));
  };
  useEffect(() => {
    if (uuid && !autoOpenPostDetail && autoOpen === "auto") {
      setAutoOpenPostDetail(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);
  return (
    <div className="pt-12">
      <div className="flex flex-col md:flex-row md:gap-0 gap-5 items-center justify-between mb-10">
        <PrimaryPostButton
          onClick={handleOpenPostModal}
          hover="up"
          title="New Post"
          size="md"
          variant="rouded-fill"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();

            router.push(links.adorables.search + `?q=${search}`);
          }}
          className="w-full md:w-2/3 lg:w-1/3"
        >
          <SearchInput
            className="bg-[#F7F7F7] py-[15px] px-6 border-[#D6D6D6]"
            classNameInput="bg-inherit placeholder:text-sm text-sm"
            defaultStyle={false}
            placeholder="Interested in..."
            variant="circle"
            value={search}
            handleChange={(e) => setSearch(e.target.value)}
            handleClose={() => setSearch("")}
          />
        </form>
      </div>
      {/* <BoxPostHighlight data={data} title="HIGHLIGHT POSTS" /> */}
      <BoxPost title="OTHER POSTS" className="mt-20">
        <InfinityPosts />
      </BoxPost>

      {autoOpenPostDetail && (
        <PostDetailDialog
          open={autoOpenPostDetail}
          setOpen={setAutoOpenPostDetail}
          onClose={() => {
            setUuid(null);
            setAutoOpen(null);
            setAutoOpenPostDetail(false);
          }}
        />
      )}
    </div>
  );
}
