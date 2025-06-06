import favicon from "@/assets/image/favicon.svg";
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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { allHelps } from "content-collections";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { SidebarItemActive } from "../utils/sidebar-active";

export function AppSidebar() {
  return (
    <Sidebar className="z-20">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10" asChild>
              <div className="flex items-center justify-between w-full">
                <Link
                  href="/"
                  className="flex items-center space-x-2 md:flex-1 rtl:space-x-reverse"
                >
                  <Image
                    src={favicon}
                    className="size-8"
                    alt="Azure TTS logo"
                  />
                  <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    TTS Importer
                  </span>
                </Link>
                <Link
                  href="https://github.com/yy4382/tts-importer"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "hover:text-purple-400"
                  )}
                >
                  <GithubIcon className="!size-5" />
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>导入</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarItemActive asChild pathname="/">
                  <Link href="/">Azure TTS</Link>
                </SidebarItemActive>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarItemActive asChild pathname="/ra">
                  <Link href="/ra">Edge TTS</Link>
                </SidebarItemActive>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>帮助</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allHelps
                .sort((a, b) => (a.order < b.order ? -1 : 1))
                .map((doc, idx) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarItemActive asChild pathname={`/help/${doc.slug}`}>
                      <Link href={`/help/${doc.slug}`}>{doc.title}</Link>
                    </SidebarItemActive>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
