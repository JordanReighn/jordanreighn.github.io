(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const storedTheme = localStorage.getItem("theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.classList.add("reveal-ready");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "dark" ? "#111113" : "#f6f2ea");

    if (themeToggle) {
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  applyTheme(storedTheme || preferredTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  const cloud = document.querySelector(".tech-cloud");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canUseCursorGlow = window.matchMedia("(pointer: fine)").matches && !reduceMotion;

  if (canUseCursorGlow) {
    const cursorGlow = document.createElement("div");
    let glowFrame = 0;
    let glowX = 0;
    let glowY = 0;

    cursorGlow.className = "cursor-glow";
    document.body.appendChild(cursorGlow);

    function updateGlow() {
      cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      glowFrame = 0;
    }

    window.addEventListener(
      "pointermove",
      function (event) {
        if (event.pointerType === "touch") {
          return;
        }

        glowX = event.clientX;
        glowY = event.clientY;
        root.classList.add("has-cursor-glow");

        if (!glowFrame) {
          glowFrame = requestAnimationFrame(updateGlow);
        }
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", function () {
      root.classList.remove("has-cursor-glow");
    });
  }

  if (cloud) {
    const tags = [
      "C#",
      "ASP.NET Core",
      ".NET 8",
      ".NET MAUI",
      "Blazor",
      "Razor",
      "Minimal APIs",
      "SQL",
      "SQL Server",
      "PostgreSQL",
      "MySQL",
      "REST APIs",
      "GraphQL",
      "Webhooks",
      "Azure",
      "Azure Functions",
      "Azure App Service",
      "Azure SQL",
      "Azure Storage",
      "Azure Service Bus",
      "Azure Key Vault",
      "API Management",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Power Platform",
      "Microsoft Graph",
      "Power BI",
      "Entity Framework Core",
      "Dapper",
      "Docker",
      "Containers",
      "Kubernetes",
      "Redis",
      "RabbitMQ",
      "CI/CD",
      "GitHub Actions",
      "Azure DevOps",
      "DevOps",
      "YAML",
      "Bicep",
      "Terraform",
      "Power Automate",
      "Power Apps",
      "Dataverse",
      "SharePoint",
      "OAuth 2.0",
      "OpenID Connect",
      "JWT",
      "SSO",
      "RBAC",
      "Microsoft Entra ID",
      "SignalR",
      "XAML",
      "MVVM",
      "SQLite",
      "Offline Sync",
      "Offline-first",
      "Mobile Apps",
      "Cloud Architecture",
      "Microservices",
      "Distributed Systems",
      "Event-driven",
      "Background Jobs",
      "Queues",
      "Caching",
      "Telemetry",
      "OpenTelemetry",
      "Serilog",
      "Observability",
      "Clean Architecture",
      "Domain Logic",
      "Unit Testing",
      "Integration Tests",
      "Security",
      "API Design",
      "Data Modeling",
      "ETL",
      "Data Integration",
      "Automation",
      "Enterprise Apps",
      "Enterprise Integrations",
      "Full-stack",
    ];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const pointer = { x: 0, y: 0 };
    const targetPointer = { x: 0, y: 0 };
    const points = tags.map(function (tag, index) {
      const y = tags.length === 1 ? 0 : 1 - (index / (tags.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;
      const span = document.createElement("span");

      span.textContent = tag;
      cloud.appendChild(span);

      return {
        el: span,
        x: Math.cos(theta) * radius,
        y: y,
        z: Math.sin(theta) * radius,
      };
    });

    window.addEventListener(
      "pointermove",
      function (event) {
        targetPointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
        targetPointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );

    function render(time) {
      const radiusX = cloud.clientWidth * 0.44;
      const radiusY = cloud.clientHeight * 0.42;

      pointer.x += (targetPointer.x - pointer.x) * 0.045;
      pointer.y += (targetPointer.y - pointer.y) * 0.045;

      const rotateY = time * 0.00016 + pointer.x * 1.15;
      const rotateX = 0.35 + Math.sin(time * 0.0001) * 0.14 - pointer.y * 0.78;
      const cosY = Math.cos(rotateY);
      const sinY = Math.sin(rotateY);
      const cosX = Math.cos(rotateX);
      const sinX = Math.sin(rotateX);

      points.forEach(function (point) {
        const x1 = point.x * cosY + point.z * sinY;
        const z1 = -point.x * sinY + point.z * cosY;
        const y1 = point.y * cosX - z1 * sinX;
        const z2 = point.y * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2;
        const scale = 0.58 + depth * 0.62;

        point.el.style.opacity = String(0.2 + depth * 0.72);
        point.el.style.zIndex = String(Math.round(depth * 100));
        point.el.style.transform = `translate3d(calc(-50% + ${x1 * radiusX}px), calc(-50% + ${y1 * radiusY}px), 0) scale(${scale})`;
      });

      if (!reduceMotion) {
        requestAnimationFrame(render);
      }
    }

    render(0);
  }
})();
