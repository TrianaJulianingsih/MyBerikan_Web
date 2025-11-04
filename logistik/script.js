$(document).ready(function () {
  const $tableBody = $("#productTable");
  const $searchInput = $("#search");
  const $editPopup = $("#editPopup");
  const $addPopup = $("#addPopup");
  const $actionPopup = $("#actionPopup");
  const $deletePopup = $("#deletePopup");

  let currentPage = 1;
  const itemsPerPage = 5;
  let selectedIndex = null;

  function saveToLocal() {
    localStorage.setItem("products", JSON.stringify(products));
  }

  let products = JSON.parse(localStorage.getItem("products")) || [
    { kode: "L001", nama: "Kertas HVS", jumlah: 10, status: "Kosong", harga: "Rp 500.000" },
    { kode: "L002", nama: "Minyak Ikan", jumlah: 10, status: "Tersedia", harga: "Rp 1.000.000" },
    { kode: "L003", nama: "Timbangan", jumlah: 2, status: "Dalam Pengiriman", harga: "Rp 120.000" },
  ];

  function formatRupiah(angka) {
    if (!angka) return "-";
    if (typeof angka === "string" && angka.trim().toLowerCase().startsWith("rp")) {
      return angka;
    }
    const num = parseInt(angka);
    if (isNaN(num)) return "-";
    return "Rp " + num.toLocaleString("id-ID");
  }

  function renderTable(data) {
    $tableBody.empty();
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = data.slice(start, start + itemsPerPage);

    $.each(paginated, function (i, p) {
      const row = `
        <tr>
          <td>${p.kode}</td>
          <td>${p.nama}</td>
          <td>${p.jumlah}</td>
          <td>${p.status}</td>
          <td>${formatRupiah(p.harga)}</td>
          <td>
            <button class="btnEdit" data-index="${start + i}">Edit</button>
            <button class="btnHapus" data-index="${start + i}">Hapus</button>
          </td>
        </tr>
      `;
      $tableBody.append(row);
    });

    $("#pageNumber").text(currentPage);
  }

  $(document).on("click", ".btnEdit", function () {
    selectedIndex = $(this).data("index");
    const p = products[selectedIndex];

    $("#editKode").val(p.kode);
    $("#editNama").val(p.nama);
    $("#editJumlah").val(p.jumlah);
    $("#editStatus").val(p.status);
    $("#editHarga").val(p.harga);

    $editPopup.css("display", "flex").hide().fadeIn(200);
  });

  $("#saveEdit").on("click", function () {
    const p = products[selectedIndex];
    const hargaInput = $("#editHarga").val().trim();
    const numeric = hargaInput.replace(/[^0-9]/g, "");

    p.kode = $("#editKode").val();
    p.nama = $("#editNama").val();
    p.jumlah = parseInt($("#editJumlah").val());
    p.status = $("#editStatus").val();
    p.harga = numeric ? "Rp " + parseInt(numeric).toLocaleString("id-ID") : "-";

    $editPopup.fadeOut(200);
    saveToLocal();
    renderTable(products);
  });

  $("#closeEdit").on("click", function () {
    $editPopup.fadeOut(200);
  });

  $("#addBtn").on("click", function () {
    $addPopup.css("display", "flex").hide().fadeIn(200);
    $addPopup.find("input").val("");
  });

  $("#closeAdd").on("click", function () {
    $addPopup.fadeOut(200);
  });

  $("#saveAdd").on("click", function () {
    const hargaInput = $("#newHarga").val().trim();
    const numeric = hargaInput.replace(/[^0-9]/g, "");

    const newP = {
      kode: $("#newKode").val(),
      nama: $("#newNama").val(),
      jumlah: parseInt($("#newJumlah").val()),
      status: $("#newStatus").val(),
      harga: numeric ? "Rp " + parseInt(numeric).toLocaleString("id-ID") : "-",
    };

    products.push(newP);
    saveToLocal();
    $addPopup.fadeOut(200);
    renderTable(products);
  });

  $(document).on("click", ".btnHapus", function () {
    selectedIndex = $(this).data("index");
    $deletePopup.css("display", "flex").hide().fadeIn(200);
  });

  $("#confirmDelete").on("click", function () {
    products.splice(selectedIndex, 1);
    saveToLocal();
    $deletePopup.fadeOut(200);
    renderTable(products);
  });

  $("#cancelDelete").on("click", function () {
    $deletePopup.fadeOut(200);
  });

  $searchInput.on("input", function () {
    const keyword = $(this).val().toLowerCase();
    const filtered = products.filter(
      (p) => p.nama.toLowerCase().includes(keyword) || p.kode.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
  });

  $("#nextPage").on("click", function () {
    if (currentPage * itemsPerPage < products.length) {
      currentPage++;
      renderTable(products);
    }
  });

  $("#prevPage").on("click", function () {
    if (currentPage > 1) {
      currentPage--;
      renderTable(products);
    }
  });

  renderTable(products);
});