import { getDetailPost } from "@/apis/posts";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import React from "react";

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

  return <div>PostDetailDialog</div>;
}
