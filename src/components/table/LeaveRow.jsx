import PropTypes from "prop-types";

function LeaveRow({ id, employee, role, avatar, type, duration, status, onApprove, onReject }) {
  return (
    <tr className="leave-row">
      <td>
        <img
          src={avatar}
          alt={employee}
          style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
          loading="lazy"
        />
      </td>
      <td style={{ fontWeight: 600 }}>{employee}</td>
      <td style={{ color: "var(--muted)" }}>{role}</td>
      <td>{type}</td>
      <td>{duration}</td>
      <td>
        <span className={`status-badge status-badge--${status}`}>
          {status}
        </span>
      </td>
      <td className="leave-row__actions">
        {status === "pending" ? (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => onApprove(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 14px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(16,185,129,0.35)",
                transition: "opacity 0.18s, transform 0.18s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              ✓ Approve
            </button>

            <button
              type="button"
              onClick={() => onReject(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 14px",
                background: "transparent",
                color: "var(--muted)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.18s, color 0.18s, border-color 0.18s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(239,68,68,0.1)";
                e.currentTarget.style.color = "#ef4444";
                e.currentTarget.style.borderColor = "#ef4444";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              ✕ Reject
            </button>
          </div>
        ) : (
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 600,
            background: status === "approved" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)",
            color: status === "approved" ? "#10b981" : "#ef4444",
          }}>
            {status === "approved" ? "✓" : "✕"} {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
      </td>
    </tr>
  );
}

LeaveRow.propTypes = {
  id:        PropTypes.number.isRequired,
  employee:  PropTypes.string.isRequired,
  role:      PropTypes.string.isRequired,
  avatar:    PropTypes.string.isRequired,
  type:      PropTypes.string.isRequired,
  duration:  PropTypes.string.isRequired,
  status:    PropTypes.string.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject:  PropTypes.func.isRequired,
};

export default LeaveRow;