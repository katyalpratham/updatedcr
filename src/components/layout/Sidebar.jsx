import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, GraduationCap, BarChart2, Settings, Zap } from "lucide-react";

const NAV = [
  { label:"Dashboard", href:"/dashboard",          Icon:LayoutDashboard },
  { label:"Students",  href:"/dashboard/students", Icon:GraduationCap   },
  { label:"Reports",   href:"/dashboard/reports",  Icon:BarChart2        },
  { label:"Settings",  href:"/dashboard/settings", Icon:Settings         },
];

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar__brand">
        <Zap size={20} fill="currentColor" />
        LeaveSync
      </h2>

      <p className="sidebar__section-label">Navigation</p>
      <nav>
        <ul className="sidebar__nav-list">
          {NAV.map(({ label, href, Icon }) => (
            <li key={href}>
              <NavLink
                to={href}
                end={href === "/dashboard"}
                className={({ isActive }) =>
                  `sidebar__nav-item${isActive ? " sidebar__nav-item--active" : ""}`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div style={{ marginTop:"auto", paddingTop:"24px", borderTop:"1px solid var(--border)" }}>
        <p style={{ fontSize:".7rem", color:"var(--text-3)", lineHeight:1.6 }}>
          LeaveSync v2.0<br />
          <span style={{ color:"var(--teal)" }}>●</span> All systems normal
        </p>
      </div>
    </aside>
  );
}

Sidebar.propTypes = { isOpen: PropTypes.bool };
