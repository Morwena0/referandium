'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { createClient } from '@supabase/supabase-js';
import { User, History, Wallet, ArrowRight, ArrowLeft, Zap, BarChart3, Coins } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const { publicKey, connected } = useWallet();
  const [votes, setVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      fetchUserVotes();
    } else {
      setVotes([]);
    }
  }, [connected, publicKey]);

  const fetchUserVotes = async () => {
    if (!publicKey) return;

    setLoading(true);
    
    // --- DEDEKTİF BAŞLANGICI ---
    const walletAddress = publicKey.toBase58();
    console.log("🕵️‍♂️ DEBUG BAŞLADI");
    console.log("🔑 Cüzdan Adresi (Frontend):", walletAddress);
    console.log("📡 Supabase'e soruluyor...");
    // ---------------------------

    try {
      // 1. Adım: Oyları çek
      const { data: votesData, error: votesError } = await supabase
        .from('votes')
        .select('*')
        .eq('user_wallet', walletAddress)
        .order('created_at', { ascending: false });

      if (votesError) {
        console.error("❌ Votes Hatası:", votesError.message);
        setVotes([]);
        return;
      }

      console.log("✅ Oylar:", votesData);
      console.log("📊 Oy Sayısı:", votesData?.length);

      if (!votesData || votesData.length === 0) {
        setVotes([]);
        return;
      }

      // 2. Adım: Benzersiz market_id'leri topla
      const marketIds = [...new Set(votesData.map((v: any) => v.market_id))];
      console.log("🆔 Market ID'ler:", marketIds);

      // 3. Adım: İlgili marketleri çek
      const { data: marketsData, error: marketsError } = await supabase
        .from('markets')
        .select('*')
        .in('id', marketIds);

      if (marketsError) {
        console.error("❌ Markets Hatası:", marketsError.message);
      }

      console.log("✅ Marketler:", marketsData);

      // 4. Adım: JS tarafında birleştir (Manual Join)
      const merged = votesData.map((vote: any) => ({
        ...vote,
        markets: marketsData?.find((m: any) => m.id === vote.market_id) || null,
      }));

      console.log("🔗 Birleştirilmiş Veri:", merged);
      setVotes(merged);

    } catch (error) {
      console.error('💥 Beklenmedik Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = votes.reduce((acc, vote) => acc + (vote.amount_sol || 0), 0);
  const totalVotes = votes.length;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* SOL: Başlık */}
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
            <div className="p-1.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg text-white">
              <User size={18} />
            </div>
            My Profile
          </h1>

          {/* ORTA: Nav Butonları */}
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-lg transition">
              <ArrowLeft size={15} /> Home
            </Link>
            <Link href="/markets" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-lg transition">
              <Zap size={15} /> Markets
            </Link>
          </div>

          {/* SAĞ: Cüzdan Adresi */}
          <div className="flex items-center gap-3">
            {connected && publicKey && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 text-xs font-mono font-medium rounded-lg">
                {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
              </span>
            )}
            <WalletMultiButton className="!bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700 hover:!to-indigo-700 !rounded-xl !text-sm !h-9 !px-4" />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {!connected ? (
          <div className="bg-white p-16 rounded-3xl shadow-lg text-center border border-gray-100 mt-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Wallet className="text-blue-600" size={44} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Wallet Not Connected</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
              Connect your wallet to view your voting history and profile statistics.
            </p>
            <WalletMultiButton className="!bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700 hover:!to-indigo-700 !rounded-xl !text-base !h-12 !px-8" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-md shadow-purple-100/50 border border-gray-100 flex items-center gap-5 hover:shadow-lg hover:shadow-purple-100/60 transition-shadow duration-300">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl">
                  <BarChart3 size={28} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Votes</p>
                  <p className="text-3xl font-extrabold text-gray-900">{totalVotes}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md shadow-emerald-100/50 border border-gray-100 flex items-center gap-5 hover:shadow-lg hover:shadow-emerald-100/60 transition-shadow duration-300">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl">
                  <Coins size={28} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Volume</p>
                  <p className="text-3xl font-extrabold text-gray-900">{totalSpent.toFixed(4)} <span className="text-lg font-bold text-gray-400">SOL</span></p>
                </div>
              </div>
            </div>

            {/* Voting History */}
            <div className="flex items-center gap-3 mb-5">
              <History size={20} className="text-gray-400" />
              <h2 className="text-lg font-bold text-gray-800">Voting History</h2>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                <span className="ml-3 text-gray-500">Loading your votes...</span>
              </div>
            ) : votes.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="text-gray-400" size={28} />
                </div>
                <p className="text-gray-500 mb-2 text-lg">No votes found yet.</p>
                <p className="text-sm text-gray-400 mb-6">Start voting on markets to see your history here.</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition text-sm">
                  Explore Markets <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {votes.map((vote) => (
                  <Link 
                    href={vote.markets ? `/market/${vote.markets.id}` : '#'} 
                    key={vote.id}
                    className="block group"
                  >
                    <div className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-gray-100 flex items-center gap-4">
                      
                      <img 
                        src={vote.markets?.image_url || 'https://placehold.co/100'} 
                        alt="market" 
                        className="w-14 h-14 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition truncate">
                          {vote.markets?.question || 'Deleted Market'}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(vote.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wide ${
                          vote.vote_direction === 'yes' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {vote.vote_direction === 'yes' ? 'YES' : 'NO'}
                        </span>
                        <span className="text-sm font-semibold text-gray-700 tabular-nums">
                          {vote.amount_sol} SOL
                        </span>
                        <ArrowRight size={18} className="text-gray-300 group-hover:text-blue-500 transition" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}