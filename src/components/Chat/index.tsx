"use client";

import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Icon } from "@iconify/react";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";
import { useTheme } from "next-themes";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}

const Chat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const { theme } = useTheme();

    const socketRef = useRef<Socket | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const isOpenRef = useRef(isOpen);

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    const toggleChat = () => setIsOpen(prev => !prev);
    const openChat = () => setIsOpen(true);

    useEffect(() => {
        let storedId = sessionStorage.getItem("chat_random_id");
        if (!storedId) {
            storedId = "user_" + Math.random().toString(36).substring(2, 11);
            sessionStorage.setItem("chat_random_id", storedId);
        }
        setUserId(storedId);

        socketRef.current = io(SOCKET_SERVER_URL);

        socketRef.current.on("receive_message", (message: Message) => {
            setMessages((prev) => [...prev, message]);

            if (message.senderId !== storedId) {
                if (!isOpenRef.current) {
                    setUnreadCount((prev) => prev + 1);
                }
            }
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);
    // Removed [isOpen] to prevent reconnection loops

    // Reset unread count when chat is opened
    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
        }
    }, [isOpen]);

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (input.trim() && socketRef.current) {
            const messageData = {
                id: Date.now().toString(),
                senderId: userId,
                text: input.trim(),
            };
            socketRef.current.emit("send_message", messageData);
            setInput("");
            setShowEmojiPicker(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const onEmojiClick = (emojiData: any) => {
        setInput((prev) => prev + emojiData.emoji);
    };

    const clearChat = () => {
        setMessages([]);
        sessionStorage.removeItem("chat_random_id");
        // Generate a new one
        const newId = "user_" + Math.random().toString(36).substring(2, 11);
        sessionStorage.setItem("chat_random_id", newId);
        setUserId(newId);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer group"
            >
                {isOpen ? (
                    <Icon icon="ion:close-outline" className="text-3xl" />
                ) : (
                    <Icon icon="ion:chatbubble-ellipses-outline" className="text-3xl group-hover:rotate-12" />
                )}
                {!isOpen && (
                    <>
                        {unreadCount > 0 ? (
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-lg animate-bounce">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        ) : (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        )}
                    </>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white">
                                <Icon icon="ion:people-outline" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 dark:text-white">Global Random Chat</h3>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">Talking to everyone online</p>
                            </div>
                        </div>
                        <button
                            onClick={clearChat}
                            title="Reset Identity & Clear"
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400"
                        >
                            <Icon icon="ion:trash-outline" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                    >
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                                <div className="p-4 bg-blue-500/10 rounded-full">
                                    <Icon icon="ion:chatbubbles-outline" className="text-4xl text-blue-500" />
                                </div>
                                <p className="text-sm text-gray-500">No messages yet. Say hi to everyone!</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col ${msg.senderId === userId ? "items-end" : "items-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.senderId === userId
                                            ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-500/20"
                                            : "bg-white dark:bg-white/5 border border-white/10 rounded-tl-none shadow-sm"
                                            }`}
                                    >
                                        <p className="break-words">{msg.text}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                                        {msg.senderId === userId ? "You" : msg.senderId.substring(0, 8)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Emoji Picker Container */}
                    {showEmojiPicker && (
                        <div
                            ref={emojiPickerRef}
                            className="absolute bottom-24 right-4 z-[10001] shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200"
                        >
                            <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                theme={theme === "dark" ? EmojiTheme.DARK : EmojiTheme.LIGHT}
                                width={300}
                                height={350}
                                lazyLoadEmojis={true}
                            />
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 bg-white/5 border-t border-white/10">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2 focus-within:border-blue-500/50 transition-colors">
                            <button
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className={`p-1.5 rounded-lg transition-colors ${showEmojiPicker ? "text-blue-500 bg-blue-500/10" : "text-gray-500 hover:bg-white/10"}`}
                                title="Add emoji"
                            >
                                <Icon icon="ion:happy-outline" className="text-xl" />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent border-none outline-none text-sm p-1 ml-1 text-gray-800 dark:text-white placeholder:text-gray-500"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!input.trim()}
                                className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-all shadow-lg shadow-blue-600/30"
                            >
                                <Icon icon="ion:send" className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
