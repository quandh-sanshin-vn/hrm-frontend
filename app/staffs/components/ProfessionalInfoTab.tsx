"use client";
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
import { ChangePasswordUseCase } from "@/core/application/usecases/my-page/changePassword.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useWindowSize from "@/hooks/useWindowSize";
import { STAFF_STATUS } from "@/utilities/static-value";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  username: z.string().trim(),
  statusWorking: z.string().trim(),
  email: z.string().trim(),
  department: z.string().trim(),
  position: z.string().trim(),
  joiningDate: z.string().trim(),
  leavesHours: z.string().trim(),
});

const userRepo = new UserRepositoryImpl();
const changePassword = new ChangePasswordUseCase(userRepo);

interface Props {
  changeTab(name: string): void;
}

export default function ProfessionalInfoTab(props: Props) {
  const [loading, setLoading] = useState(false);
  // const { toast } = useToast();
  const windowSize = useWindowSize();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      statusWorking: "",
      email: "",
      department: "",
      position: "",
      joiningDate: "",
      leavesHours: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // FLOW: UI -> use cases -> repositories -> API
    try {
      //
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const onGoBack = () => {
    // save and next
    props.changeTab("personal");
  };

  return (
    <div
      style={{
        maxHeight: windowSize.height - 100 - 40 - 48 - 50,
        minHeight: windowSize.height - 100 - 40 - 48 - 50,
      }}
      className=" bg-white flex flex-1 h-full rounded-md "
    >
      <StyledOverlay isVisible={loading} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          style={{
            maxHeight: windowSize.height - 100 - 40 - 48 - 50,
            minHeight: windowSize.height - 100 - 40 - 48 - 50,
          }}
          className=" flex flex-col space-y-4 mt-1  w-full p-5  rounded-md  overflow-y-auto hide-scrollbar"
        >
          <div className={"flex items-center justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name={"username"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      tabIndex={1}
                      placeholder="User Name  "
                      {...field}
                      className="border-border focus:border-primary h-14"
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
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      tabIndex={1}
                      placeholder="Email Address"
                      {...field}
                      className="border-border focus:border-primary h-14"
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
          <div className={"flex items-center justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name="statusWorking"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        style={{
                          color: !field.value ? "var(--secondary)" : "black",
                        }}
                        className="border-border border h-[52px]  text-secondary"
                      >
                        <SelectValue
                          placeholder={"Employee Type"}
                          className=" border-border border w-full"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {STAFF_STATUS.map((item) => {
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
            <FormField
              control={form.control}
              name="statusWorking"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        style={{
                          color: !field.value ? "var(--secondary)" : "black",
                        }}
                        className="border-border border  h-[52px]"
                      >
                        <SelectValue
                          placeholder={"Position"}
                          className=" border-border border w-[256px]"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {STAFF_STATUS.map((item) => {
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
          <div className={"flex items-center justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name="statusWorking"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        style={{
                          color: !field.value ? "var(--secondary)" : "black",
                        }}
                        className="border-border border h-[52px]"
                      >
                        <SelectValue
                          placeholder={"Department"}
                          className=" border-border border w-[256px]"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {STAFF_STATUS.map((item) => {
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
            <FormField
              control={form.control}
              name={"joiningDate"}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <StyledDatePicker
                      field={field}
                      title={"Select Joining Date"}
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
          <div className={"flex items-center justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name={"leavesHours"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      tabIndex={1}
                      placeholder="Leaves Hours"
                      {...field}
                      className="border-border focus:border-primary h-[52px]"
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
          <div className="flex flex-1 justify-end items-end gap-x-4 ">
            <Button
              onClick={onGoBack}
              variant="outline"
              disabled={loading}
              tabIndex={3}
              className="w-[152px] h-[50px] font-normal border-border bg-white text-[14px] hover:bg-gray-100 rounded-lg"
              type="button"
            >
              Back
            </Button>
            <Button
              disabled={loading}
              tabIndex={3}
              className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
              type="submit"
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
