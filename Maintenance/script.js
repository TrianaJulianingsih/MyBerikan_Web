const cardList = document.getElementById("alatList");
const searchInput = document.getElementById("search");
const editPopup = document.getElementById("editPopup");
const addPopup = document.getElementById("addPopup");
const deletePopup = document.getElementById("deletePopup");

let selectedIndex = null;

let alatList = [
  { kode: "A001", nama: "Pompa Air", keluhan: "Bocor pada pipa utama", status: "Tersolved" },
  { kode: "A002", nama: "Filter Air", keluhan: "Filter mampet dan kotor", status: "Belum" },
  { kode: "A003", nama: "Sensor Suhu", keluhan: "Tidak membaca suhu", status: "Belum" },
  { kode: "A004", nama: "Motor Listrik", keluhan: "Bunyi tidak normal", status: "Tersolved" },
  { kode: "A005", nama: "Valve Tekanan", keluhan: "Bocor pada sambungan", status: "Belum" },
];

function renderCards(data) {
  cardList.innerHTML = "";
  data.forEach((a, i) => {
    const card = document.createElement("div");
    card.className = "card-item";
    card.innerHTML = `
      <div class="card-info">
        <h4>${a.nama} (${a.kode})</h4>
        <p>${a.keluhan}</p>
        <span class="card-status ${a.status === "Tersolved" ? "status-tersolved" : "status-belum"}">
          ${a.status}
        </span>
      </div>
      <div class="card-actions">
        <button class="dropdown-btn">⋮</button>
        <div class="dropdown-menu">
          <button onclick="openEdit(${i})">Edit</button>
          <button onclick="openDelete(${i})">Delete</button>
        </div>
      </div>
    `;
    cardList.appendChild(card);
  });

  document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      closeAllDropdowns();
      btn.nextElementSibling.style.display = "block";
    };
  });
  document.body.onclick = closeAllDropdowns;
}

function closeAllDropdowns() {
  document.querySelectorAll(".dropdown-menu").forEach(menu => menu.style.display = "none");
}

function openEdit(index) {
  selectedIndex = index;
  const a = alatList[index];
  document.getElementById("editKode").value = a.kode;
  document.getElementById("editNama").value = a.nama;
  document.getElementById("editKeluhan").value = a.keluhan;
  document.getElementById("editStatus").value = a.status;
  editPopup.style.display = "flex";
}

function openDelete(index) {
  selectedIndex = index;
  deletePopup.style.display = "flex";
}

document.getElementById("saveEdit").onclick = () => {
  const a = alatList[selectedIndex];
  a.kode = document.getElementById("editKode").value;
  a.nama = document.getElementById("editNama").value;
  a.keluhan = document.getElementById("editKeluhan").value;
  a.status = document.getElementById("editStatus").value;
  editPopup.style.display = "none";
  renderCards(alatList);
};

document.getElementById("closeEdit").onclick = () => (editPopup.style.display = "none");

document.getElementById("addBtn").onclick = () => addPopup.style.display = "flex";
document.getElementById("closeAdd").onclick = () => addPopup.style.display = "none";

document.getElementById("saveAdd").onclick = () => {
  const newA = {
    kode: document.getElementById("newKode").value,
    nama: document.getElementById("newNama").value,
    keluhan: document.getElementById("newKeluhan").value,
    status: document.getElementById("newStatus").value,
  };
  alatList.push(newA);
  addPopup.style.display = "none";
  renderCards(alatList);
};

document.getElementById("confirmDelete").onclick = () => {
  alatList.splice(selectedIndex, 1);
  deletePopup.style.display = "none";
  renderCards(alatList);
};
document.getElementById("cancelDelete").onclick = () => deletePopup.style.display = "none";

searchInput.addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = alatList.filter(
    a => a.nama.toLowerCase().includes(keyword) || a.kode.toLowerCase().includes(keyword)
  );
  renderCards(filtered);
});

renderCards(alatList);
