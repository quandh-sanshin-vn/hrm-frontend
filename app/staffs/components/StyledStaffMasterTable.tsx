import IconEdit from "@/app/assets/icons/iconEdit.svg";
import IconDetail from "@/app/assets/icons/iconViewDetail.svg";
import DefaultImage from "@/app/assets/images/avatar_default.png";
import { ALertDialogDeleteStaff } from "@/components/common/ALertDialogDeleteStaff";
import { GetStaffListUseCase } from "@/core/application/usecases/staff-master/getUserList.usecase";
import { User } from "@/core/entities/models/user.model";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useWindowSize from "@/hooks/useWindowSize";
import { useStaffStore } from "@/stores/staffStore";
import { STAFF_STATUS, STAFF_STATUS_WORKING } from "@/utilities/static-value";
import Image from "next/image";
import StyledTableStatusItem from "./StyledTableStatusItem";
import { useRouter } from "next/navigation";

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
  const { searchParams, updateStaffListData, updateSearchParams } =
    useStaffStore((state) => state);

  const goToDetailPage = (user: User) => {
    router.push(`/staffs/detail-staff/${user.id}`);
  };

  const goToEditPage = (user: User) => {
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
  const onClickColumnHeader = (columnName: string) => {};

  return (
    <div
      style={{
        maxHeight: windowSize.height - 100 - 52 - 150 - 20,
        minHeight: windowSize.height - 100 - 52 - 150 - 20,
      }}
      className="overflow-y-auto overscroll-none block rounded-sm w-full relative"
    >
      <table className="overflow-y-none overscroll-none w-full border-separate border-spacing-0 relative">
        <thead className="border-border border-b sticky top-0">
          <tr className=" align-center bg-white ">
            <th
              onClick={() => onClickColumnHeader("idkey")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center w-[116px] text-start hover:bg-gray-100 hover:cursor-pointer border-b "
            >
              Employee ID
            </th>
            <th
              onClick={() => onClickColumnHeader("idkey")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start min-w-[260px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              Employee Name
            </th>
            <th
              onClick={() => onClickColumnHeader("idkey")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start w-[200px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              Position
            </th>
            <th
              onClick={() => onClickColumnHeader("idkey")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start w-[200px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              Status Working
            </th>
            <th
              onClick={() => onClickColumnHeader("idkey")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start w-[144px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              Status
            </th>
            <th
              onClick={() => onClickColumnHeader("idkey")}
              className="text-[16px] text-gray-400 pl-2 font-medium align-center text-start w-[112px] hover:bg-gray-100 hover:cursor-pointer  border-b"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className=" hide-scrollbar">
          {staffList.map((user: User, index: number) => {
            return (
              <tr
                key={user?.id ? user?.id.toString() : String(index)}
                className="align-center bg-white h-[52px]"
              >
                <td className="pl-2 w-[116px] text-start text-[16px] font-normal border-b border-[#F6F6F6]">
                  {user.idkey}
                </td>
                <td className="pl-2 min-w-[260px] border-b border-[#F6F6F6]">
                  <div className="flex items-center gap-x-2">
                    <Image
                      alt=""
                      src={!user.image ? DefaultImage : user.image}
                      className={" contain-size h-8 w-8 rounded-full"}
                      height={44}
                    />
                    <p className="text-[16px] font-normal">{user.fullname}</p>
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
                      onClick={goToEditPage}
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
