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
          <>
            <button
              type="button"
              className="approve"
              onClick={() => onApprove(id)}
            >
              Approve
            </button>
            <button
              type="button"
              className="reject"
              onClick={() => onReject(id)}
            >
              Reject
            </button>
          </>
        ) : (
          <span style={{ color: "var(--muted)", fontStyle: "italic", fontSize: "12px" }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
      </td>
    </tr>
  );
}

LeaveRow.propTypes = {
  id:         PropTypes.number.isRequired,
  employee:   PropTypes.string.isRequired,
  role:       PropTypes.string.isRequired,
  avatar:     PropTypes.string.isRequired,
  type:       PropTypes.string.isRequired,
  duration:   PropTypes.string.isRequired,
  status:     PropTypes.string.isRequired,
  onApprove:  PropTypes.func.isRequired,
  onReject:   PropTypes.func.isRequired,
};

export default LeaveRow;
