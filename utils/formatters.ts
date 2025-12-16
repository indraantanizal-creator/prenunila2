export const formatRupiah = (value: string | number): string => {
  if (!value) return '';
  const stringValue = value.toString().replace(/[^0-9]/g, '');
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const parseRupiah = (value: string): number => {
  if (!value) return 0;
  return parseInt(value.replace(/\./g, ''), 10);
};

export const terbilang = (nilai: number): string => {
  const bilangan = String(nilai);
  let angka: number[] = new Array(16).fill(0);
  const kata = new Array('', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan');
  const tingkat = new Array('', 'Ribu', 'Juta', 'Miliar', 'Triliun');
  const panjang_bilangan = bilangan.length;

  /* pengujian panjang bilangan */
  if (panjang_bilangan > 15) {
    return "Diluar Batas";
  }

  /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
  for (let i = 1; i <= panjang_bilangan; i++) {
    angka[i] = parseInt(bilangan.substr(-(i), 1));
  }

  let i = 1;
  let j = 0;
  let kalimat = "";

  /* mulai proses iterasi terhadap array angka */
  while (i <= panjang_bilangan) {
    let subkalimat = "";
    let kata1 = "";
    let kata2 = "";
    let kata3 = "";

    /* untuk Ratusan */
    if (angka[i + 2] != 0) {
      if (angka[i + 2] == 1) {
        kata1 = "Seratus";
      } else {
        kata1 = kata[angka[i + 2]] + " Ratus";
      }
    }

    /* untuk Puluhan atau Belasan */
    if (angka[i + 1] != 0) {
      if (angka[i + 1] == 1) {
        if (angka[i] == 0) {
          kata2 = "Sepuluh";
        } else if (angka[i] == 1) {
          kata2 = "Sebelas";
        } else {
          kata2 = kata[angka[i]] + " Belas";
        }
      } else {
        kata2 = kata[angka[i + 1]] + " Puluh";
      }
    }

    /* untuk Satuan */
    if (angka[i] != 0) {
      if (angka[i + 1] != 1) {
        kata3 = kata[angka[i]];
      }
    }

    /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
    if ((angka[i] != 0) || (angka[i + 1] != 0) || (angka[i + 2] != 0)) {
      subkalimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
    }

    /* gabungkan variab sub kalimat (untuk Satu Ribu diganti dengan Seribu) */
    if ((angka[i + 2] == 0) && (angka[i + 1] == 0) && (angka[i] == 1) && (j == 1)) {
        subkalimat = "Seribu ";
    }
    
    kalimat = subkalimat + kalimat;
    i = i + 3;
    j = j + 1;
  }

  /* mengganti Satu Ribu jadi Seribu jika diperlukan */
  if ((angka[5] == 0) && (angka[6] == 0)) {
    kalimat = kalimat.replace("Satu Ribu", "Seribu");
  }

  return (kalimat.trim().replace(/\s+/g, ' ') + " Rupiah");
};