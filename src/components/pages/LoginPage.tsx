"use client";
import { login } from "@/apis/user";
import BoxSign from "@/components/boxs/BoxSign";
import TextField from "@/components/common/inputs/TextField";
import LoadingPrimary from "@/components/common/loadings/LoadingPrimary";
import { UserFormType } from "@/configs/types";
import { links } from "@/data/links";
import { setToken } from "@/redux/slice/userSlice";
import { contants } from "@/utils/constant";
import { getPreviousUrl } from "@/utils/session";
import Validate from "@/utils/validate";
import { Stack } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const initalDataForm = {
  username: "",
  password: "",
};
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<UserFormType>(initalDataForm);
  const [errors, setErrors] = useState<UserFormType>(initalDataForm);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();

  const validate = () => {
    let flag = false;
    const validErrors: UserFormType = initalDataForm;
    const validUsername = Validate.username(form.username);
    const validPassword = Validate.password(form.password);
    validErrors.username = validUsername.message;
    validErrors.password = validPassword.message;

    if (validUsername.error) {
      flag = true;
    }
    if (validPassword.error) {
      flag = true;
    }

    setErrors(validErrors);

    return flag;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const dynamicKey = e.target.name as keyof UserFormType;
    const { message } = Validate[dynamicKey](e.target.value);
    setErrors({
      ...errors,
      [dynamicKey]: message,
    });
  };
  const handleForward = () => {
    const preUrl = getPreviousUrl();
    if (preUrl) {
      router.push(preUrl);
    } else {
      router.push(links.home);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) return;
    try {
      setLoading(true);
      const res = await login(form);
      setLoading(false);
      if (res.errors && res.message === "401") {
        toast.warning(
          "Your account has not been verified. Please check your email"
        );
        return;
      }
      if (res.errors && Object.keys(res.errors).length > 0) {
        setErrors({
          username: res.errors.username ? res.errors.username : "",
          password: res.errors.password ? res.errors.password : "",
        });
        return;
      }
      dispatch(setToken(res.token));
      requestIdleCallback(() => {
        handleForward();
      });
    } catch (error) {
      console.log("error in login page: " + error);
      setLoading(false);
      toast.error(contants.messages.errors.server);
    }
  };

  return (
    <BoxSign onSubmit={handleSubmit} title="SIGN IN" titleBtn="SIGN IN">
      <Stack spacing={"20px"}>
        <TextField
          message={errors.username}
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.username}
          type="text"
          name="username"
          label={"Username"}
          size="medium"
          fullWidth
        />
        <TextField
          onBlur={handleBlur}
          message={errors.password}
          onChange={handleChange}
          value={form.password}
          type="password"
          name="password"
          label={"Password"}
          size="medium"
          fullWidth
        />
      </Stack>

      {loading && <LoadingPrimary />}
    </BoxSign>
  );
}
