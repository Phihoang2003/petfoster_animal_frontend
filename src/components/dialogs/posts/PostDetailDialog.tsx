"use client";
import {
  commentWittPost,
  getCommentWithPost,
  getDetailPost,
  likeComment,
} from "@/apis/posts";
import OptionButton from "@/components/buttons/OptionButton";
import Comment from "@/components/comments/Comment";
import MiniLoading from "@/components/common/loadings/MiniLoading";
import MediaPostDetailMobile from "@/components/dialogs/posts/MediaPostDetailMobile";
import MediasPostDetail from "@/components/dialogs/posts/MediasPostDetail";
import WrapperDialog from "@/components/dialogs/WrapperDialog";
import { IComment } from "@/configs/interface";
import { RootState } from "@/configs/types";
import { reportReason } from "@/data/reason";
import { useAppSelector } from "@/hooks/reduxHooks";
import { contants } from "@/utils/constant";
import { toAbbrevNumber } from "@/utils/format";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faFaceSmile,
  faFaceSmileWink,
  faPaperPlane,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import classNames from "classnames";
import { motion } from "framer-motion";
import Tippy from "@tippyjs/react/headless";
import moment from "moment";
import { useQueryState } from "nuqs";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import WrapperAnimation from "@/components/animations/WrapperAnimation";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import EmojiPicker from "@/components/common/inputs/EmojiPicker";
import { appService } from "@/services/appService";
import { usePathname, useRouter } from "next/navigation";
import Validate from "@/utils/validate";
import { toast } from "react-toastify";
import { EmojiClickData } from "emoji-picker-react";

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
  const pathName = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [uuid] = useQueryState("uuid");
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const [openShares, setOpenShares] = useState(false);
  const [reply, setReply] = useState<IComment | null>(null);
  const [loadingComment, setLoadingComment] = useState(false);
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
  const refInput = useRef<HTMLInputElement>(null);
  const refSpanTop = useRef<HTMLSpanElement>(null);
  const [like, setLike] = useState(false);
  const lastPostRef = useCallback(
    (post: any) => {
      if (rawComments.isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && rawComments.hasNextPage) {
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
  const linkShare = useMemo(() => {
    return "https://www.facebook.com";
  }, [data]);

  const handleDeletePost = () => {};
  const handleEdit = () => {};
  const handleReportPost = () => {};
  const handleDeleteComment = () => {};
  const handleReply = async (data: IComment) => {
    if (!user) return appService.handleNonLogin(pathName, router);
    setReply(data);
  };
  const handleClickLike = async (dataComment: IComment) => {
    if (!user) return appService.handleNonLogin(pathName, router);
    try {
      const response = await likeComment(dataComment.id);
      if (!response) return toast.warn(contants.messages.errors.handle);
      if (response.errors) return toast.warn(response.message);
      //   if (!dataComment.owner && data && !dataComment.isLike) {
      //     firebaseService.publistPostsNotification(data, dataComment.user, user, 'like-comment');
      // }
      rawComments.refetch();
    } catch (error) {
      return toast.warn(contants.messages.errors.server);
    }
  };
  const handleLike = () => {};
  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return appService.handleNonLogin(pathName, router);
    if (!data || !refInput.current) return;
    const value = refInput.current.value;
    if (Validate.isBlank(value)) return;
    try {
      setLoadingComment(true);
      const response = await commentWittPost({
        comment: value,
        uuid: data?.id as string,
        replyId: reply ? reply.id : null,
      });
      if (!response) {
        return toast.warn(contants.messages.errors.handle);
      }

      if (response.errors) {
        return toast.warn(response.message);
      }
      rawComments.refetch();
      refInput.current.value = "";
      if (reply) setReply(null);
      //   if (!data.owner && !replay) {
      //     firebaseService.publistPostsNotification(data, data.user, user, 'comment');
      // }

      // if (replay) {
      //     firebaseService.publistPostsNotification(data, replay.user, user, 'comment');
      // }
    } catch (error) {
      return toast.warn(contants.messages.errors.server);
    } finally {
      setLoadingComment(false);
      if (refSpanTop.current) {
        // scroll to element that ref point to
        refSpanTop.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const handleAddIcon = (emojiObject: EmojiClickData, event: MouseEvent) => {
    if (!refInput.current) return;

    refInput.current.value += emojiObject.emoji;
  };

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
                      showEdit: data?.edit,
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
              <p className="font-medium text-1xl mt-3 pb-[22px] md:border-b border-[#B5A8FF] text-[#444444]">
                {data?.title}
              </p>
            </div>
            {/* comments */}
            {rawComments.isFetching && (
              <MiniLoading
                color="#3E3771"
                className="w-full h-full flex items-center justify justify-center"
              />
            )}
            {rawComments.data &&
              rawComments.data.pages[0]?.data?.data.length > 0 && (
                <div className="px-8 flex-1 w-full h-full hidden md:flex flex-col gap-2 overflow-y-auto overflow-x-hidden scroll py-6">
                  <span ref={refSpanTop}></span>
                  {!rawComments.isLoading &&
                    rawComments.data.pages.map((item) => {
                      return item.data.data.map((i: IComment) => {
                        return (
                          <div
                            className="w-full h-fit"
                            key={i.id}
                            ref={lastPostRef}
                          >
                            <Comment
                              key={i.id}
                              onDelete={handleDeleteComment}
                              onReply={handleReply}
                              onLike={handleClickLike}
                              data={i}
                              item={true}
                            />
                          </div>
                        );
                      });
                    })}
                </div>
              )}
            {(!rawComments.data ||
              (rawComments.data &&
                rawComments.data.pages[0].data.data.length <= 0)) && (
              <div className="px-8 hidden md:flex-1 w-full h-full sm:hidden md:flex gap-2 overflow-y-auto overflow-x-hidden scroll py-6 items-center">
                <span className="text-center text-black-main">
                  You are the first to comment on this article
                </span>
                <FontAwesomeIcon className="" icon={faFaceSmileWink} />
              </div>
            )}
            <MediaPostDetailMobile images={images} />
            <div className="border-t border-gray-primary">
              <div className="flex items-center justify-between py-[14px] px-9">
                <div className="flex flex-col gap-1 text-post-primary text-sm ">
                  <span className="font-semibold tracking-wide">
                    {toAbbrevNumber(data?.likes ?? 0)} likes
                  </span>
                  <p className="text-[#666666]">
                    {moment(data?.createdAt).format("MMMM Do, YYYY")}
                  </p>
                </div>
                {/* like,share button */}
                <div className="text-post-primary flex items-center gap-4  ">
                  <motion.div
                    onClick={handleLike}
                    className="flex items-center justify-center cursor-pointer"
                    whileTap={{
                      scale: !like ? 2 : 1,
                    }}
                  >
                    <FontAwesomeIcon
                      className={classNames("w-6 h-6", {
                        ["text-fill-heart"]: like,
                      })}
                      icon={like ? faHeartFull : faHeart}
                    />
                  </motion.div>
                  <Tippy
                    interactive
                    onClickOutside={() => setOpenShares(false)}
                    visible={openShares}
                    render={(attr) => (
                      <div
                        {...attr}
                        tabIndex={-1}
                        className="flex flex-col gap-2 bg-white shadow-primary rounded-lg py-2 "
                      >
                        <FacebookShareButton
                          url={linkShare}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <div className="flex items-center gap-2 px-5 hover:bg-gray-100 cursor-pointer transition-all ease-linear py-2">
                            <FontAwesomeIcon
                              icon={faFacebook}
                              className="text-[#0965fe]"
                            />
                            <span className="text-sm text-black-main">
                              Share on your Facebook
                            </span>
                          </div>
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={linkShare}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <div className="flex items-center gap-2 px-5 hover:bg-gray-100 cursor-pointer transition-all ease-linear py-2">
                            <FontAwesomeIcon
                              icon={faXTwitter}
                              className="text-[#000]"
                            />

                            <span className="text-sm text-black-main">
                              Share on your Twitter
                            </span>
                          </div>
                        </TwitterShareButton>
                      </div>
                    )}
                  >
                    <WrapperAnimation
                      onClick={() => setOpenShares((prev) => !prev)}
                      className="cursor-pointer"
                      hover={{}}
                    >
                      <FontAwesomeIcon
                        className="w-6 h-6"
                        icon={faShareSquare}
                      />
                    </WrapperAnimation>
                  </Tippy>
                </div>
              </div>
              {reply && (
                <div className="px-9 text-sm mb-2">
                  <div className="bg-gray-200 rounded-2xl w-fit py-1 px-3 text-black-main">
                    @ {reply.user.displayName || reply.user.username}
                  </div>
                </div>
              )}
              <form
                onSubmit={loadingComment ? undefined : handleSubmitComment}
                className="bg-[#F7F7F7] py-[14px] px-9 flex items-center justify-between gap-4 text-post-primary"
              >
                <EmojiPicker
                  placement="right-end"
                  icon={
                    <WrapperAnimation className="cursor-pointer" hover={{}}>
                      <FontAwesomeIcon className="w-6 h-6" icon={faFaceSmile} />
                    </WrapperAnimation>
                  }
                  onEmoji={handleAddIcon}
                />
                <div className="flex-1 text-sm relative">
                  <input
                    ref={refInput}
                    type="text"
                    className="outline-none border-none bg-transparent w-full h-full placeholder:text-sm"
                    placeholder="Leave a comment..."
                  />

                  {loadingComment && (
                    <div className="absolute inset-0 flex items-center justify-end w-full max-h-fit">
                      <MiniLoading
                        color="#3E3771"
                        className="w-full h-full flex items-center justify justify-end"
                      />
                    </div>
                  )}
                </div>
                <button type="submit" className="outline-none border-none">
                  <WrapperAnimation className="cursor-pointer" hover={{}}>
                    <FontAwesomeIcon className="w-6 h-6" icon={faPaperPlane} />
                  </WrapperAnimation>
                </button>
              </form>
            </div>
          </div>
        </div>
      </WrapperDialog>
    </>
  );
}
