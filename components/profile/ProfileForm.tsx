"use client";
// import { profileSchema } from '@/lib/validations';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleTypes } from '@/types';
import { updateUserProfile } from '@/lib/actions';
import { toast } from '@/hooks/use-toast';
import { baseProfileSchema, criticProfileSchema } from "@/lib/validations";

const ProfileForm = ({
  id,
  agency,
  role,
  fullName
}: {
  id: string,
  agency: string | null,
  role: RoleTypes,
  fullName: string,
}) => {
  const isCritic = role === 'CRITIC';

  const baseDefaultValues = {
    fullName: fullName || ""
  };

  const profileSchema = isCritic ? criticProfileSchema : baseProfileSchema;
  const defaultValues = isCritic ? {
    ...baseDefaultValues,
    agency: agency || ""
  } : baseDefaultValues;

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    const result = await updateUserProfile(values, id);
    if (result.success) {
      toast({
        title: "Success",
        description: "Profile updated successfully",
        variant: 'success'
      });
      form.reset(values);
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"fullName"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-sm font-normal">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Full Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isCritic && (
          <FormField
            control={form.control}
            name={"agency"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-sm font-normal">
                  Agency
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your place of work"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={!form.formState.isDirty || form.formState.isLoading}>
          Edit profile
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm;