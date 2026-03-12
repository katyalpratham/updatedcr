import PropTypes from "prop-types";

const CONFIG = {
  high:   { label:"High Impact",   color:"var(--rose)",  bar:"linear-gradient(90deg,#f05575,#c9193c)" },
  medium: { label:"Medium Impact", color:"var(--amber)", bar:"linear-gradient(90deg,#f6a821,#c97d00)" },
  low:    { label:"Low Impact",    color:"var(--teal)",  bar:"linear-gradient(90deg,#00d4b4,#009a83)" },
};

export default function ImpactCard({ type, value }) {
  const v = Math.min(100, Math.max(0, value || 0));
  const c = CONFIG[type] || CONFIG.low;

  return (
    <div className="impact-item">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:".84rem", fontWeight:600, color:c.color }}>{c.label}</span>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:".84rem", fontWeight:500, color:c.color }}>{v}%</span>
      </div>
      <div className="impact-bar-bg">
        <div className="impact-bar-fill" style={{ width:`${v}%`, background:c.bar }} />
      </div>
    </div>
  );
}

ImpactCard.propTypes = {
  type:  PropTypes.oneOf(["low","medium","high"]).isRequired,
  value: PropTypes.number,
};
