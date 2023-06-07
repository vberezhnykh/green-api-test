import { useState } from "react";
import { getAuthStatus } from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isFetching, setFetching] = useState(false);

  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetching(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const { idInstance, apiTokenInstance } = formJson;
    const res = await getAuthStatus(idInstance, apiTokenInstance);
    console.log(res);
    if (res === 200) {
      localStorage.setItem(
        "auth",
        JSON.stringify({ idInstance, apiTokenInstance })
      );
      navigate("/chat");
    }
    setFetching(false);
  };

  return (
    <form className="login__form" onSubmit={submitForm}>
      <fieldset className="login__fieldset">
        <label htmlFor="idInstance" className="login__label">
          idInstance:{" "}
          <input
            type="text"
            name="idInstance"
            defaultValue={"1101828986"}
            className="login__input"
          />
        </label>
      </fieldset>
      <fieldset className="login__fieldset">
        <label htmlFor="apiTokenInstance" className="login__label">
          apiTokenInstance:{" "}
          <input
            type="text"
            name="apiTokenInstance"
            defaultValue={"49a5d5e376f94ed79cddebb82462c005b2a4b7e3a7c34c22b7"}
            className="login__input"
          />
        </label>
      </fieldset>
      <button type="submit" disabled={isFetching} className="login__button">
        Войти
      </button>{" "}
      <span className="login__suggestion-text">
        Нет аккаунта?{" "}
        <a href="https://console.green-api.com/auth/register" target="_blank">
          Зарегистрируйся
        </a>
      </span>
    </form>
  );
};

export default LoginForm;
