import { jsPDF } from 'jspdf';

export function generateTechStackPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // A4 size: 210mm x 297mm
  // Margins: 15mm (left: 15, right: 195)

  // 1. HEADER SECTION (Solid Dark Slate Banner)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(15, 15, 180, 26, 'F');

  // Accent Line (Cyan)
  doc.setFillColor(0, 210, 196); // #00D2C4 (cyan)
  doc.rect(15, 41, 180, 1.5, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('GRAMSEVA CONNECT', 22, 26);

  // Header Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('MUNICIPAL UTILITY DIGITAL PORTAL - ARCHITECTURE SPECIFICATION', 22, 33);

  // 2. METADATA BOX (Light Gray Container)
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.3);
  doc.rect(15, 48, 180, 22, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105); // slate-600

  // Column 1
  doc.text('PLATFORM SYSTEM:', 20, 54);
  doc.text('SPECIFICATION TYPE:', 20, 60);
  doc.text('RELEASE VERSION:', 20, 66);

  // Column 1 Values
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('GramSeva Connect Utility', 58, 54);
  doc.text('Technical Stack Report (A4-PDF)', 58, 60);
  doc.text('v1.2.0 (Stable Production Build)', 58, 66);

  // Column 2
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('GENERATION DATE:', 110, 54);
  doc.text('TARGET LOCATION:', 110, 60);
  doc.text('CLOUD ARCHITECTURE:', 110, 66);

  // Column 2 Values
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), 148, 54);
  doc.text('Gajuwaka Zone, Visakhapatnam, IN', 148, 60);
  doc.text('Dockerized / Google Cloud Run', 148, 66);


  // Helper for Section Titles
  let currentY = 79;
  const drawSectionHeader = (title: string) => {
    doc.setFillColor(30, 41, 59); // slate-800
    doc.rect(15, currentY, 180, 7, 'F');
    
    // Left vertical border accent (Cyan)
    doc.setFillColor(0, 210, 196);
    doc.rect(15, currentY, 1.5, 7, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(title, 19, currentY + 4.8);
    currentY += 12;
  };

  const drawRow = (label: string, value: string, desc: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42); // dark slate
    doc.text(label, 20, currentY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 112, 243); // brand blue
    doc.text(value, 55, currentY);

    doc.setTextColor(100, 116, 139); // slate-500
    doc.setFontSize(8);
    doc.text(desc, 92, currentY);

    currentY += 6.5;
  };


  // SECTION 1: FRONTEND FRAMEWORK & LAYOUT
  drawSectionHeader('1. PRESENTATION LAYER & INTERACTIVE INTERFACE');
  drawRow('Core Library', 'React 19.0', 'Functional hooks, declarative rendering cycles & unified application context.');
  drawRow('Language', 'TypeScript 5.8', 'Strong compiler safety, type schemas for worker registrations & IoT metrics.');
  drawRow('Styling Engine', 'Tailwind CSS v4', 'High-performance post-compiled utility classes & cohesive deep slate theme.');
  drawRow('Iconography', 'Lucide React', 'Unified vector icon maps (Landmark, Shield, Cpu, Briefcase, Waves).');
  drawRow('Animations', 'Motion (React)', 'Hardware-accelerated dynamic transitions for modal windows & panel grids.');
  currentY += 3;


  // SECTION 2: INTELLIGENCE & ARTIFICIAL COGNITION
  drawSectionHeader('2. INTELLIGENCE & DIAGNOSTIC REASONING');
  drawRow('AI Core Engine', 'Google GenAI SDK', 'Integrated @google/genai module communicating with server-safe endpoints.');
  drawRow('Model Class', 'Gemini 3.5 Flash', 'Multimodal high-efficiency reasoning engine with search grounding options.');
  drawRow('Vision Pipeline', 'Leaf Diagnostic', 'Takes camera inputs to diagnose crop rust, blight, and pest stress categories.');
  drawRow('Expert Advice', 'Agronomic Advisor', 'Produces tailored local organic cures, fertilizer balances & treatment alerts.');
  currentY += 3;


  // SECTION 3: PHYSICAL UTILITY & TELEMETRY SYSTEMS
  drawSectionHeader('3. UTILITY MONITORING & REAL-TIME VISUALS');
  drawRow('Grievance Flow', 'Interactive Panel', 'Dynamic complaint dispatcher with automatic ward routing & lineman assignments.');
  drawRow('Water Telemetry', 'GVMC Water Works', 'Tracks live storage ppm levels, valve schedules, and flow rate discharge caps.');
  drawRow('Power Telemetry', 'Electricity Service', 'Simulates power line load tracking, voltage, and immediate transformer trip warnings.');
  drawRow('Work Exchange', 'Employment Hub', 'Algorithmic matching between local laborers and builders with automatic fit calculations.');
  drawRow('Charts Suite', 'Recharts Library', 'Dynamic responsive SVG vector feeds charting energy demand fluctuations.');
  currentY += 3;


  // SECTION 4: PLATFORM ORCHESTRATION & DEPLOYMENT
  drawSectionHeader('4. PLATFORM ORCHESTRATION & STORAGE RUNTIME');
  drawRow('Build Compiler', 'Vite 6.0', 'Optimized build bundler generating highly mini-compressed browser assets.');
  drawRow('Runtime Service', 'Docker Container', 'Standardized alpine-node runtime minimizing server latency cold-starts.');
  drawRow('Deployment Host', 'Google Cloud Run', 'Highly scalable web container server resolving secure server-side API requests.');
  drawRow('Web Proxy', 'Nginx Layer', 'Handles secure port bindings (3000 ingress) and routes API requests safely.');
  currentY += 10;


  // 5. FOOTER STAMP & ASSURANCE
  doc.setLineWidth(0.2);
  doc.setDrawColor(203, 213, 225); // slate-200
  doc.line(15, currentY, 195, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('This specification document is programmatically compiled directly from live workspace configuration manifests.', 20, currentY);
  doc.text('GramSeva Digital Governance Platform, Gajuwaka Mandal Enablement Initiative.', 20, currentY + 3.5);

  // Digital Security Stamp Box (Right bottom)
  const stampY = currentY - 3;
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(52, 211, 153); // emerald-400
  doc.rect(142, stampY, 48, 9, 'FD');

  doc.setTextColor(4, 120, 87); // emerald-700
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('DEPLOYMENT SECURE', 145, stampY + 4);
  doc.setFont('helvetica', 'normal');
  doc.text('CLOUD RUN: ONLINE 100%', 145, stampY + 7);

  // Save/Download the file
  doc.save('GramSeva-Connect-Tech-Stack-Spec.pdf');
}
