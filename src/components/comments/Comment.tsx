import WrapperAnimation from "@/components/animations/WrapperAnimation";
import OptionButton from "@/components/buttons/OptionButton";
import { IComment } from "@/configs/interface";
import { contants } from "@/utils/constant";
import { toAbbrevNumber } from "@/utils/format";
import {
  faEllipsis,
  faHeart as faHeartFill,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import classNames from "classnames";
import moment from "moment";
import React, { useMemo, useState } from "react";
export interface ICommentProps {
  item?: boolean;
  data?: IComment;
  onLike?: (data: IComment) => void;
  onReply?: (data: IComment) => void;
  onDelete?: (data: IComment) => void;
}
export default function Comment({
  item,
  data,
  onLike,
  onReply,
  onDelete,
}: ICommentProps) {
  const __SIZE_AVARTAR = "3.4rem";
  const [showAllChildren, setShowAllChildren] = useState(false);

  const comments = useMemo(() => {
    if (!showAllChildren) {
      return data?.children?.slice(0, 1);
    }

    return data?.children;
  }, [data?.children, showAllChildren]);

  const handleCLickShowAll = () => {
    setShowAllChildren((prev) => !prev);
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <Avatar
            sx={{ width: __SIZE_AVARTAR, height: __SIZE_AVARTAR }}
            src={data?.user?.avatar || contants.avartarDefault}
          />
          <div className="flex flex-col items-start">
            <h4 className="text-[15px] font-medium text-post-primary">
              {data?.user?.displayName || data?.user?.username}
            </h4>
            <p className="text-sm">{data?.comment}</p>
            <div className="text-xs flex items-center gap-2 mt-1 capitalize">
              <span className="max-w-[64px] truncate ">
                {moment(data?.createAt).fromNow() === "a few seconds ago"
                  ? "now"
                  : moment(data?.createAt).fromNow().replaceAll("ago", "")}
              </span>
              {data && (
                <span
                  className={classNames(
                    "hover:underline cursor-pointer max-w-[40px] truncate",
                    {}
                  )}
                >
                  {toAbbrevNumber(data?.likes)} Likes
                </span>
              )}
              <span
                onClick={onReply && data ? () => onReply(data) : undefined}
                className="hover:underline cursor-pointer"
              >
                Reply
              </span>
              {data?.owner && (
                <OptionButton
                  handleDelete={
                    onDelete && data ? () => onDelete(data) : undefined
                  }
                  options={{ size: "small", typeConfirm: "confirm" }}
                  className="flex items-center justify-center p-1 hover:bg-gray-200 rounded-xl transition-all ease-linear cursor-pointer"
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </OptionButton>
              )}
            </div>
            {item && data && data?.children?.length > 2 && (
              <div className="flex items-center text-sm hover:underline gap-1 mt-1 cursor-pointer">
                <span className="w-[25px] h-[1px] bg-[#333333]"></span>
                {!showAllChildren && (
                  <span onClick={handleCLickShowAll}>
                    Show more replies ({data?.children.length})
                  </span>
                )}
                {showAllChildren && (
                  <span onClick={handleCLickShowAll}>Show less</span>
                )}
              </div>
            )}
          </div>
        </div>
        <WrapperAnimation
          onClick={onLike && data ? () => onLike(data) : undefined}
          className="cursor-pointer"
          hover={{}}
        >
          <FontAwesomeIcon
            className={classNames("w-4 h-w-4", {
              ["text-inherit"]: !data?.isLike,
              ["text-fill-heart"]: data?.isLike,
            })}
            icon={data?.isLike ? faHeartFill : faHeart}
          />
        </WrapperAnimation>
      </div>
      {item && data && data?.children?.length > 0 && (
        <div
          style={{
            paddingLeft: `calc(${__SIZE_AVARTAR} + 14px)`,
          }}
          className="mt-3 flex flex-col gap-2"
        >
          {comments &&
            comments.map((item) => {
              return (
                <Comment
                  onDelete={onDelete}
                  onReply={onReply}
                  onLike={onLike}
                  data={item}
                  item={true}
                  key={item.id}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
