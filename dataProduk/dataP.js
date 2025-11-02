const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("search");
const editPopup = document.getElementById("editPopup");
const addPopup = document.getElementById("addPopup");
const actionPopup = document.getElementById("actionPopup");
const deletePopup = document.getElementById("deletePopup");

let currentPage = 1;
const itemsPerPage = 7;
let selectedIndex = null;

let products = [
  { kode: "P001", nama: "Susu Ikan", jumlah: 100, status: "Aktif" },
  { kode: "P002", nama: "Susu Lele", jumlah: 50, status: "Aktif" },
  { kode: "P003", nama: "Susu Tuna", jumlah: 75, status: "Non Aktif" },
  { kode: "P004", nama: "Susu Salmon", jumlah: 20, status: "Aktif" },
  { kode: "P005", nama: "Susu Kakap", jumlah: 30, status: "Aktif" },
  { kode: "P006", nama: "Susu Bandeng", jumlah: 45, status: "Aktif" },
  { kode: "P007", nama: "Susu Tongkol", jumlah: 60, status: "Non Aktif" },
];

function renderTable(data) {
  tableBody.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = data.slice(start, start + itemsPerPage);
  paginated.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.kode}</td>
      <td>${p.nama}</td>
      <td>${p.jumlah}</td>
      <td class="${p.status === "Aktif" ? "status-aktif" : "status-non"}">${p.status}</td>
      <td><span class="setting" onclick="openAction(${start + i})">:</span></td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById("pageNumber").textContent = currentPage;
}

function openAction(index) {
  selectedIndex = index;
  actionPopup.style.display = "flex";
}

document.getElementById("closeAction").onclick = () => (actionPopup.style.display = "none");

document.getElementById("actionEdit").onclick = () => {
  actionPopup.style.display = "none";
  const p = products[selectedIndex];
  document.getElementById("editKode").value = p.kode;
  document.getElementById("editNama").value = p.nama;
  document.getElementById("editJumlah").value = p.jumlah;
  document.getElementById("editStatus").value = p.status;
  editPopup.style.display = "flex";
};

document.getElementById("actionDelete").onclick = () => {
  actionPopup.style.display = "none";
  deletePopup.style.display = "flex";
};

document.getElementById("confirmDelete").onclick = () => {
  products.splice(selectedIndex, 1);
  deletePopup.style.display = "none";
  renderTable(products);
};

document.getElementById("cancelDelete").onclick = () => deletePopup.style.display = "none";

document.getElementById("saveEdit").onclick = () => {
  const p = products[selectedIndex];
  p.kode = document.getElementById("editKode").value;
  p.nama = document.getElementById("editNama").value;
  p.jumlah = parseInt(document.getElementById("editJumlah").value);
  p.status = document.getElementById("editStatus").value;
  editPopup.style.display = "none";
  renderTable(products);
};

document.getElementById("closeEdit").onclick = () => editPopup.style.display = "none";

document.getElementById("addBtn").onclick = () => addPopup.style.display = "flex";
document.getElementById("closeAdd").onclick = () => addPopup.style.display = "none";
document.getElementById("saveAdd").onclick = () => {
  const newP = {
    kode: document.getElementById("newKode").value,
    nama: document.getElementById("newNama").value,
    jumlah: parseInt(document.getElementById("newJumlah").value),
    status: document.getElementById("newStatus").value,
  };
  products.push(newP);
  addPopup.style.display = "none";
  renderTable(products);
};

searchInput.addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.nama.toLowerCase().includes(keyword) || p.kode.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

document.getElementById("nextPage").onclick = () => {
  if (currentPage * itemsPerPage < products.length) {
    currentPage++;
    renderTable(products);
  }
};

document.getElementById("prevPage").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable(products);
  }
};

renderTable(products);