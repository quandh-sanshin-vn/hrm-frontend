"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordUseCase } from "@/core/application/usecases/my-page/changePassword.usecase";
import { Password } from "@/core/entities/models/password.model";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import iconEyeOn from "../../assets/icons/iconEye.png";
import iconEyeOff from "../../assets/icons/iconEyeOff.png";
import StyledOverlay from "@/components/common/StyledOverlay";
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
const userRepo = new UserRepositoryImpl();
const changePassword = new ChangePasswordUseCase(userRepo);

export default function ChangePasswordForm() {
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
    try {
      setLoading(true);
      const params: Password = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      const res = await changePassword.execute(params);
      if (res.code === 0) {
        toast({
          description: "Change password success",
          color: "bg-blue-200",
        });
      } else {
        toast({
          description: "Change password failed",
          color: "bg-red-100",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const onClearForm = () => {
    form.reset();
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

  return (
    <div className=" bg-white flex flex-1 h-full">
      <StyledOverlay isVisible={loading} />
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
                    tabIndex={1}
                    placeholder="Current Password"
                    {...field}
                    className="border-border focus:border-primary h-14"
                    type={hideCurrentPassword ? "password" : "text"}
                    endIcon={hideCurrentPassword ? iconEyeOff : iconEyeOn}
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
                    type={hideNewPassword ? "password" : "text"}
                    endIcon={hideNewPassword ? iconEyeOff : iconEyeOn}
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
                    type={hideConfirmPassword ? "password" : "text"}
                    endIcon={hideConfirmPassword ? iconEyeOff : iconEyeOn}
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
              onClick={onClearForm}
              variant="outline"
              disabled={loading}
              tabIndex={3}
              className="w-[152px] h-[50px] font-normal border-border bg-white text-[14px] hover:bg-gray-100 rounded-lg"
              type="button"
            >
              {"Clear"}
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
