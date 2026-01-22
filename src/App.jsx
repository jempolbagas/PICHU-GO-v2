// src/App.jsx
import { useState, useEffect } from 'react';
import CalculatorInput from './components/CalculatorInput';
import ResultCard from './components/ResultCard'; // Ensure this import is correct
import { calculateKorea, calculateChina } from './utils/calculator';
import { Sparkles } from 'lucide-react';

export default function App() {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState('KR');
    const [price, setPrice] = useState('');
    const [ongkir, setOngkir] = useState('');
    const [people, setPeople] = useState(1);
    const [result, setResult] = useState({ total: 0, itemPrice: 0, fees: 0 });

    // --- CONFIG ---
    const config = {
        rate_kr: 11.75,
        jasa_tf_kr: 6000,
        admin_go: 6000,
        ongkir_kr_default: 2000,
        rate_ch: 2450,
        jasa_tf_ch: 10000,
        ongkir_ch_default: 100
    };

    const isKr = activeTab === 'KR';

    const adjustValue = (setter, currentVal, step, isFloat = false) => {
        const num = parseFloat(currentVal) || 0;
        const newVal = Math.max(0, num + step);
        setter(isFloat ? newVal.toFixed(2) : Math.round(newVal).toString());
    };

    useEffect(() => {
        const numPrice = parseFloat(price) || 0;
        const numOngkir = ongkir === ''
            ? (isKr ? config.ongkir_kr_default : config.ongkir_ch_default)
            : parseFloat(ongkir);
        const numPeople = parseInt(people) || 1;

        if (isKr) {
            setResult(calculateKorea(numPrice, numOngkir, numPeople, config));
        } else {
            setResult(calculateChina(numPrice, numOngkir, numPeople, config));
        }
    }, [price, ongkir, people, activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPrice('');
        setOngkir('');
        setPeople(1);
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-12 pb-12 px-4 font-sans text-slate-700">

            {/* HEADER: Washi Tape Style */}
            <div className="relative mb-10 rotate-[-2deg]">
                <div className="absolute -inset-1 bg-[#FFB7B2] opacity-30 blur-sm rounded-lg transform rotate-2"></div>
                <h1 className="relative bg-white border-2 border-[#FFB7B2] px-8 py-3 rounded-xl text-3xl font-bold text-[#FF8E88] shadow-[4px_4px_0px_0px_#FFDAC1] flex items-center gap-2">
                    <Sparkles size={24} className="text-[#FFE45E]" fill="#FFE45E"/>
                    Pichu Go Calculator
                </h1>
            </div>

            {/* TABS: Folder Tabs */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => handleTabChange('KR')}
                    className={`px-6 py-3 rounded-t-2xl font-bold text-sm transition-all border-2 border-b-0 ${
                        isKr
                            ? 'bg-[#FFDEE9] border-[#FFB7B2] text-[#D65D7A] translate-y-2'
                            : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'
                    }`}
                >
                    🇰🇷 Korea
                </button>
                <button
                    onClick={() => handleTabChange('CN')}
                    className={`px-6 py-3 rounded-t-2xl font-bold text-sm transition-all border-2 border-b-0 ${
                        !isKr
                            ? 'bg-[#E2F0CB] border-[#B5E48C] text-[#5A9E48] translate-y-2'
                            : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'
                    }`}
                >
                    🇨🇳 China
                </button>
            </div>

            {/* MAIN CONTAINER: Journal Page Look */}
            <div className={`w-full max-w-4xl bg-white rounded-3xl p-8 border-4 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10 ${
                isKr ? 'border-[#FFB7B2]' : 'border-[#E2F0CB]'
            }`}>

                {/* LEFT COL: Inputs */}
                <div className="flex flex-col gap-2">
                    {/* Exchange Rate Sticky Note */}
                    <div className="bg-[#FFF4BD] text-[#D4A017] p-3 rounded-lg mb-6 text-sm font-bold text-center shadow-sm rotate-1 transform w-fit mx-auto border border-[#FFE45E]">
                        📌 Rate: 1 {isKr ? 'KRW' : 'CNY'} = {isKr ? config.rate_kr : config.rate_ch} IDR
                    </div>

                    <CalculatorInput
                        label={isKr ? "Product Price (Won)" : "Product Price (Yuan)"}
                        value={price}
                        onChange={setPrice}
                        placeholder="0.00"
                        color={isKr ? "pink" : "green"}
                        onIncrement={() => adjustValue(setPrice, price, isKr ? 0.01 : 1, isKr)}
                        onDecrement={() => adjustValue(setPrice, price, isKr ? -0.01 : -1, isKr)}
                        helpText="Price per item from the website"
                    />

                    <CalculatorInput
                        label={isKr ? "Local Shipping (Won)" : "Local Shipping (Yuan)"}
                        value={ongkir}
                        onChange={setOngkir}
                        placeholder={isKr ? config.ongkir_kr_default : config.ongkir_ch_default}
                        color={isKr ? "pink" : "green"}
                        onIncrement={() => adjustValue(setOngkir, ongkir || (isKr ? 2000 : 10), isKr ? 500 : 1)}
                        onDecrement={() => adjustValue(setOngkir, ongkir || (isKr ? 2000 : 10), isKr ? -500 : -1)}
                        helpText="Shipping cost to the warehouse"
                    />

                    {/* PEOPLE SLIDER */}
                    <div className="mt-6 bg-[#F8F9FA] p-5 rounded-2xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-bold text-gray-500">
                                Sharing (People)
                            </label>
                            <span className={`text-xl font-bold ${isKr ? 'text-[#FF8E88]' : 'text-[#7CB518]'}`}>
                    {people} <span className="text-xs text-gray-400">pax</span>
                </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={people}
                            onChange={(e) => setPeople(e.target.value)}
                            className="w-full cursor-pointer"
                        />
                    </div>
                </div>

                {/* RIGHT COL: Result Card */}
                <div className="flex items-center">
                    <ResultCard result={result} isKr={isKr} />
                </div>
            </div>
        </div>
    );
}