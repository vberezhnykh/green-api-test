import { createRef, useState } from "react";
import { checkWhatsapp, sendMessage } from "../api/api";
import Messages from "./messages";

type Response = {
  existsWhatsapp: boolean;
};

const Chat = () => {
  const telInputRef = createRef<HTMLInputElement>();
  const [tel, setTel] = useState<null | string>(null);
  const [isFetching, setFetching] = useState(false);
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!telInputRef.current) return;
    const value = telInputRef.current.value;
    setFetching(true);
    const res = (await checkWhatsapp(value)) as Response;
    setFetching(false);
    if (!res.existsWhatsapp) return;
    if (value.length === 10) {
      setTel(`7${value}`);
    } else {
      setTel(`7${value.slice(1)}`);
    }
  };

  if (tel == null) {
    return (
      <form onSubmit={submitForm}>
        <h2>Введите номер телефона получателя:</h2>
        <label htmlFor="tel" className="tel__label">
          +7{" "}
          <input
            type="tel"
            name="tel"
            ref={telInputRef}
            placeholder="9936124569"
            defaultValue={"9936124569"}
            className="tel__input"
          />
        </label>
        <button type="submit" disabled={isFetching} className="tel__button">
          Открыть чат
        </button>
      </form>
    );
  }

  const chatInputRef = createRef<HTMLInputElement>();

  const handleClick = async () => {
    if (!chatInputRef.current) return;
    const message = chatInputRef.current.value;
    await sendMessage(tel, message);
    chatInputRef.current.value = "";
  };

  return (
    <section className="chat">
      <header className="chat__header">
        <div>Profile photo</div>
        <div>+{tel}</div>
      </header>
      <div className="chat__main">
        <Messages />
      </div>
      <div className="chat__input-container">
        <input name="chat" className="chat__input" ref={chatInputRef} />
        <button onClick={handleClick}>Send</button>
      </div>
    </section>
  );
};

export default Chat;
