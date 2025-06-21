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
let zindex = 10;
function makeDraggable(el) {
  const titleBar = el.querySelector(".title-bar");
  let offsetX, offsetY;

  el.style.zIndex = zindex;

  titleBar.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    zindex++;
    el.style.zIndex = zindex;

    // 🧲 Temporary move handler
    const onMouseMove = (e) => {
      el.style.left = e.clientX - offsetX + "px";
      el.style.top = e.clientY - offsetY + "px";
    };

    // 🧼 Temporary up handler
    const onMouseUp = (e) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      const threshold = 10;
      const windowWidth = window.innerWidth;

      if (e.clientX < threshold) {
        el.style.top = "0";
        el.style.left = "0";
        el.style.width = "50%";
        el.style.height = "100%";
        el.classList.add("snapped-left");
      } else if (windowWidth - e.clientX < threshold) {
        el.style.top = "0";
        el.style.left = "50%";
        el.style.width = "50%";
        el.style.height = "100%";
        el.classList.add("snapped-right");
      } else if (e.clientY < threshold) {
        el.style.top = "0";
        el.style.left = "0";
        el.style.width = "100%";
        el.style.height = "100%";
        el.classList.add("maximized");
      }
    };

    // ✅ Attach only for this drag
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
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
    const appName = el.getAttribute("data-app");
    const icon = document.querySelector(`#${appName}-icon`);
    const taskbarItem = icon?.closest(".taskbar-item");

    if (taskbarItem) {
      taskbarItem.classList.remove("active");
    }
  });
}

document.getElementById("google-icon").addEventListener("click", () => {
  // Check if window already exists
  zindex++;

  let existing = document.querySelector(".window[data-app='google']");
  const taskbarItem = document.getElementById("taskbar-item-1");

  if (existing) {
    existing.style.display = "block"; // Restore if minimized
    existing.style.zIndex = zindex;
  } else {
    const win = createWindow("Google", "<p>This is Google.</p>");
    win.setAttribute("data-app", "google"); // Tag it for future reference
    win.style.zIndex = zindex;
  }

  taskbarItem.classList.add("active");
});

document.getElementById("vscode-icon").addEventListener("click", () => {
  zindex++;
  let existing = document.querySelector(".window[data-app='vscode']");
  const taskbarItem = document.getElementById("taskbar-item-2");

  if (existing) {
    existing.style.display = "block";
    existing.style.zIndex = zindex;
  } else {
    const win = createWindow("VS Code", "<p>Welcome to VS Code</p>");
    win.setAttribute("data-app", "vscode");
    win.style.zIndex = zindex;
  }

  taskbarItem.classList.add("active");

});

const calendarTable = document.getElementById("calendar-table");
const monthYearDisplay = document.getElementById("calendar-month-year");
const calendarWidget = document.getElementById("calendar-widget");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
  calendarTable.innerHTML = "";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const headerRow = document.createElement("tr");
  days.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  });
  calendarTable.appendChild(headerRow);

  let row = document.createElement("tr");
  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement("td"));
  }

  const today = new Date();

  for (let d = 1; d <= daysInMonth; d++) {
    if ((firstDay + d - 1) % 7 === 0 && d !== 1) {
      calendarTable.appendChild(row);
      row = document.createElement("tr");
    }

    const td = document.createElement("td");
    td.textContent = d;

    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      td.classList.add("today");
    }

    row.appendChild(td);
  }
  calendarTable.appendChild(row);
}

generateCalendar(currentYear, currentMonth);

document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
});

const clockElement = document.getElementById("clock-box");
const calendarWrapper = document.getElementById(
  "calendar-notification-wrapper"
);

clockElement.addEventListener("click", () => {
  calendarWrapper.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!calendarWrapper.contains(e.target) && !clockElement.contains(e.target)) {
    calendarWrapper.classList.remove("show");
  }
});

const quickSettingsTrigger = document.getElementById("quick-settings-trigger");
const quickSettingsPanel = document.getElementById("quick-settings-panel");

// Show/hide quick settings on click
quickSettingsTrigger.addEventListener("click", () => {
  quickSettingsPanel.classList.toggle("show");
});

// Close if clicked outside
document.addEventListener("click", (e) => {
  if (
    !quickSettingsPanel.contains(e.target) &&
    !quickSettingsTrigger.contains(e.target)
  ) {
    quickSettingsPanel.classList.remove("show");
  }
});

// Toggle button active state
document.querySelectorAll(".qs-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    tile.classList.toggle("active");
  });
});

const sliders = document.querySelectorAll('.slider-box input[type="range"]');

sliders.forEach((slider) => {
  const updateSlider = () => {
    const value =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #a855f7 ${value}%, #ccc ${value}%)`;
  };

  slider.addEventListener("input", updateSlider);
  updateSlider(); // set initial fill
});

const brightnessSlider = document.getElementById("brightness-ctrl");

brightnessSlider.addEventListener("input", () => {
  const value = brightnessSlider.value;
  document.body.style.filter = `brightness(${value}%)`;
});
