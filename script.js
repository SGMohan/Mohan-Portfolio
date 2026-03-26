const sideMenu = document.getElementById("sideMenu");
const html = document.documentElement;
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

// Mobile menu functions
function openMenu() {
  sideMenu.style.transform = "translateX(-16rem)";
}

function closeMenu() {
  sideMenu.style.transform = "translateX(16rem)";
}

function updateNavbarOnScroll() {
  if (window.scrollY > 50) {
    navBar.classList.add(
      "bg-white",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "shadow-sm",
      "dark:bg-darkTheme",
      "dark:bg-opacity-50",
    );
    navLinks.classList.remove(
      "bg-white",
      "bg-opacity-50",
      "shadow-sm",
      "dark:border",
      "dark:border-white/20",
      "dark:bg-transparent",
    );
  } else {
    navBar.classList.remove(
      "bg-white",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "shadow-sm",
      "dark:bg-darkTheme",
      "dark:bg-opacity-50",
    );
    navLinks.classList.add(
      "bg-white",
      "bg-opacity-50",
      "shadow-sm",
      "dark:border",
      "dark:border-white/20",
      "dark:bg-transparent",
    );
  }
}

// Theme toggle - simple and fast
function toggleTheme() {
  const isDarkMode = html.classList.contains("dark");
  const nextDark = !isDarkMode;

  html.classList.toggle("dark", nextDark);
  document.body.classList.toggle("dark", nextDark);

  localStorage.setItem("theme", nextDark ? "dark" : "light");

  // force immediate repaint (prevents visual partial application)
  void html.offsetWidth;

  refreshAfterThemeChange();
}

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  html.classList.toggle("dark", shouldUseDark);
  document.body.classList.toggle("dark", shouldUseDark);
}

// Auto year update
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
  }

  updateNavbarOnScroll();
});

window.addEventListener("scroll", updateNavbarOnScroll);

// Re-run update when theme toggles (so the same nav style is correct for dark/light scroll)
function refreshAfterThemeChange() {
  updateNavbarOnScroll();
}

// Initialize theme immediately
initializeTheme();

// After initial theme is set, sync navbar style
refreshAfterThemeChange();

// Projects section behavior
const projects = [
  {
    title: "Restaurant Reservation Platform",
    details:
      "A full-stack restaurant reservation system that allows users to browse restaurants, book tables, and manage reservations efficiently with real-time availability handling.",
    tools: ["MongoDB", "Express.js", "React.js", "TailwindCSS", "Node.js"],
    image: "public/project-1.png",
    live: "https://dinearea.netlify.app/",
    github: "https://github.com/SGMohan/Restaurant-Reservation-Platform",
  },
  {
    title: "Quick Chat Application",
    details:
      "A real-time chat application that enables instant messaging using WebSocket connections, allowing users to send and receive messages seamlessly with efficient and responsive communication.",
    tools: [
      "MongoDB",
      "Express.js",
      "React.js",
      "TailwindCSS",
      "Node.js",
      "Socket.io",
    ],
    image: "public/project-2.png",
    live: "https://quickmsg-app.netlify.app/",
    github: "https://github.com/SGMohan/Chat-App",
  },
];

let currentProject = 0;

function renderProject(index) {
  const project = projects[index];
  if (!project) return;

  const img = document.getElementById("projectImg");
  const title = document.getElementById("projectTitle");
  const details = document.getElementById("projectDetails");
  const toolsContainer = document.getElementById("projectTools");
  const liveLink = document.getElementById("projectLive");
  const gitLink = document.getElementById("projectGit");
  const imgLink = document.getElementById("projectImageLink");

  if (img) {
    img.src = project.image;
    img.alt = project.title;
  }
  if (imgLink) imgLink.href = project.live;
  if (title) title.textContent = project.title;
  if (details) details.textContent = project.details;
  if (liveLink) liveLink.href = project.live;
  if (gitLink) gitLink.href = project.github;

  if (toolsContainer) {
    toolsContainer.innerHTML = "";
    project.tools.forEach((tool) => {
      const li = document.createElement("li");
      li.className =
        "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-300 hover:shadow-md dark:border-white/20 dark:hover:bg-darkHover transition";
      const icon = document.createElement("img");
      icon.src =
        {
          "React.js": "public/react.png",
          "Node.js": "public/nodejs.png",
          "Express.js": "public/express.png",
          "MongoDB": "public/mongodb.png",
          "TailwindCSS": "public/tailwindCSS.png",
          "Socket.io": "public/socket.io.png",
        }[tool] || "public/default.png";
      icon.alt = tool;
      icon.className = "w-5 sm:w-6";
      if (tool === "Express.js" || tool === "Socket.io") icon.classList.add("dark:invert");
      li.appendChild(icon);
      toolsContainer.appendChild(li);
    });
  }

  document.getElementById("prevProject").classList.toggle("!hidden", index === 0);
  document.getElementById("nextProject").classList.toggle("!hidden", index === projects.length - 1);
  document.getElementById("prevProjectMobile").classList.toggle("!hidden", index === 0);
  document.getElementById("nextProjectMobile").classList.toggle("!hidden", index === projects.length - 1);
}

function setProject(direction) {
  const nextIndex = currentProject + direction;
  if (nextIndex >= 0 && nextIndex < projects.length) {
    currentProject = nextIndex;
    renderProject(currentProject);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  renderProject(0);

  document.getElementById("nextProject")?.addEventListener("click", (e) => {
    e.preventDefault();
    setProject(1);
  });

  document.getElementById("prevProject")?.addEventListener("click", (e) => {
    e.preventDefault();
    setProject(-1);
  });

  document
    .getElementById("nextProjectMobile")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      setProject(1);
    });

  document
    .getElementById("prevProjectMobile")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      setProject(-1);
    });
});
