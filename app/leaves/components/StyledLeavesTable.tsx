"use client";
import IconDetail from "@/app/assets/icons/iconViewDetail.svg";
import DefaultImage from "@/app/assets/images/avatar_default.png";
import { AlertDialogApproveLeave } from "@/components/common/alert-dialog/AlertDialogApproveLeave";
import StyledHeaderColumn from "@/components/common/StyledHeaderColumn";
import { GetLeavesListUseCase } from "@/core/application/usecases/leave/getLeaveList";
import { Leave } from "@/core/entities/models/leave.model";
import { LeaveRepositoryImpl } from "@/core/infrastructure/repositories/leave.repo";
import useWindowSize from "@/hooks/useWindowSize";
import { useLeaveStore } from "@/stores/leavesStore";
import { LeaveType } from "@/utilities/enum";
import { LEAVE_STATUS } from "@/utilities/static-value";
import Image from "next/image";
import { useEffect, useState } from "react";
import StyledLeaveStatusItem from "./StyledLeaveStatusItem";
import LeaveDetailModal from "@/app/leaves/components/LeaveDetailModal";

const leaveRepo = new LeaveRepositoryImpl();
const getLeavesListUseCase = new GetLeavesListUseCase(leaveRepo);

interface Props {
  setLoading(loading: boolean): void;
  loading: boolean;
}

export default function StyledLeavesTable(props: Props) {
  const { setLoading } = props;
  const windowSize = useWindowSize();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    leaveList,
    searchParams,
    selectedLeave,
    updateSearchParams,
    updateLeaveListData,
    updateSelectedLeave,
  } = useLeaveStore((state) => state);

  const goToDetailPage = (leave: Leave) => {
    updateSelectedLeave(leave);
    setIsModalOpen(true);
  };

  //   const goToEditPage = (user: User) => {
  //     // updateSelectedStaff(user);
  //     // router.push(`/staffs/edit-staff/${user.id}`);
  //   };

  const onReloadData = async () => {
    try {
      setLoading(true);
      const params = { ...searchParams, page: 1 };
      const response = await getLeavesListUseCase.execute(params);
      updateSearchParams(params);
      updateLeaveListData(response?.data, response?.totalItem || 0);
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
      const response = await getLeavesListUseCase.execute(params);
      updateSearchParams(params);
      updateLeaveListData(response?.data, response?.totalItem || 0);
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
              onClick={() => onClickColumnHeader("employee_name")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center min-w-[180px]  w-[200px]  text-start hover:bg-gray-100 hover:cursor-pointer border-b "
            >
              <StyledHeaderColumn
                columnName={`Employee Name`}
                columnNameId="employee_name"
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th
              onClick={() => onClickColumnHeader("description")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[260px] w-[260px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              <StyledHeaderColumn
                columnName={`Description`}
                columnNameId={"description"}
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th
              onClick={() => onClickColumnHeader("type")}
              className=" text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[120px] w-[200px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              <StyledHeaderColumn
                columnName={"Type"}
                columnNameId={"type"}
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th
              onClick={() => onClickColumnHeader("created_at")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[160px] w-[200px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              <StyledHeaderColumn
                columnName={"Create date"}
                columnNameId={"created_at"}
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th
              onClick={() => onClickColumnHeader("day_leaves")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[160px] w-[200px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              <StyledHeaderColumn
                columnName={"Leave date"}
                columnNameId={"day_leaves"}
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th
              onClick={() => onClickColumnHeader("status")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[96px] w-[144px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              <StyledHeaderColumn
                columnName={"Status"}
                columnNameId={"status"}
                currentSortedColumnId={currentSortedColumn}
                direction={sortDirection}
              />
            </th>
            <th className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[112px]  w-[112px] hover:bg-gray-100 hover:cursor-pointer  border-b">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="hide-scrollbar">
          {leaveList.map((leave: Leave, index: number) => {
            return (
              <tr
                key={leave?.id ? leave?.id.toString() : String(index)}
                className="overflow-x-auto w-screen align-center h-[52px]"
              >
                <td className="pl-2 min-w-[80px] laptop:min-w-[260px] border-b border-[#F6F6F6]">
                  <div className="flex justify-start items-center laptop:gap-x-2">
                    <Image
                      alt=""
                      src={
                        !leave.image
                          ? DefaultImage
                          : "http://192.168.1.171:8000" + leave.image
                      }
                      className={"contain-size h-8 w-8 rounded-full"}
                      height={44}
                      width={44}
                    />
                    <p className=" text-[16px] font-normal pl-2">
                      {leave.employee_name}
                    </p>
                  </div>
                </td>
                <td className="pl-2 w-[116px] text-start text-[16px] font-normal border-b border-[#F6F6F6]">
                  {leave.description}
                </td>
                <td className="pl-2 w-[200px] text-[16px] font-normal border-b border-[#F6F6F6]">
                  {leave.salary == "0" ? LeaveType.Unpaid : LeaveType.Paid}
                </td>
                <td className="pl-2 w-[200px] text-[16px] font-normal border-b border-[#F6F6F6]">
                  {leave.created_at}
                </td>
                <td className="pl-2 w-[200px] text-[16px] font-normal border-b border-[#F6F6F6]">
                  {leave.day_leaves}
                </td>
                <td className="pl-2 w-[144px] text-[16px] font-normal border-b border-[#F6F6F6]">
                  <StyledLeaveStatusItem value={leave?.status || ""} />
                </td>
                <td className="pl-2 w-[112px] text-[16px] font-normal border-b border-[#F6F6F6]">
                  <div className="flex items-center justify-start w-full gap-x-2">
                    <Image
                      onClick={() => goToDetailPage(leave)}
                      alt="See detail"
                      src={IconDetail}
                      className="h-[24px] aspect-square hover:cursor-pointer"
                    />
                    {leave.status == LEAVE_STATUS[0].value && (
                      <AlertDialogApproveLeave
                        onClose={onReloadData}
                        leave={leave}
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <LeaveDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leave={selectedLeave}
      />
    </div>
  );
}
