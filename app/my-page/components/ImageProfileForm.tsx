import Image from "next/image";
import { ShowMyPageUseCase } from "@/core/application/usecases/my-page/showMyPage.usecase";
import { User } from "@/core/entities/models/user.model";
import { UserRepositoryImpl } from "@/core/infrastructure/repositories/user.repo";
import { useToast } from "@/hooks/use-toast";
import AvatarDefault from "../../assets/images/avatar_default.png";
import IconBriefCase from "../../assets/icons/iconBriefcase.svg";
import IconEmail from "../../assets/icons/iconGmail.svg";

import React, { useEffect, useState } from "react";

const userRepo = new UserRepositoryImpl();
const showMyPage = new ShowMyPageUseCase(userRepo);

export default function ImageProfileForm() {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<User | null>(null);

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
    }
  };

  useEffect(() => {
    getMyPage();
  }, []);

  return userProfile ? ( // Bỏ dấu {}
    <div className="flex items-center gap-4 p-4">
      {/* Hình ảnh hồ sơ */}
      <div className="w-[100px] h-[100px]">
        <Image
          src={userProfile.image ? userProfile.image : AvatarDefault}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between gap-2">
        <p className="text-2xl font-semibold">{userProfile.fullname}</p>
        <div className="flex flex-row gap-2">
          <Image src={IconBriefCase} alt="" />
          <p className="text-base">{userProfile.position_name}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Image src={IconEmail} alt="" />
          <p className="text-base">{userProfile.email}</p>
        </div>
      </div>
    </div>
  ) : (
    <p>Đợi trong giây lát.</p>
  );
}
