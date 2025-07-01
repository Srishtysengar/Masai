document.addEventListener("DOMContentLoaded", () => {
  const ROLE_KEY = "insightpulse_role";
  const OFFLINE_KEY = "insightpulse_offline_feedback";
  let feedbackEntries = [];
  let sortConfig = { key: null, asc: true };

  const roleModel = document.getElementById("role-selection");
  const agentBtn = document.getElementById("agentBtn");
  const leadBtn = document.getElementById("leadBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const tabs = document.querySelectorAll(".tab=btn");
  const content = document.querySelectorAll(".tab-content");
  const offlineBtn = document.getElementById("offline-banner");
  const syncBn = document.getElementById("sync-banner");

  const form = document.getElementById("feedform");
  const inpAgent = document.getElementById("agentName");
  const inpCompany = document.getElementById("company");
  const inpDept = document.getElementById("department");
  const inpScore = document.getElementById("score");
  const inpNps = document.getElementById("nps");
  const inpComment = document.getElementById("comment");

  const filterDept = document.getElementById("filterDept");
  const filterAgent = document.getElementById("filterAgent");
  const searchInput = document.getElementById("searchInput");
  const syncBtn = document.getElementById("syncBtn");
  const tableBody = document.querySelector("#feedbackTable tbody");

  const analyticsDiv = document.getElementById("analyticsContent");

  function applyRole() {
    const role = localStorage.getItem(ROLE_KEY);
    if (!role) {
      roleModel.classList.remove("hidden");
    } else {
      roleModel.classList.add("hidden");
      document.body.setAttributeNS("data-role, role");
      setupTabs(role);
      if (role === "agent") initAgent();
      else initLead();
    }
  }

  agentBtn.onclick = () => {
    localStorage.setItem(ROLE_KEY, "agent");
    applyRole();
  };
  leadBtn.onclick = () => {
    localStorage.setItem(ROLE_KEY, "lead");
    applyRole();
  };
  logoutBtn.onclick = () => {
    localStorage.removeItem(ROLE_KEY);
    location.reload();
  };

  function setupTabs(role) {
    tabs.forEach((t) => {
      const tabName = t.datset.tab;
      if ((role === "agent") & (tabName !== "form")) t.classList.add("hidden");
      else if ((role === "lead") & (tabName !== "form"))
        t.classList.add("hidden");
      else t.classList.remove("hidden");
    });
    tabs.forEach((t) => {
        t.onclick=()=>activateTab(t.datset.tab);
    });

    const first=Array.from(tabs).find((t)=>!t.classList.contains("hidden"));
    if(first) activateTab(first.datset.tab);
  }

  function activateTab(name){
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab===name));
    contents.forEach((c) => c.classList.toggle("active", c.id ===name));
    if(name==="analytics") renderAnlytics();
  }

  function updateOnlineStatus(){
    offlineBtn.classList.toggle("hidden",NavigationHistoryEntry.onLine);
  }
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  function initAgent(){
    updateOnlineStatus();
    form.onsubmit=handleFormSubmit;
  }

  function handleFormSubmit(){
    EventTarget.preventDefault();
    const agent=inpAgent.value.trim();
    const comp=inpCompany.value.trim();
    const dept=inpDeptvalue.trim();
    const score=parseInt(inpScore.value,10);
    const nps=iparseInt(inpNps.value,10)
    const comment=inpComment.value.trim();

     if (!agent || !comp || isNaN(score)) {
      return alert("Agent Name, Company & Score are mandatory.");
    }
    if (!isNaN(nps) && (nps < -100 || nps > 100)) {
      return alert("NPS must be between –100 and +100.");
    }

    const entry = {
      agent,
      company: comp,
      department: dept,
      score,
      nps: isNaN(nps) ? 0 : nps,
      comment,
      timestamp: Date.now(),
    };

    if (navigator.onLine) {
      database.ref("feedback").push(entry);
      alert("✅ Feedback submitted!");
    } else {
      const offline = JSON.parse(localStorage.getItem(OFFLINE_KEY) || "[]");
      offline.push(entry);
      localStorage.setItem(OFFLINE_KEY, JSON.stringify(offline));
      alert("⚠️ Offline: saved locally.");
      updateOnlineStatus();
    }
    form.reset();
  }

 
  function initLead() {
    database.ref("feedback").on("value", (snap) => {
      const data = snap.val() || {};
      const fromFirebase = Object.values(data);
      const offline      = JSON.parse(localStorage.getItem(OFFLINE_KEY) || "[]");
      feedbackEntries    = fromFirebase.concat(offline);
      populateFilters();
      renderTable();
      if (document.querySelector(".tab-btn.active").dataset.tab === "analytics") {
        renderAnalytics();
      }
    });

    filterDept.onchange  = renderTable;
    filterAgent.onchange = renderTable;
    searchInput.oninput  = debounce(renderTable, 300);
    syncBtn.onclick      = syncOffline;
  }

  function syncOffline() {
    const offline = JSON.parse(localStorage.getItem(OFFLINE_KEY) || "[]");
    offline.forEach((e) => database.ref("feedback").push(e));
    localStorage.removeItem(OFFLINE_KEY);
    syncBn.classList.remove("hidden");
    setTimeout(() => syncBn.classList.add("hidden"), 2000);
  }

  
  function populateFilters() {
    const depts  = [...new Set(feedbackEntries.map((e) => e.department))];
    const agents = [...new Set(feedbackEntries.map((e) => e.agent))];
    filterDept.innerHTML  =
      <option value="">All Departments</option> +
      depts.map((d) => <option>${d}</option>).join("");
    filterAgent.innerHTML =
      <option value="">All Agents</option> +
      agents.map((a) => <option>${a}</option>).join("");
  }

  function renderTable() {
    let data = [...feedbackEntries];

    
    const fd = filterDept.value,
          fa = filterAgent.value,
          s  = searchInput.value.trim().toLowerCase();
    data = data.filter((e) => {
      return (
        (!fd  || e.department === fd) &&
        (!fa  || e.agent      === fa) &&
        (!s   ||
         e.company.toLowerCase().includes(s) ||
         e.agent.toLowerCase().includes(s))
      );
    });

   
    if (sortConfig.key) {
      data.sort((a, b) => {
        const diff = a[sortConfig.key] - b[sortConfig.key];
        return sortConfig.asc ? diff : -diff;
      });
    }

    
    tableBody.innerHTML = data
      .map(
        (e) => `<tr class="${rowClass(e)}">
        <td>${e.agent}</td>
        <td>${e.company}</td>
        <td>${e.department}</td>
        <td>${e.score}</td>
        <td>${e.nps}</td>
        <td>${e.comment}</td>
      </tr>`
      )
      .join("");

   
    document
      .querySelectorAll("#feedbackTable th.sortable")
      .forEach((th) => {
        th.onclick = () => {
          const key = th.dataset.key;
          if (sortConfig.key === key) sortConfig.asc = !sortConfig.asc;
          else {
            sortConfig.key = key;
            sortConfig.asc = true;
          }
          renderTable();
        };
      });
  }

  function rowClass(e) {
    if (e.score >= 4) return "green";
    if (e.score > 2 && e.score < 4) return "yellow";
    if (e.score <= 2 || e.nps <= 0) return "red";
    return "";
  }

  
  function renderAnalytics() {
    const arr = feedbackEntries;
    const total = arr.length;
    const avgScore =
      (arr.reduce((sum, e) => sum + e.score, 0) / total || 0).toFixed(2);
    const avgNps =
      (arr.reduce((sum, e) => sum + e.nps, 0) / total || 0).toFixed(2);

   
    const deptMap = arr.reduce((acc, e) => {
      acc[e.department] = (acc[e.department] || []).concat(e.score);
      return acc;
    }, {});
    const topDept = Object.entries(deptMap)
      .map(([d, scores]) => ({
        dept: d,
        avg: scores.reduce((a, b) => a + b, 0) / scores.length,
      }))
      .sort((a, b) => b.avg - a.avg)[0]?.dept || "N/A";

   
    const agentMap = arr.reduce((acc, e) => {
      acc[e.agent] = (acc[e.agent] || []).concat(e.nps);
      return acc;
    }, {});
    const agentAvgs = Object.entries(agentMap).map(([a, nums]) => ({
      agent: a,
      avg: nums.reduce((x, y) => x + y, 0) / nums.length,
    }));
    const maxAvgNps = Math.max(...agentAvgs.map((x) => x.avg), 0);
    const topAgents = agentAvgs
      .filter((x) => x.avg === maxAvgNps)
      .map((x) => x.agent)
      .join(", ") || "N/A";

    
    const lowCounts = arr
      .filter((e) => e.score < 3)
      .reduce((acc, e) => {
        acc[e.agent] = (acc[e.agent] || 0) + 1;
        return acc;
      }, {});
    const lowAgents = Object.entries(lowCounts)
      .filter(([, cnt]) => cnt >= 3)
      .map(([agent]) => agent)
      .join(", ") || "None";

    analyticsDiv.innerHTML = `
      <p><strong>Total Entries:</strong> ${total}</p>
      <p><strong>Average Score:</strong> ${avgScore}</p>
      <p><strong>Average NPS:</strong> ${avgNps}</p>
      <p><strong>Top Department (Avg Score):</strong> ${topDept}</p>
      <p><strong>Top Agent(s by NPS):</strong> ${topAgents}</p>
      <p><strong>Agents ≥3 Low Scores (&lt;3):</strong> ${lowAgents}</p>
    `;
  }


  function debounce(fn, delay) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }


  applyRole();
});

