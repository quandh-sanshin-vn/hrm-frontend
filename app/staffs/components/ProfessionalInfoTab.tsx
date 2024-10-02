"use client";
import { CreateUsersParams, UpdateUsersParams } from "@/apis/modules/user";
import { StyledComboboxDepartment } from "@/components/common/StyledComboboxDepartment";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateStaffUseCase } from "@/core/application/usecases/staff-master/createNewStaff.usecase";
import { EditStaffUseCase } from "@/core/application/usecases/staff-master/editStaff.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useFocus from "@/hooks/use-focus";
import { toast } from "@/hooks/use-toast";
import useWindowSize from "@/hooks/useWindowSize";
import { useCommonStore } from "@/stores/commonStore";
import { useStaffStore } from "@/stores/staffStore";
import {
  convertIdToObject,
  formatDateToString,
  formatStringToDate,
} from "@/utilities/format";
import { STAFF_STATUS_WORKING } from "@/utilities/static-value";
import { EMAIL_REGEX } from "@/utilities/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string({ message: "User Name is required" })
    .min(1, "User Name is required"),
  email: z
    .string({ message: "Email is required" })
    .regex(EMAIL_REGEX, "Invalid email format"),
  statusWorking: z.any().refine(
    (value) => {
      const numValue = Number(value);
      return !isNaN(numValue) && numValue >= 0;
    },
    {
      message: "Status working is required",
    }
  ),
  department: z
    .preprocess(
      (val) => (val === undefined ? [] : val),
      z.array(z.object({ id: z.number(), name: z.string() }))
    )
    .refine((value) => value?.length > 0, {
      message: "Department is required",
    }),
  position: z.any().refine(
    (value) => {
      const numValue = Number(value);
      return !isNaN(numValue) && numValue >= 0;
    },
    {
      message: "Position is required",
    }
  ),
  joiningDate: z
    .union([
      z.string({
        message: "Joining date is required",
      }),
      z.date(),
    ])
    .refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        return date < today;
      },
      {
        message: "Joining date must be in the past",
      }
    )
    .transform((value) => new Date(value)),
  leavesHours: z.any(),
});
const userRepo = new UserRepositoryImpl();
const createStaff = new CreateStaffUseCase(userRepo);
const editStaff = new EditStaffUseCase(userRepo);
interface Props {
  changeTab(name: string): void;
  mode: "view" | "edit" | "create";
}

export default function ProfessionalInfoTab(props: Props) {
  const { mode } = props;
  const [loading, setLoading] = useState(false);
  const isFocus = useFocus();
  const windowSize = useWindowSize();
  const paramsPage = useParams();
  const router = useRouter();
  const { positionData, departmentData } = useCommonStore((state) => state);

  const {
    updateStaffEditing,
    updateSelectedStaff,
    editingStaff,
    selectedStaff,
  } = useStaffStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // username: editingStaff?.username || "",
      // email: editingStaff?.email,
      // statusWorking: editingStaff?.status_working || "",
      // position: editingStaff?.position_id || "",
      // department: [],
      leavesHours: "0",
    },
  });

  const onUpdateProfessionalInfoStaff = async (
    data: z.infer<typeof formSchema>
  ) => {
    try {
      setLoading(true);
      const departmentIds = data.department.map((i) => i.id);
      const joiningDateFormatted = formatDateToString(data.joiningDate);
      if (!paramsPage.id) {
        toast({
          description: "User id not found",
          color: `bg-blue-200`,
        });
      }
      const params: UpdateUsersParams = {
        id: paramsPage.id,
        idkey: selectedStaff?.idkey || "",
        fullname: selectedStaff?.fullname || "",
        phone: selectedStaff?.phone || "",
        birth_day: selectedStaff?.birth_day || "",
        address: selectedStaff?.address || "",
        country: selectedStaff?.country || "",
        username: data?.username || "",
        status_working: data?.statusWorking || "",
        email: data.email || "",
        position: data?.position || "",
        started_at: joiningDateFormatted || "",
        department_ids: departmentIds || [],
        updated_at: selectedStaff.updated_at || "",
      };
      const result = await editStaff.execute(params);
      if (result?.code == 0) {
        toast({
          description: "Update staff information successfully",
          color: `bg-blue-200`,
        });
        updateSelectedStaff(result.data);
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

  const onCreateStaff = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const departmentIds = data.department.map((i) => i.id);
      const joiningDateFormatted = formatDateToString(data.joiningDate);
      const getPositionName =
        positionData.find((i) => i.value == data.position)?.name || "";
      updateStaffEditing({
        username: data.username,
        email: data.email,
        status_working: data.statusWorking,
        position_id: data.position,
        position_name: getPositionName,
        department: departmentIds,
        started_at: joiningDateFormatted,
        time_off_hours: data.leavesHours,
      });
      const params: CreateUsersParams = {
        fullname: editingStaff?.fullname || "",
        phone: editingStaff?.phone || "",
        birth_day: editingStaff?.birth_day || "",
        address: editingStaff?.address || "",
        country: editingStaff?.country || "",
        username: data?.username || "",
        status_working:
          data?.statusWorking || editingStaff?.status_working || "",
        email: data.email || editingStaff?.email || "",
        position: data?.position || editingStaff?.position_id || "",
        started_at: joiningDateFormatted || editingStaff.started_at || "",
        department_ids: departmentIds || editingStaff.department || [],
      };
      const result = await createStaff.execute(params);
      if (result?.code == 0) {
        toast({
          description: "Create staff successfully",
          color: `bg-blue-200`,
        });
        form.reset();
        updateStaffEditing({});
        router.back();
      } else {
        toast({
          description: "Create staff failed",
          color: "bg-red-100",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (mode === "edit") onUpdateProfessionalInfoStaff(data);
    else onCreateStaff(data);
  };

  const onGoBack = () => {
    props.changeTab("personal");
  };

  const [formMaxHeight, setFormMaxHeight] = useState(windowSize.height);

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
        const departmentSelectedData = convertIdToObject(
          editingStaff.department || [],
          departmentData
        );
        if (editingStaff?.username)
          form.setValue("username", editingStaff?.username || "");
        if (editingStaff?.email) form.setValue("email", editingStaff?.email);
        if (editingStaff?.status_working)
          form.setValue("statusWorking", editingStaff.status_working);
        if (editingStaff?.position_id)
          form.setValue("position", editingStaff?.position_id || "");
        if (
          departmentSelectedData?.length &&
          departmentSelectedData?.length > 0
        )
          form.setValue("department", departmentSelectedData || []);
        if (editingStaff?.started_at)
          form.setValue(
            "joiningDate",
            formatStringToDate(editingStaff?.started_at)
          );
        form.setValue("leavesHours", "0");
      }
      if (mode == "view" || mode == "edit") {
        const departmentSelectedData = convertIdToObject(
          selectedStaff?.department || [],
          departmentData
        );

        if (selectedStaff?.username)
          form.setValue("username", selectedStaff?.username || "");
        if (selectedStaff?.email)
          form.setValue("email", selectedStaff?.email || "");
        if (selectedStaff?.status_working) {
          form.setValue(
            "statusWorking",
            String(selectedStaff?.status_working) || ""
          );
        }
        if (selectedStaff?.position_id) {
          form.setValue("position", String(selectedStaff?.position_id) || "");
        }
        if (
          departmentSelectedData?.length &&
          departmentSelectedData?.length > 0
        )
          form.setValue("department", departmentSelectedData || []);
        if (selectedStaff?.started_at)
          form.setValue(
            "joiningDate",
            formatStringToDate(selectedStaff?.started_at)
          );
        form.setValue("leavesHours", selectedStaff?.time_off_hours || "0");
      }
    }
  }, [isFocus, selectedStaff?.updated_at, form.getValues("statusWorking")]);

  return (
    <div
      style={{
        maxHeight: formMaxHeight,
        minHeight: formMaxHeight,
      }}
      className="bg-white flex flex-1 h-full rounded-md "
    >
      <StyledOverlay isVisible={loading} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          style={{
            maxHeight: formMaxHeight,
            minHeight: formMaxHeight,
          }}
          className="flex flex-col space-y-4 mt-1 w-full p-5 rounded-md overflow-y-auto hide-scrollbar"
        >
          <div className={"flex items-start justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name={"username"}
              disabled={mode == "view"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary"}
                  >
                    User Name
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
              name={"email"}
              disabled={mode == "view"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary"}
                  >
                    Email
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
          <div className={"flex items-start justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name="statusWorking"
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary"}
                  >
                    Status Working
                  </FormLabel>
                  <Select
                    disabled={mode == "view"}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger
                        style={{
                          color: !field.value ? "var(--secondary)" : "black",
                        }}
                        className="border-b border-border h-10 rounded-none px-0 disabled:opacity-100"
                      >
                        <SelectValue className="w-full" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {STAFF_STATUS_WORKING.map((item) => {
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
              name="position"
              render={({ field, fieldState }) => {
                return (
                  <FormItem className="flex-1">
                    <FormLabel
                      className={"font-normal text-[14px] text-secondary"}
                    >
                      Position
                    </FormLabel>
                    <Select
                      disabled={mode == "view"}
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          style={{
                            color: !field.value ? "var(--secondary)" : "black",
                          }}
                          className="border-b border-border h-10 rounded-none px-0 disabled:opacity-100"
                        >
                          <SelectValue className="w-full" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {[...positionData].map((item) => {
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
                    {fieldState.error?.message && (
                      <p className={"text-red-500 text-[10px]"}>
                        {fieldState.error?.message}
                      </p>
                    )}
                  </FormItem>
                );
              }}
            />
          </div>
          <div className={"flex items-start justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name={"joiningDate"}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1 w-1/2">
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary"}
                  >
                    Joining Date
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
              disabled={true}
              name={"leavesHours"}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1 w-1/2">
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary"}
                  >
                    Leaves Hours
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={true}
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
          <div className={"flex items-start justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name="department"
              render={({ field, fieldState }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel
                    className={"font-normal text-[14px] text-secondary"}
                  >
                    Department
                  </FormLabel>
                  <StyledComboboxDepartment
                    disable={mode == "view"}
                    field={field}
                    form={form}
                  />
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
          {props.mode === "create" && (
            <div className="flex flex-1 justify-end items-end gap-x-4 ">
              <Button
                onClick={onGoBack}
                variant="outline"
                // disabled={loading}
                tabIndex={3}
                className="w-[152px] h-[50px] font-normal border-border bg-white text-[14px] hover:bg-gray-100 rounded-lg"
                type="button"
              >
                Back
              </Button>
              <Button
                // disabled={loading}
                tabIndex={3}
                className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
                type="submit"
              >
                Create
              </Button>
            </div>
          )}
          {props.mode === "edit" && (
            <div className="flex flex-1 justify-end items-end gap-x-4 ">
              <Button
                // disabled={loading}
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
