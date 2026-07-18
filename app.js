const STORAGE_KEY = "class-f-site-config";
const AUTH_KEY = "class-f-admin-authenticated";

const defaultConfig = {
  adminPassword: "classfadmin",
  welcomeTitle: "Selamat Datang",
  welcomeByline: "BY LUTFIZX",
  brandName: "Class f",
  brandTagline: "MEDIA",
  brandDescription: "Website utama Class f dengan tampilan gelap neon yang sama seperti referensi dan tetap bisa diganti oleh admin.",
  brandInitials: "CF",
  brandImageUrl: "",
  aboutText: "Hubungi sosial media developer di bawah ini.",
  footerText: "© 2026 Class f",
  menuItems: [
    {
      title: "Struktur",
      subtitle: "",
      icon: "structure",
      url: "#"
    },
    {
      title: "TikTok",
      subtitle: "",
      icon: "tiktok",
      url: "https://www.tiktok.com/"
    },
    {
      title: "Gallery",
      subtitle: "",
      icon: "image",
      url: "#"
    },
    {
      title: "Jadwal",
      subtitle: "",
      icon: "calendar-days",
      url: "#"
    }
  ],
  socialLinks: [
    {
      label: "TikTok",
      url: "https://tiktok.com/@lutzzx_77"
    },
    {
      label: "WhatsApp",
      url: "https://wa.me/6281330941251"
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/lutfizx_kelazz"
    }
  ]
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeConfig(savedConfig) {
  const config = deepClone(defaultConfig);
  if (!savedConfig || typeof savedConfig !== "object") {
    return config;
  }

  Object.assign(config, savedConfig);

  if (!Array.isArray(savedConfig.menuItems) || savedConfig.menuItems.length === 0) {
    config.menuItems = deepClone(defaultConfig.menuItems);
  }

  if (!Array.isArray(savedConfig.socialLinks) || savedConfig.socialLinks.length === 0) {
    config.socialLinks = deepClone(defaultConfig.socialLinks);
  }

  return config;
}

function getStoredConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return mergeConfig(raw ? JSON.parse(raw) : null);
  } catch (error) {
    console.error("Gagal membaca konfigurasi website.", error);
    return deepClone(defaultConfig);
  }
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value || "";
  }
}

function normalizeUrl(url) {
  if (!url) {
    return "#";
  }

  return url;
}

function getMenuIcon(iconName) {
  const icons = {
    structure: `
      <svg viewBox="0 0 24 24" fill="none" class="menu-icon" aria-hidden="true">
        <rect x="10" y="3" width="4" height="4" rx="1"></rect>
        <rect x="3" y="16" width="4" height="4" rx="1"></rect>
        <rect x="10" y="16" width="4" height="4" rx="1"></rect>
        <rect x="17" y="16" width="4" height="4" rx="1"></rect>
        <path d="M12 7v4M12 11H5v5M12 11h7v5"></path>
      </svg>
    `,
    image: `
      <svg viewBox="0 0 24 24" fill="none" class="menu-icon" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
        <circle cx="9" cy="10" r="2"></circle>
        <path d="M21 16l-5.5-5.5L8 18"></path>
      </svg>
    `,
    "calendar-days": `
      <svg viewBox="0 0 24 24" fill="none" class="menu-icon" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2"></rect>
        <path d="M16 3v4M8 3v4M3 10h18"></path>
      </svg>
    `,
    "music-4": `
      <svg viewBox="0 0 24 24" fill="none" class="menu-icon" aria-hidden="true">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
    `,
    phone: `
      <svg viewBox="0 0 24 24" fill="none" class="menu-icon" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.87 19.87 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.87 19.87 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.23a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92z"></path>
      </svg>
    `,
    link: `
      <svg viewBox="0 0 24 24" fill="none" class="menu-icon" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l2.92-2.92a5 5 0 0 0-7.07-7.07L11.72 5"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54L3.54 13.38a5 5 0 1 0 7.07 7.07L12.28 19"></path>
      </svg>
    `,
    instagram: `
      <svg viewBox="0 0 24 24" fill="none" class="menu-icon" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5"></rect>
        <circle cx="12" cy="12" r="4"></circle>
        <circle cx="17.5" cy="6.5" r="1"></circle>
      </svg>
    `,
    tiktok: `
      <svg viewBox="0 0 24 24" fill="none" class="menu-icon" aria-hidden="true">
        <path d="M14 4c1.1 2.2 2.8 3.7 5 4.1v3a8.8 8.8 0 0 1-5-1.7v5.4a5 5 0 1 1-5-5"></path>
      </svg>
    `
  };

  return icons[iconName] || icons.link;
}

function renderMenuItems(menuItems) {
  const container = document.getElementById("menuGrid");
  if (!container) {
    return;
  }

  container.innerHTML = "";

  menuItems.forEach((item) => {
    const card = document.createElement("a");
    card.className = "menu-card";
    card.href = normalizeUrl(item.url);
    if (item.url && /^https?:\/\//i.test(item.url)) {
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    card.innerHTML = `
      <div class="menu-card-inner">
        <div class="menu-hexagon">${getMenuIcon(item.icon)}</div>
        <h3>${item.title || "Menu"}</h3>
        <p>${item.subtitle || "Atur dari panel admin"}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderSocialLinks(socialLinks) {
  const container = document.getElementById("socialLinks");
  if (!container) {
    return;
  }

  container.innerHTML = "";

  socialLinks.forEach((item) => {
    const link = document.createElement("a");
    link.className = "social-chip";
    link.textContent = item.label || "Social";
    link.href = normalizeUrl(item.url);
    if (item.url && /^https?:\/\//i.test(item.url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    container.appendChild(link);
  });
}

function renderBrandLogo(config) {
  const image = document.getElementById("brandImage");
  const generatedLogo = document.getElementById("brandGeneratedLogo");
  if (!image || !generatedLogo) {
    return;
  }

  if (config.brandImageUrl) {
    image.src = config.brandImageUrl;
    image.hidden = false;
    generatedLogo.hidden = true;
  } else {
    image.removeAttribute("src");
    image.hidden = true;
    generatedLogo.hidden = false;
    generatedLogo.innerHTML = createGeneratedLogoSvg(config.brandName || "Class f");
  }
}

function createGeneratedLogoSvg(brandName) {
  const safeName = String(brandName || "Class f")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `
    <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.4" result="blur"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <rect width="200" height="200" rx="100" fill="#000"></rect>
      <circle cx="100" cy="100" r="63" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.3"></circle>
      <ellipse cx="100" cy="103" rx="74" ry="28" transform="rotate(-18 100 103)" fill="none" stroke="#8c5cff" stroke-width="2.1" filter="url(#glow)"></ellipse>
      <ellipse cx="99" cy="101" rx="60" ry="20" transform="rotate(-18 99 101)" fill="none" stroke="rgba(255,255,255,0.26)" stroke-width="1"></ellipse>
      <path d="M43 77c12 7 20 14 31 17M130 111c10 4 16 7 25 15" stroke="rgba(255,255,255,0.28)" stroke-width="1" stroke-linecap="round"></path>
      <path d="M67 62c10 16 20 29 24 64M112 59c8 18 11 46 6 79" stroke="rgba(255,255,255,0.08)" stroke-width="1"></path>
      <circle cx="48" cy="91" r="2.4" fill="#fff"></circle>
      <circle cx="148" cy="66" r="2.4" fill="#fff"></circle>
      <circle cx="161" cy="115" r="1.8" fill="#fff"></circle>
      <text x="100" y="104" text-anchor="middle" fill="#fff" font-family="Poppins, sans-serif" font-size="21" font-style="italic" font-weight="700">${safeName}</text>
    </svg>
  `;
}

function applyConfig() {
  const config = getStoredConfig();
  document.title = config.brandName || "Class f";
  setText("welcomeTitle", config.welcomeTitle);
  setText("welcomeByline", config.welcomeByline);
  setText("brandName", config.brandName);
  setText("brandTagline", config.brandTagline);
  setText("brandDescription", config.brandDescription);
  setText("aboutText", config.aboutText);
  setText("footerText", config.footerText);

  renderBrandLogo(config);
  renderMenuItems(config.menuItems);
  renderSocialLinks(config.socialLinks);
}

function openAdminModal() {
  const modal = document.getElementById("adminModal");
  const input = document.getElementById("adminPasswordInput");
  const error = document.getElementById("adminLoginError");
  if (!modal) {
    return;
  }
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  if (error) {
    error.textContent = "";
  }
  window.setTimeout(() => input?.focus(), 50);
}

function closeAdminModal() {
  const modal = document.getElementById("adminModal");
  if (!modal) {
    return;
  }
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function setupAdminLogin() {
  const shortcut = document.getElementById("openAdminShortcut");
  const closeButton = document.getElementById("closeAdminModal");
  const backdrop = document.getElementById("adminBackdrop");
  const form = document.getElementById("adminLoginForm");
  const error = document.getElementById("adminLoginError");

  shortcut?.addEventListener("click", openAdminModal);
  closeButton?.addEventListener("click", closeAdminModal);
  backdrop?.addEventListener("click", closeAdminModal);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("adminPasswordInput");
    const config = getStoredConfig();
    const password = input?.value || "";

    if (password === config.adminPassword) {
      localStorage.setItem(AUTH_KEY, "true");
      window.location.href = "admin.html";
      return;
    }

    if (error) {
      error.textContent = "Password admin tidak cocok.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  setupAdminLogin();
});
