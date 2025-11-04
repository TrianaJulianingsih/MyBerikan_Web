// ELEMENTS
const employeeGrid = $("#employeeGrid");
const searchInput = $("#search");
const deletePopup = $("#deletePopup");
const formPopup = $("#formPopup");

let employees = JSON.parse(localStorage.getItem("employees")) || [
  { nip: "K001", nama: "Rani Putri", divisi: "Creative", jabatan: "UI Designer", status: "Aktif", foto: "https://randomuser.me/api/portraits/women/12.jpg", gaji: "8500000", alamat: "Jakarta" },
  { nip: "K002", nama: "Andi Setiawan", divisi: "IT", jabatan: "Backend Dev", status: "Cuti", foto: "https://randomuser.me/api/portraits/men/9.jpg", gaji: "9500000", alamat: "Bandung" },
  { nip: "K003", nama: "Siti Lestari", divisi: "HRD", jabatan: "Recruiter", status: "Aktif", foto: "https://randomuser.me/api/portraits/women/18.jpg", gaji: "7800000", alamat: "Surabaya" },
];

let selectedIndex = null;
let editMode = false;

// SIMPAN KE LOCALSTORAGE
function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// RENDER CARD
function renderCards(data = employees) {
  employeeGrid.empty();

  if (data.length === 0) {
    employeeGrid.html("<p style='grid-column:1/-1;text-align:center;color:#888;'>Tidak ada data karyawan</p>");
    return;
  }

  data.forEach((emp, i) => {
    const card = $(`
      <div class="employee-card" data-nip="${emp.nip}">
        <img src="${emp.foto}" alt="${emp.nama}">
        <h3>${emp.nama}</h3>
        <p class="role">${emp.jabatan}</p>
        <p class="divisi">${emp.divisi}</p>
        <span class="status ${emp.status.toLowerCase()}">${emp.status}</span>
        <div class="card-actions">
          <button class="btn-edit" data-index="${i}">✏️</button>
          <button class="btn-delete" data-index="${i}">🗑️</button>
        </div>
      </div>
    `);
    employeeGrid.append(card);
  });
}

renderCards();

// EDIT KARYAWAN
$(document).on("click", ".btn-edit", function () {
  selectedIndex = $(this).data("index");
  const emp = employees[selectedIndex];
  $("#formTitle").text("Edit Karyawan");
  $("#nipInput").val(emp.nip);
  $("#namaInput").val(emp.nama);
  $("#divisiInput").val(emp.divisi);
  $("#jabatanInput").val(emp.jabatan);
  $("#statusInput").val(emp.status);
  editMode = true;
  formPopup.css("display", "flex");
});

// DELETE KARYAWAN
$(document).on("click", ".btn-delete", function () {
  selectedIndex = $(this).data("index");
  deletePopup.css("display", "flex");
});

$("#confirmDelete").on("click", () => {
  employees.splice(selectedIndex, 1);
  saveToLocalStorage();
  deletePopup.hide();
  renderCards();
});

$("#cancelDelete").on("click", () => deletePopup.hide());

// TAMBAH KARYAWAN
$("#addBtn").on("click", () => {
  $("#formTitle").text("Tambah Karyawan");
  $("#nipInput, #namaInput, #divisiInput, #jabatanInput").val("");
  $("#statusInput").val("Aktif");
  editMode = false;
  formPopup.css("display", "flex");
});

$("#cancelBtn").on("click", () => formPopup.hide());

// SIMPAN DATA
$("#saveBtn").on("click", () => {
  const nip = $("#nipInput").val();
  const nama = $("#namaInput").val();
  const divisi = $("#divisiInput").val();
  const jabatan = $("#jabatanInput").val();
  const status = $("#statusInput").val();

  if (!nip || !nama) return alert("NIP dan Nama wajib diisi!");

  const empData = {
    nip,
    nama,
    divisi,
    jabatan,
    status,
    foto: "https://randomuser.me/api/portraits/lego/1.jpg",
    gaji: "0",
    alamat: "-"
  };

  if (editMode) {
    employees[selectedIndex] = empData;
  } else {
    employees.push(empData);
  }

  saveToLocalStorage();
  renderCards();
  formPopup.hide();
});

// SEARCH BAR
searchInput.on("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = employees.filter(
    (emp) =>
      emp.nama.toLowerCase().includes(keyword) ||
      emp.divisi.toLowerCase().includes(keyword) ||
      emp.jabatan.toLowerCase().includes(keyword) ||
      emp.nip.toLowerCase().includes(keyword)
  );
  renderCards(filtered);
});

// 🧩 INTEGRASI DETAIL KARYAWAN
$(document).on("click", ".employee-card", function (e) {
  // Hindari klik tombol edit/delete di dalam card ikut trigger
  if ($(e.target).hasClass("btn-edit") || $(e.target).hasClass("btn-delete")) return;

  const nip = $(this).data("nip");
  const selected = employees.find((e) => e.nip === nip);

  // Simpan data ke localStorage untuk halaman detail
  localStorage.setItem("selectedEmployee", JSON.stringify(selected));

  // Arahkan ke halaman detail
  window.location.href = "detailKaryawan.html";
});
