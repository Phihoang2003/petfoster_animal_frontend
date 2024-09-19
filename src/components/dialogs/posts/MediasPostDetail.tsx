import { IImagePost } from "@/configs/interface";
import React, { MouseEvent, RefObject, useRef, useState } from "react";

const variants = {
  initial: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  animate: {
    x: 0,
    opacity: 1,

    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? -100 : 100,
      opacity: 0,

      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    };
  },
};
export interface IMediaPostDetailProps {
  images: IImagePost[];
}
export default function MediasPostDetail({ images }: IMediaPostDetailProps) {
  const [curImage, setCurImage] = useState(0);
  const [direction, setDirection] = useState(0);
  // video refs
  const ref = useRef<HTMLVideoElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const refTimeLine = useRef<HTMLInputElement>(null);
  const refProgress: RefObject<HTMLDivElement> = useRef(null);
  // video state
  const [hover, setHover] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [percent, setPercent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const nextStep = () => {
    setDirection(1);
    if (curImage == images.length - 1) {
      setCurImage(0);
      return;
    }
    setCurImage(curImage + 1);
  };
  const prevStep = () => {
    setDirection(-1);
    if (curImage === 0) {
      setCurImage(images.length - 1);
      return;
    }
    setCurImage(curImage - 1);
  };
  const handlePlay = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!ref.current) return;
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
  };
  const handleLeave = () => {
    setHover(false);
  };

  const handleOver = () => {
    setHover(true);
  };
  const handleEnded = () => {
    if (!ref.current) return;
    ref.current.play();
  };
  const handlePlaying = () => {
    if (!ref.current) return;
    const { duration, currentTime } = ref.current;
    let timeUpdate = ((currentTime * 100) / duration).toFixed(0);
    setPercent(Number(timeUpdate));
  };
  return <div>MediasPostDetail</div>;
}
