import RoundedButton from "@/components/buttons/RoundedButton";
import SocialButton from "@/components/buttons/SocialButton";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import {
  faSquareFacebook,
  faSquareGooglePlus,
} from "@fortawesome/free-brands-svg-icons";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, MouseEventHandler, ReactNode } from "react";

export interface IBoxSignProps {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  title: string;
  titleBtn?: string;
  link?: { link: string; content: string; contentLink: string };
  showForgot?: boolean;
  showReverify?: {
    onClick?: MouseEventHandler<HTMLSpanElement>;
  };
}
export default function BoxSign({
  onSubmit,
  children,
  title,
  titleBtn = "send",
  link = {
    link: "/register",
    contentLink: "Sign up",
    content: "Need an account?",
  },
  showForgot = true,
  showReverify,
}: IBoxSignProps) {
  const handleLoginWithFacebook = () => {};
  const handleLoginWithGoogle = () => {};

  return (
    <ContainerContent className="pt-24 text-black-main">
      <Grid2 container>
        <Grid2
          component={"form"}
          onSubmit={onSubmit}
          size={{ xs: 12, md: 6, lg: 6 }}
          sx={{
            borderRight: { xs: 0, md: 1 },
            borderColor: "#DBDBDB !important",
            pr: { xs: 0, md: "20px" },
            pl: { xs: 0, md: "10%" },
          }}
        >
          <Typography
            variant="h3"
            fontSize={{ xs: 18, md: 22, lg: 32 }}
            sx={{ mb: "30px" }}
            fontWeight={600}
            className="uppercase text-[#4D4D4D]"
          >
            {title}
          </Typography>

          {children}

          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="subtitle2"
              sx={{
                mt: "20px",
                fontSize: { xs: "14px", md: "15px", lg: "16px" },
              }}
            >
              {link.content}
              <Link
                href={link.link}
                className="text-blue-primary hover:underline ml-1"
              >
                {link.contentLink}
              </Link>
            </Typography>
            {showForgot && (
              <Typography
                variant="subtitle2"
                sx={{
                  mt: "20px",
                  fontSize: { xs: "14px", md: "15px", lg: "16px" },
                }}
              >
                <Link
                  href={"/reset-password"}
                  className="text-blue-primary hover:underline ml-1"
                >
                  Forgot password ?
                </Link>
              </Typography>
            )}
            {showReverify && (
              <Typography
                variant="subtitle2"
                sx={{
                  mt: "20px",
                  fontSize: { xs: "14px", md: "15px", lg: "16px" },
                }}
              >
                <span
                  onClick={showReverify?.onClick}
                  className="text-blue-primary hover:underline ml-1"
                >
                  Send new code to email ?
                </span>
              </Typography>
            )}
          </Stack>

          <RoundedButton title={titleBtn} />
        </Grid2>
        <Grid2
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pr: { xs: 0, md: "10%" },
            pl: { xs: 0, md: "20px" },
            mt: { xs: "20px", md: 0 },
          }}
          size={{ xs: 12, md: 6, lg: 6 }}
        >
          <Box component={"div"}>
            <span className="text-center w-full block">Or sign in with</span>

            <div className="grid grid-cols-2 items-center gap-2">
              <SocialButton
                onClick={handleLoginWithFacebook}
                title="Facebook"
                icon={faSquareFacebook}
              />
              <SocialButton
                onClick={handleLoginWithGoogle}
                title="Google"
                background="#0D9488"
                icon={faSquareGooglePlus}
              />
            </div>
          </Box>
        </Grid2>
      </Grid2>
    </ContainerContent>
  );
}
