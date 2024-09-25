"use client";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import { useToast } from "@/hooks/use-toast";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { useEffect, useState } from "react";
import { User } from "@/core/entities/models/user.model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useWindowSize from "@/hooks/use-dimession";

const userRepo = new UserRepositoryImpl();
const showMyPage = new ShowMyPageUseCase(userRepo);

export default function PersonalInformationForm() {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const useDimession = useWindowSize();

  const getMyPage = async () => {
    try {
      const res: any = await showMyPage.execute();
      setUserProfile(res.data);
      console.log(res);
    } catch (error: any) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lấy thông tin người dùng.",
      });
    } finally {
    }
  };

  useEffect(() => {
    getMyPage();
  }, []);

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
      {userProfile ? (
        <div className="grid grid-cols-2 gap-7 w-full">
          <div className="flex flex-col pb-2 col-span-1 gap-7">
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Fullname
              </p>
              <Input
                value={userProfile.fullname}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Date of Birth
              </p>
              <Input
                value={new Date(userProfile.birth_day).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
                disabled
                className="text-[#16151] border-none focus:ring-0 text-base p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">Address</p>
              <Input
                value={userProfile.address}
                disabled
                className="text-[#16151] border-none focus:ring-0 text-base p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Nationality
              </p>
              <Input
                value={userProfile.country}
                disabled
                className="text-[#16151 border-none focus:ring-0 text-base p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
          </div>

          <div className="flex flex-col pb-2 col-span-1">
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Mobile Number
              </p>
              <Input
                value={userProfile.phone}
                disabled
                className="text-[#16151] border-none focus:ring-0 text-base p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Đợi trong giây lát.</p>
      )}
      <div className="fixed bottom-[26px] right-[27px]">
        <Button
          tabIndex={3}
          className="w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
          type="submit"
        >
          {"Edit"}
        </Button>
      </div>
    </div>
  );
}
