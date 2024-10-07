"use client";
import IconUserWhite from "@/app/assets/icons/iconUserWhite.svg";
import IconLeaves from "@/app/assets/icons/iconLeaves.png";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import StyledUserInfoTab from "../components/StyledUserInfoTab";

export default function CreateStaffScreen() {
  // const [loading, setLoading] = useState(false);
  const windowSize = useWindowSize();

  return (
    <div className="w-full flex ">
      <SideBarComponent />
      {/* <StyledOverlay isVisible={loading} /> */}
      <div className="w-full max-h-screen block bg-white  ">
        <StyledHeader />
        <div
          style={{
            maxHeight: windowSize.height - 100,
            minHeight: windowSize.height - 100,
          }}
          className="laptop:pl-10 laptop:pr-7 px-4 py-5 w-full"
        >
          <div
            className="w-full laptop:border border-border rounded-md laptop:px-5 laptop:py-6 flex flex-col laptop:flex-row gap-x-8"
            style={{
              maxHeight: windowSize.height - 100 - 40,
              minHeight: windowSize.height - 100 - 40,
            }}
          >
            <div className="w-full laptop:w-[242px] h-[110px] border border-border rounded-md flex items-center justify-center flex-row laptop:flex-col">
              <div className="flex h-full flex-1 items-center justify-start px-5 bg-primary w-full rounded-tl-md rounded-tr-none laptop:rounded-tr-md rounded-bl-md laptop:rounded-bl-none">
                <Image alt="" src={IconUserWhite} />
                <p className="text-[16px] font-semibold text-white">Profile</p>
              </div>
              <div className="flex h-full flex-1 items-center justify-start px-5 bg-white w-full rounded-bl-md rounded-br-md hover:cursor-not-allowed">
                {/* <div className="h-3 w-3 rounded-full bg-white mx-2" /> */}
                <Image alt="" src={IconLeaves} width={24} height={24} />
                <p className="text-[16px] font-semibold ">Leaves</p>
              </div>
            </div>
            <div
              style={{
                maxHeight: windowSize.height - 100 - 40 - 48,
                minHeight: windowSize.height - 100 - 40 - 48,
              }}
              className="w-full   flex items-center justify-center flex-col rounded-md "
            >
              <StyledUserInfoTab mode={"create"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
