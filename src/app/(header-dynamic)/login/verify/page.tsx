"use client";
import { refreshVerifyCode, verifyCode } from "@/apis/user";
import LoadingPrimary from "@/components/common/loadings/LoadingPrimary";
import { contants } from "@/utils/constant";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
export default function Verify() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const code = searchParam.get("code");
  const [loading, setLoading] = useState(false);
  let node = <LoadingPrimary />;
  const handleRefreshCode = async () => {
    try {
      setLoading(true);
      const response = await refreshVerifyCode(code || "");
      setLoading(false);
      if (!response.errors || response.status == 200) {
        toast.success("Re-send code successfuly, please check your email");
      }
    } catch (error) {
      setLoading(false);
      toast.error(contants.messages.errors.server);
    }
  };
  if (!code) {
    toast.error(contants.messages.errors.server);
    router.push("/login");
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["login/verify", code],
    queryFn: () => verifyCode(code || ""),
  });

  useEffect(() => {
    if (data && data?.status === 200) {
      toast.success("Successfully Authentication");
      router.push("/login");
    }

    if (data && data?.status === 400) {
      toast.success(data.message);
      router.push("/login");
    }
  }, [data, router]);

  if (
    data &&
    (data?.status === 404 || data?.status === 401 || data?.status === 509)
  ) {
    return (
      <ContainerContent>
        <div className="bg-[#f2f2f2] w-[40%] min-h-[200px] rounded-xl m-auto flex items-center justify-center flex-col text-black-main gap-4 mb-[-8%] my-28">
          <FontAwesomeIcon
            className="text-4xl text-red-primary"
            icon={faCircleXmark}
          />
          <span className="text-2xl uppercase">Code is expired.</span>

          <span
            onClick={handleRefreshCode}
            className="cursor-pointer hover:underline text-blue-primary"
          >
            Click to re send a new code to your email{" "}
          </span>
          {loading && <LoadingPrimary />}
        </div>
      </ContainerContent>
    );
  }

  return node;
}
