const PIXELL_LOGO_URL = "https://itsm-ace.ca/images/logo.svg";
const SITE_TITLE = "Pixell River Employee Directory";
const GREETING = "Welcome! Browse staff by department.";

const DIRECTORY = [
  { name: "Administration", employees: ["Zoë Robins", "Madeleine Madden"] },
  { name: "Audit", employees: ["Josha Sadowski", "Kate Fleetwood"] },
  {
    name: "Banking Operations",
    employees: [
      "Priyanka Bose",
      "Hammed Animashaun",
      "Álvaro Morte",
      "Taylor Napier",
      "Alan Simmonds"
    ]
  },
  { name: "Communications", employees: ["Gil Cardinal", "Richard J. Lewis"] },
  {
    name: "Corporate Services",
    employees: ["Randy Bradshaw", "Tracey Cook", "Lubomir Mykytiuk"]
  },
  {
    name: "Facilities",
    employees: [
      "Dakota House",
      "Lori Lea Okemah",
      "Renae Morrisseau",
      "Rick Belcourt"
    ]
  },
  {
    name: "Financial Services",
    employees: [
      "Selina Hanusa",
      "Buffy Gaudry",
      "Shaneen Ann Fox",
      "Allan Little",
      "Danny Rabbit"
    ]
  },
  {
    name: "Human Resources",
    employees: [
      "Jesse Ed Azure",
      "Stacy Da Silva",
      "Vladimír Valenta",
      "Samone Sayeses-Whitney",
      "Paul Coeur"
    ]
  },
  {
    name: "Information Technology",
    employees: [
      "Graham Greene",
      "Sandika Evergreen",
      "Jennifer Rodriguez (Software Developer)"
    ]
  },
  {
    name: "IT Technician",
    employees: [
      "Aiyana Littlebear",
      "Inara Thunderbird",
      "Kaya Runningbrook",
      "Elara Firehawk",
      "Siona Moonflower",
      "Kaiyu Greywolf",
      "Ayawamat Nightwind",
      "Tala Braveheart",
      "Iniko Stonebear",
      "Onatah Redhawk"
    ]
  }
];

/* ---------- DOM HELPERS ---------- */

function createEl(tag, options = {}) {
  const el = document.createElement(tag);

  if (options.classes) {
    el.classList.add(...options.classes);
  }

  if (options.attrs) {
    Object.entries(options.attrs).forEach(([key, value]) =>
      el.setAttribute(key, value)
    );
  }

  if (options.html) {
    el.innerHTML = options.html;
  }

  return el;
}

function createTextEl(tag, text, options) {
  const el = createEl(tag, options);
  el.textContent = text;
  return el;
}

/* ---------- HEADER ---------- */

function injectHeader() {
  if (document.querySelector(".site-header")) return;

  const header = createEl("header", {
    classes: ["site-header", "container-fluid"]
  });

  const row = createEl("div", { classes: ["row", "vcenter"] });

  const logoCol = createEl("div", { classes: ["col-xs-12", "col-sm-2"] });
  const logoLink = createEl("a", {
    attrs: { href: PIXELL_LOGO_URL, target: "_blank", rel: "noopener" }
  });
  const logoImg = createEl("img", {
    classes: ["img-responsive"],
    attrs: {
      src: PIXELL_LOGO_URL,
      alt: "Pixell River Financial logo"
    }
  });

  logoLink.appendChild(logoImg);
  logoCol.appendChild(logoLink);

  const titleCol = createEl("div", { classes: ["col-xs-12", "col-sm-10"] });
  titleCol.appendChild(createTextEl("h1", SITE_TITLE, { classes: ["site-title"] }));
  titleCol.appendChild(
    createTextEl("p", GREETING, { classes: ["lead", "site-greeting"] })
  );

  row.appendChild(logoCol);
  row.appendChild(titleCol);
  header.appendChild(row);

  const main = document.querySelector("main") || document.body;
  main.parentNode.insertBefore(header, main);
}

/* ---------- DIRECTORY ---------- */

function getMain() {
  let main = document.querySelector("main");

  if (!main) {
    main = createEl("main", { classes: ["container-fluid"] });
    document.body.appendChild(main);
  }

  return main;
}

function renderDirectory() {
  const main = getMain();

  let section = main.querySelector("#directory");
  if (!section) {
    section = createEl("section", {
      classes: ["directory"],
      attrs: { id: "directory" }
    });
    main.appendChild(section);
  }

  section.innerHTML = "";

  const intro = createTextEl(
    "p",
    "Employee names are grouped by their department.",
    { classes: ["directory-intro"] }
  );
  section.appendChild(intro);

  DIRECTORY.forEach((dept) => {
    const deptSection = createEl("section", { classes: ["dept-section"] });
    deptSection.appendChild(
      createTextEl("h2", dept.name, { classes: ["dept-title"] })
    );

    const list = createEl("ul", {
      classes: ["list-unstyled", "employee-list"]
    });

    dept.employees.forEach((employee) => {
      list.appendChild(createTextEl("li", employee));
    });

    deptSection.appendChild(list);
    section.appendChild(deptSection);
  });
}

/* ---------- FOOTER ---------- */

function injectFooterYear() {
  let footer = document.querySelector("footer");

  if (!footer) {
    footer = createEl("footer", {
      classes: ["site-footer", "container-fluid"]
    });
    document.body.appendChild(footer);
  }

  const existing = footer.querySelector(".copyright-auto");
  if (existing) existing.remove();

  const year = new Date().getFullYear();
  footer.appendChild(
    createTextEl(
      "p",
      `Copyright Pixell River Financial ${year}.`,
      { classes: ["copyright-auto"] }
    )
  );
}

/* ---------- INIT ---------- */

function init() {
  injectHeader();
  renderDirectory();
  injectFooterYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
