import React, { useState } from "react";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";
import { LoginTwo } from "./LoginTwo";
import toast from "react-hot-toast";


const Header = () => {
  const [pending , setPending] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Wallet color="white" size="20" />
          </div>
          <span className="font-bold text-base text-zinc-100">CashFlow</span>
        </div>
        <div className="flex gap-4 items-center">
          
          {localStorage.getItem("token") ? (
            <Button
              variant="ghost"
              size="sm"
              className="font-normal bg-red-500 text-gray-100 cursor-pointer mx-2"
              onClick={() => {
                setPending(true)
                setTimeout(() => {
                  toast.success("Logout successfully")
                  localStorage.removeItem("token");
                  setPending(false)
                  window.location.assign("/");
                }, 500);
              }}
              disabled={pending}
            >
             Logout
            </Button>
          ) : <LoginTwo/>}
          
           
          
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
