import { useEffect } from "react";
import { deleteNotification, recieveNotification } from "../api/api";
import { RecieveNotificationResponse, Tel_Input_Props } from "../types";

const Tel_Input: React.FC<Tel_Input_Props> = ({
  submitForm,
  telInputRef,
  isFetching,
}) => {
  useEffect(() => {
    const clearCurrentNotifications = async () => {
      let res = (await recieveNotification()) as RecieveNotificationResponse;
      let loopCounter = 0;
      while (res !== null) {
        if (loopCounter === 50) return;
        await deleteNotification(res.receiptId);
        res = await recieveNotification();
        loopCounter++;
      }
      return;
    };
    clearCurrentNotifications();
  }, []);

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
};

export default Tel_Input;
