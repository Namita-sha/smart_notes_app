import { useState } from "react";
import { processNotes } from "../services/gemini";

export default function InputScreen({ onGenerate }) {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleProcess() {
    if (!topic.trim()) return setError("Please enter a topic name.");
    if (notes.trim().length < 30)
      return setError("Please paste at least some notes (30+ characters).");
    setError("");
    setLoading(true);
    try {
      const data = await processNotes(notes, topic);
      onGenerate({ ...data, topic });
    } catch (e) {
      setError("Something went wrong: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>✦ Recallify</div>
        <p style={styles.tagline}>
          Paste your messy notes. Get clean notes, flashcards & a quiz.
        </p>
      </div>

      {/* Card */}
      <div style={styles.card}>
        {/* Topic */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Topic</label>
          <input
            type="text"
            placeholder="e.g. Photosynthesis, World War 2, React Hooks..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={styles.input}
            onFocus={(e) => (e.target.style.borderColor = "#f9a8d4")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
          />
        </div>

        {/* Notes */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Your Raw Notes</label>
          <textarea
            placeholder="Paste anything here — lecture notes, textbook paragraphs, bullet points, even messy random sentences..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={10}
            style={{ ...styles.input, resize: "none" }}
            onFocus={(e) => (e.target.style.borderColor = "#f9a8d4")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
          />
          <p style={styles.charCount}>{notes.length} characters</p>
        </div>

        {/* Error */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Button */}
        <button
          onClick={handleProcess}
          disabled={loading}
          style={loading ? styles.btnDisabled : styles.btn}
        >
          {loading ? "⏳ Processing your notes..." : "✦ Process Notes"}
        </button>
      </div>

      <p style={styles.footer}>Powered by Gemini 1.5 Flash · Free API</p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
  },
  header: {
    textAlign: "center",
    marginBottom: "36px",
  },
  logo: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#f9a8d4",
    letterSpacing: "-0.5px",
    marginBottom: "8px",
  },
  tagline: {
    fontSize: "14px",
    color: "#888",
  },
  card: {
    width: "100%",
    maxWidth: "540px",
    backgroundColor: "#111111",
    border: "1px solid #1e1e1e",
    borderRadius: "20px",
    padding: "28px",
  },
  fieldGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: "600",
    color: "#f9a8d4",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    backgroundColor: "#0a0a0a",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#fff",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  charCount: {
    fontSize: "11px",
    color: "#444",
    marginTop: "4px",
  },
  error: {
    backgroundColor: "#1a0a0a",
    border: "1px solid #5a1a1a",
    color: "#f87171",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  btn: {
    width: "100%",
    backgroundColor: "#f9a8d4",
    color: "#0a0a0a",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "opacity 0.2s",
    fontFamily: "inherit",
  },
  btnDisabled: {
    width: "100%",
    backgroundColor: "#2a1a22",
    color: "#a06080",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "not-allowed",
    fontFamily: "inherit",
  },
  footer: {
    marginTop: "24px",
    fontSize: "11px",
    color: "#333",
  },
};