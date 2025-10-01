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

// form submission
const form = document.querySelector(
  "form[action='https://formspree.io/f/xgvnyweg']"
);
const toast = document.getElementById("toast");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      form.reset();

      // show toast with smooth animation
      toast.classList.remove("pointer-events-none");
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";

      // hide after 3 seconds
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(1rem)";
        setTimeout(() => toast.classList.add("pointer-events-none"), 500);
      }, 3000);
    } else {
      alert("⚠️ Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("⚠️ Network error. Please try again later.");
    console.error(error);
  }
});
