"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function MainScreen() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "loading") return;
  //   if (!session || !session?.user?.accessToken) router.push("/login");
  // }, [session, status, router]);

  return (
    <div className="flex">
      <SideBarComponent />
    </div>
  );
}

export default MainScreen;
