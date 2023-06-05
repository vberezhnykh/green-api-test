import { useEffect, useState } from "react";
import { deleteNotification, recieveNotification } from "../api/api";

type Body = {
  typeWebhook:
    | "incomingMessageReceived"
    | "outgoingMessageReceived"
    | "outgoingAPIMessageReceived";
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
    sender: string;
    chatName: string;
    senderName: string;
  };
  messageData: {
    typeMessage: string;
    extendedTextMessageData: {
      text: string;
      description: string;
      title: string;
      previewType: string;
      jpegThumbnail: string;
    };
  };
};

type Response = {
  receiptId: number;
  body: Body;
};

const Messages = () => {
  const [receiptId, setReceiptId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Response[]>([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = (await recieveNotification()) as Response | null;
      console.log(res);
      if (res == null) setReceiptId(null);
      else {
        setReceiptId((prevState) => {
          if (prevState !== res.receiptId) {
            setMessages((current) => [...current, res]);
            deleteNotification(res.receiptId);
          }
          return res.receiptId;
        });
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  /* const handleRecieveClick = async () => {
    const res = (await recieveNotification()) as Response | null;
    console.log(res);
    if (res == null) setReceiptId(res);
    else setReceiptId(res.receiptId);
  };

  const handleDeleteClick = async () => {
    if (!receiptId) return;
    const res = await deleteNotification(receiptId);
    console.log(res);
  }; */

  return (
    <div>
      {/* <button onClick={handleRecieveClick}>Recieve</button>
      <button onClick={handleDeleteClick}>Delete</button> */}
      <div>{receiptId}</div>
    </div>
  );
};

export default Messages;
