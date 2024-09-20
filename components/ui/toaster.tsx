"use client";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { twMerge } from "tailwind-merge";
export function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        color,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            className={twMerge(
              " w-[400px] h=[80px] flex-col fixed bottom-10 right-5 items-start ",
              color
            )}
          >
            <div className="grid gap-1 ">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>
                  <p className={twMerge("text-white text-size-14")}>
                    {description}
                  </p>
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
