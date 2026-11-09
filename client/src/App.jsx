import { useEffect, useMemo, useState } from "react";
import { createRecord, deleteRecord, getRecords } from "./api";

const modules = [
  { key: "communicationChannels", label: "Communication Channels", fields: ["name", "incidentId", "description", "members", "status"] },
  { key: "roadBlockages", label: "Road Blockage Reports", fields: ["title", "roadName", "location", "severity", "description", "status", "reportedBy"] },
  { key: "facilityInspections", label: "Facility Inspections", fields: ["facilityName", "facilityType", "location", "inspector", "inspectionDate", "result", "notes"] },
  { key: "translations", label: "Incident Translations", fields: ["incidentId", "sourceLanguage", "targetLanguage", "originalText", "translatedText", "reviewedBy", "status"] },
  { key: "transportationRequests", label: "Transportation Requests", fields: ["requester", "incidentId", "transportType", "pickupLocation", "destination", "passengerCount", "status", "assignedVehicle"] },
  { key: "weatherAssessments", label: "Weather Impact Assessments", fields: ["location", "condition", "severity", "provider", "observedAt", "impactSummary", "incidentId"] },
  { key: "shiftSchedules", label: "Operations Shift Scheduling", fields: ["responderName", "role", "shiftStart", "shiftEnd", "location", "status"] },
  { key: "transcripts", label: "Communication Transcripts", fields: ["incidentId", "channel", "transcriptText", "recordedBy", "recordedAt", "classification"] },
  { key: "resourceApprovals", label: "Resource Request Approvals", fields: ["requestTitle", "resourceType", "quantity", "requestedBy", "approver", "decision", "comments"] },
  { key: "situationReports", label: "Situation Reports", fields: ["title", "incidentId", "reportingPeriod", "summary", "affectedArea", "preparedBy", "status"] }
];

function humanize(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

export default function App() {
  const [activeModule, setActiveModule] = useState(modules[0].key);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const current = useMemo(() => modules.find((item) => item.key === activeModule), [activeModule]);

  async function loadRecords() {
    setLoading(true);
    setMessage("");
    try {
      setRecords(await getRecords(activeModule));
    } catch (error) {
      setMessage(error.message);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setForm({});
    loadRecords();
  }, [activeModule]);

  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createRecord(activeModule, form);
      setForm({});
      setMessage("Record saved successfully.");
      await loadRecords();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this record?")) return;
    try {
      await deleteRecord(activeModule, id);
      setMessage("Record deleted.");
      await loadRecords();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">SOS</span>
          <div>
            <strong>Emergency Response</strong>
            <small>Operations dashboard</small>
          </div>
        </div>
        <p className="nav-heading">APPLICATION MODULES</p>
        {modules.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${activeModule === item.key ? "selected" : ""}`}
            onClick={() => setActiveModule(item.key)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">SOS / OPERATIONS</p>
            <h1>{current.label}</h1>
          </div>
          <span className="status-pill">Development environment</span>
        </header>

        {message && <div className="message">{message}</div>}

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Create a record</h2>
              <p>Enter the details below and save them to the database.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="record-form">
            {current.fields.map((field) => {
              const isLongText = ["description", "notes", "originalText", "translatedText", "impactSummary", "transcriptText", "comments", "summary"].includes(field);
              const isDate = ["inspectionDate", "observedAt", "shiftStart", "shiftEnd", "recordedAt"].includes(field);
              const isNumber = ["passengerCount", "quantity"].includes(field);
              return (
                <label key={field} className={isLongText ? "wide-field" : ""}>
                  <span>{humanize(field)}</span>
                  {isLongText ? (
                    <textarea
                      rows="3"
                      value={form[field] || ""}
                      onChange={(event) => updateField(field, event.target.value)}
                    />
                  ) : (
                    <input
                      type={isDate ? "datetime-local" : isNumber ? "number" : "text"}
                      value={form[field] || ""}
                      onChange={(event) => updateField(field, event.target.value)}
                      required={["name", "incidentId", "title", "roadName", "location", "facilityName", "facilityType", "inspector", "inspectionDate", "sourceLanguage", "targetLanguage", "originalText", "translatedText", "requester", "transportType", "pickupLocation", "destination", "passengerCount", "condition", "impactSummary", "responderName", "role", "shiftStart", "shiftEnd", "channel", "transcriptText", "recordedBy", "recordedAt", "requestTitle", "resourceType", "quantity", "requestedBy", "reportingPeriod", "summary", "preparedBy"].includes(field)}
                    />
                  )}
                </label>
              );
            })}
            <div className="form-actions wide-field">
              <button type="submit" className="primary-button">Save record</button>
              <button type="button" className="secondary-button" onClick={() => setForm({})}>Clear form</button>
            </div>
          </form>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Recent records</h2>
              <p>Records saved for this module.</p>
            </div>
            <button className="secondary-button" onClick={loadRecords}>Refresh</button>
          </div>

          {loading ? <p className="empty-state">Loading records…</p> : records.length === 0 ? (
            <p className="empty-state">No records yet. Create one using the form above.</p>
          ) : (
            <div className="record-list">
              {records.map((record) => (
                <article className="record-card" key={record._id}>
                  <div className="record-content">
                    <strong>{record.data.name || record.data.title || record.data.facilityName || record.data.requestTitle || record.data.responderName || record.data.location || "Record"}</strong>
                    <p>{Object.entries(record.data).filter(([, value]) => value).slice(0, 4).map(([key, value]) => `${humanize(key)}: ${value}`).join(" · ")}</p>
                    <small>Created {new Date(record.createdAt).toLocaleString()}</small>
                  </div>
                  <button className="delete-button" onClick={() => handleDelete(record._id)}>Delete</button>
                </article>
              ))}
            </div>
          )}
        </section>
        <footer>Emergency Response Platform · Starter application</footer>
      </main>
    </div>
  );
}
