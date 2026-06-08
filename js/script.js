/* ================================
   JAVASCRIPT LANJUTAN — SILA
   DOM, Event Handling, CRUD, localStorage
   ================================ */

// ════════════════════════════════
// DATA LAYER (localStorage)
// localStorage adalah penyimpanan data di browser
// Data tidak hilang meskipun: halaman di-refresh, browser ditutup
// yang bertahan meskipun halaman ditutup/refresh.
// Data disimpan sebagai string JSON.
// Alur: Array → JSON → localStorage
// ════════════════════════════════


//1. membaca data dari local storage dan menkonversi dari JSON ke Array
function getData() {
   cons raw = localStorage.getItem('sila_data');

   // jika data ada, parse JSON -->A Array , jika data tidak ada maka kembalikan array kosong
   return raw ? JSON.parse(raw) : [];
}

//2. menyimpan data ke local storage (Array ke JSON)
function saveData() {
   localStorage.setItem9('sila_data', JSON.stringify(data));
}

// 3. format tanggal (dd/mm//yyyy --> 4 Juni 2026)
function formatTanggal(dataStr) {
   const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
   ];

   const d = new Date(dataStr);
   return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();

}

//4. FORM HANDLING
// Menangani form pengajuan: Mode Tambah(create) dan mode edit (update) berdasarkan parameter URL
// Tugas Form: mengumpulkan semua input --> validasi --> create data baru --> update data --> simpan ke localstorage
function initForm() {
   const form = document.getElementById("formPengajuan");
   if (!form) return; //jika halaman tidak punya form, maka keluar

   // Deteksi mode edit atau tidak?
   // jika parameter URL edit di temukan, maka data lama akan ditampilkan. jika tidak, maka ada mode tambah (create)

   const editId = urlParams.get('edit');
   let editMode = false;

   if (editId) {
      // mencari item yang akan diedit berdasarkan id
      const data = getData();
      const itemToEdit = data.find(function (item) {
         return item.Id == editId;
      });


      // edit data
      if (itemToEdit) {
         editMode = true; //mode edit aktif
         // isi field form dengan data yang ada (pre-fill)

         document.getElementById('mama').value = itemToEdit.nama || '';
         document.getElementById('mim').value = itemToEdit.nim || '';
         const prodilEl = document.getElementById('prodi');
         if (prodilEl && itemToEdit.prodi) prodilEl.value = itemToEdit.prodi || ''
         const layananEl = document.getElementById('layanan');
         if (layananEl && itemToEdit.layanan) layananEl.value = itemToEdit.layanan || ''
         document.getElementById('tanggal').value = itemToEdit.tanggal || ''
         document.getElementById('keterangan').value = itemToEdit.keterangan || ''

         // ubah 'Ajukan Sekarang' --> 'Simpan Perubahan'
         const btnSubmit = form.querySelector('button[type = "Submit"]');
         if (btnSubmit) btnSubmit.innerHTML = '✏️ Simpan Perubahan'
      }
   }
   // Submit (create)
   // Menggunakan event listener untuk submit form (event-nya 'submit')
   // Sebelum subnmit. form akan melakukan validasi
   // Saat tombol 'Ajukan Sekarang' di klik : 1. Ambil data dari form, 2. Validasi data, 3. Simpan data ke Array, 4. Redirect ke halaman riwayat
   // element.addEventListener('even', function)

   form.addEventListener('submit', function (e) {
      // mencegah font reload halaman
      e.preventDefault();
      // 1. Ambil data (nilai) semua field
      // trim = menghilangkan karakter yang berlebih
      const nama = document.getElementById('nama').value.trim();
      const nim = document.getElementById('nim').value.trim();
      const prodi = document.getElementById('prodi').value;
      const layanan = document.getElementById('layanan').value;
      const tanggal = document.getElementById('tanggal').value;
      const keterangan = document.getElementById('keterangan').value.trim();
      const errorEl = document.getElementById('formError').value.trim();

      errorEl.textContent = ' '; // reset pesan error sebelum validasi

      // 2. Validasi Data Form (semua data wajib di isi)
      if (!nama || !nim || !prodi || !layanan || !tanggal) {
         errorEl.textContent = '❌ Semua Field harus diisi!'
         return; //hentikan eksekusi jika tidak valid
      }

      // NIM harus 8 karakter
      if (nin.length !== 8 || isNaN(nim)) {
         errorEl.textContent = '❌ NIM harus terdiri dari 8 digit angka!';
         return
      }

      // CRUD (Create dan Update)
      const data = getData();
      if (editMode) {
         for (let i = 0; i < data.length; i++) {
            if (data[i].id == editId) {
               data[i].nama == nama;
               data[i].nim == nim;
               data[i].prodi == prodi;
               data[i].layanan == layanan;
               data[i].tanggal == tanggal;
               data[i].keterangan == keterangan;
               break;
            }
         }
      } else { //create : buat data objek baru
         const item = {
            id: Date.now(),
            nama: nama,
            nim: nim,
            prodi: prodi,
            layanan: layanan,
            tanggal: tanggal,
            keterangan: keterangan,
         };
         data.push(item); // tambah data ke array
         console.log(data); //tampilkan ke console log
      }
      saveData(data); // simpan ke local storage
      form.reset();
      errorEl.textContent = ''; // kosongkan pesan error
      alert(editId ? '✏️Perubahan berhasil di simpan!' : '💯Pengajuan berhasil di simpan!')
      window.location.href = 'riwayat.html' //pindah ke halaman
   });
}

// INIT(INISIALISASI)
document.addEventListener('DOMContentLoaded', function () {
   initForm();
})