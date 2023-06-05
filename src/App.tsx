import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";
import loader from "./features/redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
