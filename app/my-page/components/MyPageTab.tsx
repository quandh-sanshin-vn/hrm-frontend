"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import ChangePasswordIcon from "../../assets/icons/iconLock.svg";
import ChangePasswordActiveIcon from "../../assets/icons/iconLockActive.svg";
import PersonalIcon from "../../assets/icons/iconUser.svg";
import PersonalActiveIcon from "../../assets/icons/iconUserActive.svg";
import ProfessionalIcon from "../../assets/icons/iconBriefcase.svg";
import ProfessionalActiveIcon from "../../assets/icons/iconBriefcaseActive.svg";
import ChangePasswordForm from "./ChangePasswordForm";
import PersonalInformationForm from "@/app/my-page/components/PersonalInformationForm";
import ProfessionalInformationForm from "@/app/my-page/components/ProfessionalInformationForm";
import { useEditingStore } from "@/stores/commonStore";

export default function MyPageTab() {
  const [tab, changeTab] = useState("personal");
  const { isEditing, setIsEditing } = useEditingStore((state) => state);

  return (
    <Tabs
      onValueChange={changeTab}
      defaultValue="personal"
      className="flex flex-1 flex-col bg-white h-full w-full min-w-full"
    >
      <TabsList className="w-full justify-start ">
        <TabsTrigger value="personal" className="flex-col">
          <div className="flex items-center">
            {tab === "personal" ? (
              <Image src={PersonalActiveIcon} alt="" className="h-6 w-6 mx-1" />
            ) : (
              <Image src={PersonalIcon} alt="" className="h-6 w-6 mx-1" />
            )}
            <p
              className="text-[16px] font-normal"
              style={{
                // fontWeight: tab === "personal" ? "700" : "400",
                color: tab === "personal" ? "var(--primary)" : "black",
              }}
            >
              Personal Information
            </p>
          </div>
          <div
            className="h-1 w-full  mt-1"
            style={{
              backgroundColor: tab === "personal" ? "var(--primary)" : "white",
            }}
          />
        </TabsTrigger>
        <TabsTrigger value="professional" className="flex-col">
          <div className="flex items-center">
            {tab === "professional" ? (
              <Image
                src={ProfessionalActiveIcon}
                alt=""
                className="h-6 w-6 mx-1"
              />
            ) : (
              <Image src={ProfessionalIcon} alt="" className="h-6 w-6 mx-1" />
            )}
            <p
              className="text-[16px] font-normal"
              style={{
                // fontWeight: tab === "professional" ? "700" : "400",
                color: tab === "professional" ? "var(--primary)" : "black",
              }}
            >
              Professional Information
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
        {!isEditing && (
          <TabsTrigger value="password" className="flex-col">
            <div className="flex items-center">
              {tab === "password" ? (
                <Image
                  src={ChangePasswordActiveIcon}
                  alt=""
                  className="h-6 w-6 mx-1"
                />
              ) : (
                <Image
                  src={ChangePasswordIcon}
                  alt=""
                  className="h-6 w-6 mx-1"
                />
              )}
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
      <TabsContent value="professional">
        <ProfessionalInformationForm />
      </TabsContent>
      {!isEditing && (
        <TabsContent value="password" className="flex flex-1 w-full">
          <ChangePasswordForm />
        </TabsContent>
      )}
    </Tabs>
  );
}
