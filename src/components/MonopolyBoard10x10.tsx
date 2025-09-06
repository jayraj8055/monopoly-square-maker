import { cn } from "@/lib/utils";
import { useState } from "react";

interface Property {
  id: number;
  name: string;
  price: number;
  color: string;
  position: { row: number; col: number };
}

const initialProperties: Property[] = [
  // Top row (left to right)
  { id: 1, name: "GO", price: 0, color: "special", position: { row: 0, col: 0 } },
  { id: 2, name: "Mediterranean Ave", price: 60, color: "brown", position: { row: 0, col: 1 } },
  { id: 3, name: "Community Chest", price: 0, color: "special", position: { row: 0, col: 2 } },
  { id: 4, name: "Baltic Ave", price: 60, color: "brown", position: { row: 0, col: 3 } },
  { id: 5, name: "Income Tax", price: 200, color: "special", position: { row: 0, col: 4 } },
  { id: 6, name: "Reading Railroad", price: 200, color: "railroad", position: { row: 0, col: 5 } },
  { id: 7, name: "Oriental Ave", price: 100, color: "light-blue", position: { row: 0, col: 6 } },
  { id: 8, name: "Chance", price: 0, color: "special", position: { row: 0, col: 7 } },
  { id: 9, name: "Vermont Ave", price: 100, color: "light-blue", position: { row: 0, col: 8 } },
  { id: 10, name: "Connecticut Ave", price: 120, color: "light-blue", position: { row: 0, col: 9 } },

  // Right column (top to bottom, excluding top-right corner)
  { id: 11, name: "Jail", price: 0, color: "special", position: { row: 1, col: 9 } },
  { id: 12, name: "St. Charles Place", price: 140, color: "pink", position: { row: 2, col: 9 } },
  { id: 13, name: "Electric Company", price: 150, color: "utility", position: { row: 3, col: 9 } },
  { id: 14, name: "States Ave", price: 140, color: "pink", position: { row: 4, col: 9 } },
  { id: 15, name: "Virginia Ave", price: 160, color: "pink", position: { row: 5, col: 9 } },
  { id: 16, name: "Pennsylvania Railroad", price: 200, color: "railroad", position: { row: 6, col: 9 } },
  { id: 17, name: "St. James Place", price: 180, color: "orange", position: { row: 7, col: 9 } },
  { id: 18, name: "Community Chest", price: 0, color: "special", position: { row: 8, col: 9 } },
  { id: 19, name: "Tennessee Ave", price: 180, color: "orange", position: { row: 9, col: 9 } },

  // Bottom row (right to left, excluding bottom-right corner)
  { id: 20, name: "New York Ave", price: 200, color: "orange", position: { row: 9, col: 8 } },
  { id: 21, name: "Free Parking", price: 0, color: "special", position: { row: 9, col: 7 } },
  { id: 22, name: "Kentucky Ave", price: 220, color: "red", position: { row: 9, col: 6 } },
  { id: 23, name: "Chance", price: 0, color: "special", position: { row: 9, col: 5 } },
  { id: 24, name: "Indiana Ave", price: 220, color: "red", position: { row: 9, col: 4 } },
  { id: 25, name: "Illinois Ave", price: 240, color: "red", position: { row: 9, col: 3 } },
  { id: 26, name: "B&O Railroad", price: 200, color: "railroad", position: { row: 9, col: 2 } },
  { id: 27, name: "Atlantic Ave", price: 260, color: "yellow", position: { row: 9, col: 1 } },
  { id: 28, name: "Ventnor Ave", price: 260, color: "yellow", position: { row: 9, col: 0 } },

  // Left column (bottom to top, excluding corners)
  { id: 29, name: "Water Works", price: 150, color: "utility", position: { row: 8, col: 0 } },
  { id: 30, name: "Marvin Gardens", price: 280, color: "yellow", position: { row: 7, col: 0 } },
  { id: 31, name: "Go To Jail", price: 0, color: "special", position: { row: 6, col: 0 } },
  { id: 32, name: "Pacific Ave", price: 300, color: "green", position: { row: 5, col: 0 } },
  { id: 33, name: "North Carolina Ave", price: 300, color: "green", position: { row: 4, col: 0 } },
  { id: 34, name: "Community Chest", price: 0, color: "special", position: { row: 3, col: 0 } },
  { id: 35, name: "Pennsylvania Ave", price: 320, color: "green", position: { row: 2, col: 0 } },
  { id: 36, name: "Short Line Railroad", price: 200, color: "railroad", position: { row: 1, col: 0 } },
];

const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    brown: "bg-board-brown text-white",
    "light-blue": "bg-board-light-blue text-black", 
    pink: "bg-board-pink text-black",
    orange: "bg-board-orange text-black",
    red: "bg-board-red text-white",
    yellow: "bg-board-yellow text-black",
    green: "bg-board-green text-white",
    "dark-blue": "bg-board-dark-blue text-white",
    utility: "bg-board-utility text-black",
    railroad: "bg-board-railroad text-white",
    special: "bg-board-special text-white"
  };
  
  return colorMap[color] || "bg-board-square text-black";
};

const PropertySquare = ({ 
  property, 
  onEdit 
}: { 
  property: Property; 
  onEdit: (property: Property) => void;
}) => (
  <div 
    className={cn(
      "aspect-square border-2 border-board-square-border flex flex-col justify-center items-center p-1 cursor-pointer transition-all hover:scale-105 hover:shadow-lg relative",
      getColorClass(property.color)
    )}
    onClick={() => onEdit(property)}
  >
    <div className="text-center w-full">
      <h3 className="font-bold text-[8px] sm:text-[10px] leading-tight mb-1 break-words">
        {property.name}
      </h3>
      {property.price > 0 && (
        <div className="text-[7px] sm:text-[8px] opacity-90">
          ${property.price}
        </div>
      )}
    </div>
    
    {/* Color strip for properties */}
    {property.color !== "special" && (
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 h-1 sm:h-2",
          getColorClass(property.color)
        )} 
      />
    )}
  </div>
);

const EditModal = ({ 
  property, 
  onSave, 
  onClose 
}: { 
  property: Property | null; 
  onSave: (property: Property) => void;
  onClose: () => void;
}) => {
  const [editedProperty, setEditedProperty] = useState(property);

  if (!property || !editedProperty) return null;

  const colorOptions = [
    { value: "brown", label: "Brown" },
    { value: "light-blue", label: "Light Blue" },
    { value: "pink", label: "Pink" },
    { value: "orange", label: "Orange" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "dark-blue", label: "Dark Blue" },
    { value: "utility", label: "Utility" },
    { value: "railroad", label: "Railroad" },
    { value: "special", label: "Special" }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card p-6 rounded-lg shadow-xl max-w-md w-full border">
        <h2 className="text-xl font-bold mb-4">Edit Property</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text"
              value={editedProperty.name}
              onChange={(e) => setEditedProperty({...editedProperty, name: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input 
              type="number"
              value={editedProperty.price}
              onChange={(e) => setEditedProperty({...editedProperty, price: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <select 
              value={editedProperty.color}
              onChange={(e) => setEditedProperty({...editedProperty, color: e.target.value})}
              className="w-full p-2 border rounded"
            >
              {colorOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <button 
            onClick={() => onSave(editedProperty)}
            className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded hover:opacity-90"
          >
            Save
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded hover:opacity-90"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const MonopolyBoard10x10 = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
  };

  const handleSaveProperty = (updatedProperty: Property) => {
    setProperties(prev => 
      prev.map(p => p.id === updatedProperty.id ? updatedProperty : p)
    );
    setEditingProperty(null);
  };

  const createGrid = () => {
    const grid = Array(10).fill(null).map(() => Array(10).fill(null));
    
    // Place properties on the border
    properties.forEach(property => {
      const { row, col } = property.position;
      grid[row][col] = property;
    });
    
    return grid;
  };

  const grid = createGrid();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-foreground">
        Monopoly Board - 10×10 Grid
      </h1>
      
      <div className="bg-board-center p-4 sm:p-6 rounded-lg shadow-2xl border-4 border-board-square-border">
        {/* 10x10 Grid */}
        <div className="grid grid-cols-10 gap-1 w-fit">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (cell) {
                return (
                  <PropertySquare 
                    key={cell.id} 
                    property={cell} 
                    onEdit={handleEditProperty}
                  />
                );
              } else {
                // Empty center squares
                return (
                  <div 
                    key={`empty-${rowIndex}-${colIndex}`}
                    className="aspect-square bg-board-center"
                  />
                );
              }
            })
          )}
        </div>
        
        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-board-center/95 backdrop-blur-sm rounded-full p-6 sm:p-8 border-2 border-board-square-border shadow-lg">
            <h2 className="text-xl sm:text-3xl font-bold text-center text-foreground">
              MONOPOLY
            </h2>
            <p className="text-sm sm:text-base text-center text-muted-foreground mt-1">
              10×10 Board
            </p>
            <p className="text-xs sm:text-sm text-center text-muted-foreground">
              36 Properties
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-muted-foreground max-w-lg">
        <p className="mb-2">
          <strong>Click any property to customize it!</strong>
        </p>
        <p>
          Professional 10×10 Monopoly board with 36 customizable properties around the border. 
          The center area is left empty for game elements like Chance and Community Chest cards.
        </p>
      </div>

      <EditModal 
        property={editingProperty}
        onSave={handleSaveProperty}
        onClose={() => setEditingProperty(null)}
      />
    </div>
  );
};