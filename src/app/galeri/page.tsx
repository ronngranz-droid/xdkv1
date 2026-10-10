'use client';

import React, { useState, useRef } from 'react';
import {
  Camera,
  Heart,
  Plus,
  Sparkles,
  MapPin,
  Calendar,
  X,
  Upload,
  Image as ImageIcon,
  Check,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { PolaroidMemory } from '@/types';
import { PastelCloud, PastelStar } from '@/components/common/DecorativeElements';

export default function GaleriPage() {
  const { state, likeMemory, addMemory } = useClassData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidMemory | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Photo Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [selectedImageBase64, setSelectedImageBase64] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState<'Seru' | 'Praktikum' | 'Trip' | 'Candid'>('Seru');
  const [newTags, setNewTags] = useState('MomenSeru, XDKV1');
  const [isCompressing, setIsCompressing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['all', 'Seru', 'Praktikum', 'Trip', 'Candid'];

  const filteredMemories = state.memories.filter(
    (m) => activeCategory === 'all' || m.category === activeCategory
  );

  // Compress and convert selected file to optimized web image DataURL
  const processImageFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsCompressing(true);
    setImageFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Resize canvas to max 1280px to save localStorage space & load fast
        const MAX_WIDTH = 1280;
        const MAX_HEIGHT = 1280;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setSelectedImageBase64(compressedDataUrl);
        } else {
          setSelectedImageBase64(e.target?.result as string);
        }
        setIsCompressing(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !selectedImageBase64) return;

    addMemory({
      title: newTitle.trim(),
      caption: newCaption.trim() || 'Momen seru kelas X DKV 1!',
      imageUrl: selectedImageBase64,
      date: 'Hari ini',
      tags: newTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      category: newCategory,
      location: newLocation.trim() || 'Ruang X DKV 1',
    });

    // Reset Form
    setNewTitle('');
    setNewCaption('');
    setSelectedImageBase64('');
    setImageFileName('');
    setNewLocation('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#DCEEFB] p-6 sm:p-8 shadow-md shadow-[#8BB4E7]/15">
        <PastelCloud className="absolute -top-10 -right-10 w-52 opacity-30 pointer-events-none" />
        <PastelStar className="absolute top-6 left-1/3 w-5 h-5 text-[#8BB4E7] opacity-60 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DEF0FC] border border-[#BEE0F9] text-xs font-bold text-[#263B50]">
              <Camera className="w-3.5 h-3.5 text-[#5A9FE8]" />
              <span>Mading & Polaroid Wall • Kenangan Abadi {state.classInfo.name}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#263B50] tracking-tight">
              Galeri Momen Seru & Candid Kelas
            </h1>
            <p className="text-xs sm:text-sm text-[#647E99] max-w-2xl leading-relaxed">
              Mulai dari drama praktikum studio DKV, kostum kreasi, foto koridor, hingga kebersamaan di ruang kelas. Semua kenangan manis tersimpan abadi di sini!
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8BB4E7] text-white text-xs font-black hover:bg-[#7BAEDB] shadow-md shadow-[#8BB4E7]/25 self-start md:self-auto hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Pilih & Upload Foto Baru</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#8BB4E7] text-white shadow-xs scale-105'
                : 'bg-white border border-[#DCEEFB] text-[#647E99] hover:bg-[#DEF0FC]'
            }`}
          >
            {cat === 'all' ? 'Semua Momen' : `# ${cat}`}
          </button>
        ))}
      </div>

      {/* Polaroid Wall Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredMemories.map((mem, idx) => {
          const rotations = ['rotate-1', '-rotate-1', 'rotate-0', 'rotate-2', '-rotate-2'];
          const rotationClass = rotations[idx % rotations.length];

          return (
            <div
              key={mem.id}
              className={`group bg-white p-4 pb-5 rounded-3xl border border-[#DCEEFB] shadow-md shadow-[#8BB4E7]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 ${rotationClass} relative`}
            >
              {/* Cute Washi Tape Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#DEF0FC]/90 backdrop-blur-xs border border-[#BEE0F9] rounded-xs shadow-xs rotate-1 pointer-events-none z-10" />

              {/* Photo Frame */}
              <div
                onClick={() => setSelectedPhoto(mem)}
                className="cursor-pointer overflow-hidden rounded-2xl bg-slate-100 aspect-4/3 mb-3 relative group-hover:brightness-95 transition-all"
              >
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                  {mem.category}
                </span>
              </div>

              {/* Caption & Details */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    onClick={() => setSelectedPhoto(mem)}
                    className="cursor-pointer font-black text-sm text-[#263B50] group-hover:text-[#5A9FE8] transition-colors line-clamp-1"
                  >
                    {mem.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => likeMemory(mem.id)}
                    className="flex items-center gap-1 text-xs text-rose-500 font-bold hover:scale-110 active:scale-90 transition-transform shrink-0"
                    title="Beri Suka"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>{mem.likes}</span>
                  </button>
                </div>

                <p className="text-xs text-[#647E99] line-clamp-2 leading-relaxed">
                  {mem.caption}
                </p>

                {/* Footer Info */}
                <div className="pt-2 border-t border-[#DCEEFB] flex items-center justify-between text-[11px] text-[#647E99]">
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3 h-3 text-[#5A9FE8]" />
                    {mem.date}
                  </span>
                  {mem.location && (
                    <span className="flex items-center gap-1 truncate max-w-[140px] font-medium">
                      <MapPin className="w-3 h-3 text-[#8BB4E7]" />
                      {mem.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL MODAL PHOTO */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl border border-[#DCEEFB] max-w-lg w-full overflow-hidden shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-4/3 w-full bg-slate-900">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 pt-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#DEF0FC] text-[#263B50]">
                  {selectedPhoto.category}
                </span>
                <button
                  type="button"
                  onClick={() => likeMemory(selectedPhoto.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200 hover:scale-105 transition-transform"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>{selectedPhoto.likes} Suka</span>
                </button>
              </div>

              <h2 className="text-lg font-black text-[#263B50]">{selectedPhoto.title}</h2>
              <p className="text-xs sm:text-sm text-[#647E99] leading-relaxed">
                {selectedPhoto.caption}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedPhoto.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#DEF0FC] text-[#263B50]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-[#DCEEFB] flex items-center justify-between text-xs text-[#647E99]">
                <span>{selectedPhoto.date}</span>
                <span>{selectedPhoto.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UPLOAD FOTO BARU (FILE PICKER DARI PERANGKAT) */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-[#DCEEFB] max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#DCEEFB]">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#5A9FE8]" />
                <h3 className="font-black text-base text-[#263B50]">
                  Pilih & Upload Foto Momen Kelas
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-[#647E99] hover:bg-[#DEF0FC] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
              {/* FILE PICKER / DROPZONE */}
              <div>
                <label className="block font-black text-[#263B50] mb-1.5">
                  Foto Momen (Pilih dari HP / Laptop) *
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {!selectedImageBase64 ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-[#8BB4E7] hover:border-[#5A9FE8] bg-[#F7FBFF] hover:bg-[#DEF0FC]/50 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#DEF0FC] group-hover:bg-[#8BB4E7] text-[#5A9FE8] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      {isCompressing ? (
                        <RefreshCw className="w-6 h-6 animate-spin" />
                      ) : (
                        <Upload className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <span className="font-black text-sm text-[#263B50] block">
                        Klik untuk Memilih Foto
                      </span>
                      <span className="text-[11px] text-[#647E99] block mt-0.5">
                        Bisa langsung ambil dari Galeri HP atau File Laptop (JPG, PNG, WEBP)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-[#DCEEFB] bg-slate-900 group">
                    <img
                      src={selectedImageBase64}
                      alt="Preview Foto"
                      className="w-full h-48 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-full bg-white text-[#263B50] text-xs font-black shadow-md hover:scale-105 transition-all flex items-center gap-1"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Ganti Foto</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImageBase64('');
                          setImageFileName('');
                        }}
                        className="px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-black shadow-md hover:scale-105 transition-all flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="truncate max-w-[200px]">{imageFileName || 'Foto Siap Diupload'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Judul Momen */}
              <div>
                <label className="block font-black text-[#263B50] mb-1">
                  Judul Momen *
                </label>
                <input
                  type="text"
                  placeholder="Cth: Habis Penilaian Studio DKV, Foto Koridor..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FBFF] border border-[#DCEEFB] text-xs font-medium text-[#263B50] focus:outline-none focus:border-[#8BB4E7] focus:bg-white transition-all"
                  required
                />
              </div>

              {/* Kategori & Lokasi */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-[#263B50] mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-2xl bg-[#F7FBFF] border border-[#DCEEFB] text-xs font-bold text-[#263B50] focus:outline-none focus:border-[#8BB4E7]"
                  >
                    <option value="Seru">Seru</option>
                    <option value="Praktikum">Praktikum</option>
                    <option value="Trip">Trip</option>
                    <option value="Candid">Candid</option>
                  </select>
                </div>
                <div>
                  <label className="block font-black text-[#263B50] mb-1">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Ruang DKV, Koridor, Lab..."
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-2xl bg-[#F7FBFF] border border-[#DCEEFB] text-xs font-medium text-[#263B50] focus:outline-none focus:border-[#8BB4E7]"
                  />
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block font-black text-[#263B50] mb-1">Cerita / Caption</label>
                <textarea
                  rows={2}
                  placeholder="Tuliskan cerita seru atau kenangan dari foto ini..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-2xl bg-[#F7FBFF] border border-[#DCEEFB] text-xs font-medium text-[#263B50] focus:outline-none focus:border-[#8BB4E7] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-2 border-t border-[#DCEEFB]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full font-bold text-[#647E99] hover:bg-[#DEF0FC] transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!selectedImageBase64 || !newTitle.trim()}
                  className="px-5 py-2.5 rounded-full bg-[#8BB4E7] text-white font-black hover:bg-[#7BAEDB] shadow-md shadow-[#8BB4E7]/25 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Tempel ke Mading Polaroid</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
