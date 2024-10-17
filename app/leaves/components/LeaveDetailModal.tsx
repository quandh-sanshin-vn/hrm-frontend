"use client";
import { Leave } from "@/core/entities/models/leave.model";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import DefaultImage from "@/app/assets/images/avatar_default.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useWindowSize from "@/hooks/use-dimession";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useFocus from "@/hooks/use-focus";
import { useEffect } from "react";
import { formatStringToDate } from "@/utilities/format";
import { LEAVE_STATUS, SHIFT_STATUS } from "@/utilities/static-value";
// import { AlertDialogExecuteLeavelButton } from "@/components/common/AlertDialogExecuteLeavelButton";
// import { useCommonStore } from "@/stores/commonStore";
import CanRequestIcon from "@/app/assets/icons/iconCanRequest.svg";
import StyledCancelRequestDialog from "@/app/leaves/components/StyledCancelRequestDialog";
import { Button } from "@/components/ui/button";
import { StyledDatePicker } from "@/components/common/StyledDatePicker";

interface Props {
  isOpen: boolean;
  onClose(): void;
  leave: Leave;
}

const formSchema = z.object({
  description: z.string().trim(),
  day_leaves: z
    .union([z.string(), z.date()])
    .transform((value) => new Date(value)),
  salary: z.string().trim(),
  shift: z.string().trim(),
  status: z.string().trim(),
  other_info: z.string().trim(),
  approval_date: z.string().trim(),
  created_at: z.string().trim(),
  approver_name: z.string().trim(),
});

export default function LeaveDetailModal(props: Props) {
  const { isOpen, onClose, leave } = props;

  const { user } = useUserStore((state) => state);
  const useDimession = useWindowSize();

  // const { approveUsersData } = useCommonStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day_leaves: formatStringToDate(leave?.day_leaves || ""),
      status: leave?.status,
      description: leave?.description,
      salary: leave?.salary,
      shift: leave?.shift,
      other_info: leave?.other_info,
      approval_date: leave?.approval_date,
      created_at: leave?.created_at,
      approver_name: leave?.approver_name,
    },
  });

  const isFocus = useFocus();

  useEffect(() => {
    if (isFocus) {
      form.setValue("day_leaves", formatStringToDate(leave?.day_leaves || ""));
      form.setValue("status", leave?.status || "");
      form.setValue("description", leave?.description || "");
      form.setValue("salary", leave?.salary || "");
      form.setValue("shift", String(leave?.shift) || "");
      form.setValue("other_info", leave?.other_info || "");
      form.setValue("approval_date", leave?.approval_date || "");
      form.setValue("created_at", leave?.created_at || "");
      form.setValue("approver_name", leave?.approver_name || "");
    }
  }, [isFocus]);

  if (!isOpen || !leave) return null;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
      <div
        className="bg-white flex flex-col justify-between rounded-sm shadow-lg w-[864px] px-8 py-5"
        style={{
          maxHeight: useDimession.height * 0.8,
          minHeight: useDimession.height * 0.8,
          scrollbarWidth: "none",
        }}
      >
        <div className="flex justify-center">
          <h2 className="text-xl font-bold">Leave Infomation</h2>
        </div>
        <div className="flex flex-col items-start w-full">
          <h3 className="font-bold mb-3">Requestor Information</h3>
          <div className="flex flex-row justify-start gap-6 h-[132px]">
            <div className="flex items-center justify-center h-full">
              <Image
                src={
                  user.image
                    ? "http://192.168.1.171:8000" + user.image
                    : DefaultImage
                }
                alt=""
                className="object-cover rounded-lg w-[143px] h-[132px]"
                height={132}
                width={143}
              />
            </div>
            <div className="h-full w-[460px] flex flex-col items-center justify-center rounded-[4px] border-[2px] border-opacity-25 border-black px-2 flex-1">
              <table className="w-full h-full flex justify-start items-center">
                <tbody>
                  <tr>
                    <td className="text-[#16151C] font-semibold text-[14px] leading-6">
                      Employee ID:
                    </td>
                    <td className="text-[14px] font-normal leading-6 px-2">
                      {user.idkey}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[#16151C] font-semibold text-[14px] leading-6">
                      Full name:
                    </td>
                    <td className="text-[14px] font-normal leading-6 px-2">
                      {user.fullname}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[#16151C] font-semibold text-[14px] leading-6">
                      Contact:
                    </td>
                    <td className="text-[14px] font-normal leading-6 px-2">
                      {user.position_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[#16151C] font-semibold text-[14px] leading-6">
                      Remaining leave:
                    </td>
                    <td className="text-[14px] font-normal leading-6 px-2">
                      {user.time_off_hours} hours
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {leave?.can_request == "1" && (
              <div className="h-full relative">
                <Image
                  src={CanRequestIcon}
                  alt=""
                  className="object-cover rounded-lg w-[126px] h-[126px]"
                  height={126}
                  width={126}
                />
                <p className="text-white font-bold text-[12px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                  Cancel Request
                </p>
              </div>
            )}
          </div>
        </div>

        <h3 className="font-bold mt-3 mb-7">Leave Detail</h3>
        <div
          className="flex flex-col items-start w-full h-full overflow-y-auto flex-1"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="flex flex-col gap-3 h-full">
                <div className="flex flex-row justify-between">
                  <div className="rounded-sm p-1 border border-[#A2A1A8] w-[242px] h-full">
                    <FormField
                      disabled
                      control={form.control}
                      name={"day_leaves"}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <StyledDatePicker
                              field={field}
                              title={""}
                              triggerClass="h-6 border-none rounded-md"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="rounded-sm p-1 border border-[#A2A1A8] w-[242px] h-full">
                    <FormField
                      control={form.control}
                      name="shift"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shift</FormLabel>
                          <Select
                            disabled
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                style={{
                                  color: !field.value
                                    ? "var(--secondary)"
                                    : "black",
                                }}
                                className="h-6 rounded-none px-0 disabled:opacity-100"
                              >
                                <SelectValue className="w-full" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              {SHIFT_STATUS.map((item) => {
                                return (
                                  <SelectItem
                                    key={item.value}
                                    value={String(item.value)}
                                  >
                                    {item.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="rounded-sm p-1 border border-[#A2A1A8] w-[242px] h-full">
                    <FormField
                      disabled
                      control={form.control}
                      name="status"
                      render={({ field }) => {
                        const selectedStatus =
                          LEAVE_STATUS.find(
                            (item) => String(item.value) === String(field.value)
                          ) || LEAVE_STATUS[0];

                        return (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                              <Input
                                className="p-0 h-6"
                                {...field}
                                value={selectedStatus.name}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col rounded-sm p-1 border border-[#A2A1A8] w-full">
                  <FormField
                    disabled
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Leave</FormLabel>
                        <FormControl>
                          <Textarea className="p-0 min-h-[108px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col rounded-sm p-1 border border-[#A2A1A8] w-full">
                  <FormField
                    disabled
                    control={form.control}
                    name="other_info"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Infomation</FormLabel>
                        <FormControl>
                          <Textarea
                            className="p-0 min-h-[108px]"
                            {...field}
                            placeholder="Người phụ trách/dự án phụ trách/ tình trạng công việc "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <div className="rounded-sm p-1 border border-[#A2A1A8] w-[242px] h-full">
                    <FormField
                      disabled
                      control={form.control}
                      name={"created_at"}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Created date</FormLabel>
                          <FormControl>
                            <Input className="p-0 h-6" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="rounded-sm p-1 border border-[#A2A1A8] w-[242px] h-full">
                    <FormField
                      disabled
                      control={form.control}
                      name="approval_date"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Approval date</FormLabel>
                            <FormControl>
                              <Input className="p-0 h-6" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="rounded-sm p-1 border border-[#A2A1A8] w-[242px] h-full">
                    <FormField
                      disabled
                      control={form.control}
                      name="approver_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Approver</FormLabel>
                          <FormControl>
                            <Input className="p-0 h-6" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex flex-row justify-end gap-5 mt-10">
          <button
            className="laptop:w-[152px] mx-4 laptop:mx-0 h-[50px] font-normal border border-[#A2A1A880] hover:bg-gray-100 rounded-[10px]"
            onClick={onClose}
          >
            Close
          </button>
          {/* <AlertDialogExecuteLeavelButton
            tabIndex={7}
            description={`Bạn muốn xác nhận bỏ qua yêu cầu huỷ đơn của`}
            button="Skip Cancel Request"
            fullname={leave.employee_name}
          /> */}
          {/* <AlertDialogExecuteLeavelButton
            tabIndex={7}
            description={`Bạn muốn xác nhận huỷ đơn xin nghỉ của`}
            button="Cancel"
            fullname={leave.employee_name}
          /> */}
          {/* <AlertDialogExecuteLeavelButton
            tabIndex={7}
            description={`Bạn muốn xác nhận duyệt đơn xin nghỉ của`}
            button="Confirm"
            fullname={leave.employee_name}
          /> */}
          <StyledCancelRequestDialog canRequest={leave?.can_request} />
          <Button
            tabIndex={6}
            className="laptop:w-[152px] h-[50px] font-normal text-white text-[16px] hover:bg-primary-hover rounded-[10px]"
            type="button"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
