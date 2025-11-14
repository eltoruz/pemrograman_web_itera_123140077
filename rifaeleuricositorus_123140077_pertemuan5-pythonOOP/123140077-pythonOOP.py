from abc import ABC, abstractmethod

# =========================================================
# ABSTRACT CLASS – dasar untuk semua jenis item perpustakaan
# =========================================================
# Class ini tidak bisa dibuat objek langsung.
# Berfungsi sebagai template umum untuk Book & Magazine.
# Menggunakan konsep:
# - Encapsulation (atribut privat)
# - Abstraction (method abstract)
# - Polymorphism (get_info diimplementasikan berbeda pada subclass)
class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self.__item_id = item_id          # Encapsulation: atribut privat
        self.__title = title
        self.__is_available = True        # Default tersedia

    # Getter item_id (read-only)
    @property
    def item_id(self):
        return self.__item_id

    # Getter-setter title
    @property
    def title(self):
        return self.__title
    
    @title.setter
    def title(self, new_title):
        self.__title = new_title

    # Getter status
    @property
    def is_available(self):
        return self.__is_available

    # Abstract method → wajib diimplementasikan subclass
    @abstractmethod
    def get_info(self):
        pass


# =========================================================
# SUBCLASS BOOK – Inheritance dari LibraryItem
# =========================================================
class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.__author = author

    @property
    def author(self):
        return self.__author
    
    @author.setter
    def author(self, new_author):
        self.__author = new_author

    # Polymorphism: versi khusus untuk Book
    def get_info(self):
        return f"[BOOK] ID: {self.item_id} | Judul: {self.title} | Penulis: {self.author}"


# =========================================================
# SUBCLASS MAGAZINE – Inheritance dari LibraryItem
# =========================================================
class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.__issue_number = issue_number

    @property
    def issue_number(self):
        return self.__issue_number

    @issue_number.setter
    def issue_number(self, new_issue):
        self.__issue_number = new_issue

    # Polymorphism: versi khusus untuk Magazine
    def get_info(self):
        return f"[MAGAZINE] ID: {self.item_id} | Judul: {self.title} | Edisi: {self.issue_number}"


# =========================================================
# CLASS LIBRARY – Manajemen koleksi Book & Magazine
# =========================================================
class Library:
    def __init__(self):
        self.items = []  # Menyimpan objek dari subclass LibraryItem

    def is_id_exists(self, item_id):
        """Cek apakah ID sudah ada."""
        return any(item.item_id == item_id for item in self.items)

    def add_item(self, item):
        """Tambah item baru (Book/Magazine) dengan validasi ID unik."""
        if self.is_id_exists(item.item_id):
            print(f"❌ ID '{item.item_id}' sudah digunakan!\n")
            return
        self.items.append(item)
        print("Item berhasil ditambahkan!\n")

    def show_items(self):
        """Menampilkan semua item."""
        print("\n=== DAFTAR ITEM ===")
        if not self.items:
            print("Belum ada item.\n")
            return
        for item in self.items:
            print(item.get_info())
        print()

    def remove_item(self, item_id):
        """Hapus item berdasarkan ID."""
        for item in self.items:
            if item.item_id == item_id:
                self.items.remove(item)
                print("Item berhasil dihapus!\n")
                return
        print("Item tidak ditemukan.\n")

    def edit_item(self, item_id, **kwargs):
        """Edit atribut item berdasarkan tipe objek."""
        for item in self.items:
            if item.item_id == item_id:

                if "title" in kwargs and kwargs["title"]:
                    item.title = kwargs["title"]

                if isinstance(item, Book) and kwargs.get("author"):
                    item.author = kwargs["author"]

                if isinstance(item, Magazine) and kwargs.get("issue_number"):
                    item.issue_number = kwargs["issue_number"]

                print("Item berhasil diperbarui!\n")
                return
        print("Item tidak ditemukan.\n")

    def search(self, keyword):
        """Cari item berdasarkan ID atau judul."""
        print("\n=== HASIL PENCARIAN ===")
        keyword = keyword.lower()
        found = False
        for item in self.items:
            if keyword == str(item.item_id).lower() or keyword in item.title.lower():
                print(item.get_info())
                found = True
        if not found:
            print("Item tidak ditemukan.")
        print()


# =========================================================
# MENU PROGRAM (tanpa pinjam & kembalikan)
# =========================================================
def main():
    library = Library()

    while True:
        print("""
========= MENU PERPUSTAKAAN =========
1. Tambah Book
2. Tambah Magazine
3. Tampilkan Semua Item
4. Cari Item
5. Edit Item
6. Hapus Item
0. Keluar
""")

        pilihan = input("Pilih menu: ")

        if pilihan == "1":
            id = input("Masukkan ID: ")
            title = input("Judul: ")
            author = input("Penulis: ")
            library.add_item(Book(id, title, author))

        elif pilihan == "2":
            id = input("Masukkan ID: ")
            title = input("Judul: ")
            issue = input("Edisi: ")
            library.add_item(Magazine(id, title, issue))

        elif pilihan == "3":
            library.show_items()

        elif pilihan == "4":
            keyword = input("Masukkan ID atau Judul: ")
            library.search(keyword)

        elif pilihan == "5":
            id = input("Masukkan ID item: ")
            title = input("Judul baru (kosongkan jika tidak diubah): ")
            author = input("Penulis baru (untuk Book): ")
            issue = input("Edisi baru (untuk Magazine): ")

            library.edit_item(
                id,
                title=title,
                author=author,
                issue_number=issue
            )

        elif pilihan == "6":
            id = input("Masukkan ID item: ")
            library.remove_item(id)

        elif pilihan == "0":
            print("Program selesai.")
            break

        else:
            print("Pilihan tidak valid!\n")


# =========================================================
# JALANKAN PROGRAM
# =========================================================
if __name__ == "__main__":
    main()
