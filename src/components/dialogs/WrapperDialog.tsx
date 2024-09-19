"use client";
import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Dialog, DialogProps, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface IWrapperDialogProps {
  open: boolean;
  children: ReactNode;
  className?: string;
  setOpen: (open: boolean) => void;
  onClose?: () => void;
}

export default function WrapperDialog({
  open,
  children,
  className,
  setOpen,
  onClose,
  ...props
}: IWrapperDialogProps & DialogProps) {
  const handleClose = () => {
    setOpen(false);
    if (!onClose) return;
    onClose();
  };

  return (
    <>
      <Dialog
        className={className}
        sx={{
          color: "#333333",
        }}
        {...props}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog"
      >
        {children}
      </Dialog>
    </>
  );
}
