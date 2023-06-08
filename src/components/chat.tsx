import { createRef } from "react";
import { sendMessage } from "../api/api";
import Messages from "./messages";
import { ChatProps } from "../types";

const Chat: React.FC<ChatProps> = ({ tel }) => {
  const chatInputRef = createRef<HTMLInputElement>();

  const handleClick = async () => {
    if (!chatInputRef.current) return;
    const message = chatInputRef.current.value;
    await sendMessage(tel, message);
    chatInputRef.current.value = "";
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    handleClick();
  };

  return (
    <section className="chat">
      <header className="chat__header">
        <div>Profile photo</div>
        <div>+{tel}</div>
      </header>
      <div className="chat__main">
        <Messages tel={tel} />
      </div>
      <div className="chat__input-container">
        <input
          name="chat"
          className="chat__input"
          ref={chatInputRef}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleClick} className="chat__send-button">
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Chat;
