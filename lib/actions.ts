"use server";

import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { redirect } from "next/navigation";
import { z } from "zod";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

const schema = z.object({
  title: z
    .string({ invalid_type_error: "Invalid title" })
    .min(1, "Title is required"),
  image: z.custom((file) => file && file.size > 0, "Image is required"),
  content: z
    .string({ invalid_type_error: "Invalid content" })
    .min(1, "Content is required"),
});

export async function createPost(prevState: any, formData: any) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  const validatedFields = schema.safeParse({
    title,
    image,
    content,
  });

  if (!validatedFields.success)
    return { errors: validatedFields.error.flatten().fieldErrors };

  try {
    const imageUrl = await uploadImage(image);

    await storePost({
      imageUrl,
      userId: 1,
      title,
      image,
      content,
    });
  } catch (err: any) {
    console.log(err.message);
    throw new Error("An error occurred! please try again later.");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function togglePostLikeStatus(postId: number) {
  await updatePostLikeStatus(postId, 1);

  revalidatePath("/", "layout");
}
