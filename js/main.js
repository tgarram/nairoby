/* NAIROBY — mobile nav toggle + slow scroll-reveal + cookie consent banner */

(function () {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  const COOKIE_CONSENT_KEY = "nairoby_cookie_consent";
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");
  const manageLink = document.getElementById("cookie-manage");

  function showCookieBanner() {
    if (banner) banner.classList.add("is-visible");
  }

  function hideCookieBanner() {
    if (banner) banner.classList.remove("is-visible");
  }

  if (banner) {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      window.setTimeout(showCookieBanner, 600);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        hideCookieBanner();
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener("click", () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
        hideCookieBanner();
      });
    }
  }

  if (manageLink) {
    manageLink.addEventListener("click", (event) => {
      event.preventDefault();
      showCookieBanner();
    });
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      const subject = encodeURIComponent(`Contacto desde la web — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:nairoby_armas@yahoo.com?subject=${subject}&body=${body}`;
    });
  }
})();
