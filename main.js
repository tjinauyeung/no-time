const { app, ipcMain, Tray, BrowserWindow } = require("electron");
const path = require("path");
const activeWin = require("active-win");
const dotenv = require("dotenv");

dotenv.config();

app.on("ready", start);

function start() {
  makeWidget();
  makeDashboard();
  track();
}

let widget;
let dashboard;
const processes = {};

function track() {
  setInterval(() => {
    activeWin()
      .then((win) => {
        if (!win || !win.owner) return;

        const name = win.owner.name;
        const title = win.title;

        if (!win.title) return;

        if (!processes[name]) {
          processes[name] = {};
        }

        if (!processes[name].views) {
          processes[name].views = {};
        }

        processes[name].time = processes[name].time
          ? processes[name].time + 1
          : 1;
        processes[name].views[title] = processes[name].views[title]
          ? processes[name].views[title] + 1
          : 1;

        dashboard.webContents.send("update-processes", processes);
      })
      .catch((e) => console.log(e));
  }, 1000);
}

function makeWidget() {
  widget = new BrowserWindow({
    width: 300,
    height: 150,
    padding: 0,
    show: false,
    frame: false,
    alwaysOnTop: true,
    fullscreenable: false,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
  });

  widget.loadURL(
    process.env.ELECTRON_WIDGET_URL ||
      `file://${path.join(__dirname, "./dist/widget/index.html")}`
  );

  // widget.webContents.openDevTools();

  const tray = new Tray(path.join(__dirname, "./assets/iconTemplate.png"));

  const { x, y, width, height } = tray.getBounds();
  
  widget.setPosition(x - 300 / 2 + width / 2, y + height);
  tray.setIgnoreDoubleClickEvents(true);
  
  tray.on("click", () => {
    if (widget.isVisible()) {
      widget.hide();
    } else {
      widget.show();
      widget.focus();
    }
  });

  widget.on("closed", () => {
    widget = null;
  });
}

function makeDashboard() {
  dashboard = new BrowserWindow({
    width: 1150,
    height: 700,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js",
    },
  });

  dashboard.loadURL(
    process.env.ELECTRON_DASHBOARD_URL ||
      `file://${path.join(__dirname, "./dist/dashboard/index.html")}`
  );

  // dashboard.webContents.openDevTools();

  dashboard.on("closed", () => {
    dashboard = null;
  });
}

ipcMain.on("open-dashboard", () => {
  widget.hide();
  if (!dashboard) makeDashboard();
  dashboard.show();
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") {
    app.quit();
  }
});
