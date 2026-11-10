import { useEffect, useMemo, useState } from "react";
import { api } from "./api";

const fieldOverrides = {
  communicationChannels: { name: "text", incidentReference: "text", description: "textarea", members: "textarea", status: "select:active,archived" },
  roadBlockages: { title: "text", roadName: "text", location: "text", severity: "select:low,medium,high,critical", description: "textarea", status: "select:reported,verified,cleared" },
  facilityInspections: { facilityName: "text", facilityType: "text", location: "text", inspector: "text", inspectionDate: "date", result: "select:passed,needs_attention,failed", notes: "textarea" },
  translations: { incidentReference: "text", sourceLanguage: "text", targetLanguage: "text", originalText: "textarea", translatedText: "textarea", status: "select:pending_review,reviewed" },
  transportationRequests: { requester: "text", transportType: "text", pickupLocation: "text", destination: "text", passengerCount: "number", status: "select:requested,assigned,in_transit,completed,cancelled", assignedVehicle: "text" },
  weatherAssessments: { location: "text", condition: "text", severity: "select:low,medium,high,critical", provider: "text", observedAt: "datetime-local", impactSummary: "textarea" },
  shiftSchedules: { responderName: "text", role: "text", shiftStart: "datetime-local", shiftEnd: "datetime-local", location: "text", status: "select:scheduled,active,completed,cancelled" },
  transcripts: { incidentReference: "text", channel: "text", transcriptText: "textarea", recordedBy: "text", recordedAt: "datetime-local", classification: "select:internal,restricted" },
  resourceApprovals: { requestTitle: "text", resourceType: "text", quantity: "number", requestedBy: "text", approver: "text", decision: "select:pending,approved,rejected", comments: "textarea" },
  situationReports: { title: "text", incidentReference: "text", reportingPeriod: "text", summary: "textarea", affectedArea: "text", preparedBy: "text", status: "select:draft,published" },
  publicAnnouncements: { title: "text", message: "textarea", category: "text", severity: "select:information,warning,urgent", status: "select:draft,published,expired", expiresAt: "datetime-local" },
  medicalInventory: { itemName: "text", facility: "text", quantity: "number", unit: "text", expiresAt: "date", reorderLevel: "number" },
  volunteerAttendance: { volunteerName: "text", activity: "text", checkInAt: "datetime-local", checkOutAt: "datetime-local", status: "select:checked_in,checked_out" },
  infrastructureDamage: { assetType: "text", assetName: "text", location: "text", severity: "select:low,medium,high,critical", description: "textarea", repairStatus: "select:unassessed,planned,in_progress,repaired" },
  incidentCosts: { incidentReference: "text", expenseCategory: "text", estimatedAmount: "number", actualAmount: "number", currency: "text", notes: "textarea" },
  responseFeedback: { incidentReference: "text", rating: "number", category: "text", comments: "textarea", submittedBy: "text" },
  dashboardPreferences: { userReference: "text", visibleWidgets: "textarea", layout: "textarea" }
};

function labelize(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const result = mode === "login" ? await api.login(form) : await api.register(form);
      sessionStorage.setItem("sos_token", result.token);
      onAuthenticated(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <div className="logo">SOS</div>
        <p className="eyebrow">EMERGENCY RESPONSE PLATFORM</p>
        <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="muted">Sign in to manage emergency operations.</p>
        {mode === "register" && <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />}
        <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password (10+ characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={mode === "register" ? 10 : 1} />
        {error && <div className="alert">{error}</div>}
        <button className="primary full" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</button>
        <button type="button" className="link-button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
          {mode === "login" ? "New here? Create an account" : "Already registered? Sign in"}
        </button>
      </form>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [active, setActive] = useState("roadBlockages");
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("sos_token")) return;
    api.me().then((result) => setUser(result.user)).catch(() => sessionStorage.removeItem("sos_token"));
  }, []);

  useEffect(() => {
    if (!user) return;
    api.modules().then((result) => setModules(result)).catch((err) => setMessage(err.message));
  }, [user]);

  async function loadRecords() {
    setBusy(true);
    setMessage("");
    try {
      const result = await api.list(active);
      setRecords(result.items || []);
    } catch (error) {
      setRecords([]);
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!user || !active) return;
    setForm({});
    loadRecords();
  }, [user, active]);

  async function saveRecord(event) {
    event.preventDefault();
    setMessage("");
    try {
      await api.create(active, form);
      setForm({});
      setMessage("Record saved successfully.");
      await loadRecords();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function removeRecord(id) {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await api.remove(active, id);
      setMessage("Record deleted.");
      await loadRecords();
    } catch (error) {
      setMessage(error.message);
    }
  }

  const current = modules.find((item) => item.key === active);
  const filteredRecords = useMemo(() => records.filter((record) => JSON.stringify(record.data).toLowerCase().includes(search.toLowerCase())), [records, search]);

  if (!user) return <AuthScreen onAuthenticated={setUser} />;

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand-row"><div className="logo small">SOS</div><div><b>Response Hub</b><small>Operations platform</small></div></div>
        <div className="side-label">WORKSPACE</div>
        {modules.map((item) => <button key={item.key} className={`nav-link ${active === item.key ? "active" : ""}`} onClick={() => setActive(item.key)}>{item.label}</button>)}
        <div className="side-bottom">
          <div className="user-chip"><span className="avatar">{user.name?.[0]?.toUpperCase() || "U"}</span><div><b>{user.name}</b><small>{user.role}</small></div></div>
          <button className="logout" onClick={() => { sessionStorage.removeItem("sos_token"); setUser(null); }}>Sign out</button>
        </div>
      </aside>

      <main className="content">
        <header className="page-header">
          <div><p className="eyebrow">OPERATIONS / MODULES</p><h1>{current?.label || "Emergency operations"}</h1><p className="muted">Manage and review operational records in one place.</p></div>
          <span className="role-pill">{user.role}</span>
        </header>

        {message && <div className="notice">{message}</div>}

        <section className="panel">
          <div className="panel-title"><div><h2>Add a record</h2><p>Complete the fields and save the information.</p></div></div>
          <form className="form-grid" onSubmit={saveRecord}>
            {Object.entries(fieldOverrides[active] || {}).map(([field, type]) => {
              const required = ["name","incidentReference","title","roadName","location","facilityName","facilityType","inspector","inspectionDate","sourceLanguage","targetLanguage","originalText","translatedText","requester","transportType","pickupLocation","destination","passengerCount","condition","impactSummary","responderName","role","shiftStart","shiftEnd","channel","transcriptText","recordedBy","recordedAt","requestTitle","resourceType","quantity","requestedBy","reportingPeriod","summary","preparedBy","message","category","itemName","facility","unit","volunteerName","activity","checkInAt","assetType","assetName","description","expenseCategory","estimatedAmount","rating","userReference","visibleWidgets"].includes(field);
              return <label key={field} className={type === "textarea" ? "span-two" : ""}><span>{labelize(field)}{required ? " *" : ""}</span>
                {type.startsWith("select:") ? <select value={form[field] || ""} required={required} onChange={(e) => setForm({ ...form, [field]: e.target.value })}><option value="">Choose…</option>{type.slice(7).split(",").map((option) => <option key={option} value={option}>{labelize(option)}</option>)}</select>
                  : type === "textarea" ? <textarea rows="3" value={form[field] || ""} required={required} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
                  : <input type={type} value={form[field] || ""} required={required} min={type === "number" ? "0" : undefined} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />}
              </label>;
            })}
            <div className="form-actions span-two"><button className="primary" disabled={busy}>Save record</button><button type="button" className="secondary" onClick={() => setForm({})}>Clear</button></div>
          </form>
        </section>

        <section className="panel">
          <div className="records-head"><div><h2>Records</h2><p>{filteredRecords.length} record(s) shown</p></div><div className="record-tools"><input className="search" placeholder="Search records…" value={search} onChange={(e) => setSearch(e.target.value)} /><button className="secondary" onClick={loadRecords}>Refresh</button></div></div>
          {busy ? <div className="empty">Loading records…</div> : filteredRecords.length === 0 ? <div className="empty">No records found. Add the first record using the form above.</div> :
            <div className="record-list">{filteredRecords.map((record) => <article className="record" key={record._id}><div className="record-main"><b>{record.data.name || record.data.title || record.data.facilityName || record.data.itemName || record.data.requestTitle || record.data.responderName || record.data.assetName || "Record"}</b><p>{Object.entries(record.data).filter(([, value]) => value !== "" && value !== undefined && value !== null).slice(0, 5).map(([key, value]) => `${labelize(key)}: ${value}`).join(" · ")}</p><small>Added {new Date(record.createdAt).toLocaleString()}</small></div>{["admin","operator"].includes(user.role) && <button className="delete" onClick={() => removeRecord(record._id)}>Delete</button>}</article>)}</div>}
        </section>
        <footer>Use verified information when recording an emergency. This dashboard is not a substitute for contacting local emergency services.</footer>
      </main>
    </div>
  );
}

export default App;
