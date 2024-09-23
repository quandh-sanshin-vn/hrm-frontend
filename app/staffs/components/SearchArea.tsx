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
export default function SearchArea() {
  const [loading, setLoading] = useState(false);
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
      const response: any = await getPositionRequest();
      setPosition(response?.data);
    } catch (error) {}
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
                        <SelectItem value={item.id as string}>
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
