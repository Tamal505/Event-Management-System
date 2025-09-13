// Common JS for frontend pages
document.addEventListener("DOMContentLoaded", () => {
  console.log("Frontend loaded successfully!");

  // Highlight active nav link
  const navLinks = document.querySelectorAll("header nav a");
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  // Optional: Add any global event listeners
  setupGlobalEvents();
});

// Global event setup (example)
function setupGlobalEvents() {
  // Example: Scroll to top button
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "↑";
  scrollBtn.id = "scroll-top-btn";
  scrollBtn.style.position = "fixed";
  scrollBtn.style.bottom = "20px";
  scrollBtn.style.right = "20px";
  scrollBtn.style.padding = "10px 15px";
  scrollBtn.style.background = "#007BFF";
  scrollBtn.style.color = "white";
  scrollBtn.style.border = "none";
  scrollBtn.style.borderRadius = "50%";
  scrollBtn.style.cursor = "pointer";
  scrollBtn.style.display = "none";
  document.body.appendChild(scrollBtn);

  // Show/hide on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) scrollBtn.style.display = "block";
    else scrollBtn.style.display = "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Optional: Common API fetch function
async function fetchAPI(url, method = "GET", data = null) {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (data) options.body = JSON.stringify(data);

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (err) {
    console.error("API fetch error:", err);
    return null;
  }
}

// Optional: Toast notification
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.color = "white";
  toast.style.background = type === "success" ? "#28a745" : "#dc3545";
  toast.style.zIndex = 9999;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
