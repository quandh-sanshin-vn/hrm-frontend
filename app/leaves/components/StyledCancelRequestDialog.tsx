"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  canRequest: string | undefined;
}

export default function StyledCancelRequestDialog(props: Props) {
  const { canRequest } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {canRequest == "1" && (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-[152px] h-[48px] bg-[#A2A1A8] hover:bg-gray-400  text-white border-none rounded-[10px]"
            onClick={handleOpen}
          >
            Cancel Request
          </Button>
        </DialogTrigger>
      )}

      {canRequest != "1" && (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-[152px] h-[48px] bg-[#BD0D10] hover:bg-[#E6393C] text-white border-none rounded-[10px]"
            onClick={handleOpen}
          >
            Cancel Request
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cancel Request</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="reason" className="font-semibold">
            Reason for Cancelation:
          </Label>
          <div className="rounded-sm border w-full border-[#A2A1A8]">
            <Textarea id="reason" className="w-full" />
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-rol justify-end gap-3">
            <button
              className="laptop:w-[132px] mx-4 laptop:mx-0 h-[42px] font-normal border border-[#A2A1A880] hover:bg-gray-100 rounded-[10px]"
              onClick={handleClose}
            >
              No
            </button>
            <Button type="submit" className="text-white rounded-[10px]">
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
