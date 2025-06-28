import React, { useEffect, useState } from 'react';
import { supabase } from '../../libs/suppabase';

const DataLayanan = () => {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentLayanan, setCurrentLayanan] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    harga: ''
  });

  // Fetch data layanan
  useEffect(() => {
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('layanan')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLayanan(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submit (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentLayanan) {
        // Update existing layanan
        const { error } = await supabase
          .from('layanan')
          .update(formData)
          .eq('id', currentLayanan.id);
        
        if (error) throw error;
      } else {
        // Create new layanan
        const { error } = await supabase
          .from('layanan')
          .insert([formData]);
        
        if (error) throw error;
      }
      
      fetchLayanan();
      setShowModal(false);
      setFormData({ nama: '', deskripsi: '', harga: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle edit
  const handleEdit = (layanan) => {
    setCurrentLayanan(layanan);
    setFormData({
      nama: layanan.nama,
      deskripsi: layanan.deskripsi || '',
      harga: layanan.harga || ''
    });
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
      try {
        const { error } = await supabase
          .from('layanan')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        setLayanan(layanan.filter(item => item.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Reset form when modal is closed
  const handleModalClose = () => {
    setShowModal(false);
    setCurrentLayanan(null);
    setFormData({ nama: '', deskripsi: '', harga: '' });
  };

  if (loading) return <div className="p-6">Memuat data layanan...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Data Layanan</h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Tambah Layanan
        </button>
      </div>
      
      {/* Tabel Layanan */}
      <div className="overflow-auto rounded-xl bg-white shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left text-sm text-gray-700">
            <tr>
              <th className="p-4">No</th>
              <th className="p-4">Nama Layanan</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Tanggal Dibuat</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {layanan.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-medium">{item.nama}</td>
                <td className="p-4">{item.deskripsi || '-'}</td>
                <td className="p-4">Rp {item.harga?.toLocaleString('id-ID') || '0'}</td>
                <td className="p-4">
                  {new Date(item.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="p-4 space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {currentLayanan ? 'Edit Layanan' : 'Tambah Layanan'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nama Layanan</label>
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
                <label className="block text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Harga (Rp)</label>
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <button 
                  type="button"
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                  onClick={handleModalClose}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {currentLayanan ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataLayanan;