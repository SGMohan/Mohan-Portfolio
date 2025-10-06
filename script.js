const sideMenu = document.getElementById("sideMenu");
const navBar = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

// Mobile menu toggle functions
function openMenu() {
  sideMenu.style.transform = "translateX(-16rem)";
}
function closeMenu() {
  sideMenu.style.transform = "translateX(16rem)";
}

// NavBar Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navBar.classList.add(
      "bg-transparent",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "shadow-sm"
    );
    navLinks.classList.remove("bg-white/60", "bg-opacity-50", "shadow-sm");
  } else {
    navBar.classList.remove(
      "bg-transparent",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "shadow-sm"
    );
    navLinks.classList.add("bg-white/60", "bg-opacity-50", "shadow-sm");
  }
});


