import { BarChart2, CheckCircle, Clock, TrendingUp } from "lucide-react";
import AttendancePieChart from "../components/charts/AttendancePieChart";
import MonthlyTrendChart from "../components/charts/MonthlyTrendChart";
import StatCard from "../components/cards/StatCard";
import { leaveRequestsData } from "../components/data/dashboard";

export default function Reports() {
  const total    = leaveRequestsData.length;
  const approved = leaveRequestsData.filter(l => l.status === "approved").length;
  const pending  = leaveRequestsData.filter(l => l.status === "pending").length;
  const rate     = total ? Math.round((approved / total) * 100) : 0;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"22px" }}>
      <div className="stat-grid">
        <StatCard title="Total Requests"  value={total}     icon={BarChart2}    color="teal"   delay={0}   />
        <StatCard title="Approved"        value={approved}  icon={CheckCircle}  color="sky"    delay={80}  />
        <StatCard title="Pending"         value={pending}   icon={Clock}        color="amber"  delay={160} />
        <StatCard title="Approval Rate"   value={`${rate}%`} icon={TrendingUp}  color="violet" delay={240} />
      </div>

      <div className="grid-equal anim-fade-up-2">
        <div className="card">
          <AttendancePieChart leaves={leaveRequestsData} />
        </div>
        <div className="card">
          <MonthlyTrendChart leaves={leaveRequestsData} />
        </div>
      </div>

      {/* Breakdown table */}
      <div className="card anim-fade-up-3">
        <p className="section-title">Request Breakdown</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequestsData.map(l => (
                <tr key={l.id}>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
                      <img src={l.avatar} alt={l.name} style={{ width:28, height:28, borderRadius:"50%", border:"2px solid var(--border)" }} />
                      <span style={{ fontWeight:500, fontSize:".88rem" }}>{l.name}</span>
                    </div>
                  </td>
                  <td style={{ color:"var(--text-2)", fontSize:".84rem" }}>{l.type}</td>
                  <td style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:".78rem", color:"var(--text-3)" }}>{l.duration}</td>
                  <td><span className={`badge badge--${l.status}`}>{l.status[0].toUpperCase()+l.status.slice(1)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
