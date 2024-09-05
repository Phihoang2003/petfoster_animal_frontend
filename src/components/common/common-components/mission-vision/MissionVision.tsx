import * as React from "react";
import { faBinoculars, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import BoxTitle from "@/components/boxs/BoxTitle";
import MissionVisionItem from "@/components/common/common-components/mission-vision/MissionVisionItem";

export default function MissionVision() {
  return (
    <BoxTitle title="MISSION & VISION" className="my-20">
      <div className="w-full grid lg:grid-cols-2 items-center justify-between gap-[42px]">
        <MissionVisionItem
          data={{
            icon: faCrosshairs,
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non nulla doloremque at dolorem libero ut, sequi nam explicabo iste maxime beatae, magnam facere aut fuga`,
            title: "Mission",
          }}
        />
        <MissionVisionItem
          data={{
            icon: faBinoculars,
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non nulla doloremque at dolorem libero ut, sequi nam explicabo iste maxime beatae, magnam facere aut fuga`,
            title: "Vision",
          }}
        />
      </div>
    </BoxTitle>
  );
}
