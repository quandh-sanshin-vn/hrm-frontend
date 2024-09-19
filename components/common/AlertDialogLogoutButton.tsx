import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import IconLogout from "../../app/assets/icons/iconLogout.png";
import Image from "next/image";
import { LogoutUseCase } from "@/core/application/usecases/auth/signOut.usecase";
import { AuthRepositoryImpl } from "@/core/infrastructure/repositories/auth.repo";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutRequest } from "@/apis/modules/auth";

const authRepo = new AuthRepositoryImpl();
const logoutUseCase = new LogoutUseCase(authRepo);

interface Props {
  isOpen: boolean;
}
export function AlertDialogLogoutButton(props: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const onConfirmLogout = async () => {
    try {
      // const res = await logoutUseCase.execute();
      const res = await logoutRequest();
      // console.log("============", res);
      // await signOut({
      //   callbackUrl: "/login",
      //   redirect: true,
      // });
    } catch (error) {
      console.log("=======error=====", error);
    }
  };

  useEffect(() => {
    console.log("-----session--12AlertDialog-----", session);
    if (status === "loading") return;
    if (!session?.sessionToken) router.push("/login");
  }, [session, status, router]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="mx-2">
        <Button
          className="flex items-center justify-center  bg-red_login hover:bg-red_login_hover"
          style={{
            width: props.isOpen ? "60" : "unset",
          }}
        >
          <Image src={IconLogout} alt="" className="h-6 w-6" />
          {props.isOpen && (
            <p className="text-[16px] text-white ml-2">Logout</p>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out??</AlertDialogTitle>
          <AlertDialogDescription className={"text-left"}>
            Click logout to log out the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-1 items-center justify-end gap-2 ">
            <AlertDialogCancel className="mt-0 w-[120px]">
              Close
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmLogout}
              className="mb-0 w-[120px] text-white bg-red_login_hover"
            >
              Logout
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
