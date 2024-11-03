"use client";

import { createPost } from "@/lib/actions";
import FormSubmit from "@/components/form-submit";
import { useFormState } from "react-dom";

export default function NewPostPage() {
  const [state, formAction] = useFormState(createPost, { errors: {} });

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        {state.errors?.title && (
          <p className="form-error">{state.errors?.title}</p>
        )}

        <p className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        {state.errors?.image && (
          <p className="form-error">{state.errors?.image}</p>
        )}

        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows={5} />
        </p>
        {state.errors?.content && (
          <p className="form-error">{state.errors?.content}</p>
        )}

        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
    </>
  );
}
