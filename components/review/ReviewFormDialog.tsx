"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import ReviewForm from './ReviewForm';

// type TypeProp = "create" | "update";

const ReviewFormDialog = ({
  isOpen
} : {
  isOpen: boolean
}) => {
  console.log("isOpen", isOpen);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Review</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] md:h-auto md:max-w-[500px] rounded-xl max-h-[85dvh] overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" onChange={() => {}} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" onChange={() => {}} />
          </div>
        </div> */}
          {/* <ReviewForm type={'create'} /> */}
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

export default ReviewFormDialog;