"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReviewParams, RoleTypes } from "@/types/index";
import { Slider } from "@/components/ui/slider"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePathname } from 'next/navigation'
import { reviewSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createReview, updateReview } from "@/lib/actions/movie";
import { toast } from "@/hooks/use-toast";
import ReviewScore from "./ReviewScore";

type TypeProp = "create" | "update";

const ReviewForm = ({ 
  type, 
  toggleDialog, 
  review, 
  id,
  userId,
  userRole
} : { 
  type: TypeProp, 
  toggleDialog: () => void, 
  review: ReviewParams | null, 
  id: string, 
  userId: string | undefined, 
  userRole: RoleTypes | undefined
}) => {
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: review?.text || "",
      score: review?.score ?? 5
    }
  });
  
  const pathname = usePathname();

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    if (type === 'update' && review?.id) {
      const result = await updateReview(values, review?.id, pathname);
      if (result.success) {
        toast({
          title: "Success",
          description: "Review updated successfully",
          variant: 'success'
        });
        toggleDialog();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } else if (type === 'create') {
      if (!(userId && userRole)) {
        return;
      }
      const result = await createReview(values, id, userId, userRole, pathname);
      if (result.success) {
        toast({
          title: "Success",
          description: "Review created successfully",
        });
        toggleDialog();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name={"score"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <div className="mb-3">
                <ReviewScore score={field.value} />
              </div>
              <FormControl>
                <Slider defaultValue={[field.value]} onValueChange={(e) => {field.onChange(...e)}} max={10} min={0} step={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"text"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-sm font-normal">
                Your Review
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Review text"
                  {...field}
                  rows={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isDirty || form.formState.isLoading}>
          {type === 'create' ? "Add" : "Edit"} Review
        </Button>
      </form>
    </Form>
  );
};
export default ReviewForm;