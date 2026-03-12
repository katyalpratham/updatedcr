import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import LeaveRow from "./LeaveRow.jsx";

export default function LeaveTable({ leaves, onApprove, onReject }) {
  const [search,  setSearch]  = useState("");
  const [type,    setType]    = useState("all");
  const [status,  setStatus]  = useState("all");

  const types = useMemo(() => ["all", ...new Set(leaves.map(l => l.type))], [leaves]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leaves.filter(l => {
      const matchQ = !q || l.name.toLowerCase().includes(q) || l.role.toLowerCase().includes(q);
      const matchT = type   === "all" || l.type   === type;
      const matchS = status === "all" || l.status === status;
      return matchQ && matchT && matchS;
    });
  }, [leaves, search, type, status]);

  const pending = leaves.filter(l => l.status === "pending").length;

  return (
    <div>
      <div className="table-toolbar">
        <h3 className="table-toolbar__title">
          Leave Requests
          {pending > 0 && (
            <span className="badge badge--pending">{pending} pending</span>
          )}
        </h3>
        <div className="table-filters">
          <input
            className="input-field input-search"
            placeholder="Search name or role…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width:"200px" }}
          />
          <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
            {types.map(t => <option key={t} value={t}>{t === "all" ? "All Types" : t}</option>)}
          </select>
          <select className="input-field" value={status} onChange={e => setStatus(e.target.value)}>
            {["all","pending","approved","rejected"].map(s => (
              <option key={s} value={s}>{s === "all" ? "All Status" : s[0].toUpperCase()+s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(item => (
                <LeaveRow
                  key={item.id}
                  id={item.id}
                  employee={item.name}
                  role={item.role}
                  avatar={item.avatar}
                  type={item.type}
                  duration={item.duration}
                  status={item.status}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              )) : (
                <tr>
                  <td colSpan={6} style={{ textAlign:"center", color:"var(--text-3)", padding:"40px" }}>
                    No records match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p style={{ marginTop:"10px", fontSize:".75rem", color:"var(--text-3)" }}>
        {filtered.length} of {leaves.length} records
      </p>
    </div>
  );
}

LeaveTable.propTypes = {
  leaves:    PropTypes.array.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject:  PropTypes.func.isRequired,
};
