'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editRole, setEditRole] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.users) {
          setUsers(data.users);
        } else {
          setError('Kullanıcılar getirilemedi');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Bağlantı hatası');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPassword('');
    setEditRole(user.role);
    setError('');
    setSuccess('');
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditName('');
    setEditEmail('');
    setEditPassword('');
    setEditRole('');
  };

  const handleUpdate = async () => {
    if (!editingUser) return;

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingUser.id,
          name: editName,
          email: editEmail,
          password: editPassword || undefined,
          role: editRole,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Kullanıcı başarıyla güncellendi!');
        closeEditModal();
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Güncelleme başarısız');
      }
    } catch {
      setError('Bağlantı hatası');
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" kullanıcısını silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Kullanıcı silindi!');
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Silme başarısız');
      }
    } catch {
      setError('Bağlantı hatası');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-amber-500 hover:text-amber-600 mb-6 inline-block">
          ← Ana Sayfa
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">👨‍💼 Admin Panel</h1>

        {error && <div className="bg-red-600 text-white p-4 rounded-lg mb-6">{error}</div>}
        {success && <div className="bg-green-600 text-white p-4 rounded-lg mb-6">{success}</div>}

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-gray-400 mb-2">Toplam Kullanıcı</p>
            <p className="text-4xl font-bold text-amber-500">{users.length}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-gray-400 mb-2">Admin</p>
            <p className="text-4xl font-bold text-green-500">{users.filter((u) => u.role === 'admin').length}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-gray-400 mb-2">Alıcı</p>
            <p className="text-4xl font-bold text-blue-500">{users.filter((u) => u.role === 'buyer').length}</p>
          </div>
        </div>

        {/* Arama */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="İsim veya email ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Kullanıcı Listesi */}
        <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Kayıtlı Kullanıcılar ({filteredUsers.length})</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-400">Yükleniyor...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-gray-400">Kullanıcı bulunamadı</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-300">ID</th>
                    <th className="px-6 py-4 text-left text-gray-300">Ad Soyad</th>
                    <th className="px-6 py-4 text-left text-gray-300">Email</th>
                    <th className="px-6 py-4 text-left text-gray-300">Rol</th>
                    <th className="px-6 py-4 text-left text-gray-300">Kayıt Tarihi</th>
                    <th className="px-6 py-4 text-center text-gray-300">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="px-6 py-4 text-gray-400">#{user.id}</td>
                      <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-300">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.role === 'admin' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'Alıcı'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => openEditModal(user)}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm transition"
                          >
                            ✏️ Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
                          >
                            🗑️ Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Düzenleme Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Kullanıcı Düzenle</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Yeni Şifre (boş bırakılırsa değişmez)</label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Rol</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                >
                  <option value="buyer">Alıcı</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Kaydet
              </button>
              <button
                onClick={closeEditModal}
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}