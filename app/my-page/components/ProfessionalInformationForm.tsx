"use client";
import StyledOverlay from "@/components/common/StyledOverlay";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import useWindowSize from "@/hooks/use-dimession";
import useFocus from "@/hooks/use-focus";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/stores/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  idkey: z.string().trim(),
  status_working: z.string().trim(),
  birth_day: z.string().trim(),
  started_at: z.string().trim(),
  department: z.string().trim(),
  time_off_hours: z.string().trim(),
  username: z.string().trim(),
  email: z.string().trim(),
  position_name: z.string().trim(),
  ended_at: z.string().trim(),
});
const userRepo = new UserRepositoryImpl();
const showMyPage = new ShowMyPageUseCase(userRepo);

export default function ProfessionalInformationForm() {
  const { toast } = useToast();
  const useDimession = useWindowSize();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idkey: user?.idkey,
      status_working: user?.status_working,
      department: user?.department,
      started_at: user?.started_at,
      time_off_hours: user?.time_off_hours,
      username: user?.username,
      email: user?.email,
      position_name: user?.position_name,
      ended_at: user?.ended_at,
    },
  });

  const isReserveForm = form.watch("idkey");
  const isFocus = useFocus();
  useEffect(() => {
    if (isFocus) {
      form.setValue("idkey", user?.idkey || "");
      form.setValue("status_working", user?.status_working || "");
      form.setValue("department", user?.department || "");
      form.setValue("time_off_hours", user?.time_off_hours || "");
      form.setValue("started_at", user?.started_at || "");
      form.setValue("username", user?.username || "");
      form.setValue("email", user?.email || "");
      form.setValue("position_name", user?.position_name || "");
      form.setValue("ended_at", user?.ended_at || "");
    }
  }, [isReserveForm, isFocus]);

  const getMyPage = async () => {
    try {
      setLoading(true);
      const res: any = await showMyPage.execute();
      setUser(res.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Unable to get user information.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {};

  useEffect(() => {
    getMyPage();
  }, []);

  return (
    <div
      className="bg-white flex flex-1 h-full p-4 flex-col max-h-screen overflow-y-auto"
      style={{
        maxHeight: useDimession.height - 100 - 100 - 120,
        minHeight: useDimession.height - 100 - 100 - 120,
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
                <div className="flex flex-col border-b">
                  <FormField
                    control={form.control}
                    name={"idkey"}
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Employee ID
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full hover:cursor-not-allowed`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col border-b">
                  <FormField
                    control={form.control}
                    name={"status_working"}
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Employee Type
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full hover:cursor-not-allowed`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col border-b">
                  <FormField
                    control={form.control}
                    name={"department"}
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Department
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full hover:cursor-not-allowed`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col border-b">
                  <FormField
                    control={form.control}
                    name={"started_at"}
                    render={({ field, fieldState }) => {
                      const formattedDate = field.value
                        ? new Date(field.value).toLocaleDateString("en-GB")
                        : "";
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Joining Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              value={formattedDate}
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full hover:cursor-not-allowed`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col border-b">
                  <FormField
                    control={form.control}
                    name={"time_off_hours"}
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Remaining leave hours
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full hover:cursor-not-allowed`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col pb-2 gap-5 col-span-1">
                <div className="flex flex-col border-b">
                  <FormField
                    control={form.control}
                    name={"username"}
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            User Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full hover:cursor-not-allowed`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col border-b">
                  <FormField
                    control={form.control}
                    name={"email"}
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full hover:cursor-not-allowed`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col border-b">
                  <FormField
                    control={form.control}
                    name={"position_name"}
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Position
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full hover:cursor-not-allowed`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col border-b">
                  <FormField
                    control={form.control}
                    name={"ended_at"}
                    render={({ field, fieldState }) => {
                      const formattedDate = field.value
                        ? new Date(field.value).toLocaleDateString("en-GB")
                        : "";
                      return (
                        <FormItem className={`w-full`}>
                          <FormLabel className="text-[#A2A1A8] font-light text-[0.9rem]">
                            Terminate Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={2}
                              disabled
                              value={formattedDate}
                              className={`text-[#16151C] text-base focus:ring-0 border-b p-0 border-none w-full hover:cursor-not-allowed`}
                              style={{ color: "#16151", opacity: 1 }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <StyledOverlay isVisible={loading} />
          )}
        </form>
      </Form>
    </div>
  );
}
