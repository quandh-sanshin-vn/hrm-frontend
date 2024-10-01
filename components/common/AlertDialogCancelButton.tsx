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
import { Button } from "@/components/ui/button";
import { useEditingStore } from "@/stores/commonStore";

interface Props {
  isOpen: boolean;
}
export function AlertDialogCancelButton(props: Props) {
  const { isEditing, setIsEditing } = useEditingStore((state) => state);
  const onConfirmOK = async () => {
    setIsEditing(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="mx-2">
        <Button
          tabIndex={3}
          className="w-[152px] h-[50px] font-normal bg-white text-[#16151C] text-[14px] border border-[#A2A1A8] hover:bg-gray-100 rounded-lg"
          type="button"
        >
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel edit mode??</AlertDialogTitle>
          <AlertDialogDescription className={"text-left"}>
            Be sure to ignore the information on the form
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-1 items-center justify-center gap-2 laptop:justify-end">
            <AlertDialogCancel className="mt-0 w-[120px]">NO</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmOK}
              className="mb-0 w-[120px] text-white"
            >
              OK
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
