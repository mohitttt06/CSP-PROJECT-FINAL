import React, { useState } from 'react';
import { Landmark, Shield, Milestone, HeartHandshake, Phone, Mail, MapPin, Send, CheckCircle2, Cpu, FileText, Download } from 'lucide-react';
import { generateTechStackPDF } from '../utils/pdfGenerator';

export default function AboutSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert('Please fill out Name and Message.');
      return;
    }
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const pillars = [
    {
      title: "Democratic Transparency",
      description: "Direct tracking of grievance routing and lineman assignments eliminates bribery and speed-money constraints in panchayat administrative blocks.",
      icon: Landmark,
      color: "text-emerald-500 bg-emerald-500/15"
    },
    {
      title: "Data-driven Resource Safety",
      description: "Live broadcasting of water discharge schedules and microgrid voltage limits protects critical physical assets like transformers and pipelines.",
      icon: Shield,
      color: "text-blue-500 bg-blue-500/15"
    },
    {
      title: "Zero Middlemen Livelihood",
      description: "Automated skill matching directly coordinates employers and craftsmen, ensuring daily wages are fully settled without contractor commission fees.",
      icon: Milestone,
      color: "text-indigo-500 bg-indigo-500/15"
    },
    {
      title: "Grassroots Empathetic Innovation",
      description: "Customized diagnostic support brings cutting-edge artificial intelligence models directly to rural farms, preserving crop health and yields.",
      icon: HeartHandshake,
      color: "text-amber-500 bg-amber-500/15"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* MISSION STATEMENT BANNER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-accent-cyan bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full">
          Mission & Vision Statement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
          GramSeva Connect Platform Goals
        </h1>
        <p className="text-xs text-slate-350 leading-relaxed font-sans">
          Connecting village governance with digital utility automation. We establish the foundation for Indian villages to operate as self-sustaining, smart ecosystem blocks.
        </p>
      </div>

      {/* CORE FOUR PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pil, idx) => (
          <div 
            key={idx} 
            className="bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className={`p-3 rounded-xl inline-block ${pil.color}`}>
              <pil.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white font-display">
              {pil.title}
            </h3>
            <p className="text-xs text-slate-350 leading-relaxed">
              {pil.description}
            </p>
          </div>
        ))}
      </div>

      {/* TWO COLUMNS: MISSION HISTORY VS CONTACT FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
        
        {/* About detail column (55% width) */}
        <div className="lg:col-span-7 bg-navy-light border border-accent-blue/15 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6 text-xs text-slate-350 leading-relaxed">
            <div>
              <h3 className="font-bold text-base text-white font-display mb-3">
                Bridging the Urban-Rural Digital Divide
              </h3>
              <p>
                Gram Panchayats traditionally operated on manual registers, creating resolution delays for basic complaints, black-box water supply timings, crop vulnerability, and heavy out-migration of workers.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-2">Platform Benefits:</h4>
              <ul className="space-y-2.5 pl-1">
                {[
                  "Eliminates average grievance resolution wait times from days to under 12 hours.",
                  "Saves thousands of liters of drinking water daily per panchayat by scheduling faucet releases.",
                  "Prevents crop losses through prompt leaf rust and pest diagnosis.",
                  "Enables village craftspeople to log certified skills and match directly with block developers."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-navy-dark border border-accent-blue/10 text-[11px] text-slate-400 italic">
              "Sustainable smart villages represent the absolute core of our development blueprint. GramSeva Connect puts true administrative autonomy back in the hands of village heads and citizens alike."
            </div>
          </div>
        </div>

        {/* Support & Contact Form column (45% width) */}
        <div className="lg:col-span-5 bg-navy-light text-white rounded-2xl border border-accent-blue/15 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base font-display text-white mb-2">Mandal Development Support</h3>
            <p className="text-xs text-slate-400 mb-6">
              Have a question or need portal guidance? Submit a request to the Gajuwaka Mandal Block Officer (BDO) / GVMC Zonal Office.
            </p>

            {submitted ? (
              <div className="p-6 bg-blue-950/20 border border-accent-blue/20 text-accent-blue rounded-xl space-y-4 text-center">
                <CheckCircle2 className="w-10 h-10 text-accent-cyan mx-auto animate-bounce" />
                <div>
                  <h4 className="font-bold text-sm text-white">Support Inquiry Dispatched</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Your message has been assigned Ticket ID: <strong>TKT-{Math.floor(1000 + Math.random()*9000)}</strong>. 
                    The Block Development Officer will follow up within 24 hours.
                  </p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-accent-blue hover:bg-accent-cyan text-navy-dark rounded-xl font-bold text-xs cursor-pointer transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Citizen Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-navy-dark border border-accent-blue/15 rounded-xl p-3 text-white focus:outline-none focus:border-accent-blue"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Email Address / Contact Phone</label>
                  <input 
                    type="text"
                    placeholder="e.g. anand@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-navy-dark border border-accent-blue/15 rounded-xl p-3 text-white focus:outline-none focus:border-accent-blue"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Select Subject</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-navy-dark border border-accent-blue/15 rounded-xl p-3 text-white focus:outline-none focus:border-accent-blue"
                  >
                    <option value="General Inquiry">General Inquiry / సాధారణ पूछताछ / సాధారణ విచారణ</option>
                    <option value="Technical Bug">Technical Support / तकनीकी सहायता / సాంకేతిక సహాయం</option>
                    <option value="Scheme Registration">Scheme/Pension Eligibility / योजना पंजीकरण / పథక నమోదు</option>
                    <option value="Complaint Escalation">Urgent Grievance Escalation / शिकायत / తక్షణ ఫిర్యాదు</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Message Detail</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Please type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-navy-dark border border-accent-blue/15 rounded-xl p-3 text-white focus:outline-none focus:border-accent-blue resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-accent-blue hover:bg-accent-cyan text-navy-dark font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Inquiry to BDO
                </button>
              </form>
            )}
          </div>

          <div className="pt-6 border-t border-accent-blue/10 space-y-2 mt-6">
            <p className="text-[10px] text-slate-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-accent-blue shrink-0" />
              <span>GVMC Ward 78/79 Office, Vadlapudi-Kurmannapalem Area, Gajuwaka Zone, Visakhapatnam, Andhra Pradesh, India</span>
            </p>
            <p className="text-[10px] text-slate-400 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-accent-blue shrink-0" />
              <span>Zonal Helpdesk: +91 (891) 254-6789 (10 AM - 5 PM)</span>
            </p>
          </div>
        </div>

      </div>

      {/* TECH STACK SPECIFICATION & PDF DOWNLOAD CARD */}
      <div id="tech-stack-pdf-card" className="bg-navy-light text-white rounded-2xl border border-accent-blue/15 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono uppercase bg-accent-blue/10 text-accent-blue px-2.5 py-1 rounded-full border border-accent-blue/20">
              <Cpu className="w-3 h-3 text-accent-cyan" />
              Platform Technical Spec
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold font-display tracking-tight text-white">
              System Architecture & Tech Stack Document
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Download the official verified system architecture report. This documents our complete responsive frontend stack, Gemini AI diagnostic subsystems, and real-time utility telemetry engineering.
            </p>
          </div>
          <button 
            id="btn-download-tech-pdf"
            onClick={generateTechStackPDF}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-accent-blue hover:bg-accent-cyan text-navy-dark transition-all self-start md:self-center shrink-0 cursor-pointer shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Download PDF Specification</span>
            <Download className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>

    </div>
  );
}
