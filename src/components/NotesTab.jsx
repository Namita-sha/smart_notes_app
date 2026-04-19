export default function NotesTab({ notes }) {
  return (
    <div style={{ paddingBottom: "32px" }}>
      {/* Summary */}
      <div style={styles.summaryBox}>
        <p style={styles.sectionLabel}>Overview</p>
        <p style={styles.summaryText}>{notes.summary}</p>
      </div>

      {/* Sections */}
      {notes.sections.map((section, i) => (
        <div key={i} style={styles.card}>
          <h3 style={styles.heading}>{section.heading}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {section.points.map((point, j) => (
              <li key={j} style={styles.point}>
                <span style={styles.dot} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Key Terms */}
      <p style={{ ...styles.sectionLabel, marginBottom: "12px", marginTop: "8px" }}>
        Key Terms
      </p>
      {notes.keyTerms.map((item, i) => (
        <div key={i} style={styles.termRow}>
          <span style={styles.term}>{item.term}</span>
          <span style={styles.def}>— {item.definition}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  summaryBox: {
    backgroundColor: "#1a0d12",
    border: "1px solid #3d1a28",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "16px",
  },
  sectionLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#f9a8d4",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "8px",
  },
  summaryText: {
    fontSize: "14px",
    color: "#ccc",
    lineHeight: "1.6",
  },
  card: {
    backgroundColor: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "12px",
  },
  heading: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "10px",
  },
  point: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontSize: "13px",
    color: "#999",
    marginBottom: "6px",
    lineHeight: "1.5",
  },
  dot: {
    marginTop: "7px",
    height: "6px",
    width: "6px",
    borderRadius: "50%",
    backgroundColor: "#f9a8d4",
    flexShrink: 0,
  },
  termRow: {
    backgroundColor: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "10px",
    padding: "10px 14px",
    display: "flex",
    gap: "10px",
    marginBottom: "8px",
    flexWrap: "wrap",
  },
  term: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#f9a8d4",
    flexShrink: 0,
  },
  def: {
    fontSize: "13px",
    color: "#888",
  },
};