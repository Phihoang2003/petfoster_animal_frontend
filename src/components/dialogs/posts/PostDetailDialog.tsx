import { getCommentWithPost, getDetailPost } from "@/apis/posts";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import React, { useCallback, useRef } from "react";

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

  return <></>;
}
