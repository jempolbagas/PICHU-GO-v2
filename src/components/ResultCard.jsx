// src/components/ResultCard.jsx
import React from 'react';
import { Copy, Check, Scissors } from 'lucide-react';

export default function ResultCard({ result, isKr }) {
    const [copied, setCopied] = React.useState(false);

    const themeColor = isKr ? 'bg-[#FFDEE9]' : 'bg-[#E2F0CB]';
    const textColor = isKr ? 'text-[#D65D7A]' : 'text-[#5A9E48]';
    const darkText = isKr ? 'text-[#B83280]' : 'text-[#386641]';

    const handleCopy = () => {
        navigator.clipboard.writeText(`Rp ${result.total.toLocaleString('id-ID')}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`w-full ${themeColor} rounded-2xl p-6 relative shadow-lg transform rotate-1 transition-all hover:rotate-0`}>
            {/* Tape Detail at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 backdrop-blur-sm rotate-[-2deg] shadow-sm"></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6 border-b-2 border-dashed border-white/50 pb-4">
                <div>
                    <h3 className={`text-sm font-bold uppercase tracking-widest ${textColor} opacity-80`}>
                        Total Est.
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-1">*Excludes tax/ems</p>
                </div>
                <button
                    onClick={handleCopy}
                    className="bg-white/60 p-2 rounded-full hover:bg-white text-gray-500 transition-all shadow-sm"
                >
                    {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16} />}
                </button>
            </div>

            {/* Big Number */}
            <div className="text-center mb-8">
                <h2 className={`text-5xl font-black ${darkText} tracking-tight`}>
                    <span className="text-lg font-bold opacity-60 mr-1">Rp</span>
                    {result.total.toLocaleString('id-ID')}
                </h2>
            </div>

            {/* Cut Line Decoration */}
            <div className="flex items-center gap-2 text-gray-400 opacity-50 mb-6">
                <Scissors size={14} />
                <div className="h-px w-full bg-current border-t border-dashed"></div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg">
                    <span className={`text-xs font-bold ${textColor}`}>ITEM PRICE</span>
                    <span className={`font-bold ${darkText}`}>
             {result.itemPrice.toLocaleString('id-ID')}
           </span>
                </div>
                <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg">
                    <span className={`text-xs font-bold ${textColor}`}>FEES</span>
                    <span className={`font-bold ${darkText}`}>
             {result.fees.toLocaleString('id-ID')}
           </span>
                </div>
            </div>

        </div>
    );
}