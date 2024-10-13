"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = ({ promptId, promptDetails }) => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: promptDetails?.prompt || "",
    tag: promptDetails?.tag || "",
  });

  const router = useRouter();
  const { data: session } = useSession();

  const EditPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      alert("Prompt ID not found!");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update the prompt");
      }
    } catch (error) {
      console.error("Error updating the prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={EditPrompt}
    />
  );
};

export default UpdatePrompt;
