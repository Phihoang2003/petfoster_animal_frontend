import WraperDialogComfirm from "@/components/dialogs/WrapperDialogConfirm";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";

export interface IConfirmProps {
  open: boolean;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  setOpen: (value: { open: boolean; confirm: "ok" | "cancel" }) => void;
  onConfirm?: (value: { open: boolean; confirm: "ok" | "cancel" }) => void;
  onClose?: () => void;
}
export default function Confirm({
  title,
  open,
  subtitle = "You want to delete this product ?",
  setOpen,
  onConfirm,
  onClose,
}: IConfirmProps) {
  const [confirm, setConfirm] = useState<{
    open: boolean;
    confirm: "ok" | "cancel";
  }>({ open: false, confirm: "cancel" });

  const handleClose = () => {
    setOpen({ ...confirm, open: false });
    if (!onClose) return;
    onClose();
  };

  useEffect(() => {
    if (!onConfirm) return;
    onConfirm(confirm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  return (
    <div>
      <WraperDialogComfirm
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="button" sx={{ textTransform: "capitalize" }}>
              {subtitle}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirm({ ...confirm, confirm: "cancel" });
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setConfirm({ ...confirm, confirm: "ok" });
              handleClose();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </WraperDialogComfirm>
    </div>
  );
}
