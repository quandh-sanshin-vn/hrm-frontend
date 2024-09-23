import { getPositionRequest, PositionResponse } from "@/apis/modules/common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STAFF_STATUS, STAFF_STATUS_WORKING } from "@/utilities/static-value";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  staffName: z.string(),
  position: z.string(),
  status: z.string(),
  statusWorking: z.string(),
});

interface Props {
  setLoading(loading: boolean): void;
}
export default function SearchArea(props: Props) {
  const { setLoading } = props;
  const [position, setPosition] = useState([]);

  const onSubmit = () => {
    try {
      setLoading(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffName: "",
      position: "",
      status: "",
      statusWorking: "",
    },
  });

  const getPosition = async () => {
    try {
      setLoading(true);
      const response: any = await getPositionRequest();
      const formattedData = response?.data
        ? response?.data.map((i: PositionResponse) => {
            return { value: i.id, name: i.name };
          })
        : [];
      setPosition(formattedData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  return (
    <div className="p-3 bg-gray-300 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-1 flex w-full items-center justify-center"
        >
          <FormField
            control={form.control}
            name="staffName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-primary font-light text-[12px]">
                  Employee Name:
                </FormLabel>
                <FormControl>
                  <Input
                    tabIndex={1}
                    placeholder="Name"
                    {...field}
                    className="border-border focus:border-primary"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Position"
                        className=" border-border border w-[256px]"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {position.map((item: PositionResponse) => {
                      return (
                        <SelectItem value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Position"
                        className=" border-border border w-[256px]"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {STAFF_STATUS.map((item) => {
                      return (
                        <SelectItem value={String(item.value)}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Position"
                        className=" border-border border w-[256px]"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {STAFF_STATUS_WORKING.map((item) => {
                      return (
                        <SelectItem value={String(item.value)}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
