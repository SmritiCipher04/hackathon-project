import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppStore } from "@/stores/appStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Send,
    Search,
    MessageCircle,
    MoreVertical,
    ChevronLeft
} from "lucide-react";

const DEMO_CHATS = [
    { id: 1, name: "Sangma Organic Farm", lastMsg: "Is the ginger still available?", time: "10:30 AM", unread: 2 },
    { id: 2, name: "Robert Mizo", lastMsg: "Okay, I will pick it up tomorrow.", time: "9:15 AM", unread: 0 },
    { id: 3, name: "Anita Khasi Produce", lastMsg: "The price is competitive.", time: "Yesterday", unread: 0 },
];

export default function MessagesPage() {
    const { t } = useTranslation();
    const { currentUser } = useAppStore();
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");

    return (
        <div className="pt-20 h-screen bg-background border-t border-border flex overflow-hidden">
            {/* Sidebar */}
            <div className={`w-full md:w-80 lg:w-96 border-r border-border flex flex-col bg-card/50 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-border space-y-4">
                    <h1 className="text-2xl font-display font-bold px-2">Messages</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-10 h-10 rounded-xl bg-background" placeholder="Search chats..." />
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-1">
                        {DEMO_CHATS.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${selectedChat?.id === chat.id ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-muted'}`}
                            >
                                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                    <AvatarFallback className={selectedChat?.id === chat.id ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}>
                                        {chat.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 text-left min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <p className="font-bold truncate">{chat.name}</p>
                                        <span className={`text-[10px] ${selectedChat?.id === chat.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{chat.time}</span>
                                    </div>
                                    <p className={`text-sm truncate ${selectedChat?.id === chat.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                                        {chat.lastMsg}
                                    </p>
                                </div>
                                {chat.unread > 0 && selectedChat?.id !== chat.id && (
                                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                                        {chat.unread}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Chat Windows */}
            <div className={`flex-1 flex flex-col bg-background ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
                {selectedChat ? (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-border flex items-center justify-between bg-card/50">
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedChat(null)}>
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {selectedChat.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="font-bold leading-none">{selectedChat.name}</h2>
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Online</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Content placeholder */}
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                                <MessageCircle className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">Conversation with {selectedChat.name}</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                                    Communication is key to a fair marketplace. Chat safely and respect the guidelines.
                                </p>
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-card/30">
                            <div className="max-w-4xl mx-auto flex gap-3">
                                <Input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="h-12 rounded-xl bg-background shadow-inner border-none"
                                    onKeyPress={(e) => e.key === 'Enter' && setMessage("")}
                                />
                                <Button
                                    onClick={() => setMessage("")}
                                    disabled={!message}
                                    className="h-12 w-12 rounded-xl p-0 shadow-lg shadow-primary/20"
                                >
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center p-8">
                        <div className="w-24 h-24 rounded-[2rem] bg-muted/50 flex items-center justify-center text-muted-foreground animate-pulse">
                            <MessageCircle className="w-12 h-12" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-display font-bold">Select a conversation</h2>
                            <p className="text-muted-foreground max-w-sm">
                                Pick a buyer or farmer from the list on the left to start negotiating or discussing produce details.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
