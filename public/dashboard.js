const API_URL = "https://counselor-tracker.up.railway.app";
const socket = io(API_URL);

let chart;

function loadData() {
  fetch(`${API_URL}/data`)
    .then(res => res.json())
    .then(rows => {

      const filterCounselor = document.getElementById("counselorFilter").value;
      const filterDate = document.getElementById("dateFilter").value;

      let walkins = 0, calls = 0, apps = 0, visas = 0;
      const counselorMap = {};

      rows.forEach(r => {
        if ((filterCounselor === "all" || r.counselor === filterCounselor) &&
            (!filterDate || r.date === filterDate)) {

          walkins += r.walkins;
          calls += r.calls;
          apps += r.applications;
          visas += r.visas;
        }

        if (!counselorMap[r.counselor]) {
          counselorMap[r.counselor] = 0;
        }
        counselorMap[r.counselor] += r.applications;
      });

      document.getElementById("walkins").innerText = walkins;
      document.getElementById("calls").innerText = calls;
      document.getElementById("apps").innerText = apps;
      document.getElementById("visas").innerText = visas;

      updateChart(counselorMap);
      updateCounselorDropdown(rows);
    });
}

function updateChart(dataMap) {
  const ctx = document.getElementById("performanceChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(dataMap),
      datasets: [{
        label: "Applications",
        data: Object.values(dataMap),
      }]
    }
  });
}

function updateCounselorDropdown(rows) {
  const dropdown = document.getElementById("counselorFilter");
  const names = [...new Set(rows.map(r => r.counselor))];

  dropdown.innerHTML = '<option value="all">All Counselors</option>';
  names.forEach(name => {
    dropdown.innerHTML += `<option value="${name}">${name}</option>`;
  });
}

document.getElementById("counselorFilter").addEventListener("change", loadData);
document.getElementById("dateFilter").addEventListener("change", loadData);

socket.on("updateData", loadData);

loadData();
