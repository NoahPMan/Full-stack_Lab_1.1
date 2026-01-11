const departments = [
  {
    name: "Administration",
    employees: [
      { firstName: "Zoë", lastName: "Robins" },
      { firstName: "Madeleine", lastName: "Madden" },
    ],
  },
  {
    name: "Audit",
    employees: [
      { firstName: "Josha", lastName: "Sadowski" },
      { firstName: "Kate", lastName: "Fleetwood" },
    ],
  },

];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("employee-directory");
  if (!container) {
    console.warn('Missing <main id="employee-directory"> in index.html');
    return;
  }

  departments.forEach((dept) => {
    const section = document.createElement("section");

    const heading = document.createElement("h2");
    heading.textContent = dept.name;
    section.appendChild(heading);

    const list = document.createElement("ul");

    dept.employees.forEach((emp) => {
      const li = document.createElement("li");
      li.textContent = emp.lastName ? `${emp.firstName} ${emp.lastName}` : emp.firstName;
      list.appendChild(li);
    });

    section.appendChild(list);
    container.appendChild(section);
  });

  const year = new Date().getFullYear();
  const copyEl = document.getElementById("copyright");
  if (copyEl) copyEl.textContent = `Copyright Pixell River Financial ${year}.`;
});
