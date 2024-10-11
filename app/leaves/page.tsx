"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import { GetLeavesListUseCase } from "@/core/application/usecases/leave/getLeaveList";
import { LeaveRepositoryImpl } from "@/core/infrastructure/repositories/leave.repo";
import { useDetectDevice } from "@/hooks/use-detect-device";
import useWindowSize from "@/hooks/useWindowSize";
import { useCommonStore } from "@/stores/commonStore";
import { useLeaveStore } from "@/stores/leavesStore";
import { useEffect, useState } from "react";
import SearchArea from "./components/SearchArea";
import StyledLeavesTable from "./components/StyledLeavesTable";
import { isMobile } from "react-device-detect";
import { GetLeaveListParams } from "@/apis/modules/leave";
import { ITEM_PER_PAGE } from "@/utilities/static-value";
import StyledPagination from "@/components/common/StyledPagination";
import StyledOverlay from "@/components/common/StyledOverlay";

const leaveRepo = new LeaveRepositoryImpl();
const getLeavesListUseCase = new GetLeavesListUseCase(leaveRepo);

export default function LeavesScreen() {
  useDetectDevice();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const windowSize = useWindowSize();
  const totalItems = useLeaveStore((state) => state.totalItems);

  const { updateSideBarStatus } = useCommonStore();

  const { searchParams, updateLeaveListData, updateSearchParams } =
    useLeaveStore((state) => state);

  const onPageChange = async (page: number) => {
    try {
      setLoading(true);
      const params = { ...searchParams, page };
      const response = await getLeavesListUseCase.execute(params);
      setPage(page);
      updateSearchParams(params);
      updateLeaveListData(response?.data, response?.totalItem || 0);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onFirstLoad();
    if (isMobile) updateSideBarStatus(false);
  }, []);

  const onFirstLoad = async () => {
    try {
      setLoading(true);
      const params: GetLeaveListParams = {
        page: 1,
        limit: ITEM_PER_PAGE,
      };

      const response = await getLeavesListUseCase.execute(params);
      console.log("----------------", response);
      updateLeaveListData(response?.data, response?.totalItem || 0);
      updateSearchParams(params);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 w-full h-full max-h-screen overflow-y-none overscroll-none">
      <SideBarComponent />
      <StyledOverlay isVisible={loading} />
      <div className="block w-full">
        <StyledHeader />
        <div
          style={{
            maxHeight: windowSize.height - 100 - 20,
            minHeight: windowSize.height - 100 - 20,
          }}
          className="px-5 w-full pb-4"
        >
          <div
            style={{
              maxHeight: windowSize.height - 100 - 40 - 20,
              minHeight: windowSize.height - 100 - 40 - 20,
            }}
            className="laptop:border w-full rounded-sm laptop:px-5 laptop:py-2 "
          >
            <SearchArea loading={loading} setLoading={setLoading} />
            <StyledLeavesTable loading={loading} setLoading={setLoading} />
          </div>
          <StyledPagination
            totalItems={totalItems}
            itemsPerPage={ITEM_PER_PAGE}
            currentPage={page}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
