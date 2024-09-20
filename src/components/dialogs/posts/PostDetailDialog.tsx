"use client";
import { getCommentWithPost, getDetailPost } from "@/apis/posts";
import OptionButton from "@/components/buttons/OptionButton";
import MediasPostDetail from "@/components/dialogs/posts/MediasPostDetail";
import WrapperDialog from "@/components/dialogs/WrapperDialog";
import { RootState } from "@/configs/types";
import { reportReason } from "@/data/reason";
import { useAppSelector } from "@/hooks/reduxHooks";
import { contants } from "@/utils/constant";
import { Avatar } from "@mui/material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface IPostDetailDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  onClose?: () => void;
}
export default function PostDetailDialog({
  open,
  setOpen,
  onClose,
}: IPostDetailDialogProps) {
  const [uuid] = useQueryState("uuid");
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const rawData = useQuery({
    queryKey: ["postDetailDialog", uuid],
    queryFn: () => {
      if (!uuid) return null;
      return getDetailPost(uuid);
    },
  });
  const rawComments = useInfiniteQuery({
    queryKey: ["postDetailDialog/comments/infinity"],
    queryFn: ({ pageParam = 1 }) => {
      if (!uuid) return null;
      return getCommentWithPost(uuid, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPage) => {
      return lastPage?.data?.data.length ? allPage.length + 1 : undefined;
    },
  });
  const intObserver = useRef<IntersectionObserver | null>(null);
  const [like, setLike] = useState(false);
  const lastPostRef = useCallback(
    (post: HTMLDivElement | null) => {
      if (rawComments.isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting) {
          rawComments.fetchNextPage();
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [rawComments]
  );
  const handleClose = () => {
    if (!onClose) return;
    onClose();
  };
  const data = useMemo(() => {
    if (rawData.isError || !rawData.data?.data) return null;
    return rawData.data?.data;
  }, [rawData]);
  const [images, setImages] = useState(data?.images || []);
  useLayoutEffect(() => {
    if (data?.images.length) {
      setImages(data.images);
    }

    if (data) {
      setLike(data.isLike);
    }
  }, [data]);

  const handleDeletePost = () => {};
  const handleEdit = () => {};
  const handleReportPost = () => {};
  return (
    <>
      <WrapperDialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        setOpen={setOpen}
        onClose={handleClose}
      >
        <div className="w-full text-post-primary flex items-center justify-between h-[80vh] select-none">
          <MediasPostDetail images={images} />
          <div className="md:w-1/2 lg:w-2/5 w-full h-full flex flex-col justify-between">
            <div className="w-full h-fit p-8 pb-0">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar
                    sx={{ width: "3.75rem", height: "3.75rem" }}
                    src={data?.user.avatar || contants.avartarDefault}
                  />
                  <span className="text-lg font-semibold">
                    {data?.user.displayName || data?.user.username}
                  </span>
                </div>
                {data?.owner && (
                  <OptionButton
                    handleDelete={handleDeletePost}
                    // handleReport={handleReprotPost}
                    handleEdit={handleEdit}
                    options={{
                      border: true,
                      reason: reportReason,
                      showEdit: data.edit,
                      showReport: false,
                      typeConfirm: contants.roles.manageRoles.includes(
                        user?.role || ""
                      )
                        ? "reason"
                        : "confirm",
                    }}
                  />
                )}

                {!data?.owner && (
                  <OptionButton
                    showDelete={false}
                    handleReport={handleReportPost}
                    options={{
                      border: true,
                      reason: reportReason,
                      showEdit: false,
                      showReport: true,
                      typeConfirm: contants.roles.manageRoles.includes(
                        user?.role || ""
                      )
                        ? "reason"
                        : "confirm",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </WrapperDialog>
    </>
  );
}
