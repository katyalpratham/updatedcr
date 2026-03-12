import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, CheckCircle, BarChart2, Bell, GraduationCap, Calendar } from "lucide-react";
import ParticlesBackground from "../components/layout/ParticlesBackground";

const FEATURES = [
  { icon:BarChart2,    label:"Real-time Analytics"       },
  { icon:Bell,         label:"Smart Notifications"       },
  { icon:GraduationCap,label:"Student Tracking"          },
  { icon:Calendar,     label:"Team Calendar"             },
  { icon:CheckCircle,  label:"Leave Approval Workflow"   },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <ParticlesBackground />
      <div className="landing__grid" />

      {/* Glow blobs */}
      <div className="landing__glow" style={{ width:500, height:500, top:-100, left:-100, opacity:.4 }} />
      <div className="landing__glow" style={{
        width:400, height:400, bottom:-80, right:-80, opacity:.25,
        background:"radial-gradient(circle, rgba(246,168,33,.25) 0%, transparent 70%)",
      }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"2rem 1.5rem", maxWidth:740 }}>

        {/* Badge */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:"7px",
          background:"var(--teal-dim)", border:"1px solid var(--teal-glow)",
          borderRadius:"20px", padding:"5px 14px", marginBottom:"28px",
          color:"var(--teal)", fontSize:".8rem", fontWeight:600,
          animation:"fadeIn .6s ease both",
        }}>
          <Zap size={13} fill="currentColor" />
          Attendance & Leave Management
        </div>

        <h1 style={{
          fontFamily:"'Syne', sans-serif",
          fontSize:"clamp(2.8rem,7vw,5rem)",
          fontWeight:800, lineHeight:1.05,
          letterSpacing:"-0.04em",
          color:"var(--text)",
          marginBottom:"1.4rem",
          animation:"fadeUp .7s ease .1s both",
        }}>
          Team attendance,<br />
          <span style={{
            background:"linear-gradient(135deg, var(--teal) 0%, #38bdf8 100%)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
          }}>radically simplified.</span>
        </h1>

        <p style={{
          fontSize:"1.1rem", color:"var(--text-2)",
          lineHeight:1.75, maxWidth:560, margin:"0 auto 2.5rem",
          animation:"fadeUp .7s ease .2s both",
        }}>
          Track leave requests, monitor student attendance, and gain real-time
          insights — all in one intelligent dashboard.
        </p>

        {/* Feature chips */}
        <div style={{
          display:"flex", flexWrap:"wrap", gap:"10px",
          justifyContent:"center", marginBottom:"2.8rem",
          animation:"fadeUp .7s ease .3s both",
        }}>
          {FEATURES.map(({ icon:Icon, label }) => (
            <span key={label} style={{
              display:"flex", alignItems:"center", gap:"7px",
              padding:"7px 15px",
              background:"var(--surface)",
              border:"1px solid var(--border)",
              borderRadius:"20px",
              fontSize:".82rem", fontWeight:500,
              color:"var(--text-2)",
            }}>
              <Icon size={13} color="var(--teal)" />
              {label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ animation:"fadeUp .7s ease .4s both" }}>
          <button
            className="btn-primary"
            onClick={() => navigate("/dashboard")}
            style={{ padding:"13px 32px", fontSize:"1rem", borderRadius:"12px" }}
          >
            Open Dashboard
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
