'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChefHat,
  LayoutDashboard,
  Building,
  UtensilsCrossed,
  AreaChart,
  Users,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { href: '/manager/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/manager/branches', icon: Building, label: 'Branches' },
  { href: '/manager/menu', icon: UtensilsCrossed, label: 'Menu' },
  { href: '/manager/revenue', icon: AreaChart, label: 'Revenue' },
  { href: '/manager/staff', icon: Users, label: 'Staff' },
];

export function ManagerSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/manager/dashboard" className="flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold font-headline text-sidebar-foreground">
            Trackera
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center w-full p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://picsum.photos/seed/manager/100/100"
                  alt="Manager"
                />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className="ml-3 text-left group-data-[collapsible=icon]:hidden">
                <p className="font-semibold text-sm">Suresh Gupta</p>
                <p className="text-xs text-muted-foreground">Manager</p>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
