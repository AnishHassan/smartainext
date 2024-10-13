"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { Suspense } from "react";

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    console.log("Prompt ID:", promptId); // Debugging promptId

    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        console.log("API response:", response); // Debugging API response

        if (!response.ok) throw new Error("Failed to fetch prompt details");

        const data = await response.json();
        console.log("Fetched data:", data); // Debugging fetched data

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

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
          "Content-Type": "application/json", // Added Content-Type header
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
    <Suspense>
      <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={EditPrompt}
      />
    </Suspense>
  );
};

export default UpdatePrompt;
