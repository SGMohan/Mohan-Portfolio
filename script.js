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

// Internship carousel behavior
const internships = [
  {
    number: "01",
    title: "Full Stack Developer Intern",
    duration: "Jun 2026 - Aug 2026",
    company: "Pointel Solutions",
    image: "public/certificate-6.png",
    imageAlt: "Pointel Solutions Internship Experience",
    certificate:
      "https://drive.google.com/file/d/1P35wAfUYBISfghnP_adb2u9HmdsEWdeb/view?usp=sharing",
    details:
      "Completed structured training in Java and Java Full Stack Development, followed by hands-on backend development using Spring Boot, Hibernate and MySQL. Worked on service-layer logic, database operations, debugging and implementing fixes based on business requirements.",
    highlights: [
      "Built and enhanced backend functionality using Spring Boot, Hibernate and MySQL.",
      "Worked on service-layer logic, database operations and debugging to implement application fixes.",
    ],
  },
  {
    number: "02",
    title: "Frontend Developer Intern",
    duration: "Dec 2025 - Mar 2026",
    company: "Nura9 Technologies",
    image: "public/certificate-4.png",
    imageAlt: "Nura9 Internship Certificate",
    certificate:
      "https://drive.google.com/file/d/1p6rL5GnlO1kP03rX97wDoD6LtR2FpoB4/view?usp=sharing",
    details:
      "Worked on improving UI quality and consistency by fixing design issues and building reusable components. Collaborated with the backend team to integrate REST APIs and enable seamless data flow. Contributed to Flutter mobile features and implemented real-time chat functionality using WebSockets.",
    highlights: [
      "Reduced UI issue count by enhancing component reuse and consistency.",
      "Completed backend API integration for dashboard and user modules.",
    ],
  },
];

const internshipSlides = internships;
let currentInternship = 0;

function renderInternships() {
  const track = document.getElementById("internshipTrack");
  if (!track) return;

  track.innerHTML = internships
    .map(
      (internship) => `
        <article class="w-full min-w-0">
          <div
            class="h-full flex flex-col
                   border border-gray-300 rounded-xl sm:rounded-2xl
                   p-5 sm:p-6 md:p-8
                   bg-white
                   transition-all duration-300
                   hover:bg-lightHover
                   md:hover:-translate-y-1
                   md:hover:shadow-[5px_5px_0_#000]
                   dark:bg-darkTheme
                   dark:border-white/20
                   dark:hover:bg-darkHover
                   dark:md:hover:shadow-[5px_5px_0_#fff]"
          >

            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">

              <div class="min-w-0">
                <span class="text-xs sm:text-sm text-gray-400 dark:text-white/40">
                  ${internship.number}
                </span>

                <h3
                  class="mt-1 text-xl sm:text-2xl lg:text-3xl
                         font-semibold leading-tight
                         text-black dark:text-white break-words"
                >
                  ${internship.title}
                </h3>

                <p
                  class="mt-2 text-sm sm:text-base
                         text-gray-500 dark:text-white/60
                         break-words"
                >
                  ${internship.company} · ${internship.duration}
                </p>
              </div>

              <span
                class="w-max shrink-0
                       px-3 sm:px-4 py-1 sm:py-1.5
                       rounded-full text-xs
                       border border-gray-300
                       text-gray-600
                       dark:border-white/20 dark:text-white/60"
              >
                Internship
              </span>
            </div>

            <!-- Description -->
            <p
              class="mt-5 sm:mt-6
                     text-sm sm:text-base
                     text-gray-700 dark:text-gray-200
                     leading-6 sm:leading-7"
            >
              ${internship.details}
            </p>

            <!-- Highlights -->
            <ul
              class="mt-5 sm:mt-6 space-y-3
                     text-sm sm:text-base
                     text-gray-700 dark:text-gray-200"
            >
              ${internship.highlights
                .map(
                  (highlight) => `
                    <li class="flex items-start gap-3">
                      <span
                        class="mt-2 sm:mt-2.5
                               w-1.5 h-1.5 rounded-full
                               bg-gray-500 dark:bg-white/60
                               shrink-0"
                      ></span>

                      <span class="min-w-0 leading-6 sm:leading-7">
                        ${highlight}
                      </span>
                    </li>
                  `,
                )
                .join("")}
            </ul>

            <!-- Certificate -->
            <div
              class="mt-auto pt-6 sm:pt-8 mt-6 sm:mt-8
                     border-t border-gray-200 dark:border-white/10"
            >
              <a
                href="${internship.certificate}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex w-full sm:w-auto
                       items-center justify-center gap-2
                       px-5 sm:px-6 py-2.5
                       text-sm sm:text-base
                       border border-gray-700
                       rounded-full
                       text-gray-700
                       transition-all duration-300
                       hover:bg-black hover:text-white
                       md:hover:-translate-y-0.5
                       dark:border-white/40
                       dark:text-white
                       dark:hover:bg-white
                       dark:hover:text-black"
              >
                View Certificate
                <span class="text-base sm:text-lg">↗</span>
              </a>
            </div>

          </div>
        </article>
      `,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderInternships);

document.addEventListener("DOMContentLoaded", () => {
  renderInternships();
});

function setInternship(direction) {
  currentInternship =
    (currentInternship + direction + internshipSlides.length) %
    internshipSlides.length;
  document.getElementById("internshipTrack")?.scrollTo({
    left:
      currentInternship *
      document.getElementById("internshipTrack").clientWidth,
    behavior: "smooth",
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderInternships();
  const internshipTrack = document.getElementById("internshipTrack");
  let isInternshipPaused = false;

  const internshipTimer = window.setInterval(() => {
    if (!isInternshipPaused && !document.hidden) setInternship(1);
  }, 5000);

  internshipTrack?.addEventListener("mouseenter", () => {
    isInternshipPaused = true;
  });
  internshipTrack?.addEventListener("mouseleave", () => {
    isInternshipPaused = false;
  });
  internshipTrack?.addEventListener("focusin", () => {
    isInternshipPaused = true;
  });
  internshipTrack?.addEventListener("focusout", () => {
    isInternshipPaused = false;
  });

  window.addEventListener("beforeunload", () => {
    window.clearInterval(internshipTimer);
  });
});

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
          MongoDB: "public/mongodb.png",
          TailwindCSS: "public/tailwindCSS.png",
          "Socket.io": "public/socket.io.png",
        }[tool] || "public/default.png";
      icon.alt = tool;
      icon.className = "w-5 sm:w-6";
      if (tool === "Express.js" || tool === "Socket.io")
        icon.classList.add("dark:invert");
      li.appendChild(icon);
      toolsContainer.appendChild(li);
    });
  }

  document.getElementById("prevProject").classList.remove("!hidden");
  document.getElementById("nextProject").classList.remove("!hidden");
  document.getElementById("prevProjectMobile").classList.remove("!hidden");
  document.getElementById("nextProjectMobile").classList.remove("!hidden");
}

function setProject(direction) {
  currentProject =
    (currentProject + direction + projects.length) % projects.length;
  renderProject(currentProject);
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
