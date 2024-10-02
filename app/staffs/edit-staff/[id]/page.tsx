"use client";
import IconLeaves from "@/app/assets/icons/iconLeaves.png";
import IconUserWhite from "@/app/assets/icons/iconUserWhite.svg";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledAvatarUser from "@/components/common/StyledAvatarUser";
import StyledHeader from "@/components/common/StyledHeader";
import useWindowSize from "@/hooks/useWindowSize";
import { useStaffStore } from "@/stores/staffStore";
import Image from "next/image";
import StyledUserInfoTab from "../../components/StyledUserInfoTab";

export default function EditStaffScreen() {
  const windowSize = useWindowSize();

  const { selectedStaff } = useStaffStore((state) => state);

  return (
    <div className="w-full flex ">
      <SideBarComponent />
      <div className="w-full max-h-screen block bg-white laptop:p-5  ">
        <StyledHeader />
        <div
          style={{
            maxHeight: windowSize.height - 100 - 40,
            minHeight: windowSize.height - 100 - 40,
          }}
          className="w-full laptop:border border-border rounded-md "
        >
          <div className="h-[120px] flex justify-between items-end px-4 rounded-sm bg-white w-full">
            <StyledAvatarUser
              fullName={selectedStaff?.fullname || ""}
              positionName={selectedStaff?.position_name || ""}
              imageUrl={selectedStaff?.image}
              email={selectedStaff?.email || ""}
            />
            {/* <Button
              type="button"
              onClick={() => {}}
              className="min-w-[172px] hover:bg-primary-hover"
            >
              <p className={"text-white"}>Save</p>
            </Button> */}
          </div>

          <div
            className="w-full flex flex-col laptop:flex-row gap-x-8 px-4 py-4 "
            style={{
              maxHeight: windowSize.height - 100 - 40 - 120 - 20,
              minHeight: windowSize.height - 100 - 40 - 120 - 20,
            }}
          >
            <div className="w-full laptop:w-[242px] h-[110px] border border-border rounded-md flex items-center justify-center flex-row laptop:flex-col">
              <div className="flex h-full py-3 laptop:py-0 flex-1 items-center justify-start px-5 bg-primary w-full rounded-tl-md rounded-tr-none laptop:rounded-tr-md rounded-bl-md laptop:rounded-bl-none">
                <Image alt="" src={IconUserWhite} />
                <p className="text-[16px] font-semibold text-white mx-2">
                  Profile
                </p>
              </div>
              <div className="flex h-full py-3 laptop:py-0 flex-1 items-center justify-start px-5 bg-white w-full rounded-bl-md rounded-br-md hover:cursor-not-allowed">
                {/* <div className="h-3 w-3 rounded-full bg-white mx-2" /> */}
                <Image alt="" src={IconLeaves} width={24} height={24} />
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
              className="w-full laptop:border border-border flex items-center justify-center flex-col rounded-md "
            >
              <StyledUserInfoTab mode={"edit"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
