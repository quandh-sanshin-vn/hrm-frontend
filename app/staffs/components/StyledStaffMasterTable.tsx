"use client";
import IconEdit from "@/app/assets/icons/iconEdit.svg";
import IconDetail from "@/app/assets/icons/iconViewDetail.svg";
import DefaultImage from "@/app/assets/images/avatar_default.png";
import { ALertDialogDeleteStaff } from "@/components/common/ALertDialogDeleteStaff";
import StyledHeaderColumn from "@/components/common/StyledHeaderColumn";
import { GetStaffListUseCase } from "@/core/application/usecases/staff-master/getUserList.usecase";
import { User } from "@/core/entities/models/user.model";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useWindowSize from "@/hooks/useWindowSize";
import { useStaffStore } from "@/stores/staffStore";
import { STAFF_STATUS, STAFF_STATUS_WORKING } from "@/utilities/static-value";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import StyledTableStatusItem from "./StyledTableStatusItem";

const userRepo = new UserRepositoryImpl();
const getStaffListUseCase = new GetStaffListUseCase(userRepo);

interface Props {
  setLoading(loading: boolean): void;
  loading: boolean;
}

export default function StyledStaffMasterTable(props: Props) {
  const { setLoading } = props;
  const windowSize = useWindowSize();
  const router = useRouter();
  const staffList = useStaffStore((state) => state.staffList);

  const {
    searchParams,
    updateStaffListData,
    updateSearchParams,
    updateSelectedStaff,
  } = useStaffStore((state) => state);

  const goToDetailPage = (user: User) => {
    updateSelectedStaff(user);
    router.push(`/staffs/detail-staff/${user.id}`);
  };

  const goToEditPage = (user: User) => {
    updateSelectedStaff(user);
    router.push(`/staffs/edit-staff/${user.id}`);
  };

  const onReloadData = async () => {
    try {
      setLoading(true);
      const params = { ...searchParams, page: 1 };
      const response = await getStaffListUseCase.execute(params);
      updateSearchParams(params);
      updateStaffListData(response?.data, response?.totalItem || 0);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const onReSearch = async (sort_by: string, sort_order: "asc" | "desc") => {
    try {
      setLoading(true);
      let params = searchParams;
      params = { ...searchParams, sort_by, sort_order };
      const response = await getStaffListUseCase.execute(params);
      updateSearchParams(params);
      updateStaffListData(response?.data, response?.totalItem || 0);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const [currentSortedColumn, setCurrentSortedColumn] = useState("");

  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "">(
    "asc"
  );

  const onClickColumnHeader = async (sort_column: string) => {
    if (currentSortedColumn === sort_column) {
      const direction = sortDirection === "asc" ? "desc" : "asc";
      onReSearch(sort_column, direction);
      setSortDirection(direction);
    } else {
      await onReSearch(sort_column, "asc");
      setCurrentSortedColumn(sort_column);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    if (!searchParams.sort_by) {
      setCurrentSortedColumn("");
      setSortDirection("");
    }
  }, [searchParams]);

  return (
    <div
      style={{
        maxHeight:
          windowSize.height -
          100 -
          52 -
          (windowSize.width > 1024 ? 150 : 256 + 18) -
          20,
        minHeight:
          windowSize.height -
          100 -
          52 -
          (windowSize.width > 1024 ? 150 : 256 + 18) -
          20,
        scrollbarWidth: "none",
      }}
      className="overflow-y-auto mobile:mt-[18px] laptop:mt-0 max-h-screen overscroll-none block rounded-sm w-full relative"
    >
      <table className="overflow-y-none overscroll-x-none max-h-screen overscroll-none w-full border-separate border-spacing-0 relative">
        <thead className="border-border border-b sticky top-0">
          <tr className=" align-center bg-white ">
            <th
              onClick={() => onClickColumnHeader("idkey")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center min-w-[132px]  w-[132px]  text-start hover:bg-gray-100 hover:cursor-pointer border-b "
            >
              <StyledHeaderColumn
                columnName={`Employee ID`}
                columnNameId="idkey"
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th
              onClick={() => onClickColumnHeader("employee_name")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[260px] w-[260px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              <StyledHeaderColumn
                columnName={`Employee Name`}
                columnNameId={"employee_name"}
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
              {/* Employee Name */}
            </th>
            <th
              onClick={() => onClickColumnHeader("position")}
              className=" text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[120px] w-[200px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              <StyledHeaderColumn
                columnName={"Position"}
                columnNameId={"position"}
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th
              onClick={() => onClickColumnHeader("status_working")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[160px] w-[200px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              <StyledHeaderColumn
                columnName={"Status working"}
                columnNameId={"status_working"}
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th
              onClick={() => onClickColumnHeader("status")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[80px] w-[144px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              <StyledHeaderColumn
                columnName={"Status"}
                columnNameId={"status"}
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th
              // onClick={() => onClickColumnHeader("status")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[112px]  w-[112px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="hide-scrollbar">
          {staffList.map((user: User, index: number) => {
            return (
              <tr
                key={user?.id ? user?.id.toString() : String(index)}
                className="overflow-x-auto w-screen align-center h-[52px]"
              >
                <td className="pl-2 w-[116px] text-start text-[16px] font-normal border-b border-[#F6F6F6]">
                  {user.idkey}
                </td>
                <td className="pl-2 min-w-[80px] laptop:min-w-[260px] border-b border-[#F6F6F6]">
                  <div className="flex justify-start items-center laptop:gap-x-2">
                    <Image
                      alt=""
                      src={
                        !user.image
                          ? DefaultImage
                          : "http://192.168.1.171:8000" + user.image
                      }
                      className={"contain-size h-8 w-8 rounded-full"}
                      height={44}
                      width={44}
                    />
                    <p className=" text-[16px] font-normal pl-2">
                      {user.fullname}
                    </p>
                  </div>
                </td>
                <td className="pl-2 w-[200px] text-[16px] font-normal border-b border-[#F6F6F6]">
                  {user.position_name}
                </td>
                <td className="pl-2 w-[200px] text-[16px] font-normal border-b border-[#F6F6F6]">
                  {
                    STAFF_STATUS_WORKING.find(
                      (item) => item.value == user.status_working
                    )?.name
                  }
                </td>
                <td className="pl-2 w-[144px] text-[16px] font-normal border-b border-[#F6F6F6]">
                  <StyledTableStatusItem value={user?.status || ""} />
                </td>
                <td className="pl-2 w-[112px] text-[16px] font-normal border-b border-[#F6F6F6]">
                  <div className="flex items-center justify-start w-full gap-x-2">
                    <Image
                      onClick={() => goToDetailPage(user)}
                      alt="See detail"
                      src={IconDetail}
                      className="h-[24px] aspect-square hover:cursor-pointer"
                    />
                    <Image
                      onClick={() => goToEditPage(user)}
                      alt="Go to edit"
                      src={IconEdit}
                      className="h-[24px] aspect-square hover:cursor-pointer"
                    />
                    {user.status != STAFF_STATUS[0].value && (
                      <ALertDialogDeleteStaff
                        onClose={onReloadData}
                        user={user}
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
