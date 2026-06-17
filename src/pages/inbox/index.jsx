import { useCallback, useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ChatArea from "./components/chatArea";
import InboxList from "./components/inboxList";
import ProfilePanel from "./components/profilePanel";
import { Card } from "@/components/ui/card";
import { getPatientByPhoneNumber } from "@/services/patients.service";

const unwrapResponse = (response) => response?.data || response;

const buildChatFromPhoneLookup = (phoneNumber, patient) => ({
  id: patient?.phone_number || patient?.telepon || phoneNumber,
  name: patient?.name || patient?.namaLengkap || patient?.phone_number || phoneNumber,
  phone: patient?.phone_number || patient?.telepon || phoneNumber,
  patientId: patient?.rme_patient_id || patient?.rmePatientId || patient?.id,
  last: "",
  time: "",
  status: "ai-handled",
  unread: 0,
  channel: "whatsapp",
});

export default function Inbox() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedChat, setSelectedChat] = useState(null);
  const [targetChat, setTargetChat] = useState(null);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const targetPhone = location.state?.phone || searchParams.get("phone");
  const initialSearch = searchParams.get("search") || "";
  const activeChat = selectedChat || targetChat;

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowProfilePanel(false);

    if (targetPhone) {
      setSearchParams({});
      window.history.replaceState({}, "", "/inbox");
    }
  };

  const handleToggleProfile = () => {
    setShowProfilePanel((prev) => !prev);
  };

  const handleCloseChat = useCallback(() => {
    setSelectedChat(null);
    setTargetChat(null);
    setShowProfilePanel(false);

    if (targetPhone) {
      setSearchParams({});
      window.history.replaceState({}, "", "/inbox");
    }
  }, [setSearchParams, targetPhone]);

  useEffect(() => {
    if (!targetPhone) return;

    let isActive = true;

    const resolveChat = async () => {
      try {
        const response = await getPatientByPhoneNumber(targetPhone);
        const patient = unwrapResponse(response);

        if (isActive) {
          setSelectedChat(null);
          setTargetChat(buildChatFromPhoneLookup(targetPhone, patient));
          setShowProfilePanel(false);
        }
      } catch (error) {
        console.error("Failed to resolve patient chat:", error);

        if (isActive) {
          setSelectedChat(null);
          setTargetChat(buildChatFromPhoneLookup(targetPhone, null));
          setShowProfilePanel(false);
        }
      }
    };

    resolveChat();

    return () => {
      isActive = false;
    };
  }, [targetPhone]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeChat) {
        handleCloseChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChat, handleCloseChat]);

  return (
    <div className="flex gap-2 h-[81vh] overflow-y-hidden w-full bg-background">
      <Card className="w-[300px] flex-shrink-0 h-full flex flex-col rounded-lg overflow-hidden">
        <InboxList
          initialSearch={initialSearch}
          onSelect={handleSelectChat}
          selectedId={activeChat?.id}
        />
      </Card>

      <Card className="flex-1 flex flex-col rounded-lg">
        <ChatArea
          chat={activeChat}
          onToggleProfile={handleToggleProfile}
          showProfilePanel={showProfilePanel}
        />
      </Card>

      <Card
        className={`flex-shrink-0 h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300 ease-out ${
          showProfilePanel && activeChat
            ? "w-[300px]"
            : "w-0 border-0 ring-0 shadow-none"
        }`}
      >
        <div
          className={`h-full transition-opacity duration-300 ease-out ${
            showProfilePanel && activeChat
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {activeChat && <ProfilePanel chat={activeChat} />}
        </div>
      </Card>
    </div>
  );
}
