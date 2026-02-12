export const revalidate = 0; // Sayfayı asla önbelleğe alma, her girişte taze veri çek.
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowRight, Wallet, BarChart2, TrendingUp, ShieldCheck, Zap, Users } from 'lucide-react';
import MarketCard from './components/MarketCard';
import Footer from './components/Footer';

// Supabase Bağlantısı
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Piyasaları Çeken Fonksiyon
async function getMarkets() {
  const { data, error } = await supabase
    .from('markets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3); // Sadece son 6 piyasayı getir

  if (error) {
    console.error('Error loading markets:', error);
    return [];
  }
  return data || [];
}

export default async function Home() {
  const markets = await getMarkets();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">Referandium</span>
            </div>

            {/* Menü Linkleri */}
            <div className="hidden md:flex space-x-8">
              <Link href="/markets" className="text-gray-500 hover:text-blue-600 font-medium transition">Markets</Link>
              <Link href="/admin" className="text-gray-500 hover:text-blue-600 font-medium transition">Admin</Link>
            </div>

            {/* Profil Butonu */}
            <div>
              <Link 
                href="/profile" 
                className="bg-gray-900 text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition flex items-center gap-2 text-sm shadow-lg shadow-gray-200"
              >
                <Users size={16} />
                My Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="relative overflow-hidden bg-white">
        {/* Arka Plan Efektleri */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-white -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* SOL SÜTUN: Video */}
            <div className="order-2 lg:order-1">
              <div className="max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-200/50 hover:shadow-blue-300/60 transition-shadow duration-500">
                <video
                  autoPlay
                  loop
                  controls
                  playsInline
                  className="w-full h-auto block"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* SAĞ SÜTUN: İçerik */}
            <div className="order-1 lg:order-2 text-left">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                Live on Solana Devnet
              </span>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                Prescribe Sound Policies <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  and Shape the Future 🚀
                </span>
              </h1>
              
              <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
                Don't just predict what will happen. Signal what should happen. 
                Join the decentralized policy prescription market to voice your demand and build consensus.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/markets" 
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
                >
                  Signal Demand <ArrowRight size={20} />
                </Link>
                <a 
                  href="#how-it-works" 
                  className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center"
                >
                  How it Works?
                </a>
              </div>

              {/* İstatistikler */}
              <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-gray-200/60">
                <div>
                  <p className="text-3xl font-bold text-gray-900">1.2K+</p>
                  <p className="text-sm text-gray-500 mt-1">Policy Shapers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">$450K+</p>
                  <p className="text-sm text-gray-500 mt-1">Signal Volume</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">98%</p>
                  <p className="text-sm text-gray-500 mt-1">Consensus Rate</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. HOW IT WORKS (NASIL ÇALIŞIR) */}
      <div id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 mt-4">Shape the future in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Adım 1 */}
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition group cursor-default">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition text-blue-600">
                <Wallet size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Connect Identity</h3>
              <p className="text-gray-500 leading-relaxed">
                Your wallet is your digital identity. Connect securely — no sign-up required, just pure Web3.
              </p>
            </div>

            {/* Adım 2 */}
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition group cursor-default">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition text-purple-600">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Prescribe & Signal</h3>
              <p className="text-gray-500 leading-relaxed">
                Back the outcome you want to see happen. Signal your demand with SOL tokens.
              </p>
            </div>

            {/* Adım 3 */}
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition group cursor-default">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition text-green-600">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Build Consensus</h3>
              <p className="text-gray-500 leading-relaxed">
                Rally the community around shared goals. Build consensus and earn rewards when alignment is reached.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MARKET LISTING (PİYASALAR) */}
      <div id="markets" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="text-yellow-500 fill-yellow-500" /> 
              Popular Markets
            </h2>
            <p className="text-gray-500 mt-2">Trending policy prescriptions happening right now.</p>
          </div>
          <Link href="/markets" className="text-blue-600 font-bold hover:underline hidden sm:block">
            View All Markets →
          </Link>
        </div>

        {markets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {markets.map((market: any) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <BarChart2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No markets found</h3>
            <p className="text-gray-500">Check back later for new policy prescriptions.</p>
          </div>
        )}
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/markets" className="text-blue-600 font-bold hover:underline">
            View All Markets →
          </Link>
        </div>
      </div>

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
}