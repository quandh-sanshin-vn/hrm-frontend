import { LeaveStatus } from "@/utilities/enum";
import { LEAVE_STATUS } from "@/utilities/static-value";

interface Props {
  value: string;
}
// --green: #50D23E;
// --green-hover: #DBF5DD;
// --block: #C4C940;
// --block-hover: #F6F8EC

export default function StyledLeaveStatusItem(props: Props) {
  if (props.value == LEAVE_STATUS[0].value) {
    return (
      <div
        className={
          " bg-block_hover items-center justify-center w-fit px-2 py-1 rounded-sm"
        }
      >
        <p className={"text-block font-normal text-[12px]"}>
          {LeaveStatus.Waiting}
        </p>
      </div>
    );
  }
  if (props.value == LEAVE_STATUS[1].value) {
    return (
      <div
        className={
          "bg-active_hover   items-center justify-center w-fit px-2 py-1 rounded-sm"
        }
      >
        <p className={"text-active font-normal text-[12px]"}>
          {LeaveStatus.Confirmed}
        </p>
      </div>
    );
  }
  if (props.value == LEAVE_STATUS[2].value) {
    return (
      <div
        className={
          "bg-inactive_hover items-center justify-center w-fit px-2 py-1 rounded-sm"
        }
      >
        <p className={"text-inactive font-normal text-[12px]"}>
          {LeaveStatus.Canceled}
        </p>
      </div>
    );
  }
  return (
    <div
      className={
        " bg-block_hover items-center justify-center w-fit px-2 py-1 rounded-sm"
      }
    >
      <p className={"text-block font-normal text-[12px]"}>
        {LeaveStatus.Waiting}
      </p>
    </div>
  );
}
