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
import { getCookie, setCookie } from "cookies-next";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utilities/static-value";
import { useEffect, useMemo, useState } from "react";
import { AuthRepositoryImpl } from "@/core/infrastructure/repositories/auth.repo";
import { LogoutUseCase } from "@/core/application/usecases/auth/signOut.usecase";
import { useRouter } from "next/navigation";
import StyledOverlay from "./StyledOverlay";

const authRepo = new AuthRepositoryImpl();
const logoutUseCase = new LogoutUseCase(authRepo);

interface Props {
  isOpen: boolean;
}
export function AlertDialogLogoutButton(props: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onConfirmLogout = async () => {
    try {
      setLoading(true);
      const res: any = await logoutUseCase.execute();
      if (res.code == 0) {
        setCookie(ACCESS_TOKEN_KEY, "");
        setCookie(REFRESH_TOKEN_KEY, "");
        router.push("/login");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const token = useMemo(() => getCookie(ACCESS_TOKEN_KEY), []);

  useEffect(() => {
    if (!token) router.push("/login");
  }, [router, token]);

  return (
    <AlertDialog>
      <StyledOverlay isVisible={loading} />
      <AlertDialogTrigger asChild className=" laptop:mx-2 mobile:p-2 w-full">
        <Button
          disabled={loading}
          className="w-full flex-1 items-center justify-center bg-[#D14918CC] laptop:bg-red_login hover:bg-red_login_hover"
          style={{
            width: props.isOpen ? "60" : "unset",
          }}
        >
          <Image src={IconLogout} alt="" className="h-6 w-6" />
          {props.isOpen && (
            <p className="text-[16px] text-white laptop:ml-2 hidden laptop:block">
              {loading ? "Loading" : "Logout"}
            </p>
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
          <div className="flex flex-1 items-center justify-center laptop:justify-end gap-2 ">
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
