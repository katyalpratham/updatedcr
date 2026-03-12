import PropTypes from "prop-types";
import { TrendingUp, TrendingDown } from "lucide-react";

const PRESETS = {
  teal:   { icon: "var(--teal)",   bg: "var(--teal-dim)",   glow: "radial-gradient(circle, var(--teal-glow) 0%, transparent 70%)"  },
  amber:  { icon: "var(--amber)",  bg: "var(--amber-dim)",  glow: "radial-gradient(circle, var(--glow-amber) 0%, transparent 70%)" },
  rose:   { icon: "var(--rose)",   bg: "var(--rose-dim)",   glow: "radial-gradient(circle, var(--glow-rose) 0%, transparent 70%)"  },
  sky:    { icon: "var(--sky)",    bg: "var(--sky-dim)",    glow: "radial-gradient(circle, rgba(56,189,248,.25) 0%, transparent 70%)" },
  violet: { icon: "var(--violet)", bg: "var(--violet-dim)", glow: "radial-gradient(circle, rgba(167,139,250,.25) 0%, transparent 70%)" },
};

export default function StatCard({ title, value, icon: Icon, color = "teal", trend, delay = 0 }) {
  const p = PRESETS[color] || PRESETS.teal;
  const isUp = trend > 0;

  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-card__glow" style={{ background: p.glow }} />
      <div className="stat-card__icon" style={{ background: p.bg, color: p.icon }}>
        {Icon && <Icon size={20} />}
      </div>
      <p className="stat-card__label">{title}</p>
      <h3 className="stat-card__value">{value}</h3>
      {trend !== undefined && (
        <div className="stat-card__trend" style={{ color: isUp ? "var(--teal)" : "var(--rose)" }}>
          {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(trend)}% vs last month
        </div>
      )}
    </div>
  );
}

StatCard.propTypes = {
  title:  PropTypes.string.isRequired,
  value:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon:   PropTypes.elementType,
  color:  PropTypes.oneOf(["teal","amber","rose","sky","violet"]),
  trend:  PropTypes.number,
  delay:  PropTypes.number,
};
