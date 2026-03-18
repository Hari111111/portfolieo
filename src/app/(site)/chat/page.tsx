import ChatPage from "@/components/Chat/ChatPage";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Real-time Chat & Private Messaging | Hari Mishra - Full Stack Developer Tools",
  description: "Experience lightning-fast real-time communication on our interactive chat platform. Join global group discussions or create secure, ephemeral private rooms for confidential messaging. No data storage—completely private and secure.",
  keywords: [
    "real-time chat",
    "group chat",
    "private messaging",
    "ephemeral chat",
    "socket.io chat",
    "developer tools",
    "secure communication",
    "web-based chat app",
    "Hari Mishra",
    "full stack developer tools",
    "anonymous chat platform"
  ],
  openGraph: {
    title: "Real-time Chat & Private Messaging Protocol",
    description: "Secure, real-time messaging platform with group and private room capabilities. Built with Socket.io for maximum performance.",
    type: "website",
    url: "https://portfolieo-five.vercel.app/chat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-time Chat | Secure Messaging Platform",
    description: "Join our real-time community or host private encrypted rooms. No data stored.",
  }
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
