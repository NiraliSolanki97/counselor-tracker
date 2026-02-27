const API_URL = "https://counselor-tracker.up.railway.app";
const socket = io(API_URL);

function saveData() {
  const data = {
    counselor: document.getElementById("name").value,
    date: document.getElementById("date").value,
    walkins: Number(document.getElementById("w").value),
    calls: Number(document.getElementById("c").value),
    applications: Number(document.getElementById("a").value),
    shortlists: Number(document.getElementById("s").value),
    visas: Number(document.getElementById("v").value)
  };

  fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => alert("Data Saved Successfully"));
}
