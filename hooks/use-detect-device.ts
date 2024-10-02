"use client";
import { useCommonStore } from "@/stores/commonStore";
import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

export const useDetectDevice = () => {
  const { updateSideBarStatus } = useCommonStore((state) => state);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width !== 0) {
      if (windowSize.width < 1024) updateSideBarStatus(false);
      else updateSideBarStatus(true);
    }
  }, [windowSize]);
};
