"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[600px] border h-[100dvh] flex items-center justify-center gap-10 flex-col">
        <Button
          title="Sign Up"
          onClick={() => console.log("Sign Up")}
          disabled={false}
        />
        <Input label="Email" type="email" name="email" className="w-full" />
      </div>
    </div>
  );
}
