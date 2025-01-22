"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Movie } from "@/types/index";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { movieSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { createMovie, updateMovie } from "@/lib/admin/actions/movie";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

const genres = [
  {
    id: "comedy",
    label: "Comedy",
  },
  {
    id: "romance",
    label: "Romance",
  },
  {
    id: "western",
    label: "Western",
  },
  {
    id: "adventure",
    label: "Adventure",
  },
  {
    id: "thriller",
    label: "Thriller",
  },
  {
    id: "horror",
    label: "Horror",
  },
] as const

// interface Props extends Partial<Movie> {
//   type?: "create" | "update";
// }

type TypeProp = "create" | "update";

const MovieForm = ({ type, movie }: { type: TypeProp, movie?: Movie }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof movieSchema>>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      description: "",
      director: "",
      genres: [],
      // rating: 1,
      thumbnail: "",
      videoUrl: "",
      // images: [],
      releaseYear: 2000
    }
  });

  useEffect(() => {
    if (movie?.id) {
      form.setValue("title", movie.title);
      form.setValue("description", movie.description);
      form.setValue("director", movie.director);
      form.setValue("genres", movie.genres);
      form.setValue("thumbnail", movie.thumbnail);
      form.setValue("videoUrl", movie.videoUrl);
      form.setValue("releaseYear", movie.releaseYear);
    }
  }, [movie, form]);

  const onSubmit = async (values: z.infer<typeof movieSchema>) => {
    if (type === 'update' && movie?.id) {
      const result = await updateMovie(values, movie.id);
      if (result.success) {
        toast({
          title: "Success",
          description: "Movie updated successfully",
        });
        router.push("/admin/movies");
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } else if (type === 'create') {
      const result = await createMovie(values);
      if (result.success) {
        toast({
          title: "Success",
          description: "Movie created successfully",
        });
        // router.push(`/admin/movies/${result.data.id}`);
        router.push("/admin/movies");
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
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">
                Movie Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Movie title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">
                Movie Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Movie description"
                  {...field}
                  rows={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"director"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">
                Director
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Director"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genres"}
          render={() => (
            <FormItem>
              <div className="text-base font-normal mb-3">
                Movie Genres
              </div>
              {genres.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="genres"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"releaseYear"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Release Year
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Movie Release Year"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"thumbnail"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">
                Movie cover
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a movie cover"
                  folder="movies/covers"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Movie Trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/*"
                  placeholder="Upload a movie trailer"
                  folder="movies/videos"
                  onFileChange={field.onChange}
                  value={field.value}
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
export default MovieForm;