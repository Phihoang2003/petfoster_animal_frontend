"use client";
import classNames from "classnames";
import React, {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import style from "./styles/profile.module.css";
import { Avatar } from "@mui/material";
import { contants } from "@/utils/constant";
import { ProfileType, RootState } from "@/configs/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import DivTextfield from "@/components/common/inputs/DivTextField";
import MainButton from "@/components/buttons/MainButton";
import Confirm from "@/components/common/inputs/Confirm";
import LoadingPrimary from "@/components/common/loadings/LoadingPrimary";
import AvatarEdit from "@/components/common/inputs/AvatarEdit";
import { pushNoty } from "@/redux/slice/appSlice";
import { fetchUserByToken } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";
import moment from "moment";
import Validate from "@/utils/validate";
import { updateCurrentUser } from "firebase/auth";
import { updateUser } from "@/apis/user";
import { toast } from "react-toastify";
export interface IProfilePageProps {
  pages: [string];
}

const initdata = {
  fullName: "",
  email: "",
  phone: "",
  gender: "Male",
  birthday: "",
};
const initdataErrors = {
  fullName: "",
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
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState({
    open: false,
    confirm: "cancel",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleOpenConfirm = (e?: FormEvent<HTMLSpanElement>) => {
    e?.preventDefault();
    setOpenConfirm({ ...openConfirm, open: true });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const dynamicKey = e.target.name as keyof ProfileType;
    const { message } = Validate[dynamicKey](e.target.value);
    setErrors({
      ...errors,
      [dynamicKey]: message,
    });
  };
  const handleConfirm = async (v: {
    open: boolean;
    confirm: "cancel" | "ok";
  }) => {
    if (v.open || v.confirm === "cancel") return;

    await handleSubmit();
  };
  const handleSubmit = async () => {
    if (validate()) return;
    try {
      setLoading(true);
      const response = await updateUser({
        ...form,
        avatar: avartar,
      });
      setLoading(false);
      if (response.errors) {
        setErrors({
          ...errors,
          ...(response.errors as unknown as ProfileType),
        });

        return;
      }

      toast.success("Update Successfuly");

      dispatch(fetchUserByToken());

      router.refresh();
    } catch (error) {
      console.log("errors in product page when update" + error);
      setLoading(false);
      dispatch(fetchUserByToken());
      router.push("/");
    }
  };

  //validate form before submit
  const validate = () => {
    let flag = false;
    const validateErrors: ProfileType = { ...initdataErrors };
    const keys: string[] = Object.keys(validateErrors);
    keys.forEach((key) => {
      const dynamic = key as keyof ProfileType;
      const { message, error } = Validate[dynamic](form[dynamic]);
      validateErrors[dynamic] = message;
      flag = flag || error;
    });
    setErrors(validateErrors);
    return flag;
  };
  useEffect(() => {
    if (!user) {
      dispatch(
        pushNoty({
          title: "Some thing went wrong, please re-login to use continue !",
          open: true,
          type: "error",
        })
      );
      dispatch(fetchUserByToken());
      router.push("/");
      return;
    }
    setForm({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender ? "Male" : "Female",
      birthday: user?.birthday
        ? moment(user?.birthday).format("YYYY-MM-DD")
        : "",
    });
    setAvartar(user.avatar);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const initOjb = {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender ? "Male" : "Female",
      birthday: user?.birthday
        ? moment(user?.birthday).format("yyyy-MM-D")
        : "",
    };

    if (
      JSON.stringify(initOjb) != JSON.stringify(form) ||
      user.avatar != avartar
    ) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, avartar]);
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
              name: "fullName",
              value: form.fullName,
              message: errors.fullName,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
            label="Full Name"
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
        <div className="flex items-center justify-center w-full mt-16">
          {showBtn && <MainButton width={"208px"} title="update" />}
        </div>
      </form>

      <AvatarEdit
        setOpen={setOpenEditor}
        onAvartar={(avatar) => {
          setAvartar(avatar || user?.avatar);
        }}
        open={openEditor}
      />

      {loading && <LoadingPrimary />}

      <Confirm
        title={"Notification"}
        subtitle={"Are want to update your profile ?"}
        open={openConfirm.open}
        setOpen={setOpenConfirm}
        onConfirm={handleConfirm}
      />
    </>
  );
}
