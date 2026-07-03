// GramSeva Connect - Type Definitions and Sample Initial Data

export interface Lineman {
  name: string;
  phone: string;
  avatar: string;
  rating: number;
}

export interface ElectricityComplaint {
  id: string;
  ward: string;
  issueType: string;
  issueDescription: string;
  status: 'Pending' | 'Routed' | 'In Progress' | 'Resolved';
  lineman: Lineman | null;
  submittedAt: string;
  citizenName: string;
}

export interface WaterZoneSchedule {
  id: string;
  zone: string;
  timing: string;
  status: 'Upcoming' | 'Active' | 'Delayed' | 'Completed';
  reservoirLevel: number; // percentage
  flowRate: number; // liters per second
  frequency: string;
  lastUpdated: string;
}

export interface WaterAnnouncement {
  id: string;
  title: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  date: string;
}

export interface CropPresetSample {
  id: string;
  name: string;
  image: string; // Base64 or elegant gradient/visual descriptions
  defaultWeather: {
    temp: number;
    humidity: number;
    rainProb: number;
  };
  simulatedResult: {
    condition: string;
    stressLevel: 'Healthy' | 'Low Stress' | 'Moderate Stress' | 'High Stress' | 'Critical';
    riskScore: number; // 0-100
    recommendedActions: string[];
    affectedLeafArea: number; // percentage
    nutrientDeficiency: string;
    detectedDisease?: {
      name: string;
      scientificName: string;
      confidence: number;
      cause: string;
    };
  };
}

export interface WorkerProfile {
  id: string;
  name: string;
  gender: string;
  age: number;
  ward: string;
  skills: string[];
  experience: string;
  phone: string;
  registeredAt: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  employer: string;
  ward: string;
  skillsRequired: string[];
  wage: string;
  type: 'Daily Wage' | 'Short Term' | 'Seasonal' | 'Full-time' | 'Contract';
  status: 'Open' | 'Filled';
  postedAt: string;
}

// ==========================================
// SAMPLE INITIAL DATA
// ==========================================

export const Wards = [
  'Ward 78 (A.P. Housing Board Colony - Vadlapudi)',
  'Ward 78 (Rajiv Nagar & Sai Priya)',
  'Ward 78 (NTR Nagar & Vadlapudi Old)',
  'Ward 79 (Srinagar - Kurmannapalem)',
  'Ward 79 (Duppituru Rural Area)',
  'Ward 79 (Taj Nagar & Kanithi Road)',
  'Ward 80 (Steel Plant Township - Ukkunagaram)'
];

export const LinemenData: Record<string, Lineman> = {
  'Ward 78 (A.P. Housing Board Colony - Vadlapudi)': { name: 'K. Srinivas Rao', phone: '+91 94401 23456', avatar: 'KS', rating: 4.8 },
  'Ward 78 (Rajiv Nagar & Sai Priya)': { name: 'T. Apparao', phone: '+91 94902 34567', avatar: 'TA', rating: 4.7 },
  'Ward 78 (NTR Nagar & Vadlapudi Old)': { name: 'B. Venkata Ramana', phone: '+91 98480 12345', avatar: 'VR', rating: 4.9 },
  'Ward 79 (Srinagar - Kurmannapalem)': { name: 'M. Koteswara Rao', phone: '+91 99591 56789', avatar: 'KR', rating: 4.6 },
  'Ward 79 (Duppituru Rural Area)': { name: 'P. Satyanarayana', phone: '+91 90001 23456', avatar: 'PS', rating: 4.8 },
  'Ward 79 (Taj Nagar & Kanithi Road)': { name: 'G. Siva Prasad', phone: '+91 94405 87654', avatar: 'SP', rating: 4.5 },
  'Ward 80 (Steel Plant Township - Ukkunagaram)': { name: 'Ch. Narayana Swamy', phone: '+91 98485 54321', avatar: 'NS', rating: 4.9 }
};

export const InitialComplaints: ElectricityComplaint[] = [
  {
    id: "COMP-4081",
    ward: "Ward 78 (A.P. Housing Board Colony - Vadlapudi)",
    issueType: "Transformer Sparking",
    issueDescription: "Heavy sparking near Phase-2 primary school transformer after high coastal winds. Sparking is continuous.",
    status: "In Progress",
    lineman: LinemenData["Ward 78 (A.P. Housing Board Colony - Vadlapudi)"],
    submittedAt: "2026-06-28 07:15 AM",
    citizenName: "M. Appalaraju"
  },
  {
    id: "COMP-4082",
    ward: "Ward 79 (Srinagar - Kurmannapalem)",
    issueType: "Streetlight Malfunction",
    issueDescription: "Four major LED streetlights on Srinagar main road are out of order for 4 days, causing safety issues at night.",
    status: "Routed",
    lineman: LinemenData["Ward 79 (Srinagar - Kurmannapalem)"],
    submittedAt: "2026-06-28 08:30 AM",
    citizenName: "P. Lakshmi Devi"
  },
  {
    id: "COMP-4079",
    ward: "Ward 79 (Duppituru Rural Area)",
    issueType: "Low Voltage Issue",
    issueDescription: "Low voltage preventing agricultural irrigation pumps and household coolers from starting since yesterday evening.",
    status: "Resolved",
    lineman: LinemenData["Ward 79 (Duppituru Rural Area)"],
    submittedAt: "2026-06-27 04:20 PM",
    citizenName: "V. Rama Rao"
  }
];

export const InitialWaterSchedules: WaterZoneSchedule[] = [
  {
    id: "SCH-1",
    zone: "Zone A (APHB Phase-1 Circle)",
    timing: "06:00 AM - 08:00 AM",
    status: "Completed",
    reservoirLevel: 85,
    flowRate: 42,
    frequency: "Daily Morning",
    lastUpdated: "Today, 08:05 AM"
  },
  {
    id: "SCH-2",
    zone: "Zone B (Srinagar Colony & Kanithi Road)",
    timing: "09:00 AM - 11:00 AM",
    status: "Active",
    reservoirLevel: 72,
    flowRate: 38,
    frequency: "Daily Morning",
    lastUpdated: "Just now"
  },
  {
    id: "SCH-3",
    zone: "Zone C (Duppituru Paddy Farm Area)",
    timing: "01:30 PM - 03:00 PM",
    status: "Upcoming",
    reservoirLevel: 90,
    flowRate: 45,
    frequency: "Daily Afternoon",
    lastUpdated: "Today, 06:00 AM"
  },
  {
    id: "SCH-4",
    zone: "Zone D (NTR Nagar & Vadlapudi Old Village)",
    timing: "04:30 PM - 06:00 PM",
    status: "Delayed",
    reservoirLevel: 48,
    flowRate: 0,
    frequency: "Daily Evening",
    lastUpdated: "10 mins ago"
  }
];

export const WaterAnnouncements: WaterAnnouncement[] = [
  {
    id: "ANN-1",
    title: "Scheduled Pipeline Maintenance Work",
    type: "warning",
    message: "Inlet pipe repair scheduled for tomorrow near Gajuwaka junction feed. Zone C water release may be delayed by 45 minutes.",
    date: "2026-06-28"
  },
  {
    id: "ANN-2",
    title: "Groundwater Recharge Success",
    type: "success",
    message: "Due to the community rainwater harvesting drive across Kurmannapalem wards, our local reservoir capacity has reached an all-time high of 92%.",
    date: "2026-06-27"
  },
  {
    id: "ANN-3",
    title: "Purity Test Report: Outstanding",
    type: "info",
    message: "Weekly water quality report received from Vizag Municipal Lab. TDS level is 180ppm, and pH is 7.2. Safe for direct consumption.",
    date: "2026-06-26"
  }
];

export const CropPresets: CropPresetSample[] = [
  {
    id: "preset-1",
    name: "Wheat Crop - Leaf Rust Symptoms",
    image: "🌾", // Standard emoji fallback representing wheat
    defaultWeather: { temp: 24, humidity: 82, rainProb: 65 },
    simulatedResult: {
      condition: "Fungal Leaf Rust (Puccinia recondita)",
      stressLevel: "High Stress",
      riskScore: 78,
      recommendedActions: [
        "Spray Propiconazole 25% EC (fungicide) at 1ml per liter of water.",
        "Ensure uniform drainage; stagnating moisture accelerates fungal spread.",
        "Restrict nitrogenous fertilizer application until recovery.",
        "Monitor adjacent fields for orange/brown pustules on wheat leaves."
      ],
      affectedLeafArea: 35,
      nutrientDeficiency: "None detected (fungal infestation primary driver)"
    }
  },
  {
    id: "preset-2",
    name: "Rice Crop - Drought / Moisture Stress",
    image: "🌾", // Standard emoji fallback representing rice paddies
    defaultWeather: { temp: 37, humidity: 35, rainProb: 10 },
    simulatedResult: {
      condition: "Severe Moisture Stress & Leaf Curling",
      stressLevel: "Critical",
      riskScore: 92,
      recommendedActions: [
        "Immediate emergency irrigation required (alternate wetting & drying if supply limited).",
        "Apply potassium spray (K2O) to increase stomatal control and drought tolerance.",
        "Apply organic mulching on beds to preserve residual soil moisture.",
        "Postpone any active weedicide sprays as it increases plant chemical stress."
      ],
      affectedLeafArea: 60,
      nutrientDeficiency: "Potassium Deficiency aggravated by water deficit"
    }
  },
  {
    id: "preset-3",
    name: "Cotton Crop - Aphid Infestation",
    image: "🌿", // Standard emoji fallback representing lush crop
    defaultWeather: { temp: 31, humidity: 75, rainProb: 40 },
    simulatedResult: {
      condition: "Sucking Pest Attack (Cotton Aphids / Aphis gossypii)",
      stressLevel: "Moderate Stress",
      riskScore: 55,
      recommendedActions: [
        "Spray Neem Seed Kernel Extract (NSKE 5%) as an organic repellent.",
        "Encourage natural predators like Ladybird beetles and hoverfly larvae.",
        "For severe cases, apply Imidacloprid 17.8% SL at 0.5 ml per liter of water.",
        "Prune and destroy heavily infested bottom leaves."
      ],
      affectedLeafArea: 22,
      nutrientDeficiency: "Trace Nitrogen deficiency due to sap-sucking load"
    }
  },
  {
    id: "preset-4",
    name: "Healthy Tomato Crop",
    image: "🍅", // Tomato crop
    defaultWeather: { temp: 28, humidity: 60, rainProb: 20 },
    simulatedResult: {
      condition: "Healthy / Optimal Vigour",
      stressLevel: "Healthy",
      riskScore: 8,
      recommendedActions: [
        "Continue current drip irrigation schedule of 45 mins early morning.",
        "Prepare for trellis staking as heavy fruit-bearing starts in 10 days.",
        "Apply organic compost at the root base to sustain micro-nutrients.",
        "Conduct routine pruning of lower yellowed leaves for air circulation."
      ],
      affectedLeafArea: 0,
      nutrientDeficiency: "None. All parameters optimal."
    }
  }
];

export const InitialWorkers: WorkerProfile[] = [
  {
    id: "WORK-001",
    name: "Ch. Appala Naidu",
    gender: "Male",
    age: 34,
    ward: "Ward 78 (A.P. Housing Board Colony - Vadlapudi)",
    skills: ["Masonry", "Plumbing", "Concrete Mixing"],
    experience: "8 Years in Vizag Steel and local housing construction",
    phone: "+91 94401 23456",
    registeredAt: "2026-06-20"
  },
  {
    id: "WORK-002",
    name: "P. Swathi Priya",
    gender: "Female",
    age: 28,
    ward: "Ward 79 (Duppituru Rural Area)",
    skills: ["Organic Composting", "Tailoring", "Seed Sorting"],
    experience: "4 Years in Gajuwaka agricultural self-help groups (SHG)",
    phone: "+91 94902 34567",
    registeredAt: "2026-06-25"
  },
  {
    id: "WORK-003",
    name: "G. Siva Kumar",
    gender: "Male",
    age: 26,
    ward: "Ward 79 (Srinagar - Kurmannapalem)",
    skills: ["Tractor Driving", "Drip Irrigation Setup", "Electrician"],
    experience: "5 Years in solar pump wiring and borewell installation",
    phone: "+91 98480 12345",
    registeredAt: "2026-06-27"
  },
  {
    id: "WORK-004",
    name: "B. Rama Devi",
    gender: "Female",
    age: 41,
    ward: "Ward 78 (Rajiv Nagar & Sai Priya)",
    skills: ["Fruit Processing", "Pickle Making", "Nursery Management"],
    experience: "10 Years running Vizag Mahila co-operative and agro projects",
    phone: "+91 99591 56789",
    registeredAt: "2026-06-22"
  },
  {
    id: "WORK-005",
    name: "K. Satyanarayana",
    gender: "Male",
    age: 39,
    ward: "Ward 80 (Steel Plant Township - Ukkunagaram)",
    skills: ["Carpentry", "Roofing", "Masonry"],
    experience: "12 Years in steel fabrications, structural framing and woodwork",
    phone: "+91 90001 23456",
    registeredAt: "2026-06-26"
  }
];

export const InitialJobs: JobOpportunity[] = [
  {
    id: "JOB-101",
    title: "Pond Rejuvenation Mason",
    employer: "GVMC Gajuwaka Zonal Engineering Dept",
    ward: "Ward 79 (Duppituru Rural Area)",
    skillsRequired: ["Masonry", "Concrete Mixing"],
    wage: "₹450 / Day",
    type: "Short Term",
    status: "Open",
    postedAt: "2026-06-26"
  },
  {
    id: "JOB-102",
    title: "Solar Water Pump Assistant",
    employer: "AP Eastern Power Distribution Company (APEPDCL) Subcontractor",
    ward: "Ward 79 (Taj Nagar & Kanithi Road)",
    skillsRequired: ["Electrician", "Drip Irrigation Setup"],
    wage: "₹550 / Day",
    type: "Contract",
    status: "Open",
    postedAt: "2026-06-27"
  },
  {
    id: "JOB-103",
    title: "Nursery Plant Care Packer",
    employer: "Vizag Green Belt Nursery",
    ward: "Ward 78 (NTR Nagar & Vadlapudi Old)",
    skillsRequired: ["Seed Sorting", "Nursery Management"],
    wage: "₹380 / Day",
    type: "Seasonal",
    status: "Open",
    postedAt: "2026-06-28"
  },
  {
    id: "JOB-104",
    title: "Self-Help Group Tailoring Instructor",
    employer: "Gajuwaka Mahila Abhivruddhi Association",
    ward: "Ward 78 (A.P. Housing Board Colony - Vadlapudi)",
    skillsRequired: ["Tailoring"],
    wage: "₹400 / Day",
    type: "Daily Wage",
    status: "Filled",
    postedAt: "2026-06-25"
  }
];

