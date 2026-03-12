import { useState, useMemo } from "react";
import { GraduationCap, AlertTriangle, TrendingUp, TrendingDown, Users } from "lucide-react";
import StatCard from "../components/cards/StatCard";
import { studentsData } from "../components/data/dashboard";

function AttBar({ value }) {
  const color = value >= 85 ? "var(--teal)" : value >= 70 ? "var(--amber)" : "var(--rose)";
  return (
    <div className="att-wrap">
      <div className="att-track">
        <div className="att-fill" style={{ width:`${value}%`, background:color }} />
      </div>
      <span className="att-label" style={{ color }}>{value}%</span>
    </div>
  );
}

export default function Students() {
  const [students, setStudents] = useState(studentsData);
  const [search,  setSearch]   = useState("");
  const [dept,    setDept]     = useState("all");
  const [year,    setYear]     = useState("all");
  const [status,  setStatus]   = useState("all");
  const [sort,    setSort]     = useState("name"); // name | attendance

  const depts = useMemo(() => ["all", ...new Set(studentsData.map(s => s.dept))], []);
  const years = useMemo(() => ["all", ...new Set(studentsData.map(s => String(s.year)))], []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return students
      .filter(s => {
        const mQ = !q || s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q);
        const mD = dept   === "all" || s.dept === dept;
        const mY = year   === "all" || String(s.year) === year;
        const mS = status === "all" || s.status === status;
        return mQ && mD && mY && mS;
      })
      .sort((a, b) => sort === "attendance" ? a.attendance - b.attendance : a.name.localeCompare(b.name));
  }, [students, search, dept, year, status, sort]);

  const toggle = id => setStudents(prev =>
    prev.map(s => s.id === id ? { ...s, status: s.status === "present" ? "absent" : "present" } : s)
  );

  // Summary
  const present = students.filter(s => s.status === "present").length;
  const absent  = students.filter(s => s.status === "absent").length;
  const avg     = Math.round(students.reduce((a, s) => a+s.attendance, 0) / students.length);
  const atRisk  = students.filter(s => s.attendance < 75).length;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"22px" }}>
      {/* Stat cards */}
      <div className="stat-grid">
        <StatCard title="Total Students"  value={students.length} icon={Users}        color="teal"  delay={0}   />
        <StatCard title="Present Today"   value={present}         icon={TrendingUp}   color="sky"   delay={80}  />
        <StatCard title="Absent Today"    value={absent}          icon={TrendingDown} color="rose"  delay={160} />
        <StatCard title="Avg Attendance"  value={`${avg}%`}       icon={GraduationCap} color="amber" delay={240} />
      </div>

      {/* At-risk banner */}
      {atRisk > 0 && (
        <div className="card anim-fade-up" style={{ borderColor:"var(--rose)", background:"var(--rose-dim)", display:"flex", alignItems:"center", gap:"12px" }}>
          <AlertTriangle size={20} color="var(--rose)" />
          <div>
            <p style={{ fontWeight:600, color:"var(--rose)", fontSize:".9rem" }}>{atRisk} student{atRisk>1?"s":""} at academic risk</p>
            <p style={{ color:"var(--text-2)", fontSize:".8rem" }}>Attendance below 75% — intervention may be required.</p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card anim-fade-up-2">
        <div className="table-toolbar">
          <h3 className="table-toolbar__title">
            <GraduationCap size={17} />
            Student Records
          </h3>
          <div className="table-filters">
            <input
              className="input-field input-search"
              placeholder="Search name / roll no…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width:"200px" }}
            />
            <select className="input-field" value={dept}   onChange={e => setDept(e.target.value)}>
              {depts.map(d => <option key={d} value={d}>{d==="all"?"All Depts":d}</option>)}
            </select>
            <select className="input-field" value={year}   onChange={e => setYear(e.target.value)}>
              {years.map(y => <option key={y} value={y}>{y==="all"?"All Years":`Year ${y}`}</option>)}
            </select>
            <select className="input-field" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
            <select className="input-field" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="name">Sort: Name</option>
              <option value="attendance">Sort: Attendance ↑</option>
            </select>
          </div>
        </div>

        <div className="table-wrap">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Dept</th>
                  <th>Year</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? filtered.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                        <img src={s.avatar} alt={s.name} style={{ width:32, height:32, borderRadius:"50%", border:"2px solid var(--border)" }} />
                        <span style={{ fontWeight:500 }}>{s.name}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:".78rem", color:"var(--text-3)" }}>
                        {s.rollNo}
                      </span>
                    </td>
                    <td style={{ color:"var(--text-2)", fontSize:".84rem" }}>{s.dept}</td>
                    <td>
                      <span className="badge badge--info">Y{s.year}</span>
                    </td>
                    <td style={{ minWidth:"160px" }}>
                      <AttBar value={s.attendance} />
                    </td>
                    <td>
                      <span className={`badge badge--${s.status}`}>
                        {s.status === "present" ? "● Present" : "○ Absent"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggle(s.id)}
                        style={{
                          background: s.status==="present" ? "var(--rose-dim)" : "var(--teal-dim)",
                          color:      s.status==="present" ? "var(--rose)"     : "var(--teal)",
                          border:"1px solid transparent",
                          padding:"5px 12px", borderRadius:"7px",
                          fontFamily:"inherit", fontSize:".77rem", fontWeight:600,
                          cursor:"pointer", transition:"all .2s",
                        }}
                      >
                        Mark {s.status==="present" ? "Absent" : "Present"}
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign:"center", color:"var(--text-3)", padding:"40px" }}>
                      No students match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p style={{ marginTop:"10px", fontSize:".75rem", color:"var(--text-3)" }}>
          Showing {filtered.length} of {students.length} students
        </p>
      </div>
    </div>
  );
}
