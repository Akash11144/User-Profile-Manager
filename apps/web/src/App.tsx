import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Repos from "./pages/Repos";
import { useEffect, useState } from "react";

export default function App() {
  const [view, setView] = useState<"login" | "profile" | "repos">("login");
  const [authed, setAuthed] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (authed && view === "login") setView("profile");
  }, [authed, view]);

  const handleLoggedIn = async () => {
    setAuthed(true);
    setView("profile");
    await client.resetStore();
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setAuthed(false);
    setView("login");
    await client.clearStore();
  };

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <nav>
          {!authed && <button onClick={() => setView("login")}>Login</button>}

          {authed && (
            <>
              <button onClick={() => setView("profile")}>Profile</button>
              <button onClick={() => setView("repos")}>Repos</button>
              <button
                onClick={handleLogout}
                style={{ marginLeft: "auto", background: "#ef4444" }}
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {view === "login" && <Login onLoggedIn={handleLoggedIn} />}
        {view === "profile" && authed && <Profile />}
        {view === "repos" && authed && <Repos />}
        {!authed && view !== "login" && <p>Please login to continue.</p>}
      </div>
    </ApolloProvider>
  );
}
