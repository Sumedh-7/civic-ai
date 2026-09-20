import { useState } from "react";
import {
  Upload,
  MapPin,
  ArrowLeft,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Report.css";

function Report() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);

        setLocation(`${lat}, ${lng}`);
      },
      () => {
        alert("Unable to get your location.");
      }
    );
  };

  const analyzeIssue = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("description", description);

      const response = await fetch("https://civic-ai-backend-2mmb.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("AI analysis failed");
      }

      const data = await response.json();

      setResult({
        issue: data.issue,
        category: data.category,
        severity: data.severity,
        confidence: Math.round(data.confidence * 100),
        recommendation: data.recommendation,
      });
    } catch (error) {
      console.error(error);
      alert("Unable to analyze the image. Make sure the backend is running.");
    } finally {
      setAnalyzing(false);
    }
  };

  const submitReport = async () => {
    if (!result) {
      alert("Please analyze the issue first.");
      return;
    }

    setSubmitting(true);

    try {
      let latitude = null;
      let longitude = null;

      if (location.includes(",")) {
        const parts = location.split(",");
        latitude = parseFloat(parts[0]);
        longitude = parseFloat(parts[1]);
      }

      const formData = new FormData();

      formData.append("issue", result.issue);
      formData.append("category", result.category);
      formData.append("severity", result.severity);
      formData.append("confidence", result.confidence / 100);
      formData.append("recommendation", result.recommendation);
      formData.append("description", description);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
      }

      const response = await fetch("https://civic-ai-backend-2mmb.onrender.com/reports", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      alert("Report submitted successfully! 🎉");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Unable to submit report. Make sure the backend is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="report-page">
      <nav className="report-nav">
        <button className="back-button" onClick={() => navigate("/")}>
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="report-logo">
          <div>C</div>
          CivicAI
        </div>
      </nav>

      <main className="report-container">
        <div className="report-heading">
          <span>REPORT AN ISSUE</span>
          <h1>Help make your community better.</h1>
          <p>
            Upload a photo, provide some details, and let AI analyze the
            problem.
          </p>
        </div>

        <div className="report-grid">

          {/* LEFT */}
          <div className="report-form">

            <div className="form-card">
              <label>1. Upload an image</label>

              <div className="upload-box">
                {preview ? (
                  <img src={preview} alt="Selected issue" />
                ) : (
                  <>
                    <Upload size={30} />
                    <strong>Upload an image</strong>
                    <span>PNG, JPG or JPEG</span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImage}
                />
              </div>
            </div>

            <div className="form-card">
              <label>2. Describe the problem</label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: There has been garbage piling up near the road for several days..."
              />
            </div>

            <div className="form-card">
              <label>3. Location</label>

              <div className="location-row">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location or use GPS"
                />

                <button onClick={getLocation}>
                  <MapPin size={17} />
                  Use GPS
                </button>
              </div>
            </div>

            <button
              className="analyze-button"
              onClick={analyzeIssue}
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <Loader2 className="spin" size={19} />
                  AI is analyzing...
                </>
              ) : (
                <>Analyze with AI →</>
              )}
            </button>

          </div>

          {/* RIGHT */}
          <div className="result-area">

            {!result ? (
              <div className="empty-result">
                <div className="empty-icon">🤖</div>

                <h3>AI Analysis</h3>

                <p>
                  Your analysis results will appear here after you upload an
                  image.
                </p>
              </div>
            ) : (
              <div className="result-card">

                <div className="result-header">
                  <div>
                    <span>AI ANALYSIS</span>
                    <h2>Issue Detected</h2>
                  </div>

                  <CheckCircle size={26} />
                </div>

                <div className="result-main">
                  <div className="result-icon">🗑️</div>

                  <h2>{result.issue}</h2>

                  <span className="confidence">
                    {result.confidence}% confidence
                  </span>
                </div>

                <div className="result-row">
                  <span>Category</span>
                  <strong>{result.category}</strong>
                </div>

                <div className="result-row">
                  <span>Severity</span>
                  <strong className="severity">
                    {result.severity}
                  </strong>
                </div>

                <div className="recommendation">
                  <span>RECOMMENDED ACTION</span>
                  <p>{result.recommendation}</p>
                </div>

                <button
                  className="submit-button"
                  onClick={submitReport}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="spin" size={18} />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </button>

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default Report;