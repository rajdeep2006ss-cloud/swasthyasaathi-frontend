import React, { useState } from 'react';
import { HealthGuide, Language } from '../types';

interface HealthLibraryViewProps {
  language: Language;
  onShowToast?: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const HealthLibraryView: React.FC<HealthLibraryViewProps> = ({ language, onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeGuide, setActiveGuide] = useState<HealthGuide | null>(null);

  const categories = ['All', 'Metabolic & Diabetes', 'Vector Surveillance', 'Cardiology', 'Nutritional Medicine'];

  const guides: HealthGuide[] = [
    {
      id: 'g1',
      title: 'Managing HbA1c with Traditional Indian Diets',
      titleHi: 'पारंपरिक भारतीय आहार के साथ HbA1c का प्रबंधन',
      category: 'Metabolic & Diabetes',
      summary:
        'Strategic substitution of polished refined rice with Millets (Bajra, Jowar, Ragi) and pulse rotation to suppress postprandial glycemic spikes.',
      summaryHi:
        'रिफाइंड चावल के स्थान पर बाजरा, ज्वार और रागी का उपयोग करके भोजन के बाद ब्लड शुगर स्पाइक्स को कम करने की आईसीएमआर मार्गदर्शिका।',
      readTime: '6 min read',
      certifiedBy: 'ICMR National Institute of Nutrition',
    },
    {
      id: 'g2',
      title: 'Seasonal Vector Surge: Dengue & Chikungunya Protocol',
      titleHi: 'मौसमी मच्छर जनित रोग: डेंगू और चिकनगुनिया प्रोटोकॉल',
      category: 'Vector Surveillance',
      summary:
        'Complete triage algorithm for platelet monitoring (NS1 antigen, IgM/IgG), hydration maintenance, and critical warning signs requiring immediate hospitalization.',
      summaryHi:
        'प्लेटलेट निगरानी, मौखिक पुनर्जलीकरण (ORS) और आपातकालीन चेतावनी संकेतों के लिए संपूर्ण नैदानिक एल्गोरिदम।',
      readTime: '8 min read',
      certifiedBy: 'National Centre for Disease Control (NCDC)',
    },
    {
      id: 'g3',
      title: 'Hypertension Management & Salt Reduction in Desi Cooking',
      titleHi: 'उच्च रक्तचाप प्रबंधन और घरेलू भोजन में सोडियम नियंत्रण',
      category: 'Cardiology',
      summary:
        'Practical culinary interventions to reduce daily sodium intake below 5 grams while maintaining flavor using coriander, cumin, amchur, and lemon.',
      summaryHi:
        'दैनिक सोडियम सेवन को 5 ग्राम से कम रखने के लिए जीरा, अमचूर और नींबू जैसे प्राकृतिक मसालों के उपयोग की वैज्ञानिक विधि।',
      readTime: '5 min read',
      certifiedBy: 'Cardiological Society of India (CSI)',
    },
    {
      id: 'g4',
      title: 'Understanding Drug Interactions: Metformin & Common OTC Drugs',
      titleHi: 'दवाओं का पारस्परिक प्रभाव: मेटफॉर्मिन और सामान्य दवाएं',
      category: 'Metabolic & Diabetes',
      summary:
        'Clinical guidance on avoiding NSAIDs (Ibuprofen) without renal monitoring and managing alcohol and fasting while taking biguanides.',
      summaryHi:
        'मेटफॉर्मिन के साथ दर्दनिवारक (NSAIDs) और एसिडिटी की दवाओं के सुरक्षित उपयोग पर विशेषज्ञ सलाह।',
      readTime: '7 min read',
      certifiedBy: 'Pharmacy Council of India & NABH',
    },
  ];

  const filteredGuides = guides.filter((g) => {
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    const matchesSearch =
      g.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      g.titleHi.includes(searchFilter) ||
      g.summary.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto gap-6 pb-12">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#131b2e] border border-white/5 flex items-center justify-between flex-wrap gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#4fdbc8]/15 text-[#4fdbc8] flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-[26px]">menu_book</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#dae2fd]">
                {language === 'hi' ? 'स्वास्थ्य पुस्तकालय' : 'Clinical Health Library'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#4fdbc8]/15 text-[#4fdbc8] text-[10px] font-semibold">
                350+ Peer-Reviewed Pamphlets
              </span>
            </div>
            <p className="text-xs text-[#958ea0]">
              ICMR &amp; NCDC validated patient educational literature and dietary playbooks
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#958ea0] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search guides, diets, symptoms..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#060e20] text-xs text-white border border-white/10 focus:ring-1 focus:ring-[#4fdbc8] outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#4fdbc8] text-[#003731] font-semibold shadow-[0_0_12px_rgba(79,219,200,0.4)]'
                : 'bg-[#131b2e] text-[#cbc3d7] hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="p-5 rounded-2xl bg-[#131b2e] border border-white/5 hover:border-[#4fdbc8]/30 shadow-lg flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="px-2 py-0.5 rounded-full bg-[#222a3d] text-[#4cd7f6] font-medium">
                  {guide.category}
                </span>
                <span className="text-[#958ea0]">{guide.readTime}</span>
              </div>
              <h3 className="text-base font-semibold text-[#dae2fd] group-hover:text-[#4fdbc8] transition-colors">
                {language === 'hi' ? guide.titleHi : guide.title}
              </h3>
              <p className="text-xs text-[#cbc3d7] mt-2 leading-relaxed">
                {language === 'hi' ? guide.summaryHi : guide.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#4fdbc8] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                {guide.certifiedBy}
              </span>
              <button
                onClick={() => setActiveGuide(guide)}
                className="px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#4fdbc8] hover:text-[#003731] text-[#dae2fd] text-xs font-medium transition-all flex items-center gap-1"
              >
                <span>Read Full Guide</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Detail Modal */}
      {activeGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="guide-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div className="w-full max-w-2xl bg-[#171f33] border border-white/10 rounded-2xl p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveGuide(null)}
              aria-label="Close modal"
              className="absolute right-4 top-4 text-[#958ea0] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#4fdbc8]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <span className="px-2.5 py-0.5 rounded-full bg-[#4fdbc8]/15 text-[#4fdbc8] text-xs font-semibold">
              {activeGuide.category}
            </span>
            <h2 id="guide-modal-title" className="text-xl font-bold text-white mt-2">
              {language === 'hi' ? activeGuide.titleHi : activeGuide.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#958ea0] my-3">
              <span>{activeGuide.certifiedBy}</span>
              <span>•</span>
              <span>{activeGuide.readTime}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#131b2e] border border-white/5 text-xs text-[#cbc3d7] space-y-3 leading-relaxed">
              <p className="text-white font-medium text-sm">
                {language === 'hi' ? activeGuide.summaryHi : activeGuide.summary}
              </p>
              <h4 className="text-xs uppercase tracking-wider text-[#4cd7f6] font-bold">Key Clinical Takeaways:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Ground meal timings with regular circadian intervals (12-hour fasting window overnight).</li>
                <li>Hydrate with minimum 2.5L water daily to reduce nephrotoxic metabolite buildup.</li>
                <li>Coordinate laboratory telemetry every 90 days with your assigned Ayushman / ABHA physician.</li>
              </ul>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveGuide(null)}
                className="px-4 py-2 rounded-xl bg-[#222a3d] text-[#cbc3d7] hover:text-white text-xs font-semibold transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onShowToast?.(
                    'Clinical Handout Exported',
                    `"${activeGuide.title}" has been prepared for patient printing and offline reading.`,
                    'success'
                  );
                  setActiveGuide(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#4fdbc8] text-[#003731] font-bold text-xs hover:brightness-105 shadow-md flex items-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-[#4fdbc8]"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download Patient Handout (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
