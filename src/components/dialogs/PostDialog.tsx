"use client";

import WrapperAnimation from "@/components/animations/WrapperAnimation";
import LoadingSecondary from "@/components/common/loadings/LoadingSecondary";
import WrapperDialog from "@/components/dialogs/WrapperDialog";
import { ImageType, RootState } from "@/configs/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setOpenPostModal } from "@/redux/slice/adorableSlice";
import { contants } from "@/utils/constant";
import Validate from "@/utils/validate";
import { Avatar } from "@mui/material";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker from "@/components/common/inputs/EmojiPicker";
import { faPhotoFilm, faPlus } from "@fortawesome/free-solid-svg-icons";
import { IMediadetected, IMediasPrev } from "@/configs/interface";
import { fileToUrl } from "@/utils/format";
import ImageDetect from "@/components/dialogs/ImageDetect";

export default function PostDialog() {
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const dragImage = useRef(0);
  const draggedOverImage = useRef(0);
  const { openPostModal } = useAppSelector(
    (state: RootState) => state.adorableReducer
  );
  const dispatch = useAppDispatch();
  const [loadingForm, setLoadingForm] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageMedias, setMessageMedias] = useState<string[]>([]);
  const [images, setImages] = useState<IMediasPrev[]>([]);
  const detectedArray = useRef<IMediadetected[]>([]);
  const clearFileActive: string[] = [];
  const refInput = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  const handleAddIcon = () => {};
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const files = acceptedFiles;
    if (!files || !files.length) return;
    setMessageMedias([]);
    const validVideoFile = files.find((file) => file.type === "video/mp4");
    if (validVideoFile) {
      if (validateMedia(validVideoFile)) {
        setMessageMedias(["Size no larger than 3MB"]);
        return;
      }
      setImages([
        {
          data: validVideoFile,
          link: fileToUrl(validVideoFile, (url) => {
            clearFileActive?.push(url);
          }),
          isVideo: true,
        },
      ]);
      setMessageMedias(["Only one video per post is accepted"]);
      return;
    }
    const messages: string[] = [];

    const visibleFiles = files.filter((item) => {
      if (validateMedia(item)) {
        messages.push(`${item.name} photo larger than 5MB`);
      }
      return !validateMedia(item);
    });

    const activeFiles = visibleFiles.map((item) => {
      return {
        data: item,
        link: fileToUrl(item, (url) => {
          clearFileActive?.push(url);
        }),
        isVideo: false,
      } as IMediasPrev;
    });

    if (messages.length) {
      setMessageMedias(messages);
    }

    setImages((prev) => [...prev, ...activeFiles]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const validateMedia = (file: File) => {
    //  calculate bytes to megabytes
    return (
      file.size / Math.pow(10, 6) > Number(process.env.NEXT_PUBLIC_MEDIAS_SIZE)
    );
  };
  const handleSort = () => {};
  const handleCloseImage = useCallback(
    (image: ImageType, index: number) => {
      images.splice(index, 1);
      setImages([...images]);

      if (detectedArray.current.length) {
        detectedArray.current = detectedArray.current.filter(
          (item) => item.index !== index
        );
      }
    },
    [images]
  );
  return (
    <WrapperDialog
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px",
        },
      }}
      fullWidth={true}
      maxWidth={"md"}
      open={openPostModal}
      setOpen={(v) => {
        dispatch(setOpenPostModal(v));
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full h-full p-10 text-black-main flex flex-col justify-end relative"
      >
        {loadingForm && (
          <div className="absolute inset-0 bg-black-040 flex items-center justify-center z-20">
            <LoadingSecondary color="#3E3771" />
          </div>
        )}
        <div className="flex items-center gap-4 text-1xl font-semibold tracking-wider">
          <Avatar
            sx={{
              width: "4rem",
              height: "4rem",
            }}
            src={(user && user.avatar) || contants.avartarDefault}
          />
          <span>{(user && user.displayName) || user?.username}</span>
        </div>
        <div className="w-full mt-8 rounded-[20px] border border-gray-primary p-5 flex flex-col justify-between">
          <textarea
            ref={refInput}
            spellCheck={false}
            className="w-full resize-none outline-none scroll placeholder:text-1xl text-1xl "
            placeholder="What is happening?"
            name="status"
            id="status"
            cols={10}
            rows={4}
          />
          {!Validate.isBlank(messageText) && (
            <span className="text-sm text-fill-heart mb-2 italic">
              {messageText}
            </span>
          )}
          <div className="flex items-center justify-start gap-5">
            <div {...getRootProps()}>
              <WrapperAnimation hover={{}}>
                <div className="flex items-center justify-center border gap-2 py-3 px-6 text-sm bg-[#F6F6F6] text-violet-post-primary border-violet-post-primary font-medium rounded-lg w-fit cursor-pointer">
                  <FontAwesomeIcon className="text-[20px]" icon={faPhotoFilm} />
                  <span>Media</span>
                </div>
              </WrapperAnimation>

              <input {...getInputProps} hidden />
            </div>

            <EmojiPicker
              placement="right-end"
              classnNameIcon="text-violet-post-primary cursor-pointer"
              onEmoji={handleAddIcon}
              stylePicker={{ height: 300 }}
            />
          </div>
          {/* message */}
          {messageMedias.length > 0 && (
            <ul className="pl-5 list-disc text-sm italic text-fill-heart mt-4 ">
              {messageMedias.map((item, index) => {
                return (
                  <li key={item}>
                    {item}{" "}
                    {index === 0 && (
                      <span
                        onClick={() => setMessageMedias([])}
                        className="text-blue-primary hover:underline cursor-pointer"
                      >
                        OK
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {/* preview medias and images */}
          {images.length > 0 && (
            <>
              <div className="flex items-center gap-3 flex-wrap  mt-4">
                {images.map((item, index) => {
                  return (
                    <ImageDetect
                      key={item.link}
                      onDragStart={() => (dragImage.current = index)}
                      onDragEnter={() => (draggedOverImage.current = index)}
                      onDragEnd={handleSort}
                      data={item}
                      index={index}
                      handleCloseImage={handleCloseImage}
                      onDetected={(result) => {
                        detectedArray.current.push(result);
                      }}
                    />
                  );
                })}

                {isDragActive && (
                  <div className="w-20 mt-4 aspect-square rounded border-dashed border-2 border-gray-primary flex items-center justify-center text-2xl text-black-main">
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <ul className="text-gray-500 italic text-sm mt-3">
                  <li>
                    You can drag and drop to choose the display position for the
                    article. By default the first image will be displayed
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
      </form>
    </WrapperDialog>
  );
}
