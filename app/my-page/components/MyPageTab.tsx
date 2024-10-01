"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";

import PersonalInformationForm from "@/app/my-page/components/PersonalInformationForm";
import ProfessionalInformationForm from "@/app/my-page/components/ProfessionalInformationForm";
import { useEditingStore } from "@/stores/commonStore";
import ProfessionalIcon from "../../assets/icons/iconBriefcase.svg";
import ProfessionalActiveIcon from "../../assets/icons/iconBriefcaseActive.svg";
import ChangePasswordIcon from "../../assets/icons/iconLock.svg";
import ChangePasswordActiveIcon from "../../assets/icons/iconLockActive.svg";
import PersonalIcon from "../../assets/icons/iconUser.svg";
import PersonalActiveIcon from "../../assets/icons/iconUserActive.svg";
import ChangePasswordForm from "./ChangePasswordForm";
import useWindowSize from "@/hooks/use-dimession";

export default function MyPageTab() {
  const [tab, changeTab] = useState("personal");
  const { isEditing, setIsEditing } = useEditingStore((state) => state);
  const useDimession = useWindowSize();

  useEffect(() => {
    if (isEditing) {
      changeTab("personal");
    }
  }, [isEditing]);

  return (
    <Tabs
      onValueChange={changeTab}
      value={tab}
      defaultValue="personal"
      className="flex flex-1 flex-col bg-white h-full w-full min-w-full"
    >
      <TabsList className="w-full justify-start mobile:max-w-screen mobile:overflow-x-auto hide-scrollbar">
        <TabsTrigger value="personal" className="flex-col">
          <div className="flex flex-1 items-center">
            <div className="w-6 h-6 mr-1 laptop:mr-2">
              {tab === "personal" ? (
                <Image
                  src={PersonalActiveIcon}
                  alt=""
                  className="h-6 w-6 laptop:mx-1"
                />
              ) : (
                <Image
                  src={PersonalIcon}
                  alt=""
                  className="h-6 w-6 laptop:mx-1"
                />
              )}
            </div>
            <p
              className="text-[16px] font-normal"
              style={{
                // fontWeight: tab === "personal" ? "700" : "400",
                color: tab === "personal" ? "var(--primary)" : "black",
              }}
            >
              {/* Personal Information */}
              <span className="block laptop:hidden">Personal</span>
              <span className="hidden laptop:block">Personal Information</span>
            </p>
          </div>
          <div
            className="h-1 w-full  mt-1"
            style={{
              backgroundColor: tab === "personal" ? "var(--primary)" : "white",
            }}
          />
        </TabsTrigger>
        {!isEditing && (
          <TabsTrigger value="professional" className="flex-col">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-1 laptop:mr-2">
                {tab === "professional" ? (
                  <Image
                    src={ProfessionalActiveIcon}
                    alt=""
                    className="h-6 w-6 laptop:mx-1"
                  />
                ) : (
                  <Image
                    src={ProfessionalIcon}
                    alt=""
                    className="h-6 w-6 laptop:mx-1"
                  />
                )}
              </div>
              <p
                className="text-[16px] font-normal"
                style={{
                  // fontWeight: tab === "professional" ? "700" : "400",
                  color: tab === "professional" ? "var(--primary)" : "black",
                }}
              >
                {/* Professional Information */}
                <span className="block laptop:hidden">Professional</span>
                <span className="hidden laptop:block">
                  Professional Information
                </span>
              </p>
            </div>

            <div
              className="h-1 w-full  mt-1"
              style={{
                backgroundColor:
                  tab === "professional" ? "var(--primary)" : "white",
              }}
            />
          </TabsTrigger>
        )}
        {!isEditing && (
          <TabsTrigger value="password" className="flex-col">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-1 laptop:mr-2">
                {tab === "password" ? (
                  <Image
                    src={ChangePasswordActiveIcon}
                    alt=""
                    className="h-6 w-6 laptop:mx-1"
                  />
                ) : (
                  <Image
                    src={ChangePasswordIcon}
                    alt=""
                    className="h-6 w-6 laptop:mx-1"
                  />
                )}
              </div>
              <p
                className="text-[16px] font-normal"
                style={{
                  // fontWeight: tab === "password" ? "700" : "400",
                  color: tab === "password" ? "var(--primary)" : "black",
                }}
              >
                Change Password
              </p>
            </div>
            <div
              className="h-1 w-full  mt-1"
              style={{
                backgroundColor:
                  tab === "password" ? "var(--primary)" : "white",
              }}
            />
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="personal">
        <PersonalInformationForm />
      </TabsContent>
      {!isEditing && (
        <TabsContent value="professional">
          <ProfessionalInformationForm />
        </TabsContent>
      )}
      {!isEditing && (
        <TabsContent value="password" className="flex flex-1 w-full">
          <ChangePasswordForm />
        </TabsContent>
      )}
    </Tabs>
  );
}
