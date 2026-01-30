"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    Calendar,
    LayoutDashboard,
    ListOrdered,
    Search,
    Settings,
    Package,
    Truck,
    Layers,
    Star,
    ShieldCheck,
    LucideGitCompare,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAdmin";

const menuGroups = [
    {
        label: "Main",
        items: [
            { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
            { title: "Orders", url: "/dashboard/order", icon: ListOrdered },
            { title: "Services", url: "/dashboard/services", icon: Package },
        ],
    },

    {
        label: "Configuration",
        items: [
            { title: "Type", url: "/dashboard/type", icon: Layers },
            { title: "Tier", url: "/dashboard/tier", icon: Star },
            { title: "Includes", url: "/dashboard/includes", icon: ShieldCheck },
            { title: "Comparative", url: "/dashboard/comparative", icon: LucideGitCompare },
            { title: "Transfer", url: "/dashboard/transfer", icon: Truck },
        ],
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { logout, isLoggingOut } = useAuth();


    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="py-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
                        <Image
                            src="/logo.jpg"
                            alt="Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
                        <span className="font-bold text-slate-900">Soul Dunes</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Admin Panel</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {menuGroups.map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                            {group.label}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive = pathname === item.url;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={item.title}
                                                isActive={isActive}
                                                className={`transition-all duration-200 ${isActive
                                                        ? "bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                                                        : "text-slate-600 hover:bg-slate-100"
                                                    }`}
                                            >
                                                <Link href={item.url} className="flex items-center gap-3">
                                                    <item.icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
                                                    <span className="font-medium">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

                  <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logout()}
              disabled={isLoggingOut}
              tooltip="Logout"
              className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}