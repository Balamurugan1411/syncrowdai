import React from 'react';

export const GlassPanel = ({ children, className = '', title, icon: Icon, subtitle }) => (
  <div className={`glass-panel p-6 flex flex-col ${className}`}>
    {(title || Icon) && (
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-widest flex items-center">
            {Icon && <Icon className="mr-3 text-cyan-400" size={20} />}
            {title}
          </h3>
          {subtitle && <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase">{subtitle}</p>}
        </div>
      </div>
    )}
    {children}
  </div>
);

export const SkeuoCard = ({ children, className = '', label, value, trend, icon: Icon, colorClass = 'text-cyan-400' }) => (
  <div className={`skeuo-card p-4 flex items-center space-x-4 border-white/5 group hover:border-cyan-500/20 ${className}`}>
    {Icon && (
      <div className="p-3 bg-black/40 rounded-lg border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
        <Icon className={colorClass} size={20} />
      </div>
    )}
    <div>
      {label && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>}
      {value && <p className="text-xl font-bold text-white tracking-tight">{value}</p>}
      {trend && <p className="text-[10px] text-emerald-400 font-mono">{trend}</p>}
      {children}
    </div>
  </div>
);
