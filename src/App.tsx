import React, { useState } from "react";

const NAMA_OPTIONS = ["Dr. Indra Wijaya", "Sri Lestari, S.Si", "Budi Prasetyo, M.Sc", "Ayu Rahmawati, M.Eng", "Hendra Saputra"];
const CHEMICAL_OPTIONS = [
  "Asam Sulfat (H2SO4)",
  "Natrium Klorida (NaCl)",
  "Etanol (C2H5OH)",
  "Amoniak (NH3)",
  "Kalium Permanganat (KMnO4)"
];
const MATRIKS_OPTIONS = [
  "Air Minum",
  "Limbah Cair",
  "Air Permukaan",
  "Tanah",
  "Produk Pangan"
];
const UNIT_OPTIONS = ["gram", "mg", "kg", "liter", "ml"];



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    nama: "",
    tanggal: "",
    bahan: "",
    matriks: "",
    preparasi: "",
    satuan: "",
    jumlah: ""
  });

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Data telah berhasil disimpan!");
    setForm({
      nama: "",
      tanggal: "",
      bahan: "",
      matriks: "",
      preparasi: "",
      satuan: "",
      jumlah: ""
    });
    setCurrentStep(1);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Username atau password salah. Gunakan admin/admin123");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const renderHeader = () => {
    return (
      <>
        <header className="w-full py-3 px-6 bg-[#255a59] shadow-md fixed top-0 left-0 z-30">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-9">
                <img src="https://ext.same-assets.com/2248644693/3864357213.png" alt="Wilmar Logo" className="h-full" />
              </div>
              <h1 className="text-white font-extrabold text-lg tracking-wide">PT Mustika Sembuluh 1</h1>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#" className="text-white hover:text-gray-300 text-sm">Home</a></li>
                <li><a href="#" className="text-white hover:text-gray-300 text-sm">About Us</a></li>
                <li><a href="#" className="text-white hover:text-gray-300 text-sm">Products</a></li>
                <li><a href="#" className="text-white hover:text-gray-300 text-sm">Sustainability</a></li>
                <li><a href="#" className="text-white hover:text-gray-300 text-sm">Contact</a></li>
              </ul>
            </nav>
            <div className="flex items-center space-x-3">
              <a href="#" className="text-white text-xs hover:underline hidden md:block">Careers</a>
              <a href="#" className="text-white text-xs hover:underline hidden md:block">Contact Us</a>
              {isLoggedIn && (
                <button onClick={handleLogout} className="text-white text-xs hover:underline">Logout</button>
              )}
              <button className="md:hidden text-white" onClick={() => setShowMobileMenu((prev) => !prev)} aria-label="Buka menu navigasi">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        {showMobileMenu && (
          <nav
            className="block md:hidden fixed top-[52px] left-0 right-0 z-30 px-4 py-2 animate-[fadeSlideDown_0.3s_ease]"
            style={{
              backgroundColor: 'rgba(37,90,89,0.92)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)'
            }}
          >
            <ul className="flex flex-col items-center space-y-2 text-white">
              <li><a href="#" className="hover:underline w-full text-base">Home</a></li>
              <li><a href="#" className="hover:underline w-full text-base">About Us</a></li>
              <li><a href="#" className="hover:underline w-full text-base">Products</a></li>
              <li><a href="#" className="hover:underline w-full text-base">Sustainability</a></li>
              <li><a href="#" className="hover:underline w-full text-base">Contact</a></li>
            </ul>
          </nav>
        )}
      </>
    );
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center items-center w-full mb-8">
        <div className="flex items-center w-full max-w-md">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                    currentStep === step
                      ? "bg-[#20b4ad] text-white shadow-lg shadow-teal-200"
                      : currentStep > step
                        ? "bg-[#20b4ad] text-white opacity-60"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {currentStep === step && (
                  <div className="absolute -bottom-6 w-max text-xs font-medium text-[#255a59]">
                    {step === 1 && "Data Petugas"}
                    {step === 2 && "Bahan Kimia"}
                    {step === 3 && "Detail Analisa"}
                    {step === 4 && "Konfirmasi"}
                  </div>
                )}
              </div>
              {step < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? "bg-[#20b4ad] opacity-60" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-medium text-[#255a59] mb-6">Data Petugas</h3>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <select
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b4ad] transition-all"
                required
              >
                <option value="">Pilih Nama</option>
                {NAMA_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal
              </label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b4ad] transition-all"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 bg-[#255a59] text-white rounded-none hover:opacity-90 transition-all"
              >
                Lanjut
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-medium text-[#255a59] mb-6">Bahan Kimia</h3>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Bahan Kimia
              </label>
              <select
                name="bahan"
                value={form.bahan}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b4ad] transition-all"
                required
              >
                <option value="">Pilih Bahan Kimia</option>
                {CHEMICAL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Matriks Analisa
              </label>
              <select
                name="matriks"
                value={form.matriks}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b4ad] transition-all"
                required
              >
                <option value="">Pilih Matriks</option>
                {MATRIKS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2.5 border border-gray-300 rounded-none hover:bg-gray-50 transition-all"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 bg-[#255a59] text-white rounded-none hover:opacity-90 transition-all"
              >
                Lanjut
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-medium text-[#255a59] mb-6">Detail Analisa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Satuan
                </label>
                <select
                  name="satuan"
                  value={form.satuan}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b4ad] transition-all"
                  required
                >
                  <option value="">Pilih Satuan</option>
                  {UNIT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="jumlah"
                  min="0.01"
                  step="0.01"
                  value={form.jumlah}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b4ad] transition-all"
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preparasi Analisa
              </label>
              <textarea
                name="preparasi"
                value={form.preparasi}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20b4ad] transition-all resize-none"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2.5 border border-gray-300 rounded-none hover:bg-gray-50 transition-all"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 bg-[#255a59] text-white rounded-none hover:opacity-90 transition-all"
              >
                Review
              </button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h3 className="text-xl font-medium text-[#255a59] mb-6">Konfirmasi Data</h3>
            <div className="bg-gray-50 p-5 rounded-none mb-5 border border-gray-200">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-500">Nama:</p>
                  <p className="text-sm">{form.nama || "Belum diisi"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Tanggal:</p>
                  <p className="text-sm">{form.tanggal || "Belum diisi"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Bahan Kimia:</p>
                  <p className="text-sm">{form.bahan || "Belum diisi"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Matriks Analisa:</p>
                  <p className="text-sm">{form.matriks || "Belum diisi"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Satuan:</p>
                  <p className="text-sm">{form.satuan || "Belum diisi"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Quantity:</p>
                  <p className="text-sm">{form.jumlah || "Belum diisi"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Preparasi Analisa:</p>
                <p className="text-sm">{form.preparasi || "Belum diisi"}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2.5 border border-gray-300 rounded-none hover:bg-gray-50 transition-all"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-[#255a59] text-white rounded-none hover:opacity-90 transition-all"
              >
                Simpan Data
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderLandingPage = () => {
    return (
      <div className="min-h-screen bg-cover bg-center pt-20 pb-10 px-4 flex flex-col items-center justify-center" style={{ backgroundImage: 'linear-gradient(rgba(248, 250, 252, 0.9), rgba(248, 250, 252, 0.9)), url("https://cdn.pixabay.com/photo/2018/03/29/11/29/world-3272463_960_720.png")' }}>
        {renderHeader()}

        <div className="w-full max-w-lg mx-auto bg-gray-100 rounded-none shadow-lg p-8 z-10 border border-gray-200 my-auto">
          <div className="flex flex-col items-center justify-center mb-6">
            <img src="/logo-wilmar-middle.png" alt="" className="h-16 md:h-20 lg:h-24 mb-2" style={{maxWidth:'95px'}} />
            <span
              className="font-bold text-[1.15rem] md:text-xl tracking-wide leading-tight text-[#222] mt-0"
              style={{letterSpacing: '2.5px', fontFamily: 'Arial, Helvetica, sans-serif'}}>
              LABORATORIUM
            </span>
            <span
              className="font-extrabold text-[1.6rem] md:text-[2.2rem] leading-none text-[#222]"
              style={{letterSpacing: '2.5px', fontFamily: 'Arial, Helvetica, sans-serif'}}>
              EMU R&D
            </span>
          </div>

          <h2 className="text-2xl font-bold text-center text-[#255a59] mb-8">
            Sistem Manajemen Data Bahan Kimia
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700 text-sm">{loginError}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#20b4ad]"
                required
              />
              <p className="text-xs text-gray-500 mt-1">(Gunakan: admin)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#20b4ad]"
                required
              />
              <p className="text-xs text-gray-500 mt-1">(Gunakan: admin123)</p>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-[#255a59] text-white rounded-none hover:opacity-90 transition-all"
            >
              Login
            </button>
          </form>

          <div className="mt-8">
            <div className="flex items-center my-3">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">Informasi</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="bg-white p-4 text-sm text-gray-700 rounded-none border border-gray-200">
              <p className="font-semibold mb-2">Sistem Manajemen Data Bahan Kimia PT Mustika Sembuluh 1</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Input dan monitor penggunaan bahan kimia</li>
                <li>Analisis dan laporan penggunaan</li>
                <li>Manajemen stok dan inventaris</li>
                <li>Dokumentasi dan pelaporan regulasi</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="w-full bg-white py-5 border-t border-gray-200 text-center fixed bottom-0 left-0 z-50">
          <p className="text-gray-500 text-sm">© 2025 PT Mustika Sembuluh 1 - Wilmar Group. Hak Cipta Dilindungi.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <a href="#" className="hover:text-[#255a59] text-xs">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-[#255a59] text-xs">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#255a59] text-xs">Bantuan</a>
          </div>
        </footer>
      </div>
    );
  };

  const renderFormPage = () => {
    return (
      <div className="min-h-screen bg-cover bg-center pt-20 pb-10 px-4 flex flex-col items-center justify-center" style={{ backgroundImage: 'linear-gradient(rgba(248, 250, 252, 0.9), rgba(248, 250, 252, 0.9)), url("https://cdn.pixabay.com/photo/2018/03/29/11/29/world-3272463_960_720.png")' }}>
        {renderHeader()}

        <div className="w-full max-w-lg mx-auto bg-white rounded-none shadow-lg p-8 z-10 border border-gray-100 my-auto">
          <h2 className="text-2xl font-bold text-center text-[#255a59] mb-4">
            Formulir Input Data Bahan Kimia
          </h2>

          {renderStepIndicator()}

          <form className="mt-6">
            {renderStepContent()}
          </form>
        </div>



        <footer className="w-full bg-white py-5 border-t border-gray-200 text-center fixed bottom-0 left-0 z-50">
          <p className="text-gray-500 text-sm">© 2025 PT Mustika Sembuluh 1 - Wilmar Group. Hak Cipta Dilindungi.</p>
          <div className="flex justify-center space-x-6 mt-2">
            <a href="#" className="hover:text-[#255a59] text-xs">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-[#255a59] text-xs">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#255a59] text-xs">Bantuan</a>
          </div>
        </footer>
      </div>
    );
  };

  return isLoggedIn ? renderFormPage() : renderLandingPage();
}

export default App;
