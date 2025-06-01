let slideCount = 1;
let lastClickTime = 0;
let clickCount = 0;

const img = document.getElementById("sliderImage");
const slideText = document.getElementById("slideNumber");

function updateImage() {
  img.src = `https://picsum.photos/600/400?random=${Date.now()}`;
  slideText.textContent = `Slide: ${slideCount}`;
}

function throttleNavigation(direction) {
  const now = Date.now();

  if (now - lastClickTime > 1000) {
    // Reset the click count after throttle period
    clickCount = 1;
    lastClickTime = now;

    slideCount = direction === "next" ? slideCount + 1 : Math.max(1, slideCount - 1);
    updateImage();
  } else {
    clickCount++;
    if (clickCount > 3) {
      alert("Chill chill, loading it!!");
    }
  }
}

document.getElementById("nextBtn").addEventListener("click", () => throttleNavigation("next"));
document.getElementById("prevBtn").addEventListener("click", () => throttleNavigation("prev"));
