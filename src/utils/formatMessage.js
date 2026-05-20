export const mapMessages = (messages = []) => {
  return messages.map((msg) => {
    const isAI =
      msg.direction === "outbound" ||
      msg.source === "ai";

    return {
      id: msg.id,
      text: msg.message_text,
      from: isAI ? "me" : "user",
      senderType: isAI ? "ai" : "human",
      time: new Date(msg.created_at).toLocaleTimeString(
        "id-ID",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
      isEscalation:
        msg.message_text
          ?.toLowerCase()
          .includes("escalate"),
    };
  });
};