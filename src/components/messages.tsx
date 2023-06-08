import { useEffect, useState } from "react";
import { deleteNotification, recieveNotification } from "../api/api";
import { v4 as uuidv4 } from "uuid";
import { RecieveNotificationResponse, MessagesProps } from "../types";

const Messages: React.FC<MessagesProps> = ({ tel }) => {
  const [messages, setMessages] = useState<RecieveNotificationResponse[]>([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res =
        (await recieveNotification()) as RecieveNotificationResponse | null;
      if (res == null) return;
      if (`${tel}@c.us` === res.body.senderData.chatId) {
        setMessages((current) => {
          return current.some((message) => message.receiptId === res.receiptId)
            ? current
            : [...current, res];
        });
      }
      deleteNotification(res.receiptId);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const items = [...messages];

  return (
    <>
      {items.length === 0 ? (
        "Nothing has been sent yet"
      ) : (
        <ul className="messages-list">
          {...items.map((message) => (
            <li
              key={uuidv4()}
              className={`message ${
                message.body.typeWebhook === "incomingMessageReceived"
                  ? "left"
                  : "right"
              }`}
            >
              {message.body.messageData.typeMessage === "textMessage"
                ? message.body.messageData.textMessageData.textMessage
                : message.body.messageData.extendedTextMessageData.text}{" "}
              <span className="message__time">{`${new Date(
                message.body.timestamp * 1000
              ).getHours()}:${new Date(
                message.body.timestamp * 1000
              ).getMinutes()}`}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Messages;
