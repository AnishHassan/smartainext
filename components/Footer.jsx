import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex-grow">
      </div>

      <div className="w-full text-center font-inter orange_gradient text-sm py-4 bg-gray-800 text-white">
        Copyright @ 2024{" "}
        <Link
          href="https://github.com/AnishHassan"
          target="_blank"
          className="blue_gradient font-satoshi"
        >
          ANISH HASSAN
        </Link>{" "}
        All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
