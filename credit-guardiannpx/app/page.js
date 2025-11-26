"use client";
import { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle, Banknote, Briefcase, FileText, Loader2, ArrowRight } from "lucide-react";

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
      alert("Error connecting to Gemini.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-blue-900">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold tracking-tight">CreditGuardian <span className="text-blue-400">Gemini</span></h1>
        </div>
      </header>

      <main className="flex-grow p-6 md:p-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          
          {/* Input Section */}
          <div className="space-y-6">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-slate-800">New Application</h2>
              <p className="text-slate-500">Gemini-powered behavioral risk assessment.</p>
            </div>

            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl space-y-5 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Banknote className="w-4 h-4" /> Income ($)
                  </label>
                  <input type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setFormData({...formData, income: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Banknote className="w-4 h-4" /> Loan ($)
                  </label>
                  <input type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setFormData({...formData, loanAmount: e.target.value})} required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Employment
                </label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFormData({...formData, employmentStatus: e.target.value})}>
                  <option>Employed</option>
                  <option>Self-Employed</option>
                  <option>Student</option>
                  <option>Unemployed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> The Story
                </label>
                <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg h-32 resize-none outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Explain why you need this loan..."
                  onChange={(e) => setFormData({...formData, reason: e.target.value})} required />
              </div>

              <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-xl transition-all flex justify-center items-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <>Assess with Gemini <ArrowRight className="w-5 h-5" /></>}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="flex flex-col justify-center">
            {!result && !loading && (
              <div className="text-center text-slate-400 p-10 border-2 border-dashed border-slate-200 rounded-2xl">
                <ShieldCheck className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Waiting for data...</p>
              </div>
            )}

            {loading && (
              <div className="text-center p-10 space-y-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                <p className="text-slate-600 animate-pulse">Gemini is analyzing patterns...</p>
              </div>
            )}

            {result && (
              <div className="animate-slide-up glass-panel p-8 rounded-2xl border-l-8 border-l-blue-600">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase">Decision</p>
                    <h2 className={`text-4xl font-extrabold mt-1 ${
                      result.decision === 'APPROVED' ? 'text-green-600' : 
                      result.decision === 'REJECTED' ? 'text-red-600' : 'text-yellow-600'
                    }`}>{result.decision}</h2>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-bold text-slate-400 uppercase">Risk Score</p>
                     <div className={`text-3xl font-bold ${
                       result.riskScore > 70 ? 'text-red-600' : result.riskScore < 30 ? 'text-green-600' : 'text-yellow-600'
                     }`}>{result.riskScore}<span className="text-lg text-slate-400">/100</span></div>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-3 mb-8">
                  <div className={`h-3 rounded-full transition-all duration-1000 ${
                       result.riskScore > 70 ? 'bg-red-500' : result.riskScore < 30 ? 'bg-green-500' : 'bg-yellow-500'
                    }`} style={{ width: `${result.riskScore}%` }}></div>
                </div>

                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-6">
                  <h3 className="font-semibold text-slate-800 mb-2">Analysis</h3>
                  <p className="text-slate-600">{result.reasoning}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.redFlags?.length > 0 && (
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                      <h4 className="text-red-800 font-bold mb-2">🚩 Risks</h4>
                      <ul className="space-y-1">
                        {result.redFlags.map((flag, i) => <li key={i} className="text-sm text-red-700">• {flag}</li>)}
                      </ul>
                    </div>
                  )}
                  {result.greenFlags?.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <h4 className="text-green-800 font-bold mb-2">✅ Positives</h4>
                      <ul className="space-y-1">
                        {result.greenFlags.map((flag, i) => <li key={i} className="text-sm text-green-700">• {flag}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}