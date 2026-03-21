const massRange = document.getElementById("massRange");
const massValue = document.getElementById("massValue");
const executeBtn = document.getElementById("executeBtn");
const result = document.getElementById("result");
const resultVideo = document.getElementById("resultVideo");

const blackHoleVideoPath = "/videos/black-hole.mp4";
const neutronStarVideoPath = "/videos/Neutron_star_from_supernova.webm";
const whiteDwarfVideoPath = "/videos/WDStar_4k_60fps_ProRes.webm";
const skyMapVideoPath = "/videos/skymap.webm";

const FADE_DURATION_MS = 4000;

massRange.addEventListener("input", () => {
    massValue.textContent = massRange.value;
});

window.addEventListener("load", () => {
    resultVideo.style.transition = `opacity ${FADE_DURATION_MS}ms ease`;
    playVideo(skyMapVideoPath, 0.5);
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
        `${data.remnantAfterCollapse} | ${Number(data.remnantSolarMass).toFixed(2)} M☉`;

    const type = data.remnantAfterCollapse.toLowerCase();

    if (type.includes("black")) {
        showVideo(blackHoleVideoPath, 0.5);
    } else if (type.includes("neutron")) {
        showVideo(neutronStarVideoPath, 1);
    } else {
        showVideo(whiteDwarfVideoPath, 2.5);
    }
});

function playVideo(path, speed) {
    resultVideo.src = path;
    resultVideo.load();

    resultVideo.onloadedmetadata = () => {
        resultVideo.currentTime = 0;
        resultVideo.playbackRate = speed;
        resultVideo.play().catch(() => {});
    };
}

function showVideo(path, speed = 1) {
    resultVideo.style.opacity = "0";

    setTimeout(() => {
        playVideo(path, speed);
        resultVideo.style.opacity = "1";
    }, FADE_DURATION_MS);
}