# Program Pengelolaan Data Nilai Mahasiswa
# ----------------------------------------
# Fitur: menghitung nilai akhir, menampilkan data, filter, dan input mahasiswa baru

# WARNA
GREEN = "\033[32m"
YELLOW = "\033[33m"
CYAN = "\033[36m"
RESET = "\033[0m"

# Data awal (minimal 5 mahasiswa)
mahasiswa = [
    {"nama": "Andi", "NIM": "A001", "nilai_uts": 78, "nilai_uas": 85, "nilai_tugas": 80},
    {"nama": "Budi", "NIM": "A002", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 68},
    {"nama": "Citra", "NIM": "A003", "nilai_uts": 90, "nilai_uas": 88, "nilai_tugas": 92},
    {"nama": "Dewi", "NIM": "A004", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58},
    {"nama": "Eko", "NIM": "A005", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
]

# Fungsi untuk menghitung nilai akhir
def hitung_nilai_akhir(m):
    return 0.3 * m["nilai_uts"] + 0.4 * m["nilai_uas"] + 0.3 * m["nilai_tugas"]

# Fungsi untuk menentukan grade
def tentukan_grade(nilai):
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"

# Fungsi menampilkan tabel data
def tampilkan_data():
    print("="*70)
    print(f"{'NIM':<10}{'Nama':<15}{'UTS':<8}{'UAS':<8}{'Tugas':<8}{'Akhir':<8}{'Grade'}")
    print("="*70)
    for m in mahasiswa:
        nilai_akhir = hitung_nilai_akhir(m)
        grade = tentukan_grade(nilai_akhir)
        print(f"{m['NIM']:<10}{m['nama']:<15}{m['nilai_uts']:<8}{m['nilai_uas']:<8}{m['nilai_tugas']:<8}{nilai_akhir:<8.2f}{grade}")
    print("="*70)

# Fungsi cari mahasiswa dengan nilai tertinggi dan terendah
def cari_tertinggi_terendah():
    nilai_akhir_semua = [(m, hitung_nilai_akhir(m)) for m in mahasiswa]
    tertinggi = max(nilai_akhir_semua, key=lambda x: x[1])
    terendah = min(nilai_akhir_semua, key=lambda x: x[1])
    print(f"Mahasiswa Nilai Tertinggi: {tertinggi[0]['nama']} ({tertinggi[1]:.2f})")
    print(f"Mahasiswa Nilai Terendah: {terendah[0]['nama']} ({terendah[1]:.2f})")

# Fitur tambahan: input data baru
def input_mahasiswa_baru():
    nama = input("Nama: ")
    NIM = input("NIM: ")
    uts = float(input("Nilai UTS: "))
    uas = float(input("Nilai UAS: "))
    tugas = float(input("Nilai Tugas: "))
    mahasiswa.append({"nama": nama, "NIM": NIM, "nilai_uts": uts, "nilai_uas": uas, "nilai_tugas": tugas})
    print("✅ Data berhasil ditambahkan!")

# Fitur tambahan: filter berdasarkan grade
def filter_grade():
    target = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
    print(f"\nMahasiswa dengan grade {target}:")
    print("="*50)
    for m in mahasiswa:
        nilai_akhir = hitung_nilai_akhir(m)
        grade = tentukan_grade(nilai_akhir)
        if grade == target:
            print(f"{m['nama']} ({m['NIM']}) - Nilai Akhir: {nilai_akhir:.2f}")
    print("="*50)

# Fitur tambahan: hitung rata-rata kelas
def rata_rata_kelas():
    total = sum(hitung_nilai_akhir(m) for m in mahasiswa)
    rata = total / len(mahasiswa)
    print(f"Rata-rata nilai akhir kelas: {rata:.2f}")

# Menu utama
def menu():
    while True:
        print(f"\n{GREEN}=== Program Pengelolaan Data Nilai Mahasiswa ==={RESET}")
        print(f"{CYAN}1. Tampilkan Data")
        print(f"{CYAN}2. Tambah Mahasiswa Baru")
        print(f"{CYAN}3. Cari Nilai Tertinggi/Terendah")
        print(f"{CYAN}4. Filter Berdasarkan Grade")
        print(f"{CYAN}5. Hitung Rata-rata Kelas")
        print(f"{CYAN}6. Keluar")

        pilihan = input(f"{YELLOW}Pilih menu (1-6): {RESET}")

        if pilihan == "1":
            tampilkan_data()
        elif pilihan == "2":
            input_mahasiswa_baru()
        elif pilihan == "3":
            cari_tertinggi_terendah()
        elif pilihan == "4":
            filter_grade()
        elif pilihan == "5":
            rata_rata_kelas()
        elif pilihan == "6":
            print(f"{GREEN}Terima kasih! Program selesai.{RESET}")
            break
        else:
            print(f"{YELLOW}❌ Pilihan tidak valid!{RESET}")

# Jalankan program
menu()

