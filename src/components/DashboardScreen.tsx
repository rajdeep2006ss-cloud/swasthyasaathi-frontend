import React, { useState } from 'react';
import { AppView, Language } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface DashboardScreenProps {
  setCurrentView: (view: AppView) => void;
  onOpenEmergency: () => void;
  language: Language;
  onOpenDossierModal: () => void;
  onShowToast?: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

interface HealthMarkerPoint {
  day: string;
  fullDate: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  glucose: number;
}

export type BenchmarkArchetype = 'normotensive' | 'prehypertension' | 'prediabetic';

export const clinicalArchetypes = {
  normotensive: {
    id: 'normotensive' as BenchmarkArchetype,
    label: 'ICMR Adult Baseline (Reference)',
    badge: 'Normotensive Profile [Educational Reference]',
    pulse: 74,
    pulseStatus: 'Nominal',
    bp: '120/78',
    bpDiff: '-2 mmHg',
    glucose: 96,
    glucoseStatus: 'Optimal',
    triageLevel: 'Std G-1',
    triageTier: 'Low Risk Tier',
    description: 'Educational reference profile compliant with published ICMR & WHO adult clinical benchmarks.',
    data: [
      { day: 'Mon', fullDate: 'Oct 05', systolic: 124, diastolic: 82, heartRate: 76, glucose: 99 },
      { day: 'Tue', fullDate: 'Oct 06', systolic: 122, diastolic: 80, heartRate: 74, glucose: 97 },
      { day: 'Wed', fullDate: 'Oct 07', systolic: 125, diastolic: 81, heartRate: 75, glucose: 98 },
      { day: 'Thu', fullDate: 'Oct 08', systolic: 121, diastolic: 79, heartRate: 72, glucose: 95 },
      { day: 'Fri', fullDate: 'Oct 09', systolic: 120, diastolic: 78, heartRate: 74, glucose: 96 },
      { day: 'Sat', fullDate: 'Oct 10', systolic: 122, diastolic: 80, heartRate: 75, glucose: 97 },
      { day: 'Sun (Self-reported)', fullDate: 'Latest Log', systolic: 120, diastolic: 78, heartRate: 74, glucose: 96 },
    ],
  },
  prehypertension: {
    id: 'prehypertension' as BenchmarkArchetype,
    label: 'Stage-1 Pre-Hypertension (Observation)',
    badge: 'Borderline Profile [Educational Reference]',
    pulse: 82,
    pulseStatus: 'Elevated',
    bp: '138/88',
    bpDiff: '+4 mmHg',
    glucose: 104,
    glucoseStatus: 'Borderline',
    triageLevel: 'Std G-2',
    triageTier: 'Observation Tier',
    description: 'Educational archetype demonstrating borderline systolic pressure progression for health literacy.',
    data: [
      { day: 'Mon', fullDate: 'Oct 05', systolic: 136, diastolic: 86, heartRate: 80, glucose: 102 },
      { day: 'Tue', fullDate: 'Oct 06', systolic: 138, diastolic: 87, heartRate: 82, glucose: 103 },
      { day: 'Wed', fullDate: 'Oct 07', systolic: 140, diastolic: 89, heartRate: 84, glucose: 105 },
      { day: 'Thu', fullDate: 'Oct 08', systolic: 135, diastolic: 85, heartRate: 81, glucose: 101 },
      { day: 'Fri', fullDate: 'Oct 09', systolic: 138, diastolic: 88, heartRate: 82, glucose: 104 },
      { day: 'Sat', fullDate: 'Oct 10', systolic: 139, diastolic: 88, heartRate: 83, glucose: 106 },
      { day: 'Sun (Self-reported)', fullDate: 'Latest Log', systolic: 138, diastolic: 88, heartRate: 82, glucose: 104 },
    ],
  },
  prediabetic: {
    id: 'prediabetic' as BenchmarkArchetype,
    label: 'Impaired Fasting Glycemia (Metabolic)',
    badge: 'Dietary Guidance Profile [Educational Reference]',
    pulse: 76,
    pulseStatus: 'Nominal',
    bp: '126/82',
    bpDiff: '+1 mmHg',
    glucose: 118,
    glucoseStatus: 'Elevated Fasting',
    triageLevel: 'Std G-2',
    triageTier: 'Lifestyle Plan Tier',
    description: 'Educational archetype highlighting impaired fasting glucose requiring clinical nutrition review.',
    data: [
      { day: 'Mon', fullDate: 'Oct 05', systolic: 128, diastolic: 84, heartRate: 78, glucose: 114 },
      { day: 'Tue', fullDate: 'Oct 06', systolic: 125, diastolic: 81, heartRate: 75, glucose: 116 },
      { day: 'Wed', fullDate: 'Oct 07', systolic: 127, diastolic: 83, heartRate: 77, glucose: 120 },
      { day: 'Thu', fullDate: 'Oct 08', systolic: 124, diastolic: 80, heartRate: 74, glucose: 115 },
      { day: 'Fri', fullDate: 'Oct 09', systolic: 126, diastolic: 82, heartRate: 76, glucose: 118 },
      { day: 'Sat', fullDate: 'Oct 10', systolic: 125, diastolic: 81, heartRate: 75, glucose: 117 },
      { day: 'Sun (Self-reported)', fullDate: 'Latest Log', systolic: 126, diastolic: 82, heartRate: 76, glucose: 118 },
    ],
  },
};

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  setCurrentView,
  onOpenEmergency,
  language,
  onOpenDossierModal,
  onShowToast,
}) => {
  const [selectedArchetype, setSelectedArchetype] = useState<BenchmarkArchetype>('normotensive');
  const [queryInput, setQueryInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBarHover, setActiveBarHover] = useState<string | null>(null);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [showScanPreview, setShowScanPreview] = useState(false);
  const [abhaSentSuccess, setAbhaSentSuccess] = useState(false);
  const [chartMetricFilter, setChartMetricFilter] = useState<'all' | 'bp' | 'hr' | 'glucose'>('all');

  const currentArchetype = clinicalArchetypes[selectedArchetype];

  const suggestedQueries = [
    {
      id: '1',
      label: 'Metformin & Glimepiride Interaction',
      icon: 'medication',
      color: 'text-[#4fdbc8]',
      query: 'Check interaction risk between Metformin 500mg and Glimepiride 1mg with HbA1c 6.8%',
    },
    {
      id: '2',
      label: 'Blood Pressure 30-Day Mean Trend',
      icon: 'show_chart',
      color: 'text-[#4cd7f6]',
      query: 'Summarize 30-day systolic/diastolic trend from self-reported morning logs',
    },
    {
      id: '3',
      label: 'HbA1c & Glycemic Load for South Indian Thali',
      icon: 'nutrition',
      color: 'text-[#d0bcff]',
      query: 'What are low-GI substitutes for white ponni rice in a South Indian vegetarian meal?',
    },
    {
      id: '4',
      label: 'हिंदी में परामर्श सारांश',
      icon: 'translate',
      color: 'text-[#4cd7f6]',
      query: 'मेरी हालिया रिपोर्ट का संक्षिप्त सारांश सरल हिंदी में बताएं',
    },
  ];

  const handleRunQuery = (textToRun?: string) => {
    const q = textToRun || queryInput;
    if (!q.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      if (q.includes('Metformin')) {
        setAnalysisResult(
          'Clinical Synthesis: Low synergistic hypoglycemia risk. Metformin (insulin sensitizer) + Glimepiride (sulfonylurea). Monitoring of fasting glucose recommended before morning dose. ICD-11: 5A11 (Type 2 Diabetes).'
        );
      } else if (q.includes('Pressure') || q.includes('Trend')) {
        setAnalysisResult(
          'Telemetry Synthesis: 30-day mean BP is 122/79 mmHg (Standard Grade 1 Controlled). Peak reading: 132/84 mmHg (Post-exertion). No hypertensive urgencies detected.'
        );
      } else if (q.includes('हिंदी') || q.includes('सारांश')) {
        setAnalysisResult(
          'क्लिनिकल सारांश: आपका रक्तचाप (120/78 mmHg) और उपवास शर्करा (96 mg/dL) सुरक्षित सीमा में हैं। नियमित व्यायाम और स्वस्थ आहार जारी रखें।'
        );
      } else {
        setAnalysisResult(
          `Analysis complete for "${q}": Grounded with ICMR standards and Bio-Saathi 3.4 medical knowledge graph. No critical anomalies flagged.`
        );
      }
    }, 800);
  };

  const handleVoiceToggle = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      setQueryInput('Fasting blood sugar 96 mg/dL normal range check');
      setIsVoiceListening(false);
    }, 1500);
  };

  const handleScanPrescription = () => {
    setShowScanPreview(true);
    setTimeout(() => {
      setQueryInput('Extracted Rx: Metformin 500mg BD, Telmisartan 40mg OD');
      setShowScanPreview(false);
    }, 1200);
  };

  const handleSendAbha = () => {
    setAbhaSentSuccess(true);
    setTimeout(() => setAbhaSentSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-12">
      {/* Decorative ambient backdrops */}
      <div className="relative w-full">
        <div className="absolute -top-12 left-1/4 w-96 h-96 rounded-full bg-[#a078ff]/10 blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute top-48 right-12 w-80 h-80 rounded-full bg-[#4cd7f6]/10 blur-[100px] pointer-events-none -z-10"></div>

        {/* Top Search & Telemetry Bar (Sub-header) */}
        <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-xl">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#958ea0] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search EHR records, vitals telemetry, clinical protocols..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#131b2e] text-[#dae2fd] placeholder:text-[#958ea0] text-sm border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#d0bcff] shadow-inner"
            />
            {searchQuery && (
              <div className="absolute left-0 right-0 top-full mt-1.5 p-3 rounded-xl bg-[#171f33] border border-white/10 shadow-2xl z-30 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#958ea0] block mb-1">
                  Matching EHR &amp; Protocols
                </span>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      setQueryInput('Blood Pressure history with Dr. Patel');
                      setSearchQuery('');
                    }}
                    className="text-left text-[#dae2fd] hover:text-[#4cd7f6] p-1.5 rounded hover:bg-[#222a3d]"
                  >
                    📈 Self-Reported BP Logs (14-day record)
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('health-library');
                      setSearchQuery('');
                    }}
                    className="text-left text-[#dae2fd] hover:text-[#4cd7f6] p-1.5 rounded hover:bg-[#222a3d]"
                  >
                    📖 ICMR Protocol: Managing HbA1c with Indian Diets
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131b2e] border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#4fdbc8] shadow-[0_0_8px_#4fdbc8]"></span>
              <span className="text-xs text-[#4fdbc8] font-medium uppercase tracking-wider">
                ICMR Educational Baseline
              </span>
            </div>
            <button
              onClick={() =>
                onShowToast?.(
                  'Clinical Notifications',
                  'Telemetry indicators nominal. All self-reported markers are within benchmark parameters.',
                  'info'
                )
              }
              className="relative p-2 rounded-xl bg-[#131b2e] border border-white/5 text-[#cbc3d7] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#4cd7f6]"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
            </button>
          </div>
        </div>

        {/* 1. Welcome & Telemetry Quick Stat Banner */}
        <section className="relative w-full rounded-2xl bg-[#131b2e] border border-white/5 shadow-xl p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#d0bcff]/10 via-[#222a3d]/40 to-transparent pointer-events-none"></div>

          <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-6 z-10">
            {/* Title & Clinical Archetype Controller */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#4fdbc8]/15 text-[#4fdbc8] text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5 border border-[#4fdbc8]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4fdbc8] animate-ping"></span>
                  Verified ICMR &amp; WHO Standards
                </span>
                <span className="text-xs text-[#958ea0]">
                  • Educational Sandbox Mode [{currentArchetype.badge}]
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#dae2fd] tracking-tight">
                {language === 'hi' ? 'स्वागत है, प्रिया शर्मा' : 'Welcome, Priya Sharma'}{' '}
                <span className="inline-block hover:rotate-12 transition-transform cursor-default">👋</span>
              </h1>
              <p className="text-sm text-[#cbc3d7]">
                Clinical Healthcare Education Interface.{' '}
                <span className="text-[#4fdbc8] font-semibold">{currentArchetype.description}</span>
              </p>

              {/* Archetype Quick Switcher (Educational Presets) */}
              <div className="mt-1 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-[11px] text-[#958ea0] uppercase tracking-wider font-semibold">
                  Reference Archetype:
                </span>
                {(Object.keys(clinicalArchetypes) as BenchmarkArchetype[]).map((key) => {
                  const arch = clinicalArchetypes[key];
                  const isSelected = selectedArchetype === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedArchetype(key)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#a078ff] text-[#340080] font-bold shadow-[0_0_12px_rgba(160,120,255,0.4)]'
                          : 'bg-[#222a3d] text-[#cbc3d7] hover:text-white border border-white/5'
                      }`}
                    >
                      {arch.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Quick Stat Pills Grid (Dynamically updated from reference archetype) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
              {/* Resting Pulse */}
              <div className="flex flex-col p-3 rounded-xl bg-[#171f33]/80 backdrop-blur-md border border-white/5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#958ea0] uppercase tracking-wider font-medium">Resting Pulse</span>
                  <span className="material-symbols-outlined text-[16px] text-[#ffb4ab]">favorite</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-[#dae2fd] font-mono tabular-nums">{currentArchetype.pulse}</span>
                  <span className="text-[10px] text-[#958ea0]">BPM</span>
                </div>
                <span className="text-[11px] text-[#4fdbc8] mt-0.5 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">trending_flat</span> {currentArchetype.pulseStatus}
                </span>
              </div>

              {/* BP Mean */}
              <div className="flex flex-col p-3 rounded-xl bg-[#171f33]/80 backdrop-blur-md border border-white/5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#958ea0] uppercase tracking-wider font-medium">BP Mean</span>
                  <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">vital_signs</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-[#dae2fd] font-mono tabular-nums">{currentArchetype.bp}</span>
                  <span className="text-[10px] text-[#958ea0]">mmHg</span>
                </div>
                <span className="text-[11px] text-[#4fdbc8] mt-0.5 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">arrow_drop_down</span> {currentArchetype.bpDiff}
                </span>
              </div>

              {/* Fast. Glucose */}
              <div className="flex flex-col p-3 rounded-xl bg-[#171f33]/80 backdrop-blur-md border border-white/5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#958ea0] uppercase tracking-wider font-medium">Fast. Glucose</span>
                  <span className="material-symbols-outlined text-[16px] text-[#d0bcff]">water_drop</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-[#dae2fd] font-mono tabular-nums">{currentArchetype.glucose}</span>
                  <span className="text-[10px] text-[#958ea0]">mg/dL</span>
                </div>
                <span className="text-[11px] text-[#4fdbc8] mt-0.5 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span> {currentArchetype.glucoseStatus}
                </span>
              </div>

              {/* Triage Level */}
              <div className="flex flex-col p-3 rounded-xl bg-[#171f33]/80 backdrop-blur-md border border-white/5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#958ea0] uppercase tracking-wider font-medium">Triage Level</span>
                  <span className="material-symbols-outlined text-[16px] text-[#4fdbc8]">verified_user</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-[#4fdbc8] font-mono">{currentArchetype.triageLevel}</span>
                </div>
                <span className="text-[11px] text-[#958ea0] mt-0.5">{currentArchetype.triageTier}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Intelligent Medical Query Bar (Bilingual + Multimodal) */}
        <section className="mt-6 w-full rounded-2xl bg-[#222a3d]/60 backdrop-blur-xl border border-white/5 p-4 md:p-5 shadow-lg">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Input Wrapper */}
            <div className="relative flex-1 flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#d0bcff] text-[22px]">smart_toy</span>
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunQuery()}
                placeholder="Ask medical question in English or हिंदी (e.g. 'Metformin dose side effects', 'डायबिटीज के लक्षण')..."
                className="w-full pl-11 pr-24 py-3 rounded-xl bg-[#131b2e] text-[#dae2fd] placeholder:text-[#958ea0] text-sm border border-white/5 focus:outline-none focus:ring-1 focus:ring-[#d0bcff] shadow-inner"
              />
              <div className="absolute right-2.5 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isVoiceListening
                      ? 'bg-[#ffb4ab]/20 text-[#ffb4ab] animate-pulse'
                      : 'hover:bg-[#171f33] text-[#958ea0] hover:text-[#4cd7f6]'
                  }`}
                  title="Voice Input (Hindi/English)"
                >
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
                <button
                  type="button"
                  onClick={handleScanPrescription}
                  className="p-1.5 rounded-lg hover:bg-[#171f33] text-[#958ea0] hover:text-[#d0bcff] transition-colors"
                  title="OCR Scan Lab Prescription"
                >
                  <span className="material-symbols-outlined text-[20px]">document_scanner</span>
                </button>
              </div>
            </div>

            {/* Query CTA Button */}
            <button
              type="button"
              disabled={isAnalyzing}
              onClick={() => handleRunQuery()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(160,120,255,0.35)] transition-all disabled:opacity-70 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span>{isAnalyzing ? 'Analyzing Query...' : 'Analyze Query'}</span>
            </button>
          </div>

          {/* Voice or OCR feedback banner */}
          {isVoiceListening && (
            <div className="mt-2.5 p-2 rounded-lg bg-[#4cd7f6]/10 text-[#4cd7f6] text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping"></span>
              <span>Listening in bilingual Hindi/English... Speak your clinical question now</span>
            </div>
          )}
          {showScanPreview && (
            <div className="mt-2.5 p-2 rounded-lg bg-[#d0bcff]/10 text-[#d0bcff] text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
              <span>Running OCR prescription parser on simulated clinical camera buffer...</span>
            </div>
          )}

          {/* Analysis Result Card */}
          {analysisResult && (
            <div className="mt-3 p-3.5 rounded-xl bg-[#171f33] border border-[#d0bcff]/20 text-xs text-[#dae2fd] shadow-lg flex items-start justify-between gap-3 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#4fdbc8] text-[20px] mt-0.5">verified</span>
                <div>
                  <span className="font-semibold text-[#d0bcff] block mb-0.5">Bio-Saathi Clinical Synthesis</span>
                  <p className="leading-relaxed text-[#cbc3d7]">{analysisResult}</p>
                </div>
              </div>
              <button
                onClick={() => setAnalysisResult(null)}
                className="text-[#958ea0] hover:text-white p-1"
                title="Dismiss"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}

          {/* Suggested Quick Query Chips */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-[#958ea0] uppercase tracking-wider">Suggested Inferences:</span>
            {suggestedQueries.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setQueryInput(chip.query);
                  handleRunQuery(chip.query);
                }}
                className="px-3 py-1 rounded-full bg-[#171f33] text-[#cbc3d7] hover:text-[#dae2fd] hover:bg-[#2d3449] text-xs flex items-center gap-1.5 transition-colors border border-white/5"
              >
                <span className={`material-symbols-outlined text-[14px] ${chip.color}`}>{chip.icon}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Clinical Command Hub (Spacious 4-Column Bento) */}
        <section className="mt-8 w-full">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#dae2fd]">Clinical Command Hub</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#958ea0] text-xs">Realtime Engines</span>
            </div>
            <span className="text-xs text-[#4fdbc8] flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#4fdbc8] animate-pulse"></span>
              Subsystem Latency 142ms • Safe Mode Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* Card 1: AI Health Assistant */}
            <div className="group relative rounded-2xl bg-[#131b2e]/90 backdrop-blur-xl border border-white/5 p-5 shadow-lg flex flex-col justify-between hover:shadow-[0_0_24px_rgba(208,188,255,0.2)] hover:border-[#a078ff]/30 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#a078ff]/20 text-[#d0bcff] flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-[24px]">psychology</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#4fdbc8]/10 text-[#4fdbc8] text-[10px] font-semibold tracking-wider">
                    ONLINE
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#dae2fd]">AI Health Assistant</h3>
                  <p className="text-xs text-[#cbc3d7] mt-1 leading-relaxed">
                    Continuous medical conversational triage with ICD-11 grounding and multi-turn medication reconciliation.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#171f33] text-[#958ea0] text-xs flex items-center justify-between border border-white/5">
                  <span>
                    Avg. Latency: <strong className="text-white font-mono">142ms</strong>
                  </span>
                  <span className="text-[#d0bcff] font-medium">Model: Bio-Saathi 3.4</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentView('assistant')}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#222a3d] hover:bg-[#a078ff] hover:text-[#340080] text-[#dae2fd] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group-hover:bg-[#a078ff] group-hover:text-[#340080]"
              >
                <span>Launch Clinical Session</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Card 2: Doctor Prep Studio */}
            <div className="group relative rounded-2xl bg-[#131b2e]/90 backdrop-blur-xl border border-white/5 p-5 shadow-lg flex flex-col justify-between hover:shadow-[0_0_24px_rgba(76,215,246,0.2)] hover:border-[#4cd7f6]/30 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#4cd7f6]/15 text-[#4cd7f6] flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-[24px]">clinical_notes</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#4cd7f6]/15 text-[#4cd7f6] text-[10px] font-semibold tracking-wider">
                    1 SUMMARY READY
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#dae2fd]">Doctor Prep Studio</h3>
                  <p className="text-xs text-[#cbc3d7] mt-1 leading-relaxed">
                    Auto-generate structured clinical briefs for Dr. Aarav Patel (Endocrinology) before tomorrow's visit.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#171f33] text-[#958ea0] text-xs flex items-center justify-between border border-white/5">
                  <span>
                    Appointment: <strong className="text-white">Tomorrow, 11:30 AM</strong>
                  </span>
                  <span className="text-[#4cd7f6] font-medium">Format: SBAR</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentView('doctor-prep')}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#222a3d] hover:bg-[#03b5d3] hover:text-[#003640] text-[#dae2fd] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Export Clinician Dossier</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  download
                </span>
              </button>
            </div>

            {/* Card 3: Health Library */}
            <div className="group relative rounded-2xl bg-[#131b2e]/90 backdrop-blur-xl border border-white/5 p-5 shadow-lg flex flex-col justify-between hover:shadow-[0_0_24px_rgba(79,219,200,0.2)] hover:border-[#4fdbc8]/30 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#4fdbc8]/15 text-[#4fdbc8] flex items-center justify-center shadow-inner">
                    <span className="material-symbols-outlined text-[24px]">menu_book</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#4fdbc8] text-[10px] font-semibold tracking-wider">
                    350+ CURATED
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#dae2fd]">Health Library</h3>
                  <p className="text-xs text-[#cbc3d7] mt-1 leading-relaxed">
                    Peer-reviewed patient pamphlets, ICMR nutrition charts, and interactive medication adherence playbooks.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#171f33] text-[#958ea0] text-xs flex items-center justify-between border border-white/5">
                  <span>
                    Language: <strong className="text-white">Bilingual (EN/HI)</strong>
                  </span>
                  <span className="text-[#4fdbc8] font-medium">ICMR-Certified</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentView('health-library')}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#222a3d] hover:bg-[#00a392] hover:text-white text-[#dae2fd] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Explore Clinical Guides</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  library_books
                </span>
              </button>
            </div>

            {/* Card 4: Emergency SOS Protocol */}
            <div className="group relative rounded-2xl bg-[#93000a]/20 backdrop-blur-xl border border-[#ffb4ab]/30 p-5 shadow-[0_0_24px_rgba(239,68,68,0.25)] flex flex-col justify-between hover:shadow-[0_0_32px_rgba(239,68,68,0.4)] transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#93000a] text-white flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                    <span className="material-symbols-outlined text-[24px] animate-pulse">emergency</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#93000a]/30 text-[#ffb4ab] text-[10px] font-bold tracking-wider">
                    PRIORITY 1 CRITICAL
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#ffb4ab]">Emergency SOS Dispatch</h3>
                  <p className="text-xs text-[#cbc3d7] mt-1 leading-relaxed">
                    Immediate 112/108 National Emergency gateway link with automated live GPS telemetry &amp; ABHA history broadcast.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#060e20]/80 text-[#958ea0] text-xs flex items-center justify-between border border-white/5">
                  <span>
                    Dispatches: <strong className="text-[#ffb4ab]">108 Ambulance / 112</strong>
                  </span>
                  <span className="text-[#ffb4ab] font-medium">GPS Ready</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenEmergency}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#93000a] hover:bg-[#ffb4ab] hover:text-[#690005] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(239,68,68,0.4)] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Activate 112 / 108 Alert</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. Multi-Column Telemetry & Regional Medical Insights (7 cols + 5 cols) */}
        <section className="mt-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Health Literacy & Adherence Telemetry */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="p-6 md:p-7 rounded-2xl bg-[#131b2e] border border-white/5 shadow-xl flex flex-col gap-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#958ea0] uppercase tracking-wider font-semibold">
                    Bio-Telemetry &amp; Compliance
                  </span>
                  <h3 className="text-xl font-bold text-[#dae2fd]">Adherence &amp; Health Literacy Index</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#222a3d] text-[#4fdbc8] text-xs font-medium flex items-center gap-1.5 border border-[#4fdbc8]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4fdbc8]"></span> 7-Day Window
                </span>
              </div>

              {/* Gauges & Summary Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-1">
                {/* Radial Metric 1 */}
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#222a3d]/50 border border-white/5 text-center">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        className="text-[#2d3449] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                      />
                      <circle
                        className="text-[#4fdbc8] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeDasharray="251.2"
                        strokeDashoffset="30.1"
                        strokeLinecap="round"
                        strokeWidth="8"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-[#dae2fd] font-mono leading-none">
                        88<span className="text-base font-normal text-[#4fdbc8]">%</span>
                      </span>
                      <span className="text-[10px] text-[#958ea0] uppercase tracking-wider mt-0.5">Literacy</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#cbc3d7] mt-2 font-medium">Guideline Mastery</p>
                  <span className="text-[11px] text-[#4fdbc8] font-mono">+6% vs last week</span>
                </div>

                {/* Radial Metric 2 */}
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#222a3d]/50 border border-white/5 text-center">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        className="text-[#2d3449] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                      />
                      <circle
                        className="text-[#4cd7f6] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeDasharray="251.2"
                        strokeDashoffset="17.5"
                        strokeLinecap="round"
                        strokeWidth="8"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-[#dae2fd] font-mono leading-none">
                        93<span className="text-base font-normal text-[#4cd7f6]">%</span>
                      </span>
                      <span className="text-[10px] text-[#958ea0] uppercase tracking-wider mt-0.5">Rx Intake</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#cbc3d7] mt-2 font-medium">Medication Timing</p>
                  <span className="text-[11px] text-[#4cd7f6] font-mono">13/14 doses taken</span>
                </div>

                {/* Radial Metric 3 */}
                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#222a3d]/50 border border-white/5 text-center">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        className="text-[#2d3449] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                      />
                      <circle
                        className="text-[#d0bcff] fill-none"
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeDasharray="251.2"
                        strokeDashoffset="75.3"
                        strokeLinecap="round"
                        strokeWidth="8"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-[#dae2fd] font-mono leading-none">
                        70<span className="text-base font-normal text-[#d0bcff]">%</span>
                      </span>
                      <span className="text-[10px] text-[#958ea0] uppercase tracking-wider mt-0.5">Activity</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#cbc3d7] mt-2 font-medium">Brisk Walk Goal</p>
                  <span className="text-[11px] text-[#d0bcff] font-mono">6,840 / 10k steps</span>
                </div>
              </div>

              {/* Recharts Weekly Health Markers Line Chart (Glassmorphism Aesthetic) */}
              <div className="flex flex-col gap-3 pt-3 border-t border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#dae2fd] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">show_chart</span>
                      {language === 'hi'
                        ? 'साप्ताहिक स्वास्थ्य संकेतक (Weekly Health Markers)'
                        : 'Weekly Health Markers Telemetry'}
                    </span>
                    <span className="text-[10px] text-[#958ea0]">
                      Blood Pressure (mmHg), Resting Heart Rate (BPM) &amp; Glucose (mg/dL)
                    </span>
                  </div>

                  {/* Interactive Metric Filter Buttons */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-[#060e20]/80 border border-white/5 text-[10px] overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setChartMetricFilter('all')}
                      className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ${
                        chartMetricFilter === 'all'
                          ? 'bg-[#222a3d] text-white shadow-sm'
                          : 'text-[#958ea0] hover:text-[#dae2fd]'
                      }`}
                    >
                      All Markers
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartMetricFilter('bp')}
                      className={`px-2 py-1 rounded-lg transition-all whitespace-nowrap flex items-center gap-1 font-medium ${
                        chartMetricFilter === 'bp'
                          ? 'bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/30'
                          : 'text-[#958ea0] hover:text-[#4cd7f6]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
                      BP Trend
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartMetricFilter('hr')}
                      className={`px-2 py-1 rounded-lg transition-all whitespace-nowrap flex items-center gap-1 font-medium ${
                        chartMetricFilter === 'hr'
                          ? 'bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/30'
                          : 'text-[#958ea0] hover:text-[#ffb4ab]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span>
                      Pulse (HR)
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartMetricFilter('glucose')}
                      className={`px-2 py-1 rounded-lg transition-all whitespace-nowrap flex items-center gap-1 font-medium ${
                        chartMetricFilter === 'glucose'
                          ? 'bg-[#4fdbc8]/20 text-[#4fdbc8] border border-[#4fdbc8]/30'
                          : 'text-[#958ea0] hover:text-[#4fdbc8]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4fdbc8]"></span>
                      Glucose
                    </button>
                  </div>
                </div>

                {/* Recharts Container Card */}
                <div className="w-full rounded-xl bg-[#060e20]/70 border border-white/5 p-3 relative shadow-inner">
                  {/* Legend Strip */}
                  <div className="flex items-center justify-between text-[10px] text-[#958ea0] mb-2 px-1 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      {(chartMetricFilter === 'all' || chartMetricFilter === 'bp') && (
                        <>
                          <span className="flex items-center gap-1 text-[#4cd7f6]">
                            <span className="w-2.5 h-0.5 bg-[#4cd7f6]"></span>
                            <span>Systolic BP</span>
                          </span>
                          <span className="flex items-center gap-1 text-[#d0bcff]">
                            <span className="w-2.5 h-0.5 bg-[#d0bcff] border-t border-dashed border-[#d0bcff]"></span>
                            <span>Diastolic BP</span>
                          </span>
                        </>
                      )}
                      {(chartMetricFilter === 'all' || chartMetricFilter === 'hr') && (
                        <span className="flex items-center gap-1 text-[#ffb4ab]">
                          <span className="w-2.5 h-0.5 bg-[#ffb4ab]"></span>
                          <span>Heart Rate</span>
                        </span>
                      )}
                      {(chartMetricFilter === 'all' || chartMetricFilter === 'glucose') && (
                        <span className="flex items-center gap-1 text-[#4fdbc8]">
                          <span className="w-2.5 h-0.5 bg-[#4fdbc8]"></span>
                          <span>Fast. Glucose</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#4fdbc8] font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4fdbc8] animate-pulse"></span>
                      Nominal Stability (7 Days)
                    </span>
                  </div>

                  {/* Recharts LineChart Component */}
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={currentArchetype.data}
                        margin={{ top: 8, right: 12, left: -22, bottom: 4 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#2d3449"
                          opacity={0.35}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
                          stroke="#958ea0"
                          tick={{ fill: '#958ea0', fontSize: 10 }}
                          axisLine={{ stroke: '#2d3449' }}
                          tickLine={false}
                        />
                        <YAxis
                          stroke="#958ea0"
                          tick={{ fill: '#958ea0', fontSize: 10 }}
                          domain={['dataMin - 8', 'dataMax + 8']}
                          axisLine={{ stroke: '#2d3449' }}
                          tickLine={false}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const dataPoint = payload[0]?.payload as HealthMarkerPoint;
                              return (
                                <div className="bg-[#060e20]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-3 shadow-[0_12px_32px_rgba(0,0,0,0.8)] text-xs min-w-[200px]">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                                    <span className="font-semibold text-white">
                                      {dataPoint.day} ({dataPoint.fullDate})
                                    </span>
                                    <span className="text-[10px] text-[#4fdbc8] px-1.5 py-0.5 rounded-full bg-[#4fdbc8]/10 font-mono border border-[#4fdbc8]/20">
                                      Recorded (Log)
                                    </span>
                                  </div>
                                  <div className="space-y-1.5 font-mono text-[11px]">
                                    {(chartMetricFilter === 'all' || chartMetricFilter === 'bp') && (
                                      <div className="flex items-center justify-between text-[#4cd7f6]">
                                        <span className="flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
                                          <span>BP (Sys/Dia):</span>
                                        </span>
                                        <span className="font-bold">
                                          {dataPoint.systolic}/{dataPoint.diastolic} mmHg
                                        </span>
                                      </div>
                                    )}
                                    {(chartMetricFilter === 'all' || chartMetricFilter === 'hr') && (
                                      <div className="flex items-center justify-between text-[#ffb4ab]">
                                        <span className="flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
                                          <span>Heart Rate:</span>
                                        </span>
                                        <span className="font-bold">{dataPoint.heartRate} BPM</span>
                                      </div>
                                    )}
                                    {(chartMetricFilter === 'all' || chartMetricFilter === 'glucose') && (
                                      <div className="flex items-center justify-between text-[#4fdbc8]">
                                        <span className="flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full bg-[#4fdbc8]"></span>
                                          <span>Fast. Glucose:</span>
                                        </span>
                                        <span className="font-bold">{dataPoint.glucose} mg/dL</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="mt-2 pt-1.5 border-t border-white/5 text-[10px] text-[#958ea0] flex items-center justify-between">
                                    <span>Status:</span>
                                    <span className="text-[#4fdbc8] font-medium">Optimal • Nominal</span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        {(chartMetricFilter === 'all' || chartMetricFilter === 'bp') && (
                          <>
                            <Line
                              type="monotone"
                              dataKey="systolic"
                              name="Systolic BP"
                              stroke="#4cd7f6"
                              strokeWidth={2.5}
                              dot={{ r: 3.5, fill: '#060e20', stroke: '#4cd7f6', strokeWidth: 2 }}
                              activeDot={{ r: 6, fill: '#4cd7f6', stroke: '#fff', strokeWidth: 2 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="diastolic"
                              name="Diastolic BP"
                              stroke="#d0bcff"
                              strokeWidth={2}
                              strokeDasharray="4 4"
                              dot={{ r: 3, fill: '#060e20', stroke: '#d0bcff', strokeWidth: 1.5 }}
                              activeDot={{ r: 5, fill: '#d0bcff', stroke: '#fff', strokeWidth: 2 }}
                            />
                          </>
                        )}
                        {(chartMetricFilter === 'all' || chartMetricFilter === 'hr') && (
                          <Line
                            type="monotone"
                            dataKey="heartRate"
                            name="Heart Rate"
                            stroke="#ffb4ab"
                            strokeWidth={2}
                            dot={{ r: 3, fill: '#060e20', stroke: '#ffb4ab', strokeWidth: 1.5 }}
                            activeDot={{ r: 5, fill: '#ffb4ab', stroke: '#fff', strokeWidth: 2 }}
                          />
                        )}
                        {(chartMetricFilter === 'all' || chartMetricFilter === 'glucose') && (
                          <Line
                            type="monotone"
                            dataKey="glucose"
                            name="Fasting Glucose"
                            stroke="#4fdbc8"
                            strokeWidth={2}
                            dot={{ r: 3, fill: '#060e20', stroke: '#4fdbc8', strokeWidth: 1.5 }}
                            activeDot={{ r: 5, fill: '#4fdbc8', stroke: '#fff', strokeWidth: 2 }}
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* 7-Day Adherence Interactive Glowing Bar Chart Visualization */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between text-[#958ea0] text-xs">
                  <span>Weekly Vital Logging Frequency</span>
                  <span className="text-[#4fdbc8] font-medium">All targets met for 6 days straight</span>
                </div>
                <div className="h-28 w-full rounded-xl bg-[#060e20]/60 border border-white/5 p-3 flex items-end justify-between gap-2 relative">
                  {[
                    { day: 'M', pct: 95, color: 'bg-[#4fdbc8]/80 group-hover:bg-[#4fdbc8]', label: '95% Logged' },
                    { day: 'T', pct: 100, color: 'bg-[#4fdbc8]/80 group-hover:bg-[#4fdbc8]', label: '100% Logged' },
                    { day: 'W', pct: 80, color: 'bg-[#4cd7f6]/80 group-hover:bg-[#4cd7f6]', label: '80% Logged' },
                    { day: 'T', pct: 90, color: 'bg-[#4fdbc8]/80 group-hover:bg-[#4fdbc8]', label: '90% Logged' },
                    { day: 'F', pct: 98, color: 'bg-[#4fdbc8]', label: '98% Logged' },
                    { day: 'S', pct: 70, color: 'bg-[#d0bcff]/80 group-hover:bg-[#d0bcff]', label: '70% Logged' },
                    { day: 'Today', pct: 85, color: 'bg-[#00a392]', label: 'Self-Reported: 85%' },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setActiveBarHover(bar.label)}
                      onMouseLeave={() => setActiveBarHover(null)}
                      className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                    >
                      <span className="text-[10px] text-[#958ea0] opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                        {bar.pct}%
                      </span>
                      <div
                        className={`w-full max-w-[28px] ${bar.color} rounded-t shadow-[0_0_12px_rgba(79,219,200,0.3)] transition-all`}
                        style={{ height: `${bar.pct}%` }}
                      ></div>
                      <span
                        className={`text-xs ${
                          bar.day === 'Today' ? 'text-[#4fdbc8] font-bold' : 'text-[#958ea0]'
                        }`}
                      >
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
                {activeBarHover && (
                  <div className="text-[11px] text-center text-[#4cd7f6] font-mono">
                    Vital Telemetry Log: {activeBarHover}
                  </div>
                )}
              </div>

              {/* Telemetry Interface Status & Reference Citations */}
              <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[#958ea0] text-xs">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#4fdbc8]">account_tree</span>
                  FHIR Telemetry Adapter: ABDM M1 Milestone Sandbox (Ready for Streamlit Bridge)
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">verified</span>
                  Clinical Reference: ICMR &amp; WHO Normative Clinical Standards (2024)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Regional Medical Alerts & Cultural Diet Insights */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Card: Verified Public Health Guidelines */}
            <div className="rounded-2xl bg-[#131b2e] border border-white/5 p-5 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#4cd7f6]/15 text-[#4cd7f6] text-xs font-semibold flex items-center gap-1.5 border border-[#4cd7f6]/20">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Verified Public Health Advisory (NCDC Reference)
                </span>
                <span className="text-xs text-[#958ea0]">North India Regional Bulletin</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-md bg-[#222a3d] border border-white/5 relative">
                  <img
                    referrerPolicy="no-referrer"
                    alt="Laboratory microscope analyzing Dengue platelets"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbwd-HbZBUkFLt-KQ1P1K2BZ_Gwd6l0JvhQItBUiE-jo4bfK3nDmJtz7ZjJvOWa9tMPxuE5ksk2Aw66JBGoINYV1Rw4TyQ8XynT1PQm9YgaCVcI7jhcjpQBaW2nNWq9o13DY4sVdn2mnkcX8oW0omHtFJZAA5U6rh9vsWnssuCwnm3KvtLB2nAHG7estHxDmmWHD5xSiddwAKib8Nm17Owm5jt9emeqEMC0EkBHk8ByqRPdak_yH3B"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[#4cd7f6] pointer-events-none -z-10">
                    <span className="material-symbols-outlined text-[28px]">biotech</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold text-[#dae2fd]">
                    Seasonal Vector Surge: Dengue &amp; Chikungunya
                  </h4>
                  <p className="text-xs text-[#cbc3d7] mt-1 line-clamp-2 leading-relaxed">
                    National Centre for Disease Control (NCDC) protocol: Monitor for acute onset fever with retro-orbital pain, severe myalgia, and platelet drop.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#171f33] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#958ea0] font-mono text-[11px]">Source: NCDC Public Health Bulletin 2024</span>
                <button
                  type="button"
                  onClick={() => setCurrentView('health-library')}
                  className="text-[#4cd7f6] hover:underline flex items-center gap-0.5 font-semibold"
                >
                  View Clinical Protocol <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </button>
              </div>
            </div>

            {/* Card: Cultural Diet & HbA1c Management */}
            <div className="rounded-2xl bg-[#131b2e] border border-white/5 p-5 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#4fdbc8]/15 text-[#4fdbc8] text-xs font-semibold border border-[#4fdbc8]/20">
                  ICMR-NIN Nutritional Guidelines 2024
                </span>
                <span className="text-xs text-[#958ea0]">Metabolic Guide</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-md bg-[#222a3d] border border-white/5 relative">
                  <img
                    referrerPolicy="no-referrer"
                    alt="Healthy balanced Indian thali with millet"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv_-HxZ2WDnuuYE4-HObDjOIsfZrGcUNrWC9rfWgdQYmnqz71zx9srUUky0wA8OMqGLdn6LgDKBsM6Z3YH4XRjne4CaGcpOTPYTIK36eS8zY0pAvKvS9F5bAx1PaBlWk_lDPF1H_x46hrvwcnO2ZRR0Y3erK_ldRnPM3OgM1okvQTeV5oySVAVA2vKDqBarZdd8Fuiiku4zXIRTAe6vW1mBij5f-8Pir3QdQwUJCpqr0-keF8AJKAe"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[#4fdbc8] pointer-events-none -z-10">
                    <span className="material-symbols-outlined text-[28px]">restaurant</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold text-[#dae2fd]">Managing HbA1c with Indian Diets</h4>
                  <p className="text-xs text-[#cbc3d7] mt-1 line-clamp-2 leading-relaxed">
                    National Institute of Nutrition (NIN): Replace polished white rice with Bajra (Pearl Millet) and Jowar to lower glycemic spikes.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#171f33] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#958ea0] font-mono text-[11px]">Source: ICMR-NIN Dietary Guidelines</span>
                <button
                  type="button"
                  onClick={() => setCurrentView('health-library')}
                  className="text-[#d0bcff] hover:underline flex items-center gap-0.5 font-semibold"
                >
                  View ICMR Guide <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Clinician Consultation Brief Preview Strip */}
        <section className="mt-8 w-full rounded-2xl bg-[#131b2e] border border-white/5 p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#d0bcff]/20 text-[#d0bcff] flex items-center justify-center shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-[28px]">assignment_turned_in</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-semibold text-[#dae2fd]">
                  Pre-Consult Dossier Built: Dr. Aarav Patel
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-[#4fdbc8]/15 text-[#4fdbc8] text-xs font-medium border border-[#4fdbc8]/20">
                  Ready to Print
                </span>
              </div>
              <p className="text-xs text-[#cbc3d7] mt-0.5">
                Contains: 14-day blood pressure logs, fasting glucose progression, current medication list (Metformin 500mg,
                Telmisartan 40mg), and flagged chief complaint.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenDossierModal}
              className="px-4 py-2.5 rounded-xl bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] text-xs font-semibold transition-colors flex items-center gap-1.5 border border-white/5"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Review Summary</span>
            </button>
            <button
              type="button"
              onClick={handleSendAbha}
              className="px-4 py-2.5 rounded-xl bg-[#a078ff] hover:bg-[#d0bcff] text-[#340080] text-xs font-bold transition-all shadow-[0_0_16px_rgba(208,188,255,0.3)] flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>{abhaSentSuccess ? 'Dispatched via M1!' : 'Send via ABHA M1'}</span>
            </button>
          </div>
        </section>

        {/* 6. Statutory Disclaimer & Certification Footer */}
        <div className="mt-8 pt-4 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#958ea0]">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-[#4fdbc8]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>DISHA &amp; DPDP Compliant</span>
            </div>
            <div className="flex items-center gap-1 text-[#4cd7f6]">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>End-to-End AES-256 Vault Encryption</span>
            </div>
            <div className="flex items-center gap-1 text-[#d0bcff]">
              <span className="material-symbols-outlined text-[16px]">health_and_safety</span>
              <span>Ayushman Bharat Digital Mission (ABDM M1, M2, M3 Certified)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-[#cbc3d7]">SwasthyaSaathi Clinical OS v3.4.2</span>
            <span>•</span>
            <button
              onClick={() =>
                onShowToast?.(
                  'Clinical Education Disclaimer',
                  'SwasthyaSaathi AI provides clinical decision support and triage synthesis for educational guidance. Consult a licensed physician for emergency triage.',
                  'info'
                )
              }
              className="hover:text-white underline focus-visible:ring-1 focus-visible:ring-[#4cd7f6] rounded px-1"
            >
              Clinical Disclaimer
            </button>
            <span>•</span>
            <button onClick={onOpenEmergency} className="hover:text-white underline text-[#ffb4ab]">
              Emergency Protocol Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
