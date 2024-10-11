import IconCheck from "@/app/assets/icons/iconCheck.svg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Leave } from "@/core/entities/models/leave.model";
import Image from "next/image";
import { useState } from "react";
import StyledOverlay from "../StyledOverlay";

// const userRepo = new UserRepositoryImpl();
// const deleteStaffUseCase = new DeleteStaffUseCase(userRepo);

interface Props {
  leave: Leave;
  onClose?(): void;
}
export function AlertDialogApproveLeave(props: Props) {
  const { leave } = props;
  const [loading, setLoading] = useState(false);

  const onConfirmDelete = async () => {
    try {
      setLoading(true);
      //   if (!user?.updated_at || !user?.id) return;
      //   const params: DeleteUsersParams = {
      //     id: user.id,
      //     updated_at: user.updated_at,
      //   };
      //   const result = await deleteStaffUseCase.execute(params);
      //   if (result?.code == 0) {
      //     toast({
      //       description: "Delete staff successfully.",
      //       color: "bg-blue-200",
      //     });
      //     onClose();
      //   } else {
      //     toast({
      //       description: "Delete staff failed",
      //       color: "bg-red-100",
      //     });
      //   }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <StyledOverlay isVisible={loading} />
      <AlertDialogTrigger asChild>
        <Image
          alt="Delete"
          src={IconCheck}
          className="h-[24px] aspect-square hover:cursor-pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-2">Notification</AlertDialogTitle>
          <AlertDialogDescription className={"text-left"}>
            Are you sure to approve leave of
            <span className="font-bold text-[16px] mx-1">
              {leave.employee_name}?
            </span>
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-1 items-center justify-end gap-2 ">
            <AlertDialogCancel className="mt-0 w-[120px]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
              className="mb-0 w-[120px] text-white bg-red_login_hover"
            >
              Approve
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
