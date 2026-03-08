import React from 'react';
import { type TicketData, type TicketType, TEMPLATES } from '../types';
import { AnimatedIcon } from './AnimatedIcon';

interface EditorProps {
  data: TicketData;
  onChange: (data: TicketData) => void;
  onGenerate: () => void;
}

export const Editor: React.FC<EditorProps> = ({ data, onChange, onGenerate }) => {
  const handleChange = (field: keyof TicketData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const setTemplate = (type: TicketType) => {
    const template = TEMPLATES[type];
    onChange({
      ...data,
      ...template,
      type,
    } as TicketData);
  };

  return (
    <div className="clay p-6 space-y-8">
      <div className="flex items-center gap-2 mb-4">
        <AnimatedIcon name="Sparkles" className="text-pink-500" size={20} />
        <h3 className="font-display font-bold text-xl">Customize Your Stub</h3>
      </div>

      {/* Template Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest opacity-50">Choose Style</label>
        <div className="grid grid-cols-4 gap-2">
          {(['movie', 'show', 'train', 'plane'] as TicketType[]).map((type) => (
            <button
              key={type}
              onClick={() => setTemplate(type)}
              className={`p-3 rounded-xl transition-all clay ${
                data.type === type 
                  ? 'bg-white scale-105 ring-2 ring-pink-200' 
                  : 'hover:bg-white/50'
              }`}
            >
              <div className="text-xs capitalize font-medium">{type}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-1">
            <AnimatedIcon name="Type" size={12} /> Event Title
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full bg-white/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200 transition-all clay"
            placeholder="What happened?"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-1">
              <AnimatedIcon name="Calendar" size={12} /> Date
            </label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full bg-white/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200 transition-all clay"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-1">
              <AnimatedIcon name="Clock" size={12} /> Time
            </label>
            <input
              type="time"
              value={data.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="w-full bg-white/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200 transition-all clay"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-1">
            <AnimatedIcon name="MapPin" size={12} /> Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full bg-white/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200 transition-all clay"
            placeholder="Where were you?"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-1">
            <AnimatedIcon name="Palette" size={12} /> Colors
          </label>
          <div className="flex gap-4">
            <div className="flex-1 space-y-1">
              <div className="text-[10px] opacity-50">Background</div>
              <input
                type="color"
                value={data.color}
                onChange={(e) => handleChange('color', e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border-none bg-transparent clay"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-[10px] opacity-50">Accent</div>
              <input
                type="color"
                value={data.accentColor}
                onChange={(e) => handleChange('accentColor', e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border-none bg-transparent clay"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onGenerate}
        className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-200 hover:scale-[1.02] active:clay-pressed transition-all flex items-center justify-center gap-2 clay"
      >
        <AnimatedIcon name="TicketIcon" size={18} />
        Generate Ticket
      </button>
    </div>
  );
};
