// src/pages/Service.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../../libs/suppabase';
import { X, CheckCircle } from 'lucide-react';
import React from "react";

const Service = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    no_hp: '',
    alamat: '',
    quantity: 1
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('layanan')
          .select('*')
          .order('created_at', { ascending: true });
        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setErrorMessage('Gagal memuat daftar layanan');
      }
    };
    fetchServices();
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowOrderForm(true);
    setFormData({
      nama: '',
      email: '',
      no_hp: '',
      alamat: '',
      quantity: 1
    });
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    return selectedService.harga * formData.quantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      if (!formData.nama || !formData.no_hp || !formData.alamat) {
        throw new Error('Harap isi semua field yang wajib diisi');
      }

      if (formData.quantity <= 0) {
        throw new Error('Jumlah/berat harus lebih dari 0');
      }

      const orderData = {
        nama: formData.nama,
        email: formData.email,
        no_hp: formData.no_hp,
        alamat: formData.alamat,
        layanan_id: selectedService.id,
        total_harga: calculateTotal(),
        status: 'Diproses',
        tanggal: new Date().toISOString()
      };
      orderData.berat = parseFloat(formData.quantity);

      const { error } = await supabase
        .from('pesanan')
        .insert(orderData);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      setSuccess(true);
      setTimeout(() => {
        setShowOrderForm(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Error creating order:', err);
      setErrorMessage(err.message || 'Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-light" id="services">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-3 shadow rounded-pill px-4 py-2 fs-6">
            Layanan Terlengkap
          </span>
          <h2 className="display-5 fw-bold mb-3 text-primary">
            Layanan Laundry Kami
          </h2>
          <p className="lead text-muted col-lg-8 mx-auto">
            Kami menyediakan berbagai layanan laundry berkualitas tinggi dengan teknologi modern
            dan pelayanan terbaik untuk memenuhi semua kebutuhan Anda.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {services.map((service) => (
            <div key={service.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow">
                <div className={`bg-${service.warna || 'primary'}`} style={{ height: '10px' }}></div>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className={`bg-${service.warna || 'primary'}-100 rounded-circle p-3 me-3 shadow`}>
                      <i className={`bx ${service.icon || 'bx-badge-check'} fs-3 text-${service.warna || 'primary'}`}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{service.nama}</h5>
                      <small className="badge bg-secondary bg-opacity-10 text-secondary">
                        {service.durasi || '1-2 hari'}
                      </small>
                    </div>
                  </div>

                  <p className="text-muted mb-3">{service.deskripsi}</p>

                  <ul className="list-unstyled mb-3">
                    {service.fitur?.split(',').map((fitur, idx) => (
                      <li key={idx} className="small text-muted mb-1">
                        <i className="bx bx-check text-success me-2"></i>
                        {fitur.trim()}
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`h6 fw-bold text-${service.warna || 'primary'} mb-0`}>
                      Rp {service.harga?.toLocaleString('id-ID')} / {service.satuan}
                    </span>
                    <button
                      className={`btn btn-outline-${service.warna || 'primary'} btn-sm shadow`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      <i className="bx bx-check-circle me-1"></i>
                      Pilih Layanan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Form Modal */}
        {showOrderForm && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 px-10">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 scrollbar-thin">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Pesan Layanan</h3>
                <button onClick={() => setShowOrderForm(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {errorMessage}
                </div>
              )}

              {success ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Pesanan Berhasil!</h4>
                  <p className="text-gray-600">Terima kasih telah memesan layanan kami.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Layanan</label>
                    <div className="p-3 bg-gray-100 rounded">
                      <p className="font-medium">{selectedService.nama}</p>
                      <p className="text-sm text-gray-600">
                        Rp {selectedService.harga?.toLocaleString('id-ID')} / {selectedService.satuan}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nama Lengkap*</label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">No. HP*</label>
                    <input
                      type="tel"
                      name="no_hp"
                      value={formData.no_hp}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Alamat*</label>
                    <textarea
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      rows="2"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      {selectedService.satuan === 'kg' ? 'Berat (kg)*' : 'Jumlah (kg)*'}
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      step={selectedService.satuan === 'kg' ? "0.1" : "1"}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="mb-4 p-3 bg-gray-100 rounded">
                    <div className="flex justify-between font-semibold">
                      <span>Total Harga:</span>
                      <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                      disabled={loading}
                    >
                      {loading ? 'Memproses...' : 'Pesan Sekarang'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Service;
