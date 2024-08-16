"use client";

import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[600px] border h-[100dvh] flex items-center justify-center">
        <Button
          title="Sign Up"
          onClick={() => console.log("Sign Up")}
          disabled={false}
        />
      </div>
    </div>
  );
}
