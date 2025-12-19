const unitCategories = {
    "Volume": ["teaspoon (tsp)", "tablespoon (tbsp)", "fluid ounce (fl oz)", "cup", "pint (pt)", "quart (qt)", "gallon (gal)", "milliliter (ml)", "liter (L)"],
    "Mass": ["ounce (oz)", "grams (g)", "pound (lb)", "kilogram (kg)"],
    "Temperature": ["fahrenheit (F)", "celsius (C)"]
};

const volumeConversions = {
    "teaspoon (tsp)": 4.92892,
    "tablespoon (tbsp)": 14.7868,
    "fluid ounce (fl oz)": 29.5735,
    "cup": 240,
    "pint (pt)": 473.176,
    "quart (qt)": 946.353,
    "gallon (gal)": 3785.41,
    "milliliter (ml)": 1,
    "liter (L)": 1000
};

const massConversions = {
    "ounce (oz)": 28.3495,
    "grams (g)": 1,
    "pound (lb)": 453.592,
    "kilogram (kg)": 1000
};

const unitCategory = document.getElementById("unitType");
const inputUnit = document.getElementById("inputUnit");
const outputUnit = document.getElementById("outputUnit");
const inputValue = document.getElementById("inputValue");
const outputValue = document.getElementById("outputValue");

function updateUnits() {
    const category = unitCategory.value;

    inputUnit.replaceChildren();
    outputUnit.replaceChildren();

    for (const x of unitCategories[category]) {
        const option1 = document.createElement("option");
        option1.value = x;
        option1.textContent = x;
        inputUnit.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = x;
        option2.textContent = x;
        outputUnit.appendChild(option2);
    }
}

updateUnits();

unitCategory.addEventListener("change", () => {
    updateUnits();
    inputValue.value = "";
    outputValue.textContent = "";
});

function convert() {
    const value = parseFloat(inputValue.value);
    if (isNaN(value)) {
        outputValue.textContent = "";
        return;
    }

    const category = unitCategory.value;
    const from = inputUnit.value;
    const to = outputUnit.value;
    let result;

    if (category === "Volume") {
        result = value * volumeConversions[from] / volumeConversions[to];
        outputValue.textContent = result.toFixed(2) + ` ${to}`;
    } else if (category === "Mass") {
        result = value * massConversions[from] / massConversions[to];
        outputValue.textContent = result.toFixed(2) + ` ${to}`;
    } else if (category === "Temperature") {
        if (from === to) {
            result = value;
        } else if (from === "celsius (C)" && to === "fahrenheit (F)") {
            result = value * 9/5 + 32;
        } else if (from === "fahrenheit (F)" && to === "celsius (C)") {
            result = (value - 32) * 5/9;
        }
        outputValue.textContent = result.toFixed(2) + ` ${to}`;
    }
}

inputValue.addEventListener("input", convert);
inputUnit.addEventListener("change", convert);
outputUnit.addEventListener("change", convert);
unitCategory.addEventListener("change", convert);
