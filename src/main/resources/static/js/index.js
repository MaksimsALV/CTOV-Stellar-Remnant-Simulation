const massRange = document.getElementById("massRange");
const massValue = document.getElementById("massValue");
const executeBtn = document.getElementById("executeBtn");
const result = document.getElementById("result");
const resultVideo = document.getElementById("resultVideo");
const resultImage = document.getElementById("resultImage");

const blackHoleVideoPath = "/videos/black-hole.mp4";

massRange.addEventListener("input", () => {
    massValue.textContent = massRange.value;
});

window.addEventListener("load", () => {
    resultVideo.src = blackHoleVideoPath;
    resultVideo.load();
});

executeBtn.addEventListener("click", async () => {
    hideMedia();

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
        data.remnantAfterCollapse + " | " + Number(data.remnantSolarMass).toFixed(2) + " M☉";

    const type = data.remnantAfterCollapse.toLowerCase();

    if (type.includes("black")) {
        resultVideo.style.display = "block";
        resultVideo.currentTime = 0;
        resultVideo.play();
    } else if (type.includes("neutron")) {
        resultImage.src = "/images/neutron-star.jpg";
        resultImage.style.display = "block";
    } else {
        resultImage.src = "/images/white-dwarf.jpg";
        resultImage.style.display = "block";
    }
});

function hideMedia() {
    resultVideo.pause();
    resultVideo.style.display = "none";

    resultImage.removeAttribute("src");
    resultImage.style.display = "none";
}