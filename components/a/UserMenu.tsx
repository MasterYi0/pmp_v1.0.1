'use client';

import { useTranslations } from "next-intl";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

export function UserMenu({ user }: { user: User }) {
  const t = useTranslations("NavBar");

  const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "User";
  const email = user.email;

  const handleSignOut =  () => {
  window.location.href = '/auth/logout'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative h-9 w-9 rounded-full outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
        <Avatar className="h-9 w-9 border border-slate-200">
          <AvatarImage src={avatarUrl} alt={fullName} />
          <AvatarFallback className="bg-slate-900 text-white font-semibold text-xs">
            {fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 bg-white border border-slate-200 p-1.5 text-slate-800 shadow-md">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback className="bg-slate-100 text-slate-800 text-xs font-medium">{fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5 overflow-hidden">
            <p className="text-sm font-semibold truncate text-slate-900">{fullName}</p>
            <p className="text-xs truncate text-slate-500">{email}</p>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-slate-100 my-1" />

        <DropdownMenuItem 
          onClick={handleSignOut} 
          className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer gap-2 rounded-md px-2 py-1.5 text-sm"
        >
          <LogOut className="h-4 w-4" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>


      </DropdownMenuContent>
    </DropdownMenu>
  );
}