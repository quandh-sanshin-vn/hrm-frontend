import IconTrash from "@/app/assets/icons/iconTrash.svg";
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
import { User } from "@/core/entities/models/user.model";
import Image from "next/image";

interface Props {
  user: User;
  onClose?(): void;
  onConfirm?(): void;
}
export function ALertDialogDeleteStaff(props: Props) {
  const { user, onConfirm = () => {} } = props;
  // const [loading, setLoading] = useState(false);

  const onConfirmDelete = async () => {
    onConfirm();
  };

  return (
    <AlertDialog>
      {/* <StyledOverlay isVisible={loading} /> */}
      <AlertDialogTrigger asChild>
        <Image
          alt="Delete"
          src={IconTrash}
          className="h-[24px] aspect-square hover:cursor-pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-2">Thông báo</AlertDialogTitle>
          <AlertDialogDescription className={"text-left"}>
            Are you sure to delete
            <span className="font-bold text-[16px] mx-1">{user.fullname}</span>?
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
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
