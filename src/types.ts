type MessageData = {
  typeMessage: "textMessage";
  textMessageData: {
    textMessage: string;
  };
};

type ExtendedMessageData = {
  typeMessage: "extendedTextMessage";
  extendedTextMessageData: {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
  };
};

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
  messageData: MessageData | ExtendedMessageData;
};

export type RecieveNotificationResponse = {
  receiptId: number;
  body: Body;
};

export type MessagesProps = {
  tel: string;
};

type SubmitForm = (e: React.FormEvent<HTMLFormElement>) => Promise<void>;

export type Tel_Input_Props = {
  submitForm: SubmitForm;
  telInputRef: React.RefObject<HTMLInputElement>;
  isFetching: boolean;
};

export type ChatProps = {
  tel: string;
};

export type ExistsWhatsappResponse = {
  existsWhatsapp: boolean;
};
