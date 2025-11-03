const tableBody = $("#productTable");
const searchInput = $("#search");
const editPopup = $("#editPopup");
const addPopup = $("#addPopup");
const actionPopup = $("#actionPopup");
const deletePopup = $("#deletePopup");

let currentPage = 1;
const itemsPerPage = 7;
let selectedIndex = null;

let products = JSON.parse(localStorage.getItem("products")) || [
  { kode: "P001", nama: "Susu Ikan", jumlah: 100, status: "Aktif" },
  { kode: "P002", nama: "Susu Lele", jumlah: 50, status: "Aktif" },
  { kode: "P003", nama: "Susu Tuna", jumlah: 75, status: "Non Aktif" },
  { kode: "P004", nama: "Susu Salmon", jumlah: 20, status: "Aktif" },
  { kode: "P005", nama: "Susu Kakap", jumlah: 30, status: "Aktif" },
  { kode: "P006", nama: "Susu Bandeng", jumlah: 45, status: "Aktif" },
  { kode: "P007", nama: "Susu Tongkol", jumlah: 60, status: "Non Aktif" },
];

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderTable(data) {
  tableBody.empty();
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = data.slice(start, start + itemsPerPage);
  $.each(paginated, (i, p) => {
    const row = $(`
      <tr>
        <td>${p.kode}</td>
        <td>${p.nama}</td>
        <td>${p.jumlah}</td>
        <td class="${p.status === "Aktif" ? "status-aktif" : "status-non"}">${p.status}</td>
        <td><span class="setting" data-index="${start + i}">:</span></td>
      </tr>
    `);
    tableBody.append(row);
  });
  $("#pageNumber").text(currentPage);
}

$(document).on("click", ".setting", function () {
  selectedIndex = $(this).data("index");
  actionPopup.css("display", "flex");
});

$("#closeAction").on("click", () => actionPopup.hide());

$("#actionEdit").on("click", () => {
  actionPopup.hide();
  const p = products[selectedIndex];
  $("#editKode").val(p.kode);
  $("#editNama").val(p.nama);
  $("#editJumlah").val(p.jumlah);
  $("#editStatus").val(p.status);
  editPopup.css("display", "flex");
});

$("#actionDelete").on("click", () => {
  actionPopup.hide();
  deletePopup.css("display", "flex");
});

$("#confirmDelete").on("click", () => {
  products.splice(selectedIndex, 1);
  saveToLocalStorage();
  deletePopup.hide();
  renderTable(products);
});

$("#cancelDelete").on("click", () => deletePopup.hide());

$("#saveEdit").on("click", () => {
  const p = products[selectedIndex];
  p.kode = $("#editKode").val();
  p.nama = $("#editNama").val();
  p.jumlah = parseInt($("#editJumlah").val());
  p.status = $("#editStatus").val();
  saveToLocalStorage();
  editPopup.hide();
  renderTable(products);
});

$("#closeEdit").on("click", () => editPopup.hide());

$("#addBtn").on("click", () => addPopup.css("display", "flex"));
$("#closeAdd").on("click", () => addPopup.hide());
$("#saveAdd").on("click", () => {
  const newP = {
    kode: $("#newKode").val(),
    nama: $("#newNama").val(),
    jumlah: parseInt($("#newJumlah").val()),
    status: $("#newStatus").val(),
  };
  products.push(newP);
  saveToLocalStorage();
  addPopup.hide();
  renderTable(products);
});

searchInput.on("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.nama.toLowerCase().includes(keyword) || p.kode.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

$("#nextPage").on("click", () => {
  if (currentPage * itemsPerPage < products.length) {
    currentPage++;
    renderTable(products);
  }
});

$("#prevPage").on("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable(products);
  }
});

renderTable(products);