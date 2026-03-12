import PropTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#00d4b4", "#f6a821", "#f05575"];

export default function AttendancePieChart({ leaves = [] }) {
  const approved = leaves.filter(l => l.status === "approved" || l.status === "completed").length;
  const pending  = leaves.filter(l => l.status === "pending").length;
  const rejected = leaves.filter(l => l.status === "rejected").length;

  const data = [
    { name:"Approved", value:approved },
    { name:"Pending",  value:pending  },
    { name:"Rejected", value:rejected },
  ].filter(d => d.value > 0);

  const tooltipStyle = {
    backgroundColor:"var(--surface2)", border:"1px solid var(--border)",
    borderRadius:"10px", boxShadow:"var(--shadow)",
    fontFamily:"IBM Plex Sans, sans-serif", color:"var(--text)",
  };

  return (
    <div style={{ width:"100%", height:260 }}>
      <p className="section-title">Status Distribution</p>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} cx="50%" cy="44%" innerRadius={60} outerRadius={95}
            paddingAngle={4} dataKey="value" strokeWidth={0}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend verticalAlign="bottom" height={32}
            wrapperStyle={{ color:"var(--text-2)", fontSize:".8rem", fontWeight:600 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

AttendancePieChart.propTypes = { leaves: PropTypes.array };
