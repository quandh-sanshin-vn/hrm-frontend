"use client";
import IconLeaves from "@/app/assets/icons/iconLeaves.png";
import IconUserWhite from "@/app/assets/icons/iconUserWhite.svg";
import IconEditWhite from "@/app/assets/icons/iconEditWhite.svg";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledAvatarUser from "@/components/common/StyledAvatarUser";
import StyledHeader from "@/components/common/StyledHeader";
import { Button } from "@/components/ui/button";
import useWindowSize from "@/hooks/useWindowSize";
import { useStaffStore } from "@/stores/staffStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import StyledUserInfoTab from "../../components/StyledUserInfoTab";

export default function DetailStaffScreen() {
  // const [loading, setLoading] = useState(false);
  const windowSize = useWindowSize();
  const router = useRouter();
  const params = useParams();

  const { selectedStaff } = useStaffStore((state) => state);
  const goToDetailScreen = () => {
    router.push(`/staffs/edit-staff/${params?.id || "undefined"}`);
  };
  return (
    <div className="w-full flex ">
      <SideBarComponent />
      {/* <StyledOverlay isVisible={loading} /> */}
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
            <Button
              type="button"
              onClick={goToDetailScreen}
              className="hidden laptop:flex min-w-[172px] hover:bg-primary-hover"
            >
              <Image
                alt=""
                src={IconEditWhite}
                width={24}
                height={24}
                className="text-white mr-2"
              />
              <p className={"text-white"}>Edit Profile</p>
            </Button>
          </div>

          <div
            className="w-full flex flex-col laptop:flex-row gap-x-8 px-4 py-4 "
            style={{
              maxHeight: windowSize.height - 100 - 40 - 120 - 20,
              minHeight: windowSize.height - 100 - 40 - 120 - 20,
            }}
          >
            <div className="w-full laptop:w-[242px] h-[52px] laptop:h-[110px] border border-border rounded-md flex items-center justify-center flex-row laptop:flex-col">
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
              className="w-full laptop:border border-border flex items-center justify-center flex-col rounded-md"
            >
              <StyledUserInfoTab mode={"view"} />
            </div>
          </div>
          <Button
            type="button"
            onClick={goToDetailScreen}
            className="laptop:hidden h-[50px] mx-4 fixed bottom-[14px] right-0 left-0 font-normal text-white text-[16px] hover:bg-primary-hover rounded-lg"
          >
            <Image
              alt=""
              src={IconEditWhite}
              width={24}
              height={24}
              className="text-white mr-2"
            />
            <p className={"text-white"}>Edit Profile</p>
          </Button>
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
