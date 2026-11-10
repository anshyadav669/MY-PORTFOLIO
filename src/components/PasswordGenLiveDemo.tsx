import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { Copy, Check, RefreshCw, ShieldCheck, ShieldAlert, KeyRound } from 'lucide-react';

export const PasswordGenLiveDemo: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('An$h9NIT#Secur3!');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    sound.playClick();
    let chars = '';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate simulated entropy / strength
  const getStrength = () => {
    let score = 0;
    if (length >= 12) score += 2;
    if (length >= 16) score += 1;
    if (includeUpper && includeLower) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score >= 5) return { label: 'CRIME-PROOF / MILITARY GRADE', color: '#FFD600', width: '100%' };
    if (score >= 3) return { label: 'STRONG', color: '#FFE94A', width: '70%' };
    return { label: 'WEAK / VULNERABLE', color: '#FF3838', width: '35%' };
  };

  const strength = getStrength();

  return (
    <div className="p-5 rounded-xl bg-[#0e0e0e] border border-[#FFD600]/30 font-sans text-white max-w-lg mx-auto">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#FFD600]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
            Interactive Testbench: Password Generator
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFD600]/20 text-[#FFE94A]">
          LIVE ENGINE
        </span>
      </div>

      {/* Generated Password Box */}
      <div className="flex items-center gap-2 p-3 bg-[#171717] rounded-lg border border-white/[0.1] mb-3">
        <input
          type="text"
          readOnly
          value={password}
          className="bg-transparent font-mono text-sm sm:text-base text-[#FFD600] w-full focus:outline-none select-all"
        />
        <button
          onClick={generatePassword}
          title="Regenerate"
          className="p-2 text-neutral-400 hover:text-[#FFD600] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <button
          onClick={copyToClipboard}
          title="Copy Password"
          className="p-2 bg-[#FFD600] text-black rounded font-bold hover:bg-[#FFE94A] transition-colors flex items-center gap-1 text-xs"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Strength Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
          <span className="text-neutral-400">ENTROPY STRENGTH:</span>
          <span style={{ color: strength.color }} className="font-bold">
            {strength.label}
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{ width: strength.width, backgroundColor: strength.color }}
          />
        </div>
      </div>

      {/* Length Slider */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-mono mb-1 text-neutral-300">
          <span>LENGTH:</span>
          <span className="text-[#FFD600] font-bold">{length} CHARACTERS</span>
        </div>
        <input
          type="range"
          min="6"
          max="36"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-[#FFD600] cursor-pointer"
        />
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
            className="accent-[#FFD600]"
          />
          <span>Uppercase [A-Z]</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
            className="accent-[#FFD600]"
          />
          <span>Lowercase [a-z]</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="accent-[#FFD600]"
          />
          <span>Numbers [0-9]</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="accent-[#FFD600]"
          />
          <span>Symbols [!@#$]</span>
        </label>
      </div>
    </div>
  );
};
