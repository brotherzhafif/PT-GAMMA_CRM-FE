import { useState, useEffect } from "react";
import ChatArea from "./components/chatArea";
import InboxList from "./components/inboxList";
import ProfilePanel from "./components/profilePanel";
import { Card } from "@/components/ui/card";

export default function Inbox() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showProfilePanel, setShowProfilePanel] = useState(false);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowProfilePanel(false);
  };

  const handleToggleProfile = () => {
    setShowProfilePanel((prev) => !prev);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
    setShowProfilePanel(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedChat) {
        handleCloseChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedChat]);

  return (
    <div className="flex gap-2 h-[81vh] overflow-y-hidden w-full bg-background">
      <Card className="w-[300px] flex-shrink-0 h-full flex flex-col rounded-lg overflow-hidden">
        <InboxList onSelect={handleSelectChat} selectedId={selectedChat?.id} />
      </Card>

      <Card className="flex-1 flex flex-col rounded-lg">
        <ChatArea
          chat={selectedChat}
          onToggleProfile={handleToggleProfile}
          showProfilePanel={showProfilePanel}
        />
      </Card>

      <Card
        className={`flex-shrink-0 h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300 ease-out ${
          showProfilePanel && selectedChat
            ? "w-[300px]"
            : "w-0 border-0 ring-0 shadow-none"
        }`}
      >
        <div
          className={`h-full transition-opacity duration-300 ease-out ${
            showProfilePanel && selectedChat
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {selectedChat && <ProfilePanel chat={selectedChat} />}
        </div>
      </Card>
    </div>
  );
}
