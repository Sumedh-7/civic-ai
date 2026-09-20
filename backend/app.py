from services.db import save_report
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from services.ai import analyze_image


app = FastAPI(title="CivicAI API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "CivicAI API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    description: str = Form("")
):
    image_bytes = await image.read()

    result = analyze_image(
        image_bytes=image_bytes,
        mime_type=image.content_type,
        description=description,
    )

    return result
from typing import Optional

@app.post("/reports")
async def create_report(
    issue: str = Form(...),
    category: str = Form(...),
    severity: str = Form(...),
    confidence: str = Form(...),
    recommendation: str = Form(...),
    description: str = Form(""),
    latitude: str = Form(""),
    longitude: str = Form(""),
):
    print("REPORT RECEIVED:")
    print("issue:", issue)
    print("category:", category)
    print("severity:", severity)
    print("confidence:", confidence)
    print("recommendation:", recommendation)
    print("description:", description)
    print("latitude:", latitude)
    print("longitude:", longitude)

    lat = None
    lng = None

    if latitude and latitude.lower() not in ["null", "undefined", ""]:
        lat = float(latitude)

    if longitude and longitude.lower() not in ["null", "undefined", ""]:
        lng = float(longitude)

    report = {
        "issue": issue,
        "category": category,
        "severity": severity,
        "confidence": float(confidence),
        "recommendation": recommendation,
        "description": description,
        "latitude": lat,
        "longitude": lng,
        "status": "Reported",
    }

    saved = save_report(report)

    return {
        "success": True,
        "report": saved[0] if saved else report
    }

@app.get("/reports")
def get_reports():
    from services.db import supabase

    response = (
        supabase
        .table("reports")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )

    return response.data