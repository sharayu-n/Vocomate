"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mic, MessageSquare, BookOpen, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { name: "Train", href: "/train", icon: Mic },
  { name: "Interview", href: "/interview", icon: MessageSquare },
  { name: "Vocabulary", href: "/vocabulary", icon: BookOpen },
  { name: "Profile", href: "/profile", icon: User },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white flex items-center justify-between px-8 py-4 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-12">
        <Link href="/train" className="flex items-center gap-1">
          <span className="font-bold text-2xl tracking-tighter">voco</span>
          <span className="font-bold text-2xl tracking-tighter text-primary">mate</span>
        </Link>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          SIGN OUT
        </Link>
        <Avatar className="h-9 w-9 bg-emerald-700 text-white font-semibold">
          <AvatarFallback className="bg-emerald-700">S</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
