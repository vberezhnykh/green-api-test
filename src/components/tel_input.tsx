type SubmitForm = (e: React.FormEvent<HTMLFormElement>) => Promise<void>;

type Tel_Input_Props = {
  submitForm: SubmitForm;
  telInputRef: React.RefObject<HTMLInputElement>;
  isFetching: boolean;
};

const Tel_Input: React.FC<Tel_Input_Props> = ({
  submitForm,
  telInputRef,
  isFetching,
}) => {
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
