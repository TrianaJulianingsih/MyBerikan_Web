let meetings = [];
let editId = null;

$(document).ready(function () {
    const meetingContainer = $("#meetingContainer");
    const meetingModal = $("#meetingModal");
    const modalTitle = $("#modalTitle");

    function saveToLocalStorage() {
        localStorage.setItem("meetings", JSON.stringify(meetings));
    }

    function loadFromLocalStorage() {
        const data = localStorage.getItem("meetings");
        if (data) {
            meetings = JSON.parse(data);
        } else {
            meetings = [
                { id: 1, judul: "Rapat Tim IT", tanggal: "2025-11-05", waktu: "10:00", deskripsi: "Bahas pengembangan fitur baru." },
                { id: 2, judul: "Meeting HR", tanggal: "2025-11-06", waktu: "14:00", deskripsi: "Rekrutmen karyawan baru." }
            ];
            saveToLocalStorage();
        }
    }

    function renderMeetings() {
        meetingContainer.empty();
        meetings.forEach((m) => {
            meetingContainer.append(`
                <div class="card">
                    <div class="card-title">${m.judul}</div>
                    <div class="card-info">Tanggal: ${m.tanggal}</div>
                    <div class="card-info">Waktu: ${m.waktu}</div>
                    <div class="card-info">${m.deskripsi}</div>
                    <div class="card-actions">
                        <button class="btn btn-edit" onclick="editMeeting(${m.id})">Edit</button>
                        <button class="btn btn-delete" onclick="hapusMeeting(${m.id})">Hapus</button>
                    </div>
                </div>
        `   );
        });
    }

    function openModal(isEdit = false) {
        meetingModal.css("display", "flex");
        if (!isEdit) {
            modalTitle.text("Tambah Meeting");
            $("#inputJudul").val("");
            $("#inputTanggal").val("");
            $("#inputWaktu").val("");
            $("#inputDeskripsi").val("");
        }
    }

    function closeModal() {
        meetingModal.hide();
    }
    $("#btnTambah").click(() => {
        editId = null;
        openModal(false);
    });

    $("#btnBatal").click(() => closeModal());

    $("#btnSimpan").click(() => {
        const judul = $("#inputJudul").val().trim();
        const tanggal = $("#inputTanggal").val();
        const waktu = $("#inputWaktu").val();
        const deskripsi = $("#inputDeskripsi").val().trim();

        if (!judul || !tanggal || !waktu) {
            alert("Harap isi semua field wajib!");
            return;
        }

        if (editId) {
            const index = meetings.findIndex((m) => m.id === editId);
            meetings[index] = { id: editId, judul, tanggal, waktu, deskripsi };
        } else {
            const newId = Date.now();
            meetings.push({ id: newId, judul, tanggal, waktu, deskripsi });
        }

        saveToLocalStorage();
        renderMeetings();
        closeModal();
    });

    window.editMeeting = (id) => {
        const m = meetings.find((x) => x.id === id);
        if (!m) return;
        editId = id;
        modalTitle.text("Edit Meeting");
        $("#inputJudul").val(m.judul);
        $("#inputTanggal").val(m.tanggal);
        $("#inputWaktu").val(m.waktu);
        $("#inputDeskripsi").val(m.deskripsi);
        openModal(true);
    };

    window.hapusMeeting = (id) => {
        if (confirm("Yakin ingin menghapus meeting ini?")) {
            meetings = meetings.filter((m) => m.id !== id);
            saveToLocalStorage();
            renderMeetings();
        }
    };

    $(window).click(function (e) {
        if (e.target === meetingModal[0]) {
            closeModal();
        }
    });
    loadFromLocalStorage();
    renderMeetings();
});
