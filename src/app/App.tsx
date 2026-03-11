import { RouterProvider } from "react-router";
import { BackgroundVideo } from "./components/BackgroundVideo";
import { router } from "./routes";

export default function App() {
  return (
    <div className="app-shell">
      <BackgroundVideo />
      <div className="app-content">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
