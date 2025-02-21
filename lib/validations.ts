import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const movieSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  director: z.string().trim().min(2).max(100),
  genres: z.array(z.string()).refine((value: string[]) => value.some((item: string) => item), {
    message: "You have to select at least one item.",
  }),
  // rating: z.coerce.number().min(1).max(5),
  thumbnail: z.string().nonempty(),
  videoUrl: z.string().nonempty(),
  // images: z.array(z.string()),
  releaseYear: z.coerce.number().int().gte(1895).lte(2025) // change it to dynamic
});

export const baseReviewSchema = z.object({
  text: z.string().trim().min(10).max(5000),
  score: z.coerce.number().int().gte(0).lte(10)
});

export const criticReviewSchema = z.intersection(baseReviewSchema, z.object({
  fullReviewLink: z.string().url(),
}));

export const baseProfileSchema = z.object({
  fullName: z.string().min(3)
});

export const criticProfileSchema = z.intersection(baseProfileSchema, z.object({
  agency: z.string().min(3)
}));

// export const profileUserSchema = z.object({
//   fullName: z.string().min(3)
// });

// export const profileBaseSchema = z.object({
//   fullName: z.string().min(3)
// });

// export const profileSchema = z.discriminatedUnion(
//     'role',
//     [
//       z.object({
//         role: z.literal("USER")
//       }).merge(profileBaseSchema),
//       z.object({
//         role: z.literal("CRITIC"),
//         agency: z.string().min(3)
//       }).merge(profileBaseSchema),
//     ],
//   );

// export const profileCriticSchema = z.object({
//   fullName: z.string().min(3),
//   agency: z.string().min(3)
// });
