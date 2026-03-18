"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Icon } from "@iconify/react";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const SOCKET_SERVER_URL =
    process.env.NEXT_PUBLIC_SOCKET_URL || "https://portfolio-socket-server-rv84.onrender.com";

type ChatMode = "group" | "private" | null;

interface Message {
    id: string;
    roomId: string;
    senderId: string;
    text: string;
    timestamp: string;
    mode: Exclude<ChatMode, null>;
}

interface RoomResponse {
    success: boolean;
    roomId?: string;
    participantCount?: number;
    isFull?: boolean;
    message?: string;
}

interface RoomStatus {
    roomId: string;
    participantCount: number;
    isFull: boolean;
}

interface GroupStatus {
    participantCount: number;
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [chatMode, setChatMode] = useState<ChatMode>(null);
    const [roomKeyInput, setRoomKeyInput] = useState("");
    const [activeRoomId, setActiveRoomId] = useState("");
    const [privateParticipantCount, setPrivateParticipantCount] = useState(0);
    const [groupParticipantCount, setGroupParticipantCount] = useState(0);
    const [statusMessage, setStatusMessage] = useState("Connecting...");
    const [isJoiningRoom, setIsJoiningRoom] = useState(false);
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);
    const [isJoiningGroup, setIsJoiningGroup] = useState(false);
    const { theme } = useTheme();

    const socketRef = useRef<Socket | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const chatModeRef = useRef<ChatMode>(null);

    useEffect(() => {
        chatModeRef.current = chatMode;
    }, [chatMode]);

    useEffect(() => {
        // Request notification permission on mount
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }

        let storedId = sessionStorage.getItem("chat_random_id");
        if (!storedId) {
            storedId = "user_" + Math.random().toString(36).substring(2, 11);
            sessionStorage.setItem("chat_random_id", storedId);
        }
        setUserId(storedId);

        const socket = io(SOCKET_SERVER_URL);
        socketRef.current = socket;

        socket.on("connect", () => {
            setStatusMessage("Connected to server.");
            // Auto-select group mode if no mode is selected
            if (chatModeRef.current === null) {
                switchToGroup(socket);
            }
        });

        socket.on("receive-message", (message: Message) => {
            // Logic for browser notification
            const isMe = message.senderId === storedId;
            const isGroupMessage = message.mode === "group";
            
            if (isGroupMessage && !isMe) {
                const shouldNotify = document.visibilityState === "hidden" || chatModeRef.current !== "group";
                
                if (shouldNotify && "Notification" in window && Notification.permission === "granted") {
                    const notification = new Notification("New Group Message", {
                        body: message.text.length > 50 ? message.text.substring(0, 50) + "..." : message.text,
                        icon: "/favicon.ico",
                    });

                    notification.onclick = () => {
                        window.focus();
                        if (chatModeRef.current !== "group") {
                            switchToGroup();
                        }
                    };
                }
            }

            if (message.mode !== chatModeRef.current) return;
            setMessages((prev) => [...prev, message]);
        });

        socket.on("room-status", (room: RoomStatus) => {
            if (chatModeRef.current !== "private") return;
            setActiveRoomId(room.roomId);
            setPrivateParticipantCount(room.participantCount);
            setStatusMessage(
                room.participantCount < 2
                    ? "Waiting for another user..."
                    : "Private room is ready for chat."
            );
        });

        socket.on("group-status", ({ participantCount }: GroupStatus) => {
            if (chatModeRef.current !== "group") return;
            setGroupParticipantCount(participantCount);
            setStatusMessage("You are in the group chat.");
        });

        socket.on("chat-error", ({ message }: { message: string }) => {
            setStatusMessage(message);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const clearMessages = () => {
        setMessages([]);
        setInput("");
        setShowEmojiPicker(false);
    };

    const switchToGroup = (socket = socketRef.current) => {
        if (!socket || isJoiningGroup) return;

        setIsJoiningGroup(true);
        socket.emit("join-group", (response: RoomResponse) => {
            setIsJoiningGroup(false);
            if (!response.success) {
                setStatusMessage(response.message || "Failed to join group.");
                return;
            }
            clearMessages();
            setChatMode("group");
            setActiveRoomId("");
            setPrivateParticipantCount(0);
            setGroupParticipantCount(response.participantCount || 0);
            setStatusMessage("Joined Group Chat.");
        });
    };

    const switchToPrivate = () => {
        const applyPrivate = () => {
            clearMessages();
            setChatMode("private");
            setActiveRoomId("");
            setPrivateParticipantCount(0);
            setRoomKeyInput("");
            setStatusMessage("Create a room or join with a key.");
        };

        if (chatMode === "group") {
            socketRef.current?.emit("leave-group", applyPrivate);
            return;
        }
        if (chatMode === "private" && activeRoomId) {
            socketRef.current?.emit("leave-room", applyPrivate);
            return;
        }
        applyPrivate();
    };

    const handleCreateRoom = () => {
        if (!socketRef.current || isCreatingRoom) return;
        setIsCreatingRoom(true);
        socketRef.current.emit("create-room", (response: RoomResponse) => {
            setIsCreatingRoom(false);
            if (!response.success || !response.roomId) {
                setStatusMessage(response.message || "Failed to create room.");
                return;
            }
            clearMessages();
            setChatMode("private");
            setActiveRoomId(response.roomId);
            setRoomKeyInput(response.roomId);
            setPrivateParticipantCount(response.participantCount || 1);
            setStatusMessage("Private room created. Share the key!");
        });
    };

    const handleJoinRoom = () => {
        if (!socketRef.current || isJoiningRoom) return;
        const key = roomKeyInput.trim().toUpperCase();
        if (!key) {
            setStatusMessage("Please enter a room key.");
            return;
        }
        setIsJoiningRoom(true);
        socketRef.current.emit("join-room", { roomId: key }, (response: RoomResponse) => {
            setIsJoiningRoom(false);
            if (!response.success || !response.roomId) {
                setStatusMessage(response.message || "Invalid room key.");
                return;
            }
            clearMessages();
            setChatMode("private");
            setActiveRoomId(response.roomId);
            setRoomKeyInput(response.roomId);
            setPrivateParticipantCount(response.participantCount || 0);
            setStatusMessage(response.participantCount === 2 ? "Chat ready!" : "Joined. Waiting for peer...");
        });
    };

    const handleSendMessage = () => {
        if (!input.trim() || !socketRef.current || !chatMode) return;
        if (chatMode === "private" && !activeRoomId) return;

        const messageData: Message = {
            id: Date.now().toString(),
            mode: chatMode,
            roomId: chatMode === "private" ? activeRoomId : "",
            senderId: userId,
            text: input.trim(),
            timestamp: new Date().toISOString(),
        };

        socketRef.current.emit("send-message", messageData);
        setInput("");
        setShowEmojiPicker(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSendMessage();
    };

    const onEmojiClick = (emojiData: { emoji: string }) => {
        setInput((prev) => prev + emojiData.emoji);
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isPrivate = chatMode === "private";
    const isGroup = chatMode === "group";

    return (
        <main className="relative flex h-[720px] w-full overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20 md:h-[calc(100vh-140px)]">
            {/* Sidebar / Chat Menu */}
            <div className={`absolute inset-y-0 left-0 z-50 flex w-full flex-col border-white/10 bg-white/95 p-6 transition-transform duration-300 dark:bg-slate-900 md:relative md:flex md:w-1/4 md:min-w-[300px] md:translate-x-0 md:border-r md:bg-transparent md:pr-6 md:dark:bg-transparent ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
                            <Icon icon="ion:chatbubbles-outline" className="text-2xl text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Real-time Protocol</h2>
                            <p className="text-xs text-gray-500">Secure & Ephemeral Chat</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-500 md:hidden"
                    >
                        <Icon icon="ion:close-outline" className="text-2xl" />
                    </button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                    {/* Mode Selector */}
                    <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            Select Mode
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => switchToGroup()}
                                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${isGroup
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                    : "bg-white/5 text-gray-500 hover:bg-white/10 dark:text-gray-400"
                                    }`}
                            >
                                <Icon icon="ion:people-outline" />
                                Group
                            </button>
                            <button
                                onClick={() => switchToPrivate()}
                                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${isPrivate
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                    : "bg-white/5 text-gray-500 hover:bg-white/10 dark:text-gray-400"
                                    }`}
                            >
                                <Icon icon="ion:lock-closed-outline" />
                                Private
                            </button>
                        </div>
                    </div>

                    {/* Room Stats */}
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-xs font-semibold text-gray-500">Status</p>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-green-500">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                Online
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] uppercase text-gray-400">Current Room</p>
                                <p className="text-lg font-bold text-gray-800 dark:text-white">
                                    {isGroup ? "Global Community" : activeRoomId || "None"}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-[10px] uppercase text-gray-400">Active Users</p>
                                    <p className="text-sm font-bold text-blue-500">
                                        {isGroup ? groupParticipantCount : privateParticipantCount}
                                    </p>
                                </div>
                                {isPrivate && (
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase text-gray-400">Capacity</p>
                                        <p className="text-sm font-bold text-gray-500">2 Users Max</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Private Actions */}
                    {isPrivate && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase text-gray-400">
                                    Join Existing Room
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={roomKeyInput}
                                        onChange={(e) => setRoomKeyInput(e.target.value.toUpperCase())}
                                        placeholder="K3Y-R00M"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm uppercase tracking-widest text-white outline-none focus:border-blue-500/50"
                                    />
                                    <button
                                        onClick={handleJoinRoom}
                                        disabled={isJoiningRoom}
                                        className="rounded-xl bg-blue-600/20 px-4 text-blue-500 transition-all hover:bg-blue-600 hover:text-white"
                                    >
                                        <Icon icon="ion:arrow-forward" />
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5" />
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase">
                                    <span className="bg-transparent px-2 text-gray-500">Or</span>
                                </div>
                            </div>
                            <button
                                onClick={handleCreateRoom}
                                disabled={isCreatingRoom}
                                className="group relative w-full overflow-hidden rounded-xl bg-white/5 py-3 transition-all hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/10"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-semibold text-gray-800 dark:text-white">
                                    <Icon icon="ion:add-circle-outline" className="text-lg text-blue-500" />
                                    Create New Room
                                </span>
                            </button>
                        </div>
                    )}

                    {/* User Profile Info */}
                    <div className="mt-auto border-t border-white/5 pt-6">
                        <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-500">
                                <Icon icon="ion:person-outline" className="text-xl" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-bold uppercase text-gray-500">Your ID</p>
                                <p className="truncate text-xs font-mono text-gray-800 dark:text-gray-300">
                                    {userId}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <section className="flex flex-1 flex-col md:pl-6">
                {/* Chat Header */}
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-500 md:hidden"
                        >
                            <Icon icon="ion:menu-outline" className="text-2xl" />
                        </button>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                            <Icon icon={isGroup ? "ion:people-outline" : "ion:lock-closed-outline"} className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                {isGroup ? "Group Chat" : isPrivate ? (activeRoomId ? `Private Room: ${activeRoomId}` : "Private Chat") : "Ready to Start"}
                            </h3>
                            <p className="text-[11px] text-gray-500">{statusMessage}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="rounded-lg p-2 text-gray-500 transition-all hover:bg-white/5">
                            <Icon icon="ion:ellipsis-vertical" />
                        </button>
                    </div>
                </div>

                {/* Messages List */}
                <div
                    ref={scrollRef}
                    className="flex-1 space-y-6 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-white/10"
                >
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                            <div className="rounded-full bg-blue-500/5 p-8 text-blue-500/20">
                                <Icon icon="ion:chatbubbles" className="text-6xl" />
                            </div>
                            <div className="max-w-xs">
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">No messages here yet</h4>
                                <p className="text-sm text-gray-500">
                                    Start the conversation! Every message is real-time and will disappear once you leave.
                                </p>
                            </div>
                        </div>
                    ) : (
                        messages.map((msg, index) => {
                            const isMe = msg.senderId === userId;
                            return (
                                <div
                                    key={msg.id || index}
                                    className={`flex animate-in fade-in slide-in-from-bottom-2 duration-300 ${isMe ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div className={`flex max-w-[70%] gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`mt-1 h-8 w-8 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${isMe ? "bg-blue-600 text-white" : "bg-white/10 text-gray-400"
                                            }`}>
                                            {isMe ? "YOU" : msg.senderId.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div
                                                className={`rounded-2xl p-4 text-sm shadow-sm ${isMe
                                                    ? "rounded-tr-none bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
                                                    : "rounded-tl-none border border-white/10 bg-white/5 text-gray-800 dark:text-gray-200"
                                                    }`}
                                            >
                                                <p className="leading-relaxed break-words">{msg.text}</p>
                                            </div>
                                            <div className={`mt-1 flex items-center gap-2 px-1 text-[9px] uppercase tracking-tighter text-gray-500 ${isMe ? "justify-end" : "justify-start"}`}>
                                                <span>{!isMe && msg.senderId.substring(0, 8)}</span>
                                                <span>•</span>
                                                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Message Input Container */}
                <div className="relative mt-6">
                    {showEmojiPicker && (
                        <div
                            ref={emojiPickerRef}
                            className="absolute bottom-full left-0 mb-4 z-[100] animate-in zoom-in-95 duration-200"
                        >
                            <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                theme={theme === "dark" ? EmojiTheme.DARK : EmojiTheme.LIGHT}
                                width={320}
                                height={400}
                                lazyLoadEmojis
                            />
                        </div>
                    )}

                    <div className="group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 transition-all focus-within:border-blue-500/50 focus-within:bg-white/10 focus-within:shadow-xl focus-within:shadow-blue-500/5">
                        <button
                            onClick={() => setShowEmojiPicker((prev) => !prev)}
                            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${showEmojiPicker ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-white/10 hover:text-gray-300"
                                }`}
                        >
                            <Icon icon="ion:happy-outline" className="text-2xl" />
                        </button>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={isGroup ? "Type a message to the group..." : isPrivate ? (activeRoomId ? "Send a private message..." : "Select a room to start...") : "Connecting..."}
                            disabled={!chatMode || (isPrivate && !activeRoomId)}
                            className="flex-1 bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-500 dark:text-white"
                        />

                        <button
                            onClick={handleSendMessage}
                            disabled={!input.trim() || !chatMode || (isPrivate && !activeRoomId)}
                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                        >
                            <Icon icon="ion:send" className="text-xl" />
                        </button>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-gray-500">
                        Messages are shared in real-time and not saved to any database.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default ChatPage;
