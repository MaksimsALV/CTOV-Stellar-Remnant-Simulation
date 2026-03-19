const massRange = document.getElementById("massRange");
const massValue = document.getElementById("massValue");
const executeBtn = document.getElementById("executeBtn");
const result = document.getElementById("result");

massRange.addEventListener("input", () => {
    massValue.textContent = massRange.value;
});

executeBtn.addEventListener("click", async () => {
    const response = await fetch("/collapse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            coreSolarMass: parseFloat(massRange.value)
        })
    });

    if (!response.ok) {
        result.textContent = "Request failed";
        return;
    }

    const data = await response.json();
    result.textContent =
        data.remnantAfterCollapse + " | " + data.remnantSolarMass.toFixed(2) + " M☉";
});