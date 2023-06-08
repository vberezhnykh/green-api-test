import Footer from "../components/footer";
import LoginForm from "../components/login_form";
import whatsappImgSrc from "../assets/whatsapp.png";

const Login = () => {
  return (
    <>
      <header className="header">
        <img src={whatsappImgSrc} alt="" />
        <h1>Green Api</h1>
      </header>
      <main className="main">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
};

export default Login;
