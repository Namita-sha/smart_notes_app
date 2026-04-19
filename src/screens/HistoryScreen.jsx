import { useEffect, useState } from "react";
import { getUserSessions } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

export default function HistoryScreen({ onOpen, onBack }) {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserSessions(user.uid).then((data) => {
      setSessions(data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <span style={styles.title}>My Study History</span>
      </div>

      {loading && <p style={styles.empty}>Loading...</p>}
      {!loading && sessions.length === 0 && (
        <p style={styles.empty}>No sessions yet. Process some notes first!</p>
      )}

      {sessions.map((s) => (
        <div key={s.id} style={styles.card} onClick={() => onOpen(s)}>
          <div style={styles.topic}>{s.topic}</div>
          <div style={styles.meta}>
            {s.flashcards?.length ?? 0} flashcards · Quiz: {s.quizScore?.correct ?? "—"}/{s.quizScore?.total ?? "—"}
          </div>
          <div style={styles.date}>
            {s.createdAt?.toDate
              ? s.createdAt.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
              : ""}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    padding: "24px 16px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  title: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#f9a8d4",
  },
  empty: {
    color: "#555",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "60px",
  },
  card: {
    backgroundColor: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  topic: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "6px",
  },
  meta: {
    fontSize: "12px",
    color: "#f9a8d4",
    marginBottom: "4px",
  },
  date: {
    fontSize: "11px",
    color: "#444",
  },
};