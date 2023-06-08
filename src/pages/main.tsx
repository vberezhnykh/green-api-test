import Chat from "../components/chat";
import { createRef, useState } from "react";
import { checkWhatsapp } from "../api/api";
import Tel_Input from "../components/tel_input";

type Response = {
  existsWhatsapp: boolean;
};

const Main = () => {
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

  return (
    <>
      <main className="main">
        {tel == null ? (
          <Tel_Input
            submitForm={submitForm}
            telInputRef={telInputRef}
            isFetching={isFetching}
          />
        ) : (
          <Chat tel={tel} />
        )}
      </main>
      <footer>Template Footer</footer>
    </>
  );
};

export default Main;
