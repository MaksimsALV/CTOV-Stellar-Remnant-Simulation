const massRange = document.getElementById("massRange");
const massValue = document.getElementById("massValue");
const executeBtn = document.getElementById("executeBtn");
const result = document.getElementById("result");
const resultVideo = document.getElementById("resultVideo");
const resultImage = document.getElementById("resultImage");

const blackHoleVideoPath = "/videos/black-hole.mp4";
const neutronStarVideoPath = "/videos/Neutron_star_from_supernova.webm";
const whiteDwarfImagePath = "/images/white-dwarf.jpg";

massRange.addEventListener("input", () => {
    massValue.textContent = massRange.value;
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
        showVideo(blackHoleVideoPath);
    } else if (type.includes("neutron")) {
        showVideo(neutronStarVideoPath);
    } else {
        resultImage.src = whiteDwarfImagePath;
        resultImage.style.display = "block";
    }
});

function showVideo(path) {
    resultVideo.src = path;
    resultVideo.style.display = "block";
    resultVideo.load();
    resultVideo.currentTime = 0;
    resultVideo.play().catch(() => {});
}

function hideMedia() {
    resultVideo.pause();
    resultVideo.removeAttribute("src");
    resultVideo.load();
    resultVideo.style.display = "none";

    resultImage.removeAttribute("src");
    resultImage.style.display = "none";
}