"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <>
      <div className="prompt_card flex flex-col justify-between h-full">
        <div className="flex justify-between gap-5 items-start">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi semi-bold text-gray-900 ">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? "assets/icons/tick.svg"
                  : "assets/icons/copy.svg"
              }
              width={12}
              height={12}
              alt="action-btn"
            />
          </div>
        </div>
        <div className="prompt_card_text">
        <p className="my-4 font-staoshi text-sm text-gray-700  flex-grow ">
          {post.prompt}
        </p>
        </div>
       
        <p
          className="font-inter text-sm blue_gradient cursor_pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>

        {session?.user.id === post.creator._id && pathName === "/profile" && (
       
          <div className="flex-center gap-4 border-gray-100 ">
            <p
              className="font-inter text-sm green_gradient cursor-pointer rounded-lg border border-gray-300 p-2"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer rounded-lg border border-gray-300 p-2"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
       
      )}
      </div>

     
    </>
  );
};

export default PromptCard;
