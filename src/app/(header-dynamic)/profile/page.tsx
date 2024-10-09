import dynamic from "next/dynamic";

import React from "react";
const ProfilePage = dynamic(
  () => import("../../../components/pages/profile/ProfilePage"),
  { ssr: false }
);

export interface IProfileProps {
  params: { pages: [string] };
}

export default function Profile({ params }: IProfileProps) {
  return <ProfilePage pages={params.pages} />;
}
