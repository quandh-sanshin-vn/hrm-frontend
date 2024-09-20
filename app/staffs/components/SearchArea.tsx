import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  staffName: z.string(),
  position: z.string(),
});
export default function SearchArea() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffName: "",
      position: "",
    },
  });
  return <div className="p-3 bg-gray-300"></div>;
}
