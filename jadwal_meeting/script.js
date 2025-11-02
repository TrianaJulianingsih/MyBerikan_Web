const meetingContainer = document.getElementById("meetingContainer");
const meetingModal = document.getElementById("meetingModal");
const btnTambah = document.getElementById("btnTambah");
const btnSimpan = document.getElementById("btnSimpan");
const btnBatal = document.getElementById("btnBatal");
const modalTitle = document.getElementById("modalTitle");

const inputJudul = document.getElementById("inputJudul");
const inputTanggal = document.getElementById("inputTanggal");
const inputWaktu = document.getElementById("inputWaktu");
const inputDeskripsi = document.getElementById("inputDeskripsi");

let meetings = [
    { 
        id: 1, 
        judul: "Rapat Tim IT", 
        tanggal: "2025-11-05", 
        waktu: "10:00", 
        deskripsi: "Bahas pengembangan fitur baru." 
    },
    { 
        id: 2, 
        judul: "Meeting HR", 
        tanggal: "2025-11-06", 
        waktu: "14:00", 
        deskripsi: "Rekrutmen karyawan baru." 
    }
];

let editId = null;

function renderMeetings() {
    meetingContainer.innerHTML = "";
    meetings.forEach((m) => {
        const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <div class="card-title">${m.judul}</div>
                <div class="card-info">Tanggal: ${m.tanggal}</div>
                <div class="card-info">Waktu: ${m.waktu}</div>
                <div class="card-info">${m.deskripsi}</div>
                <div class="card-actions">
                    <button class="btn btn-edit" onclick="editMeeting(${m.id})">Edit</button>
                    <button class="btn btn-delete" onclick="hapusMeeting(${m.id})">Hapus</button>
                </div>
            `;
            meetingContainer.appendChild(card);
    });
}

function openModal(isEdit = false) {
    meetingModal.style.display = "flex";
    if (!isEdit) {
        modalTitle.textContent = "Tambah Meeting";
        inputJudul.value = "";
        inputTanggal.value = "";
        inputWaktu.value = "";
        inputDeskripsi.value = "";
    }
}

function closeModal() {
    meetingModal.style.display = "none";
}

btnTambah.onclick = () => {
    editId = null;
    openModal(false);
};

btnBatal.onclick = () => closeModal();

btnSimpan.onclick = () => {
    const judul = inputJudul.value.trim();
    const tanggal = inputTanggal.value;
    const waktu = inputWaktu.value;
    const deskripsi = inputDeskripsi.value.trim();

    if (!judul || !tanggal || !waktu) {
        alert("Harap isi semua field yang wajib!");
        return;
    }

    if (editId) {
        const index = meetings.findIndex((m) => m.id === editId);
        meetings[index] = { id: editId, judul, tanggal, waktu, deskripsi };
    } else {
        const newId = Date.now();
        meetings.push({ id: newId, judul, tanggal, waktu, deskripsi });
    }

    renderMeetings();
    closeModal();
};

window.editMeeting = (id) => {
    const m = meetings.find((x) => x.id === id);
    if (!m) return;
    editId = id;
    modalTitle.textContent = "Edit Meeting";
    inputJudul.value = m.judul;
    inputTanggal.value = m.tanggal;
    inputWaktu.value = m.waktu;
    inputDeskripsi.value = m.deskripsi;
    openModal(true);
};

window.hapusMeeting = (id) => {
    if (confirm("Yakin ingin menghapus meeting ini?")) {
        meetings = meetings.filter((m) => m.id !== id);
        renderMeetings();
    }
};
window.onclick = (e) => {
    if (e.target === meetingModal) {
        closeModal();
    }
};

renderMeetings();
