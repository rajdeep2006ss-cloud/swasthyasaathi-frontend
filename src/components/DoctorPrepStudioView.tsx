import React, { useState } from 'react';
import { Language } from '../types';

interface DoctorPrepStudioViewProps {
  language: Language;
  onShowToast?: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const DoctorPrepStudioView: React.FC<DoctorPrepStudioViewProps> = ({ language, onShowToast }) => {
  const [patientName, setPatientName] = useState('Priya Sharma (Age 42, F)');
  const [physician, setPhysician] = useState('Dr. Aarav Patel (Endocrinologist, AIIMS New Delhi)');
  const [visitDate, setVisitDate] = useState('Tomorrow, Oct 11, 2026 - 11:30 AM');
  const [chiefComplaint, setChiefComplaint] = useState(
    'Routine 3-month Type 2 Diabetes & Hypertension follow-up. Mild postprandial lightheadedness once weekly.'
  );

  // Editable patient assessment readings
  const [sysBP, setSysBP] = useState('120');
  const [diaBP, setDiaBP] = useState('78');
  const [glucoseVal, setGlucoseVal] = useState('96');
  const [hba1cVal, setHba1cVal] = useState('6.6');

  // Dynamic medication list
  const [medications, setMedications] = useState<string[]>([
    'Metformin HCl 500 mg - 1 tab twice daily with meals',
    'Telmisartan 40 mg - 1 tab morning',
    'Vitamin D3 60,000 IU - 1 pouch monthly',
  ]);
  const [newMedInput, setNewMedInput] = useState('');

  // Dynamic physician questions
  const [questions, setQuestions] = useState<string[]>([
    'Inquire if occasional post-breakfast dizziness warrants adjusting the morning Metformin schedule.',
    'Re-evaluate 3-month lipid panel and serum creatinine/eGFR order.',
    'Review ICMR dietary millet swap adherence to sustain HbA1c below 6.5%.',
  ]);
  const [newQuestionInput, setNewQuestionInput] = useState('');

  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [isExported, setIsExported] = useState(false);

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMedInput.trim()) {
      setMedications([...medications, newMedInput.trim()]);
      setNewMedInput('');
    }
  };

  const handleRemoveMed = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestionInput.trim()) {
      setQuestions([...questions, newQuestionInput.trim()]);
      setNewQuestionInput('');
    }
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleCopyBrief = () => {
    const briefText = `SBAR CLINICAL PRE-CONSULT DOSSIER
Patient: ${patientName}
Physician: ${physician}
Appointment: ${visitDate}

[S] SITUATION:
${chiefComplaint}

[B] BACKGROUND:
Medications:
${medications.map((m) => '- ' + m).join('\n')}

[A] ASSESSMENT (Self-Reported Log & ICMR Benchmark):
- Blood Pressure: ${sysBP}/${diaBP} mmHg
- Fasting Glucose: ${glucoseVal} mg/dL
- HbA1c: ${hba1cVal}%

[R] RECOMMENDATION & QUESTIONS:
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;

    navigator.clipboard.writeText(briefText);
    setCopiedSuccess(true);
    onShowToast?.(
      'SBAR Dossier Copied',
      'Structured briefing note copied to clipboard. Ready to paste or share.',
      'success'
    );
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleExportPDF = () => {
    setIsExported(true);
    setTimeout(() => {
      window.print();
      setIsExported(false);
    }, 400);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto gap-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#131b2e] border border-white/5 flex items-center justify-between flex-wrap gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#4cd7f6]/15 text-[#4cd7f6] flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-[26px]">clinical_notes</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#dae2fd]">
                {language === 'hi' ? 'डॉक्टर प्रेप स्टूडियो' : 'Doctor Prep Studio'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#4cd7f6]/15 text-[#4cd7f6] text-[10px] font-semibold">
                WHO &amp; NABH SBAR Template
              </span>
            </div>
            <p className="text-xs text-[#958ea0]">
              Customizable pre-consultation clinical briefing dossier for out-patient consultations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleCopyBrief}
            className="px-3.5 py-2 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-[#4cd7f6] text-xs font-semibold flex items-center gap-1.5 border border-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>{copiedSuccess ? 'Copied to Clipboard!' : 'Copy Clinical Brief'}</span>
          </button>
          <button
            type="button"
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_16px_rgba(160,120,255,0.3)] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>{isExported ? 'Preparing...' : 'Export SBAR PDF'}</span>
          </button>
        </div>
      </div>

      {/* Structured Dossier Container (Printable) */}
      <div className="rounded-2xl bg-[#171f33]/90 border border-white/10 p-6 md:p-8 shadow-2xl space-y-6">
        {/* Clinician Card Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-[#131b2e] border border-white/5 text-xs">
          <div>
            <span className="text-[#958ea0] block uppercase tracking-wider text-[10px]">Patient Profile</span>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="bg-transparent font-semibold text-white text-sm w-full border-b border-transparent hover:border-white/20 focus:border-[#4cd7f6] outline-none transition-colors"
            />
            <span className="text-[#4fdbc8] block font-mono text-[11px] mt-0.5">ABHA: 91-4421-8890-4491 [Demo ID]</span>
          </div>
          <div>
            <span className="text-[#958ea0] block uppercase tracking-wider text-[10px]">Consulting Physician</span>
            <input
              type="text"
              value={physician}
              onChange={(e) => setPhysician(e.target.value)}
              className="bg-transparent font-semibold text-white text-sm w-full border-b border-transparent hover:border-white/20 focus:border-[#4cd7f6] outline-none transition-colors"
            />
            <span className="text-[#4cd7f6] block text-[11px] mt-0.5">OPD Room 204 • Endocrinology</span>
          </div>
          <div>
            <span className="text-[#958ea0] block uppercase tracking-wider text-[10px]">Consultation Window</span>
            <input
              type="text"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="bg-transparent font-semibold text-white text-sm w-full border-b border-transparent hover:border-white/20 focus:border-[#4cd7f6] outline-none transition-colors"
            />
            <span className="text-[#d0bcff] block text-[11px] mt-0.5">Pre-visit Dossier Validated</span>
          </div>
        </div>

        {/* SBAR Sections */}
        {/* S - Situation */}
        <div className="p-4 rounded-xl bg-[#131b2e]/60 border border-white/5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#4cd7f6]/20 text-[#4cd7f6] font-bold text-xs font-mono">
              [S] SITUATION
            </span>
            <label htmlFor="chief-complaint-input" className="text-xs text-[#dae2fd] font-semibold">
              Chief Complaint &amp; Presentation
            </label>
          </div>
          <textarea
            id="chief-complaint-input"
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            rows={2}
            className="w-full bg-[#060e20] text-[#dae2fd] text-xs p-3 rounded-lg border border-white/10 focus:ring-1 focus:ring-[#4cd7f6] outline-none transition-colors"
          />
        </div>

        {/* B - Background */}
        <div className="p-4 rounded-xl bg-[#131b2e]/60 border border-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#d0bcff]/20 text-[#d0bcff] font-bold text-xs font-mono">
              [B] BACKGROUND
            </span>
            <span className="text-xs text-[#dae2fd] font-semibold">Medical History &amp; Current Regimen</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#060e20] border border-white/5 space-y-2">
              <span className="text-[#958ea0] text-[10px] uppercase font-semibold block">
                Active Medications (Click ✕ to remove)
              </span>
              <ul className="space-y-1.5 text-[#dae2fd]">
                {medications.map((med, idx) => (
                  <li key={idx} className="flex items-center justify-between gap-2 p-1.5 rounded bg-[#131b2e] border border-white/5">
                    <span className="text-[11px]">{med}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMed(idx)}
                      className="text-[#ffb4ab] hover:text-white p-0.5"
                      title="Remove medication"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </li>
                ))}
              </ul>
              <form onSubmit={handleAddMed} className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="Add medication (e.g., Atorvastatin 10mg OD)"
                  value={newMedInput}
                  onChange={(e) => setNewMedInput(e.target.value)}
                  className="flex-1 bg-[#131b2e] text-[11px] px-2.5 py-1.5 rounded border border-white/10 focus:ring-1 focus:ring-[#4cd7f6] outline-none"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1.5 bg-[#4cd7f6]/20 text-[#4cd7f6] hover:bg-[#4cd7f6]/30 rounded font-semibold text-[11px]"
                >
                  Add
                </button>
              </form>
            </div>

            <div className="p-3.5 rounded-xl bg-[#060e20] border border-white/5 space-y-2">
              <span className="text-[#958ea0] text-[10px] uppercase font-semibold block">
                Comorbidities &amp; Documented Allergies
              </span>
              <p className="text-[#dae2fd] text-[11px] leading-relaxed">
                Type 2 Diabetes Mellitus (dx 2023), Essential Hypertension (dx 2024). No documented adverse drug reactions (NKDA).
              </p>
              <div className="pt-2 text-[10px] text-[#958ea0]">
                Standard FHIR resource mapping: Condition.code: ICD-11: 5A11 &amp; BA00.
              </div>
            </div>
          </div>
        </div>

        {/* A - Assessment */}
        <div className="p-4 rounded-xl bg-[#131b2e]/60 border border-white/5 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#4fdbc8]/20 text-[#4fdbc8] font-bold text-xs font-mono">
                [A] ASSESSMENT
              </span>
              <span className="text-xs text-[#dae2fd] font-semibold">
                Self-Reported Vitals &amp; Reference Baseline
              </span>
            </div>
            <span className="text-[10px] text-[#958ea0]">Editable for patient consult</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#060e20] border border-white/5 flex flex-col justify-between">
              <label htmlFor="sys-bp-input" className="text-[#958ea0] block text-[10px]">Systolic (mmHg)</label>
              <input
                id="sys-bp-input"
                type="number"
                value={sysBP}
                onChange={(e) => setSysBP(e.target.value)}
                className="text-lg font-bold text-[#dae2fd] font-mono bg-transparent w-full border-b border-transparent focus:border-[#4cd7f6] outline-none"
              />
              <span className="text-[#4fdbc8] text-[10px] mt-1">Target: &lt;130 mmHg</span>
            </div>
            <div className="p-3 rounded-lg bg-[#060e20] border border-white/5 flex flex-col justify-between">
              <label htmlFor="dia-bp-input" className="text-[#958ea0] block text-[10px]">Diastolic (mmHg)</label>
              <input
                id="dia-bp-input"
                type="number"
                value={diaBP}
                onChange={(e) => setDiaBP(e.target.value)}
                className="text-lg font-bold text-[#dae2fd] font-mono bg-transparent w-full border-b border-transparent focus:border-[#4cd7f6] outline-none"
              />
              <span className="text-[#4fdbc8] text-[10px] mt-1">Target: &lt;80 mmHg</span>
            </div>
            <div className="p-3 rounded-lg bg-[#060e20] border border-white/5 flex flex-col justify-between">
              <label htmlFor="glucose-input" className="text-[#958ea0] block text-[10px]">Fasting Glucose (mg/dL)</label>
              <input
                id="glucose-input"
                type="number"
                value={glucoseVal}
                onChange={(e) => setGlucoseVal(e.target.value)}
                className="text-lg font-bold text-[#dae2fd] font-mono bg-transparent w-full border-b border-transparent focus:border-[#4cd7f6] outline-none"
              />
              <span className="text-[#4fdbc8] text-[10px] mt-1">Target: 70–99 mg/dL</span>
            </div>
            <div className="p-3 rounded-lg bg-[#060e20] border border-white/5 flex flex-col justify-between">
              <label htmlFor="hba1c-input" className="text-[#958ea0] block text-[10px]">HbA1c Lab (%)</label>
              <input
                id="hba1c-input"
                type="text"
                value={hba1cVal}
                onChange={(e) => setHba1cVal(e.target.value)}
                className="text-lg font-bold text-[#4cd7f6] font-mono bg-transparent w-full border-b border-transparent focus:border-[#4cd7f6] outline-none"
              />
              <span className="text-[#958ea0] text-[10px] mt-1">Target: &lt;7.0%</span>
            </div>
          </div>
        </div>

        {/* R - Recommendation */}
        <div className="p-4 rounded-xl bg-[#131b2e]/60 border border-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#a078ff]/20 text-[#d0bcff] font-bold text-xs font-mono">
              [R] RECOMMENDATION
            </span>
            <span className="text-xs text-[#dae2fd] font-semibold">
              Prioritized Inquiries for Attending Physician
            </span>
          </div>

          <ul className="space-y-1.5 text-xs text-[#cbc3d7]">
            {questions.map((q, idx) => (
              <li key={idx} className="flex items-center justify-between gap-2 p-2 rounded bg-[#060e20] border border-white/5">
                <span>
                  <strong className="text-white font-mono mr-1.5">{idx + 1}.</strong> {q}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(idx)}
                  className="text-[#ffb4ab] hover:text-white p-0.5"
                  title="Remove question"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddQuestion} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              placeholder="Add clinical inquiry (e.g., Inquire about calcium supplementation dosage)"
              value={newQuestionInput}
              onChange={(e) => setNewQuestionInput(e.target.value)}
              className="flex-1 bg-[#060e20] text-xs px-3 py-2 rounded-lg border border-white/10 focus:ring-1 focus:ring-[#a078ff] outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#a078ff]/20 text-[#d0bcff] hover:bg-[#a078ff]/30 rounded-lg font-semibold text-xs"
            >
              Add Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
