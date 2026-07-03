import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplet, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Settings, 
  Send,
  Info,
  Waves,
  RefreshCw,
  X
} from 'lucide-react';

// Static image imports for production-ready asset bundling
import villageWaterTank from '../assets/images/village_water_tank_1782695160908.jpg';

import { WaterZoneSchedule, WaterAnnouncement } from '../types';

interface WaterProps {
  schedules: WaterZoneSchedule[];
  setSchedules: React.Dispatch<React.SetStateAction<WaterZoneSchedule[]>>;
  announcements: WaterAnnouncement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<WaterAnnouncement[]>>;
}

export default function WaterManagement({ schedules, setSchedules, announcements, setAnnouncements }: WaterProps) {
  // Admin simulation states
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [selectedZoneToEdit, setSelectedZoneToEdit] = useState<string>(schedules[0]?.id || '');
  const [newTiming, setNewTiming] = useState('');
  const [newStatus, setNewStatus] = useState<WaterZoneSchedule['status']>('Active');
  const [newFlow, setNewFlow] = useState(40);
  const [newReservoir, setNewReservoir] = useState(80);

  // Announcement posting form
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [annType, setAnnType] = useState<'warning' | 'info' | 'success'>('info');

  // Trigger admin schedule update
  const handleUpdateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTiming) {
      alert('Please enter water release timing.');
      return;
    }

    setSchedules(prev => prev.map(s => {
      if (s.id === selectedZoneToEdit) {
        return {
          ...s,
          timing: newTiming,
          status: newStatus,
          flowRate: newStatus === 'Active' ? newFlow : 0,
          reservoirLevel: newReservoir,
          lastUpdated: 'Updated'
        };
      }
      return s;
    }));

    setNewTiming('');
    alert('Water release schedule has been updated and broadcasted!');
  };

  // Trigger announcement submit
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const newAnn: WaterAnnouncement = {
      id: `ANN-${Math.floor(100 + Math.random() * 900)}`,
      title: annTitle,
      message: annMessage,
      type: annType,
      date: new Date().toISOString().split('T')[0]
    };

    setAnnouncements([newAnn, ...announcements]);
    setAnnTitle('');
    setAnnMessage('');
    alert('Public water bulletin published!');
  };

  const getStatusClass = (status: WaterZoneSchedule['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-950/50 text-accent-blue border-accent-blue/30 font-bold';
      case 'Upcoming':
        return 'bg-emerald-950/50 text-emerald-400 border-emerald-900/30';
      case 'Completed':
        return 'bg-navy-dark text-slate-400 border-accent-blue/10';
      case 'Delayed':
        return 'bg-rose-950/50 text-rose-400 border-rose-900/30';
      default:
        return 'bg-navy-dark text-slate-300';
    }
  };

  const activeReleases = schedules.filter(s => s.status === 'Active');
  const avgReservoir = Math.round(schedules.reduce((acc, curr) => acc + curr.reservoirLevel, 0) / schedules.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-navy-dark text-slate-200">
      
      {/* HEADER BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-light p-6 sm:p-8 border border-accent-blue/20 shadow-xl">
        <div className="absolute bottom-0 right-0 w-[240px] h-[240px] bg-accent-blue/5 rounded-full blur-[60px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-bold font-mono uppercase bg-accent-blue/10 text-accent-blue px-3 py-1 rounded-full border border-accent-blue/20">
              GVMC Municipal Water Works
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Municipal Water Timings
            </h1>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Daily GVMC municipal tap water release schedules, valve status, and overhead reservoir storage levels for local wards.
            </p>
          </div>
          <button 
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-accent-blue hover:bg-accent-cyan text-navy-dark transition-all self-start md:self-center shrink-0 cursor-pointer shadow-md"
          >
            <Settings className="w-3.5 h-3.5 animate-spin-slow" />
            {showAdminPanel ? 'Close GVMC Valve Admin' : 'Open GVMC Valve Admin'}
          </button>
        </div>
      </div>

      {/* RESERVOIR & STATUS COUNTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Reservoir Capacity Card */}
        <div className="lg:col-span-5 bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-accent-blue animate-pulse" />
                <h3 className="text-xs font-bold font-display text-white uppercase tracking-wider">GVMC Overhead Tank</h3>
              </div>
              <span className="text-[9px] font-mono font-bold bg-navy-dark text-accent-cyan px-2 py-0.5 rounded border border-accent-blue/15">
                Purity: 180 ppm (Safe & Certified)
              </span>
            </div>

            {/* Liquid Tank */}
            <div className="relative h-40 bg-navy-dark rounded-xl border border-accent-blue/20 overflow-hidden mt-2">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent-blue/70 to-accent-cyan/40 transition-all duration-1000 ease-out"
                style={{ height: `${avgReservoir}%` }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-white/20" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-3 z-10 pointer-events-none">
                <div className="flex justify-between items-start text-[9px] font-mono text-slate-400">
                  <span>100k Liters Cap</span>
                  <span>Avg Level</span>
                </div>
                
                <div className="text-center">
                  <span className="text-3xl font-extrabold font-mono text-white">
                    {avgReservoir}%
                  </span>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
                    Storage Capacity
                  </p>
                </div>

                <div className="flex justify-between items-end text-[9px] font-bold text-accent-blue">
                  <span>GVMC Zonal Storage Tank</span>
                  <span>Pressure Certified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-navy-dark/40 mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>GVMC Release Flow:</span>
            <span className="font-bold text-accent-blue flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping"></span>
              {activeReleases.length > 0 ? `${activeReleases.reduce((acc, curr) => acc + curr.flowRate, 0)} L/sec Flow` : 'Standby Mode'}
            </span>
          </div>
        </div>

        {/* Reservoir Image with alternating text block */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-accent-blue/15 shadow-lg relative min-h-[180px]">
          <img 
            src={villageWaterTank} 
            alt="Water reservoir tank infrastructure" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            <h3 className="text-sm font-bold text-white font-display">Municipal Water Distribution</h3>
            <p className="text-[11px] text-slate-300 max-w-md">
              Monitor daily water supply, check active pipeline releases, and view official maintenance announcements.
            </p>
          </div>
        </div>

      </div>

      {/* VALVE ADMINISTRATION CONTROL PANEL */}
      <AnimatePresence>
        {showAdminPanel && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-navy-light text-white rounded-2xl border border-accent-blue/30 shadow-lg p-6 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-navy-dark pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-accent-blue animate-spin-slow" />
                <h3 className="text-sm font-bold font-display">GVMC Valve Administration Control</h3>
              </div>
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="p-1 rounded bg-navy-dark text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Form 1: Modify Release Schedule */}
              <form onSubmit={handleUpdateSchedule} className="space-y-4 bg-navy-dark p-4 rounded-xl border border-accent-blue/10">
                <h4 className="text-xs font-bold text-accent-blue uppercase tracking-wider font-mono">
                  Update Municipal Water Timing
                </h4>
                
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">Select GVMC Ward/Zone</label>
                  <select 
                    value={selectedZoneToEdit}
                    onChange={(e) => setSelectedZoneToEdit(e.target.value)}
                    className="w-full bg-navy-light border border-accent-blue/20 rounded-lg p-2 text-xs text-white"
                  >
                    {schedules.map(s => (
                      <option key={s.id} value={s.id}>{s.zone} ({s.id})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">Water Release Timing</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. 05:00 PM - 06:30 PM"
                      value={newTiming}
                      onChange={(e) => setNewTiming(e.target.value)}
                      className="w-full bg-navy-light border border-accent-blue/20 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">Supply Status</label>
                    <select 
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as WaterZoneSchedule['status'])}
                      className="w-full bg-navy-light border border-accent-blue/20 rounded-lg p-2 text-xs text-white"
                    >
                      <option value="Active">Active (Water Supplying)</option>
                      <option value="Upcoming">Upcoming (Scheduled)</option>
                      <option value="Delayed">Delayed (Postponed)</option>
                      <option value="Completed">Completed (Closed)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">Flow Rate (L/s)</label>
                    <input 
                      type="number"
                      min={0}
                      max={120}
                      value={newFlow}
                      onChange={(e) => setNewFlow(Number(e.target.value))}
                      className="w-full bg-navy-light border border-accent-blue/20 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">Reservoir %</label>
                    <input 
                      type="number"
                      min={0}
                      max={100}
                      value={newReservoir}
                      onChange={(e) => setNewReservoir(Number(e.target.value))}
                      className="w-full bg-navy-light border border-accent-blue/20 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2 rounded-lg text-xs font-bold bg-accent-blue hover:bg-accent-cyan text-navy-dark transition-all cursor-pointer"
                >
                  Update Water Schedule
                </button>
              </form>

              {/* Form 2: Post Public Announcement */}
              <form onSubmit={handleAddAnnouncement} className="space-y-4 bg-navy-dark p-4 rounded-xl border border-accent-blue/10">
                <h4 className="text-xs font-bold text-accent-cyan uppercase tracking-wider font-mono">
                  Publish Water Notice / Announcement
                </h4>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">Bulletin Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Chlorination Cleaning Cycle"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    className="w-full bg-navy-light border border-accent-blue/20 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">Message Detail</label>
                  <textarea 
                    required
                    rows={2}
                    placeholder="Provide details about pipeline status..."
                    value={annMessage}
                    onChange={(e) => setAnnMessage(e.target.value)}
                    className="w-full bg-navy-light border border-accent-blue/20 rounded-lg p-2 text-xs text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">Alert Level</label>
                  <select 
                    value={annType}
                    onChange={(e) => setAnnType(e.target.value as any)}
                    className="w-full bg-navy-light border border-accent-blue/20 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="info">Info (Blue)</option>
                    <option value="warning">Warning (Orange)</option>
                    <option value="success">Success (Green)</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2 rounded-lg text-xs font-bold bg-accent-cyan hover:bg-accent-blue text-navy-dark transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  Publish Water Notice
                </button>
              </form>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTIVE SCHEDULE CARDS GRID */}
      <div className="space-y-4">
        <h3 className="text-base font-bold font-display text-white">GVMC Ward Water Schedules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedules.map((s) => (
            <div 
              key={s.id} 
              className="bg-navy-light border border-accent-blue/15 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-mono font-bold text-slate-400">{s.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-semibold border ${getStatusClass(s.status)}`}>
                    {s.status}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm leading-tight mb-2">
                  {s.zone}
                </h4>

                <div className="space-y-1.5 mt-3 text-xs text-slate-300">
                  <div className="flex justify-between items-center py-1 border-b border-navy-dark/40">
                    <span className="text-slate-400">Supply Time:</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-accent-blue" />
                      {s.timing}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-navy-dark/40">
                    <span className="text-slate-400">Pump Flow:</span>
                    <span className="font-mono font-bold text-white">
                      {s.flowRate} L/sec
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Frequency:</span>
                    <span className="text-white font-medium">
                      {s.frequency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-dark/40 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 text-accent-blue" />
                  {s.lastUpdated === 'Just now by Admin' ? 'Just now' : 'Schedule Standby'}
                </span>
                <span className="font-semibold text-accent-blue">{s.reservoirLevel}% Pressure</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ANNOUNCEMENT BOARD PANEL */}
      <div className="bg-navy-light text-white rounded-2xl border border-accent-blue/15 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-accent-blue animate-pulse" />
          <h3 className="text-sm font-bold font-display uppercase tracking-wider">GVMC Water Supply Bulletins</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((ann) => (
            <div 
              key={ann.id} 
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                ann.type === 'warning' 
                  ? 'bg-amber-950/20 border-amber-500/20 text-amber-100'
                  : ann.type === 'success'
                  ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-100'
                  : 'bg-blue-950/20 border-accent-blue/20 text-blue-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-slate-400">{ann.id}</span>
                  <span className="text-[9px] font-mono text-slate-500">{ann.date}</span>
                </div>
                <h4 className="font-bold text-xs text-white mb-1.5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-accent-blue" />
                  {ann.title}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  {ann.message}
                </p>
              </div>
              
              <div className="text-[9px] text-slate-400 font-medium">
                GVMC Water Works Department
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
