import { createRef, useState } from "react";
import { checkWhatsapp } from "../api/api";

type Response = {
  existsWhatsapp: boolean;
};

const Chat = () => {
  const ref = createRef<HTMLInputElement>();
  const [tel, setTel] = useState<null | string>(null);
  const [isFetching, setFetching] = useState(false);
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ref.current) return;
    const value = ref.current.value;
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
        <label htmlFor="tel">
          +7 <input type="tel" name="tel" ref={ref} placeholder="9965224569" />
        </label>
        <button type="submit" disabled={isFetching}>
          Открыть чат
        </button>
      </form>
    );
  }

  return (
    <section className="chat">
      <header>+{tel}</header>
      <div className="chat__main">Chat</div>
      <input type="text" name="chat" />
    </section>
  );
};

export default Chat;
