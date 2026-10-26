import App from "./App";
import UserForm from "./components/UserForm";
import Files from "./components/Files";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <UserForm isLogin />,
      },
      {
        path: "register",
        element: <UserForm />,
      },
      {
        path: "files",
        element: <Files />,
      },
    ],
  },
];

export default routes;
