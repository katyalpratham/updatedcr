import { useState, useEffect } from "react";
import { Sun, Moon, Monitor, Bell, BellOff, Mail, Save, Check, Shield, Eye } from "lucide-react";

const THEMES = [
  { value:"light",  label:"Light",  Icon:Sun     },
  { value:"dark",   label:"Dark",   Icon:Moon    },
  { value:"system", label:"System", Icon:Monitor },
];

function ToggleRow({ icon:Icon, label, desc, checked, onChange }) {
  return (
    <div className="toggle-row" onClick={onChange} role="checkbox" aria-checked={checked} tabIndex={0}
      onKeyDown={e => e.key===" " && onChange()}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <div style={{ width:36, height:36, borderRadius:9, background:"var(--surface3)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-2)" }}>
          <Icon size={17} />
        </div>
        <div>
          <p style={{ fontWeight:600, fontSize:".88rem" }}>{label}</p>
          <p style={{ color:"var(--text-3)", fontSize:".78rem" }}>{desc}</p>
        </div>
      </div>
      <div className={`toggle-switch toggle-switch--${checked?"on":"off"}`} />
    </div>
  );
}

export default function Settings() {
  const [theme,  setTheme]  = useState(() => localStorage.getItem("theme") || "dark");
  const [email,  setEmail]  = useState(true);
  const [push,   setPush]   = useState(false);
  const [twofa,  setTwofa]  = useState(false);
  const [privacy, setPrivacy] = useState(true);
  const [saved,  setSaved]  = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event("storage"));
  }, [theme]);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"22px", maxWidth:620 }}>

      {/* Appearance */}
      <div className="card anim-fade-up">
        <p className="section-title"><Monitor size={16} /> Appearance</p>
        <p className="settings-label">Theme</p>
        <div style={{ display:"flex", gap:"10px" }}>
          {THEMES.map(({ value, label, Icon }) => (
            <button key={value} className={`theme-pill ${theme===value?"theme-pill--active":""}`} onClick={() => setTheme(value)}>
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card anim-fade-up-2">
        <p className="section-title"><Bell size={16} /> Notifications</p>
        <div className="settings-section">
          <ToggleRow icon={Mail}    label="Email Notifications" desc="Receive leave updates via email"          checked={email}  onChange={() => setEmail(v=>!v)}  />
          <ToggleRow icon={Bell}    label="Push Notifications"  desc="Browser push alerts for new requests"    checked={push}   onChange={() => setPush(v=>!v)}   />
        </div>
      </div>

      {/* Security */}
      <div className="card anim-fade-up-3">
        <p className="section-title"><Shield size={16} /> Security & Privacy</p>
        <div className="settings-section">
          <ToggleRow icon={Shield}  label="Two-Factor Auth"     desc="Secure your account with 2FA"            checked={twofa}  onChange={() => setTwofa(v=>!v)}  />
          <ToggleRow icon={Eye}     label="Activity Visibility"  desc="Allow others to see your online status" checked={privacy} onChange={() => setPrivacy(v=>!v)} />
        </div>
      </div>

      {/* Save */}
      <button
        className="btn-primary"
        onClick={save}
        style={{ width:"fit-content", transition:"all .2s", background: saved ? "var(--teal-dark)" : undefined }}
      >
        {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
      </button>
    </div>
  );
}
