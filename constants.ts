import { UnitData, BudgetHierarchy, User } from './types';

// Approximated data based on the screenshot provided
export const MOCK_DATA: UnitData[] = [
  { id: 1, unitCode: "FEB", unitName: "Fakultas Ekonomi & Bisnis", pagu: 8955620000, usulan: 8955620000, percentUsulan: 100, review: 8955620000, percentReview: 100, paguBlokir: 1018900000, paguAktif: 7936720000 },
  { id: 2, unitCode: "FH", unitName: "Fakultas Hukum", pagu: 10056505000, usulan: 10056505000, percentUsulan: 100, review: 10056505000, percentReview: 100, paguBlokir: 1109182000, paguAktif: 8947323000 },
  { id: 3, unitCode: "FKIP", unitName: "Fakultas Keguruan", pagu: 18249074000, usulan: 18249074000, percentUsulan: 100, review: 18249074000, percentReview: 100, paguBlokir: 1780843000, paguAktif: 16468231000 },
  { id: 4, unitCode: "FP", unitName: "Fakultas Pertanian", pagu: 9472479000, usulan: 9472479000, percentUsulan: 100, review: 9472479000, percentReview: 100, paguBlokir: 1041719000, paguAktif: 8430760000 },
  { id: 5, unitCode: "FISIP", unitName: "Fisip", pagu: 11633871000, usulan: 11633871000, percentUsulan: 100, review: 11633871000, percentReview: 100, paguBlokir: 1212362000, paguAktif: 10421509000 },
  { id: 6, unitCode: "FT", unitName: "Fakultas Teknik", pagu: 12611518000, usulan: 12611518000, percentUsulan: 100, review: 12611518000, percentReview: 100, paguBlokir: 1501067000, paguAktif: 11110451000 },
  { id: 7, unitCode: "FMIPA", unitName: "FMIPA", pagu: 9084608000, usulan: 9084608000, percentUsulan: 100, review: 9084608000, percentReview: 100, paguBlokir: 742100000, paguAktif: 8342508000 },
  { id: 8, unitCode: "FK", unitName: "Fakultas Kedokteran", pagu: 19750050000, usulan: 19750050000, percentUsulan: 100, review: 19750050000, percentReview: 100, paguBlokir: 1349274000, paguAktif: 18400776000 },
  { id: 9, unitCode: "PASCA", unitName: "Pascasarjana", pagu: 1871104000, usulan: 1871104000, percentUsulan: 100, review: 1871104000, percentReview: 100, paguBlokir: 165683000, paguAktif: 1705421000 },
  { id: 10, unitCode: "LPPM", unitName: "LPPM", pagu: 27890399000, usulan: 27890399000, percentUsulan: 100, review: 27890399000, percentReview: 100, paguBlokir: 3827473000, paguAktif: 24062926000 },
  { id: 11, unitCode: "LPMPP", unitName: "LPMPP", pagu: 4510336000, usulan: 4510336000, percentUsulan: 100, review: 4510336000, percentReview: 100, paguBlokir: 67224000, paguAktif: 4443112000 },
  { id: 12, unitCode: "BAK", unitName: "Biro Akademik", pagu: 10844874000, usulan: 10844874000, percentUsulan: 100, review: 10844874000, percentReview: 100, paguBlokir: 2168093000, paguAktif: 8676781000 },
  { id: 13, unitCode: "BKKU", unitName: "Biro Keuangan", pagu: 265013372000, usulan: 265013372000, percentUsulan: 100, review: 265013372000, percentReview: 100, paguBlokir: 17548032000, paguAktif: 247465340000 },
  { id: 14, unitCode: "BPKHM", unitName: "Biro Perencanaan", pagu: 11254652000, usulan: 11254652000, percentUsulan: 100, review: 11254652000, percentReview: 100, paguBlokir: 1830674000, paguAktif: 9423978000 },
  { id: 15, unitCode: "UPA BHS", unitName: "UPA Bahasa", pagu: 705566000, usulan: 705566000, percentUsulan: 100, review: 705566000, percentReview: 100, paguBlokir: 27570000, paguAktif: 677996000 },
  { id: 16, unitCode: "UPA LAB", unitName: "UPA Lab Terpadu", pagu: 986232000, usulan: 986232000, percentUsulan: 100, review: 986232000, percentReview: 100, paguBlokir: 47561000, paguAktif: 938671000 },
];

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const MOCK_RKAKL_DATA: BudgetHierarchy[] = [
  {
    id: "prog-1",
    code: "7730.DBA",
    description: "Pendidikan Tinggi [Base Line]",
    type: "program",
    paguTetap: 1500000000,
    usulan: 1500000000,
    children: [
      {
        id: "keg-1",
        code: "060",
        description: "Penyelenggaraan Layanan Pendidikan Perguruan Tinggi",
        type: "kegiatan",
        paguTetap: 1500000000,
        usulan: 1500000000,
        children: [
           {
            id: "out-1",
            code: "AE",
            description: "Praktisi Mengajar Di Kampus",
            type: "output",
            paguTetap: 50000000,
            usulan: 50000000,
            children: [
              {
                id: "comp-1",
                code: "525112",
                description: "Belanja Barang",
                type: "akun",
                paguTetap: 50000000,
                usulan: 50000000,
                children: [
                  {
                    id: "det-1",
                    code: "-",
                    description: "Honorarium Praktisi (2 Org x 5 Pertemuan)",
                    type: "detail",
                    volume: 10,
                    unit: "OJ",
                    unitPrice: 1500000,
                    paguTetap: 15000000,
                    usulan: 15000000,
                  },
                  {
                    id: "det-2",
                    code: "-",
                    description: "Transport Lokal Praktisi",
                    type: "detail",
                    volume: 10,
                    unit: "OK",
                    unitPrice: 3500000,
                    paguTetap: 35000000,
                    usulan: 35000000,
                  }
                ]
              }
            ]
           },
           {
            id: "out-2",
            code: "A2",
            description: "Penerimaan dan Registrasi Mahasiswa Baru",
            type: "output",
            paguTetap: 80000000,
            usulan: 85000000, // Intentional over-budget for demo
            children: [
               {
                id: "comp-2",
                code: "521211",
                description: "Belanja Bahan",
                type: "akun",
                paguTetap: 30000000,
                usulan: 30000000,
                children: [
                  {
                    id: "det-3",
                    code: "-",
                    description: "ATK Kegiatan Registrasi",
                    type: "detail",
                    volume: 1,
                    unit: "Paket",
                    unitPrice: 15000000,
                    paguTetap: 15000000,
                    usulan: 15000000,
                  },
                   {
                    id: "det-4",
                    code: "-",
                    description: "Cetak Kartu KTM Sementara",
                    type: "detail",
                    volume: 5000,
                    unit: "Lbr",
                    unitPrice: 3000,
                    paguTetap: 15000000,
                    usulan: 15000000,
                  }
                ]
               },
               {
                id: "comp-3",
                code: "524111",
                description: "Belanja Perjalanan Dinas Biasa",
                type: "akun",
                paguTetap: 50000000,
                usulan: 55000000, // diff
                children: [
                  {
                    id: "det-5",
                    code: "-",
                    description: "Perjalanan Dinas Koordinasi ke Pusat",
                    type: "detail",
                    volume: 5,
                    unit: "Orang",
                    unitPrice: 11000000, // Higher than pagu
                    paguTetap: 50000000,
                    usulan: 55000000,
                  }
                ]
               }
            ]
           }
        ]
      }
    ]
  }
];

export const MOCK_USERS: User[] = [
  { id: 1, username: "admin", name: "Susanto", nip: "198001012005011001", unit: "BPKHM", role: "admin", jabatan: "lainnya", status: "active" },
  { id: 2, username: "ivon.nilawati", name: "Ivon Nilawati", nip: "197905152003122002", unit: "BPKHM", role: "admin", jabatan: "lainnya", status: "active" },
  { id: 3, username: "admirayhan", name: "Rayhan", nip: "199508202020011003", unit: "BPKHM", role: "admin", jabatan: "lainnya", status: "active" },
  { id: 4, username: "admindra", name: "Indra Antarizal", nip: "199006062015041004", unit: "Bag. Perencanaan", role: "admin", jabatan: "lainnya", status: "active" },
  { id: 5, username: "jumain", name: "Jumain", nip: "198211102010101005", unit: "BPKHM", role: "admin", jabatan: "lainnya", status: "active" },
  { id: 6, username: "efendiagus", name: "Agus Effendi", nip: "197503252000031006", unit: "BPKHM", role: "admin", jabatan: "lainnya", status: "active" },
  { id: 7, username: "adminnava", name: "M. Nava Bukhairi", nip: "199207072019081007", unit: "BPKHM", role: "admin", jabatan: "lainnya", status: "inactive" },
  { id: 8, username: "adminsoni", name: "M. Soni Sudarsono", nip: "198809122014021008", unit: "BPKHM", role: "admin", jabatan: "lainnya", status: "active" },
  { id: 9, username: "admin2", name: "M. Iqbal Parabi", nip: "199312012021011009", unit: "BPKHM", role: "admin", jabatan: "lainnya", status: "active" },
  { id: 10, username: "adminanggun", name: "anggun karima", nip: "199402142022032001", unit: "UPA TIK", role: "admin", jabatan: "lainnya", status: "inactive" },
];