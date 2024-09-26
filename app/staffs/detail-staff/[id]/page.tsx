"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import StyledOverlay from "@/components/common/StyledOverlay";
import useWindowSize from "@/hooks/useWindowSize";
import React, { useState } from "react";
import StyledUserInfoTab from "../../components/StyledUserInfoTab";
import Image from "next/image";
import IconUserWhite from "@/app/assets/icons/iconUserWhite.svg";
import IconLeaves from "@/app/assets/icons/iconLeaves.png";
import StyledAvatarUser from "@/components/common/StyledAvatarUser";

export default function CreateStaffScreen() {
  const [loading, setLoading] = useState(false);
  const windowSize = useWindowSize();

  return (
    <div className="w-full flex ">
      <SideBarComponent />
      <StyledOverlay isVisible={loading} />
      <div className="w-full max-h-screen block bg-white p-5  ">
        <StyledHeader />
        <div
          style={{
            maxHeight: windowSize.height - 100 - 40,
            minHeight: windowSize.height - 100 - 40,
          }}
          className="w-full  border border-border rounded-md "
        >
          <div className="h-[120px]  rounded-sm bg-white w-full">
            <StyledAvatarUser
              fullName="An"
              positionName="Manager"
              imageUrl={undefined}
              email="machineX2gmail.com"
            />
          </div>

          <div
            className="w-full flex gap-x-8 px-4 py-4 "
            style={{
              maxHeight: windowSize.height - 100 - 40 - 120 - 20,
              minHeight: windowSize.height - 100 - 40 - 120 - 20,
            }}
          >
            <div className="w-[242px] h-[110px] border border-border rounded-md flex items-center justify-center flex-col ">
              <div className="flex flex-1 items-center justify-start px-5 bg-primary w-full rounded-tl-md rounded-tr-md hover:cursor-pointer">
                <Image alt="" src={IconUserWhite} />
                <p className="text-[16px] font-semibold text-white mx-2">
                  Profile
                </p>
              </div>
              <div className="flex flex-1 items-center justify-start px-5 bg-white w-full rounded-bl-md rounded-br-md hover:cursor-not-allowed">
                <Image alt="" src={IconLeaves} />
                <p className="text-[16px] font-semibold text-secondary mx-2">
                  Leaves
                </p>
              </div>
            </div>
            <div
              style={{
                maxHeight: windowSize.height - 100 - 40 - 120 - 48 - 20,
                minHeight: windowSize.height - 100 - 40 - 120 - 48 - 20,
              }}
              className="w-full border border-border flex items-center justify-center flex-col rounded-md "
            >
              <StyledUserInfoTab />
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
