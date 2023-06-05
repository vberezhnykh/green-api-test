import { useState } from "react";
import { getAuthStatus } from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isValid, setValid] = useState(true);

  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValid(false);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const { idInstance, apiTokenInstance } = formJson;
    const res = await getAuthStatus(idInstance, apiTokenInstance);
    console.log(res);
    if (res === 200) {
      navigate("/");
      localStorage.setItem(
        "auth",
        JSON.stringify({ idInstance, apiTokenInstance })
      );
    }
    setValid(true);
  };

  return (
    <form className="login__form" onSubmit={submitForm}>
      <fieldset>
        <label htmlFor="idInstance">
          idInstance:
          <input type="text" name="idInstance" defaultValue={"1101827763"} />
        </label>
      </fieldset>
      <fieldset>
        <label htmlFor="apiTokenInstance">
          apiTokenInstance:
          <input
            type="text"
            name="apiTokenInstance"
            defaultValue={"50de0c1ce6cf4993b3c6d49b4f582a3f054a19c2d24f41b1b9"}
          />
        </label>
      </fieldset>
      <button type="submit" disabled={!isValid}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
