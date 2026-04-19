import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { saveSession, logOut } from "./services/firebase";
import InputScreen from "./screens/InputScreen";
import OutputScreen from "./screens/OutputScreen";
import ScoreScreen from "./screens/ScoreScreen";
import LoginScreen from "./screens/LoginScreen";
import HistoryScreen from "./screens/HistoryScreen";

function AppContent() {
  const { user } = useAuth();
  const [screen, setScreen] = useState("input");
  const [generatedData, setGeneratedData] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  // Still checking auth state
  if (user === undefined) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#555", fontSize: "14px" }}>Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) return <LoginScreen />;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#fff" }}>
      {/* Top nav bar */}
      <div style={navStyles.bar}>
        <span style={navStyles.logo}>✦ Recallify</span>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button onClick={() => setScreen("history")} style={navStyles.navBtn}>History</button>
          <button onClick={() => setScreen("input")} style={navStyles.navBtn}>New</button>
          <button onClick={logOut} style={navStyles.logoutBtn}>Sign Out</button>
        </div>
      </div>

      {screen === "input" && (
        <InputScreen
          onGenerate={(data) => {
            setGeneratedData(data);
            setScreen("output");
          }}
        />
      )}
      {screen === "output" && (
        <OutputScreen
          data={generatedData}
          onQuizComplete={async (results) => {
            setQuizResults(results);
            const correct = results.questions.filter(
              (q, i) => results.userAnswers[i] === q.correctIndex
            ).length;
            await saveSession(user.uid, generatedData.topic, generatedData, {
              correct,
              total: results.questions.length,
            });
            setScreen("score");
          }}
          onBack={() => setScreen("input")}
        />
      )}
      {screen === "score" && (
        <ScoreScreen
          results={quizResults}
          onRetry={() => setScreen("output")}
          onNew={() => {
            setGeneratedData(null);
            setQuizResults(null);
            setScreen("input");
          }}
        />
      )}
      {screen === "history" && (
        <HistoryScreen
          onOpen={(session) => {
            setGeneratedData(session);
            setScreen("output");
          }}
          onBack={() => setScreen("input")}
        />
      )}
    </div>
  );
}

const navStyles = {
  bar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid #1a1a1a",
    backgroundColor: "#0a0a0a",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#f9a8d4",
  },
  navBtn: {
    background: "none",
    border: "1px solid #2a2a2a",
    color: "#888",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  logoutBtn: {
    background: "none",
    border: "1px solid #3d1a28",
    color: "#f9a8d4",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}