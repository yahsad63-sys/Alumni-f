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

function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

function ensureAuth() {
  if (localStorage.getItem(AUTH_KEY) !== "true") {
    window.location.href = "index.html";
  }
}

function createMenuEditorItem(item, index) {
  const wrapper = document.createElement("div");
  wrapper.className = "menu-edit-item";
  wrapper.innerHTML = `
    <h3>Menu ${index + 1}</h3>
    <div class="form-grid">
      <label>
        <span>Judul</span>
        <input type="text" name="menu-title-${index}" value="${item.title || ""}">
      </label>
      <label>
        <span>Subtitle</span>
        <input type="text" name="menu-subtitle-${index}" value="${item.subtitle || ""}">
      </label>
      <label>
        <span>Ikon</span>
        <input type="text" name="menu-icon-${index}" value="${item.icon || "link"}">
      </label>
      <label>
        <span>Link</span>
        <input type="text" name="menu-url-${index}" value="${item.url || "#"}">
      </label>
    </div>
  `;
  return wrapper;
}

function createSocialEditorItem(item, index) {
  const wrapper = document.createElement("div");
  wrapper.className = "social-edit-item";
  wrapper.innerHTML = `
    <h3>Link Sosial ${index + 1}</h3>
    <div class="form-grid">
      <label>
        <span>Label</span>
        <input type="text" name="social-label-${index}" value="${item.label || ""}">
      </label>
      <label>
        <span>URL</span>
        <input type="text" name="social-url-${index}" value="${item.url || "#"}">
      </label>
    </div>
  `;
  return wrapper;
}

function populateForm(config) {
  const form = document.getElementById("adminForm");
  if (!form) {
    return;
  }

  form.elements.welcomeTitle.value = config.welcomeTitle || "";
  form.elements.welcomeByline.value = config.welcomeByline || "";
  form.elements.brandName.value = config.brandName || "";
  form.elements.brandTagline.value = config.brandTagline || "";
  form.elements.brandDescription.value = config.brandDescription || "";
  form.elements.brandInitials.value = config.brandInitials || "";
  form.elements.brandImageUrl.value = config.brandImageUrl || "";
  form.elements.aboutText.value = config.aboutText || "";
  form.elements.footerText.value = config.footerText || "";
  form.elements.adminPassword.value = "";

  const menuEditor = document.getElementById("menuEditor");
  const socialEditor = document.getElementById("socialEditor");

  if (menuEditor) {
    menuEditor.innerHTML = "";
    config.menuItems.forEach((item, index) => {
      menuEditor.appendChild(createMenuEditorItem(item, index));
    });
  }

  if (socialEditor) {
    socialEditor.innerHTML = "";
    config.socialLinks.forEach((item, index) => {
      socialEditor.appendChild(createSocialEditorItem(item, index));
    });
  }
}

function collectItems(prefix, total, mapper) {
  return Array.from({ length: total }, (_, index) => mapper(index)).filter((item) => {
    return Object.values(item).some((value) => String(value || "").trim() !== "");
  });
}

function getFormConfig() {
  const form = document.getElementById("adminForm");
  const current = getStoredConfig();

  return {
    ...current,
    welcomeTitle: form.elements.welcomeTitle.value.trim(),
    welcomeByline: form.elements.welcomeByline.value.trim(),
    brandName: form.elements.brandName.value.trim(),
    brandTagline: form.elements.brandTagline.value.trim(),
    brandDescription: form.elements.brandDescription.value.trim(),
    brandInitials: form.elements.brandInitials.value.trim().toUpperCase(),
    brandImageUrl: form.elements.brandImageUrl.value.trim(),
    aboutText: form.elements.aboutText.value.trim(),
    footerText: form.elements.footerText.value.trim(),
    adminPassword: form.elements.adminPassword.value.trim() || current.adminPassword,
    menuItems: collectItems("menu", 4, (index) => ({
      title: form.elements[`menu-title-${index}`].value.trim(),
      subtitle: form.elements[`menu-subtitle-${index}`].value.trim(),
      icon: form.elements[`menu-icon-${index}`].value.trim() || "link",
      url: form.elements[`menu-url-${index}`].value.trim() || "#"
    })),
    socialLinks: collectItems("social", 3, (index) => ({
      label: form.elements[`social-label-${index}`].value.trim(),
      url: form.elements[`social-url-${index}`].value.trim() || "#"
    }))
  };
}

function handleSave(event) {
  event.preventDefault();
  const config = getFormConfig();
  saveConfig(config);

  const message = document.getElementById("saveMessage");
  if (message) {
    message.textContent = "Perubahan berhasil disimpan. Buka website untuk melihat hasil terbaru.";
  }
}

function handleReset() {
  saveConfig(deepClone(defaultConfig));
  populateForm(deepClone(defaultConfig));
  const message = document.getElementById("saveMessage");
  if (message) {
    message.textContent = "Konten dikembalikan ke versi default.";
  }
}

function handleLogout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  ensureAuth();

  const config = getStoredConfig();
  populateForm(config);

  document.getElementById("adminForm")?.addEventListener("submit", handleSave);
  document.getElementById("resetContent")?.addEventListener("click", handleReset);
  document.getElementById("logoutAdmin")?.addEventListener("click", handleLogout);
});
