"use client";
import { UpdateUsersParams } from "@/apis/modules/user";
import { StyledDatePicker } from "@/components/common/StyledDatePicker";
import StyledOverlay from "@/components/common/StyledOverlay";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditStaffUseCase } from "@/core/application/usecases/staff-master/editStaff.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useFocus from "@/hooks/use-focus";
import { toast } from "@/hooks/use-toast";
import useWindowSize from "@/hooks/useWindowSize";
import { useStaffStore } from "@/stores/staffStore";
import { formatDateToString, formatStringToDate } from "@/utilities/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  fullname: z
    .string({ message: "Full name is required" })
    .trim()
    .min(1, "Full name is required"),
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[0-9]*$/, "Phone number must contain only digits"),
  dateOfBirth: z
    .union([z.string({ message: "Date of birth is required" }), z.date()])
    .refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        return date < today;
      },
      {
        message: "Date of birth must be in the past",
      }
    )
    .transform((value) => new Date(value)),
  address: z
    .string({ message: "Address is required" })
    .trim()
    .min(1, "Address is required"),
  country: z
    .string({ message: "Country is required" })
    .trim()
    .min(1, "Country is required"),
});

const userRepo = new UserRepositoryImpl();
const editStaff = new EditStaffUseCase(userRepo);

interface Props {
  changeTab(name: string): void;
  mode: "view" | "edit" | "create";
}

export default function PersonalInfoTab(props: Props) {
  const { mode } = props;
  const windowSize = useWindowSize();
  const isFocus = useFocus();
  const paramsPage = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formMaxHeight, setFormMaxHeight] = useState(windowSize.height);
  const {
    updateStaffEditing,
    editingStaff,
    staffList,
    selectedStaff,
    updateSelectedStaff,
  } = useStaffStore((state) => state);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phoneNumber: "",
      address: "",
      country: "",
    },
  });

  useEffect(() => {
    if (props.mode == "create") {
      setFormMaxHeight(windowSize.height - 100 - 40 - 48 - 50 - 20);
    }
    if (props.mode == "view" || props.mode == "edit") {
      setFormMaxHeight(windowSize.height - 100 - 40 - 48 - 50 - 20 - 120);
    }
  }, [props.mode, windowSize.height]);

  useEffect(() => {
    if (isFocus) {
      if (mode == "create") {
        if (editingStaff.fullname)
          form.setValue("fullname", editingStaff?.fullname || "");
        if (editingStaff.phone)
          form.setValue("phoneNumber", editingStaff?.phone);
        if (editingStaff.birth_day)
          form.setValue(
            "dateOfBirth",
            formatStringToDate(editingStaff?.birth_day || "")
          );
        if (editingStaff.address)
          form.setValue("address", editingStaff?.address || "");
        if (editingStaff.country)
          form.setValue("country", editingStaff?.country || "");
      }
      if (mode == "view") {
        if (selectedStaff?.fullname)
          form.setValue("fullname", selectedStaff?.fullname || "");
        if (selectedStaff?.phone)
          form.setValue("phoneNumber", selectedStaff?.phone);
        if (selectedStaff?.birth_day)
          form.setValue(
            "dateOfBirth",
            formatStringToDate(selectedStaff?.birth_day || "")
          );
        if (selectedStaff?.address)
          form.setValue("address", selectedStaff?.address || "");
        if (selectedStaff?.country)
          form.setValue("country", selectedStaff?.country || "");
      }
      if (mode == "edit") {
        if (selectedStaff?.fullname)
          form.setValue("fullname", selectedStaff?.fullname || "");
        if (selectedStaff?.phone)
          form.setValue("phoneNumber", selectedStaff?.phone);
        if (selectedStaff?.birth_day)
          form.setValue(
            "dateOfBirth",
            formatStringToDate(selectedStaff?.birth_day || "")
          );
        if (selectedStaff?.address)
          form.setValue("address", selectedStaff?.address || "");
        if (selectedStaff?.country)
          form.setValue("country", selectedStaff?.country || "");
      }
    }
  }, [isFocus, selectedStaff]);

  const onUpdateProfessionalInfoStaff = async (
    data: z.infer<typeof formSchema>
  ) => {
    try {
      setLoading(true);
      if (!paramsPage.id) {
        toast({
          description: "User id not found",
          color: `bg-blue-200`,
        });
      }
      const params: UpdateUsersParams = {
        id: paramsPage.id,
        idkey: selectedStaff?.idkey || "",
        fullname: data.fullname,
        phone: data.phoneNumber,
        birth_day: formatDateToString(data.dateOfBirth),
        address: data.address,
        country: data.country,
        username: selectedStaff?.username || "",
        status_working: selectedStaff?.status_working || "",
        email: selectedStaff.email || "",
        position: selectedStaff?.position_id || "",
        started_at: selectedStaff.started_at || "",
        department_ids: selectedStaff.department || [],
        updated_at: selectedStaff.updated_at || "",
      };
      const result = await editStaff.execute(params);
      if (result?.code == 0) {
        toast({
          description: "Update staff information successfully",
          color: `bg-blue-200`,
        });
        updateSelectedStaff({
          ...selectedStaff,
          updated_at: result.data.updated_at,
        });
        router.back();
      } else {
        toast({
          description: "Update staff information failed",
          color: "bg-red-100",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onCreateStaff = (data: z.infer<typeof formSchema>) => {
    updateStaffEditing({
      fullname: data.fullname,
      phone: data.phoneNumber,
      birth_day: formatDateToString(data.dateOfBirth),
      address: data.address,
      country: data.country,
    });
    props.changeTab("professional");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (mode == "edit") {
      onUpdateProfessionalInfoStaff(data);
    } else {
      onCreateStaff(data);
    }
  };

  return (
    <div
      style={{
        maxHeight: formMaxHeight,
        minHeight: formMaxHeight,
      }}
      className=" bg-white flex flex-1 h-full rounded-md "
    >
      <StyledOverlay isVisible={loading} />
      <Form {...form}>
        <form
          contentEditable={false}
          onSubmit={form.handleSubmit(onSubmit)}
          style={{
            maxHeight: formMaxHeight,
            minHeight: formMaxHeight,
          }}
          className=" flex flex-col space-y-4 mt-1  w-full p-5  rounded-md  overflow-y-auto hide-scrollbar"
        >
          <div className={"flex items-start justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name={"fullname"}
              disabled={mode == "view"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2" tabIndex={1}>
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary "}
                  >
                    Full name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className=" border-b border-border h-10 rounded-none"
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <p className={"text-red-500 text-[10px]"}>
                      {fieldState.error?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"phoneNumber"}
              disabled={mode == "view"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2" tabIndex={2}>
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary "}
                  >
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className=" border-b border-border h-10 rounded-none"
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <p className={"text-red-500 text-[10px]"}>
                      {fieldState.error?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className={"flex items-start justify-between gap-x-5 "}>
            <FormField
              control={form.control}
              name={"dateOfBirth"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2" tabIndex={3}>
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary "}
                  >
                    Date Of Birth
                  </FormLabel>
                  <FormControl>
                    <StyledDatePicker
                      disabled={mode == "view"}
                      field={field}
                      title={""}
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <p className={"text-red-500 text-[10px]"}>
                      {fieldState.error?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"address"}
              disabled={mode == "view"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2" tabIndex={4}>
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary "}
                  >
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className=" border-b border-border h-10 rounded-none"
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <p className={"text-red-500 text-[10px]"}>
                      {fieldState.error?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className={"flex items-center justify-between gap-x-5 "}>
            <FormField
              control={form.control}
              name={"country"}
              disabled={mode == "view"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2" tabIndex={5}>
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary "}
                  >
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className=" border-b border-border h-10 rounded-none"
                    />
                  </FormControl>
                  {fieldState.error?.message && (
                    <p className={"text-red-500 text-[10px]"}>
                      {fieldState.error?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <div className="w-1/2" />
          </div>
          {props.mode == "create" && (
            <div className="flex flex-1 justify-end items-end gap-x-4">
              <Button
                disabled={loading}
                tabIndex={3}
                className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
                type="submit"
              >
                Next
              </Button>
            </div>
          )}
          {props.mode == "edit" && (
            <div className="flex flex-1 justify-end items-end gap-x-4">
              <Button
                disabled={loading}
                tabIndex={3}
                className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
                type="submit"
              >
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
