const state = {
  hospitals: [],
  filtered: [],
  favoritesOnly: false,
  compareMode: false,
  compareSelected: JSON.parse(localStorage.getItem("compareSelected") || "[]"),
  lang: localStorage.getItem("lang") || "en",
  dark: localStorage.getItem("darkMode") === "true",
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  quickSpecialty: "all",
  searchText: ""
};

const uiText = {
  en: {
    title: "Thailand Hospitals Directory",
    subtitle: "Search hospitals in Thailand for Myanmar patients with specialist filters, maps, compare tools, favorites, export, and offline support.",
    importantLabel: "Important:",
    importantText: "Hospital contact details and specialist availability may change. Please confirm with official websites.",
    emergencyTitle: "Emergency Notes",
    emergencyList: [
      "For emergency symptoms, call local emergency services immediately.",
      "Contact the nearest hospital instead of waiting for online response.",
      "Bring passport, current medicines, and previous medical records if possible."
    ],
    bestIntl: "Best for International Patients",
    bestComplex: "Best for Complex Cases",
    bestEye: "Best for Eye Care",
    bestOrtho: "Best for Orthopedics / Spine",
    statTotal: "Hospitals",
    statCities: "Cities",
    statFavorites: "Favorites",
    statCompare: "Compare",
    directoryTitle: "Hospital Directory",
    directorySubtitle: "Search, filter, compare, save favorites, and export data.",
    bookingTitle: "How to Book",
    stepsTitle: "Steps",
    stepsList: [
      "Choose a hospital based on your condition.",
      "Use search and specialty filters.",
      "Open the official website.",
      "Check doctor profiles or international patient page.",
      "Prepare medical records and passport details.",
      "Ask for appointment date, fee, and Myanmar interpreter if needed.",
      "Confirm travel plan and required documents."
    ],
    templateTitle: "Message Template",
    templateText: `Hello,

I am a patient from Myanmar and I would like to make an appointment with a specialist in [specialty] for [condition/problem].

Please let me know:
1. Which doctor is most suitable
2. Earliest appointment date
3. Consultation fee
4. Whether Myanmar interpreter is available

I can send my medical records by email or WhatsApp if needed.

Name:
Age:
Phone / WhatsApp:`,
    disclaimerTitle: "Disclaimer",
    disclaimerText: "This directory is for informational purposes only and does not replace professional medical advice or direct hospital consultation.",
    allCities: "All Cities",
    allSpecialties: "All Specialties",
    searchPlaceholder: "Search hospital, city, specialty...",
    favoritesBtn: "❤ Favorites",
    compareBtn: "⚖ Compare",
    csvBtn: "⬇ CSV",
    favoritesCsvBtn: "⬇ Favorites CSV",
    printBtn: "🖨 Print",
    clearBtn: "Clear",
    compareSelectedLabel: "Selected for compare:",
    viewCompareBtn: "View Compare",
    clearCompareBtn: "Clear Compare",
    copyTemplateBtn: "Copy Template",
    shareSiteBtn: "Share Site",
    found: "hospital(s) found",
    favoritesActive: "Favorites only enabled",
    compareActive: "Compare mode enabled",
    noResults: "No hospitals found",
    noResultsText: "Please try another search keyword or filter.",
    viewDetails: "View Details",
    googleMaps: "Google Maps",
    copyPhone: "Copy Phone",
    copyWebsite: "Copy Website",
    favorite: "Favorite",
    unfavorite: "Unfavorite",
    addCompare: "Add Compare",
    removeCompare: "Remove Compare",
    categoryQuick: ["All", "Cardiology", "Oncology", "Orthopedics", "Neurology", "Pediatrics", "Fertility", "Eye", "Plastic Surgery"],
    copied: "Copied!",
    shared: "Site link copied",
    compareLimit: "You can compare up to 3 hospitals.",
    modalCategory: "Category",
    modalAddress: "Address",
    modalArea: "Area",
    modalPhone: "Phone",
    modalWebsite: "Website",
    modalMyanmar: "Myanmar Support",
    modalSpecialties: "Specialties",
    compareTitle: "Hospital Compare"
  },
  my: {
    title: "ထိုင်းဆေးရုံလမ်းညွှန်",
    subtitle: "မြန်မာလူနာများအတွက် ထိုင်းနိုင်ငံရှိ ဆေးရုံများကို အထူးကု filter, map, compare, favorite, export နှင့် offline support များဖြင့် ရှာဖွေနိုင်ပါသည်။",
    importantLabel: "အရေးကြီး:",
    importantText: "ဆေးရုံ contact နှင့် အထူးကု availability များ ပြောင်းလဲနိုင်သဖြင့် official website တွင် ပြန်စစ်ပါ။",
    emergencyTitle: "အရေးပေါ် မှတ်ချက်",
    emergencyList: [
      "အရေးပေါ်လက္ခဏာများရှိပါက local emergency service ကို ချက်ချင်းဆက်သွယ်ပါ။",
      "Online reply စောင့်မနေဘဲ အနီးဆုံးဆေးရုံကို ဆက်သွယ်ပါ။",
      "Passport, လက်ရှိသောက်ဆေး, medical records များ ယူသွားပါ။"
    ],
    bestIntl: "နိုင်ငံခြားလူနာအတွက် ကောင်းသောဆေးရုံများ",
    bestComplex: "ရောဂါခက်ခဲမှုများအတွက် ကောင်းသောနေရာများ",
    bestEye: "မျက်စိအထူးကုအတွက်",
    bestOrtho: "အရိုး/ကျောရိုးအတွက်",
    statTotal: "ဆေးရုံ",
    statCities: "မြို့",
    statFavorites: "စိတ်ကြိုက်",
    statCompare: "နှိုင်းယှဉ်",
    directoryTitle: "ဆေးရုံစာရင်း",
    directorySubtitle: "ရှာဖွေ၊ filter၊ compare၊ favorite သိမ်း၊ export လုပ်နိုင်သည်။",
    bookingTitle: "Appointment ယူနည်း",
    stepsTitle: "အဆင့်များ",
    stepsList: [
      "ရောဂါအလိုက် သင့်တော်သောဆေးရုံကို ရွေးပါ။",
      "Search နှင့် specialty filter များသုံးပါ။",
      "Official website ကို ဖွင့်ပါ။",
      "Doctor profile သို့ international patient page ကို စစ်ပါ။",
      "Medical records နှင့် passport အချက်အလက်များ ပြင်ပါ။",
      "Appointment date, fee, Myanmar interpreter ရှိ/မရှိ မေးပါ။",
      "ခရီးစဉ်နှင့် လိုအပ်သောစာရွက်စာတမ်းများ အတည်ပြုပါ။"
    ],
    templateTitle: "ပို့ရန် စာနမူနာ",
    templateText: `Hello,

I am a patient from Myanmar and I would like to make an appointment with a specialist in [specialty] for [condition/problem].

Please let me know:
1. Which doctor is most suitable
2. Earliest appointment date
3. Consultation fee
4. Whether Myanmar interpreter is available

I can send my medical records by email or WhatsApp if needed.

Name:
Age:
Phone / WhatsApp:`,
    disclaimerTitle: "သတိပေးချက်",
    disclaimerText: "ဤစာရင်းသည် အချက်အလက်အတွက်သာဖြစ်ပြီး ဆေးရုံ/ဆရာဝန်တိုက်ရိုက်အကြံပြုချက်ကို အစားမထိုးနိုင်ပါ။",
    allCities: "မြို့အားလုံး",
    allSpecialties: "အထူးကုအားလုံး",
    searchPlaceholder: "ဆေးရုံ၊ မြို့၊ အထူးကု ရှာပါ...",
    favoritesBtn: "❤ စိတ်ကြိုက်",
    compareBtn: "⚖ နှိုင်းယှဉ်",
    csvBtn: "⬇ CSV",
    favoritesCsvBtn: "⬇ စိတ်ကြိုက် CSV",
    printBtn: "🖨 ပရင့်",
    clearBtn: "ရှင်းမည်",
    compareSelectedLabel: "နှိုင်းယှဉ်ရန်ရွေးထားသည်:",
    viewCompareBtn: "နှိုင်းယှဉ်ကြည့်မည်",
    clearCompareBtn: "နှိုင်းယှဉ်မှုရှင်းမည်",
    copyTemplateBtn: "စာနမူနာကူးရန်",
    shareSiteBtn: "Site မျှဝေရန်",
    found: "ခု တွေ့ရှိသည်",
    favoritesActive: "စိတ်ကြိုက်များသာ ပြထားသည်",
    compareActive: "နှိုင်းယှဉ်မုဒ် ဖွင့်ထားသည်",
    noResults: "မတွေ့ပါ",
    noResultsText: "တခြားစာလုံး သို့မဟုတ် filter ဖြင့် ပြန်ရှာပါ။",
    viewDetails: "အသေးစိတ်",
    googleMaps: "Google Maps",
    copyPhone: "ဖုန်းကူးရန်",
    copyWebsite: "ဝဘ်ဆိုဒ်ကူးရန်",
    favorite: "သိမ်းမည်",
    unfavorite: "ဖြုတ်မည်",
    addCompare: "နှိုင်းယှဉ်ထည့်",
    removeCompare: "နှိုင်းယှဉ်ဖြုတ်",
    categoryQuick: ["အားလုံး", "Cardiology", "Oncology", "Orthopedics", "Neurology", "Pediatrics", "Fertility", "Eye", "Plastic Surgery"],
    copied: "ကူးပြီးပါပြီ",
    shared: "Site link ကူးပြီးပါပြီ",
    compareLimit: "ဆေးရုံ ၃ ခုအထိသာ နှိုင်းယှဉ်နိုင်သည်။",
    modalCategory: "အမျိုးအစား",
    modalAddress: "လိပ်စာ",
    modalArea: "ဧရိယာ",
    modalPhone: "ဖုန်း",
    modalWebsite: "ဝဘ်ဆိုဒ်",
    modalMyanmar: "မြန်မာ support",
    modalSpecialties: "အထူးကုများ",
    compareTitle: "ဆေးရုံနှိုင်းယှဉ်မှု"
  }
};

const $ = (id) => document.getElementById(id);

const elements = {
  searchInput: $("searchInput"),
  cityFilter: $("cityFilter"),
  specialtyFilter: $("specialtyFilter"),
  sortFilter: $("sortFilter"),
  favoritesOnlyBtn: $("favoritesOnlyBtn"),
  compareModeBtn: $("compareModeBtn"),
  exportCsvBtn: $("exportCsvBtn"),
  exportFavBtn: $("exportFavBtn"),
  printBtn: $("printBtn"),
  clearBtn: $("clearBtn"),
  hospitalList: $("hospitalList"),
  hospitalCount: $("hospitalCount"),
  activeState: $("activeState"),
  darkToggle: $("darkToggle"),
  langToggle: $("langToggle"),
  installBtn: $("installBtn"),
  modalOverlay: $("modalOverlay"),
  modalContent: $("modalContent"),
  closeModal: $("closeModal"),
  compareOverlay: $("compareOverlay"),
  compareContent: $("compareContent"),
  closeCompareModal: $("closeCompareModal"),
  compareBar: $("compareBar"),
  compareCount: $("compareCount"),
  viewCompareBtn: $("viewCompareBtn"),
  clearCompareBtn: $("clearCompareBtn"),
  copyTemplateBtn: $("copyTemplateBtn"),
  shareSiteBtn: $("shareSiteBtn"),
  messageTemplate: $("messageTemplate"),
  quickFilters: $("quickFilters"),
  toast: $("toast"),
  statTotal: $("statTotal"),
  statCities: $("statCities"),
  statFavorites: $("statFavorites"),
  statCompare: $("statCompare")
};

let deferredPrompt = null;

function t() {
  return uiText[state.lang];
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, 2200);
}

async function loadData() {
  const res = await fetch("data.json");
  state.hospitals = await res.json();
  populateFilters();
  buildQuickFilters();
  applyLanguage();
  applyDarkMode();
  renderCompareBar();
  updateStats();
  filterHospitals();
}

function populateFilters() {
  const cities = [...new Set(state.hospitals.map(h => h.city))].sort();
  const specs = [...new Set(state.hospitals.flatMap(h => h.specialties))].sort();

  elements.cityFilter.innerHTML = `<option value="all">${t().allCities}</option>`;
  elements.specialtyFilter.innerHTML = `<option value="all">${t().allSpecialties}</option>`;

  cities.forEach(city => {
    const opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    elements.cityFilter.appendChild(opt);
  });

  specs.forEach(spec => {
    const opt = document.createElement("option");
    opt.value = spec;
    opt.textContent = spec;
    elements.specialtyFilter.appendChild(opt);
  });
}

function buildQuickFilters() {
  elements.quickFilters.innerHTML = "";
  const labels = t().categoryQuick;
  const values = ["all", "Cardiology", "Oncology", "Orthopedics", "Neurology", "Pediatrics", "Fertility", "Eye", "Plastic Surgery"];

  labels.forEach((label, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `quick-btn ${state.quickSpecialty === values[index] ? "active" : ""}`;
    btn.textContent = label;
    btn.addEventListener("click", () => {
      state.quickSpecialty = values[index];
      elements.specialtyFilter.value = values[index] === "all" ? "all" : values[index];
      buildQuickFilters();
      filterHospitals();
    });
    elements.quickFilters.appendChild(btn);
  });
}

function applyLanguage() {
  const text = t();
  document.documentElement.lang = state.lang === "my" ? "my" : "en";

  $("ui-title").textContent = text.title;
  $("ui-subtitle").textContent = text.subtitle;
  $("ui-important-label").textContent = text.importantLabel;
  $("ui-important-text").textContent = text.importantText;
  $("ui-emergency-title").textContent = text.emergencyTitle;
  $("ui-best-intl-title").textContent = text.bestIntl;
  $("ui-best-complex-title").textContent = text.bestComplex;
  $("ui-best-eye-title").textContent = text.bestEye;
  $("ui-best-ortho-title").textContent = text.bestOrtho;
  $("ui-stat-total").textContent = text.statTotal;
  $("ui-stat-cities").textContent = text.statCities;
  $("ui-stat-favorites").textContent = text.statFavorites;
  $("ui-stat-compare").textContent = text.statCompare;
  $("ui-directory-title").textContent = text.directoryTitle;
  $("ui-directory-subtitle").textContent = text.directorySubtitle;
  $("ui-booking-title").textContent = text.bookingTitle;
  $("ui-steps-title").textContent = text.stepsTitle;
  $("ui-template-title").textContent = text.templateTitle;
  $("ui-disclaimer-title").textContent = text.disclaimerTitle;
  $("ui-disclaimer-text").textContent = text.disclaimerText;
  $("ui-compare-selected-label").textContent = text.compareSelectedLabel;

  $("ui-emergency-list").innerHTML = text.emergencyList.map(item => `<li>${item}</li>`).join("");
  $("ui-steps-list").innerHTML = text.stepsList.map(item => `<li>${item}</li>`).join("");
  elements.messageTemplate.value = text.templateText;

  elements.searchInput.placeholder = text.searchPlaceholder;
  elements.favoritesOnlyBtn.textContent = text.favoritesBtn;
  elements.compareModeBtn.textContent = text.compareBtn;
  elements.exportCsvBtn.textContent = text.csvBtn;
  elements.exportFavBtn.textContent = text.favoritesCsvBtn;
  elements.printBtn.textContent = text.printBtn;
  elements.clearBtn.textContent = text.clearBtn;
  elements.viewCompareBtn.textContent = text.viewCompareBtn;
  elements.clearCompareBtn.textContent = text.clearCompareBtn;
  elements.copyTemplateBtn.textContent = text.copyTemplateBtn;
  elements.shareSiteBtn.textContent = text.shareSiteBtn;
  elements.langToggle.textContent = state.lang === "en" ? "မြန်မာ" : "English";

  populateFilters();
  buildQuickFilters();
  filterHospitals();
}

function applyDarkMode() {
  document.body.classList.toggle("dark", state.dark);
  elements.darkToggle.textContent = state.dark ? "☀️" : "🌙";
}

function updateStats() {
  elements.statTotal.textContent = state.hospitals.length;
  elements.statCities.textContent = new Set(state.hospitals.map(h => h.city)).size;
  elements.statFavorites.textContent = state.favorites.length;
  elements.statCompare.textContent = state.compareSelected.length;
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
  updateStats();
}

function saveCompare() {
  localStorage.setItem("compareSelected", JSON.stringify(state.compareSelected));
  updateStats();
}

function toggleFavorite(name) {
  const idx = state.favorites.indexOf(name);
  if (idx >= 0) state.favorites.splice(idx, 1);
  else state.favorites.push(name);
  saveFavorites();
  filterHospitals();
}

function toggleCompare(name) {
  const idx = state.compareSelected.indexOf(name);
  if (idx >= 0) {
    state.compareSelected.splice(idx, 1);
  } else if (state.compareSelected.length < 3) {
    state.compareSelected.push(name);
  } else {
    showToast(t().compareLimit);
    return;
  }
  saveCompare();
  renderCompareBar();
  filterHospitals();
}

function renderCompareBar() {
  elements.compareCount.textContent = state.compareSelected.length;
  elements.compareBar.classList.toggle("hidden", state.compareSelected.length === 0);
}

function copyText(textValue) {
  navigator.clipboard.writeText(textValue).then(() => showToast(t().copied));
}

function shareSite() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: document.title,
      url: window.location.href
    }).catch(() => {});
  } else {
    copyText(window.location.href);
    showToast(t().shared);
  }
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text, query) {
  if (!query) return text;
  const safe = escapeRegExp(query);
  return text.replace(new RegExp(`(${safe})`, "gi"), `<mark class="highlight">$1</mark>`);
}

function openModal(hospital) {
  const mapsUrl = hospital.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}`;
  elements.modalContent.innerHTML = `
    <h2 id="modalTitle">${hospital.name}</h2>
    <p><strong>${t().modalCategory}:</strong> ${hospital.category}</p>
    <p><strong>${t().modalAddress}:</strong> ${hospital.address}</p>
    <p><strong>${t().modalArea}:</strong> ${hospital.area}</p>
    <p><strong>${t().modalPhone}:</strong> <a href="tel:${hospital.phone.replace(/\s/g, "")}">${hospital.phone}</a></p>
    <p><strong>${t().modalWebsite}:</strong> <a href="${hospital.website}" target="_blank" rel="noopener">${hospital.website}</a></p>
    <p><strong>${t().modalMyanmar}:</strong> ${hospital.myanmar}</p>
    <p><strong>${t().modalSpecialties}:</strong> ${hospital.specialties.join(", ")}</p>
    <div class="card-actions">
      <a class="card-btn" href="${mapsUrl}" target="_blank" rel="noopener">${t().googleMaps}</a>
      <button class="card-btn modal-copy-phone-btn" type="button">${t().copyPhone}</button>
      <button class="card-btn modal-copy-site-btn" type="button">${t().copyWebsite}</button>
    </div>
  `;
  elements.modalContent.querySelector(".modal-copy-phone-btn")
    .addEventListener("click", () => copyText(hospital.phone));
  elements.modalContent.querySelector(".modal-copy-site-btn")
    .addEventListener("click", () => copyText(hospital.website));
  elements.modalOverlay.classList.remove("hidden");
  elements.closeModal.focus();
}

function openCompareModal() {
  const selected = state.hospitals.filter(h => state.compareSelected.includes(h.name));
  if (!selected.length) return;

  elements.compareContent.innerHTML = `
    <h2 id="compareTitle">${t().compareTitle}</h2>
    <table class="compare-table">
      <thead>
        <tr>
          <th>Field</th>
          ${selected.map(h => `<th>${h.name}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        <tr><td>${t().modalCategory}</td>${selected.map(h => `<td>${h.category}</td>`).join("")}</tr>
        <tr><td>${t().modalAddress}</td>${selected.map(h => `<td>${h.address}</td>`).join("")}</tr>
        <tr><td>${t().modalArea}</td>${selected.map(h => `<td>${h.area}</td>`).join("")}</tr>
        <tr><td>${t().modalPhone}</td>${selected.map(h => `<td>${h.phone}</td>`).join("")}</tr>
        <tr><td>${t().modalWebsite}</td>${selected.map(h => `<td><a href="${h.website}" target="_blank" rel="noopener">${h.website}</a></td>`).join("")}</tr>
        <tr><td>${t().modalMyanmar}</td>${selected.map(h => `<td>${h.myanmar}</td>`).join("")}</tr>
        <tr><td>${t().modalSpecialties}</td>${selected.map(h => `<td>${h.specialties.join(", ")}</td>`).join("")}</tr>
      </tbody>
    </table>
  `;
  elements.compareOverlay.classList.remove("hidden");
  elements.closeCompareModal.focus();
}

function exportCSV(items, filename = "thailand-hospitals.csv") {
  const headers = ["Name", "City", "Area", "Phone", "Website", "Address", "Category", "Myanmar Support", "Specialties"];
  const rows = items.map(h => [
    h.name, h.city, h.area, h.phone, h.website, h.address, h.category, h.myanmar, h.specialties.join("; ")
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function clearAll() {
  elements.searchInput.value = "";
  elements.cityFilter.value = "all";
  elements.specialtyFilter.value = "all";
  elements.sortFilter.value = "az";
  state.searchText = "";
  state.favoritesOnly = false;
  state.compareMode = false;
  state.quickSpecialty = "all";
  elements.favoritesOnlyBtn.classList.remove("active");
  elements.compareModeBtn.classList.remove("active");
  buildQuickFilters();
  filterHospitals();
}

function renderHospitals(items) {
  elements.hospitalList.innerHTML = "";

  if (!items.length) {
    elements.hospitalList.innerHTML = `
      <div class="hospital-card">
        <h3>${t().noResults}</h3>
        <p>${t().noResultsText}</p>
      </div>
    `;
    elements.hospitalCount.textContent = `0 ${t().found}`;
    elements.activeState.textContent = "";
    return;
  }

  elements.hospitalCount.textContent = `${items.length} ${t().found}`;
  let active = [];
  if (state.favoritesOnly) active.push(t().favoritesActive);
  if (state.compareMode) active.push(t().compareActive);
  elements.activeState.textContent = active.join(" • ");

  items.forEach(hospital => {
    const isFav = state.favorites.includes(hospital.name);
    const inCompare = state.compareSelected.includes(hospital.name);
    const mapsUrl = hospital.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}`;

    const card = document.createElement("article");
    card.className = "hospital-card";

    const titleHtml = highlightText(hospital.name, state.searchText);
    const addressHtml = highlightText(hospital.address, state.searchText);
    const areaHtml = highlightText(hospital.area, state.searchText);
    const myanmarHtml = highlightText(hospital.myanmar, state.searchText);

    card.innerHTML = `
      <div class="badges">
        <span class="badge">${hospital.city}</span>
        <span class="badge">${hospital.category}</span>
      </div>
      <h3>${titleHtml}</h3>
      <p><strong>${t().modalAddress}:</strong> ${addressHtml}</p>
      <p><strong>${t().modalArea}:</strong> ${areaHtml}</p>
      <p><strong>${t().modalPhone}:</strong> <a href="tel:${hospital.phone.replace(/\s/g, "")}">${hospital.phone}</a></p>
      <p><strong>${t().modalWebsite}:</strong> <a href="${hospital.website}" target="_blank" rel="noopener">${hospital.website}</a></p>
      <p><strong>${t().modalMyanmar}:</strong> ${myanmarHtml}</p>
      <div class="specialties">
        ${hospital.specialties.map(spec => `<span class="spec-tag">${highlightText(spec, state.searchText)}</span>`).join("")}
      </div>
      <div class="card-actions">
        <button class="card-btn view-btn" type="button">${t().viewDetails}</button>
        <a class="card-btn" href="${mapsUrl}" target="_blank" rel="noopener">${t().googleMaps}</a>
        <button class="card-btn phone-btn" type="button">${t().copyPhone}</button>
        <button class="card-btn site-btn" type="button">${t().copyWebsite}</button>
        <button class="card-btn fav-btn ${isFav ? "active" : ""}" type="button">${isFav ? t().unfavorite : t().favorite}</button>
        <button class="card-btn compare-btn ${inCompare ? "active" : ""}" type="button">${inCompare ? t().removeCompare : t().addCompare}</button>
      </div>
    `;

    card.querySelector(".view-btn").addEventListener("click", () => openModal(hospital));
    card.querySelector(".phone-btn").addEventListener("click", () => copyText(hospital.phone));
    card.querySelector(".site-btn").addEventListener("click", () => copyText(hospital.website));
    card.querySelector(".fav-btn").addEventListener("click", () => toggleFavorite(hospital.name));
    card.querySelector(".compare-btn").addEventListener("click", () => toggleCompare(hospital.name));

    elements.hospitalList.appendChild(card);
  });
}

function filterHospitals() {
  state.searchText = elements.searchInput.value.trim();
  const searchTextLower = state.searchText.toLowerCase();
  const selectedCity = elements.cityFilter.value;
  const selectedSpec = elements.specialtyFilter.value;
  const sort = elements.sortFilter.value;

  let filtered = state.hospitals.filter(h => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchTextLower) ||
      h.city.toLowerCase().includes(searchTextLower) ||
      h.area.toLowerCase().includes(searchTextLower) ||
      h.address.toLowerCase().includes(searchTextLower) ||
      h.category.toLowerCase().includes(searchTextLower) ||
      h.myanmar.toLowerCase().includes(searchTextLower) ||
      h.specialties.some(s => s.toLowerCase().includes(searchTextLower));

    const matchesCity = selectedCity === "all" || h.city === selectedCity;
    const matchesSpec = selectedSpec === "all" || h.specialties.includes(selectedSpec);
    const matchesFav = !state.favoritesOnly || state.favorites.includes(h.name);

    return matchesSearch && matchesCity && matchesSpec && matchesFav;
  });

  filtered.sort((a, b) =>
    sort === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  state.filtered = filtered;
  renderHospitals(filtered);
}

elements.searchInput.addEventListener("input", filterHospitals);
elements.cityFilter.addEventListener("change", filterHospitals);
elements.specialtyFilter.addEventListener("change", filterHospitals);
elements.sortFilter.addEventListener("change", filterHospitals);

elements.favoritesOnlyBtn.addEventListener("click", () => {
  state.favoritesOnly = !state.favoritesOnly;
  elements.favoritesOnlyBtn.classList.toggle("active", state.favoritesOnly);
  filterHospitals();
});

elements.compareModeBtn.addEventListener("click", () => {
  state.compareMode = !state.compareMode;
  elements.compareModeBtn.classList.toggle("active", state.compareMode);
  filterHospitals();
});

elements.exportCsvBtn.addEventListener("click", () => {
  exportCSV(state.filtered.length ? state.filtered : state.hospitals, "thailand-hospitals.csv");
});

elements.exportFavBtn.addEventListener("click", () => {
  const favorites = state.hospitals.filter(h => state.favorites.includes(h.name));
  exportCSV(favorites, "favorite-hospitals.csv");
});

elements.printBtn.addEventListener("click", () => window.print());
elements.clearBtn.addEventListener("click", clearAll);

elements.darkToggle.addEventListener("click", () => {
  state.dark = !state.dark;
  localStorage.setItem("darkMode", state.dark);
  applyDarkMode();
});

elements.langToggle.addEventListener("click", () => {
  state.lang = state.lang === "en" ? "my" : "en";
  localStorage.setItem("lang", state.lang);
  applyLanguage();
});

elements.copyTemplateBtn.addEventListener("click", () => copyText(elements.messageTemplate.value));
elements.shareSiteBtn.addEventListener("click", shareSite);
elements.viewCompareBtn.addEventListener("click", openCompareModal);
elements.clearCompareBtn.addEventListener("click", () => {
  state.compareSelected = [];
  saveCompare();
  renderCompareBar();
  filterHospitals();
});

function closeModal(overlay) {
  overlay.classList.add("hidden");
}

elements.closeModal.addEventListener("click", () => closeModal(elements.modalOverlay));
elements.modalOverlay.addEventListener("click", e => {
  if (e.target === elements.modalOverlay) closeModal(elements.modalOverlay);
});

elements.closeCompareModal.addEventListener("click", () => closeModal(elements.compareOverlay));
elements.compareOverlay.addEventListener("click", e => {
  if (e.target === elements.compareOverlay) closeModal(elements.compareOverlay);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(elements.modalOverlay);
    closeModal(elements.compareOverlay);
  }
});

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  elements.installBtn.classList.remove("hidden");
});

elements.installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  elements.installBtn.classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.error);
  });
}

loadData();
