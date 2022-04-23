"use-strict";

function docReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function setVersion() {
  const now = new Date();
  const d = String(now.getDate()).padStart(2, "0");
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const y = String(now.getFullYear()).substr(2, 2);
  const v = m + d + y;
  document.querySelector("#version").innerHTML = v;
}

function initColorTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    document.body.classList.add("dark-mode");
}

function initResizeObserver() {
  const resizeObserver = new ResizeObserver((e) =>
    window.scrollTo(0, document.body.scrollHeight)
  );
  resizeObserver.observe(document.body);
}

function initBase() {
  document.querySelector("#close").addEventListener("mousedown", () => {
    document.body.classList.remove("wopen");
  });
  setTimeout(
    () =>
      document
        .querySelectorAll(".loading")
        .forEach((e) => e.classList.remove("loading")),
    500
  );
}

import CLI from "./CLI.js";
import Folder from "./Folder.js";
import Disk from "./Disk.js";
import Files from "./Files.js";

import {readme, task, me, status, projects, validCode, decrypt} from "./Content.js";

docReady(() => {
  setVersion();
  initBase();
  initResizeObserver();
  initColorTheme();

  const cli = new CLI();

  // Root folders  
  cli.CreateFolder(["Users", Disk.Get("C:\\")]);
  cli.CreateFolder(["tmp", Disk.Get("C:\\")]);
  cli.CreateFolder(["bin", Disk.Get("C:\\")]);
  cli.CreateFolder(["dev", Disk.Get("C:\\")]);
  cli.CreateFolder(["System", Disk.Get("C:\\")]);
  cli.CreateFolder(["Applications", Disk.Get("C:\\")]);

  // other folders
  cli.CreateFolder(["Public", Folder.Get("C:\\Users\\")]);
  cli.CreateFolder(["Root", Folder.Get("C:\\Users")]);
  cli.CreateFolder(["Desktop", Folder.Get("C:\\Users\\Root")]);
  cli.CreateFolder(["Desktop", Folder.Get("C:\\Users\\Public")]);

  // Files / applications
  cli.CreateFile(["readme.txt", readme, Folder.Get("C:\\Users\\Public\\Desktop")]);
  cli.CreateFile(["tasks.txt", task, Folder.Get("C:\\Users\\Public\\Desktop")]);
  cli.CreateFile(["my_resume.txt", me, Folder.Get("C:\\Users\\Public\\Desktop")]);
  cli.CreateFile([".status.txt", status, Folder.Get("C:\\Users\\Public\\Desktop")]);
  cli.CreateFile(["my_projects.txt", projects, Folder.Get("C:\\Users\\Public\\Desktop")]);
  cli.CreateFile(["unlock.exe", validCode, Folder.Get("C:\\Users\\Public\\Desktop")]);
  cli.CreateFile(["decrypt.exe", decrypt, Folder.Get("C:\\Applications")]);

  cli.SetPosition("C:\\Users\\Public\\Desktop");
});
