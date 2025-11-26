"use client";
import { useState } from "react";
import { 
  ShieldCheck, AlertTriangle, CheckCircle, 
  Banknote, Briefcase, FileText, Loader2, 
  ArrowRight, Activity, LayoutDashboard, Lock
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    income: "",
    loanAmount: "",
    employmentStatus: "Employed",
    reason: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/risk-assess", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error connecting to AI.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* --- HERO HEADER (The Colorful Part) --- */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 pb-32 pt-10 px-6 shadow-xl relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-10"></div>

        <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="font-mono text-sm tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full">
                Hackathon • Track 2
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">PEKOM CODE FEST</h1>
            <p className="text-blue-100 text-lg opacity-90">LLM-Based Risk Assessment System</p>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full border border-white/10">
            <Lock className="w-4 h-4" /> Secure AI Environment
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT (Floating Cards) --- */}
      <main className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-enter">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                  Application Details
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Annual Income</label>
                  <div className="relative">
                    <Banknote className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                    <input 
                      type="number" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-semibold text-slate-700"
                      placeholder="e.g. 60000"
                      onChange={(e) => setFormData({...formData, income: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Loan Amount</label>
                  <div className="relative">
                    <Activity className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                    <input 
                      type="number" 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-semibold text-slate-700"
                      placeholder="e.g. 20000"
                      onChange={(e) => setFormData({...formData, loanAmount: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Status</label>
                  <div className="relative">
                    <Briefcase className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                    <select 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-semibold text-slate-700 appearance-none cursor-pointer"
                      onChange={(e) => setFormData({...formData, employmentStatus: e.target.value})}
                    >
                      <option>Employed</option>
                      <option>Self-Employed</option>
                      <option>Student</option>
                      <option>Unemployed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wide">Applicant Story</label>
                  <div className="relative">
                    <FileText className="absolute top-4 left-4 w-5 h-5 text-slate-400" />
                    <textarea 
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none h-32 resize-none text-slate-600 leading-relaxed" 
                      placeholder="Describe the context..."
                      onChange={(e) => setFormData({...formData, reason: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <button 
                  disabled={loading} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.98] flex justify-center items-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : (
                    <>
                      Run Analysis <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Results */}
          <div className="lg:col-span-7">
            
            {/* 1. Empty State */}
            {!result && !loading && (
              <div className="h-full min-h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-10 text-center border border-slate-100 animate-enter">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Activity className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">System Ready</h3>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                  Awaiting input. The model will analyze textual and numerical data simultaneously.
                </p>
              </div>
            )}

            {/* 2. Loading State */}
            {loading && (
              <div className="h-full min-h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-10 text-center animate-pulse">
                <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
                <h3 className="text-xl font-bold text-slate-800">Processing Data...</h3>
                <p className="text-slate-500 mt-2">Connecting to Gemini AI Node</p>
              </div>
            )}

            {/* 3. Result Dashboard */}
            {result && (
              <div className="space-y-6 animate-enter">
                
                {/* Score Header */}
                <div className={`rounded-3xl shadow-2xl p-10 text-white overflow-hidden relative ${
                  result.riskScore > 70 ? 'bg-gradient-to-br from-red-500 to-rose-600' : 
                  result.riskScore < 30 ? 'bg-gradient-to-br from-emerald-500 to-green-600' : 
                  'bg-gradient-to-br from-amber-400 to-orange-500'
                }`}>
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <p className="font-bold text-white/80 uppercase tracking-widest text-sm mb-1">Risk Decision</p>
                      <h2 className="text-5xl font-black tracking-tight">{result.decision}</h2>
                    </div>
                    <div className="text-center md:text-right bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                      <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-1">Score</p>
                      <p className="text-4xl font-mono font-bold">{result.riskScore}<span className="text-xl opacity-70">/100</span></p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-8 bg-black/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${result.riskScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4 text-indigo-600">
                      <FileText className="w-5 h-5" />
                      <h4 className="font-bold uppercase tracking-wider text-sm">AI Reasoning</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {result.reasoning}
                    </p>
                  </div>

                  {/* Red Flags */}
                  <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                    <div className="flex items-center gap-2 mb-4 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="font-bold uppercase tracking-wider text-sm">Risks</h4>
                    </div>
                    <ul className="space-y-3">
                      {result.redFlags && result.redFlags.length > 0 ? (
                        result.redFlags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-3 text-red-800 text-sm font-medium">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                            {flag}
                          </li>
                        ))
                      ) : (
                         <li className="text-slate-400 italic text-sm">None detected.</li>
                      )}
                    </ul>
                  </div>

                  {/* Green Flags */}
                  <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-4 text-emerald-600">
                      <CheckCircle className="w-5 h-5" />
                      <h4 className="font-bold uppercase tracking-wider text-sm">Positives</h4>
                    </div>
                    <ul className="space-y-3">
                      {result.greenFlags && result.greenFlags.length > 0 ? (
                        result.greenFlags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-3 text-emerald-800 text-sm font-medium">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                            {flag}
                          </li>
                        ))
                      ) : (
                         <li className="text-slate-400 italic text-sm">None detected.</li>
                      )}
                    </ul>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}