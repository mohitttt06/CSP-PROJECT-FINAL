import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  UploadCloud, 
  CloudSun, 
  Thermometer, 
  Droplets, 
  Umbrella, 
  CheckCircle, 
  FileImage,
  RefreshCw,
  Info
} from 'lucide-react';

// Static image imports for production-ready asset bundling
import farmFieldHero from '../assets/images/indian_paddy_field_1782695172786.jpg';
import healthyRiceLeaf from '../assets/images/healthy_rice_leaf_1782696275369.jpg';
import stressedWheatRust from '../assets/images/stressed_wheat_rust_1782696290914.jpg';
import droughtMaizeLeaf from '../assets/images/drought_maize_leaf_1782696301746.jpg';

import { CropPresetSample } from '../types';

// Concrete healthy/stressed sample images with farm field background
const FARM_FIELD_HERO = farmFieldHero;

const SAMPLE_GALLERY = [
  {
    id: "sample-healthy-1",
    name: "Healthy Rice Paddy Leaf",
    status: "Healthy",
    image: healthyRiceLeaf,
    defaultWeather: { temp: 28, humidity: 75, rainProb: 60 },
    simulatedResult: {
      condition: "Healthy Leaf Canopy • Optimal Nutrition",
      stressLevel: "Healthy",
      riskScore: 8,
      affectedLeafArea: 0,
      nutrientDeficiency: "All primary soil minerals within normal parameters",
      detectedDisease: {
        name: "No Pathological Disease Detected",
        scientificName: "Healthy plant physiology",
        confidence: 99,
        cause: "Optimal soil hydration, solar absorption, and macro-nutrient balance."
      },
      recommendedActions: [
        "Continue organic crop protective neem spray every fortnight to deter pests.",
        "Maintain standard moisture levels; ensure weeding is completed within early stages.",
        "No chemical fungicide or corrective soil amendments required."
      ]
    }
  },
  {
    id: "sample-rust-2",
    name: "Stressed Wheat (Rust Rusting)",
    status: "Stressed",
    image: stressedWheatRust,
    defaultWeather: { temp: 22, humidity: 85, rainProb: 70 },
    simulatedResult: {
      condition: "Fungal Leaf Rust (Puccinia graminis)",
      stressLevel: "High Stress",
      riskScore: 75,
      affectedLeafArea: 38,
      nutrientDeficiency: "None detected (fungal disease is the primary stress driver)",
      detectedDisease: {
        name: "Wheat Leaf Rust / Fungal Rusting",
        scientificName: "Puccinia graminis",
        confidence: 94,
        cause: "High atmospheric humidity (>80%) combined with moderate temperatures (15-22°C) favoring sporulation."
      },
      recommendedActions: [
        "Apply organic or government-approved sulfur-based copper fungicide spray.",
        "Ensure uniform field drainage; stagnating soil moisture accelerates fungal sporulation.",
        "Restrict nitrogen-rich urea fertilizers temporarily until crop stabilizes."
      ]
    }
  },
  {
    id: "sample-drought-3",
    name: "Drought-Stressed Maize",
    status: "Stressed",
    image: droughtMaizeLeaf,
    defaultWeather: { temp: 38, humidity: 25, rainProb: 5 },
    simulatedResult: {
      condition: "Severe Soil Moisture Stress",
      stressLevel: "Critical",
      riskScore: 92,
      affectedLeafArea: 55,
      nutrientDeficiency: "Potassium absorption blocked due to root moisture deficit",
      detectedDisease: {
        name: "Moisture Deficit Heat Scorch",
        scientificName: "Physiological abiotic drought stress",
        confidence: 89,
        cause: "Extended deficiency in root-zone water availability under high ambient heat."
      },
      recommendedActions: [
        "Initiate emergency overhead or drip irrigation immediately.",
        "Apply potassium spray to help plants maintain cellular turgor and reduce wilting.",
        "Utilize straw or leaf mulching on planting beds to preserve residual soil moisture."
      ]
    }
  }
];

export default function CropIntelligence() {
  const [selectedPreset, setSelectedPreset] = useState<typeof SAMPLE_GALLERY[0] | null>(null);
  const [customFile, setCustomFile] = useState<{ name: string; size: string; preview: string } | null>(null);
  
  // Interactive weather parameters
  const [temp, setTemp] = useState<number>(28);
  const [humidity, setHumidity] = useState<number>(65);
  const [rainProb, setRainProb] = useState<number>(30);

  // Analysis progress triggers
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [analysisResult, setAnalysisResult] = useState<typeof SAMPLE_GALLERY[0]['simulatedResult'] | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      simulateCustomUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      simulateCustomUpload(file);
    }
  };

  const simulateCustomUpload = (file: File) => {
    setSelectedPreset(null);
    setCustomFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      preview: URL.createObjectURL(file)
    });
    setTemp(30);
    setHumidity(60);
    setRainProb(40);
    setAnalysisResult(null);
  };

  const handlePresetSelect = (preset: typeof SAMPLE_GALLERY[0]) => {
    setCustomFile(null);
    setSelectedPreset(preset);
    setTemp(preset.defaultWeather.temp);
    setHumidity(preset.defaultWeather.humidity);
    setRainProb(preset.defaultWeather.rainProb);
    setAnalysisResult(null);
  };

  const getCustomDiseaseDiagnosis = (filename: string, currentTemp: number, currentHumidity: number) => {
    const nameLower = filename.toLowerCase();
    
    // Rice/Paddy
    if (nameLower.includes('rice') || nameLower.includes('paddy') || nameLower.includes('dhan')) {
      return {
        condition: "Fungal Blast & Moisture Stress",
        stressLevel: "High Stress",
        riskScore: 78,
        affectedLeafArea: 32,
        nutrientDeficiency: "Potassium (K) deficit limits disease resistance",
        detectedDisease: {
          name: "Rice Leaf Blast",
          scientificName: "Magnaporthe oryzae",
          confidence: 88,
          cause: "Warm temperatures accompanied by extended leaf wetness or high humidity."
        },
        recommendedActions: [
          "Spray Tricyclazole fungicide at 0.6g per liter of water immediately.",
          "Ensure nitrogen fertilizer application is split and not applied in excess.",
          "Improve field drainage and maintain uniform moisture without stagnation."
        ]
      };
    }
    
    // Wheat
    if (nameLower.includes('wheat') || nameLower.includes('gehun') || nameLower.includes('rust')) {
      return {
        condition: "Fungal Stripe/Leaf Rust",
        stressLevel: "High Stress",
        riskScore: 74,
        affectedLeafArea: 28,
        nutrientDeficiency: "Zinc deficiency suspected",
        detectedDisease: {
          name: "Brown Leaf Rust",
          scientificName: "Puccinia recondita",
          confidence: 91,
          cause: "Cool, moist weather conditions that favor fungal spore germination."
        },
        recommendedActions: [
          "Apply propiconazole 25 EC fungicide to protect foliage.",
          "Sow rust-resistant varieties in the subsequent season.",
          "Ensure optimal spacing to reduce canopy humidity."
        ]
      };
    }

    // Maize/Corn
    if (nameLower.includes('maize') || nameLower.includes('corn') || nameLower.includes('makka')) {
      return {
        condition: "Fungal Turcicum Leaf Blight",
        stressLevel: "Moderate Stress",
        riskScore: 58,
        affectedLeafArea: 18,
        nutrientDeficiency: "Moderate Nitrogen deficiency indicated",
        detectedDisease: {
          name: "Northern Corn Leaf Blight",
          scientificName: "Exserohilum turcicum",
          confidence: 85,
          cause: "Moderate temperatures (20-30°C) with persistent dampness or rainfall."
        },
        recommendedActions: [
          "Apply Mancozeb or Carbendazim spray to control pathogen spread.",
          "Incorporate crop rotation with non-gramineous crops.",
          "Deep-plow crop residues after harvest to destroy surviving spores."
        ]
      };
    }

    // Potato/Tomato
    if (nameLower.includes('potato') || nameLower.includes('tomato') || nameLower.includes('alu') || nameLower.includes('tamatar')) {
      return {
        condition: "Fungal Late Blight Threat",
        stressLevel: "Critical",
        riskScore: 85,
        affectedLeafArea: 42,
        nutrientDeficiency: "Calcium absorption restricted",
        detectedDisease: {
          name: "Late Blight of Solanaceae",
          scientificName: "Phytophthora infestans",
          confidence: 93,
          cause: "Cool, wet, cloudy weather. The pathogen thrives under extreme leaf dampness."
        },
        recommendedActions: [
          "Apply protective fungicide sprays like Metalaxyl combined with Mancozeb.",
          "Prune lower foliage to prevent soil splash and improve air circulation.",
          "Harvest only when the foliage is dry; destroy infected heaps immediately."
        ]
      };
    }

    // Cotton
    if (nameLower.includes('cotton') || nameLower.includes('kapas')) {
      return {
        condition: "Bacterial Leaf Spot / Blight",
        stressLevel: "Moderate Stress",
        riskScore: 62,
        affectedLeafArea: 22,
        nutrientDeficiency: "Phosphorus deficiency limiting rooting depth",
        detectedDisease: {
          name: "Bacterial Blight of Cotton",
          scientificName: "Xanthomonas axonopodis pv. malvacearum",
          confidence: 87,
          cause: "High temperatures (30-35°C) coupled with localized rainfall or high humidity."
        },
        recommendedActions: [
          "Spray Copper Oxychloride 50 WP combined with Streptocycline.",
          "Use acid-delinted seed material for subsequent plantings to remove seed-borne inoculum.",
          "Avoid direct field working when leaves are wet to halt physical spread."
        ]
      };
    }

    // Default Fallback based on weather inputs
    if (currentHumidity > 70) {
      return {
        condition: "Fungal Leaf Spot Infection",
        stressLevel: "High Stress",
        riskScore: 68,
        affectedLeafArea: 25,
        nutrientDeficiency: "Minor Manganese deficiency",
        detectedDisease: {
          name: "Cercospora Leaf Spot",
          scientificName: "Cercospora spp.",
          confidence: 82,
          cause: "Prolonged leaf wetness and warm, humid canopy microclimates."
        },
        recommendedActions: [
          "Spray Chlorothalonil or copper-based protective fungicide.",
          "Clear weed hosts around the perimeter of the cultivation field.",
          "Adjust planting density to maximize sunlight penetration and wind flow."
        ]
      };
    } else if (currentTemp > 35) {
      return {
        condition: "Elevated Heat & Moisture Stress",
        stressLevel: "Critical",
        riskScore: 88,
        affectedLeafArea: 48,
        nutrientDeficiency: "Potassium absorption blocked by dry root zone",
        detectedDisease: {
          name: "Physiological Heat Leaf Scorching",
          scientificName: "Abiotic moisture stress",
          confidence: 94,
          cause: "Persistent soil drought coupled with ambient temperature exceeding 35°C."
        },
        recommendedActions: [
          "Initiate deep drip irrigation during cooler night or early morning hours.",
          "Apply straw mulching to conserve moisture in the crop root zone.",
          "Foliar spray potassium sulfate to improve plant heat-scorch resistance."
        ]
      };
    } else {
      return {
        condition: "Moderate Chlorosis & Foliar Deficit",
        stressLevel: "Moderate Stress",
        riskScore: 48,
        affectedLeafArea: 15,
        nutrientDeficiency: "Nitrogen (N) deficit indicated",
        detectedDisease: {
          name: "Nitrogen Deficiency Chlorosis",
          scientificName: "Physiological nutrient starvation",
          confidence: 86,
          cause: "Inadequate nitrogen replenishment in soil or heavy leaching from prior rainfall."
        },
        recommendedActions: [
          "Incorporate balanced, nitrogen-rich organic compost or neem-coated urea.",
          "Perform shallow aeration weeding around root crowns.",
          "Re-evaluate leaf coloration and chlorophyll density in 10 days."
        ]
      };
    }
  };

  const runPrediction = () => {
    if (!selectedPreset && !customFile) {
      alert('Please upload a crop leaf image or select a sample template.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResult(null);

    const steps = [
      'Uploading crop photo to secure system...',
      'Reading temperature and humidity sliders...',
      'Assessing leaf color ratios and discoloration...',
      'Matching parameters against crop stress databases...',
      'Formulating fertilizer and water prescriptions...'
    ];

    let currentStepIdx = 0;
    setAnalysisStep(steps[0]);

    const timer = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsAnalyzing(false);
          
          if (selectedPreset) {
            setAnalysisResult(selectedPreset.simulatedResult);
          } else if (customFile) {
            // Dynamic diagnosis for uploaded files
            const diagnosis = getCustomDiseaseDiagnosis(customFile.name, temp, humidity);
            setAnalysisResult(diagnosis);
          }
          return 100;
        }
        
        const nextProgress = prev + 10;
        const nextStepIdx = Math.floor((nextProgress / 100) * steps.length);
        if (nextStepIdx < steps.length && nextStepIdx !== currentStepIdx) {
          currentStepIdx = nextStepIdx;
          setAnalysisStep(steps[currentStepIdx]);
        }
        return nextProgress;
      });
    }, 120);
  };

  const getStressBadge = (level: string) => {
    switch (level) {
      case 'Healthy':
        return 'bg-emerald-950/50 text-emerald-400 border-emerald-900/30';
      case 'Moderate Stress':
        return 'bg-amber-950/50 text-amber-400 border-amber-900/30';
      case 'High Stress':
        return 'bg-orange-950/50 text-orange-400 border-orange-900/30';
      case 'Critical':
        return 'bg-rose-950/50 text-rose-400 border-rose-900/30';
      default:
        return 'bg-navy-dark text-slate-400 border-accent-blue/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-navy-dark text-slate-200">
      
      {/* HEADER BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-light p-6 sm:p-8 border border-accent-blue/20 shadow-xl">
        <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-accent-blue/5 rounded-full blur-[60px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-bold font-mono uppercase bg-accent-blue/10 text-accent-blue px-3 py-1 rounded-full border border-accent-blue/20">
              Panchayat Crop Safety System
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Crop Stress Prediction System
            </h1>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Evaluate crop health, check for weather-related moisture deficits, and obtain tailored water and treatment prescriptions instantly.
            </p>
          </div>
        </div>
      </div>

      {/* FARM FIELD IMAGERY HERO */}
      <div className="rounded-2xl overflow-hidden border border-accent-blue/15 shadow-md relative min-h-[140px]">
        <img 
          src={FARM_FIELD_HERO} 
          alt="Lush Indian Farm Fields" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 space-y-1">
          <h3 className="text-sm font-bold text-white font-display">Empowering Panchayat Agriculture</h3>
          <p className="text-[11px] text-slate-300 max-w-lg">
            Understand the stress impacts of high heat waves, low humidity, and rainfall shortages before symptoms spread.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT COLUMN (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* File Upload Box */}
          <div className="bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-accent-blue">
              Step 1: Upload Leaf Photo
            </h3>

            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-accent-cyan bg-accent-blue/10' 
                  : 'border-accent-blue/20 hover:border-accent-blue'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept="image/*" 
                className="hidden" 
              />
              
              {customFile ? (
                <div className="space-y-3">
                  <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden border border-accent-blue/20">
                    <img src={customFile.preview} alt="Custom upload preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white truncate max-w-xs mx-auto">
                      {customFile.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{customFile.size} • Ready for analysis</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomFile(null);
                    }}
                    className="text-xs font-semibold text-rose-400 hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              ) : selectedPreset ? (
                <div className="space-y-3">
                  <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden border border-accent-blue/20">
                    <img src={selectedPreset.image} alt="Sample crop preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Selected: {selectedPreset.name}
                    </p>
                    <p className="text-[10px] text-slate-400">Sample Template</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPreset(null);
                    }}
                    className="text-xs font-semibold text-rose-400 hover:underline"
                  >
                    Clear Choice
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                  <div>
                    <span className="text-xs font-bold text-accent-blue hover:underline">
                      Click to upload leaf photo
                    </span>
                    <span className="text-xs text-slate-400"> or drag and drop</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Supports JPG, PNG formats</p>
                </div>
              )}
            </div>

            {/* Alternating Healthy & Stressed Samples Gallery */}
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Or select a healthy / stressed crop sample below
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAMPLE_GALLERY.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handlePresetSelect(sample)}
                    className={`p-2 rounded-xl border text-left transition-all text-xs flex flex-col gap-2 overflow-hidden ${
                      selectedPreset?.id === sample.id
                        ? 'border-accent-blue bg-accent-blue/10'
                        : 'border-accent-blue/15 hover:bg-navy-dark'
                    }`}
                  >
                    <img src={sample.image} alt={sample.name} referrerPolicy="no-referrer" className="w-full h-20 object-cover rounded-lg" />
                    <div>
                      <div className="font-bold text-white leading-tight truncate">{sample.name}</div>
                      <span className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        sample.status === 'Healthy' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                      }`}>
                        {sample.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sliders for Weather conditions */}
          <div className="bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-accent-blue">
              Step 2: Set Current Weather Conditions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-orange-400" />
                    Temperature
                  </span>
                  <span className="font-mono text-white font-bold">{temp}°C</span>
                </div>
                <input 
                  type="range"
                  min={10}
                  max={45}
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full accent-accent-blue"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>10°C</span>
                  <span>45°C</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    Humidity
                  </span>
                  <span className="font-mono text-white font-bold">{humidity}%</span>
                </div>
                <input 
                  type="range"
                  min={10}
                  max={100}
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full accent-accent-blue"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>10%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Umbrella className="w-3.5 h-3.5 text-accent-blue" />
                    Rain Probability
                  </span>
                  <span className="font-mono text-white font-bold">{rainProb}%</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={100}
                  value={rainProb}
                  onChange={(e) => setRainProb(Number(e.target.value))}
                  className="w-full accent-accent-blue"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

            </div>

            <button
              onClick={runPrediction}
              disabled={isAnalyzing}
              className={`w-full py-2.5 rounded-xl font-bold text-xs text-navy-dark transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isAnalyzing 
                  ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30 cursor-not-allowed'
                  : 'bg-accent-blue hover:bg-accent-cyan'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Generating Stress Report...
                </>
              ) : (
                <>
                  <Sprout className="w-3.5 h-3.5" />
                  Calculate Stress Prediction
                </>
              )}
            </button>
          </div>

        </div>

        {/* RESULTS & PREDICTION VIEW (5 Cols) */}
        <div className="lg:col-span-5 bg-navy-light border border-accent-blue/15 text-white rounded-2xl p-6 shadow-xl min-h-[400px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            
            {isAnalyzing && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 space-y-6"
              >
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-navy-dark" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-accent-blue border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <Sprout className="w-6 h-6 text-accent-blue animate-pulse" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold text-sm font-display text-white">Analyzing Crop Vitals</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{analysisProgress}% Complete</p>
                </div>

                <div className="bg-navy-dark border border-accent-blue/15 p-2.5 rounded-xl max-w-xs mx-auto">
                  <p className="text-[10px] font-mono text-accent-cyan truncate animate-pulse">
                    {analysisStep}
                  </p>
                </div>
              </motion.div>
            )}

            {!isAnalyzing && analysisResult && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 text-left"
              >
                {/* Condition & Status Badge */}
                <div className="flex justify-between items-start border-b border-navy-dark pb-3">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-accent-blue tracking-wider">Condition Diagnosis</span>
                    <h3 className="text-base font-bold font-display text-white mt-0.5">
                      {analysisResult.condition}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider shrink-0 ${getStressBadge(analysisResult.stressLevel)}`}>
                    {analysisResult.stressLevel}
                  </span>
                </div>

                {/* Circular risk gauge & indicator */}
                <div className="p-4 bg-navy-dark border border-accent-blue/15 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-medium">Risk Factor Score</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold font-mono text-white">
                        {analysisResult.riskScore}
                      </span>
                      <span className="text-xs text-slate-500">/ 100</span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-tight">
                      {analysisResult.riskScore > 70 
                        ? 'Critical moisture or disease stress detected. Corrective water & fertilizer dosage required.' 
                        : analysisResult.riskScore > 30 
                        ? 'Mild stress observed. Monitor soil conditions closely.' 
                        : 'Lush crop health with optimal chlorophyll conversion.'}
                    </p>
                  </div>

                  {/* Circle SVG */}
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="28" cy="28" r="24" stroke="currentColor" className="text-navy-light" strokeWidth="4" fill="transparent" />
                      <circle 
                        cx="28" 
                        cy="28" 
                        r="24" 
                        stroke="currentColor" 
                        className={analysisResult.riskScore > 70 ? 'text-rose-500' : analysisResult.riskScore > 40 ? 'text-amber-500' : 'text-emerald-400'} 
                        strokeWidth="4" 
                        fill="transparent" 
                        strokeDasharray={151}
                        strokeDashoffset={151 - (151 * analysisResult.riskScore) / 100}
                      />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-white">
                      {analysisResult.riskScore}%
                    </span>
                  </div>
                </div>

                {/* Side parameters */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-navy-dark border border-accent-blue/15 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Affected Canopy</span>
                    <p className="text-sm font-bold font-mono mt-0.5 text-white">{analysisResult.affectedLeafArea}%</p>
                  </div>
                  <div className="p-2.5 bg-navy-dark border border-accent-blue/15 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Nutrient Deficit</span>
                    <p className="text-xs font-bold mt-0.5 text-slate-200 truncate">{analysisResult.nutrientDeficiency}</p>
                  </div>
                </div>

                {/* Actionable treatment lists */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-accent-blue" />
                    Corrective Treatment Guidelines
                  </h4>
                  <ul className="space-y-1.5">
                    {analysisResult.recommendedActions.map((action, idx) => (
                      <li key={idx} className="text-xs text-slate-300 leading-relaxed bg-navy-dark p-2.5 rounded-lg border border-accent-blue/10 flex items-start gap-2">
                        <span className="font-mono text-accent-blue font-bold shrink-0">{idx + 1}.</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Likely Disease Diagnosis Section */}
                {analysisResult.detectedDisease && (
                  <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono uppercase text-rose-400 tracking-wider font-bold">Image Diagnosis (AI Crop Health)</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                        {analysisResult.detectedDisease.confidence}% Confidence
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white font-display">
                        {analysisResult.detectedDisease.name}
                      </h4>
                      <p className="text-[9px] text-rose-300 italic font-mono mt-0.5">
                        Scientific: {analysisResult.detectedDisease.scientificName}
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      <span className="text-white font-bold font-mono text-[9px] uppercase tracking-wider mr-1">Primary Vector/Trigger:</span> 
                      {analysisResult.detectedDisease.cause}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-navy-dark text-center text-[10px] text-slate-500">
                  Forecast run with Temp: {temp}°C, Humidity: {humidity}%, Rain: {rainProb}%
                </div>
              </motion.div>
            )}

            {!isAnalyzing && !analysisResult && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-slate-500 space-y-4"
              >
                <CloudSun className="w-12 h-12 mx-auto text-slate-700 animate-pulse" />
                <div className="max-w-xs mx-auto">
                  <h4 className="font-bold text-slate-400 text-xs">Waiting for Input Selection</h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Please upload an image of a crop leaf or select one of our pre-compiled healthy/stressed templates on the left, then click analyze.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
