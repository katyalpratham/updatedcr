import { useState } from "react";
import PropTypes from "prop-types";
import { Bell, CheckCheck, X, AlertTriangle, CheckCircle, Info } from "lucide-react";

const ICON_MAP = {
  leave:   { Icon: Bell,          bg: "var(--teal-dim)",  color: "var(--teal)"  },
  alert:   { Icon: AlertTriangle, bg: "var(--rose-dim)",  color: "var(--rose)"  },
  approve: { Icon: CheckCircle,   bg: "var(--amber-dim)", color: "var(--amber)" },
  system:  { Icon: Info,          bg: "var(--sky-dim)",   color: "var(--sky)"   },
};

export default function NotificationPanel({ notifications, isOpen, onClose, onMarkAllRead }) {
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className={`notif-panel ${isOpen ? "open" : ""}`}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"4px" }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".95rem" }}>
          Notifications
          {unread > 0 && (
            <span style={{
              marginLeft:"8px", background:"var(--teal-dim)", color:"var(--teal)",
              fontSize:".68rem", fontWeight:700, padding:"2px 7px", borderRadius:"20px",
            }}>{unread} new</span>
          )}
        </h3>
        <div style={{ display:"flex", gap:"6px" }}>
          {unread > 0 && (
            <button className="btn-icon" onClick={onMarkAllRead} title="Mark all read">
              <CheckCheck size={15} />
            </button>
          )}
          <button className="btn-icon" onClick={onClose} title="Close">
            <X size={15} />
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div style={{ textAlign:"center", color:"var(--text-3)", padding:"40px 0", fontSize:".875rem" }}>
          No notifications yet
        </div>
      ) : (
        notifications.map((n, i) => {
          const { Icon, bg, color } = ICON_MAP[n.type] || ICON_MAP.system;
          return (
            <div
              key={n.id}
              className={`notif-item ${!n.read ? "notif-item--unread" : ""}`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="notif-icon" style={{ background: bg, color }}>
                <Icon size={16} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p className="notif-title">{n.title}</p>
                <p className="notif-body">{n.body}</p>
                <p className="notif-time">{n.time}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

NotificationPanel.propTypes = {
  notifications:  PropTypes.array.isRequired,
  isOpen:         PropTypes.bool.isRequired,
  onClose:        PropTypes.func.isRequired,
  onMarkAllRead:  PropTypes.func.isRequired,
};
