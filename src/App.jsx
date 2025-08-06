import { useState } from "react";
import { DndContext, DragOverlay, useDraggable, useDroppable, closestCenter } from "@dnd-kit/core";
import { createPortal } from "react-dom";

const colorOptions = [
  "#ff0000", "#0000ff", "#ffff00", "#00ff00", "#ff00ff",
  "#808080", "#000000", "#ffffff", "#ffa500", "#800080",
  "#8B0000", "#006400", "#00008B", "#4B0082", "#228B22",
  "#20B2AA", "#87CEEB", "#4682B4", "#9932CC", "#FF1493",
  "#FF4500", "#FFD700", "#F0E68C", "#F5DEB3", "#D2B48C",
  "#A0522D", "#8B4513", "#BC8F8F", "#708090", "#2F4F4F",
];

function DraggableColor({ color }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: color });
  const style = {
    backgroundColor: color,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition: isDragging ? "none" : "transform 0.2s ease",
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`w-14 h-14 md:w-12 md:h-12 rounded-lg shadow-md cursor-grab flex items-center justify-center 
                  transition-transform duration-200 hover:scale-110 active:scale-95`}
      style={{ ...style, border: "1px solid #e5e7eb" }}
    >
      {color === "#ffffff" && <span className="text-xs text-gray-400 font-medium">White</span>}
    </div>
  );
}

function DroppableArea({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`w-64 h-56 flex items-center justify-center p-4 
        rounded-3xl shadow-md border border-gray-200 
        transition-all duration-300 ease-out 
        ${isOver ? "bg-indigo-100 scale-105" : "bg-white/70"}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [selectedTop, setSelectedTop] = useState("#ffffff");
  const [selectedBottom, setSelectedBottom] = useState("#ffffff");
  const [activeColor, setActiveColor] = useState(null);

  const handleDragStart = (event) => setActiveColor(event.active.id);
  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over) return;
    if (over.id === "top") setSelectedTop(active.id);
    if (over.id === "bottom") setSelectedBottom(active.id);
    setActiveColor(null);
  };
  const handleDragCancel = () => setActiveColor(null);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
    >
      <div className="flex flex-col items-center p-6 md:p-8 bg-black min-h-screen">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-indigo-800 tracking-wide drop-shadow-sm text-center">
          Dynamic Wardrobe
        </h1>

        <div className="flex flex-col-reverse md:flex-row w-full gap-8 md:gap-10 items-center md:items-start">
          {/* Color Palette */}
          <div className="w-full md:w-1/3 bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-800">🎨 Color Palette</h2>
            <p className="mb-6 text-sm text-gray-500 text-center">Drag colors onto outfit pieces</p>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
              {colorOptions.map((color) => (
                <DraggableColor key={color} color={color} />
              ))}
            </div>
          </div>

          {/* Outfit Preview */}
          <div className="flex-1 flex flex-col items-center gap-4 bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">👕 Your Outfit</h2>

            <DroppableArea id="top">
              <svg viewBox="0 0 24 24" width="180" height="140" className="drop-shadow-lg">
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
            </DroppableArea>

            <DroppableArea id="bottom">
              <svg viewBox="0 0 200 200" width="120" height="140" className="drop-shadow-md">
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
                <rect x="60" y="18" width="80" height="5" fill="#222" rx="2" />
                <path d="M100,20 L100,100" stroke="#000" strokeWidth="1.2" opacity="0.6" />
              </svg>
            </DroppableArea>
          </div>
        </div>
      </div>

      {/* Smooth Drag Ghost */}
      {createPortal(
        <DragOverlay>
          {activeColor ? (
            <div
              className="w-14 h-14 rounded-lg shadow-xl"
              style={{ backgroundColor: activeColor, border: "1px solid #e5e7eb" }}
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
