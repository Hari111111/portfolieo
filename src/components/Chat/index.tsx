"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Icon } from "@iconify/react";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SOCKET_SERVER_URL =
    process.env.NEXT_PUBLIC_SOCKET_URL || "https://portfolio-socket-server-rv84.onrender.com";

type ChatMode = "group" | "private" | null;

interface FileData {
    name: string;
    type: "image" | "pdf";
    data: string; // Base64 string
}

interface Message {
    id: string;
    roomId: string;
    senderId: string;
    text: string;
    timestamp: string;
    mode: Exclude<ChatMode, null>;
    file?: FileData;
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

const Chat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [chatMode, setChatMode] = useState<ChatMode>(null);
    const [roomKeyInput, setRoomKeyInput] = useState("");
    const [activeRoomId, setActiveRoomId] = useState("");
    const [privateParticipantCount, setPrivateParticipantCount] = useState(0);
    const [groupParticipantCount, setGroupParticipantCount] = useState(0);
    const [statusMessage, setStatusMessage] = useState(
        "Choose group chat or private chat."
    );
    const [isJoiningRoom, setIsJoiningRoom] = useState(false);
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);
    const [isJoiningGroup, setIsJoiningGroup] = useState(false);
    const [activeUserList, setActiveUserList] = useState<string[]>([]);
    const { theme } = useTheme();
    const pathname = usePathname();

    const socketRef = useRef<Socket | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const isOpenRef = useRef(isOpen);
    const chatModeRef = useRef<ChatMode>(chatMode);

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    useEffect(() => {
        chatModeRef.current = chatMode;
    }, [chatMode]);

    useEffect(() => {
        let storedId = sessionStorage.getItem("chat_random_id");
        if (!storedId) {
            storedId = "user_" + Math.random().toString(36).substring(2, 11);
            sessionStorage.setItem("chat_random_id", storedId);
        }
        setUserId(storedId);

        const socket = io(SOCKET_SERVER_URL, {
            query: { userId: storedId }
        });
        socketRef.current = socket;

        socket.on("receive-message", (message: Message) => {
            if (message.mode !== chatModeRef.current) {
                return;
            }

            setMessages((prev) => [...prev, message]);

            if (message.senderId !== storedId && !isOpenRef.current) {
                setUnreadCount((prev) => prev + 1);
            }
        });

        socket.on("room-status", (room: RoomStatus) => {
            if (chatModeRef.current !== "private") {
                return;
            }

            setActiveRoomId(room.roomId);
            setPrivateParticipantCount(room.participantCount);
            setStatusMessage(
                room.participantCount < 2
                    ? "Waiting for another user to join."
                    : "Private room is full. You can chat now."
            );
        });

        socket.on("group-status", ({ participantCount }: GroupStatus) => {
            if (chatModeRef.current !== "group") {
                return;
            }

            setGroupParticipantCount(participantCount);
            setStatusMessage("You are in group chat.");
        });

        socket.on("chat-error", ({ message }: { message: string }) => {
            setStatusMessage(message);
        });

        socket.on("update-user-list", (userList: string[]) => {
            setActiveUserList(userList);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
        }
    }, [isOpen]);

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

    const clearMessagesForMode = () => {
        setMessages([]);
        setInput("");
        setShowEmojiPicker(false);
    };

    const switchToPrivate = () => {
        if (!socketRef.current) {
            return;
        }

        const applyPrivateMode = () => {
            clearMessagesForMode();
            setChatMode("private");
            setActiveRoomId("");
            setPrivateParticipantCount(0);
            setRoomKeyInput("");
            setGroupParticipantCount(0);
            setStatusMessage("Create a room or join with a private key.");
        };

        if (chatMode === "group") {
            socketRef.current.emit("leave-group", () => {
                applyPrivateMode();
            });
            return;
        }

        if (chatMode === "private" && activeRoomId) {
            socketRef.current.emit("leave-room", () => {
                applyPrivateMode();
            });
            return;
        }

        applyPrivateMode();
    };

    const switchToGroup = () => {
        if (!socketRef.current || isJoiningGroup) {
            return;
        }

        setIsJoiningGroup(true);
        socketRef.current.emit("join-group", (response: RoomResponse) => {
            setIsJoiningGroup(false);

            if (!response.success) {
                setStatusMessage(response.message || "Unable to join group chat.");
                return;
            }

            clearMessagesForMode();
            setChatMode("group");
            setActiveRoomId("");
            setPrivateParticipantCount(0);
            setRoomKeyInput("");
            setGroupParticipantCount(response.participantCount || 0);
            setStatusMessage("You are now in group chat.");
        });
    };

    const handleCreateRoom = () => {
        if (!socketRef.current || isCreatingRoom) {
            return;
        }

        setIsCreatingRoom(true);
        socketRef.current.emit("create-room", (response: RoomResponse) => {
            setIsCreatingRoom(false);

            if (!response.success || !response.roomId) {
                setStatusMessage(response.message || "Unable to create a room.");
                return;
            }

            clearMessagesForMode();
            setChatMode("private");
            setActiveRoomId(response.roomId);
            setRoomKeyInput(response.roomId);
            setPrivateParticipantCount(response.participantCount || 1);
            setGroupParticipantCount(0);
            setStatusMessage("Private room created. Share this key with one other user.");
        });
    };

    const handleJoinRoom = () => {
        if (!socketRef.current || isJoiningRoom) {
            return;
        }

        const normalizedRoomKey = roomKeyInput.trim().toUpperCase();
        if (!normalizedRoomKey) {
            setStatusMessage("Enter a room key to join.");
            return;
        }

        setIsJoiningRoom(true);
        socketRef.current.emit(
            "join-room",
            { roomId: normalizedRoomKey },
            (response: RoomResponse) => {
                setIsJoiningRoom(false);

                if (!response.success || !response.roomId) {
                    setStatusMessage(response.message || "Unable to join the room.");
                    return;
                }

                clearMessagesForMode();
                setChatMode("private");
                setActiveRoomId(response.roomId);
                setRoomKeyInput(response.roomId);
                setPrivateParticipantCount(response.participantCount || 0);
                setGroupParticipantCount(0);
                setStatusMessage(
                    response.participantCount === 2
                        ? "Joined private room. You can chat now."
                        : "Joined private room. Waiting for another user."
                );
            }
        );
    };

    const handleSendMessage = () => {
        if (!input.trim() || !socketRef.current || !chatMode) {
            if (!chatMode) {
                setStatusMessage("Choose group chat or private chat before sending messages.");
            }
            return;
        }

        if (chatMode === "private" && !activeRoomId) {
            setStatusMessage("Create or join a private room before sending messages.");
            return;
        }

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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !socketRef.current || !chatMode) return;

        if (chatMode === "private" && !activeRoomId) {
            setStatusMessage("Connect to a private room first.");
            return;
        }

        const isImage = file.type.startsWith("image/");
        const isPDF = file.type === "application/pdf";

        if (!isImage && !isPDF) {
            setStatusMessage("Only images and PDFs are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setStatusMessage("File size must be under 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Data = event.target?.result as string;
            const messageData: Message = {
                id: Date.now().toString(),
                mode: chatMode,
                roomId: chatMode === "private" ? activeRoomId : "",
                senderId: userId,
                text: isImage ? "Shared an image" : "Shared a PDF",
                timestamp: new Date().toISOString(),
                file: {
                    name: file.name,
                    type: isImage ? "image" : "pdf",
                    data: base64Data,
                },
            };

            socketRef.current?.emit("send-message", messageData);
        };
        reader.readAsDataURL(file);

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const onEmojiClick = (emojiData: { emoji: string }) => {
        setInput((prev) => prev + emojiData.emoji);
    };

    const resetChatState = (nextStatus = "Choose group chat or private chat.") => {
        setChatMode(null);
        setMessages([]);
        setInput("");
        setShowEmojiPicker(false);
        setActiveRoomId("");
        setRoomKeyInput("");
        setPrivateParticipantCount(0);
        setGroupParticipantCount(0);
        setStatusMessage(nextStatus);
    };

    const leaveCurrentMode = () => {
        if (!socketRef.current) {
            resetChatState();
            return;
        }

        if (chatMode === "private") {
            socketRef.current.emit("leave-room", () => {
                resetChatState("Private room closed. Switch to group or join another private room.");
            });
            return;
        }

        if (chatMode === "group") {
            socketRef.current.emit("leave-group", () => {
                resetChatState("Group chat closed on this device. Rejoin anytime.");
            });
            return;
        }

        resetChatState();
    };

    const isPrivateMode = chatMode === "private";
    const isGroupMode = chatMode === "group";
    const canSend = Boolean(input.trim()) && (isGroupMode || Boolean(activeRoomId));

    if (pathname === "/chat") return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-2xl transition-all duration-300 hover:scale-110"
            >
                {isOpen ? (
                    <Icon icon="ion:close-outline" className="text-3xl" />
                ) : (
                    <Icon
                        icon="ion:chatbubble-ellipses-outline"
                        className="text-3xl group-hover:rotate-12"
                    />
                )}
                {!isOpen && unreadCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-600 text-[10px] font-bold text-white shadow-lg">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute bottom-20 right-0 flex h-[600px] w-80 flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300 dark:border-white/10 dark:bg-black/40 md:w-96">
                    <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 font-bold text-white">
                                <Icon icon={isGroupMode ? "ion:people-outline" : "ion:lock-closed-outline"} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                                    {isGroupMode ? "Group Chat" : isPrivateMode ? "Private Chat" : "Chat"}
                                </h3>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                    Group and private stay separate
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Link
                                href="/chat"
                                onClick={() => setIsOpen(false)}
                                title="Open full chat page"
                                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10"
                            >
                                <Icon icon="ion:expand-outline" />
                            </Link>
                            <button
                                onClick={leaveCurrentMode}
                                title="Clear current chat mode"
                                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10"
                            >
                                <Icon icon="ion:trash-outline" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3 border-b border-white/10 bg-white/5 p-4">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={switchToGroup}
                                disabled={isJoiningGroup}
                                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${isGroupMode
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "bg-white/10 text-gray-800 hover:bg-white/20 dark:text-white"
                                    }`}
                            >
                                {isJoiningGroup ? "Opening..." : "Group Chat"}
                            </button>
                            <button
                                onClick={switchToPrivate}
                                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${isPrivateMode
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "bg-white/10 text-gray-800 hover:bg-white/20 dark:text-white"
                                    }`}
                            >
                                Private Chat
                            </button>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                                        {isGroupMode ? "Mode" : "Room Key"}
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-gray-800 dark:text-white">
                                        {isGroupMode ? "Global Group" : activeRoomId || "Not connected"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[11px] text-gray-500">
                                        {isGroupMode ? "Online" : "Participants"}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        {isGroupMode ? groupParticipantCount : privateParticipantCount}
                                        {isGroupMode ? "" : "/2"}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{statusMessage}</p>
                        </div>

                        {isPrivateMode && (
                            <>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={roomKeyInput}
                                        onChange={(e) => setRoomKeyInput(e.target.value.toUpperCase())}
                                        placeholder="Enter room key"
                                        className="flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm uppercase tracking-[0.2em] text-gray-800 outline-none transition-colors placeholder:text-gray-500 focus:border-blue-500/50 dark:text-white"
                                    />
                                    <button
                                        onClick={handleJoinRoom}
                                        disabled={isJoiningRoom}
                                        className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60 dark:text-white"
                                    >
                                        {isJoiningRoom ? "Joining" : "Join"}
                                    </button>
                                </div>

                                <button
                                    onClick={handleCreateRoom}
                                    disabled={isCreatingRoom}
                                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isCreatingRoom ? "Creating Room..." : "Generate Private Room Key"}
                                </button>
                            </>
                        )}

                        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Active Protocol Users</p>
                            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto no-scrollbar">
                                {activeUserList.map((id) => (
                                    <span
                                        key={id}
                                        className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${id === userId
                                                ? "bg-blue-600/20 border-blue-500/50 text-blue-500 font-bold"
                                                : "bg-white/5 border-white/10 text-gray-400"
                                            }`}
                                    >
                                        {id === userId ? "YOU" : id}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex-1 space-y-4 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10"
                    >
                        {messages.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center">
                                <div className="rounded-full bg-blue-500/10 p-4">
                                    <Icon
                                        icon={isGroupMode ? "ion:people-outline" : "ion:chatbubbles-outline"}
                                        className="text-4xl text-blue-500"
                                    />
                                </div>
                                <p className="text-sm text-gray-500">
                                    {isGroupMode
                                        ? "Group chat is live for users who selected group mode."
                                        : isPrivateMode
                                            ? "Private messages stay in the active room only."
                                            : "Select a mode to start chatting."}
                                </p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.senderId === userId ? "items-end" : "items-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.senderId === userId
                                            ? "rounded-tr-none bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                            : "rounded-tl-none border border-white/10 bg-white shadow-sm dark:bg-white/5"
                                            }`}
                                    >
                                        {msg.file ? (
                                            <div className="space-y-2">
                                                {msg.file.type === "image" ? (
                                                    <img
                                                        src={msg.file.data}
                                                        alt={msg.file.name}
                                                        className="max-h-60 w-full rounded-lg object-contain shadow-sm"
                                                    />
                                                ) : (
                                                    <a
                                                        href={msg.file.data}
                                                        download={msg.file.name}
                                                        className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${msg.senderId === userId
                                                            ? "border-white/20 bg-white/10 hover:bg-white/20"
                                                            : "border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                                                            }`}
                                                    >
                                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                                                            <Icon icon="ion:document-text-outline" className="text-xl" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-xs font-bold">{msg.file.name}</p>
                                                            <p className="text-[10px] opacity-60 uppercase">PDF Document</p>
                                                        </div>
                                                        <Icon icon="ion:download-outline" className="flex-shrink-0 text-lg opacity-60" />
                                                    </a>
                                                )}
                                                {msg.text && msg.text !== "Shared an image" && msg.text !== "Shared a PDF" && (
                                                    <p className="break-words mt-2 border-t border-white/10 pt-2">{msg.text}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="break-words">{msg.text}</p>
                                        )}
                                    </div>
                                    <span className="mt-1 px-1 text-[10px] text-gray-400">
                                        {msg.senderId === userId ? "You" : msg.senderId.substring(0, 8)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    {showEmojiPicker && (
                        <div
                            ref={emojiPickerRef}
                            className="absolute bottom-24 right-4 z-[10001] shadow-2xl animate-in slide-in-from-bottom-2 duration-200"
                        >
                            <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                theme={theme === "dark" ? EmojiTheme.DARK : EmojiTheme.LIGHT}
                                width={300}
                                height={350}
                                lazyLoadEmojis
                            />
                        </div>
                    )}

                    <div className="border-t border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 transition-colors focus-within:border-blue-500/50">
                            <button
                                onClick={() => setShowEmojiPicker((prev) => !prev)}
                                className={`rounded-lg p-1.5 transition-colors ${showEmojiPicker
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "text-gray-500 hover:bg-white/10"
                                    }`}
                                title="Add emoji"
                                disabled={!chatMode}
                            >
                                <Icon icon="ion:happy-outline" className="text-xl" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*,application/pdf"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={!chatMode}
                                title="Share image or PDF"
                                className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Icon icon="ion:attach-outline" className="text-xl" />
                            </button>
                            <input
                                type="text"
                                // ... remainder of input fields
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder={
                                    isGroupMode
                                        ? "Type in group chat..."
                                        : isPrivateMode
                                            ? "Type in private chat..."
                                            : "Choose a chat mode"
                                }
                                disabled={!chatMode}
                                className="ml-1 flex-1 border-none bg-transparent p-1 text-sm text-gray-800 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed dark:text-white"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!canSend}
                                className="rounded-lg bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
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
