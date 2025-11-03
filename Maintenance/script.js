$(document).ready(function () {
  const cardList = $("#alatList");
  const searchInput = $("#search");
  const editPopup = $("#editPopup");
  const addPopup = $("#addPopup");
  const deletePopup = $("#deletePopup");

  let selectedIndex = null;

  let alatList = JSON.parse(localStorage.getItem("alatList")) || [
    { kode: "A001", nama: "Pompa Air", keluhan: "Bocor pada pipa utama", status: "Tersolved" },
    { kode: "A002", nama: "Filter Air", keluhan: "Filter mampet dan kotor", status: "Belum" },
    { kode: "A003", nama: "Sensor Suhu", keluhan: "Tidak membaca suhu", status: "Belum" },
    { kode: "A004", nama: "Motor Listrik", keluhan: "Bunyi tidak normal", status: "Tersolved" },
    { kode: "A005", nama: "Valve Tekanan", keluhan: "Bocor pada sambungan", status: "Belum" },
  ];

  function saveToLocal() {
    localStorage.setItem("alatList", JSON.stringify(alatList));
  }

  function renderCards(data) {
    cardList.empty();
    data.forEach((a, i) => {
      const card = $(`
        <div class="card-item">
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
              <button class="edit-btn" data-index="${i}">Edit</button>
              <button class="delete-btn" data-index="${i}">Delete</button>
            </div>
          </div>
        </div>
      `);
      cardList.append(card);
    });

    $(".dropdown-btn").on("click", function (e) {
      e.stopPropagation();
      $(".dropdown-menu").hide();
      $(this).next(".dropdown-menu").show();
    });

    $("body").on("click", function () {
      $(".dropdown-menu").hide();
    });

    $(".edit-btn").on("click", function () {
      const index = $(this).data("index");
      openEdit(index);
    });

    $(".delete-btn").on("click", function () {
      const index = $(this).data("index");
      openDelete(index);
    });
  }

  function openEdit(index) {
    selectedIndex = index;
    const a = alatList[index];
    $("#editKode").val(a.kode);
    $("#editNama").val(a.nama);
    $("#editKeluhan").val(a.keluhan);
    $("#editStatus").val(a.status);
    editPopup.css("display", "flex").hide().fadeIn(200);
  }

  $("#saveEdit").on("click", function () {
    const a = alatList[selectedIndex];
    a.kode = $("#editKode").val();
    a.nama = $("#editNama").val();
    a.keluhan = $("#editKeluhan").val();
    a.status = $("#editStatus").val();
    editPopup.fadeOut(200);
    saveToLocal();
    renderCards(alatList);
  });

  $("#closeEdit").on("click", function () {
    editPopup.fadeOut(200);
  });

  $("#addBtn").on("click", function () {
    addPopup.css("display", "flex").hide().fadeIn(200);
  });

  $("#closeAdd").on("click", function () {
    addPopup.fadeOut(200);
  });

  $("#saveAdd").on("click", function () {
    const newA = {
      kode: $("#newKode").val(),
      nama: $("#newNama").val(),
      keluhan: $("#newKeluhan").val(),
      status: $("#newStatus").val(),
    };
    alatList.push(newA);
    saveToLocal();
    addPopup.fadeOut(200);
    renderCards(alatList);
  });

  function openDelete(index) {
    selectedIndex = index;
    deletePopup.css("display", "flex").hide().fadeIn(200);
  }

  $("#confirmDelete").on("click", function () {
    alatList.splice(selectedIndex, 1);
    deletePopup.fadeOut(200);
    saveToLocal();
    renderCards(alatList);
  });

  $("#cancelDelete").on("click", function () {
    deletePopup.fadeOut(200);
  });

  searchInput.on("input", function () {
    const keyword = $(this).val().toLowerCase();
    const filtered = alatList.filter(
      (a) => a.nama.toLowerCase().includes(keyword) || a.kode.toLowerCase().includes(keyword)
    );
    renderCards(filtered);
  });

  renderCards(alatList);
});