import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ITEM_PER_PAGE,
  STAFF_STATUS,
  STAFF_STATUS_WORKING,
} from "@/utilities/static-value";

import { GetStaffListParams } from "@/apis/modules/user";
import { GetStaffListUseCase } from "@/core/application/usecases/staff-master/getUserList.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import { useCommonStore } from "@/stores/commonStore";
import { useStaffStore } from "@/stores/staffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userRepo = new UserRepositoryImpl();
const getStaffListUseCase = new GetStaffListUseCase(userRepo);

const formSchema = z.object({
  staffName: z.string(),
  position: z.string(),
  status: z.string(),
  statusWorking: z.string(),
});

interface Props {
  setLoading(loading: boolean): void;
  loading: boolean;
}
export default function SearchArea(props: Props) {
  const { setLoading, loading } = props;
  const route = useRouter();

  const { updateStaffListData, updateSearchParams } = useStaffStore(
    (state) => state
  );
  const { positionData } = useCommonStore((state) => state);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const params: GetStaffListParams = {
        page: 1,
        position: data?.position == "-1" ? undefined : data?.position,
        status:
          !data?.status || data?.status == "-1"
            ? undefined
            : Number(data?.status),
        type:
          !data?.statusWorking || data?.status == "-1"
            ? undefined
            : Number(data?.statusWorking),
        employee_name: data?.staffName,
        limit: ITEM_PER_PAGE,
      };
      const response = await getStaffListUseCase.execute(params);
      updateStaffListData(response?.data, response?.totalItem || 0);
      updateSearchParams(params);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onAddNewStaff = () => {
    route.push("/staffs/create-staff");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffName: "",
      position: "-1",
      status: "-1",
      statusWorking: "-1",
    },
  });
  return (
    <div className="h-[150px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col w-full"
        >
          <div className="flex w-full items-center gap-x-4 ">
            <FormField
              control={form.control}
              name="staffName"
              render={({ field, fieldState }) => (
                <FormItem className="w-[220px] ">
                  <FormLabel className=" font-normal text-[16px]">
                    Employee Name:
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
              name="position"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className=" font-normal text-[16px]">
                    Position
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-border border ">
                        <SelectValue className="w-[256px]" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {positionData.map((item: any) => {
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
                      <SelectTrigger className="border-border border">
                        <SelectValue className=" border-border border w-[256px]" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {[{ value: "-1", name: "All" }, ...STAFF_STATUS].map(
                        (item) => {
                          return (
                            <SelectItem
                              key={item.value}
                              value={String(item.value)}
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
              name="statusWorking"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className=" font-normal text-[16px]">
                    Status Working
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-border border ">
                        <SelectValue className=" border-border border w-[256px]" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {[
                        { value: "-1", name: "All" },
                        ...STAFF_STATUS_WORKING,
                      ].map((item) => {
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="items-center gap-x-4 flex justify-end mt-4">
            <Button
              tabIndex={3}
              className="w-fit h-11 text-white text-[16px] hover:bg-primary-hover"
              type="submit"
            >
              Search
            </Button>
            <Button
              tabIndex={3}
              className="w-fit h-11 text-white text-[16px] hover:bg-primary-hover"
              type="button"
              onClick={onAddNewStaff}
            >
              Add new
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
