import { useState } from 'react'


function App() {
  const [selectedTop, setSelectedTop] = useState("#ffffff");
  const [selectedBottom, setSelectedBottom] = useState("#ffffff");
  
  // Color options for clothing
  const colorOptions = [
    "#ff0000", // Red
    "#0000ff", // Blue
    "#ffff00", // Yellow
    "#00ff00", // Green
    "#ff00ff", // Pink
    "#808080", // Gray
    "#000000", // Black
    "#ffffff", // White
    "#ffa500", // Orange
    "#800080", // Purple
    "#8B0000", // Dark Red
    "#006400", // Dark Green
    "#00008B", // Dark Blue
    "#4B0082", // Indigo
    "#228B22", // Forest Green
    "#20B2AA", // Light Sea Green
    "#87CEEB", // Sky Blue
    "#4682B4", // Steel Blue
    "#9932CC", // Dark Orchid
    "#FF1493", // Deep Pink
    "#FF4500", // Orange Red
    "#FFD700", // Gold
    "#F0E68C", // Khaki
    "#F5DEB3", // Wheat
    "#D2B48C", // Tan
    "#A0522D", // Sienna
    "#8B4513", // Saddle Brown
    "#BC8F8F", // Rosy Brown
    "#708090", // Slate Gray
    "#2F4F4F", // Dark Slate Gray
  ];
  const handleDragStart = (e, color) => {
       e.dataTransfer.setData("color", color);
      };
  const handleDropOnTop = (e) => {
    e.preventDefault();
    const color = e.dataTransfer.getData("color");
    setSelectedTop(color);
  };

  const handleDropOnBottom = (e) => {
    e.preventDefault();
    const color = e.dataTransfer.getData("color");
    setSelectedBottom(color);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };


  return (
    <div className="flex flex-col items-center p-8 bg-black/80 min-h-screen">
  {/* Title */}
  <h1 className="text-4xl font-extrabold mb-10 text-indigo-900 tracking-wide drop-shadow-sm">
    Dynamic Wardrobe
  </h1>

  <div className="flex flex-col md:flex-row w-full gap-10">
    {/* Color palette */}
    <div className="w-full md:w-1/3 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🎨 Color Palette
      </h2>
      <p className="mb-6 text-sm text-gray-500 text-center">
        Drag and drop colors onto outfit pieces
      </p>
      <div className="grid grid-cols-4 gap-3">
        {colorOptions.map((color) => (
          <div
            key={color}
            className="w-12 h-12 rounded-lg shadow-sm cursor-move flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:shadow-md"
            style={{ backgroundColor: color, border: "1px solid #e5e7eb" }}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, color)}
          >
            {color === "#ffffff" && (
              <span className="text-xs text-gray-400 font-medium">White</span>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Unified Outfit Card */}
    <div className="flex-1 flex flex-col items-center gap-8 bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        👕 Your Outfit
      </h2>

      <div className="flex flex-col gap-8 items-center">
        {/* T-shirt */}
        <div
          className="w-56 h-44 flex items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          onDrop={handleDropOnTop}
          onDragOver={allowDrop}
        >
          <svg
            viewBox="0 0 24 24"
            width="150"
            height="120"
            className="drop-shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <defs>
              <linearGradient id="shirtGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={selectedTop || "#a78bfa"} />
                <stop offset="100%" stopColor={selectedTop || "#ec4899"} />
              </linearGradient>
            </defs>
            <path
              d="M16 2H8L6 6v3h2v13h8V9h2V6l-2-4z"
              fill="url(#shirtGradient)"
              stroke="#222"
              strokeWidth="0.3"
            />
          </svg>
        </div>

        {/* Pants */}
        <div
          className="w-56 h-44 flex items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
          onDrop={handleDropOnBottom}
          onDragOver={allowDrop}
        >
          <svg
            viewBox="0 0 200 200"
            width="120"
            height="140"
            className="drop-shadow-md hover:scale-105 transition-transform duration-300"
          >
            <defs>
              <linearGradient id="pantsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={selectedBottom || "#60a5fa"} />
                <stop offset="100%" stopColor={selectedBottom || "#1e3a8a"} />
              </linearGradient>
            </defs>
            <path
              d="M60,20 L140,20 L150,180 L110,180 L100,100 L90,180 L50,180 L60,20 Z"
              fill="url(#pantsGradient)"
              stroke="#222"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

);
}
export default App
