import {
  CreateDayOffParams,
  UpdateDayOffParams,
} from "@/apis/modules/schedule";
import IconEdit from "@/app/assets/icons/iconEdit.svg";
import IconEditing from "@/app/assets/icons/iconEditing.svg";
import StyledOverlay from "@/components/common/StyledOverlay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CreateDayOffUseCase } from "@/core/application/usecases/schedule/createDayOff.usecase";
import { UpdateDayOffUseCase } from "@/core/application/usecases/schedule/updateDayOff.usecase";
import { ScheduleRepositoryImpl } from "@/core/infrastructure/repositories/schedule.repo";
import { toast } from "@/hooks/use-toast";
import useWindowSize from "@/hooks/useWindowSize";
import { useScheduleStore } from "@/stores/scheduleStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  dayType: "0" | "1" | "none";
  dayDescription: string;
  mode: "edit" | "create";
  title?: string;
  updatedAt: string;
  id: string;
  date: string;
  onClosePopover(): void;
}

const FormSchema = z.object({
  title: z.string({ message: "Title is required" }),
  desciption: z
    .string({ message: "Description is required" })
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(255, {
      message: "Description must not be longer than 255 characters.",
    }),
  type: z.enum(["0", "1", "none"], {
    required_error: "Type is required",
  }),
});

const scheduleRepo = new ScheduleRepositoryImpl();
const createDayOff = new CreateDayOffUseCase(scheduleRepo);
const updateDayOff = new UpdateDayOffUseCase(scheduleRepo);

export default function MobileEditDayForm(props: Props) {
  const { mode } = props;

  const [enableEdit, setEnableEdit] = useState(mode == "create");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateReload } = useScheduleStore((state) => state);
  const windowSize = useWindowSize();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onCreateDayOff = async (data: z.infer<typeof FormSchema>) => {
    const createParams: CreateDayOffParams = {
      description: data.desciption,
      title: data.title,
      status: data.type == "0" ? "0" : "1",
      day_off: props.date,
    };
    const result = await createDayOff.execute(createParams);
    if (result?.code == 0) {
      toast({
        description: "Create day off successfully",
        color: `bg-blue-200`,
      });
      handleClose();
      updateReload(true);
    } else {
      toast({
        description: "Create day off failed",
        color: "bg-red-100",
      });
    }
  };

  const onUpdateDayOff = async (data: z.infer<typeof FormSchema>) => {
    const updateParams: UpdateDayOffParams = {
      id: props.id,
      updated_at: props.updatedAt,
      description: data.desciption,
      title: data.title,
      status: data.type == "0" ? "0" : "1",
      day_off: props.date,
    };
    const result = await updateDayOff.execute(updateParams);
    if (result?.code == 0) {
      toast({
        description: "Update day off information successfully",
        color: `bg-blue-200`,
      });
      handleClose();
      updateReload(true);
    } else {
      toast({
        description: "Update  day off information failed",
        color: "bg-red-100",
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      if (mode == "edit") {
        await onUpdateDayOff(data);
      } else {
        await onCreateDayOff(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
      props.onClosePopover();
    }
  };

  // const titleField = form.getFieldState("title", form.formState);
  // const typeField = form.getFieldState("type", form.formState);
  // const descriptionField = form.getFieldState("desciption", form.formState);

  const toggleEditStatus = () => {
    setEnableEdit(!enableEdit);
  };

  // const isDirtyForm = useMemo(() => {
  //   if (!enableEdit) return false;
  //   const isDirty =
  //     titleField.isDirty || descriptionField.isDirty || typeField.isDirty;
  //   return isDirty;
  // }, [
  //   titleField.isDirty,
  //   typeField.isDirty,
  //   descriptionField.isDirty,
  //   enableEdit,
  // ]);

  useEffect(() => {
    if (mode === "edit") {
      form.setValue("title", props.title || "");
      form.setValue("desciption", props.dayDescription || "");
      form.setValue(
        "type",
        props.dayType == "0" ? "0" : props.dayType == "1" ? "1" : "none"
      );
    }
  }, [props.title, props?.dayDescription, props?.dayType]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-0 mx-0 w-full">
        <Button
          variant={"outline"}
          className={"text-black border-border w-full"}
        >
          {mode == "create" ? "Create Information" : "Edit Information"}
        </Button>
      </DialogTrigger>
      <DialogContent
        id="modal-content"
        className="flex flex-col  px-5 py-5 w-[90%] rounded-md "
      >
        <DialogTitle></DialogTitle>
        {mode == "create" ? (
          <DialogTitle className="text-[20px] font-semibold ">
            Create infomation
          </DialogTitle>
        ) : (
          <div className="flex items-center  justify-start">
            <DialogTitle className="text-[20px] font-semibold mr-2 ">
              Edit infomation
            </DialogTitle>
            {!enableEdit ? (
              <Image
                onClick={toggleEditStatus}
                alt="Edit"
                src={IconEdit}
                className="h-4 aspect-square hover:cursor-pointer"
              />
            ) : (
              <Image
                onClick={toggleEditStatus}
                alt="Edit"
                src={IconEditing}
                className="h-6 aspect-square hover:cursor-pointer "
              />
            )}
          </div>
        )}
        <StyledOverlay isVisible={loading} />
        <Form {...form}>
          <form
            contentEditable={false}
            onSubmit={form.handleSubmit(onSubmit)}
            style={{
              maxHeight: 500,
              minHeight: windowSize.height * 0.6,
            }}
            className=" flex flex-1 space-y-4 flex-col mt-1  w-full p-2 laptop:p-5  rounded-md  overflow-y-auto hide-scrollbar"
          >
            <div className={"flex flex-1 flex-col gap-x-5  w-full "}>
              <FormField
                control={form.control}
                name={"title"}
                disabled={!enableEdit}
                render={({ field, fieldState }) => (
                  <FormItem className="w-full " tabIndex={1}>
                    <FormLabel
                      className={"font-normal text-[14px] text-secondary "}
                    >
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className=" border-b border-border rounded-none "
                        maxLength={20}
                      />
                    </FormControl>
                    {fieldState.error?.message && (
                      <p className={"text-red-500 text-[10px]"}>
                        {fieldState.error?.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"desciption"}
                disabled={!enableEdit}
                render={({ field, fieldState }) => (
                  <FormItem className="w-full " tabIndex={1}>
                    <FormLabel
                      className={"font-normal text-[14px] text-secondary "}
                    >
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className=" resize-none border border-border h-[200px] items-start justify-start bg-white rounded-sm "
                        maxLength={255}
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error?.message && (
                      <p className={"text-red-500 text-[10px]"}>
                        {fieldState.error?.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                disabled={!enableEdit}
                render={({ field, fieldState }) => {
                  return (
                    <FormItem className="space-y-2 mt-4">
                      <FormLabel className="font-semibold text-[16px] ">
                        Select Type
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          disabled={!enableEdit}
                          value={String(field.value)}
                          onValueChange={field.onChange}
                          className="flex items-center gap-x-4"
                        >
                          <FormItem className="flex items-center space-x-1">
                            <FormControl>
                              <RadioGroupItem value={"0"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Day Off
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 ">
                            <FormControl>
                              <RadioGroupItem value={"1"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Work Day
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      {fieldState.error?.message && (
                        <p className={"text-red-500 text-[10px]"}>
                          {fieldState.error?.message}
                        </p>
                      )}
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className={" flex w-full gap-x-2"}>
              <DialogClose className="w-full laptop:w-[152px]">
                <Button
                  variant={"outline"}
                  tabIndex={3}
                  className="w-full laptop:w-[152px] h-[50px] font-normal border-border text-[14px] hover:bg-secondary"
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={!enableEdit}
                tabIndex={3}
                className="w-full laptop:w-[152px] h-[50px] font-normal text-white text-[14px] hover:bg-primary-hover rounded-lg"
                type="submit"
              >
                Apply
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
