"use client";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import { useToast } from "@/hooks/use-toast";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useWindowSize from "@/hooks/use-dimession";
import StyledOverlay from "@/components/common/StyledOverlay";
import { useUserStore } from "@/stores/staffStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  phone: z.string().trim(),
  birth_day: z.string().trim(),
  address: z.string().trim(),
  country: z.string().trim(),
  image: z.string().trim(),
});

const userRepo = new UserRepositoryImpl();
const showMyPage = new ShowMyPageUseCase(userRepo);

export default function PersonalInformationForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const useDimession = useWindowSize();
  const { user, setUser } = useUserStore((state) => state);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      birth_day: "",
      address: "",
      country: "",
      image: "",
    },
  });

  const getMyPage = async () => {
    try {
      setLoading(true);
      const res: any = await showMyPage.execute();
      setUser(res.data);
    } catch (error: any) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lấy thông tin người dùng.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyPage();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // FLOW: UI -> use cases -> repositories -> API
    try {
      // setLoading(true);
      // const params: Password = {
      //   currentPassword: data.currentPassword,
      //   newPassword: data.newPassword,
      // };
      // const res = await changePassword.execute(params);
      // if (res?.code === 0) {
      //   toast({
      //     description: "Change password success",
      //     color: "bg-blue-200",
      //   });
      // } else {
      // }
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
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          {user ? (
            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="flex flex-col pb-2 col-span-1 gap-5">
                <div className={`flex flex-col ${isEditing ? "" : "border-b"}`}>
                  {!isEditing && (
                    <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                      Fullname
                    </p>
                  )}
                  <Input
                    value={user.fullname}
                    disabled
                    className={`text-[#16151C] text-base focus:ring-0 ${
                      isEditing
                        ? "border border-border p-4 w-full focus:border-primary h-14"
                        : "border-b p-0 border-none w-full"
                    }`}
                    style={{ color: "#16151", opacity: 1 }}
                  />
                </div>
                <div className={`flex flex-col ${isEditing ? "" : "border-b"}`}>
                  <FormField
                    control={form.control}
                    name={"birth_day"}
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full">
                        {" "}
                        {!isEditing && (
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Date of Birth
                          </FormLabel>
                        )}
                        <FormControl>
                          <Input
                            tabIndex={1}
                            disabled={!isEditing}
                            {...(isEditing
                              ? field
                              : {
                                  value: new Date(
                                    user.birth_day
                                  ).toLocaleDateString("en-GB"),
                                })}
                            placeholder="Enter your birth day"
                            className={`text-[#16151C] text-base focus:ring-0 ${
                              isEditing
                                ? "border border-[#A2A1A8] p-4 w-full focus:border-primary h-14"
                                : "border-b p-0 border-none w-full"
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
                    )}
                  />
                </div>
                <div className={`flex flex-col ${isEditing ? "" : "border-b"}`}>
                  <FormField
                    control={form.control}
                    name={"address"}
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full">
                        {" "}
                        {!isEditing && (
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Address
                          </FormLabel>
                        )}
                        <FormControl>
                          <Input
                            tabIndex={2}
                            disabled={!isEditing}
                            {...(isEditing ? field : { value: user.address })}
                            placeholder="Enter your address"
                            className={`text-[#16151C] text-base focus:ring-0 ${
                              isEditing
                                ? "border border-[#A2A1A8] p-4 w-full focus:border-primary h-14"
                                : "border-b p-0 border-none w-full"
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
                    )}
                  />
                </div>
                <div className={`flex flex-col ${isEditing ? "" : "border-b"}`}>
                  <FormField
                    control={form.control}
                    name={"country"}
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full">
                        {" "}
                        {!isEditing && (
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Nationality
                          </FormLabel>
                        )}
                        <FormControl>
                          <Input
                            tabIndex={3}
                            disabled={!isEditing}
                            {...(isEditing ? field : { value: user.country })}
                            placeholder="Enter your country"
                            className={`text-[#16151C] text-base focus:ring-0 ${
                              isEditing
                                ? "border border-[#A2A1A8] p-4 w-full focus:border-primary h-14"
                                : "border-b p-0 border-none w-full"
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
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col pb-2 col-span-1 gap-5">
                <div className={`flex flex-col ${isEditing ? "" : "border-b"}`}>
                  <FormField
                    control={form.control}
                    name={"phone"}
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full">
                        {" "}
                        {!isEditing && (
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Mobile Number
                          </FormLabel>
                        )}
                        <FormControl>
                          <Input
                            tabIndex={4}
                            disabled={!isEditing}
                            {...(isEditing ? field : { value: user.phone })}
                            placeholder="Enter mobile number"
                            className={`text-[#16151C] text-base focus:ring-0 ${
                              isEditing
                                ? "border border-[#A2A1A8] p-4 w-full focus:border-primary h-14"
                                : "border-b p-0 border-none w-full"
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
                    )}
                  />
                </div>
              </div>
            </div>
          ) : (
            <StyledOverlay isVisible={loading} />
          )}
          <div className="fixed bottom-[26px] right-[27px]">
            {!isEditing ? (
              <Button
                tabIndex={3}
                className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button
                  tabIndex={3}
                  className="w-[152px] h-[50px] font-normal text-white text-[14px] bg-gray-500 hover:bg-gray-600 rounded-lg"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  tabIndex={3}
                  className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
                  type="button"
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
