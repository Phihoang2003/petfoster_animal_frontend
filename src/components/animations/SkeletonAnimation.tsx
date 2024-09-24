import { Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

interface SkeletonAnimationProps {
  width?: string | number;
  height?: string | number;
  variant?: "rectangular" | "circular";
  sx?: object;
}

// Component SkeletonAnimation
export default function SkeletonAnimation({
  width = "100%",
  height = 20,
  variant = "rectangular",
  sx = {},
}: SkeletonAnimationProps) {
  const borderRadius = variant === "circular" ? "50%" : "4px";

  return (
    <Box
      sx={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        backgroundColor: "#e0e0e0",
        borderRadius: borderRadius,
        overflow: "hidden",
        position: "relative",
        ...sx,
      }}
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.6, 0.4, 0, 0.6, 0.4, 1] }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f0f0f0",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </Box>
  );
}
