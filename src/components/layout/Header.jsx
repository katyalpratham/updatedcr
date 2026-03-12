import PropTypes from "prop-types";
import { Menu, Bell, Plus } from "lucide-react";

export default function Header({
  onNewRequest, onToggleSidebar, onToggleNotif,
  unreadCount = 0, title = "Dashboard", subtitle = "Overview"
}) {
  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Menu size={18} />
        </button>
        <div>
          <h2 className="header__title">{title}</h2>
          <p className="header__subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="header__right">
        {/* Notification bell */}
        <button
          className="btn-ghost"
          onClick={onToggleNotif}
          style={{ position:"relative", padding:"9px 12px" }}
          aria-label="Notifications"
        >
          <Bell size={17} />
          {unreadCount > 0 && (
            <span style={{
              position:"absolute", top:"5px", right:"5px",
              width:"17px", height:"17px", borderRadius:"50%",
              background:"var(--rose)", color:"#fff",
              fontSize:".6rem", fontWeight:700,
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 8px var(--rose)",
              animation:"pulse-dot 2s infinite",
            }}>
              {unreadCount}
            </span>
          )}
        </button>

        <button className="btn-primary" onClick={onNewRequest}>
          <Plus size={15} />
          New Request
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  onNewRequest:     PropTypes.func,
  onToggleSidebar:  PropTypes.func,
  onToggleNotif:    PropTypes.func,
  unreadCount:      PropTypes.number,
  title:            PropTypes.string,
  subtitle:         PropTypes.string,
};
Header.defaultProps = {
  onNewRequest:    () => {},
  onToggleSidebar: () => {},
  onToggleNotif:   () => {},
};
