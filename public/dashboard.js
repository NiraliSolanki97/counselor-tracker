const API_URL = "http://localhost:3000"; // later we change this for deployment

function saveData() {
  const data = {
    counselor: "Default Counselor",
    date: new Date().toISOString().slice(0, 10),
    walkins: Number(document.getElementById("w").value),
    calls: Number(document.getElementById("c").value),
    applications: Number(document.getElementById("a").value),
    shortlists: 0,
    visas: Number(document.getElementById("ad").value)
  };

  fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => {
    alert("Data saved");
    loadData();
  });
}

function loadData() {
  fetch(`${API_URL}/data`)
    .then(res => res.json())
    .then(rows => {
      let walkins = 0, calls = 0, apps = 0, admissions = 0;

      rows.forEach(r => {
        walkins += r.walkins;
        calls += r.calls;
        apps += r.applications;
        admissions += r.visas;
      });

      document.getElementById("walkins").innerText = walkins;
      document.getElementById("calls").innerText = calls;
      document.getElementById("apps").innerText = apps;
      document.getElementById("admissions").innerText = admissions;
    });
}

loadData();
