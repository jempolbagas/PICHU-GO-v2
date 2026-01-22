// src/components/CalculatorInput.jsx
import React from 'react';
import { Minus, Plus, HelpCircle } from 'lucide-react';

export default function CalculatorInput({
                                            label,
                                            value,
                                            onChange,
                                            onIncrement,
                                            onDecrement,
                                            placeholder,
                                            helpText,
                                            color = "pink"
                                        }) {
    // Dynamic colors based on prop
    const activeColor = color === 'pink' ? 'text-[#FF8E88]' : 'text-[#7CB518]';
    const bgColor = color === 'pink' ? 'bg-[#FFF5F7]' : 'bg-[#F2FBE0]';
    const borderColor = color === 'pink' ? 'focus-within:border-[#FFB7B2]' : 'focus-within:border-[#E2F0CB]';

    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 ml-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</span>
                {helpText && (
                    <div className="group relative">
                        <HelpCircle size={14} className="text-gray-300 cursor-help" />
                        <div className="absolute left-full top-0 ml-2 w-48 bg-gray-700 text-white text-[10px] rounded p-2 hidden group-hover:block z-10 shadow-lg">
                            {helpText}
                        </div>
                    </div>
                )}
            </div>

            <div className={`
        flex items-center p-2 rounded-2xl border-2 border-transparent transition-all
        bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)]
        ${borderColor}
      `}>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`bg-transparent w-full pl-4 font-bold outline-none text-xl placeholder-gray-200 ${activeColor}`}
                />

                <div className="flex items-center gap-1">
                    <button
                        onClick={onDecrement}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${bgColor} ${activeColor} hover:brightness-95 transition-all`}
                    >
                        <Minus size={14} strokeWidth={3} />
                    </button>
                    <button
                        onClick={onIncrement}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${bgColor} ${activeColor} hover:brightness-95 transition-all`}
                    >
                        <Plus size={14} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
}