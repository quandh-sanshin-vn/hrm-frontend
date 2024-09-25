"use client";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import { useToast } from "@/hooks/use-toast";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { useEffect, useState } from "react";
import { User } from "@/core/entities/models/user.model";
import { Input } from "@/components/ui/input";
import useWindowSize from "@/hooks/use-dimession";

const userRepo = new UserRepositoryImpl();
const showMyPage = new ShowMyPageUseCase(userRepo);

export default function ProfessionalInformationForm() {
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
      className="bg-white flex flex-1 h-full p-4 flex-col max-h-screen overflow-y-auto"
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
                Employee ID
              </p>
              <Input
                value={userProfile.idkey}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Employee Type
              </p>
              <Input
                value={userProfile.status_working}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Department
              </p>
              <Input
                value={userProfile.department}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Joining Date
              </p>
              <Input
                value={new Date(userProfile.started_at).toLocaleDateString(
                  "en-GB"
                )}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Remaining leave hours
              </p>
              <Input
                value={userProfile.time_off_hours}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
          </div>
          <div className="flex flex-col pb-2 gap-7 col-span-1">
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                User Name
              </p>
              <Input
                value={userProfile.username}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">Email</p>
              <Input
                value={userProfile.email}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Position
              </p>
              <Input
                value={userProfile.position_name}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
            <div className="flex flex-col border-b">
              <p className="text-[#A2A1A8] font-light text-[0.9rem]">
                Terminate Date
              </p>
              <Input
                value={userProfile.ended_at}
                disabled
                className="text-[#16151] text-base border-none focus:ring-0 p-0"
                style={{ color: "#16151", opacity: 1 }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Đợi trong giây lát.</p>
      )}
    </div>
  );
}
