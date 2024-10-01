"use client";
import { GetStaffListParams } from "@/apis/modules/user";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import StyledOverlay from "@/components/common/StyledOverlay";
import StyledPagination from "@/components/common/StyledPagination";
import { GetStaffListUseCase } from "@/core/application/usecases/staff-master/getUserList.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useWindowSize from "@/hooks/useWindowSize";
import { useStaffStore } from "@/stores/staffStore";
import { ITEM_PER_PAGE } from "@/utilities/static-value";
import { useEffect, useState } from "react";
import SearchArea from "./components/SearchArea";
import StyledStaffMasterTable from "./components/StyledStaffMasterTable";

export default function StaffScreen() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const totalItems = useStaffStore((state) => state.totalItems);
  const userRepo = new UserRepositoryImpl();
  const getStaffListUseCase = new GetStaffListUseCase(userRepo);
  const windowSize = useWindowSize();

  const { searchParams, updateStaffListData, updateSearchParams } =
    useStaffStore((state) => state);

  const onPageChange = async (page: number) => {
    try {
      setLoading(true);
      const params = { ...searchParams, page };
      const response = await getStaffListUseCase.execute(params);
      setPage(page);
      updateSearchParams(params);
      updateStaffListData(response?.data, response?.totalItem || 0);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onFirstLoad();
  }, []);

  const onFirstLoad = async () => {
    try {
      setLoading(true);
      const params: GetStaffListParams = {
        page: 1,
        limit: ITEM_PER_PAGE,
      };

      const response = await getStaffListUseCase.execute(params);
      updateStaffListData(response?.data, response?.totalItem || 0);
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
      <div className="w-full block max-h-screen">
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
            <StyledStaffMasterTable loading={loading} setLoading={setLoading} />
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
