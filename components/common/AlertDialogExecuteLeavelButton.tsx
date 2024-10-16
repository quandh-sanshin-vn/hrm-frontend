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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";

interface Props {
  tabIndex: number;
  description: string;
  button: string;
  fullname: string | undefined;
}
export function AlertDialogExecuteLeavelButton(props: Props) {
  const onConfirm = async () => {};
  let color = 1;

  const checkColorButton = () => {
    if (props.button === "Confirm") {
      color = 1;
    } else if (props.button === "Cancel") {
      color = 2;
    } else if (props.button === "Skip Cancel Request") {
      color = 3;
    }
  };

  checkColorButton();

  return (
    <AlertDialog>
      {color == 1 && (
        <AlertDialogTrigger asChild className="mx-2">
          <Button
            tabIndex={props.tabIndex}
            className={`laptop:w-[152px] mx-4 laptop:mx-0 h-[48px] font-normal bg-[#2B4CD2] hover:bg-[#5679E5] text-white text-[14px] rounded-[10px]`}
            type="button"
            variant="outline"
          >
            {props.button}
          </Button>
        </AlertDialogTrigger>
      )}

      {color == 2 && (
        <AlertDialogTrigger asChild className="mx-2">
          <Button
            tabIndex={props.tabIndex}
            className={`laptop:w-[152px] mx-4 laptop:mx-0 h-[48px] font-normal bg-[#BD0D10] hover:bg-[#E6393C] text-white text-[14px] rounded-[10px]`}
            type="button"
            variant="outline"
          >
            {props.button}
          </Button>
        </AlertDialogTrigger>
      )}

      {color == 3 && (
        <AlertDialogTrigger asChild className="mx-2">
          <Button
            tabIndex={props.tabIndex}
            className={`laptop:w-[152px] mx-4 laptop:mx-0 h-[48px] font-normal border-none text-black bg-[#DCFAFF] hover:bg-[#B3E6F2] text-[14px] rounded-[10px]`}
            type="button"
            variant="outline"
          >
            {props.button}
          </Button>
        </AlertDialogTrigger>
      )}

      <AlertDialogContent className="gap-4">
        <AlertDialogHeader>
          <VisuallyHidden>
            <AlertDialogTitle>Cancel Request Confirmation</AlertDialogTitle>
          </VisuallyHidden>
          <AlertDialogDescription
            className={"text-left text-[16px] font-normal"}
          >
            {props.description} {`“`} <strong>{props.fullname}</strong> {`“ ?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-1 items-center justify-center gap-5 laptop:justify-end">
            <AlertDialogCancel className="mt-0 w-[120px] rounded-[10px]">
              No
            </AlertDialogCancel>
            {color == 1 && (
              <AlertDialogAction
                onClick={onConfirm}
                className="mb-0 w-[120px] bg-[#2B4CD2] text-white rounded-[10px]"
              >
                {props.button}
              </AlertDialogAction>
            )}
            {color == 2 && (
              <AlertDialogAction
                onClick={onConfirm}
                className="mb-0 w-[120px] bg-[#BD0D10] text-white rounded-[10px]"
              >
                {props.button}
              </AlertDialogAction>
            )}
            {color == 3 && (
              <AlertDialogAction
                onClick={onConfirm}
                className="mb-0 w-[120px] bg-[#DCFAFF] rounded-[10px]"
              >
                Skip
              </AlertDialogAction>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
