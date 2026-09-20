import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";import { useEffect, useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  FileText,
  CheckCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://civic-ai-backend-2mmb.onrender.com/reports");

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const high = reports.filter(
    (r) => r.severity?.toLowerCase() === "high"
  ).length;

  const medium = reports.filter(
    (r) => r.severity?.toLowerCase() === "medium"
  ).length;

  const resolved = reports.filter(
    (r) => r.status?.toLowerCase() === "resolved"
  ).length;

  return (
    <div className="dashboard-page">

      <nav className="dashboard-nav">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="dashboard-logo">
          <div>C</div>
          CivicAI
        </div>

        <button
          className="refresh-button"
          onClick={fetchReports}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </nav>

      <main className="dashboard-container">

        <div className="dashboard-heading">
          <span>CIVICAI DASHBOARD</span>
          <h1>Community Issues</h1>
          <p>
            Track reported civic problems and their current status.
          </p>
        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">
              <FileText size={22} />
            </div>

            <div>
              <span>Total Reports</span>
              <strong>{reports.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <AlertTriangle size={22} />
            </div>

            <div>
              <span>High Severity</span>
              <strong>{high}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Clock size={22} />
            </div>

            <div>
              <span>Medium Severity</span>
              <strong>{medium}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <CheckCircle size={22} />
            </div>

            <div>
              <span>Resolved</span>
              <strong>{resolved}</strong>
            </div>
          </div>

        </div>

<section className="map-section">
  <div className="section-header">
    <div>
      <h2>Issue Map</h2>
      <p>Reported community problems by location</p>
    </div>
  </div>

  <div className="map-container">
    <MapContainer
      center={[18.5204, 73.8567]}
      zoom={12}
      style={{ height: "420px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports
        .filter(
          (report) =>
            report.latitude !== null &&
            report.longitude !== null
        )
        .map((report) => (
          <Marker
            key={report.id}
            position={[
              report.latitude,
              report.longitude,
            ]}
          >
            <Popup>
              <strong>{report.issue}</strong>
              <br />
              Category: {report.category}
              <br />
              Severity: {report.severity}
              <br />
              Status: {report.status}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  </div>
</section>

        {/* REPORTS */}

        <section className="reports-section">

          <div className="section-header">
            <h2>Recent Reports</h2>

            <button
              className="new-report-button"
              onClick={() => navigate("/report")}
            >
              + Report Issue
            </button>
          </div>

          {loading ? (
            <div className="loading">
              Loading reports...
            </div>
          ) : reports.length === 0 ? (
            <div className="empty-dashboard">
              <h3>No reports yet</h3>
              <p>Community reports will appear here.</p>
            </div>
          ) : (
            <div className="reports-list">

              {reports.map((report) => (
                <div
                  className="report-item"
                  key={report.id}
                >

                  <div className="report-item-main">

                    <div className="report-status-icon">
                      <AlertTriangle size={20} />
                    </div>

                    <div>
                      <h3>{report.issue}</h3>

                      <p>
                        {report.description ||
                          "No description provided"}
                      </p>

                      <span className="category">
                        {report.category}
                      </span>
                    </div>

                  </div>

                  <div className="report-meta">

                    <span
                      className={`severity-badge ${report.severity?.toLowerCase()}`}
                    >
                      {report.severity}
                    </span>

                    <span className="status-badge">
                      {report.status}
                    </span>

                    <small>
                      {report.created_at
                        ? new Date(
                            report.created_at
                          ).toLocaleString()
                        : ""}
                    </small>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default Dashboard;