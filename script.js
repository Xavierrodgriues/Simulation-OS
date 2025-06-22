const windowContentMap = {
  "recycle-bin": `
  <div class="explorer-container">
    <div class="explorer-toolbar">
      <button class="toolbar-btn">New</button>
      <button class="toolbar-btn">✂️</button>
      <button class="toolbar-btn">📋</button>
      <button class="toolbar-btn">🗑️</button>
      <button class="toolbar-btn">Sort</button>
      <button class="toolbar-btn">View</button>
    </div>
    <div class="explorer-body">
      <div class="explorer-sidebar">
        
      </div>
      <div class="explorer-main">
        <h4>Recycle Bin</h4>
        <div class="drive">
          
          <div class="drive-info">
            <div class="drive-name">Empty </div>
            <div class="drive-bar">
              <div class="recycle-bar-used" style="width: 0%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`,
  "my-computer": `
  <div class="explorer-container">
    <div class="explorer-toolbar">
      <button class="toolbar-btn">New</button>
      <button class="toolbar-btn">✂️</button>
      <button class="toolbar-btn">📋</button>
      <button class="toolbar-btn">🗑️</button>
      <button class="toolbar-btn">Sort</button>
      <button class="toolbar-btn">View</button>
    </div>
    <div class="explorer-body">
      <div class="explorer-sidebar">
        <ul>
          <li>🏠 Home</li>
          <li>📷 Gallery</li>
          <li>☁️ OneDrive - Personal</li>
          <li>🖥️ Desktop</li>
          <li>⬇️ Downloads</li>
          <li>📄 Documents</li>
          <li>🖼️ Pictures</li>
          <li>🎵 Music</li>
          <li>🎬 Videos</li>
          <li>📁 Sheryians</li>
          <li>📁 pdf-chatbot</li>
          <li>📁 assets</li>
          <li>📁 Screenshots</li>
          <li id="this-pc">💻 This PC</li>
          <li id="c-drive">💾 Windows (C:)</li>
          <li>🌐 Network</li>
        </ul>
      </div>
      <div class="explorer-main">
        <h4>Devices and Drives</h4>
        <div class="drive">
          <div class="drive-icon">💾</div>
          <div class="drive-info">
            <div class="drive-name">Windows (C:)</div>
            <div class="drive-bar">
              <div class="drive-bar-used" style="width: 90%;"></div>
            </div>
            <div class="drive-space">47.8 GB free of 475 GB</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`,
};

function getDesktopIconsHTML() {
  const desktopIcons = document.querySelectorAll("#desktop .desktop-icon");
  let html = `
    <div class="desktop-icons" style="display: flex; flex-wrap: wrap; gap: 30px; padding: 10px;">
  `;

  desktopIcons.forEach((icon) => {
    const imgSrc = icon.querySelector("img").src;
    const label = icon.querySelector(".icon-label").textContent;
    const app = icon.dataset.app;

    html += `
      <div class="icon" data-app="${app}" style="text-align: center; cursor: pointer; width: 80px;">
        <img src="${imgSrc}" style="width: 48px; height: 48px;" />
        <div class="icon-label" style="font-size: 12px; margin-top: 4px;">${label}</div>
      </div>
    `;
  });

  html += "</div>";
  return html;
}

function setupExplorerSidebar(win, appName) {
  const mainPanel = win.querySelector(".explorer-main");
  const sidebarItems = win.querySelectorAll(".explorer-sidebar ul li");

  const panelContent = {
    "⬇️ Downloads": "<h4>Downloads</h4><p>No downloads available.</p>",
    "📄 Documents": "<h4>Documents</h4><p>No documents found.</p>",
    "🖼️ Pictures": "<h4>Pictures</h4><p>No pictures available.</p>",
    "🎵 Music": "<h4>Music</h4><p>No music files available.</p>",
    "🎬 Videos": "<h4>Videos</h4><p>No video files available.</p>",
    "📷 Gallery": "<h4>Gallery</h4><p>Gallery is empty.</p>",
    "📁 Screenshots": "<h4>Screenshots</h4><p>No screenshots found.</p>",
    "📁 pdf-chatbot": "<h4>PDF Chatbot</h4><p>Project folder is empty.</p>",
    "📁 Sheryians": "<h4>Sheryians</h4><p>No project files yet.</p>",
    "📁 assets": "<h4>Assets</h4><p>No assets available.</p>",
    "🏠 Home": "<h4>Home</h4><p>This is your home folder.</p>",
    "☁️ OneDrive - Personal": "<h4>OneDrive</h4><p>Cloud folder is empty.</p>",
    "💻 This PC": `
      <h4>Devices and Drives</h4>
      <div class="drive">
        <div class="drive-icon">💾</div>
        <div class="drive-info">
          <div class="drive-name">Windows (C:)</div>
          <div class="drive-bar">
            <div class="drive-bar-used" style="width: 90%;"></div>
          </div>
          <div class="drive-space">47.8 GB free of 475 GB</div>
        </div>
      </div>
    `,
    "💾 Windows (C:)": `
      <h4>Windows (C:)</h4>
      <p>This drive contains system files and applications.</p>
    `,
    "🌐 Network": "<h4>Network</h4><p>No networks found.</p>",
  };

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const text = item.textContent.trim();
      mainPanel.innerHTML =
        panelContent[text] || `<h4>${text}</h4><p>No content to display.</p>`;
    });
  });
}

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

function removeAllWindows(ele) {
  document.body.addEventListener("click", function () {
    ele.remove();
  });
}
function setupDesktopClickToRemoveWindows() {
  document.getElementById("desktop").addEventListener("click", function (e) {
    // Only remove if clicked directly on the desktop (not a child element)
    if (e.target.id === "desktop") {
      document.querySelectorAll(".window").forEach((win) => win.remove());
    }
  });
}

setupDesktopClickToRemoveWindows(); // Call once

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
    if (appName === "google") {
      history.replaceState(null, "", location.pathname); // Reset URL hash
    }

    const icon = document.querySelector(`#${appName}-icon`);
    const taskbarItem = icon?.closest(".taskbar-item");
    if (taskbarItem) {
      taskbarItem.classList.remove("active");
    }
  });
}

const apps = [
  {
    id: "google-icon",
    taskbarId: "taskbar-item-1",
    title: "Google",
    content: `<div class="tabs">
              <div class="tab-bar">
                <button class="add-tab">+</button>
              </div>
              <div class="tab-contents"></div>
            </div>`,
    appName: "google",
  },

  {
    id: "vscode-icon",
    taskbarId: "taskbar-item-2",
    title: "VS Code",
    content: "<p>Welcome to VS Code</p>",
    appName: "vscode",
  },
  {
    id: "telegram-icon",
    taskbarId: "taskbar-item-2",
    title: "Telegram",
    content: "<p>Welcome to Telegram</p>",
    appName: "telegram",
  },
];

// let gcseScriptLoaded = false;
// let retryCount = 0;
// const maxRetries = 20;

// apps.forEach((app) => {
//   const icon = document.getElementById(app.id);
//   const taskbarItem = document.getElementById(app.taskbarId);

//   icon?.addEventListener("click", () => {
//     zindex++;

//     let existing = document.querySelector(`.window[data-app='${app.appName}']`);

//     if (existing) {
//       existing.style.display = "block";
//       existing.style.zIndex = zindex;

//       if (app.appName === "google" && window.google?.search?.cse) {
//         document.querySelector(".window-content").style.backgroundColor =
//           "white";
//         google.search.cse.element.render({
//           div: "google-search-container",
//           tag: "search",
//         });
//       }
//     } else {
//       const win = createWindow(app.title, app.content);
//       win.setAttribute("data-app", app.appName);
//       win.style.zIndex = zindex;

//       if (app.appName === "google") {
//         document.querySelector(".window-content").style.backgroundColor =
//           "white";
//         const renderSearch = () => {
//           const tryRender = () => {
//             const container = document.getElementById(
//               "google-search-container"
//             );
//             if (container && window.google?.search?.cse?.element?.render) {
//               google.search.cse.element.render({
//                 div: "google-search-container",
//                 tag: "search",
//               });
//             } else if (retryCount < maxRetries) {
//               // Retry after delay until container and API are ready
//               retryCount++;
//               setTimeout(tryRender, 100);
//             } else {
//               alert("Google search could not be rendered.");
//             }
//           };
//           tryRender();
//         };

//         if (!gcseScriptLoaded) {
//           const script = document.createElement("script");
//           script.src = "https://cse.google.com/cse.js?cx=f235d173b09934b7f";
//           script.async = true;
//           script.onload = () => {
//             gcseScriptLoaded = true;
//             renderSearch();
//           };
//           document.body.appendChild(script);
//         } else {
//           renderSearch();
//         }
//       }
//     }

//     taskbarItem?.classList.add("active");
//   });
// });

let gcseScriptLoaded = false;
let googleTabCounter = 0;

apps.forEach((app) => {
  const icon = document.getElementById(app.id);
  const taskbarItem = document.getElementById(app.taskbarId);

  icon?.addEventListener("click", () => {
    zindex++;

    let existing = document.querySelector(`.window[data-app='${app.appName}']`);

    if (existing) {
      existing.style.display = "block";
      existing.style.zIndex = zindex;
    } else {
      const win = createWindow(app.title, app.content);
      win.setAttribute("data-app", app.appName);
      win.style.zIndex = zindex;
    }

    taskbarItem?.classList.add("active");

    if (app.appName === "google") {
      document.querySelector(".window-content").style.backgroundColor = "white"
      const win = document.querySelector(`.window[data-app='google']`);
      const tabBar = win.querySelector(".tab-bar");
      const tabContents = win.querySelector(".tab-contents");
      const addTabBtn = win.querySelector(".add-tab");

      function createTab(title = "Explore") {
        const tabId = `google-tab-${googleTabCounter++}`;

        // Create tab button
        const tabBtn = document.createElement("div");
        tabBtn.classList.add("tab-btn");
        tabBtn.innerHTML = `
          <span>${title}</span>
          <button class="tab-close">✖</button>
        `;
        tabBar.insertBefore(tabBtn, addTabBtn);

        // Create content area
        const contentDiv = document.createElement("div");
        contentDiv.id = tabId;
        contentDiv.classList.add("tab-content");
        contentDiv.style.display = "none";
        tabContents.appendChild(contentDiv);

        // Tab switch behavior
        tabBtn.addEventListener("click", () => {
          tabContents
            .querySelectorAll(".tab-content")
            .forEach((div) => (div.style.display = "none"));
          tabBar
            .querySelectorAll(".tab-btn")
            .forEach((btn) => btn.classList.remove("active"));
          contentDiv.style.display = "block";
          tabBtn.classList.add("active");
        });

        // Handle close button
        const closeBtn = tabBtn.querySelector(".tab-close");
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const wasActive = tabBtn.classList.contains("active");
          tabBtn.remove();
          contentDiv.remove();

          if (wasActive) {
            const remainingTabs = tabBar.querySelectorAll(".tab-btn");
            if (remainingTabs.length) remainingTabs[0].click();
          }
        });

        // Intercept clicks to open in new tab
        const interceptLinks = () => {
          contentDiv.addEventListener("click", (e) => {
            const link = e.target.closest("a");
            if (link && link.href) {
              e.preventDefault();

              const disallowedSites = [
                "youtube.com",
                "instagram.com",
                "facebook.com",
              ];

              if (
                disallowedSites.some((domain) => link.href.includes(domain))
              ) {
                window.open(link.href, "_blank"); // open in new tab
              } else {
                createTab(link.textContent || "Result");
                const newContent = tabContents.lastElementChild;
                newContent.innerHTML = `
          <iframe src="${link.href}" style="width:100%;height:100%;border:none;"></iframe>
        `;
                tabContents
                  .querySelectorAll(".tab-content")
                  .forEach((div) => (div.style.display = "none"));
                tabBar
                  .querySelectorAll(".tab-btn")
                  .forEach((btn) => btn.classList.remove("active"));
                newContent.style.display = "block";
                tabBar.lastElementChild.previousElementSibling.classList.add(
                  "active"
                );
              }
            }
          });
        };

        // Render search bar into this tab
        const renderSearch = () => {
          const tryRender = () => {
            if (window.google?.search?.cse?.element?.render) {
              google.search.cse.element.render({
                div: tabId,
                tag: "search",
              });
              interceptLinks();
            } else {
              setTimeout(tryRender, 100);
            }
          };
          tryRender();
        };

        if (!gcseScriptLoaded) {
          const script = document.createElement("script");
          script.src = "https://cse.google.com/cse.js?cx=f235d173b09934b7f";
          script.async = true;
          script.onload = () => {
            gcseScriptLoaded = true;
            renderSearch();
          };
          document.body.appendChild(script);
        } else {
          renderSearch();
        }

        tabBtn.click(); // Auto-activate after setup
      }

      if (!win.classList.contains("tabs-initialized")) {
        win.classList.add("tabs-initialized");
        addTabBtn.addEventListener("click", () => createTab());
        createTab();
      }
    }
  });
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

// console.log(clockElement)

clockElement.addEventListener("click", () => {
  // console.log("clock clicked");
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

// Icons Draggable function
function makeIconDraggable(icon) {
  let offsetX, offsetY;
  let isDragging = false;
  let originalX, originalY;

  icon.addEventListener("mousedown", (e) => {
    e.preventDefault();
    offsetX = e.clientX - icon.offsetLeft;
    offsetY = e.clientY - icon.offsetTop;
    originalX = icon.offsetLeft;
    originalY = icon.offsetTop;
    isDragging = true;

    const onMouseMove = (e) => {
      if (isDragging) {
        const desktop = document.getElementById("desktop");
        const desktopRect = desktop.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // Clamp horizontally
        newLeft = Math.max(
          0,
          Math.min(newLeft, desktopRect.width - icon.offsetWidth)
        );

        // Clamp vertically
        newTop = Math.max(
          0,
          Math.min(newTop, desktopRect.height - icon.offsetHeight)
        );

        icon.style.left = `${newLeft}px`;
        icon.style.top = `${newTop}px`;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      // Snap to grid
      const snappedLeft =
        Math.round(icon.offsetLeft / ICON_SPACING) * ICON_SPACING;
      const snappedTop =
        Math.round(icon.offsetTop / ICON_SPACING) * ICON_SPACING;

      icon.style.left = `${snappedLeft}px`;
      icon.style.top = `${snappedTop}px`;

      // Check for collision
      let overlap = false;
      desktopIcons.forEach((otherIcon) => {
        if (otherIcon === icon) return;
        if (isOverlapping(icon, otherIcon)) {
          overlap = true;
        }
      });

      // If overlap found, revert back
      if (overlap) {
        icon.style.left = `${originalX}px`;
        icon.style.top = `${originalY}px`;
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

// Helper to check overlap
function isOverlapping(el1, el2) {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();
  return !(
    r1.right <= r2.left ||
    r1.left >= r2.right ||
    r1.bottom <= r2.top ||
    r1.top >= r2.bottom
  );
}

// Auto-position icons vertically (like Windows)
const desktopIcons = document.querySelectorAll(".desktop-icon");
const START_TOP = 20;
const START_LEFT = 5;
const ICON_SPACING = 100;

const GRID_COLUMNS = Math.floor(window.innerHeight / ICON_SPACING);
let occupiedGrid = new Set();

desktopIcons.forEach((icon, index) => {
  const row = index % GRID_COLUMNS;
  const col = Math.floor(index / GRID_COLUMNS);
  const top = START_TOP + row * ICON_SPACING;
  const left = START_LEFT + col * ICON_SPACING;

  icon.style.top = `${top}px`;
  icon.style.left = `${left}px`;

  occupiedGrid.add(`${left},${top}`);
  makeIconDraggable(icon);
});

desktopIcons.forEach((icon) => {
  const appName = icon.getAttribute("data-app");

  icon.addEventListener("dblclick", () => {
    const contentHTML = windowContentMap[appName] || "<p>App not found</p>";
    let existingWindow = document.querySelector(
      `.window[data-app='${appName}']`
    );
    zindex++;

    if (existingWindow) {
      existingWindow.style.display = "block";
      existingWindow.style.zIndex = zindex;
    } else {
      const win = createWindow(appName, contentHTML);
      win.setAttribute("data-app", appName);
      win.style.zIndex = zindex;
      // ✅ Setup the explorer sidebar if it's "my-computer"
      if (appName === "my-computer") {
        setupExplorerSidebar(win, appName);
      }
      // 🔹 Dynamically create a taskbar icon for this app
      const taskbarList = document.querySelector(".featured-icons");
      const taskbarItem = document.createElement("div");
      taskbarItem.className = "taskbar-item active";
      taskbarItem.setAttribute("data-app", appName);

      taskbarItem.innerHTML = `
      <div class="glass-wrapper">
        <img class="mini-icon" src="./assets/${appName}.png" />
      </div>
      <div class="tooltip">${appName}</div>
    `;

      taskbarList.appendChild(taskbarItem);

      // 🧠 Restore window when taskbar icon is clicked
      taskbarItem.addEventListener("click", () => {
        win.style.display = "block";
        win.style.zIndex = ++zindex;
      });

      // 🧼 Hook into close button to remove taskbar icon
      const closeBtn = win.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        win.remove();
        taskbarItem.remove();
      });
    }
  });
});

document.addEventListener("click", function (e) {
  if (e.target.textContent.trim() === "🖥️ Desktop") {
    const explorerMain = document.querySelector(".explorer-main");
    if (explorerMain) {
      explorerMain.innerHTML = `
        <h4>Desktop Items</h4>
        ${getDesktopIconsHTML()}
      `;
    }
  }
});

document.addEventListener("dblclick", function (e) {
  const app = e.target.closest(".icon")?.dataset?.app;
  if (app) {
    const desktopIcon = document.querySelector(
      `.desktop-icon[data-app="${app}"]`
    );
    desktopIcon?.dispatchEvent(new Event("dblclick"));
  }
});
