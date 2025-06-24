let cutClipboard = null;
let clickedIcon = null;
let currentExplorePath = "Desktop";

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
  notepad: `
  <div style="display: flex; flex-direction: column; height: 100%; font-family: 'Segoe UI', sans-serif; background: white; color: black;">

    <!-- Menu Bar -->
    <div style="background-color: #f1f1f1; border-bottom: 1px solid #ccc; padding: 4px 8px; display: flex; font-size: 14px; position: relative;">
      <div class="menu-item" style="position: relative; margin-right: 20px; cursor: pointer;">File
        <div class="menu-dropdown" style="display: none; position: absolute; top: 100%; left: 0; z-index: 999;">
          <div class="menu-option" onclick="notepadNew()">New</div>
          <div class="menu-option" onclick="notepadOpen()">Open</div>
          <div class="menu-option" onclick="notepadSave()">Save</div>
        </div>
      </div>
      <div class="menu-item" style="position: relative; margin-right: 20px; cursor: pointer;">Edit
        <div class="menu-dropdown" style="display: none; position: absolute; top: 100%; left: 0;">
          <div class="menu-option" onclick="notepadCut()">Cut</div>
          <div class="menu-option" onclick="notepadCopy()">Copy</div>
          <div class="menu-option" onclick="notepadPaste()">Paste</div>
          <div class="menu-option" onclick="notepadSelectAll()">Select All</div>
        </div>
      </div>
      <div class="menu-item" style="position: relative; margin-right: 20px; cursor: pointer;">Format
        <div class="menu-dropdown" style="display: none; position: absolute; top: 100%; left: 0;">
          <div class="menu-option" onclick="notepadToggleWrap()"> Wrap</div>
          <div class="menu-option" onclick="notepadFontSize()">Font Size</div>
        </div>
      </div>
      <div class="menu-item" style="position: relative; margin-right: 20px; cursor: pointer;">View
        <div class="menu-dropdown" style="display: none; position: absolute; top: 100%; left: 0;">
          <div class="menu-option" onclick="notepadZoom(1)">Zoom In</div>
          <div class="menu-option" onclick="notepadZoom(-1)">Zoom Out</div>
          <div class="menu-option" onclick="notepadZoom(0)">Reset</div>
        </div>
      </div>
      <div class="menu-item" style="position: relative; cursor: pointer;">Help
        <div class="menu-dropdown" style="display: none; position: absolute; top: 100%; left: 0;">
          <div class="menu-option" onclick="alert('This is a Notepad clone')">About</div>
        </div>
      </div>
    </div>

    <!-- Text Area -->
    <textarea id="notepad-textarea" style="
      flex: 1;
      padding: 12px;
      font-size: 15px;
      border: none;
      resize: none;
      outline: none;
      font-family: 'Consolas', monospace;
      line-height: 1.5;
      overflow: auto;
    " placeholder="Type your notes here..."></textarea>
  </div>`,
  commandprompt: `
  <div style="display: flex; flex-direction: column; height: 100%; background-color: black; font-family: Consolas, monospace; color: white; padding: 10px; box-sizing: border-box; font-size: 14px;">
    <div id="cmd-output" style="flex: 1; overflow-y: auto; white-space: pre-wrap;">
Microsoft Windows [Version 11.0.12345]
(c) Microsoft Corporation. All rights reserved.

Type "help" to view available commands.

C:\\Users\\You>
    </div>
    <div style="display: flex; align-items: center;">
      <span style="color: white;">C:\\Users\\You&gt; </span>
      <input
        id="cmd-input"
        type="text"
        style="flex: 1; background: black; color: white; border: none; outline: none; font-family: Consolas, monospace; font-size: 14px;"
        autocomplete="off"
      />
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
  win._mainPanel = mainPanel;
  win.dataset.explorePanel = "true";

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
      currentExplorePath = text;

      const allIcons = JSON.parse(localStorage.getItem("desktopIcons")) || [];
      const matchingIcons = allIcons.filter((icon) => icon.location === text);

      mainPanel.innerHTML =
        matchingIcons.length === 0
          ? panelContent[text] ||
            `<h4>${text}</h4><p>No content to display.</p>`
          : ""; // Skip dummy text if folders are present

      mainPanel.dataset.folder = text;

      // Render persisted matching icons
      matchingIcons.forEach((iconData) => {
        const icon = document.createElement("div");
        icon.className = "desktop-icon";
        icon.setAttribute("data-app", iconData.id);
        icon.dataset.location = iconData.location;
        icon.innerHTML = `
          <img src="./assets/folder.png" />
          <div class="icon-label">${iconData.name}</div>
        `;
        icon.style.position = "static";
        mainPanel.appendChild(icon);
        makeIconDraggable(icon);
        attachIconLogic(icon);
      });

      // Append deferred icons if any
      const deferred = deferredExplorerIcons[text];
      if (deferred && deferred.length) {
        deferred.forEach((icon) => {
          mainPanel.appendChild(icon);
        });
        deferredExplorerIcons[text] = [];
      }
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
    content: `
  <div style="font-family: 'Segoe UI', sans-serif; height: 100vh; background-color: #1e1e1e; color: #d4d4d4; display: flex;">
    
    <!-- Sidebar -->
    <div style="width: 50px; background-color: #333333; display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
      <div style="width: 30px; height: 30px; margin-bottom: 20px; background: url('https://img.icons8.com/ios-filled/50/ffffff/files.png') center/contain no-repeat;"></div>
      <div style="width: 30px; height: 30px; margin-bottom: 20px; background: url('https://img.icons8.com/ios-filled/50/ffffff/search.png') center/contain no-repeat;"></div>
      <div style="width: 30px; height: 30px; margin-bottom: 20px; background: url('https://img.icons8.com/ios-filled/50/ffffff/source-code.png') center/contain no-repeat;"></div>
    </div>

    <!-- Explorer + Editor -->
    <div style="flex: 1; display: flex; flex-direction: column;">
      
      <!-- Top Bar -->
      <div style="background-color: #2d2d2d; padding: 8px 16px; display: flex; align-items: center; border-bottom: 1px solid #444;">
        <span style="color: #ccc;">📄 index.js</span>
      </div>

      <!-- Editor Area -->
      <div style="flex: 1; padding: 16px; background-color: #1e1e1e; font-family: Consolas, monospace; overflow: auto;">
        <pre style="margin: 0; line-height: 1.6;">
<span style="color: #569cd6;">function</span> <span style="color: #dcdcaa;">helloWorld</span>() {
  <span style="color: #d4d4d4;">console</span>.<span style="color: #9cdcfe;">log</span>(<span style="color: #ce9178;">"Hello, VS Code UI!"</span>);
}
        </pre>
      </div>

      <!-- Bottom Status Bar -->
      <div style="background-color: #007acc; color: white; padding: 4px 12px; font-size: 12px;">
        <span>Ln 1, Col 1    Spaces: 2    UTF-8    LF    JavaScript</span>
      </div>
    </div>
  </div>
  `,
    appName: "vscode",
  },
  {
    id: "telegram-icon",
    taskbarId: "taskbar-item-2",
    title: "Telegram",
    content: `
  <div style="display: flex; height: 100vh; font-family: 'Segoe UI', sans-serif; background-color: #17212b; color: white;">
    
    <!-- Sidebar -->
    <div style="width: 300px; background-color: #202b38; display: flex; flex-direction: column; border-right: 1px solid #1c1c1c;">
      
      <!-- Profile Header -->
      <div style="padding: 16px; border-bottom: 1px solid #1c1c1c; display: flex; align-items: center; gap: 10px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #2a3948;"></div>
        <div>
          <div style="font-weight: bold;">User Name</div>
          <div style="font-size: 12px; color: #a0a0a0;">Online</div>
        </div>
      </div>
      
      <!-- Search -->
      <div style="padding: 10px;">
        <input type="text" placeholder="Search" style="width: 100%; padding: 8px 10px; border-radius: 6px; background-color: #2a3948; color: white; border: none; outline: none;" />
      </div>

      <!-- Chat List -->
      <div style="flex: 1; overflow-y: auto;">
        <div style="padding: 10px 16px; display: flex; gap: 12px; cursor: pointer; border-bottom: 1px solid #1c1c1c;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #2a3948;"></div>
          <div>
            <div style="font-weight: bold;">Chat with John</div>
            <div style="font-size: 13px; color: #a0a0a0;">Hey, how are you?</div>
          </div>
        </div>
        <!-- Add more chats if you want -->
      </div>
    </div>

    <!-- Chat Window -->
    <div style="flex: 1; display: flex; flex-direction: column; background-color: #17212b;">

      <!-- Chat Header -->
      <div style="padding: 16px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #1c1c1c; background-color: #202b38;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #2a3948;"></div>
        <div>
          <div style="font-weight: bold;">John Doe</div>
          <div style="font-size: 12px; color: #a0a0a0;">last seen recently</div>
        </div>
      </div>

      <!-- Messages -->
      <div style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
        <div style="align-self: flex-start; background-color: #2a3948; padding: 10px 14px; border-radius: 12px; max-width: 60%;">
          Hi there!
        </div>
        <div style="align-self: flex-end; background-color: #4e9eff; padding: 10px 14px; border-radius: 12px; max-width: 60%; color: white;">
          Hello! How are you?
        </div>
        <!-- Add more messages as needed -->
      </div>

      <!-- Input -->
      <div style="padding: 10px 16px; background-color: #202b38; border-top: 1px solid #1c1c1c; display: flex; align-items: center; gap: 10px;">
        <input type="text" placeholder="Write a message..." style="flex: 1; padding: 10px 14px; border-radius: 20px; background-color: #2a3948; border: none; color: white; outline: none;" />
        <button style="background-color: #4e9eff; border: none; padding: 10px 16px; border-radius: 20px; color: white; cursor: pointer;">Send</button>
      </div>

    </div>
  </div>
  `,
    appName: "telegram",
  },
];

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
      document.querySelector(".window-content").style.backgroundColor = "white";
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
                "x.com",
                "discord.com",
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
const START_TOP = 20;
const START_LEFT = 5;
const ICON_SPACING = 100;
const desktopIcons = document.querySelectorAll(".desktop-icon");

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

      if (appName === "commandprompt") {
        setupCommandPrompt();
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

// Context Menu Feature

const desktop = document.getElementById("desktop");
const contextMenu = document.getElementById("context-menu");

// Show custom context menu
desktop.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  console.log("Context menu triggered");
  // Position within viewport
  const menuWidth = 200;
  const menuHeight = contextMenu.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  let posX = e.pageX;
  let posY = e.pageY;

  // Adjust if overflowing window
  if (posX + menuWidth > windowWidth) posX = windowWidth - menuWidth;
  if (posY + menuHeight > windowHeight) posY = windowHeight - menuHeight;

  contextMenu.style.left = `${posX}px`;
  contextMenu.style.top = `${posY}px`;
  contextMenu.classList.remove("hidden");
});

// Hide on click anywhere else
document.addEventListener("click", () => {
  contextMenu.classList.add("hidden");
});

let folderCounter = 1;

document.getElementById("new-folder").addEventListener("click", () => {
  contextMenu.classList.add("hidden");

  const folderId = `folder-${Date.now()}`;
  const folderName = `New Folder${
    folderCounter > 1 ? " (" + folderCounter + ")" : ""
  }`;
  folderCounter++;

  const MAX_COLS = Math.floor(window.innerWidth / ICON_SPACING);
  let row = 0;
  let col = 0;
  let top, left;

  while (true) {
    top = START_TOP + row * ICON_SPACING;
    left = START_LEFT + col * ICON_SPACING;
    const key = `${left},${top}`;
    if (!occupiedGrid.has(key)) {
      occupiedGrid.add(key);
      break;
    }
    row++;
    if (row >= GRID_COLUMNS) {
      row = 0;
      col++;
      if (col >= MAX_COLS) {
        alert("No more space to add icons!");
        return;
      }
    }
  }

  const folder = {
    id: folderId,
    name: folderName,
    top: `${top}px`,
    left: `${left}px`,
  };

  // Save to localStorage
  const folders = JSON.parse(localStorage.getItem("desktopFolders")) || [];
  folders.push(folder);
  localStorage.setItem("desktopFolders", JSON.stringify(folders));

  renderFolderIcon(folder);
});

function renderFolderIcon(folder) {
  const icon = document.createElement("div");
  icon.className = "desktop-icon";
  icon.setAttribute("data-app", folder.id);
  icon.style.position = "absolute";
  icon.style.top = folder.top;
  icon.style.left = folder.left;

  icon.innerHTML = `
    <img src="./assets/folder.png" />
    <div class="icon-label">${folder.name}</div>
  `;

  document.getElementById("desktop").appendChild(icon);
  makeIconDraggable(icon);

  icon.addEventListener("dblclick", () => {
    const existing = document.querySelector(`.window[data-app='${folder.id}']`);
    zindex++;
    if (existing) {
      existing.style.display = "block";
      existing.style.zIndex = zindex;
    } else {
      const win = createWindow(folder.name, `<p>This folder is empty.</p>`);
      win.setAttribute("data-app", folder.id);
      win.style.zIndex = zindex;

      const taskbarList = document.querySelector(".featured-icons");
      const taskbarItem = document.createElement("div");
      taskbarItem.className = "taskbar-item active";
      taskbarItem.setAttribute("data-app", folder.id);

      taskbarItem.innerHTML = `
      <div class="glass-wrapper">
      <img class="mini-icon" src="./assets/folder.png" />
      </div>
        <div class="tooltip">${folder.name}</div>
      `;
      taskbarList.appendChild(taskbarItem);

      taskbarItem.addEventListener("click", () => {
        win.style.display = "block";
        win.style.zIndex = ++zindex;
      });

      win.querySelector(".close").addEventListener("click", () => {
        win.remove();
        taskbarItem.remove();
      });
    }
  });
}

function loadFoldersFromStorage() {
  const folders = JSON.parse(localStorage.getItem("desktopFolders")) || [];
  folders.forEach((folder) => {
    occupiedGrid.add(`${parseInt(folder.left)},${parseInt(folder.top)}`);
    renderFolderIcon(folder);
  });
}

loadFoldersFromStorage();

document.getElementById("refresh").addEventListener("click", () => {
  location.reload();
});

// Icons Context Menu

const iconContextMenu = document.getElementById("icon-context-menu");

document.addEventListener("contextmenu", function (e) {
  const icon = e.target.closest(".desktop-icon");

  if (icon) {
    e.preventDefault();
    clickedIcon = icon;

    contextMenu.classList.add("hidden");
    const menuWidth = 150;
    const menuHeight = iconContextMenu.offsetHeight;
    let posX = e.pageX;
    let posY = e.pageY;

    // Prevent overflow
    if (posX + menuWidth > window.innerWidth)
      posX = window.innerWidth - menuWidth;
    if (posY + menuHeight > window.innerHeight)
      posY = window.innerHeight - menuHeight;

    iconContextMenu.style.left = `${posX}px`;
    iconContextMenu.style.top = `${posY}px`;
    iconContextMenu.classList.remove("hidden");
  }
});

// Hide when clicking elsewhere
document.addEventListener("click", () => {
  iconContextMenu.classList.add("hidden");
});

//  Icons context menu options features

document.getElementById("rename-icon").addEventListener("click", () => {
  iconContextMenu.classList.add("hidden");
  if (!clickedIcon) return;

  const label = clickedIcon.querySelector(".icon-label");
  const oldName = label.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = oldName;
  input.className = "rename-input";
  input.style.width = "70px";
  input.style.fontSize = "12px";

  label.replaceWith(input);
  input.focus();

  input.addEventListener("blur", () => {
    const newLabel = document.createElement("div");
    newLabel.className = "icon-label";
    newLabel.textContent = input.value || oldName;
    input.replaceWith(newLabel);

    // Update in localStorage
    const appId = clickedIcon.getAttribute("data-app");
    const folders = JSON.parse(localStorage.getItem("desktopFolders")) || [];
    const folder = folders.find((f) => f.id === appId);
    if (folder) {
      folder.name = newLabel.textContent;
      localStorage.setItem("desktopFolders", JSON.stringify(folders));
    }
  });
});

document.getElementById("delete-icon").addEventListener("click", () => {
  iconContextMenu.classList.add("hidden");
  if (!clickedIcon) return;

  const appId = clickedIcon.getAttribute("data-app");
  clickedIcon.remove();

  // Remove from localStorage
  let folders = JSON.parse(localStorage.getItem("desktopFolders")) || [];
  folders = folders.filter((f) => f.id !== appId);
  localStorage.setItem("desktopFolders", JSON.stringify(folders));
});

document.getElementById("cut-icon").addEventListener("click", () => {
  iconContextMenu.classList.add("hidden");
  if (!clickedIcon) return;

  cutClipboard = clickedIcon;
  clickedIcon.style.opacity = "0.5"; // visual feedback
});

function saveIconsToStorage() {
  const allIcons = document.querySelectorAll(".desktop-icon");
  const data = [];

  allIcons.forEach((icon) => {
    const id = icon.dataset.app;
    const name = icon.querySelector(".icon-label").textContent;

    const location =
      icon.closest(".explorer-main")?.dataset?.folder || "Desktop";

    let top = 0,
      left = 0;

    // Only read top/left for desktop icons
    if (location === "Desktop") {
      top = parseInt(icon.style.top || 0);
      left = parseInt(icon.style.left || 0);
    }

    data.push({ id, name, top, left, location });
  });

  localStorage.setItem("desktopIcons", JSON.stringify(data));
}

const deferredExplorerIcons = {}; // Temporary store for explorer folder icons

function loadIconsFromStorage() {
  const data = JSON.parse(localStorage.getItem("desktopIcons")) || [];

  data.forEach((iconData) => {
    const icon = document.createElement("div");
    icon.className = "desktop-icon";
    icon.setAttribute("data-app", iconData.id);
    icon.innerHTML = `
      <img src="./assets/folder.png" />
      <div class="icon-label">${iconData.name}</div>
    `;

    makeIconDraggable(icon);
    attachIconLogic(icon);

    if (iconData.location === "Desktop") {
      icon.style.position = "absolute";
      icon.style.top = `${iconData.top}px`;
      icon.style.left = `${iconData.left}px`;
      document.getElementById("desktop").appendChild(icon);
    } else {
      icon.style.position = "static";
      if (!deferredExplorerIcons[iconData.location]) {
        deferredExplorerIcons[iconData.location] = [];
      }
      deferredExplorerIcons[iconData.location].push(icon);
    }
  });
}

document.getElementById("paste").addEventListener("click", () => {
  contextMenu.classList.add("hidden");

  if (!cutClipboard) return;

  let targetContainer = document.getElementById("desktop");

  // Check if explorer is open and user is in a folder
  const explorerWindow = document.querySelector(
    ".window[data-app='my-computer']"
  );
  if (
    explorerWindow &&
    !explorerWindow.classList.contains("hidden") &&
    currentExplorePath !== "Desktop"
  ) {
    const explorerMainPanel = explorerWindow._mainPanel;
    if (explorerMainPanel) {
      targetContainer = explorerMainPanel;
    }
  }

  // Remove from old container if needed
  if (
    cutClipboard.parentElement &&
    cutClipboard.parentElement !== targetContainer
  ) {
    cutClipboard.parentElement.removeChild(cutClipboard);
  }

  if (targetContainer.id === "desktop") {
    // Find next free spot on desktop grid
    const MAX_COLS = Math.floor(window.innerWidth / ICON_SPACING);
    let row = 0,
      col = 0,
      top,
      left;

    while (true) {
      top = START_TOP + row * ICON_SPACING;
      left = START_LEFT + col * ICON_SPACING;
      const key = `${left},${top}`;
      if (!occupiedGrid.has(key)) {
        occupiedGrid.add(key);
        break;
      }
      row++;
      if (row >= GRID_COLUMNS) {
        row = 0;
        col++;
        if (col >= MAX_COLS) {
          alert("No space to paste!");
          return;
        }
      }
    }

    cutClipboard.dataset.location = "Desktop";
    cutClipboard.style.top = `${top}px`;
    cutClipboard.style.left = `${left}px`;
    cutClipboard.style.position = "absolute";
  } else {
    // Inside explorer panel
    cutClipboard.dataset.location = currentExplorePath;
    cutClipboard.style.position = "static";
    cutClipboard.style.top = "unset";
    cutClipboard.style.left = "unset";

    // ✅ Only remove dummy content if it's there
    const dummyContent = targetContainer.querySelector("p");
    if (dummyContent && dummyContent.textContent.includes("No")) {
      dummyContent.remove();
    }
  }

  targetContainer.appendChild(cutClipboard);
  cutClipboard.style.opacity = "1";
  cutClipboard = null;

  saveIconsToStorage();
});

// Change background;

const background_Images = [
  "default1.jpg",
  "default2.webp",
  "default3.webp",
  "default4.webp",
  "default5.webp",
  "default6.jpg",
];

let image_counter = 0;

const main_screen_part = document.querySelector(".main_screen_part");
const personalize = document.querySelector("#personalize");

personalize.addEventListener("click", () => {
  main_screen_part.style.backgroundImage = `url(./assets/${background_Images[image_counter]})`;

  if (image_counter < background_Images.length - 1) {
    image_counter++;
  } else {
    image_counter = 0;
  }
});

//  Display Settings UI
function getSettings() {
  return `<div style="
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #202020;
      color: #ffffff;
      margin: 0;
      padding: 0;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    ">
      <div style="
        display: flex;
        flex: 1;
        overflow: hidden;
      ">

        <div style="
          width: 400px;
          background: #1e1e1e;
          border-right: 1px solid #404040;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        ">
          
          <div style="
            padding: 16px;
            border-bottom: 1px solid #404040;
          ">
            <div style="
              position: relative;
              background: #2c2c2c;
              border: 1px solid #404040;
              border-radius: 4px;
              display: flex;
              align-items: center;
              padding: 8px 12px;
              transition: border-color 0.2s;
            " onfocus="this.style.borderColor='#0078d4'" onblur="this.style.borderColor='#404040'">
              <div style="
                width: 16px;
                height: 16px;
                margin-right: 8px;
                opacity: 0.6;
                position: relative;
              ">
                <div style="
                  width: 8px;
                  height: 8px;
                  border: 1.5px solid #ffffff;
                  border-radius: 50%;
                  position: absolute;
                  top: 1px;
                  left: 1px;
                "></div>
                <div style="
                  width: 2px;
                  height: 4px;
                  background: #ffffff;
                  position: absolute;
                  bottom: 2px;
                  right: 2px;
                  transform: rotate(45deg);
                "></div>
              </div>
              <input type="text" placeholder="Find a setting" style="
                border: none;
                outline: none;
                flex: 1;
                font-size: 14px;
                font-family: inherit;
                background: transparent;
                color: #ffffff;
              ">
            </div>
          </div>


          <div style="flex: 1; padding: 8px 0;">
            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
              background: #0078d4;
              border-right: 3px solid #0078d4;
            ">
              <div style="
                width: 20px;
                height: 20px;
                background: #ffffff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 12px;
                  height: 12px;
                  background: #0078d4;
                  border-radius: 50%;
                "></div>
              </div>
              <span style="font-size: 14px; font-weight: 500; color: #ffffff;">System</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #107c10;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 8px;
                  height: 8px;
                  border: 2px solid white;
                  border-radius: 1px;
                "></div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Bluetooth & devices</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #ff8c00;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 10px;
                  height: 6px;
                  border: 1px solid white;
                  border-radius: 1px;
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    top: -1px;
                    right: -2px;
                    width: 2px;
                    height: 8px;
                    background: white;
                    border-radius: 1px;
                  "></div>
                </div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Network & internet</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #d83b01;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 12px;
                  height: 8px;
                  background: white;
                  border-radius: 1px;
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    bottom: -1px;
                    left: 2px;
                    right: 2px;
                    height: 2px;
                    background: #d83b01;
                  "></div>
                </div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Personalization</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #881798;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 10px;
                  height: 10px;
                  border: 2px solid white;
                  border-radius: 50%;
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 2px;
                    height: 2px;
                    background: white;
                    border-radius: 50%;
                  "></div>
                </div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Apps</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #498205;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 8px;
                  height: 12px;
                  background: white;
                  border-radius: 1px;
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    top: 2px;
                    left: 1px;
                    right: 1px;
                    height: 1px;
                    background: #498205;
                  "></div>
                  <div style="
                    position: absolute;
                    top: 4px;
                    left: 1px;
                    right: 1px;
                    height: 1px;
                    background: #498205;
                  "></div>
                </div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Accounts</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #b146c2;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 12px;
                  height: 8px;
                  background: white;
                  border-radius: 1px;
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    top: -2px;
                    left: 2px;
                    right: 2px;
                    height: 4px;
                    background: white;
                    border-radius: 2px 2px 0 0;
                  "></div>
                </div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Time & language</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #00188f;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 10px;
                  height: 10px;
                  border: 2px solid white;
                  border-radius: 50%;
                  background: #00188f;
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    top: 1px;
                    left: 1px;
                    width: 2px;
                    height: 2px;
                    background: white;
                    border-radius: 50%;
                  "></div>
                </div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Gaming</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #767676;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 12px;
                  height: 12px;
                  background: white;
                  border-radius: 1px;
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 8px;
                    height: 1px;
                    background: #767676;
                  "></div>
                  <div style="
                    position: absolute;
                    top: 5px;
                    left: 2px;
                    width: 6px;
                    height: 1px;
                    background: #767676;
                  "></div>
                  <div style="
                    position: absolute;
                    top: 8px;
                    left: 2px;
                    width: 4px;
                    height: 1px;
                    background: #767676;
                  "></div>
                </div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Accessibility</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #ca5010;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 12px;
                  height: 12px;
                  background: white;
                  border-radius: 1px;
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 2px;
                    height: 8px;
                    background: #ca5010;
                  "></div>
                  <div style="
                    position: absolute;
                    top: 4px;
                    left: 5px;
                    width: 5px;
                    height: 1px;
                    background: #ca5010;
                  "></div>
                  <div style="
                    position: absolute;
                    top: 7px;
                    left: 5px;
                    width: 3px;
                    height: 1px;
                    background: #ca5010;
                  "></div>
                </div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Privacy & security</span>
            </div>

            <div style="
              padding: 12px 20px;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 12px;
              transition: background-color 0.1s;
            " onmouseover="this.style.background='#2c2c2c'" onmouseout="this.style.background='transparent'">
              <div style="
                width: 20px;
                height: 20px;
                background: #0078d4;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 10px;
                  height: 10px;
                  border: 2px solid white;
                  border-radius: 2px;
                  position: relative;
                ">
                  <div style="
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 2px;
                    height: 2px;
                    background: white;
                  "></div>
                </div>
              </div>
              <span style="font-size: 14px; color: #ffffff;">Windows Update</span>
            </div>
          </div>
        </div>

        
        <div style="
          flex: 1;
          background: #2c2c2c;
          overflow-y: auto;
          padding: 32px 40px;
        ">
          <div style="max-width: 800px;">
            <h2 style="
              font-size: 32px;
              font-weight: 600;
              margin: 0 0 8px 0;
              color: #ffffff;
            ">System</h2>
            <p style="
              font-size: 14px;
              color: #cccccc;
              margin: 0 0 32px 0;
            ">Display, sound, notifications, power</p>

            
            <div style="display: flex; flex-direction: column; gap: 1px; widht: 90vw">
              
              <div style="
                background: #1e1e1e;
                border: 1px solid #404040;
                border-radius: 8px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.1s;
                display: flex;
                align-items: center;
                justify-content: space-between;
              " onmouseover="this.style.background='#353535'; this.style.borderColor='#505050'" onmouseout="this.style.background='#1e1e1e'; this.style.borderColor='#404040'">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="
                    width: 32px;
                    height: 32px;
                    background: #0078d4;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    <div style="
                      width: 18px;
                      height: 12px;
                      border: 2px solid white;
                      border-radius: 2px;
                      position: relative;
                    ">
                      <div style="
                        position: absolute;
                        bottom: -1px;
                        left: 6px;
                        right: 6px;
                        height: 3px;
                        background: white;
                        border-radius: 0 0 1px 1px;
                      "></div>
                    </div>
                  </div>
                  <div>
                    <h3 style="
                      font-size: 16px;
                      font-weight: 500;
                      margin: 0 0 4px 0;
                      color: #ffffff;
                    ">Display</h3>
                    <p style="
                      font-size: 14px;
                      color: #cccccc;
                      margin: 0;
                    ">Monitors, brightness, night light, display profile</p>
                  </div>
                </div>
                <div style="
                  color: #cccccc;
                  font-size: 12px;
                  transform: rotate(-90deg);
                ">❮</div>
              </div>


              <div style="
                background: #1e1e1e;
                border: 1px solid #404040;
                border-radius: 8px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.1s;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 8px;
              " onmouseover="this.style.background='#353535'; this.style.borderColor='#505050'" onmouseout="this.style.background='#1e1e1e'; this.style.borderColor='#404040'">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="
                    width: 32px;
                    height: 32px;
                    background: #107c10;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    <div style="
                      width: 4px;
                      height: 16px;
                      background: white;
                      border-radius: 2px;
                      position: relative;
                    ">
                      <div style="
                        position: absolute;
                        right: -6px;
                        top: 2px;
                        width: 8px;
                        height: 8px;
                        border: 2px solid white;
                        border-left: none;
                        border-radius: 0 4px 4px 0;
                      "></div>
                      <div style="
                        position: absolute;
                        right: -12px;
                        top: 4px;
                        width: 6px;
                        height: 4px;
                        border: 1px solid white;
                        border-left: none;
                        border-radius: 0 2px 2px 0;
                      "></div>
                    </div>
                  </div>
                  <div>
                    <h3 style="
                      font-size: 16px;
                      font-weight: 500;
                      margin: 0 0 4px 0;
                      color: #ffffff;
                    ">Sound</h3>
                    <p style="
                      font-size: 14px;
                      color: #cccccc;
                      margin: 0;
                    ">Volume levels, output, input, sound devices</p>
                  </div>
                </div>
                <div style="
                  color: #cccccc;
                  font-size: 12px;
                  transform: rotate(-90deg);
                ">❮</div>
              </div>


              <div style="
                background: #1e1e1e;
                border: 1px solid #404040;
                border-radius: 8px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.1s;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 8px;
              " onmouseover="this.style.background='#353535'; this.style.borderColor='#505050'" onmouseout="this.style.background='#1e1e1e'; this.style.borderColor='#404040'">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="
                    width: 32px;
                    height: 32px;
                    background: #ff8c00;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    <div style="
                      width: 16px;
                      height: 12px;
                      background: white;
                      border-radius: 2px;
                      position: relative;
                    ">
                      <div style="
                        position: absolute;
                        top: 2px;
                        left: 2px;
                        right: 2px;
                        height: 1px;
                        background: #ff8c00;
                      "></div>
                      <div style="
                        position: absolute;
                        top: 5px;
                        left: 2px;
                        right: 2px;
                        height: 1px;
                        background: #ff8c00;
                      "></div>
                      <div style="
                        position: absolute;
                        top: 8px;
                        left: 2px;
                        right: 8px;
                        height: 1px;
                        background: #ff8c00;
                      "></div>
                    </div>
                  </div>
                  <div>
                    <h3 style="
                      font-size: 16px;
                      font-weight: 500;
                      margin: 0 0 4px 0;
                      color: #ffffff;
                    ">Notifications</h3>
                    <p style="
                      font-size: 14px;
                      color: #cccccc;
                      margin: 0;
                    ">Alerts from apps and system</p>
                  </div>
                </div>
                <div style="
                  color: #cccccc;
                  font-size: 12px;
                  transform: rotate(-90deg);
                ">❮</div>
              </div>


              <div style="
                background: #1e1e1e;
                border: 1px solid #404040;
                border-radius: 8px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.1s;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 8px;
              " onmouseover="this.style.background='#353535'; this.style.borderColor='#505050'" onmouseout="this.style.background='#1e1e1e'; this.style.borderColor='#404040'">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="
                    width: 32px;
                    height: 32px;
                    background: #107c10;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    <div style="
                      width: 16px;
                      height: 10px;
                      border: 2px solid white;
                      border-radius: 2px;
                      position: relative;
                      background: white;
                    ">
                      <div style="
                        position: absolute;
                        right: -3px;
                        top: 2px;
                        width: 2px;
                        height: 4px;
                        background: white;
                        border-radius: 0 1px 1px 0;
                      "></div>
                      <div style="
                        position: absolute;
                        top: 1px;
                        left: 1px;
                        width: 8px;
                        height: 6px;
                        background: #107c10;
                        border-radius: 1px;
                      "></div>
                    </div>
                  </div>
                  <div>
                    <h3 style="
                      font-size: 16px;
                      font-weight: 500;
                      margin: 0 0 4px 0;
                      color: #ffffff;
                    ">Power & battery</h3>
                    <p style="
                      font-size: 14px;
                      color: #cccccc;
                      margin: 0;
                    ">Sleep, power mode, battery usage</p>
                  </div>
                </div>
                <div style="
                  color: #cccccc;
                  font-size: 12px;
                  transform: rotate(-90deg);
                ">❮</div>
              </div>


              <div style="
                background: #1e1e1e;
                border: 1px solid #404040;
                border-radius: 8px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.1s;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 8px;
              " onmouseover="this.style.background='#353535'; this.style.borderColor='#505050'" onmouseout="this.style.background='#1e1e1e'; this.style.borderColor='#404040'">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="
                    width: 32px;
                    height: 32px;
                    background: #ca5010;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
                    <div style="
                      width: 16px;
                      height: 16px;
                      background: white;
                      border-radius: 2px;
                      position: relative;
                    ">
                      <div style="
                        position: absolute;
                        top: 3px;
                        left: 3px;
                        right: 3px;
                        height: 2px;
                        background: #ca5010;
                        border-radius: 1px;
                      "></div>
                      <div style="
                        position: absolute;
                        bottom: 6px;
                        left: 3px;
                        right: 3px;
                        height: 2px;
                        background: #ca5010;
                        border-radius: 1px;
                      "></div>
                      <div style="
                        position: absolute;
                        bottom: 3px;
                        left: 3px;
                        right: 3px;
                        height: 2px;
                        background: #ca5010;
                        border-radius: 1px;
                      "></div>
                    </div>
                  </div>
                  <div>
                    <h3 style="
                      font-size: 16px;
                      font-weight: 500;
                      margin: 0 0 4px 0;
                      color: #ffffff;
                    ">Storage</h3>
                    <p style="
                      font-size: 14px;
                      color: #cccccc;
                      margin: 0;
                    ">Storage spaces, drives, configuration rules</p>
                  </div>
                </div>
                <div style="
                  color: #cccccc;
                  font-size: 12px;
                  transform: rotate(-90deg);
                ">❮</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

document.getElementById("display-settings").addEventListener("click", () => {
  const win = createWindow("Settings", getSettings());
});

// Notepad Feature
document.addEventListener("click", function (e) {
  if (e.target.id === "save-notepad-btn") {
    const text = document.getElementById("notepad-textarea")?.value || "";
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "untitled.txt";
    a.click();
  }
});

// Dropdown toggling
document.addEventListener("click", (e) => {
  const isMenu = e.target.closest(".menu-item");
  document.querySelectorAll(".menu-dropdown").forEach((menu) => {
    menu.style.display = "none";
  });
  if (isMenu) {
    const dropdown = isMenu.querySelector(".menu-dropdown");
    dropdown.style.display = "block";
    e.stopPropagation();
  }
});

// Save as .txt
function notepadSave() {
  const text = document.getElementById("notepad-textarea")?.value || "";
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "untitled.txt";
  a.click();
}

// New file (clear textarea)
function notepadNew() {
  if (confirm("Start a new document? Unsaved changes will be lost.")) {
    document.getElementById("notepad-textarea").value = "";
  }
}

// Open file from disk
function notepadOpen() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".txt";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("notepad-textarea").value = reader.result;
    };
    reader.readAsText(file);
  };
  input.click();
}

// Select all
function notepadSelectAll() {
  const textarea = document.getElementById("notepad-textarea");
  textarea.select();
}

// Word wrap toggle
function notepadToggleWrap() {
  const ta = document.getElementById("notepad-textarea");
  ta.style.whiteSpace = ta.style.whiteSpace === "pre" ? "pre-wrap" : "pre";
}

// Zoom
let currentFontSize = 15;
function notepadZoom(delta) {
  if (delta === 0) currentFontSize = 15;
  else currentFontSize += delta;
  const ta = document.getElementById("notepad-textarea");
  ta.style.fontSize = `${currentFontSize}px`;
}

// Menu style
document.querySelectorAll(".menu-option").forEach((el) => {
  el.style.padding = "6px 12px";
  el.style.cursor = "pointer";
  el.style.fontSize = "13px";
  el.addEventListener("mouseover", () => (el.style.background = "#eee"));
  el.addEventListener("mouseout", () => (el.style.background = "white"));
});

function notepadCut() {
  const textarea = document.getElementById("notepad-textarea");
  const selected = textarea.value.substring(
    textarea.selectionStart,
    textarea.selectionEnd
  );
  if (selected) {
    navigator.clipboard.writeText(selected).then(() => {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value =
        textarea.value.slice(0, start) + textarea.value.slice(end);
      textarea.setSelectionRange(start, start);
    });
  }
}

function notepadCopy() {
  const textarea = document.getElementById("notepad-textarea");
  const selected = textarea.value.substring(
    textarea.selectionStart,
    textarea.selectionEnd
  );
  if (selected) {
    navigator.clipboard.writeText(selected);
  }
}

function notepadPaste() {
  const textarea = document.getElementById("notepad-textarea");
  navigator.clipboard.readText().then((clipText) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);
    textarea.value = before + clipText + after;
    const cursor = start + clipText.length;
    textarea.setSelectionRange(cursor, cursor);
    textarea.focus();
  });
}

function setupCommandPrompt() {
  const output = document.getElementById("cmd-output");
  const input = document.getElementById("cmd-input");

  if (!output || !input) return;

  input.focus();

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = input.value.trim();
      if (command) {
        output.textContent += `\nC:\\Users\\You> ${command}\n`;
        runCommand(command, output);
        output.scrollTop = output.scrollHeight;
      }
      input.value = "";
    }
  });
}

function runCommand(command, outputElement) {
  const lowerCmd = command.toLowerCase();

  if (lowerCmd === "help") {
    outputElement.innerHTML += `Available commands:
- help
- clear
- date
- echo [message]
- about
\n`;
  } else if (lowerCmd === "clear") {
    outputElement.innerHTML = "";
  } else if (lowerCmd === "date") {
    outputElement.innerHTML += `${new Date().toString()}\n`;
  } else if (lowerCmd.startsWith("echo ")) {
    const message = command.slice(5);
    outputElement.innerHTML += `${message}\n`;
  } else if (lowerCmd === "about") {
    outputElement.innerHTML += `This is a simulated Command Prompt built using JavaScript.\n`;
  } else {
    outputElement.innerHTML += `'${command}' is not recognized as an internal or external command.\n`;
  }
}

setTimeout(setupCommandPrompt, 100);

function VSCodecontentHTML() {
  return `
  <div style="font-family: 'Segoe UI', sans-serif; height: 100vh; background-color: #1e1e1e; color: #d4d4d4; display: flex;">
    
    <!-- Sidebar -->
    <div style="width: 50px; background-color: #333333; display: flex; flex-direction: column; align-items: center; padding-top: 10px;">
      <div style="width: 30px; height: 30px; margin-bottom: 20px; background: url('https://img.icons8.com/ios-filled/50/ffffff/files.png') center/contain no-repeat;"></div>
      <div style="width: 30px; height: 30px; margin-bottom: 20px; background: url('https://img.icons8.com/ios-filled/50/ffffff/search.png') center/contain no-repeat;"></div>
      <div style="width: 30px; height: 30px; margin-bottom: 20px; background: url('https://img.icons8.com/ios-filled/50/ffffff/source-code.png') center/contain no-repeat;"></div>
    </div>

    <!-- Explorer + Editor -->
    <div style="flex: 1; display: flex; flex-direction: column;">
      
      <!-- Top Bar -->
      <div style="background-color: #2d2d2d; padding: 8px 16px; display: flex; align-items: center; border-bottom: 1px solid #444;">
        <span style="color: #ccc;">📄 index.js</span>
      </div>

      <!-- Editor Area -->
      <div style="flex: 1; padding: 16px; background-color: #1e1e1e; font-family: Consolas, monospace; overflow: auto;">
        <pre style="margin: 0; line-height: 1.6;">
<span style="color: #569cd6;">function</span> <span style="color: #dcdcaa;">helloWorld</span>() {
  <span style="color: #d4d4d4;">console</span>.<span style="color: #9cdcfe;">log</span>(<span style="color: #ce9178;">"Hello, VS Code UI!"</span>);
}
        </pre>
      </div>

      <!-- Bottom Status Bar -->
      <div style="background-color: #007acc; color: white; padding: 4px 12px; font-size: 12px;">
        <span>Ln 1, Col 1    Spaces: 2    UTF-8    LF    JavaScript</span>
      </div>
    </div>
  </div>
  `;
}
