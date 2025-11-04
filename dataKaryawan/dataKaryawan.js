const employeeGrid = $("#employeeGrid");
const searchInput = $("#search");
const actionPopup = $("#actionPopup");
const deletePopup = $("#deletePopup");
const formPopup = $("#formPopup");

let employees = JSON.parse(localStorage.getItem("employees")) || [
  { nip: "K001", nama: "Rani Putri", divisi: "Creative", jabatan: "UI Designer", status: "Aktif", foto: "https://randomuser.me/api/portraits/women/12.jpg" },
  { nip: "K002", nama: "Andi Setiawan", divisi: "IT", jabatan: "Backend Dev", status: "Cuti", foto: "https://randomuser.me/api/portraits/men/9.jpg" },
  { nip: "K003", nama: "Siti Lestari", divisi: "HRD", jabatan: "Recruiter", status: "Aktif", foto: "https://randomuser.me/api/portraits/women/18.jpg" },
];

let selectedIndex = null;
let editMode = false;

function saveToLocalStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function renderCards(data = employees) {
  employeeGrid.empty();
  if (data.length === 0) {
    employeeGrid.html("<p style='grid-column:1/-1;text-align:center;color:#888;'>Tidak ada data karyawan</p>");
    return;
  }

  data.forEach((emp, i) => {
    const card = $(`
      <div class="employee-card">
        <img src="${emp.foto}" alt="${emp.nama}">
        <h3>${emp.nama}</h3>
        <p class="role">${emp.jabatan}</p>
        <p class="divisi">${emp.divisi}</p>
        <span class="status ${emp.status}">${emp.status}</span>
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

$(document).on("click", ".btn-edit", function() {
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

$(document).on("click", ".btn-delete", function() {
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

$("#addBtn").on("click", () => {
  $("#formTitle").text("Tambah Karyawan");
  $("#nipInput, #namaInput, #divisiInput, #jabatanInput").val("");
  $("#statusInput").val("Aktif");
  editMode = false;
  formPopup.css("display", "flex");
});

$("#cancelBtn").on("click", () => formPopup.hide());

$("#saveBtn").on("click", () => {
  const nip = $("#nipInput").val();
  const nama = $("#namaInput").val();
  const divisi = $("#divisiInput").val();
  const jabatan = $("#jabatanInput").val();
  const status = $("#statusInput").val();

  if (!nip || !nama) return alert("NIP dan Nama wajib diisi!");

  const empData = {
    nip, nama, divisi, jabatan, status,
    foto: "https://randomuser.me/api/portraits/lego/1.jpg"
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

// SEARCH
searchInput.on("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.nama.toLowerCase().includes(keyword) ||
    emp.divisi.toLowerCase().includes(keyword) ||
    emp.jabatan.toLowerCase().includes(keyword) ||
    emp.nip.toLowerCase().includes(keyword)
  );
  renderCards(filtered);
});
