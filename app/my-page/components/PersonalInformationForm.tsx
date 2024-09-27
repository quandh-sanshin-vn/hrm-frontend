"use client";
import { UserProfileParams } from "@/apis/modules/auth";
import { AlertDialogCancelButton } from "@/components/common/AlertDialogCancelButton";
import { StyledDatePicker_v1 } from "@/components/common/StyledDatePicker_v1";
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
import { EditMyPageUseCase } from "@/core/application/usecases/my-page/editMyPage.usecase";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { AuthRepositoryImpl } from "@/core/infrastructure/repositories/auth.repo";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useWindowSize from "@/hooks/use-dimession";
import useFocus from "@/hooks/use-focus";
import { useToast } from "@/hooks/use-toast";
import { useEditingStore, useFileStore } from "@/stores/commonStore";
import { useUserStore } from "@/stores/userStore";
import { DATE_OF_BIRTH } from "@/utilities/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  fullname: z.string().trim(),
  phone: z.string().trim(),
  birth_day: z.string().trim(),
  // .refine((value) => {
  //   const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
  //   return regex.test(value);
  // }),
  address: z.string().trim(),
  country: z.string().trim(),
  image: z.string().trim(),
});

const userRepo = new UserRepositoryImpl();
const showMyPage = new ShowMyPageUseCase(userRepo);

const authRepo = new AuthRepositoryImpl();
const editMyPage = new EditMyPageUseCase(authRepo);

export default function PersonalInformationForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const useDimession = useWindowSize();
  const { user, setUser } = useUserStore((state) => state);
  const { isEditing, setIsEditing } = useEditingStore((state) => state);
  const [isOpen, setIsOpen] = useState(true);
  const { image, setImage, clearImage } = useFileStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: user?.phone,
      birth_day: user?.birth_day,
      address: user?.address,
      country: user?.country,
      image: user?.image,
    },
  });

  const isReserveForm = form.watch("fullname");
  const isFocus = useFocus();
  useEffect(() => {
    if (isFocus) {
      form.setValue("fullname", user?.fullname || "");
      form.setValue("address", user?.address || "");
      form.setValue("phone", user?.phone || "");
      form.setValue("country", user?.country || "");
      form.setValue("image", user?.image || "");
      form.setValue("birth_day", user?.birth_day || "");
    }
  }, [isReserveForm, isFocus]);

  const getMyPage = async () => {
    try {
      // setLoading(true);
      const res: any = await showMyPage.execute();
      setUser(res.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Unable to get user information",
      });
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getMyPage();
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // FLOW: UI -> use cases -> repositories -> API
    try {
      setLoading(true);
      const params: UserProfileParams = {
        phone: data.phone,
        birth_day: format(data.birth_day, DATE_OF_BIRTH).toString(),
        address: data.address,
        country: data.country,
        image: image,
        updated_at: user?.updated_at || "",
      };

      console.log(format(data.birth_day, DATE_OF_BIRTH));
      console.log(image);

      const res = await editMyPage.execute(params);
      if (res?.code === 0) {
        toast({
          description: "Edit profile success",
          color: "bg-blue-200",
        });
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white flex flex-1 p-4 flex-col w-full max-h-screen overflow-y-auto"
      style={{
        maxHeight: useDimession.height - 100 - 100 - 120,
        minHeight: useDimession.height - 100 - 100 - 120,
        scrollbarWidth: "none",
      }}
    >
      <StyledOverlay isVisible={loading} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          {user ? (
            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="flex flex-col pb-2 col-span-1 gap-5">
                <div className={`flex flex-col border-b`}>
                  <FormField
                    control={form.control}
                    name={"fullname"}
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Fullname
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full ${
                                isEditing ? "hover:cursor-not-allowed" : ""
                              }`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                          {isEditing && fieldState.error?.message && (
                            <p className={"text-red-500 text-[10px]"}>
                              {fieldState.error?.message}
                            </p>
                          )}
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div
                  className={`flex flex-col border-b ${
                    isEditing ? "" : "hover:cursor-not-allowed"
                  }`}
                >
                  <FormField
                    control={form.control}
                    name={"birth_day"}
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                          Date of Birth
                        </FormLabel>
                        <FormControl>
                          <StyledDatePicker_v1 field={field} />
                        </FormControl>
                        {isEditing && fieldState.error?.message && (
                          <p className={"text-red-500 text-[10px]"}>
                            {fieldState.error?.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div className={`flex flex-col border-b`}>
                  <FormField
                    control={form.control}
                    name={"address"}
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled={!isEditing}
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                          {isEditing && fieldState.error?.message && (
                            <p className={"text-red-500 text-[10px]"}>
                              {fieldState.error?.message}
                            </p>
                          )}
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className={`flex flex-col border-b`}>
                  <FormField
                    control={form.control}
                    name={"country"}
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                          Nationality
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            tabIndex={3}
                            disabled={!isEditing}
                            className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full`}
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
                </div>
              </div>

              <div className="flex flex-col pb-2 col-span-1 gap-5">
                <div className={`flex flex-col border-b`}>
                  <FormField
                    control={form.control}
                    name={"phone"}
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            tabIndex={4}
                            disabled={!isEditing}
                            className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full`}
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
                </div>
              </div>
            </div>
          ) : (
            <StyledOverlay isVisible={loading} />
          )}
          <div className="fixed bottom-[26px] right-[27px]">
            {isEditing && (
              <div className="flex gap-4">
                <AlertDialogCancelButton isOpen={isOpen} />

                <Button
                  tabIndex={3}
                  className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
