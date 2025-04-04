document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const footer = document.querySelector("footer");
 
    sections.forEach((section) => {
       const rect = section.getBoundingClientRect();
       if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          footer.style.backgroundColor = section.dataset.footerColor || "#333";
          footer.innerHTML = section.dataset.footerContent || "<p>Footer estándar</p>";
       }
    });
 });