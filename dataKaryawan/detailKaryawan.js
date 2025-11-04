$(document).ready(function () {
  const employee = JSON.parse(localStorage.getItem("selectedEmployee"));

  if (!employee) {
    alert("Data karyawan tidak ditemukan!");
    window.location.href = "dataKaryawan.html";
    return;
  }

  // Isi data profil
  $("#foto").attr("src", employee.foto || "../assets/images/default-profile.png");
  $("#nama").text(employee.nama);
  $("#nip").text(employee.nip);
  $("#divisi").text(employee.divisi);
  $("#jabatan").text(employee.jabatan);
  $("#status").text(employee.status);
  $("#gaji").text(employee.gaji || "0");
  $("#alamat").text(employee.alamat || "Belum diisi");

  // Dummy log kehadiran
  const attendanceLogs = [
    { tanggal: "01/11/2025", masuk: "08:05", keluar: "17:01", status: "Hadir" },
    { tanggal: "02/11/2025", masuk: "08:15", keluar: "17:00", status: "Hadir" },
    { tanggal: "03/11/2025", masuk: "-", keluar: "-", status: "Cuti" },
    { tanggal: "04/11/2025", masuk: "08:00", keluar: "17:10", status: "Hadir" },
  ];

  const tbody = $("#attendanceBody");
  attendanceLogs.forEach((log) => {
    tbody.append(`
      <tr>
        <td>${log.tanggal}</td>
        <td>${log.masuk}</td>
        <td>${log.keluar}</td>
        <td>${log.status}</td>
      </tr>
    `);
  });

  // Tombol kembali
  $("#backBtn").click(function () {
    window.location.href = "dataKaryawan.html";
  });
});
