import { useState } from "react";
import NotesTab from "../components/NotesTab";
import FlashcardsTab from "../components/FlashcardsTab";
import QuizTab from "../components/QuizTab";

const TABS = ["Clean Notes", "Flashcards", "Quiz"];

export default function OutputScreen({ data, onQuizComplete, onBack }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={styles.page}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <button onClick={onBack} style={styles.backBtn}>← New Notes</button>
        <span style={styles.topicBadge}>{data.topic}</span>
      </div>

      {/* Tabs */}
      <div style={styles.tabBar}>
        {TABS.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={activeTab === i ? styles.tabActive : styles.tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {activeTab === 0 && <NotesTab notes={data.cleanNotes} />}
        {activeTab === 1 && <FlashcardsTab cards={data.flashcards} />}
        {activeTab === 2 && <QuizTab questions={data.quiz} onComplete={onQuizComplete} />}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  topicBadge: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#f9a8d4",
    backgroundColor: "#1a0d12",
    border: "1px solid #3d1a28",
    padding: "4px 12px",
    borderRadius: "99px",
  },
  tabBar: {
    display: "flex",
    gap: "4px",
    backgroundColor: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "14px",
    padding: "4px",
    marginBottom: "20px",
  },
  tab: {
    flex: 1,
    padding: "8px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    color: "#666",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  tabActive: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#f9a8d4",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    color: "#0a0a0a",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};