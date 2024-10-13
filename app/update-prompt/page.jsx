import { Suspense } from "react";
import UpdatePrompt from "./UpdatePrompts";


export async function fetchPromptDetails(promptId) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt/${promptId}`);
  const data = await response.json();
  return data;
}

export default async function UpdatePromptPage({ searchParams }) {
  const promptId = searchParams.id;

  const promptDetails = await fetchPromptDetails(promptId);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt promptId={promptId} promptDetails={promptDetails} />
    </Suspense>
  );
}
