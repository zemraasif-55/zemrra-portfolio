(() => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const menuIcon = menuToggle?.querySelector("i");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    navLinks?.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
    if (menuIcon) menuIcon.className = "fa-solid fa-bars";
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    if (menuIcon) menuIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  });

  navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("scrolled", y > 20);
    backToTop?.classList.toggle("visible", y > 500);

    let current = "";
    document.querySelectorAll("main section[id]").forEach(section => {
      if (y >= section.offsetTop - 160) current = section.id;
    });
    navLinks?.querySelectorAll("a").forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  // Assign deliberate directions and stagger timings for scroll reveals.
  document.querySelectorAll(".skills-grid, .project-list").forEach(grid => {
    const cards = Array.from(grid.querySelectorAll(":scope > .reveal"));
    cards.forEach((card, index) => {
      card.style.setProperty("--reveal-delay", `${(index % (grid.classList.contains("skills-grid") ? 4 : 2)) * 120}ms`);
      card.classList.add(index % 2 === 0 ? "reveal-up" : "reveal-up-soft");
    });
  });

  document.querySelectorAll(".about-grid > *, .certificates-grid > *").forEach((item, index) => {
    if (item.classList.contains("reveal")) item.classList.add(index === 0 ? "reveal-left" : "reveal-right");
  });

  // Contact cards are staggered individually, not as one large block.
  document.querySelectorAll(".contact-grid").forEach(grid => {
    grid.classList.remove("reveal");
    Array.from(grid.children).forEach((card, index) => {
      card.classList.add("reveal", "reveal-up");
      card.style.setProperty("--reveal-delay", `${index * 130}ms`);
    });
  });

  // Section headings get a short, clean rise-in; no flashing or glow effects.
  document.querySelectorAll(".section-heading.reveal, .projects-heading.reveal, .resume-panel.reveal, .certificate-list.reveal").forEach(item => {
    item.classList.add("reveal-up");
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -45px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  const typing = document.querySelector(".typing");
  if (typing && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const words = ["Frontend Developer", "Web Designer", "Creative Learner"];
    let wordIndex = 0, charIndex = words[0].length, deleting = false;
    typing.textContent = words[0];
    const tick = () => {
      const word = words[wordIndex];
      if (deleting) {
        charIndex--;
        typing.textContent = word.slice(0, charIndex);
      } else {
        charIndex++;
        typing.textContent = word.slice(0, charIndex);
      }
      let delay = deleting ? 45 : 85;
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
      }
      window.setTimeout(tick, delay);
    };
    window.setTimeout(tick, 1800);
  }
  // Back to Top Button
const backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
  backToTopButton.addEventListener("click", function (event) {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
})();
