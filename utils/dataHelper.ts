import * as fs from "fs";
import * as path from "path";

const RUNTIME_DATA_PATH = path.join(__dirname, "..", "test-data", "runtime-data.json")

export function saveIncidentNumber(incNumber: string): void {
    fs.writeFileSync(RUNTIME_DATA_PATH, JSON.stringify({ incidentNumber: incNumber }), "utf-8")
}

export function loadIncidentNumber(): string {
    const raw = fs.readFileSync(RUNTIME_DATA_PATH, "utf-8")
    return JSON.parse(raw).incidentNumber
}
