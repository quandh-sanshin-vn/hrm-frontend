"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import { useDetectDevice } from "@/hooks/use-detect-device";
import {
  getDataOfYear,
  getDateOfMonth,
  monthsOfYear,
} from "@/utilities/helper";
import { useEffect } from "react";

function MainScreen() {
  useEffect(() => {
    // getDataOfYear(2023);
    getDateOfMonth();
    // monthsOfYear(2023);
  }, []);
  useDetectDevice();
  return (
    <div className="flex">
      <SideBarComponent />
      <div>{/* <Months /> */}</div>
    </div>
  );
}

export default MainScreen;
