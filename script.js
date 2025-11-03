const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("search");
const editPopup = document.getElementById("editPopup");
const addPopup = document.getElementById("addPopup");
const actionPopup = document.getElementById("actionPopup");
const deletePopup = document.getElementById("deletePopup");

let currentPage = 1;
const itemsPerPage = 5;
let selectedIndex = null;

// DATA AWAL
let products = [
  { kode: "L001", nama: "Kertas HVS", jumlah: 10, status: "Kosong", harga: "Rp 500.000" },
  { kode: "L002", nama: "Minyak Ikan", jumlah: 10, status: "Tersedia", harga: "Rp 1.000.000" },
  { kode: "L003", nama: "Timbangan", jumlah: 2, status: "Dalam Perjalanan", harga: "Rp 120.000" },
];

// Fungsi format rupiah
function formatRupiah(angka) {
  if (!angka) return "-";

  if (typeof angka === "string" && angka.trim().toLowerCase().startsWith("rp")) {
    return angka; // sudah berformat Rp
  }

  const num = parseInt(angka);
  if (isNaN(num)) return "-";
  return "Rp " + num.toLocaleString("id-ID");
}

// Render tabel
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
      <td class="${p.status === "Tersedia" ? "status-aktif" : "status-non"}">${p.status}</td>
      <td>${formatRupiah(p.harga)}</td>
      <td><button class="btnEdit" onclick="actionEdit(${start + i})">Edit</button>&nbsp<button class="btnHapus" onclick="actionDelete(${start + i})">Hapus</button></td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById("pageNumber").textContent = currentPage;
}

// Popup Aksi
function openAction(index) {
  selectedIndex = index;
  actionPopup.style.display = "flex";
}

document.getElementById("closeAction").onclick = () => (actionPopup.style.display = "none");

// Edit data
function actionEdit(index){
  selectedIndex = index;
  const p = products[selectedIndex];
  document.getElementById("editKode").value = p.kode;
  document.getElementById("editNama").value = p.nama;
  document.getElementById("editJumlah").value = p.jumlah;
  document.getElementById("editStatus").value = p.status;
  document.getElementById("editHarga").value = p.harga;
  editPopup.style.display = "flex";
}

// Simpan Edit
document.getElementById("saveEdit").onclick = () => {
  const p = products[selectedIndex];
  const hargaInput = document.getElementById("editHarga").value.trim();

  // Bersihkan input: hapus semua karakter non-angka
  const numeric = hargaInput.replace(/[^0-9]/g, "");
  p.harga = numeric ? "Rp " + parseInt(numeric).toLocaleString("id-ID") : "-";

  p.kode = document.getElementById("editKode").value;
  p.nama = document.getElementById("editNama").value;
  p.jumlah = parseInt(document.getElementById("editJumlah").value);
  p.status = document.getElementById("editStatus").value;

  editPopup.style.display = "none";
  renderTable(products);
};

document.getElementById("closeEdit").onclick = () => (editPopup.style.display = "none");

// Popup Tambah
document.getElementById("addBtn").onclick = () => (addPopup.style.display = "flex");
document.getElementById("closeAdd").onclick = () => (addPopup.style.display = "none");

document.getElementById("saveAdd").onclick = () => {
  const hargaInput = document.getElementById("newHarga").value.trim();
  const numeric = hargaInput.replace(/[^0-9]/g, "");

  const newP = {
    kode: document.getElementById("newKode").value,
    nama: document.getElementById("newNama").value,
    jumlah: parseInt(document.getElementById("newJumlah").value),
    status: document.getElementById("newStatus").value,
    harga: numeric ? "Rp " + parseInt(numeric).toLocaleString("id-ID") : "-",
  };

  products.push(newP);
  addPopup.style.display = "none";
  renderTable(products);
};

// Hapus data
function actionDelete(index){
  selectedIndex = index;
  deletePopup.style.display = "flex";
}

document.getElementById("confirmDelete").onclick = () => {
  products.splice(selectedIndex, 1);
  deletePopup.style.display = "none";
  renderTable(products);
};

document.getElementById("cancelDelete").onclick = () => (deletePopup.style.display = "none");

// Search
searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(
    (p) => p.nama.toLowerCase().includes(keyword) || p.kode.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

// Pagination
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
