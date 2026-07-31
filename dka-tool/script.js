function assessDKA() {

    const glucose = parseFloat(document.getElementById("glucose").value);
    const ph = parseFloat(document.getElementById("ph").value);
    const bicarb = parseFloat(document.getElementById("bicarb").value);
    const potassium = parseFloat(document.getElementById("potassium").value);
    const ketones = document.getElementById("ketones").value;
    const mental = document.getElementById("mental").value;

    const results = document.getElementById("results");

    // Basic validation
    if (
        isNaN(glucose) ||
        isNaN(ph) ||
        isNaN(bicarb) ||
        isNaN(potassium)
    ) {

        results.style.display = "block";

        results.innerHTML = `
            <div class="danger">
                <h2>Missing Information</h2>
                <p>Please complete all patient values before assessment.</p>
            </div>
        `;

        return;
    }

    let severity = "No DKA";
    let severityClass = "success";

    if (
        ketones === "positive" &&
        glucose >= 13.9
    ) {

        if (
            ph < 7.00 ||
            bicarb < 10 ||
            mental === "Unconscious"
        ) {

            severity = "Severe DKA";
            severityClass = "danger";

        } else if (
            ph < 7.24 ||
            bicarb < 15 ||
            mental === "Confused"
        ) {

            severity = "Moderate DKA";
            severityClass = "alert";

        } else if (
            ph < 7.30 ||
            bicarb < 18
        ) {

            severity = "Mild DKA";
            severityClass = "success";
        }
    }

    let potassiumAdvice = "";

    if (potassium < 3.3) {

        potassiumAdvice = `
        <div class="danger">
            <strong>⚠ Critical Potassium Alert</strong><br><br>
            Potassium is below 3.3 mmol/L.<br>
            Delay insulin therapy until potassium has been replaced.
        </div>
        `;

    } else if (potassium <= 5.2) {

        potassiumAdvice = `
        <div class="alert">
            <strong>Potassium Monitoring</strong><br><br>
            Continue potassium replacement and monitor electrolytes closely.
        </div>
        `;

    } else {

        potassiumAdvice = `
        <div class="success">
            Potassium is elevated. Do not replace potassium immediately.
            Continue close ECG and electrolyte monitoring.
        </div>
        `;
    }

    results.style.display = "block";

    results.innerHTML = `

<div class="report">

    <h2 class="result-title">🩺 DKA Clinical Assessment Report</h2>

    <hr>

    <div class="result-section">
        <h3>Patient Assessment</h3>

        <p><strong>Blood Glucose:</strong> ${glucose} mmol/L</p>
        <p><strong>Blood pH:</strong> ${ph}</p>
        <p><strong>Bicarbonate:</strong> ${bicarb} mmol/L</p>
        <p><strong>Potassium:</strong> ${potassium} mmol/L</p>
        <p><strong>Ketones:</strong> ${ketones}</p>
        <p><strong>Mental Status:</strong> ${mental}</p>
    </div>

    <hr>

    <div class="${severityClass}">
        <h3>Clinical Classification</h3>
        <h2>${severity}</h2>
    </div>

    <hr>

    ${potassiumAdvice}

    <div class="result-section">
        <h3>Recommended Initial Management</h3>

        <ul>
            <li>💧 Begin isotonic IV fluids.</li>
            <li>💉 Assess potassium before insulin therapy.</li>
            <li>🧪 Monitor blood glucose hourly.</li>
            <li>🩸 Repeat electrolytes and blood gases every 2–4 hours.</li>
            <li>❤️ Continuous ECG monitoring if potassium is abnormal.</li>
            <li>🚽 Monitor urine output and hydration status.</li>
        </ul>
    </div>

    <hr>

    <div class="result-section">
        <h3>Clinical Reminder</h3>

        <p>
            This assessment is based on evidence-based DKA management principles.
            Always follow your hospital protocol and consult senior clinicians where appropriate.
        </p>
    </div>

        <hr>

    <div style="margin-top:25px; display:flex; gap:15px; flex-wrap:wrap;">

        <button onclick="window.print()">
            🖨️ Print Report
        </button>

        <button onclick="location.reload()">
            🔄 New Assessment
        </button>

    </div>

</div>

`;
}