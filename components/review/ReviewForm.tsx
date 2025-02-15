"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReviewProps } from "@/types/index";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
import { reviewSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import FileUpload from "@/components/FileUpload";
// import { createMovie } from "@/lib/admin/actions/movie";
// import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
// import { createReview } from "@/lib/actions/movie";

type TypeProp = "create" | "update";

const ReviewForm = ({ type, review }: { type: TypeProp, review?: ReviewProps }) => {
  // const router = useRouter();
  console.log("review-------->", review);
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: "",
      score: 5
    }
  });

  useEffect(() => {
    if (review?.id) {
      form.setValue("text", review.text);
      form.setValue("score", review.score);
    }
  }, [review, form]);

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    console.log(values);
    // const result = await createReview(values);




    // if (type === 'update' && review?.id) {
    //   const result = await updateReview(values, review.id);
    //   if (result.success) {
    //     toast({
    //       title: "Success",
    //       description: "Movie updated successfully",
    //     });
    //     router.push("/admin/movies");
    //   } else {
    //     toast({
    //       title: "Error",
    //       description: result.message,
    //       variant: "destructive",
    //     });
    //   }
    // } else if (type === 'create') {
    //   const result = await createMovie(values);
    //   if (result.success) {
    //     toast({
    //       title: "Success",
    //       description: "Movie created successfully",
    //     });
    //     router.push("/admin/movies");
    //   } else {
    //     toast({
    //       title: "Error",
    //       description: result.message,
    //       variant: "destructive",
    //     });
    //   }
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        
        <FormField
          control={form.control}
          name={"score"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-sm font-normal">
                Score
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Review score"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {type === 'create' ? "Add" : "Edit"} Movie
        </Button>
      </form>
    </Form>
  );
};
export default ReviewForm;