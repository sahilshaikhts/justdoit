import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import { UserAuthProvider } from "./Context/AuthorizationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </React.StrictMode>
);
