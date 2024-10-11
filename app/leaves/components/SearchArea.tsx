import { Button } from "@/components/ui/button";
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
import {
  CANCEL_REQUEST_VALUE,
  ITEM_PER_PAGE,
  LEAVE_STATUS,
  LEAVE_TYPE,
} from "@/utilities/static-value";

import { GetLeaveListParams } from "@/apis/modules/leave";
import IconAdd from "@/app/assets/icons/iconAdd.svg";
import { StyledDatePicker } from "@/components/common/StyledDatePicker";
import { Input } from "@/components/ui/input";
import { GetLeavesListUseCase } from "@/core/application/usecases/leave/getLeaveList";
import { LeaveRepositoryImpl } from "@/core/infrastructure/repositories/leave.repo";
import { useLeaveStore } from "@/stores/leavesStore";
import { formatDateToString } from "@/utilities/format";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const leaveRepo = new LeaveRepositoryImpl();
const getLeavesListUseCase = new GetLeavesListUseCase(leaveRepo);

const formSchema = z.object({
  type: z.string().optional(),
  createDate: z
    .union([z.string({ message: "Date of birth is required" }), z.date()])
    .optional(),
  leaveDate: z
    .union([z.string({ message: "Date of birth is required" }), z.date()])
    .optional(),
  status: z.string().optional(),
  staffName: z.string().optional(),
  cancelRequest: z.string().optional(),
});

interface Props {
  setLoading(loading: boolean): void;
  loading: boolean;
}

export default function SearchArea(props: Props) {
  const { setLoading } = props;
  const { updateLeaveListData, updateSearchParams } = useLeaveStore(
    (state) => state
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const params: GetLeaveListParams = {
        page: 1,
        limit: ITEM_PER_PAGE,
        leave_type: data.type == "-1" ? undefined : data?.type,
        status:
          !data?.status || data?.status == "-1" ? undefined : data?.status,
        can_request:
          !data?.cancelRequest || data?.cancelRequest == "-1"
            ? undefined
            : data?.cancelRequest,
      };
      if (data?.createDate)
        params.create_date = formatDateToString(data?.createDate);
      if (data?.leaveDate)
        params.leave_date = formatDateToString(data?.leaveDate);
      if (data?.staffName)
        params.employee_name = formatDateToString(data?.staffName);
      const response = await getLeavesListUseCase.execute(params);
      updateLeaveListData(response?.data || [], response?.totalItem || 0);
      updateSearchParams(params);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onAddNew = () => {
    // route.push("/leaves/create-leaves");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "-1",
      status: "-1",
      createDate: "",
      leaveDate: "",
      staffName: "",
      cancelRequest: "-1",
    },
  });
  return (
    <div className="h-[256px] laptop:h-[150px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col w-full"
        >
          <div className="flex flex-col laptop:flex-row w-full flex-1 laptop:items-center gap-x-4 gap-y-2 ">
            <div className="flex gap-x-4 flex-1">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className=" font-normal text-[16px]">
                      Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          tabIndex={2}
                          className="border-border border "
                        >
                          <SelectValue className="w-[256px]" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {[{ value: "-1", name: "All" }, ...LEAVE_TYPE].map(
                          (item: any) => {
                            return (
                              <SelectItem
                                key={item.value}
                                value={String(item.value)}
                                className="h-8 hover:bg-gray-200 pl-6"
                              >
                                {item.name}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className=" font-normal text-[16px]">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          tabIndex={2}
                          className="border-border border "
                        >
                          <SelectValue className="w-[256px]" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {[{ value: "-1", name: "All" }, ...LEAVE_STATUS].map(
                          (item: any) => {
                            return (
                              <SelectItem
                                key={item.value}
                                value={String(item.value)}
                                className="h-8 hover:bg-gray-200 pl-6"
                              >
                                {item.name}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-x-4 flex-1">
              <FormField
                control={form.control}
                name={"createDate"}
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1  flex  flex-col" tabIndex={3}>
                    <FormLabel className={"font-normal text-[16px]  "}>
                      Create date
                    </FormLabel>
                    <FormControl>
                      <StyledDatePicker
                        field={field}
                        title={""}
                        triggerClass="flex-1 flex border rounded-md px-2"
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
                name={"leaveDate"}
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1  flex  flex-col" tabIndex={3}>
                    <FormLabel className={"font-normal text-[16px]  "}>
                      Leave date
                    </FormLabel>
                    <FormControl>
                      <StyledDatePicker
                        field={field}
                        title={""}
                        triggerClass="flex-1 flex border rounded-md px-2"
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
          </div>
          <div className=" flex-col laptop:flex-row flex justify-between mt-2 gap-y-2 ">
            <div className={"flex gap-x-4 w-1/2 pr-2"}>
              <FormField
                control={form.control}
                name="staffName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className=" font-normal text-[16px]">
                      Employee name
                    </FormLabel>
                    <FormControl>
                      <Input
                        tabIndex={1}
                        placeholder="Name"
                        {...field}
                        className=" border border-border focus:border-primary px-2 "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cancelRequest"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className=" font-normal text-[16px]">
                      Cancel request
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          tabIndex={2}
                          className="border-border border "
                        >
                          <SelectValue className="w-[256px]" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {[
                          { value: "-1", name: "All" },
                          ...CANCEL_REQUEST_VALUE,
                        ].map((item: any) => {
                          return (
                            <SelectItem
                              key={item.value}
                              value={String(item.value)}
                              className="h-8 hover:bg-gray-200 pl-6"
                            >
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={
                "items-center justify-end laptop:justify-start flex gap-x-4"
              }
            >
              <Button
                tabIndex={5}
                className="w-fit h-11 text-white text-[16px] hover:bg-primary-hover"
                type="submit"
              >
                Search
              </Button>
              <Button
                tabIndex={6}
                className="w-fit h-11 text-white text-[16px] hover:bg-primary-hover"
                type="button"
                onClick={onAddNew}
              >
                <Image
                  src={IconAdd}
                  alt=""
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Add new
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
