import {
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from "lucide-react";

export const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

function getNewValueForItem(item: any) {
  if (item.label === "Conversation") {
    return "bg-violet-500/10 ";
  } else if (item.label === "Music Generation") {
    return "bg-emerald-500/10";
  } else if (item.label === "Image Generation") {
    return "bg-pink-700/10";
  } else if (item.label === "Video Generation") {
    return "bg-orange-700/10";
  } else if (item.label === "Code Generation") {
    return "bg-green-700/10";
  }
}
export const tools = routes
  .filter((item) => item.label !== "Dashboard" && item.label !== "Settings")
  .map((item) => {
    return {
      ...item,
      bgColor: getNewValueForItem(item),
    };
  });
