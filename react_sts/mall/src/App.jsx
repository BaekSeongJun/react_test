import "./App.css";
import Root from "./router/Root";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <RouterProvider router={Root} />
    </>
  );
}

export default App;
