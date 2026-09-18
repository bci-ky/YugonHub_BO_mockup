  // ---------------- Sample data ----------------
  const avatarColors = ["#146348", "#2E6BB3", "#B3823A", "#7A4FB3", "#3A8F8F", "#B3413A"];
  function colorFor(str) { let h=0; for (let i=0;i<str.length;i++) h = str.charCodeAt(i) + ((h<<5)-h); return avatarColors[Math.abs(h) % avatarColors.length]; }
  function initials(name) { return name.split(" ").map(p=>p[0]).slice(0,2).join("").toUpperCase(); }

  const staffData = [
    { id: 1, staffId: "STF-0001", name: "Alex Chen", email: "alex.chen@yugonhub.com", role: "Manager", status: "Active", createdDate: "2026-06-02", lastUpdated: "2026-06-02", lastActive: "2026-09-17 14:02" },
    { id: 2, staffId: "STF-0002", name: "Priya Nair", email: "priya.nair@yugonhub.com", role: "Executive", status: "Active", createdDate: "2026-07-12", lastUpdated: "2026-07-12", lastActive: "2026-09-17 09:21" },
    { id: 3, staffId: "STF-0003", name: "Wei Ming Tan", email: "weiming.tan@yugonhub.com", role: "Manager", status: "Active", createdDate: "2026-06-02", lastUpdated: "2026-06-10", lastActive: "2026-09-16 17:40" },
    { id: 4, staffId: "STF-0004", name: "Siti Aminah", email: "siti.aminah@yugonhub.com", role: "Administrator", status: "Active", createdDate: "2026-05-20", lastUpdated: "2026-05-20", lastActive: "2026-09-15 11:05" },
    { id: 5, staffId: "STF-0005", name: "Farah Yusof", email: "farah.yusof@yugonhub.com", role: "Executive", status: "Deactivated", createdDate: "2026-04-18", lastUpdated: "2026-08-30", lastActive: "2026-08-30 08:12" },
  ];
  const staffAudit = {
    1: [
      { date: "2026-06-02 09:00", staffId: "STF-0001", role: "Manager", action: "Staff Created", prev: "\u2014", newv: "Active" },
    ],
    2: [
      { date: "2026-07-12 09:00", staffId: "STF-0002", role: "Executive", action: "Staff Created", prev: "\u2014", newv: "Active" },
    ],
    3: [
      { date: "2026-06-02 09:00", staffId: "STF-0003", role: "Manager", action: "Staff Created", prev: "\u2014", newv: "Active" },
      { date: "2026-06-10 11:15", staffId: "STF-0003", role: "Manager", action: "Role Assigned / Changed", prev: "Executive", newv: "Manager" },
    ],
    4: [
      { date: "2026-05-20 09:00", staffId: "STF-0004", role: "Administrator", action: "Staff Created", prev: "\u2014", newv: "Active" },
    ],
    5: [
      { date: "2026-04-18 09:00", staffId: "STF-0005", role: "Executive", action: "Staff Created", prev: "\u2014", newv: "Active" },
      { date: "2026-08-30 08:12", staffId: "STF-0005", role: "Executive", action: "Staff Deactivated", prev: "Active", newv: "Deactivated" },
    ],
  };

  // Staff Management functions (per doc 1.1.7)
  const staffFunctions = [
    { key: "sf1", name: "View Staff", desc: "View Staff Listing and staff information" },
    { key: "sf2", name: "Add Staff", desc: "Create a new staff account" },
    { key: "sf3", name: "View Staff Details", desc: "View Staff ID, Name, Email, Role and Status" },
    { key: "sf4", name: "Edit Staff", desc: "Edit Staff Name and Email" },
    { key: "sf5", name: "Change Staff Role", desc: "Change the role assigned to a staff account" },
    { key: "sf6", name: "Manage Staff Status", desc: "Activate or deactivate a staff account" },
  ];
  // Role Management functions (per doc 1.1.7)
  const roleFunctions = [
    { key: "rf1", name: "View Role", desc: "View the role listing" },
    { key: "rf2", name: "Add Role", desc: "Create a new role" },
    { key: "rf3", name: "Edit Role", desc: "Update role information" },
    { key: "rf4", name: "Configure Function Assignment", desc: "Assign or remove functions and permissions for a role" },
  ];
  const rolePermissions = {
    administrator: { sf1: 1, sf2: 1, sf3: 1, sf4: 1, sf5: 1, sf6: 1, rf1: 1, rf2: 1, rf3: 1, rf4: 1 },
    manager: { sf1: 1, sf2: 1, sf3: 1, sf4: 1, sf5: 1, sf6: 1, rf1: 1, rf2: 0, rf3: 0, rf4: 0 },
    executive: { sf1: 1, sf2: 0, sf3: 1, sf4: 0, sf5: 0, sf6: 0, rf1: 1, rf2: 0, rf3: 0, rf4: 0 },
  };
  function functionsCount(roleId) { return Object.values(rolePermissions[roleId] || {}).filter(v => v).length; }

  const roleData = [
    { id: "administrator", name: "Administrator", desc: "Highest level of access to the back office.", access: "Full access to available back-office functions.", status: "Active", staffCount: 1, created: "2026-04-01", updated: "2026-04-01" },
    { id: "manager", name: "Manager", desc: "Management-level access to the back office.", access: "Access to functions required for management activities.", status: "Active", staffCount: 2, created: "2026-04-01", updated: "2026-06-10" },
    { id: "executive", name: "Executive", desc: "Standard staff role with basic access to the back office.", access: "Access to assigned functions based on role configuration.", status: "Active", staffCount: 2, created: "2026-04-01", updated: "2026-04-01" },
  ];
  const roleAudit = {
    administrator: [
      { date: "2026-04-01 09:00", staffId: "STF-0004", role: "Administrator", action: "Role Created", prev: "\u2014", newv: "Administrator" },
    ],
    manager: [
      { date: "2026-04-01 09:00", staffId: "STF-0004", role: "Administrator", action: "Role Created", prev: "\u2014", newv: "Manager" },
      { date: "2026-06-10 11:15", staffId: "STF-0004", role: "Administrator", action: "Function Assigned", prev: "\u2014", newv: "Manage Staff Status" },
    ],
    executive: [
      { date: "2026-04-01 09:00", staffId: "STF-0004", role: "Administrator", action: "Role Created", prev: "\u2014", newv: "Executive" },
    ],
  };

  // ---------------- Sidebar nav: view switching ----------------
  const pageTitle = document.getElementById("page-title");
  const crumbCurrent = document.getElementById("crumb-current");
  const btnAddStaff = document.getElementById("btn-add-staff");
  const btnAddRole = document.getElementById("btn-add-role");
  document.querySelectorAll(".nav-sub-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".nav-sub-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      const target = item.dataset.view;
      document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
      document.getElementById("view-" + target).classList.add("active");
      const labels = { staff: "Staff Listing", role: "Role Listing", audit: "Audit Log" };
      const label = labels[target];
      pageTitle.textContent = label;
      crumbCurrent.textContent = label;
      btnAddStaff.style.display = target === "staff" ? "inline-flex" : "none";
      btnAddRole.style.display = target === "role" ? "inline-flex" : "none";
      if (target === "audit") renderAuditLogView();
    });
  });
  document.getElementById("staff-nav-toggle").addEventListener("click", () => {
    document.getElementById("staff-nav-sub").classList.toggle("open");
    document.getElementById("staff-nav-chev").classList.toggle("open");
  });

  // ---------------- Render: Staff table ----------------
  let staffFilterText = "", staffFilterStatus = "", staffFilterRole = "";
  function statusPill(status) {
    const cls = status === "Active" ? "st-active" : "st-disabled";
    return `<span class="status-pill ${cls}"><span class="dot"></span>${status}</span>`;
  }
  function renderStaffTable() {
    let rows = staffData.filter(s => {
      const q = staffFilterText.toLowerCase();
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.staffId.toLowerCase().includes(q);
      const matchStatus = !staffFilterStatus || s.status === staffFilterStatus;
      const matchRole = !staffFilterRole || s.role === staffFilterRole;
      return matchQ && matchStatus && matchRole;
    });
    document.getElementById("staff-showing").textContent = `Showing ${rows.length} of ${staffData.length} staff`;
    document.getElementById("staff-page-info").textContent = rows.length ? `1–${rows.length} of ${rows.length}` : "0 of 0";
    const tbody = document.getElementById("staff-tbody");
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="7" class="empty-cell">No staff match your filters.</td></tr>`; return; }
    tbody.innerHTML = rows.map(s => `
      <tr data-staff-id="${s.id}">
        <td class="col-check"><input type="checkbox" onclick="event.stopPropagation()"></td>
        <td class="muted-cell">${s.staffId}</td>
        <td>
          <div class="member-cell" data-open-staff="${s.id}">
            <div class="avatar-circle" style="background:${colorFor(s.name)}">${initials(s.name)}</div>
            <div><div class="member-name">${s.name}</div><div class="member-email">${s.email}</div></div>
          </div>
        </td>
        <td>${s.role}</td>
        <td>${statusPill(s.status)}</td>
        <td class="muted-cell">${s.lastActive}</td>
        <td class="row-menu">
          <button class="row-menu-btn" data-menu-toggle="s${s.id}"><i class="fi fi-rr-menu-dots-vertical"></i></button>
          <div class="row-menu-drop" id="menu-s${s.id}">
            <button data-open-staff="${s.id}">View Details</button>
            <button class="danger-item">${s.status === "Active" ? "Deactivate Staff" : "Activate Staff"}</button>
          </div>
        </td>
      </tr>`).join("");
    wireRowInteractions();
  }

  // ---------------- Render: Role table ----------------
  let roleFilterText = "";
  function renderRoleTable() {
    let rows = roleData.filter(r => {
      const q = roleFilterText.toLowerCase();
      return !q || r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
    });
    document.getElementById("role-showing").textContent = `Showing ${rows.length} of ${roleData.length} roles`;
    document.getElementById("role-page-info").textContent = rows.length ? `1–${rows.length} of ${rows.length}` : "0 of 0";
    const tbody = document.getElementById("role-tbody");
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="6" class="empty-cell">No roles match your search.</td></tr>`; return; }
    tbody.innerHTML = rows.map(r => `
      <tr data-role-id="${r.id}">
        <td class="col-check"><input type="checkbox" onclick="event.stopPropagation()"></td>
        <td>
          <div class="role-cell" data-open-role="${r.id}">
            <div class="role-icon"><i class="fi fi-rr-shield-check"></i></div>
            <div><div class="role-name">${r.name}</div><div class="role-desc">${r.desc}</div></div>
          </div>
        </td>
        <td>${statusPill(r.status)}</td>
        <td><span class="count-pill">${functionsCount(r.id)} functions</span></td>
        <td><span class="count-pill">${r.staffCount} staff</span></td>
        <td class="muted-cell">${r.updated}</td>
        <td class="row-menu">
          <button class="row-menu-btn" data-menu-toggle="r${r.id}"><i class="fi fi-rr-menu-dots-vertical"></i></button>
          <div class="row-menu-drop" id="menu-r${r.id}">
            <button data-open-role="${r.id}">View Details</button>
            <button class="danger-item">${r.status === "Active" ? "Deactivate Role" : "Activate Role"}</button>
          </div>
        </td>
      </tr>`).join("");
    wireRowInteractions();
  }

  function wireRowInteractions() {
    document.querySelectorAll("[data-open-staff]:not([data-wired])").forEach(el => { el.dataset.wired = "1"; el.addEventListener("click", (e) => { e.stopPropagation(); closeAllMenus(); openStaffDrawer(parseInt(el.dataset.openStaff)); }); });
    document.querySelectorAll("[data-open-role]:not([data-wired])").forEach(el => { el.dataset.wired = "1"; el.addEventListener("click", (e) => { e.stopPropagation(); closeAllMenus(); openRoleDrawer(el.dataset.openRole); }); });
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
  document.getElementById("staff-search").addEventListener("input", (e) => { staffFilterText = e.target.value; renderStaffTable(); });
  document.getElementById("staff-status-filter").addEventListener("change", (e) => { staffFilterStatus = e.target.value; renderStaffTable(); });
  document.getElementById("staff-role-filter").addEventListener("change", (e) => { staffFilterRole = e.target.value; renderStaffTable(); });
  document.getElementById("role-search").addEventListener("input", (e) => { roleFilterText = e.target.value; renderRoleTable(); });
  document.getElementById("staff-check-all").addEventListener("change", (e) => {
    document.querySelectorAll("#staff-tbody input[type=checkbox]").forEach(cb => cb.checked = e.target.checked);
  });
  document.getElementById("role-check-all").addEventListener("change", (e) => {
    document.querySelectorAll("#role-tbody input[type=checkbox]").forEach(cb => cb.checked = e.target.checked);
  });

  renderStaffTable();
  renderRoleTable();

  // ---------------- Overlay / drawers ----------------
  const overlay = document.getElementById("overlay");
  const staffDrawer = document.getElementById("staff-drawer");
  const roleDrawer = document.getElementById("role-drawer");
  function closeDrawers() { overlay.classList.remove("open"); staffDrawer.classList.remove("open"); roleDrawer.classList.remove("open"); }
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
  wireDrawerTabs(document.getElementById("staff-drawer-tabs"));
  wireDrawerTabs(document.getElementById("role-drawer-tabs"));

  function setStaffEditMode(editing) {
    staffDrawer.querySelectorAll("[data-view-field]").forEach(el => el.style.display = editing ? "none" : "block");
    staffDrawer.querySelectorAll("[data-edit-field]").forEach(el => el.style.display = editing ? "block" : "none");
  }
  function auditTableHtml(rows) {
    if (!rows.length) return `<tr><td colspan="6" class="empty-cell">No audit events yet.</td></tr>`;
    return rows.map(r => `
      <tr>
        <td class="muted-cell">${r.date}</td>
        <td>${r.staffId}</td>
        <td>${r.role}</td>
        <td>${r.action}</td>
        <td>${r.prev === "\u2014" ? "\u2014" : `<span class="audit-prev">${r.prev}</span>`}</td>
        <td><span class="audit-new">${r.newv}</span></td>
      </tr>`).join("");
  }
  function renderStaffAudit(id) {
    document.getElementById("staff-audit-rows").innerHTML = auditTableHtml(staffAudit[id] || []);
  }
  function openStaffDrawer(id) {
    const isNew = id === null;
    document.getElementById("staff-drawer-title").textContent = isNew ? "Add Staff" : "Staff Details";
    document.getElementById("staff-drawer-sub").textContent = isNew ? "New staff account" : "View staff account";
    document.getElementById("staff-drawer-tabs").style.display = isNew ? "none" : "flex";
    document.querySelectorAll("#staff-drawer .drawer-tab").forEach((t,i) => t.classList.toggle("active", i===0));
    document.querySelectorAll("#staff-drawer .drawer-tabbody").forEach((t,i) => t.classList.toggle("active", i===0));
    ["staff-id-field", "staff-status-field", "staff-created-field", "staff-updated-field"].forEach(fid => {
      document.getElementById(fid).style.display = isNew ? "none" : "block";
    });
    const s = isNew ? { staffId: "", name: "", email: "", role: "Manager", status: "Active", createdDate: "", lastUpdated: "", lastActive: "" } : staffData.find(x => x.id === id);
    staffDrawer.querySelector('[data-view-field="staffId"]').textContent = s.staffId || "\u2014";
    staffDrawer.querySelector('[data-view-field="name"]').textContent = s.name || "\u2014";
    staffDrawer.querySelector('[data-view-field="email"]').textContent = s.email || "\u2014";
    staffDrawer.querySelector('[data-view-field="role"]').textContent = s.role;
    staffDrawer.querySelector('[data-view-field="statusLabel"]').innerHTML = statusPill(s.status);
    staffDrawer.querySelector('[data-view-field="createdDate"]').textContent = s.createdDate || "\u2014";
    staffDrawer.querySelector('[data-view-field="lastUpdated"]').textContent = s.lastUpdated || "\u2014";
    staffDrawer.querySelector('[data-edit-field="name"]').value = s.name || "";
    staffDrawer.querySelector('[data-edit-field="email"]').value = s.email || "";
    staffDrawer.querySelector('[data-edit-field="role"]').value = s.role;
    staffDrawer.querySelector('[data-edit-field="status"]').value = s.status;
    renderStaffAudit(id);
    setStaffEditMode(isNew);
    const foot = document.getElementById("staff-drawer-foot");
    foot.innerHTML = isNew
      ? `<button class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary" id="staff-save">Add Staff</button>`
      : `<button class="btn btn-ghost" id="staff-edit-toggle">Edit</button><button class="btn btn-primary" id="staff-save" style="display:none;">Save Changes</button>`;
    foot.querySelector("[data-close]") && foot.querySelector("[data-close]").addEventListener("click", closeDrawers);
    const editBtn = document.getElementById("staff-edit-toggle");
    if (editBtn) editBtn.addEventListener("click", () => { setStaffEditMode(true); editBtn.style.display = "none"; document.getElementById("staff-save").style.display = "inline-flex"; });
    document.getElementById("staff-save").addEventListener("click", closeDrawers);
    overlay.classList.add("open"); staffDrawer.classList.add("open");
  }
  btnAddStaff.addEventListener("click", () => openStaffDrawer(null));

  function setRoleEditMode(editing) {
    roleDrawer.querySelectorAll("#role-details [data-view-field]").forEach(el => el.style.display = editing ? "none" : "block");
    roleDrawer.querySelectorAll("#role-details [data-edit-field]").forEach(el => el.style.display = editing ? "block" : "none");
  }
  function renderFunctionChecklist(roleId) {
    const perm = rolePermissions[roleId] || {};
    document.getElementById("fn-group-staff").innerHTML = staffFunctions.map(f => `
      <div class="fn-row">
        <input type="checkbox" ${perm[f.key] ? "checked" : ""}>
        <div><div class="fn-name">${f.name}</div><div class="fn-desc">${f.desc}</div></div>
      </div>`).join("");
    document.getElementById("fn-group-role").innerHTML = roleFunctions.map(f => `
      <div class="fn-row">
        <input type="checkbox" ${perm[f.key] ? "checked" : ""}>
        <div><div class="fn-name">${f.name}</div><div class="fn-desc">${f.desc}</div></div>
      </div>`).join("");
  }
  function renderRoleAudit(roleId) {
    document.getElementById("role-audit-rows").innerHTML = auditTableHtml(roleAudit[roleId] || []);
  }

  // ---------------- Combined Audit Log (Staff + Role) ----------------
  function buildCombinedAuditLog() {
    const rows = [];
    Object.values(staffAudit).forEach(entries => {
      entries.forEach(e => rows.push({ ...e, category: "Staff" }));
    });
    Object.values(roleAudit).forEach(entries => {
      entries.forEach(e => rows.push({ ...e, category: "Role" }));
    });
    return rows;
  }
  const combinedAuditLog = buildCombinedAuditLog();
  let auditFilterText = "", auditFilterCategory = "", auditSortOrder = "newest";

  function renderAuditLogView() {
    let rows = combinedAuditLog.filter(r => {
      const q = auditFilterText.toLowerCase();
      const matchQ = !q || r.staffId.toLowerCase().includes(q) || r.role.toLowerCase().includes(q) || r.action.toLowerCase().includes(q);
      const matchCat = !auditFilterCategory || r.category === auditFilterCategory;
      return matchQ && matchCat;
    });
    rows = rows.slice().sort((a, b) => auditSortOrder === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));

    document.getElementById("audit-showing").textContent = `Showing ${rows.length} of ${combinedAuditLog.length} events`;
    document.getElementById("audit-page-info").textContent = rows.length ? `1\u2013${rows.length} of ${rows.length}` : "0 of 0";
    const tbody = document.getElementById("audit-tbody");
    if (!rows.length) { tbody.innerHTML = `<tr><td colspan="7" class="empty-cell">No audit events match your filters.</td></tr>`; return; }
    tbody.innerHTML = rows.map(r => `
      <tr>
        <td class="muted-cell">${r.date}</td>
        <td><span class="cat-badge ${r.category === "Staff" ? "cat-staff" : "cat-role"}">${r.category}</span></td>
        <td>${r.staffId}</td>
        <td>${r.role}</td>
        <td>${r.action}</td>
        <td>${r.prev === "\u2014" ? "\u2014" : `<span class="audit-prev">${r.prev}</span>`}</td>
        <td><span class="audit-new">${r.newv}</span></td>
      </tr>`).join("");
  }
  document.getElementById("audit-search").addEventListener("input", (e) => { auditFilterText = e.target.value; renderAuditLogView(); });
  document.getElementById("audit-category-filter").addEventListener("change", (e) => { auditFilterCategory = e.target.value; renderAuditLogView(); });
  document.getElementById("audit-sort").addEventListener("change", (e) => { auditSortOrder = e.target.value; renderAuditLogView(); });

  function openRoleDrawer(id) {
    const isNew = id === null;
    document.getElementById("role-drawer-title").textContent = isNew ? "Add Role" : "Role Details";
    document.getElementById("role-drawer-sub").textContent = isNew ? "New role" : "View role";
    document.querySelectorAll("#role-drawer .drawer-tab").forEach((t,i) => t.classList.toggle("active", i===0));
    document.querySelectorAll("#role-drawer .drawer-tabbody").forEach((t,i) => t.classList.toggle("active", i===0));
    // Per doc: Add Role flow includes naming, then Function Assignment.
    // Audit Log only applies once the role exists.
    const auditTabBtn = document.querySelector('#role-drawer-tabs [data-dtab="role-audit"]');
    auditTabBtn.style.display = isNew ? "none" : "inline-flex";
    ["role-status-field", "role-created-field", "role-updated-field"].forEach(fid => {
      document.getElementById(fid).style.display = isNew ? "none" : "block";
    });
    const r = isNew ? { id: "manager", name: "", desc: "", status: "Active", created: "", updated: "" } : roleData.find(x => x.id === id);
    roleDrawer.querySelector('[data-view-field="roleName"]').textContent = r.name || "\u2014";
    roleDrawer.querySelector('[data-view-field="roleStatusLabel"]').innerHTML = statusPill(r.status);
    roleDrawer.querySelector('[data-view-field="roleCreated"]').textContent = r.created || "\u2014";
    roleDrawer.querySelector('[data-view-field="roleUpdated"]').textContent = r.updated || "\u2014";
    roleDrawer.querySelector('[data-edit-field="roleName"]').value = r.name || "";
    roleDrawer.querySelector('[data-edit-field="roleStatus"]').value = r.status;
    renderFunctionChecklist(id || "manager");
    renderRoleAudit(id);
    setRoleEditMode(isNew);
    const foot = document.getElementById("role-drawer-foot");
    foot.innerHTML = isNew
      ? `<button class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary" id="role-save">Add Role</button>`
      : `<button class="btn btn-ghost" id="role-edit-toggle">Edit</button><button class="btn btn-primary" id="role-save" style="display:none;">Save Changes</button>`;
    foot.querySelector("[data-close]") && foot.querySelector("[data-close]").addEventListener("click", closeDrawers);
    const editBtn = document.getElementById("role-edit-toggle");
    if (editBtn) editBtn.addEventListener("click", () => { setRoleEditMode(true); editBtn.style.display = "none"; document.getElementById("role-save").style.display = "inline-flex"; });
    document.getElementById("role-save").addEventListener("click", closeDrawers);
    overlay.classList.add("open"); roleDrawer.classList.add("open");
  }
  btnAddRole.addEventListener("click", () => openRoleDrawer(null));
