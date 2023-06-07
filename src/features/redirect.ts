import { redirect } from "react-router-dom";

const loader = () => {
  if (!localStorage.getItem("auth")) return redirect("/");
  return null;
};

export default loader;
