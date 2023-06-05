import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <>Main</>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
