// ============================================
// BMI CALCULATOR
// ============================================


// =========================
// SELECT ELEMENTS
// =========================

const bmiForm = document.getElementById("bmiForm");

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const heightError = document.getElementById("heightError");
const weightError = document.getElementById("weightError");

const resetBtn = document.getElementById("resetBtn");

const emptyResult = document.getElementById("emptyResult");
const resultContent = document.getElementById("resultContent");

const bmiValue = document.getElementById("bmiValue");
const categoryBadge = document.getElementById("categoryBadge");

const idealWeight = document.getElementById("idealWeight");
const statusText = document.getElementById("statusText");

const healthMessage = document.getElementById("healthMessage");

const scaleMarker = document.getElementById("scaleMarker");

const historyContainer =
    document.getElementById("historyContainer");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");

const themeBtn =
    document.getElementById("themeBtn");


// =========================
// FORM SUBMIT
// =========================

bmiForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);


    // Validate inputs

    if (!validateInput(height, weight)) {
        return;
    }


    // Convert cm to meters

    const heightInMeters = height / 100;


    // BMI formula

    const bmi =
        weight / (heightInMeters * heightInMeters);


    // Round BMI

    const roundedBMI =
        Number(bmi.toFixed(1));


    // Get category

    const result =
        getBMICategory(roundedBMI);


    // Calculate ideal weight

    const ideal =
        calculateIdealWeight(heightInMeters);


    // Display result

    displayResult(
        roundedBMI,
        result,
        ideal
    );


    // Save result

    saveHistory(
        roundedBMI,
        result.category
    );

});


// =========================
// VALIDATION
// =========================

function validateInput(height, weight) {

    let valid = true;


    // Height validation

    if (heightInput.value.trim() === "") {

        heightError.textContent =
            "Height is required.";

        valid = false;

    }

    else if (
        !Number.isFinite(height) ||
        height <= 0
    ) {

        heightError.textContent =
            "Height must be greater than 0.";

        valid = false;

    }

    else if (
        height < 50 ||
        height > 250
    ) {

        heightError.textContent =
            "Enter height between 50 and 250 cm.";

        valid = false;

    }


    // Weight validation

    if (weightInput.value.trim() === "") {

        weightError.textContent =
            "Weight is required.";

        valid = false;

    }

    else if (
        !Number.isFinite(weight) ||
        weight <= 0
    ) {

        weightError.textContent =
            "Weight must be greater than 0.";

        valid = false;

    }

    else if (
        weight < 10 ||
        weight > 300
    ) {

        weightError.textContent =
            "Enter weight between 10 and 300 kg.";

        valid = false;

    }


    return valid;
}


// =========================
// BMI CATEGORY
// =========================

function getBMICategory(bmi) {

    if (bmi < 18.5) {

        return {

            category: "Underweight",

            message:
                "Your BMI is below the standard adult range. Focus on balanced nutrition and healthy habits.",

            className: "under"

        };

    }

    else if (bmi < 25) {

        return {

            category: "Normal",

            message:
                "Your BMI falls within the standard adult range. Continue maintaining balanced nutrition and regular physical activity.",

            className: "normal"

        };

    }

    else if (bmi < 30) {

        return {

            category: "Overweight",

            message:
                "Your BMI is above the standard adult range. Regular physical activity and balanced nutrition may help support overall health.",

            className: "over"

        };

    }

    else {

        return {

            category: "Obese",

            message:
                "Your BMI is in the obesity range. Consider discussing your overall health and goals with a healthcare professional.",

            className: "obese"

        };

    }

}


// =========================
// IDEAL WEIGHT
// =========================

function calculateIdealWeight(heightInMeters) {

    const minimum =
        18.5 * heightInMeters * heightInMeters;

    const maximum =
        24.9 * heightInMeters * heightInMeters;


    return `${minimum.toFixed(1)} – ${maximum.toFixed(1)} kg`;
}


// =========================
// DISPLAY RESULT
// =========================

function displayResult(
    bmi,
    result,
    ideal
) {

    // Hide empty state

    emptyResult.classList.add("hidden");

    // Show result

    resultContent.classList.remove("hidden");


    // BMI

    bmiValue.textContent =
        bmi.toFixed(1);


    // Category

    categoryBadge.textContent =
        result.category;


    // Category colors

    if (result.category === "Underweight") {

        categoryBadge.style.background =
            "rgba(96,165,250,0.15)";

        categoryBadge.style.color =
            "#3b82f6";

    }

    else if (result.category === "Normal") {

        categoryBadge.style.background =
            "rgba(34,197,94,0.15)";

        categoryBadge.style.color =
            "#16a34a";

    }

    else if (result.category === "Overweight") {

        categoryBadge.style.background =
            "rgba(245,158,11,0.15)";

        categoryBadge.style.color =
            "#d97706";

    }

    else {

        categoryBadge.style.background =
            "rgba(239,68,68,0.15)";

        categoryBadge.style.color =
            "#dc2626";

    }


    // Ideal weight

    idealWeight.textContent =
        ideal;


    // Status

    statusText.textContent =
        result.category;


    // Health message

    healthMessage.textContent =
        result.message;


    healthMessage.style.background =
        getMessageBackground(result.category);


    // Scale marker

    updateScaleMarker(bmi);
}


// =========================
// HEALTH MESSAGE BACKGROUND
// =========================

function getMessageBackground(category) {

    if (category === "Underweight") {

        return "rgba(96,165,250,0.12)";

    }

    if (category === "Normal") {

        return "rgba(34,197,94,0.12)";

    }

    if (category === "Overweight") {

        return "rgba(245,158,11,0.12)";

    }

    return "rgba(239,68,68,0.12)";
}


// =========================
// SCALE MARKER
// =========================

function updateScaleMarker(bmi) {

    let position;


    /*
        We visually map:

        BMI 15  -> 0%
        BMI 18.5 -> ~22%
        BMI 25 -> ~55%
        BMI 30 -> ~75%
        BMI 40 -> 100%
    */


    if (bmi <= 15) {

        position = 0;

    }

    else if (bmi >= 40) {

        position = 100;

    }

    else {

        position =
            ((bmi - 15) / 25) * 100;

    }


    scaleMarker.style.left =
        `${position}%`;
}


// =========================
// RESET
// =========================

resetBtn.addEventListener("click", function () {

    bmiForm.reset();

    clearErrors();

    emptyResult.classList.remove("hidden");

    resultContent.classList.add("hidden");

});


function clearErrors() {

    heightError.textContent = "";

    weightError.textContent = "";
}


// =========================
// HISTORY
// =========================

function saveHistory(bmi, category) {

    let history =
        JSON.parse(
            localStorage.getItem("bmiHistory")
        ) || [];


    const entry = {

        bmi: bmi,

        category: category,

        date:
            new Date().toLocaleString()

    };


    history.unshift(entry);


    // Keep only latest 10

    history =
        history.slice(0, 10);


    localStorage.setItem(
        "bmiHistory",
        JSON.stringify(history)
    );


    displayHistory();
}


// =========================
// DISPLAY HISTORY
// =========================

function displayHistory() {

    const history =
        JSON.parse(
            localStorage.getItem("bmiHistory")
        ) || [];


    if (history.length === 0) {

        historyContainer.innerHTML = `

            <div class="no-history">

                <span>📋</span>

                <p>No calculations yet.</p>

            </div>

        `;

        return;
    }


    historyContainer.innerHTML =
        history.map(
            (item, index) => `

            <div class="history-item">

                <div>

                    <div class="history-bmi">

                        BMI ${item.bmi}

                    </div>

                    <div class="history-date">

                        ${item.date}

                    </div>

                </div>


                <div
                    class="history-category"
                    style="
                        background:
                        ${getHistoryBackground(item.category)};
                    "
                >

                    ${item.category}

                </div>


                <button
                    class="delete-history"
                    onclick="deleteHistory(${index})"
                    title="Delete"
                >

                    🗑️

                </button>

            </div>

        `
        ).join("");
}


// =========================
// HISTORY COLOR
// =========================

function getHistoryBackground(category) {

    if (category === "Underweight") {

        return "rgba(96,165,250,0.15)";

    }

    if (category === "Normal") {

        return "rgba(34,197,94,0.15)";

    }

    if (category === "Overweight") {

        return "rgba(245,158,11,0.15)";

    }

    return "rgba(239,68,68,0.15)";
}


// =========================
// DELETE HISTORY
// =========================

function deleteHistory(index) {

    let history =
        JSON.parse(
            localStorage.getItem("bmiHistory")
        ) || [];


    history.splice(index, 1);


    localStorage.setItem(
        "bmiHistory",
        JSON.stringify(history)
    );


    displayHistory();
}


// =========================
// CLEAR ALL HISTORY
// =========================

clearHistoryBtn.addEventListener(
    "click",
    function () {

        const history =
            JSON.parse(
                localStorage.getItem("bmiHistory")
            ) || [];


        if (history.length === 0) {

            return;

        }


        const confirmDelete =
            confirm(
                "Delete all BMI history?"
            );


        if (confirmDelete) {

            localStorage.removeItem(
                "bmiHistory"
            );

            displayHistory();

        }

    }
);


// =========================
// DARK / LIGHT MODE
// =========================

themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle("dark");


        const isDark =
            document.body.classList.contains("dark");


        themeBtn.textContent =
            isDark ? "☀️" : "🌙";


        localStorage.setItem(
            "bmiTheme",
            isDark ? "dark" : "light"
        );

    }
);


// =========================
// LOAD THEME
// =========================

function loadTheme() {

    const savedTheme =
        localStorage.getItem("bmiTheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";

    }

}


loadTheme();


// =========================
// LOAD HISTORY
// =========================

displayHistory();