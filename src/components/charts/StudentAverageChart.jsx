import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SHORT = {
  "Frontend Dev":    "Frontend",
  "Backend Dev":     "Backend",
  "UX Designer":     "Design",
  "QA Engineer":     "QA",
  "Product Manager": "PM",
  "DevOps Engineer": "DevOps",
  "Data Analyst":    "Analytics",
  "Marketing":       "Marketing",
};

export default function StudentAverageChart({ leaves = [] }) {
  const stats = leaves.reduce((acc, l) => {
    const name = SHORT[l.role] || l.role.split(" ")[0];
    if (!acc[name]) acc[name] = { name, pending:0, approved:0, rejected:0 };
    const s = l.status === "completed" ? "approved" : l.status;
    if (acc[name][s] !== undefined) acc[name][s]++;
    return acc;
  }, {});

  const tooltipStyle = {
    backgroundColor:"var(--surface2)", border:"1px solid var(--border)",
    borderRadius:"10px", fontFamily:"IBM Plex Sans, sans-serif", color:"var(--text)",
  };

  return (
    <div style={{ width:"100%", height:260 }}>
      <p className="section-title">Leave by Role</p>
      <ResponsiveContainer>
        <BarChart data={Object.values(stats)} margin={{ top:4, right:10, left:-22, bottom:8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={.6} />
          <XAxis dataKey="name" tick={{ fill:"var(--text-3)", fontSize:11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill:"var(--text-3)", fontSize:11 }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill:"rgba(255,255,255,.03)" }} />
          <Legend verticalAlign="bottom" height={28} wrapperStyle={{ color:"var(--text-2)", fontSize:".78rem", fontWeight:600 }} />
          <Bar dataKey="approved" stackId="a" fill="#00d4b4" name="Approved" />
          <Bar dataKey="pending"  stackId="a" fill="#f6a821" name="Pending" />
          <Bar dataKey="rejected" stackId="a" fill="#f05575" name="Rejected" radius={[5,5,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

StudentAverageChart.propTypes = { leaves: PropTypes.array };
