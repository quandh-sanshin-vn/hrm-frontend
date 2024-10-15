"use client";
import { Leave } from "@/core/entities/models/leave.model";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import DefaultImage from "@/app/assets/images/avatar_default.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { StyledDatePicker } from "@/components/common/StyledDatePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useFocus from "@/hooks/use-focus";
import { useEffect } from "react";
import { formatStringToDate } from "@/utilities/format";

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
});

export default function LeaveDetailModal(props: Props) {
  const { isOpen, onClose, leave } = props;

  const { user } = useUserStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day_leaves: formatStringToDate(leave?.day_leaves || ""),
      status: leave?.status,
      description: leave?.description,
      salary: leave?.salary,
    },
  });

  const isReserveForm = form.watch("day_leaves");
  const isFocus = useFocus();

  useEffect(() => {
    if (isFocus) {
      form.setValue("day_leaves", formatStringToDate(leave?.day_leaves || ""));
      form.setValue("status", leave?.status || "");
      form.setValue("description", leave?.description || "");
      form.setValue("salary", leave?.salary || "");
      form.setValue("shift", leave?.shift || "");
    }
  }, [isReserveForm, isFocus]);

  if (!isOpen || !leave) return null;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center h-screen z-10">
      <div className="bg-white rounded-sm shadow-lg w-[664px] h-[600px] px-8 py-5">
        <div className="flex justify-center">
          <h2 className="text-xl font-bold">Leave Infomation</h2>
        </div>
        <div className="flex flex-col items-start w-full">
          <h3 className="font-bold">Requestor Information</h3>
          <div className="flex flex-row justify-start gap-6 w-full h-[132px]">
            <div className="flex items-center justify-center h-full">
              <Image
                src={
                  user.image
                    ? "http://192.168.1.171:8000" + user.image
                    : DefaultImage
                }
                alt=""
                className="object-cover rounded-lg w-[132px] h-[132px]"
                height={132}
                width={132}
              />
            </div>
            <div className="h-full flex flex-col items-center justify-start rounded-md border px-2 border-[#A2A1A8] flex-1">
              <table className="w-full h-full">
                <tbody>
                  <tr>
                    <td className="text-[#16151C] font-semibold text-[16px]"></td>
                    <td className="text-[16px]">{user.idkey}</td>
                  </tr>
                  <tr>
                    <td className="text-[#16151C] font-semibold text-[16px]">
                      Full name:
                    </td>
                    <td className="text-[16px]">{user.fullname}</td>
                  </tr>
                  <tr>
                    <td className="text-[#16151C] font-semibold text-[16px]">
                      Contact:
                    </td>
                    <td className="text-[16px]">{user.position_name}</td>
                  </tr>
                  <tr>
                    <td className="text-[#16151C] font-semibold text-[16px]">
                      Remaining leave:
                    </td>
                    <td className="text-[16px]">{user.time_off_hours} hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <h3 className="font-bold">Leave Detail</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <div className="rounded-sm p-1 border border-[#A2A1A8] w-[180px]">
                    <FormField
                      control={form.control}
                      name={"day_leaves"}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <StyledDatePicker
                              title=""
                              field={field}
                              tabIndex={2}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="rounded-sm p-1 border border-[#A2A1A8] w-[180px]">
                    <FormField
                      control={form.control}
                      name="shift"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shift</FormLabel>
                          <FormControl>
                            <Input className="py-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="rounded-sm p-1 border border-[#A2A1A8] w-[180px]">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Input className="py-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col rounded-sm p-1 border border-[#A2A1A8] w-full">
                  <p className="font-medium">Reason for Leave</p>
                  <p>{leave.description ?? <>&nbsp;</>}</p>
                </div>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex flex-row justify-end gap-5">
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-[10px]"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-[10px]"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-[10px]"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
