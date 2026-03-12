import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Users, UserCheck, UserX, Gauge, Calendar } from "lucide-react";
import StatCard from "../components/cards/StatCard";
import TeamCalendar from "../components/calendar/TeamCalendar";
import ImpactCard from "../components/cards/ImpactCard";
import LeaveTable from "../components/table/LeaveTable";
import StudentAverageChart from "../components/charts/StudentAverageChart";
import { leaveRequestsData } from "../components/data/dashboard";

const NAMES = ["Emma","Noah","Liam","Ava","Isabella","Ethan","Mia","Zara","Oscar","Leon"];
const LAST  = ["Smith","Patel","Garcia","Kim","Nguyen","Rossi","Singh","Chen","Okafor","Muller"];
const ROLES = ["Frontend Dev","Backend Dev","QA Engineer","Product Manager","Designer"];
const TYPES = ["Vacation","Sick Leave","Personal","Medical"];

export default function Dashboard() {
  const [leaves, setLeaves] = useState(leaveRequestsData);

  const generateRandomLeaves = useCallback(() => {
    const count = Math.floor(Math.random() * 2) + 2;
    const batch = Array.from({ length: count }, (_, i) => {
      const start = Math.floor(Math.random() * 25) + 1;
      const extra = Math.floor(Math.random() * 3);
      return {
        id:       Date.now() + i,
        name:     `${NAMES[~~(Math.random()*NAMES.length)]} ${LAST[~~(Math.random()*LAST.length)]}`,
        role:     ROLES[~~(Math.random()*ROLES.length)],
        type:     TYPES[~~(Math.random()*TYPES.length)],
        duration: extra === 0 ? `May ${start}` : `May ${start}-${start+extra}`,
        status:   "pending",
        avatar:   `https://i.pravatar.cc/40?img=${~~(Math.random()*70)}`,
      };
    });
    setLeaves(prev => [...batch, ...prev]);
  }, []);

  const { setHeaderAction } = useOutletContext() || {};
  useEffect(() => {
    if (setHeaderAction) setHeaderAction(() => generateRandomLeaves);
    return () => { if (setHeaderAction) setHeaderAction(null); };
  }, [setHeaderAction, generateRandomLeaves]);

  const approve = id => setLeaves(p => p.map(l => l.id === id ? { ...l, status:"approved" } : l));
  const reject  = id => setLeaves(p => p.map(l => l.id === id ? { ...l, status:"rejected" } : l));

  // Derived stats (mock today = May 18)
  const TODAY = 18;
  const TOTAL = 24;
  const absent = leaves.filter(l => {
    if (!["approved","completed"].includes(l.status)) return false;
    const m = l.duration.match(/May\s+(\d+)(?:[-–]+(\d+))?/);
    if (!m) return false;
    const s = +m[1], e = m[2] ? +m[2] : s;
    return TODAY >= s && TODAY <= e;
  }).length;
  const present  = TOTAL - absent;
  const capacity = Math.round((present / TOTAL) * 100);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"22px" }}>
      {/* Stats */}
      <div className="stat-grid">
        <StatCard title="Total Members"  value={TOTAL}       icon={Users}     color="teal"   trend={5}  delay={0}   />
        <StatCard title="Present Today"  value={present}     icon={UserCheck} color="sky"    trend={2}  delay={80}  />
        <StatCard title="Absent Today"   value={absent}      icon={UserX}     color="rose"   trend={-1} delay={160} />
        <StatCard title="Team Capacity"  value={`${capacity}%`} icon={Gauge}  color="amber"             delay={240} />
      </div>

      {/* Charts row */}
      <div className="grid-2 anim-fade-up-2">
        <div className="card">
          <StudentAverageChart leaves={leaves} />
        </div>
        <div className="card">
          <p className="section-title">Leave Impact</p>
          <ImpactCard type="high"   value={75} />
          <ImpactCard type="medium" value={42} />
          <ImpactCard type="low"    value={18} />
        </div>
      </div>

      {/* Leave table */}
      <div className="card anim-fade-up-3">
        <LeaveTable leaves={leaves} onApprove={approve} onReject={reject} />
      </div>

      {/* Calendar */}
      <div className="card anim-fade-up-4">
        <TeamCalendar leaves={leaves} />
      </div>
    </div>
  );
}
