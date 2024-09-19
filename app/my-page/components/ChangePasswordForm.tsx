import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import iconEyeOn from "../../assets/icons/iconEye.png";
import iconEyeOff from "../../assets/icons/iconEyeOff.png";

const formSchema = z.object({
  currentPassword: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .trim()
    .min(1, { message: "Chưa nhập mật khẩu hiện tại" })
    .min(8, { message: "Mật khẩu hiện tại không đúng định dạng" }),
  newPassword: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .trim()
    .min(1, { message: "Chưa nhập mật khẩu mới" })
    .min(8, { message: "Mật khẩu hiện tại không đúng định dạng" }),
  confirmPassword: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .trim()
    .min(1, { message: "Chưa nhập mật khẩu xác nhận" })
    .min(8, { message: "Mật khẩu hiện tại không đúng định dạng" }),
});

export default function ChangePasswordForm() {
  const [hideCurrentPassword, setHideCurrentPassword] = useState(false);
  const [hideNewPassword, setHideNewPassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // FLOW: UI -> use cases -> repositories -> API
    // API response -> next-auth: save to session. UI use "useSession" -> isLogin: true||false
    setLoading(true);
  };

  const toggleHideCurrentPassword = () => {
    setHideCurrentPassword(!hideCurrentPassword);
  };
  const toggleHideNewPassword = () => {
    setHideNewPassword(!hideNewPassword);
  };
  const toggleHideConfirmPassword = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };
  // if (loading) return <></>;

  return (
    <div className=" bg-white flex flex-1 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-1  w-full p-5 "
        >
          <FormField
            control={form.control}
            name={"currentPassword"}
            render={({ field, fieldState }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <Input
                    tabIndex={2}
                    placeholder="Current Password"
                    {...field}
                    className="border-border focus:border-primary h-14"
                    endIcon={() => (
                      <Image
                        src={hideCurrentPassword ? iconEyeOn : iconEyeOff}
                        alt=""
                        className="h-4 w-4"
                      />
                    )}
                    endIconOnClick={toggleHideCurrentPassword}
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
            name={"newPassword"}
            render={({ field, fieldState }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <Input
                    tabIndex={2}
                    placeholder="New Password"
                    {...field}
                    className="border-border focus:border-primary h-14"
                    endIcon={() => (
                      <Image
                        src={hideNewPassword ? iconEyeOn : iconEyeOff}
                        alt=""
                        className="h-4 w-4"
                      />
                    )}
                    endIconOnClick={toggleHideNewPassword}
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
            name={"confirmPassword"}
            render={({ field, fieldState }) => (
              <FormItem className="w-1/2">
                <FormControl>
                  <Input
                    tabIndex={3}
                    placeholder="Enter your password"
                    {...field}
                    className="border-border focus:border-primary h-14"
                    endIcon={() => (
                      <Image
                        src={hideConfirmPassword ? iconEyeOn : iconEyeOff}
                        alt=""
                        className="h-4 w-4"
                      />
                    )}
                    endIconOnClick={toggleHideConfirmPassword}
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
          <div className="flex justify-end gap-x-4 pt-[70px]">
            <Button
              variant="outline"
              disabled={loading}
              tabIndex={3}
              className="w-[152px] h-[50px] font-normal border-border bg-white text-[14px] hover:bg-gray-100 rounded-lg"
              type="submit"
            >
              {"Cancel"}
            </Button>
            <Button
              disabled={loading}
              tabIndex={3}
              className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
              type="submit"
            >
              {loading ? "Loading" : "Change Password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
