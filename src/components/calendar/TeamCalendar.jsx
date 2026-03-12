import PropTypes from "prop-types";

function getDays(dur) {
  const m = dur.match(/May\s+(\d+)(?:[-–]+(\d+))?/);
  if (!m) return [];
  const s = +m[1], e = m[2] ? +m[2] : s;
  return Array.from({ length: e-s+1 }, (_, i) => s+i);
}

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function TeamCalendar({ leaves = [] }) {
  const today = 18;
  const startDow = 5; // May 1 2026 = Friday

  const cells = Array.from({ length: 31 }, (_, i) => {
    const day = i+1;
    let p=0, a=0, r=0;
    leaves.forEach(lv => {
      if (!getDays(lv.duration).includes(day)) return;
      if (lv.status === "pending") p++;
      else if (lv.status === "approved" || lv.status === "completed") a++;
      else if (lv.status === "rejected") r++;
    });
    return { day, p, a, r };
  });

  return (
    <div>
      <p className="section-title">May 2026 — Team Calendar</p>
      <div className="cal-header-row">
        {DAYS.map(d => <div className="cal-day-label" key={d}>{d}</div>)}
      </div>
      <div className="cal-grid">
        {Array.from({ length: startDow }).map((_, i) => <div key={`gap-${i}`} />)}
        {cells.map(({ day, p, a, r }) => (
          <div key={day} className={`cal-cell ${day === today ? "cal-cell--today" : ""}`}>
            <span className="cal-num">{day}</span>
            <div className="cal-dots">
              {p > 0 && <span className="cal-dot cal-dot--pending">{p}P</span>}
              {a > 0 && <span className="cal-dot cal-dot--approved">{a}A</span>}
              {r > 0 && <span className="cal-dot cal-dot--rejected">{r}R</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

TeamCalendar.propTypes = {
  leaves: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  })),
};
