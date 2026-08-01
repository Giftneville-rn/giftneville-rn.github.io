function evaluateResponses() {

    const question = document.getElementById("question").value.trim();
    const responseA = document.getElementById("responseA").value.trim().toLowerCase();
    const responseB = document.getElementById("responseB").value.trim().toLowerCase();

    const results = document.getElementById("results");

    if (question === "" || responseA === "" || responseB === "") {

        results.innerHTML = `
            <div class="error">
                <h3>Missing Information</h3>
                <p>Please complete all fields before evaluating the responses.</p>
            </div>
        `;

        return;
    }

    function scoreResponse(response){

        let score = 0;
        let comments = [];

        // Clinical reasoning
        if(response.includes("assessment")){
            score += 2;
            comments.push("✔ Mentions patient assessment");
        }

        if(response.includes("monitor")){
            score += 2;
            comments.push("✔ Includes patient monitoring");
        }

        if(response.includes("potassium")){
            score += 3;
            comments.push("✔ Considers potassium management");
        }

        if(response.includes("insulin")){
            score += 2;
            comments.push("✔ Discusses insulin therapy");
        }

        if(response.includes("fluid") || response.includes("iv fluids")){
            score += 3;
            comments.push("✔ Includes fluid management");
        }

        if(response.includes("electrolytes")){
            score += 2;
            comments.push("✔ Mentions electrolyte monitoring");
        }

        if(response.includes("evidence") || response.includes("guideline")){
            score += 2;
            comments.push("✔ References evidence-based practice");
        }

        // Safety penalty
        if(response.includes("immediately") && !response.includes("potassium")){
            score -= 2;
            comments.push("⚠ May recommend treatment without checking potassium");
        }

        return { score, comments };

    }

    const A = scoreResponse(responseA);
    const B = scoreResponse(responseB);

    let winner;

    if(A.score > B.score){
        winner = "🏆 Response A";
    }else if(B.score > A.score){
        winner = "🏆 Response B";
    }else{
        winner = "🤝 Tie";
    }

    results.innerHTML = `

    <div class="report">

        <h2>Evaluation Report</h2>

        <hr><br>

        <h3>Clinical Question</h3>

        <p>${question}</p>

        <br>

        <div class="score">

            <h3>Response A</h3>

            <p><strong>Score:</strong> ${A.score}/16</p>

            <ul>

                ${A.comments.map(item => `<li>${item}</li>`).join("")}

            </ul>

        </div>

        <br>

        <div class="score">

            <h3>Response B</h3>

            <p><strong>Score:</strong> ${B.score}/16</p>

            <ul>

                ${B.comments.map(item => `<li>${item}</li>`).join("")}

            </ul>

        </div>

        <br>

        <div class="warning">

            <h2>${winner}</h2>

            <p>
                The selected response achieved the higher clinical reasoning score
                based on the evaluation criteria used by this educational tool.
            </p>

        </div>

    </div>

    `;

}