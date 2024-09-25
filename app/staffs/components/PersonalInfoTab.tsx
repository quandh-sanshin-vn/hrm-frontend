"use client";
import { StyledDatePicker } from "@/components/common/StyledDatePicker";
import StyledOverlay from "@/components/common/StyledOverlay";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordUseCase } from "@/core/application/usecases/my-page/changePassword.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useWindowSize from "@/hooks/useWindowSize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  fullname: z.string().trim(),
  phoneNumber: z.string().trim(),
  dateOfBirth: z.string().trim(),
  address: z.string().trim(),
  country: z.string().trim(),
});

const userRepo = new UserRepositoryImpl();
const changePassword = new ChangePasswordUseCase(userRepo);

interface Props {
  changeTab(name: string): void;
}

export default function PersonalInfoTab(props: Props) {
  const [loading, setLoading] = useState(false);
  // const { toast } = useToast();
  const windowSize = useWindowSize();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      country: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // FLOW: UI -> use cases -> repositories -> API
    try {
      //
      onNextForm();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const onNextForm = () => {
    // save and next
    props.changeTab("professional");
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
              name={"fullname"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      tabIndex={1}
                      placeholder="Full name"
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
              name={"phoneNumber"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      tabIndex={1}
                      placeholder="Phone Number"
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
              name={"dateOfBirth"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <StyledDatePicker field={field} title={"Date of Birth"} />
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
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      tabIndex={1}
                      placeholder="Address"
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
              name={"country"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input
                      tabIndex={1}
                      placeholder="Country"
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
            {/* <Button
              onClick={onClearForm}
              variant="outline"
              disabled={loading}
              tabIndex={3}
              className="w-[152px] h-[50px] font-normal border-border bg-white text-[14px] hover:bg-gray-100 rounded-lg"
              type="button"
            >
              {"Clear"}
            </Button> */}
            <Button
              disabled={loading}
              tabIndex={3}
              className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
              type="submit"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
