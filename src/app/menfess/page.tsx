'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Heart,
  Sparkles,
  MessageCircleHeart,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Settings2,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import { useClassData } from '@/context/ClassDataContext';
import { MenfessMessage } from '@/types';
import { PastelCloud, PastelStar, PastelClover } from '@/components/common/DecorativeElements';

export default function MenfessPage() {
  const { state, likeMenfess, addMenfess } = useClassData();
  const [activeTab, setActiveTab] = useState<'ngl' | 'mading'>('ngl');

  // NGL State
  const [nglUsername, setNglUsername] = useState('xdkv_11');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsernameInput, setNewUsernameInput] = useState('xdkv_11');
  const [nglMessage, setNglMessage] = useState('');
  const [nglReceiver, setNglReceiver] = useState('');
  const [nglSender, setNglSender] = useState('');
  const [nglLoading, setNglLoading] = useState(false);
  const [nglSuccess, setNglSuccess] = useState(false);
  const [nglError, setNglError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mading Wall Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Load NGL username from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('class_ngl_username');
    if (saved && saved !== 'xdkv1') {
      setNglUsername(saved);
      setNewUsernameInput(saved);
    } else {
      setNglUsername('xdkv_11');
      setNewUsernameInput('xdkv_11');
      localStorage.setItem('class_ngl_username', 'xdkv_11');
    }
  }, []);

  const handleSaveUsername = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newUsernameInput
      .replace(/^https?:\/\/(www\.)?ngl\.link\//, '')
      .replace(/[^a-zA-Z0-9._-]/g, '')
      .trim();
    if (clean) {
      setNglUsername(clean);
      localStorage.setItem('class_ngl_username', clean);
      setIsEditingUsername(false);
    }
  };

  const handleSendNgl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nglMessage.trim()) return;

    setNglLoading(true);
    setNglError(null);
    setNglSuccess(false);

    // Format message with recipient & optional sender
    let formattedText = nglMessage.trim();
    if (nglReceiver.trim()) {
      formattedText = `[Untuk: ${nglReceiver.trim()}]\n${formattedText}`;
    }
    if (nglSender.trim()) {
      formattedText = `${formattedText}\n— Dari: ${nglSender.trim()}`;
    }

    try {
      const res = await fetch('/api/ngl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: nglUsername,
          message: formattedText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim ke NGL');
      }

      setNglSuccess(true);
      setNglMessage('');
      setNglReceiver('');
      setNglSender('');

      // Also optionally post to internal mading so friends can read it
      addMenfess({
        sender: nglSender.trim() || 'Anonim (via NGL)',
        receiver: nglReceiver.trim() || 'Warga Kelas',
        message: nglMessage.trim(),
        colorTheme: 'pastel-blue',
        sticker: '💌',
      });
    } catch (err: any) {
      setNglError(err.message || 'Gagal mengirim pesan ke NGL. Pastikan username benar.');
    } finally {
      setNglLoading(false);
    }
  };

  const handleCopyNglLink = () => {
    const link = `https://ngl.link/${nglUsername}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredMadingMessages = state.menfess.filter(
    (m) =>
      m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#DCEEFB] p-6 sm:p-8 shadow-md shadow-[#8BB4E7]/15">
        <PastelCloud className="absolute -top-10 -right-10 w-52 opacity-30 pointer-events-none" />
        <PastelStar className="absolute top-6 left-1/3 w-5 h-5 text-[#8BB4E7] animate-pulse pointer-events-none" />
        <PastelClover className="absolute bottom-4 right-1/4 w-6 h-6 animate-bounce pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DEF0FC] border border-[#BEE0F9] text-xs font-bold text-[#263B50]">
              <MessageCircleHeart className="w-3.5 h-3.5 text-[#5A9FE8]" />
              <span>Sistem Menfess Resmi • Integrasi NGL & Mading</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#263B50] tracking-tight">
              Kotak Menfess Anonim X DKV 1
            </h1>
            <p className="text-xs sm:text-sm text-[#647E99] max-w-2xl leading-relaxed">
              Kirim pesan rahasia, salam hangat, curhatan tugas, atau apresiasi manis langsung ke akun <strong>NGL Resmi Kelas</strong> atau tempel di mading digital!
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#DEF0FC] border border-[#BEE0F9] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('ngl')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'ngl'
                  ? 'bg-[#8BB4E7] text-white shadow-xs'
                  : 'text-[#263B50] hover:text-[#5A9FE8]'
              }`}
            >
              💌 Kirim via NGL
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mading')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'mading'
                  ? 'bg-[#8BB4E7] text-white shadow-xs'
                  : 'text-[#263B50] hover:text-[#5A9FE8]'
              }`}
            >
              📌 Mading Kelas ({state.menfess.length})
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content based on Tab */}
      {activeTab === 'ngl' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form: NGL Submission Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCEEFB] p-6 sm:p-8 shadow-md shadow-[#8BB4E7]/15 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCEEFB]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-400 text-white flex items-center justify-center font-black text-sm shadow-xs">
                  ngl
                </div>
                <div>
                  <h3 className="font-black text-base text-[#263B50]">
                    Kirim Pesan ke NGL Kelas
                  </h3>
                  <p className="text-xs text-[#647E99]">
                    Tujuan: <span className="font-bold text-[#5A9FE8]">ngl.link/{nglUsername}</span>
                  </p>
                </div>
              </div>

              {/* Username Settings Toggle */}
              <button
                type="button"
                onClick={() => setIsEditingUsername(!isEditingUsername)}
                className="p-2 rounded-xl text-[#647E99] hover:bg-[#DEF0FC] hover:text-[#263B50] transition-colors flex items-center gap-1 text-xs font-bold"
                title="Ganti username NGL kelas"
              >
                <Settings2 className="w-4 h-4" />
                <span className="hidden sm:inline">Ubah Username</span>
              </button>
            </div>

            {/* Editable Username Bar */}
            {isEditingUsername && (
              <form
                onSubmit={handleSaveUsername}
                className="p-3.5 rounded-2xl bg-[#DEF0FC] border border-[#BEE0F9] flex flex-col sm:flex-row items-center gap-2 animate-in fade-in duration-150"
              >
                <span className="text-xs font-bold text-[#263B50] shrink-0">
                  ngl.link/
                </span>
                <input
                  type="text"
                  value={newUsernameInput}
                  onChange={(e) => setNewUsernameInput(e.target.value)}
                  placeholder="masukkan username NGL kelas..."
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#BEE0F9] text-xs font-bold text-[#263B50] outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-1.5 rounded-xl bg-[#8BB4E7] text-white text-xs font-bold hover:bg-[#7BAEDB] transition-colors shrink-0"
                >
                  Simpan
                </button>
              </form>
            )}

            {/* Success Alert */}
            {nglSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black block text-sm">Pesan Berhasil Terkirim! 🎉</span>
                  <span>Pesan anonimmu sudah masuk ke inbox aplikasi NGL pengurus kelas X DKV 1 dan juga tertempel di mading kelas.</span>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {nglError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black block">Gagal Mengirim Pesan</span>
                  <span>{nglError}</span>
                </div>
              </div>
            )}

            {/* NGL Submission Form */}
            <form onSubmit={handleSendNgl} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-black text-[#263B50] mb-1">
                    Kepada Siapa? (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Cth: Kesya, Ketua Kelas, atau Semuanya..."
                    value={nglReceiver}
                    onChange={(e) => setNglReceiver(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FBFF] border border-[#DCEEFB] text-xs font-medium text-[#263B50] focus:outline-none focus:border-[#8BB4E7] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-[#263B50] mb-1">
                    Dari Siapa? (Boleh Kosong / Samaran)
                  </label>
                  <input
                    type="text"
                    placeholder="Cth: Secret Admirer, Teman Sebangku..."
                    value={nglSender}
                    onChange={(e) => setNglSender(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7FBFF] border border-[#DCEEFB] text-xs font-medium text-[#263B50] focus:outline-none focus:border-[#8BB4E7] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-[#263B50] mb-1">
                  Isi Pesan Anonim NGL *
                </label>
                <textarea
                  rows={4}
                  placeholder="Tulis pesan rahasia, apresiasi, salam manis, atau curhatmu di sini..."
                  value={nglMessage}
                  onChange={(e) => setNglMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F7FBFF] border border-[#DCEEFB] text-xs font-medium text-[#263B50] focus:outline-none focus:border-[#8BB4E7] focus:bg-white transition-all leading-relaxed resize-none"
                  required
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-[#647E99]">
                  🔒 Identitasmu tetap 100% anonim dan aman.
                </span>

                <button
                  type="submit"
                  disabled={nglLoading || !nglMessage.trim()}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 text-white text-xs font-black shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-2"
                >
                  {nglLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Mengirim ke NGL...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Sekarang ke NGL</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Info: Live NGL Card & Direct Links */}
          <div className="lg:col-span-5 space-y-4">
            {/* Visual Phone Mockup Card */}
            <div className="rounded-3xl bg-gradient-to-tr from-[#FF5E62] to-[#FF9966] p-6 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase bg-black/20 px-3 py-1 rounded-full">
                  NGL Live Link
                </span>
                <span className="text-xl select-none">💌</span>
              </div>

              <div>
                <span className="text-xs text-white/80 block">Akun Resmi NGL:</span>
                <h4 className="text-xl font-black text-white tracking-wide">
                  @{nglUsername}
                </h4>
              </div>

              <p className="text-xs text-white/90 leading-relaxed">
                Pesan yang kamu kirim akan langsung diterima oleh admin pengurus kelas X DKV 1 di aplikasi NGL ponsel mereka untuk dibalas atau di-share ke Instagram Story!
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://ngl.link/${nglUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-2xl bg-white text-rose-600 text-center text-xs font-black shadow-md hover:bg-yellow-100 transition-all flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Halaman Web NGL Resmi</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyNglLink}
                  className="w-full py-2 rounded-2xl bg-black/20 hover:bg-black/30 text-white text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-white/20"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Tersalin!' : `Salin ngl.link/${nglUsername}`}</span>
                </button>
              </div>
            </div>

            {/* Helpful instructions card */}
            <div className="p-5 rounded-3xl bg-white border border-[#DCEEFB] shadow-sm space-y-2 text-xs text-[#647E99]">
              <span className="font-black text-[#263B50] block text-sm">
                💡 Cara Pengurus Kelas Mengecek Pesan NGL:
              </span>
              <ol className="list-decimal list-inside space-y-1 leading-relaxed">
                <li>Buka aplikasi <strong>NGL</strong> di HP kamu.</li>
                <li>Masuk ke akun <strong>@{nglUsername}</strong>.</li>
                <li>Pesan yang dikirim teman-teman dari website ini akan langsung muncul di tab <strong>Inbox</strong>!</li>
              </ol>
            </div>
          </div>
        </div>
      ) : (
        /* 3. Mading Digital View */
        <div className="space-y-5">
          {/* Search bar */}
          <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#DCEEFB] shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647E99]" />
              <input
                type="text"
                placeholder="Cari pesan untuk siapa atau kata kunci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-[#DEF0FC]/40 border border-[#DCEEFB] text-[#263B50] placeholder-[#647E99] focus:outline-none focus:border-[#8BB4E7]"
              />
            </div>
            <span className="text-xs font-bold text-[#647E99]">
              {filteredMadingMessages.length} Pesan Tertempel
            </span>
          </div>

          {filteredMadingMessages.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#DCEEFB] p-12 text-center shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DEF0FC] flex items-center justify-center text-[#5A9FE8] mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-[#263B50]">Belum Ada Pesan Menfess</h3>
              <p className="text-xs text-[#647E99] max-w-sm mx-auto leading-relaxed">
                Kirim pesan pertamamu lewat tab NGL di atas, dan pesanmu juga akan langsung tertempel di sini!
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('ngl')}
                className="px-5 py-2 rounded-full bg-[#8BB4E7] text-white text-xs font-bold hover:bg-[#7BAEDB]"
              >
                Kirim Pesan Sekarang
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredMadingMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 rounded-3xl border border-[#DCEEFB] bg-white hover:border-[#8BB4E7] hover:shadow-lg transition-all duration-200 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl select-none">{msg.sticker}</span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#647E99] block">
                            Untuk:
                          </span>
                          <span className="text-xs font-black text-[#263B50]">
                            {msg.receiver}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-[#647E99]">
                        {msg.date}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold leading-relaxed text-[#263B50] whitespace-pre-line bg-[#DEF0FC]/30 p-3 rounded-2xl border border-[#DCEEFB]/60">
                      &ldquo;{msg.message}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#DCEEFB] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-[#647E99] italic truncate max-w-[160px]">
                      Dari: {msg.sender}
                    </span>

                    <button
                      type="button"
                      onClick={() => likeMenfess(msg.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DEF0FC] hover:bg-[#BEE0F9] text-rose-500 font-bold text-xs transition-transform active:scale-95"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{msg.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
