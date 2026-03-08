import React from 'react';
import { motion } from 'motion/react';
import { 
  QrCode
} from 'lucide-react';
import { cn, type TicketData } from '../types';
import { AnimatedIcon } from './AnimatedIcon';

interface TicketProps {
  data: TicketData;
  className?: string;
  id?: string;
}

export const Ticket: React.FC<TicketProps> = ({ data, className, id }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative flex flex-col md:flex-row w-full max-w-2xl overflow-hidden rounded-[2rem] ticket-shadow clay",
        className
      )}
      style={{ backgroundColor: data.color }}
    >
      {/* Left Section (Main Info) */}
      <div className="flex-1 p-8 border-r-2 border-dashed border-black/10 relative">
        {/* Decorative Punches */}
        <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#fafafa] z-10" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#fafafa] z-10" />

        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 text-xs font-bold uppercase tracking-widest">
            <AnimatedIcon name={data.icon as any} size={14} style={{ color: data.accentColor }} />
            <span>{data.subtitle}</span>
          </div>
          <div className="text-xs font-mono opacity-50">#MEM-{data.id.slice(0, 6)}</div>
        </div>

        <h2 className="font-retro text-3xl md:text-4xl mb-4 leading-tight" style={{ color: data.accentColor }}>
          {data.title}
        </h2>

        <div className="grid grid-cols-2 gap-x-12 gap-y-8 mt-10">
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-40 font-bold leading-none">Location</div>
            <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight tabular-nums">
              <AnimatedIcon name="MapPin" size={16} className="opacity-50 shrink-0" />
              <span className="truncate">{data.location}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-40 font-bold leading-none">Date</div>
            <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight tabular-nums">
              <AnimatedIcon name="Calendar" size={16} className="opacity-50 shrink-0" />
              <span>{data.date}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-[0.25em] opacity-40 font-bold leading-none">Time</div>
            <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight tabular-nums">
              <AnimatedIcon name="Clock" size={16} className="opacity-50 shrink-0" />
              <span>{data.time}</span>
            </div>
          </div>
          {data.seat && (
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-[0.25em] opacity-40 font-bold leading-none">Seat</div>
              <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight tabular-nums">
                <span className="bg-black/5 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">{data.seat}</span>
              </div>
            </div>
          )}
          {data.gate && (
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-[0.25em] opacity-40 font-bold leading-none">Gate</div>
              <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight tabular-nums">
                <span className="bg-black/5 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">{data.gate}</span>
              </div>
            </div>
          )}
          {data.platform && (
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-[0.25em] opacity-40 font-bold leading-none">Platform</div>
              <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight tabular-nums">
                <span className="bg-black/5 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">{data.platform}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section (Stub) */}
      <div className="w-full md:w-52 p-8 bg-black/5 flex flex-col justify-between items-center relative border-l border-dashed border-black/10">
        <div className="text-center space-y-2">
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">Admit One</div>
          <div className="font-retro text-3xl tracking-tighter leading-none" style={{ color: data.accentColor }}>STUB</div>
        </div>

        <div className="my-8 p-3 bg-white/40 rounded-[1.5rem] clay">
          <QrCode size={80} className="opacity-60" />
        </div>

        <div className="w-full space-y-3">
          <div className="font-barcode text-6xl text-center opacity-50 leading-none tracking-[0.1em]">
            {data.id.slice(0, 8).toUpperCase()}
          </div>
          <div className="text-[8px] text-center font-mono opacity-20 tracking-[0.5em] uppercase font-bold">
            Memory Stub
          </div>
        </div>
      </div>
    </motion.div>
  );
};
