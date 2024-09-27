"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import StyledOverlay from "@/components/common/StyledOverlay";
import useWindowSize from "@/hooks/useWindowSize";
import React, { useState } from "react";
import StyledUserInfoTab from "../components/StyledUserInfoTab";
import IconUserWhite from "@/app/assets/icons/iconUserWhite.svg";
import Image from "next/image";

export default function CreateStaffScreen() {
  const [loading, setLoading] = useState(false);
  const windowSize = useWindowSize();

  return (
    <div className="w-full flex ">
      <SideBarComponent />
      <StyledOverlay isVisible={loading} />
      <div className="w-full max-h-screen block bg-white  ">
        <StyledHeader />
        <div
          style={{
            maxHeight: windowSize.height - 100,
            minHeight: windowSize.height - 100,
          }}
          className="pl-10 pr-7 py-5 w-full"
        >
          <div
            className="w-full border border-border rounded-md px-5 py-6 flex gap-x-8"
            style={{
              maxHeight: windowSize.height - 100 - 40,
              minHeight: windowSize.height - 100 - 40,
            }}
          >
            <div className="w-[242px] h-[110px] border border-border rounded-md flex items-center justify-center flex-col ">
              <div className="flex flex-1 items-center justify-start px-5 bg-primary w-full rounded-tl-md rounded-tr-md">
                <Image alt="" src={IconUserWhite} />
                <p className="text-[16px] font-semibold text-white">Profile</p>
              </div>
              <div className="flex flex-1 items-center justify-start px-5 bg-white w-full rounded-bl-md rounded-br-md hover:cursor-not-allowed">
                <div className="h-3 w-3 rounded-full bg-white mx-2" />
                <p className="text-[16px] font-semibold text-white"></p>
              </div>
            </div>
            <div
              style={{
                maxHeight: windowSize.height - 100 - 40 - 48,
                minHeight: windowSize.height - 100 - 40 - 48,
              }}
              className="w-full  border border-border flex items-center justify-center flex-col rounded-md "
            >
              <StyledUserInfoTab mode={"create"} />
            </div>
          </div>
          {/* <SearchArea loading setLoading={setLoading} />
            <StyledStaffMasterTable />
            <StyledPagination
              totalItems={staffList?.length || 0}
              itemsPerPage={ITEM_PER_PAGE}
              currentPage={page}
              onPageChange={setPage}
            /> */}
        </div>
      </div>
    </div>
  );
}
