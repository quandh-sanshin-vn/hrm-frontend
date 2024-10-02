"use client";
import IconLeaves from "@/app/assets/icons/iconLeaves.png";
import IconUserWhite from "@/app/assets/icons/iconUserWhite.svg";
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
      <div className="w-full max-h-screen block bg-white p-5  ">
        <StyledHeader />
        <div
          style={{
            maxHeight: windowSize.height - 100 - 40,
            minHeight: windowSize.height - 100 - 40,
          }}
          className="w-full  border border-border rounded-md "
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
              className="min-w-[172px] hover:bg-primary-hover"
            >
              <p className={"text-white"}>Edit Profile</p>
            </Button>
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
              <StyledUserInfoTab mode={"view"} />
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
