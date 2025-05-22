// filepath: /Users/joshuabutler/Downloads/AIChatInput/App.tsx
import { AIChatInput } from "./components/AIChatInput";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { BrandPerformanceReport } from "./components/BrandPerformanceReport";
import PRImpactViewDetailed from "./components/PRImpactViewDetailed";
import FullPrReport from "./imports/FullPrReport";
import { ToolBar } from "./components/ToolBar";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";

// Other report scenarios
// Note: BrandReport has been replaced with BrandPerformanceReport component

function BrandReportWithCanvas() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Brand Performance Report with Canvas</h1>
      <p className="mb-4">Brand performance report for Nike with visual canvas</p>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Nike Brand Performance Summary</h2>
        <p className="mb-4">Enhanced report with visual canvas displaying Nike's brand metrics, trends and performance insights.</p>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p>This is a placeholder for the canvas-enabled brand report (Scenario 2).</p>
          <p>The user clicked on both Canvas toggle and Brand Performance.</p>
        </div>
        <div className="mt-4 border p-4 rounded-lg border-mira-teal">
          <h3 className="font-semibold mb-2">Visual Canvas</h3>
          <div className="bg-[#f2fafa] h-40 flex items-center justify-center">
            Canvas visualization area
          </div>
        </div>
      </div>
    </div>
  );
}

function PRImpactReport() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">PR Impact Report</h1>
      <p className="mb-4">Impact report for PepsiCo press release</p>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Press Release Impact Analysis</h2>
        <p className="mb-4">Analysis of impact for the press release: PepsiCo to acquire Poppi</p>
        
        <div className="mb-6">
          <FullPrReport />
        </div>

        <div className="mt-4 border border-[rgba(33,33,33,0.12)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">PR Analysis Form</h3>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Company Name</label>
              <input type="text" value="PepsiCo" className="w-full border border-[rgba(33,33,33,0.12)] rounded p-2" readOnly />
            </div>
            <div>
              <label className="block mb-1">Acquisition Target</label>
              <input type="text" value="Poppi" className="w-full border border-[rgba(33,33,33,0.12)] rounded p-2" readOnly />
            </div>
            <div>
              <label className="block mb-1">PR Release URL</label>
              <input 
                type="text" 
                value="https://www.pepsico.com/our-stories/press-release/pepsico-to-acquire-poppi03172025" 
                className="w-full border border-[rgba(33,33,33,0.12)] rounded p-2" 
                readOnly 
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SearchBuilderReport() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Builder</h1>
      <p className="mb-4">Advanced search builder interface</p>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Search Builder Interface</h2>
        <p className="mb-4">Create and refine complex search queries with advanced filters</p>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p>This is a placeholder for the search builder interface (Scenario 4).</p>
          <p>The search builder allows users to construct complex search queries with multiple parameters.</p>
        </div>
      </div>
    </div>
  );
}

// The AppContent component with history drawer functionality
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryItem, setActiveHistoryItem] = useState<number | null>(null);
  
  // Handle initial navigation and redirect from invalid routes
  useEffect(() => {
    const path = location.pathname;
    const validRoutes = ['/', '/brand-report', '/brand-report-canvas', '/pr-impact', '/search-builder', '/conversation'];
    
    // Log the current path for debugging
    console.log('Current route path:', path);
    
    // Check if the current path ends with .html (likely a direct file access attempt)
    if (path.endsWith('.html') || !validRoutes.includes(path)) {
      console.log('Redirecting from invalid path:', path);
      navigate('/', { replace: true });
    }
  }, [navigate, location.pathname]);

  // Toggle history drawer
  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  // Close history drawer
  const closeHistory = () => {
    setIsHistoryOpen(false);
  };

  // Update active history item based on current route
  useEffect(() => {
    const path = location.pathname;
    
    // Debug log to track route changes
    console.log('Current route:', path);
    
    // Only set active history item for specific routes, otherwise null (rest state)
    if (path === '/brand-report') {
      console.log('Setting Brand Performance as active');
      setActiveHistoryItem(0); // v1 Brand Performance - active when viewing the report
    } else if (path === '/brand-report-canvas') {
      setActiveHistoryItem(1); // v2 Brand Performance with Canvas
    } else if (path === '/pr-impact') {
      setActiveHistoryItem(2); // v3 PR Attribution
    } else if (path === '/search-builder') {
      setActiveHistoryItem(3); // v4 Search Builder
    } else {
      // Default rest state - no active item
      setActiveHistoryItem(null);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        {/* Toolbar at the top */}
        <ToolBar onToggleHistory={() => setIsHistoryOpen(true)} />
        
        <div className="flex-1">
          <div className="relative w-full h-full min-h-[calc(100vh-52px)]">
            {/* Background gradient with multiple radial overlays */}
            <div 
              className="absolute inset-0 z-0"
              style={{ 
                backgroundSize: "100% 100%",
                backgroundPosition: "0px 0px, 0px 0px, 0px 0px",
                backgroundImage: "radial-gradient(74% 84% at 49% 45%, #FFFFFF00 28%, #FFFFFF 56%), radial-gradient(74% 75% at 50% 33%, #FFFFFF00 30%, #FFFFFF 74%), linear-gradient(90deg, #F7E6F3 0%, #E0F1F2 100%)"
              }}
            />
            
            {/* Content - Top-aligned with padding */}
            <div className="relative z-10 size-full p-6 pt-[24px] flex items-start justify-center overflow-auto">
              <Routes>
                <Route path="/" element={<AIChatInput />} />
                <Route 
                  path="/brand-report" 
                  element={
                    <div className="w-full flex justify-center" style={{ minHeight: "calc(100vh - 10rem)" }}>
                      <BrandPerformanceReport />
                    </div>
                  } 
                />
                <Route path="/brand-report-canvas" element={<BrandReportWithCanvas />} />
                <Route path="/pr-impact" element={<PRImpactReport />} />
                <Route path="/search-builder" element={<SearchBuilderReport />} />
                <Route path="/conversation" element={<PRImpactViewDetailed />} />
                
                {/* Add catch-all route to handle any path not matched above */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>

      {/* History Drawer */}
      <HistoryDrawer 
        isOpen={isHistoryOpen} 
        onClose={closeHistory}
        activeItemIndex={activeHistoryItem}
      />
    </>
  );
}

export default function App() {
  return (
    <Router basename="/">
      <AppContent />
    </Router>
  );
}
