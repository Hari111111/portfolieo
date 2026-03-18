import ChatPage from "@/components/Chat/ChatPage";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Real-Time Chat App with Private Rooms | Secure Socket.IO Messaging - Hari Mishra",

  description:
    "Fast, secure real-time chat application built with Socket.IO. Join group chats or create private, anonymous rooms with zero data storage. تجربة lightning-fast messaging with complete privacy.",

  keywords: [
    "real time chat app",
    "socket.io chat application",
    "private chat rooms online",
    "anonymous messaging platform",
    "secure chat app no data storage",
    "group chat web app",
    "real time messaging app",
    "next js chat app",
    "hari mishra developer",
    "full stack chat application",
    "ephemeral messaging app"
  ],

  authors: [{ name: "Hari Mishra" }],
  creator: "Hari Mishra",

  metadataBase: new URL("https://portfolieo-five.vercel.app"),

  alternates: {
    canonical: "/chat",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  openGraph: {
    title: "Real-Time Chat App | Private & Secure Messaging Platform",
    description:
      "Experience high-performance real-time chat with private rooms and anonymous messaging. Built using Socket.IO for speed and scalability.",
    url: "https://portfolieo-five.vercel.app/chat",
    siteName: "Hari Mishra Chat App",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Secure Real-Time Chat App | Private Messaging",
    description:
      "Join group chats or create private rooms instantly. Anonymous, fast, and secure messaging powered by Socket.IO.",
  },

  category: "technology",
};
export default function ChatMainPage() {
  return (
    <div className="container mx-auto px-4 py-8">      {/* <HeroSub 
        title="Real-time Communication Protocol"
        description="Connect with other developers in the global hub or create secure, ephemeral private rooms. All messages are transient and never stored."
        breadcrumbLinks={[
          { href: "/", text: "Home" },
          { href: "/chat", text: "Chat" }
        ]}
      /> */}
      <ChatPage />
    </div>
  );
}
