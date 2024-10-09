"use client";
import classNames from "classnames";
import React, {
  ChangeEvent,
  FocusEventHandler,
  FormEvent,
  useState,
} from "react";
import style from "./styles/profile.module.css";
import { Avatar } from "@mui/material";
import { contants } from "@/utils/constant";
import { ProfileType, RootState } from "@/configs/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import DivTextfield from "@/components/common/inputs/DivTextField";
export interface IProfilePageProps {
  pages: [string];
}

const initdata = {
  fullname: "",
  email: "",
  phone: "",
  gender: "Male",
  birthday: "",
};
const initdataErrors = {
  fullname: "",
  email: "",
  phone: "",
  gender: "",
  birthday: "",
};
export default function ProfilePage({ pages }: IProfilePageProps) {
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const [avartar, setAvartar] = useState(user?.avatar);
  const [openEditor, setOpenEditor] = useState(false);
  const [form, setForm] = useState<ProfileType>(initdata);
  const [errors, setErrors] = useState<ProfileType>(initdataErrors);
  const handleOpenConfirm = (e: FormEvent<HTMLFormElement>) => {};
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};
  return (
    <>
      <form
        onSubmit={handleOpenConfirm}
        className="px-14 py-[50px] w-full h-full rounded flex flex-col justify-between"
      >
        <div className="flex flex-col justify-between gap-[40px]">
          <div className="flex items-center flex-col w-full">
            <div
              className={classNames("relative rounded-full overflow-hidden", {
                [style["avatar"]]: true,
              })}
            >
              <Avatar
                sx={{
                  width: 140,
                  height: 140,
                }}
                alt="avatar"
                src={avartar || contants.avartarDefault}
              />

              <div
                onClick={() => setOpenEditor(true)}
                className={classNames(
                  "absolute bg-[rgba(0,0,0,.4)] inset-0 flex items-center justify-center text-white transition-all ease-linear cursor-pointer",
                  {
                    [style["avatar-backdrop"]]: true,
                  }
                )}
              >
                <FontAwesomeIcon icon={faEdit} />
              </div>
            </div>
          </div>
          {/* text field */}
          <DivTextfield
            propsInput={{
              name: "fullname",
              value: form.fullname,
              message: errors.fullname,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
            label="Full name"
          />

          <div className="flex items-center gap-[22px] lg:gap-12 flex-col md:flex-row">
            <div className="flex items-center flex-col w-full gap-[40px]">
              <DivTextfield
                propsInput={{
                  disabled: (() => {
                    if (!user) return true;

                    if (
                      (!user.email || user.email.length < 0) &&
                      user.provider === "facebook"
                    )
                      return false;

                    return true;
                  })(),
                  name: "email",
                  type: "email",
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: form.email,
                  message: errors.email,
                }}
                label="Email"
              />
              <DivTextfield
                dataSelect={[
                  {
                    id: "Male",
                    name: "Male",
                  },
                  {
                    id: "Female",
                    name: "Female",
                  },
                ]}
                propsInput={{
                  name: "gender",
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: form.gender,
                  message: errors.gender,
                }}
                label="Gender"
              />
            </div>
            <div className="flex items-center flex-col w-full gap-[40px]">
              <DivTextfield
                propsInput={{
                  name: "phone",
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: form.phone,
                  message: errors.phone,
                }}
                label="Phone number"
              />
              <DivTextfield
                propsInput={{
                  name: "birthday",
                  type: "date",
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: form.birthday,
                  message: errors.birthday,
                }}
                label="Birthday"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
