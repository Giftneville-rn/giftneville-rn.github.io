// ========================================
// MEDICATION DOSE CALCULATOR
// ========================================

function calculateMedication() {

    const weight = parseFloat(document.getElementById("weight").value);
    const dose = parseFloat(document.getElementById("dose").value);
    const concentration = parseFloat(document.getElementById("concentration").value);

    const result = document.getElementById("medicationResult");

    if (
        isNaN(weight) ||
        isNaN(dose) ||
        isNaN(concentration) ||
        weight <= 0 ||
        dose <= 0 ||
        concentration <= 0
    ) {

        result.innerHTML =
        `<div class="error">
            Please enter valid positive values.
        </div>`;

        return;
    }

    const totalDose = weight * dose;
    const volume = totalDose / concentration;

    result.innerHTML =
    `<div class="result">

        <h3>Medication Calculation</h3>

        <br>

        Total Dose:
        <strong>${totalDose.toFixed(2)} mg</strong>

        <br><br>

        Volume to Administer:
        <strong>${volume.toFixed(2)} mL</strong>

    </div>`;
}



// ========================================
// IV INFUSION RATE
// ========================================

function calculateIV() {

    const volume = parseFloat(document.getElementById("volume").value);
    const hours = parseFloat(document.getElementById("hours").value);

    const result = document.getElementById("ivResult");

    if (
        isNaN(volume) ||
        isNaN(hours) ||
        volume <= 0 ||
        hours <= 0
    ) {

        result.innerHTML =
        `<div class="error">
            Please enter valid positive values.
        </div>`;

        return;
    }

    const rate = volume / hours;

    result.innerHTML =
    `<div class="result">

        <h3>IV Infusion Rate</h3>

        <br>

        Infusion Rate:

        <strong>${rate.toFixed(2)} mL/hour</strong>

    </div>`;
}



// ========================================
// DRIP RATE
// ========================================

function calculateDrip() {

    const volume = parseFloat(document.getElementById("dripVolume").value);
    const minutes = parseFloat(document.getElementById("minutes").value);
    const factor = parseFloat(document.getElementById("dropFactor").value);

    const result = document.getElementById("dripResult");

    if (
        isNaN(volume) ||
        isNaN(minutes) ||
        isNaN(factor) ||
        volume <= 0 ||
        minutes <= 0
    ) {

        result.innerHTML =
        `<div class="error">
            Please enter valid positive values.
        </div>`;

        return;
    }

    const drops = (volume * factor) / minutes;

    result.innerHTML =
    `<div class="result">

        <h3>Drip Rate</h3>

        <br>

        Required Flow Rate:

        <strong>${drops.toFixed(0)} drops/min</strong>

    </div>`;
}