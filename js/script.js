// M12 - JS DASAR 
// VARIABLE. FUNGSI, VALIDASI SEDERHANA

// membuat varibael constanta untk layanan(array menyimpan kode layanan)

const LAYANAN = ['SKA', 'PDA', 'CAK', 'TNM']

// mau membuat FUNGSI FORMAT tgl/bln/thn (dd/mm/yyyy)
// menggunakan objek bawaan dari JS nya

function formatTanggal(dateStr) {
    // mengubah format (FORMATING)
    const bulan = ['Jan', "Feb", 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sept', 'Okt', 'Nov', 'Des']
    // deklarasi new date obj
    const d = new Date(dateStr);

    // FORMAT (TGL - BLN - THN)
    return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear()
}

// FUNGSI VALIDASI FORM --> jika tidak di isi maka tidak bisa di submit
function validasiForm() {
    // bbrp cara : 1. get value dari tiap inputan
    const namaLengkap = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;
    const prodi = document.getElementById('prodi').value;
    const layanan = document.getElementById('layanan').value;
    const tanggal = document.getElementById('tanggal').value;

    // alert(namaLengkap, nim, prodi, layanan, tanggal)

    // 2. validasi --> cek field yang kosong
    // jika salah satunya tidak diisi maka tidak bisa di submit dan langsung ada pesan
    if (namaLengkap === '' || nim === '' || prodi === '' || layanan === '' || tanggal === '') {
        alert('❌ Semua field wajib diisi!');
        return false;
    }

    if (nim.length !== 8 || isNaN(nim)) {
        alert('❌ NIM harus terdiri dari 8 digit angka murni!');
        return false;
    }
    // Berhasil
    // console 
    console.log("Data Pengajuan:", {
        nama: namaLengkap,
        nim: nim,
        prodi: prodi,
        layanan: layanan,
        tanggal: formatTanggal(tanggal)
    });

    alert ('✅ Pengajuan Berhasil!\n' +
        'Nama: ' + namaLengkap + '\n' +
        'NIM: ' + nim + '\n' +
        'Prodi: ' + prodi + '\n' +
        'Layanan: ' + layanan  + '\n' +
        'Tanggal: ' + formatTanggal(tanggal)
    );
    return true;

}