function updateDateTime() {
  const now = new Date();

  // Format time: HH:mm
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const timeStr = `${hours}:${minutes}`;

  // Format date: DD-MM-YYYY
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const year = now.getFullYear();
  const dateStr = `${day}-${month}-${year}`;

  // Set in DOM
  document.getElementById("time").textContent = timeStr;
  document.getElementById("date").textContent = dateStr;
}

// Update every second
setInterval(updateDateTime, 1000);
// Run immediately once
updateDateTime();

// document.getElementById("google-icon").addEventListener("click", function() {
//     window.location.href = "https://www.google.com/"
// });

function createWindow(appName, contentHTML) {
  const windowEl = document.createElement("div");
  windowEl.className = "window";
  windowEl.innerHTML = `
    <div class="title-bar">
      <span>${appName}</span>
      <div class="title-bar-buttons">
        <button class="minimize">—</button>
        <button class="maximize">🗖</button>
        <button class="close">✖</button>
      </div>
    </div>
    <div class="window-content">${contentHTML}</div>
  `;

  document.getElementById("desktop").appendChild(windowEl);

  makeDraggable(windowEl);
  addWindowControls(windowEl);

  return windowEl; // ✅ So we can use it later
}

// 🖱️ Make window draggable
function makeDraggable(el) {
  const titleBar = el.querySelector(".title-bar");
  let isDragging = false;
  let offsetX, offsetY;

  titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      el.style.left = e.clientX - offsetX + "px";
      el.style.top = e.clientY - offsetY + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

// 🎛️ Window buttons logic
function addWindowControls(el) {
  const minimizeBtn = el.querySelector(".minimize");
  const maximizeBtn = el.querySelector(".maximize");
  const closeBtn = el.querySelector(".close");
  const content = el.querySelector(".window-content");

  minimizeBtn.addEventListener("click", () => {
    el.style.display = "none"; // Hide the whole window
  });

  maximizeBtn.addEventListener("click", () => {
    if (el.classList.contains("maximized")) {
      el.style.top = "100px";
      el.style.left = "100px";
      el.style.width = "600px";
      el.style.height = "400px";
      el.classList.remove("maximized");
    } else {
      el.style.top = "0";
      el.style.left = "0";
      el.style.width = "100%";
      el.style.height = "100%";
      el.classList.add("maximized");
    }
  });

  closeBtn.addEventListener("click", () => {
    el.remove();
  });
}

document.getElementById("google-icon").addEventListener("click", () => {
  // Check if window already exists
  let existing = document.querySelector(".window[data-app='google']");
  if (existing) {
    existing.style.display = "block"; // Restore if minimized
  } else {
    const win = createWindow("Google", "<p>This is Google.</p>");
    win.setAttribute("data-app", "google"); // Tag it for future reference
  }
});
