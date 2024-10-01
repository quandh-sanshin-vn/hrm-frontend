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
const formSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(1, { message: "Current password is required" })
      .min(8, {
        message: "Current password does not meet the required format",
      }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: "New password is required" })
      .min(8, { message: "New password does not meet the required format" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirmation password is required" })
      .min(8, {
        message: "Confirmation password does not meet the required format",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirmation password does not match the new password.",
    path: ["confirmPassword"], // Set the error path to `confirmPassword`
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
      if (res?.code === 0) {
        toast({
          description: "Change password success",
          color: "bg-blue-200",
        });
      } else {
        if (res?.data?.error_code === "CURRENT_PASSWORD_IS_CORRECT") {
          toast({
            description: "Current password is incorrect.",
            color: "bg-red-100",
          });
        } else if (
          res?.data?.error_code === "NEW_PASSWORD_NOT_THE_SAME_CURRENT_PASSWORD"
        ) {
          toast({
            description: "New password is the same as the current password.",
            color: "bg-red-100",
          });
        } else {
          toast({
            description: "Change password failed",
            color: "bg-red-100",
          });
        }
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
              <FormItem className="laptop:w-1/2 w-full">
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
              <FormItem className="laptop:w-1/2 w-full">
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
              <FormItem className="laptop:w-1/2 w-full">
                <FormControl>
                  <Input
                    tabIndex={3}
                    placeholder="Confirm New password"
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
          <div className="flex w-full gap-3 flex-col-reverse laptop:flex-row justify-center laptop:justify-end gap-x-4 pt-[70px]">
            <Button
              onClick={onClearForm}
              variant="outline"
              disabled={loading}
              tabIndex={3}
              className="laptop:w-[152px] h-[50px] font-normal border-border bg-white text-[14px] hover:bg-gray-100 rounded-lg"
              type="button"
            >
              {"Clear"}
            </Button>
            <Button
              disabled={loading}
              tabIndex={3}
              className="laptop:w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
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
