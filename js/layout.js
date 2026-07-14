const includeTargets = [
  { selector: "#site-header", file: "partials/header.html" },
  { selector: "#site-footer", file: "partials/footer.html" },
];

const loadLayoutPartials = async () => {
  const tasks = includeTargets.map(async ({ selector, file }) => {
    const node = document.querySelector(selector);

    if (!node) {
      return;
    }

    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to load ${file}`);
    }

    node.innerHTML = await response.text();
  });

  await Promise.all(tasks);

  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".site-nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const normalizedHref = href.split("#")[0] || "index.html";

    if (normalizedHref === currentPage || (currentPage === "index.html" && href.startsWith("index.html#"))) {
      link.classList.add("is-active");
    }
  });
};

loadLayoutPartials().catch((error) => {
  console.error("Layout include failed:", error);
});
