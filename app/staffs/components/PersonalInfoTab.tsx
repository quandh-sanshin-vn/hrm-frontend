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
import useFocus from "@/hooks/use-focus";
import useWindowSize from "@/hooks/useWindowSize";
import { useStaffStore } from "@/stores/staffStore";
import { DATE_OF_BIRTH } from "@/utilities/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  fullname: z.string().trim().min(1, "Full name is required"),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[0-9]*$/, "Phone number must contain only digits"),
  dateOfBirth: z
    .union([z.string(), z.date()])
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
  address: z.string().trim().min(1, "Address is required"),
  country: z.string().trim().min(1, "Country is required"),
});

interface Props {
  changeTab(name: string): void;
}

export default function PersonalInfoTab(props: Props) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const { toast } = useToast();
  const windowSize = useWindowSize();
  const { updateStaffEditing, editingStaff } = useStaffStore((state) => state);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isFocus = useFocus();

  useEffect(() => {
    if (isFocus) {
      if (editingStaff.fullname)
        form.setValue("fullname", editingStaff?.fullname || "");
      if (editingStaff.phone) form.setValue("phoneNumber", editingStaff?.phone);
      if (editingStaff.fullname)
        form.setValue(
          "dateOfBirth",
          parse(editingStaff?.birth_day || "", "dd/MM/yyyy", new Date()) ||
            new Date()
        );
      if (editingStaff.fullname)
        form.setValue("address", editingStaff?.address || "");
      if (editingStaff.fullname)
        form.setValue("country", editingStaff?.country || "");
    } else {
      form.setValue("fullname", "");
      form.setValue("dateOfBirth", new Date());
      form.setValue("address", "");
      form.setValue("country", "");
    }
  }, [isFocus]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      updateStaffEditing({
        fullname: data.fullname,
        phone: data.phoneNumber,
        birth_day: format(data.dateOfBirth, DATE_OF_BIRTH),
        address: data.address,
        country: data.country,
      });
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
        maxHeight: windowSize.height - 100 - 40 - 48 - 50 - 120 - 20,
        minHeight: windowSize.height - 100 - 40 - 48 - 50 - 120 - 20,
      }}
      className=" bg-white flex flex-1 h-full rounded-md "
    >
      <StyledOverlay isVisible={loading} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          style={{
            maxHeight: windowSize.height - 100 - 40 - 48 - 50 - 120 - 20,
            minHeight: windowSize.height - 100 - 40 - 48 - 50 - 120 - 20,
          }}
          className=" flex flex-col space-y-4 mt-1  w-full p-5  rounded-md  overflow-y-auto hide-scrollbar"
        >
          <div className={"flex items-center justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name={"fullname"}
              render={({ field, fieldState }) => (
                <FormField
                  control={form.control}
                  name={"country"}
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                        Full name
                      </FormLabel>
                      <FormControl>
                        <Input
                          tabIndex={3}
                          disabled={!isEditing}
                          // {...(isEditing ? field : { value: user.country })}
                          placeholder={"Full name"}
                          className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full placeholder-[#16151C]`}
                          style={{ color: "#16151", opacity: 1 }}
                        />
                      </FormControl>
                      {isEditing && fieldState.error?.message && (
                        <p className={"text-red-500 text-[10px]"}>
                          {fieldState.error?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                // <FormItem className="w-1/2" tabIndex={1}>
                //   <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                //     Date of Birth
                //   </FormLabel>
                //   <FormControl>
                //     <Input
                //       placeholder="Full name"
                //       {...field}
                //       className="border-border focus:border-primary h-[52px]"
                //     />
                //   </FormControl>
                //   {fieldState.error?.message && (
                //     <p className={"text-red-500 text-[10px]"}>
                //       {fieldState.error?.message}
                //     </p>
                //   )}
                // </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"phoneNumber"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2" tabIndex={2}>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
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
          </div>
          <div className={"flex items-center justify-between gap-x-5"}>
            <FormField
              control={form.control}
              name={"dateOfBirth"}
              render={({ field, fieldState }) => (
                <FormItem className="w-1/2" tabIndex={3}>
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
                <FormItem className="w-1/2" tabIndex={4}>
                  <FormControl>
                    <Input
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
                <FormItem className="w-1/2" tabIndex={5}>
                  <FormControl>
                    <Input
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
