import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./RouteLayout";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from 'sonner';


const router = Router();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster expand visibleToasts={9} position="top-center"  />
    </Provider>
  </StrictMode>
);
