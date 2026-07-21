(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const icons = {
    code: '<svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 9-4 3 4 3"></path><path d="m16 9 4 3-4 3"></path><path d="m14 5-4 14"></path></svg>',
    database: '<svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5"></path><path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"></path></svg>',
    chart: '<svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19V9"></path><path d="M10 19V5"></path><path d="M16 19v-7"></path><path d="M22 19V2"></path></svg>',
    github: '<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8A11.2 11.2 0 0 0 8.46 22.62c.56.1.77-.24.77-.54v-2.14c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.66-1.25-1.66-1.03-.7.08-.69.08-.69 1.13.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.5-.28-5.13-1.25-5.13-5.55 0-1.23.44-2.23 1.15-3.02-.11-.28-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.15a10.6 10.6 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.22 2.7.11 2.98.71.79 1.15 1.79 1.15 3.02 0 4.31-2.64 5.26-5.15 5.54.4.35.77 1.04.77 2.1v3.12c0 .3.2.66.78.54A11.2 11.2 0 0 0 12 .8Z"></path></svg>',
    download: '<svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>',
    linkedin: '<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 7.3H1.3V20.7h3.9V7.3ZM3.25 1.3A2.27 2.27 0 1 0 3.3 5.84a2.27 2.27 0 0 0-.05-4.54ZM22 13c0-4-2.13-5.86-4.98-5.86-2.3 0-3.33 1.26-3.91 2.15V7.3H9.2v13.4h3.91v-6.63c0-1.75.33-3.46 2.5-3.46 2.13 0 2.16 2 2.16 3.58v6.51h3.91L22 13Z"></path></svg>',
    email: '<svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path></svg>'
  };

  function addIcon(element, markup) {
    if (element && !element.querySelector("svg")) {
      element.insertAdjacentHTML("afterbegin", markup);
    }
  }

  function setupTyping() {
    const heading = document.querySelector(".hero h2");
    if (!heading) return;

    const phrases = ["BSc IT Student", "Aspiring Data Analyst"];
    const text = document.createElement("span");
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.setAttribute("aria-hidden", "true");
    heading.textContent = "";
    heading.append(text, cursor);

    if (reducedMotion) {
      text.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = true;
    text.textContent = phrases[0];

    function type() {
      const phrase = phrases[phraseIndex];
      characterIndex += deleting ? -1 : 1;
      text.textContent = phrase.slice(0, Math.max(0, characterIndex));

      let delay = deleting ? 45 : 75;
      if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }
      setTimeout(type, delay);
    }

    setTimeout(type, 1500);
  }

  function setupIcons() {
    document.querySelectorAll(".skill").forEach((skill) => {
      const text = skill.textContent.trim().toLowerCase();
      if (text === "sql") addIcon(skill, icons.database);
      else if (text.includes("data analytics") || text.includes("power bi")) addIcon(skill, icons.chart);
      else if (text.includes("github")) addIcon(skill, icons.github.replace('class="link-icon"', 'class="skill-icon"'));
      else addIcon(skill, icons.code);
    });

    document.querySelectorAll("a").forEach((link) => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      const text = link.textContent.trim().toLowerCase();
      if (href.endsWith(".pdf") || link.hasAttribute("download")) addIcon(link, icons.download);
      else if (href.includes("github.com")) addIcon(link, icons.github);
      else if (href.includes("linkedin.com")) addIcon(link, icons.linkedin);
      else if (href.startsWith("mailto:")) addIcon(link, icons.email);
    });
  }

  function setupReveal() {
    const elements = document.querySelectorAll("section h3, section p, .skill, .card");
    elements.forEach((element) => element.classList.add("reveal"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    elements.forEach((element) => observer.observe(element));
  }

  function setupNav() {
    const nav = document.querySelector("nav");
    const links = [...document.querySelectorAll('nav a[href^="#"]')];
    const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

    const updateNav = () => nav?.classList.toggle("scrolled", window.scrollY > 20);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });

    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-30% 0px -58% 0px" });

    sections.forEach((section) => observer.observe(section));
  }

  function setupBackToTop() {
    const button = document.createElement("button");
    button.className = "back-to-top";
    button.type = "button";
    button.textContent = "↑";
    button.setAttribute("aria-label", "Back to top");
    document.body.append(button);

    const update = () => button.classList.toggle("show", window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));
  }

  function init() {
    setupTyping();
    setupIcons();
    setupReveal();
    setupNav();
    setupBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
