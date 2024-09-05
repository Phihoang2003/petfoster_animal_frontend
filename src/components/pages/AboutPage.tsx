import AboutCom from "@/components/common/common-components/AboutCom";
import Feedback from "@/components/common/common-components/Feedback";
import MissionVision from "@/components/common/common-components/mission-vision/MissionVision";
import Footer from "@/components/common/common-footer/Footer";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <AboutCom hideTitle={false} />
      <MissionVision />
      <Feedback />
    </>
  );
}
