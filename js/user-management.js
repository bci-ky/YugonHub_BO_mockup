// ---------------- Helpers ----------------
const avatarColors = ["#146348", "#2E6BB3", "#B3823A", "#7A4FB3", "#3A8F8F", "#B3413A"];
function colorFor(str) { let h = 0; for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h); return avatarColors[Math.abs(h) % avatarColors.length]; }
function initials(name) { return name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase(); }
function statusPill(status) {
  const cls = status === "Active" ? "st-active" : (status === "Pending Verification" ? "st-pending" : "st-disabled");
  return `<span class="status-pill ${cls}"><span class="dot"></span>${status}</span>`;
}
function verifyBadge(state) {
  const map = { Verified: ["verify-yes", "Verified"], "Not Verified": ["verify-no", "Not Verified"], Pending: ["verify-pending", "Pending"] };
  const [cls, label] = map[state] || map["Not Verified"];
  return `<span class="verify-badge ${cls}">${label}</span>`;
}

// ---------------- Sample data: Job Seekers ----------------
const jobSeekerData = [
  {
    id: 1, userId: "JS-1001", name: "Aiman Yusof", email: "aiman.yusof@gmail.com", phone: "+60 12-345 6789",
    location: "Kuala Lumpur, Malaysia", headline: "Frontend Developer",
    bio: "Frontend developer with 4 years of experience building responsive, accessible web apps using React and Vue.",
    skills: ["React", "TypeScript", "JavaScript", "CSS", "Figma"], preferredJobType: "Full-time",
    status: "Active", joined: "2026-03-14", lastActive: "2026-09-17 10:22",
    cv: { fileName: "Aiman_Yusof_Resume.pdf", size: "482 KB", uploaded: "2026-03-14" },
    experience: [
      { title: "Frontend Developer", company: "Tech Solutions Sdn Bhd", type: "Full-time", start: "2023-01", end: "Present", location: "Kuala Lumpur", desc: "Build and maintain customer-facing dashboards using React and TypeScript. Improved page load time by 35% through code splitting and lazy loading." },
      { title: "Junior Web Developer", company: "Creative Studio", type: "Full-time", start: "2021-06", end: "2022-12", location: "Petaling Jaya", desc: "Developed marketing websites and landing pages for SME clients using HTML, CSS and jQuery." }
    ],
    projects: [
      { name: "E-commerce Storefront Revamp", role: "Lead Frontend Developer", duration: "2023-04 – 2023-09", desc: "Redesigned and rebuilt the storefront UI for a mid-size fashion retailer, migrating from jQuery to React.", link: "github.com/aimanyusof/storefront" },
      { name: "Internal Analytics Dashboard", role: "Frontend Developer", duration: "2022-01 – 2022-05", desc: "Built a real-time analytics dashboard for internal sales reporting using Vue and Chart.js.", link: "" }
    ],
    education: [
      { institution: "Universiti Malaya", degree: "Bachelor of Computer Science", field: "Software Engineering", start: "2017", end: "2021", grade: "CGPA 3.65" }
    ]
  },
  {
    id: 2, userId: "JS-1002", name: "Nur Aisyah Kamal", email: "aisyah.kamal@outlook.com", phone: "+60 17-889 2231",
    location: "Shah Alam, Malaysia", headline: "UI/UX Designer",
    bio: "Product designer focused on research-driven UI for fintech and healthtech apps.",
    skills: ["UI Design", "User Research", "Figma", "Prototyping", "Design Systems"], preferredJobType: "Full-time",
    status: "Active", joined: "2026-02-02", lastActive: "2026-09-16 15:48",
    cv: { fileName: "Nur_Aisyah_Kamal_CV.pdf", size: "615 KB", uploaded: "2026-02-02" },
    experience: [
      { title: "UI/UX Designer", company: "Finlytics Sdn Bhd", type: "Full-time", start: "2022-08", end: "Present", location: "Shah Alam", desc: "Own end-to-end design for the mobile banking app, from user research to high-fidelity prototypes and design system maintenance." }
    ],
    projects: [
      { name: "Mobile Banking App Redesign", role: "Product Designer", duration: "2023-01 – 2023-06", desc: "Led a full redesign of the onboarding and payments flow, reducing drop-off by 22%.", link: "behance.net/aisyahkamal" }
    ],
    education: [
      { institution: "UiTM Shah Alam", degree: "Bachelor of Design", field: "Multimedia Design", start: "2018", end: "2022", grade: "CGPA 3.72" }
    ]
  },
  {
    id: 3, userId: "JS-1003", name: "Rajesh Kumar", email: "rajesh.kumar@gmail.com", phone: "+60 11-234 5678",
    location: "Petaling Jaya, Malaysia", headline: "Backend Engineer (Node.js)",
    bio: "Backend engineer specialising in scalable APIs and cloud infrastructure on AWS.",
    skills: ["Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL"], preferredJobType: "Full-time",
    status: "Active", joined: "2026-01-20", lastActive: "2026-09-17 08:05",
    cv: { fileName: "Rajesh_Kumar_Resume.pdf", size: "398 KB", uploaded: "2026-01-20" },
    experience: [
      { title: "Backend Engineer", company: "CloudWorks Technologies", type: "Full-time", start: "2021-03", end: "Present", location: "Petaling Jaya", desc: "Design and maintain microservices handling 2M+ daily requests. Migrated legacy monolith to containerised services on AWS ECS." },
      { title: "Software Engineer Intern", company: "DataSys Malaysia", type: "Internship", start: "2020-06", end: "2020-12", location: "Kuala Lumpur", desc: "Built internal tooling for automated report generation using Python and Node.js." }
    ],
    projects: [
      { name: "Payments Gateway Integration", role: "Backend Engineer", duration: "2022-05 – 2022-11", desc: "Integrated multiple payment gateways (Stripe, FPX) into the core platform with idempotent transaction handling.", link: "" }
    ],
    education: [
      { institution: "Universiti Teknologi Malaysia", degree: "Bachelor of Computer Science", field: "Computer Systems", start: "2016", end: "2020", grade: "CGPA 3.58" }
    ]
  },
  {
    id: 4, userId: "JS-1004", name: "Michelle Wong", email: "michelle.wong@gmail.com", phone: "+60 16-778 4432",
    location: "George Town, Malaysia", headline: "Product Marketing Specialist",
    bio: "Marketing specialist with a track record in B2B SaaS go-to-market and campaign strategy.",
    skills: ["Product Marketing", "SEO", "Content Strategy", "HubSpot"], preferredJobType: "Contract",
    status: "Suspended", joined: "2025-11-08", lastActive: "2026-08-02 12:15",
    cv: { fileName: "Michelle_Wong_CV.pdf", size: "521 KB", uploaded: "2025-11-08" },
    experience: [
      { title: "Product Marketing Specialist", company: "NovaSaaS Sdn Bhd", type: "Full-time", start: "2021-09", end: "2026-07", location: "George Town", desc: "Led go-to-market campaigns for 3 major product launches, driving a 40% increase in qualified leads." }
    ],
    projects: [
      { name: "Regional Rebrand Campaign", role: "Campaign Lead", duration: "2024-02 – 2024-05", desc: "Coordinated a regional rebrand across 4 markets, aligning messaging and creative assets.", link: "" }
    ],
    education: [
      { institution: "Universiti Sains Malaysia", degree: "Bachelor of Business Administration", field: "Marketing", start: "2016", end: "2020", grade: "CGPA 3.41" }
    ]
  },
  {
    id: 5, userId: "JS-1005", name: "Haziq Rahman", email: "haziq.rahman@gmail.com", phone: "+60 19-902 1187",
    location: "Johor Bahru, Malaysia", headline: "Data Analyst",
    bio: "Data analyst experienced in turning raw operational data into actionable dashboards and reports.",
    skills: ["SQL", "Python", "Power BI", "Excel", "Statistics"], preferredJobType: "Full-time",
    status: "Active", joined: "2026-05-30", lastActive: "2026-09-15 09:40",
    cv: { fileName: "Haziq_Rahman_Resume.pdf", size: "356 KB", uploaded: "2026-05-30" },
    experience: [
      { title: "Data Analyst", company: "Logix Supply Chain", type: "Full-time", start: "2023-07", end: "Present", location: "Johor Bahru", desc: "Build and maintain Power BI dashboards tracking warehouse efficiency and fleet utilisation for regional operations." }
    ],
    projects: [
      { name: "Fleet Utilisation Dashboard", role: "Data Analyst", duration: "2023-09 – 2024-01", desc: "Built an end-to-end dashboard consolidating fleet telemetry data, cutting manual reporting time by 6 hours a week.", link: "" }
    ],
    education: [
      { institution: "Universiti Teknologi MARA", degree: "Diploma in Statistics", field: "Applied Statistics", start: "2019", end: "2021", grade: "CGPA 3.50" }
    ]
  }
];

// ---------------- Sample data: Employers ----------------
const employerData = [
  {
    id: 1, employerId: "EMP-2001", companyName: "TechNova Sdn Bhd", email: "hr@technova.com.my", industry: "Information Technology",
    companySize: "51–200 employees", website: "technova.com.my", hq: "Kuala Lumpur, Malaysia",
    about: "TechNova builds digital transformation solutions for SMEs across Southeast Asia.",
    contactName: "Grace Lim", contactDesignation: "HR Manager", contactEmail: "grace.lim@technova.com.my", contactPhone: "+60 3-2178 4400",
    status: "Active", verification: "Verified", joined: "2026-01-10", lastActive: "2026-09-17 11:30"
  },
  {
    id: 2, employerId: "EMP-2002", companyName: "GreenLeaf Retail Group", email: "careers@greenleafretail.com", industry: "Retail",
    companySize: "201–500 employees", website: "greenleafretail.com", hq: "Petaling Jaya, Malaysia",
    about: "A homegrown retail chain operating supermarkets and convenience stores across the Klang Valley.",
    contactName: "Daniel Teh", contactDesignation: "Talent Acquisition Lead", contactEmail: "daniel.teh@greenleafretail.com", contactPhone: "+60 3-7960 1122",
    status: "Pending Verification", verification: "Pending", joined: "2026-09-01", lastActive: "2026-09-14 16:05"
  },
  {
    id: 3, employerId: "EMP-2003", companyName: "Aurora Health Clinic", email: "admin@aurorahealth.my", industry: "Healthcare",
    companySize: "11–50 employees", website: "aurorahealth.my", hq: "Subang Jaya, Malaysia",
    about: "A multi-branch primary care clinic group serving the Klang Valley since 2015.",
    contactName: "Dr. Farah Aziz", contactDesignation: "Clinic Director", contactEmail: "farah.aziz@aurorahealth.my", contactPhone: "+60 3-5636 9080",
    status: "Active", verification: "Verified", joined: "2025-10-22", lastActive: "2026-09-16 09:12"
  },
  {
    id: 4, employerId: "EMP-2004", companyName: "Skyline Logistics", email: "hr@skylinelogistics.com.my", industry: "Logistics & Supply Chain",
    companySize: "500+ employees", website: "skylinelogistics.com.my", hq: "Port Klang, Malaysia",
    about: "One of the largest regional logistics providers, operating warehousing and last-mile delivery networks.",
    contactName: "Wong Kah Meng", contactDesignation: "People Operations Manager", contactEmail: "kahmeng.wong@skylinelogistics.com.my", contactPhone: "+60 3-3176 2200",
    status: "Suspended", verification: "Not Verified", joined: "2025-06-15", lastActive: "2026-07-20 14:50"
  }
];

// ---------------- Sidebar nav: view switching ----------------
const pageTitle = document.getElementById("page-title");
const crumbCurrent = document.getElementById("crumb-current");
document.querySelectorAll(".nav-sub-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-sub-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    const target = item.dataset.view;
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById("view-" + target).classList.add("active");
    const labels = { jobseeker: "Job Seekers", employer: "Employers" };
    const label = labels[target];
    pageTitle.textContent = label;
    crumbCurrent.textContent = label;
  });
});
document.getElementById("user-nav-toggle").addEventListener("click", () => {
  document.getElementById("user-nav-sub").classList.toggle("open");
  document.getElementById("user-nav-chev").classList.toggle("open");
});

// ---------------- Render: Job Seeker table ----------------
let jsFilterText = "", jsFilterStatus = "", jsSortOrder = "name";
function renderJobSeekerTable() {
  let rows = jobSeekerData.filter(s => {
    const q = jsFilterText.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.userId.toLowerCase().includes(q) || s.headline.toLowerCase().includes(q);
    const matchStatus = !jsFilterStatus || s.status === jsFilterStatus;
    return matchQ && matchStatus;
  });
  rows = rows.slice().sort((a, b) => jsSortOrder === "recent" ? b.joined.localeCompare(a.joined) : a.name.localeCompare(b.name));
  document.getElementById("js-showing").textContent = `Showing ${rows.length} of ${jobSeekerData.length} job seekers`;
  document.getElementById("js-page-info").textContent = rows.length ? `1–${rows.length} of ${rows.length}` : "0 of 0";
  const tbody = document.getElementById("js-tbody");
  if (!rows.length) { tbody.innerHTML = `<tr><td colspan="7" class="empty-cell">No job seekers match your filters.</td></tr>`; return; }
  tbody.innerHTML = rows.map(s => `
    <tr data-js-id="${s.id}">
      <td class="col-check"><input type="checkbox" onclick="event.stopPropagation()"></td>
      <td class="muted-cell">${s.userId}</td>
      <td>
        <div class="member-cell" data-open-js="${s.id}">
          <div class="avatar-circle" style="background:${colorFor(s.name)}">${initials(s.name)}</div>
          <div><div class="member-name">${s.name}</div><div class="member-email">${s.email}</div></div>
        </div>
      </td>
      <td>
        <div class="headline-text">${s.headline}</div>
        <div class="location-text">${s.location}</div>
      </td>
      <td class="muted-cell">${s.preferredJobType}</td>
      <td>${statusPill(s.status)}</td>
      <td class="row-menu">
        <button class="row-menu-btn" data-menu-toggle="js${s.id}"><i class="fi fi-rr-menu-dots-vertical"></i></button>
        <div class="row-menu-drop" id="menu-js${s.id}">
          <button data-open-js="${s.id}">View Details</button>
          <button class="danger-item" data-toggle-js-status="${s.id}">${s.status === "Active" ? "Suspend Account" : "Activate Account"}</button>
        </div>
      </td>
    </tr>`).join("");
  wireRowInteractions();
}

// ---------------- Render: Employer table ----------------
let empFilterText = "", empFilterStatus = "";
function renderEmployerTable() {
  let rows = employerData.filter(e => {
    const q = empFilterText.toLowerCase();
    const matchQ = !q || e.companyName.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.employerId.toLowerCase().includes(q) || e.industry.toLowerCase().includes(q);
    const matchStatus = !empFilterStatus || e.status === empFilterStatus;
    return matchQ && matchStatus;
  });
  rows = rows.slice().sort((a, b) => a.companyName.localeCompare(b.companyName));
  document.getElementById("emp-showing").textContent = `Showing ${rows.length} of ${employerData.length} employers`;
  document.getElementById("emp-page-info").textContent = rows.length ? `1–${rows.length} of ${rows.length}` : "0 of 0";
  const tbody = document.getElementById("emp-tbody");
  if (!rows.length) { tbody.innerHTML = `<tr><td colspan="7" class="empty-cell">No employers match your filters.</td></tr>`; return; }
  tbody.innerHTML = rows.map(e => `
    <tr data-emp-id="${e.id}">
      <td class="col-check"><input type="checkbox" onclick="event.stopPropagation()"></td>
      <td class="muted-cell">${e.employerId}</td>
      <td>
        <div class="company-cell" data-open-emp="${e.id}">
          <div class="company-logo" style="background:${colorFor(e.companyName)}">${initials(e.companyName)}</div>
          <div><div class="company-name">${e.companyName}</div><div class="company-email">${e.email}</div></div>
        </div>
      </td>
      <td class="muted-cell">${e.industry}</td>
      <td class="muted-cell">${e.companySize}</td>
      <td>${statusPill(e.status)}</td>
      <td class="row-menu">
        <button class="row-menu-btn" data-menu-toggle="emp${e.id}"><i class="fi fi-rr-menu-dots-vertical"></i></button>
        <div class="row-menu-drop" id="menu-emp${e.id}">
          <button data-open-emp="${e.id}">View Details</button>
          ${e.status === "Pending Verification" ? `<button data-approve-emp="${e.id}">Approve Verification</button>` : ""}
          <button class="danger-item" data-toggle-emp-status="${e.id}">${e.status === "Suspended" ? "Activate Account" : "Suspend Account"}</button>
        </div>
      </td>
    </tr>`).join("");
  wireRowInteractions();
}

function wireRowInteractions() {
  document.querySelectorAll("[data-open-js]:not([data-wired])").forEach(el => { el.dataset.wired = "1"; el.addEventListener("click", (e) => { e.stopPropagation(); closeAllMenus(); openJobSeekerDrawer(parseInt(el.dataset.openJs)); }); });
  document.querySelectorAll("[data-open-emp]:not([data-wired])").forEach(el => { el.dataset.wired = "1"; el.addEventListener("click", (e) => { e.stopPropagation(); closeAllMenus(); openEmployerDrawer(parseInt(el.dataset.openEmp)); }); });
  document.querySelectorAll("[data-toggle-js-status]:not([data-wired])").forEach(el => {
    el.dataset.wired = "1";
    el.addEventListener("click", (e) => {
      e.stopPropagation(); closeAllMenus();
      const s = jobSeekerData.find(x => x.id === parseInt(el.dataset.toggleJsStatus));
      s.status = s.status === "Active" ? "Suspended" : "Active";
      renderJobSeekerTable();
    });
  });
  document.querySelectorAll("[data-toggle-emp-status]:not([data-wired])").forEach(el => {
    el.dataset.wired = "1";
    el.addEventListener("click", (e) => {
      e.stopPropagation(); closeAllMenus();
      const emp = employerData.find(x => x.id === parseInt(el.dataset.toggleEmpStatus));
      emp.status = emp.status === "Suspended" ? "Active" : "Suspended";
      renderEmployerTable();
    });
  });
  document.querySelectorAll("[data-approve-emp]:not([data-wired])").forEach(el => {
    el.dataset.wired = "1";
    el.addEventListener("click", (e) => {
      e.stopPropagation(); closeAllMenus();
      const emp = employerData.find(x => x.id === parseInt(el.dataset.approveEmp));
      emp.status = "Active"; emp.verification = "Verified";
      renderEmployerTable();
    });
  });
  document.querySelectorAll("[data-menu-toggle]:not([data-wired])").forEach(btn => {
    btn.dataset.wired = "1";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.menuToggle;
      const drop = document.getElementById("menu-" + id);
      const isOpen = drop.classList.contains("open");
      closeAllMenus();
      if (!isOpen) drop.classList.add("open");
    });
  });
}
function closeAllMenus() { document.querySelectorAll(".row-menu-drop").forEach(d => d.classList.remove("open")); }
document.addEventListener("click", closeAllMenus);

// ---------------- Search / filter wiring ----------------
document.getElementById("js-search").addEventListener("input", (e) => { jsFilterText = e.target.value; renderJobSeekerTable(); });
document.getElementById("js-status-filter").addEventListener("change", (e) => { jsFilterStatus = e.target.value; renderJobSeekerTable(); });
document.getElementById("js-sort").addEventListener("change", (e) => { jsSortOrder = e.target.value; renderJobSeekerTable(); });
document.getElementById("emp-search").addEventListener("input", (e) => { empFilterText = e.target.value; renderEmployerTable(); });
document.getElementById("emp-status-filter").addEventListener("change", (e) => { empFilterStatus = e.target.value; renderEmployerTable(); });
document.getElementById("js-check-all").addEventListener("change", (e) => {
  document.querySelectorAll("#js-tbody input[type=checkbox]").forEach(cb => cb.checked = e.target.checked);
});
document.getElementById("emp-check-all").addEventListener("change", (e) => {
  document.querySelectorAll("#emp-tbody input[type=checkbox]").forEach(cb => cb.checked = e.target.checked);
});

renderJobSeekerTable();
renderEmployerTable();

// ---------------- Overlay / drawers ----------------
const overlay = document.getElementById("overlay");
const jsDrawer = document.getElementById("jobseeker-drawer");
const empDrawer = document.getElementById("employer-drawer");
function closeDrawers() { overlay.classList.remove("open"); jsDrawer.classList.remove("open"); empDrawer.classList.remove("open"); }
overlay.addEventListener("click", closeDrawers);
document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", closeDrawers));

function wireDrawerTabs(container) {
  container.querySelectorAll(".drawer-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      container.querySelectorAll(".drawer-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const scope = container.closest(".drawer");
      scope.querySelectorAll(".drawer-tabbody").forEach(tb => tb.classList.remove("active"));
      scope.querySelector("#" + tab.dataset.dtab).classList.add("active");
    });
  });
}
wireDrawerTabs(document.getElementById("jobseeker-drawer-tabs"));
wireDrawerTabs(document.getElementById("employer-drawer-tabs"));

function resetTabs(drawerEl) {
  drawerEl.querySelectorAll(".drawer-tab").forEach((t, i) => t.classList.toggle("active", i === 0));
  drawerEl.querySelectorAll(".drawer-tabbody").forEach((t, i) => t.classList.toggle("active", i === 0));
}

// ---------------- Job Seeker drawer ----------------
function setJsEditMode(editing) {
  jsDrawer.querySelectorAll("#jobseeker-profile [data-view-field]").forEach(el => el.style.display = editing ? "none" : "block");
  jsDrawer.querySelectorAll("#jobseeker-profile [data-edit-field]").forEach(el => el.style.display = editing ? "block" : "none");
}
function experienceHtml(list) {
  if (!list.length) return `<div class="empty-note">No work experience on record.</div>`;
  return list.map(x => `
    <div class="entry-card">
      <div class="entry-head">
        <div><div class="entry-title">${x.title}</div><div class="entry-sub">${x.company} · ${x.type} · ${x.location}</div></div>
        <div class="entry-period">${x.start} – ${x.end}</div>
      </div>
      <div class="entry-desc">${x.desc}</div>
    </div>`).join("");
}
function projectsHtml(list) {
  if (!list.length) return `<div class="empty-note">No past projects on record.</div>`;
  return list.map(x => `
    <div class="entry-card">
      <div class="entry-head">
        <div><div class="entry-title">${x.name}</div><div class="entry-sub">${x.role}</div></div>
        <div class="entry-period">${x.duration}</div>
      </div>
      <div class="entry-desc">${x.desc}</div>
      ${x.link ? `<div class="entry-link"><i class="fi fi-rr-document"></i> ${x.link}</div>` : ""}
    </div>`).join("");
}
function educationHtml(list) {
  if (!list.length) return `<div class="empty-note">No education history on record.</div>`;
  return list.map(x => `
    <div class="entry-card">
      <div class="entry-head">
        <div><div class="entry-title">${x.institution}</div><div class="entry-sub">${x.degree} – ${x.field}</div></div>
        <div class="entry-period">${x.start} – ${x.end}</div>
      </div>
      <div class="entry-desc">Grade: ${x.grade}</div>
    </div>`).join("");
}
function openJobSeekerDrawer(id) {
  const s = jobSeekerData.find(x => x.id === id);
  document.getElementById("jobseeker-drawer-title").textContent = s.name;
  document.getElementById("jobseeker-drawer-sub").textContent = s.headline;
  resetTabs(jsDrawer);

  jsDrawer.querySelector('[data-view-field="userId"]').textContent = s.userId;
  jsDrawer.querySelector('[data-view-field="name"]').textContent = s.name;
  jsDrawer.querySelector('[data-view-field="email"]').textContent = s.email;
  jsDrawer.querySelector('[data-view-field="phone"]').textContent = s.phone;
  jsDrawer.querySelector('[data-view-field="location"]').textContent = s.location;
  jsDrawer.querySelector('[data-view-field="headline"]').textContent = s.headline;
  jsDrawer.querySelector('[data-view-field="bio"]').textContent = s.bio;
  jsDrawer.querySelector('[data-view-field="preferredJobType"]').textContent = s.preferredJobType;
  jsDrawer.querySelector('[data-view-field="statusLabel"]').innerHTML = statusPill(s.status);
  jsDrawer.querySelector('[data-view-field="joined"]').textContent = s.joined;
  jsDrawer.querySelector('[data-view-field="lastActive"]').textContent = s.lastActive;
  jsDrawer.querySelector('[data-view-field="skills"]').innerHTML = s.skills.map(k => `<span class="chip">${k}</span>`).join("");
  jsDrawer.querySelector('[data-edit-field="status"]').value = s.status === "Suspended" ? "Suspended" : "Active";

  jsDrawer.querySelector("#jobseeker-cv").innerHTML = `
    <div class="attachment-card">
      <div class="attachment-icon">CV</div>
      <div class="attachment-body">
        <div class="attachment-name">${s.cv.fileName}</div>
        <div class="attachment-meta">${s.cv.size} · Uploaded ${s.cv.uploaded}</div>
      </div>
      <div class="attachment-actions">
        <button class="btn btn-ghost"><i class="fi fi-rr-download"></i> Download</button>
      </div>
    </div>`;
  document.getElementById("jobseeker-experience").innerHTML = experienceHtml(s.experience);
  document.getElementById("jobseeker-projects").innerHTML = projectsHtml(s.projects);
  document.getElementById("jobseeker-education").innerHTML = educationHtml(s.education);

  setJsEditMode(false);
  const foot = document.getElementById("jobseeker-drawer-foot");
  foot.innerHTML = `<button class="btn btn-ghost" id="js-edit-toggle">Edit</button><button class="btn btn-primary" id="js-save" style="display:none;">Save Changes</button>`;
  document.getElementById("js-edit-toggle").addEventListener("click", () => { setJsEditMode(true); document.getElementById("js-edit-toggle").style.display = "none"; document.getElementById("js-save").style.display = "inline-flex"; });
  document.getElementById("js-save").addEventListener("click", () => {
    s.status = jsDrawer.querySelector('[data-edit-field="status"]').value;
    closeDrawers();
    renderJobSeekerTable();
  });
  overlay.classList.add("open"); jsDrawer.classList.add("open");
}

// ---------------- Employer drawer ----------------
function setEmpEditMode(editing) {
  empDrawer.querySelectorAll("#employer-profile [data-view-field]").forEach(el => el.style.display = editing ? "none" : "block");
  empDrawer.querySelectorAll("#employer-profile [data-edit-field]").forEach(el => el.style.display = editing ? "block" : "none");
}
function openEmployerDrawer(id) {
  const e = employerData.find(x => x.id === id);
  document.getElementById("employer-drawer-title").textContent = e.companyName;
  document.getElementById("employer-drawer-sub").textContent = e.industry;
  resetTabs(empDrawer);

  empDrawer.querySelector('[data-view-field="employerId"]').textContent = e.employerId;
  empDrawer.querySelector('[data-view-field="companyName"]').textContent = e.companyName;
  empDrawer.querySelector('[data-view-field="email"]').textContent = e.email;
  empDrawer.querySelector('[data-view-field="industry"]').textContent = e.industry;
  empDrawer.querySelector('[data-view-field="companySize"]').textContent = e.companySize;
  empDrawer.querySelector('[data-view-field="website"]').textContent = e.website;
  empDrawer.querySelector('[data-view-field="hq"]').textContent = e.hq;
  empDrawer.querySelector('[data-view-field="about"]').textContent = e.about;
  empDrawer.querySelector('[data-view-field="verification"]').innerHTML = verifyBadge(e.verification);
  empDrawer.querySelector('[data-view-field="statusLabel"]').innerHTML = statusPill(e.status);
  empDrawer.querySelector('[data-view-field="joined"]').textContent = e.joined;
  empDrawer.querySelector('[data-view-field="lastActive"]').textContent = e.lastActive;
  empDrawer.querySelector('[data-edit-field="status"]').value = e.status === "Active" ? "Active" : (e.status === "Pending Verification" ? "Pending Verification" : "Suspended");

  empDrawer.querySelector('[data-view-field="contactName"]').textContent = e.contactName;
  empDrawer.querySelector('[data-view-field="contactDesignation"]').textContent = e.contactDesignation;
  empDrawer.querySelector('[data-view-field="contactEmail"]').textContent = e.contactEmail;
  empDrawer.querySelector('[data-view-field="contactPhone"]').textContent = e.contactPhone;

  setEmpEditMode(false);
  const foot = document.getElementById("employer-drawer-foot");
  foot.innerHTML = `<button class="btn btn-ghost" id="emp-edit-toggle">Edit</button><button class="btn btn-primary" id="emp-save" style="display:none;">Save Changes</button>`;
  document.getElementById("emp-edit-toggle").addEventListener("click", () => { setEmpEditMode(true); document.getElementById("emp-edit-toggle").style.display = "none"; document.getElementById("emp-save").style.display = "inline-flex"; });
  document.getElementById("emp-save").addEventListener("click", () => {
    e.status = empDrawer.querySelector('[data-edit-field="status"]').value;
    closeDrawers();
    renderEmployerTable();
  });
  overlay.classList.add("open"); empDrawer.classList.add("open");
}
