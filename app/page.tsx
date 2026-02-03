import Link from 'next/link'
import { TrendingUp, ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp size={28} className="text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Referandium</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-blue-50">
                  Admin Login
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Launch App
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-8 lg:col-span-3">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-blue-600 text-sm font-semibold">Powered by Solana</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900">
              Referandium
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              The decentralized prediction market on Solana.
            </p>

            <p className="text-lg text-gray-600 max-w-xl">
              Vote with your conviction. Join the community hedge fund and invest in the outcomes you believe in most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-colors inline-flex items-center justify-center space-x-3 w-full sm:w-auto">
                  <span>Launch App</span>
                  <ArrowRight size={24} />
                </button>
              </Link>

              <Link href="/admin">
                <button className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center space-x-3 w-full sm:w-auto">
                  <span>Admin Login</span>
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm">
              <div>
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-gray-600">On-Chain</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">1 Wallet</div>
                <div className="text-gray-600">1 Vote</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <div className="text-3xl font-bold text-gray-900">Fair</div>
                <div className="text-gray-600">Democratic</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-2xl shadow-2xl shadow-blue-100"
            >
              <source src="/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600 text-sm">
            <p className="font-semibold mb-2 text-gray-900">Referandium - Policy Prescription Market</p>
            <p className="text-xs">Powered by Solana blockchain</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
