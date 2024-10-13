import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full mb-5  text-center font-inter orange_gradient text-sm">
      Copyright @ 2024 {""}{" "}
      <Link
        href="https://github.com/AnishHassan"
        target="_blank"
        className="blue_gradient font-satoshi"
      >
        ANISH HASSAN
      </Link>{" "}
      {""} All rights reserved.
    </div>
  );
};

export default Footer;
