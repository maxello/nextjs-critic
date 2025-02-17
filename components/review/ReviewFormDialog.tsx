"use client";

import React, { useState } from 'react';
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
import ReviewForm from './ReviewForm';
import { ReviewParams, RoleTypes } from '@/types';

// type TypeProp = "create" | "update";

const ReviewFormDialog = ({
  review,
  id,
  userId,
  userRole
} : {
  review: ReviewParams | null,
  id: string,
  userId: string | undefined,
  userRole: RoleTypes | undefined
}) => {
  const [open, setOpen] = useState(false);
  const toggleDialog = () => {
    setOpen(() => !open);
  }
  const reviewId = review?.id;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={toggleDialog}>{reviewId ? 'Edit' : 'Add'} Review</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] md:h-auto md:max-w-[500px] rounded-xl max-h-[85dvh] overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle>{reviewId ? 'Edit' : 'Add'} Review</DialogTitle>
          <DialogDescription>
            {reviewId ? 'Make changes to your review here' : ''}
          </DialogDescription>
        </DialogHeader>
        <ReviewForm 
          type={reviewId ? 'update' : 'create'}
          id={id} 
          userId={userId}
          toggleDialog={toggleDialog}
          userRole={userRole}
          review={review}  
        />
      </DialogContent>
    </Dialog>
  )
}

export default ReviewFormDialog;