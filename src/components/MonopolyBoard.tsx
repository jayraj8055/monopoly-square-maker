import { cn } from "@/lib/utils";

interface BoardSquare {
  id: number;
  name: string;
  type: "property" | "special" | "utility" | "railroad";
  color?: string;
  price?: number;
  rent?: number;
}

const boardSquares: BoardSquare[] = [
  // Row 1 (Top)
  { id: 1, name: "GO", type: "special", color: "special" },
  { id: 2, name: "Mediterranean Ave", type: "property", color: "brown", price: 60, rent: 2 },
  { id: 3, name: "Community Chest", type: "special", color: "special" },
  { id: 4, name: "Baltic Ave", type: "property", color: "brown", price: 60, rent: 4 },
  { id: 5, name: "Income Tax", type: "special", color: "special" },
  { id: 6, name: "Reading Railroad", type: "railroad", color: "railroad", price: 200 },
  { id: 7, name: "Oriental Ave", type: "property", color: "light-blue", price: 100, rent: 6 },
  { id: 8, name: "Chance", type: "special", color: "special" },
  { id: 9, name: "Vermont Ave", type: "property", color: "light-blue", price: 100, rent: 6 },
  
  // Row 2
  { id: 10, name: "Connecticut Ave", type: "property", color: "light-blue", price: 120, rent: 8 },
  { id: 11, name: "Jail", type: "special", color: "special" },
  { id: 12, name: "St. Charles Place", type: "property", color: "pink", price: 140, rent: 10 },
  { id: 13, name: "Electric Company", type: "utility", color: "utility", price: 150 },
  { id: 14, name: "States Ave", type: "property", color: "pink", price: 140, rent: 10 },
  { id: 15, name: "Virginia Ave", type: "property", color: "pink", price: 160, rent: 12 },
  { id: 16, name: "Pennsylvania Railroad", type: "railroad", color: "railroad", price: 200 },
  { id: 17, name: "St. James Place", type: "property", color: "orange", price: 180, rent: 14 },
  { id: 18, name: "Community Chest", type: "special", color: "special" },
  
  // Row 3
  { id: 19, name: "Tennessee Ave", type: "property", color: "orange", price: 180, rent: 14 },
  { id: 20, name: "New York Ave", type: "property", color: "orange", price: 200, rent: 16 },
  { id: 21, name: "Free Parking", type: "special", color: "special" },
  { id: 22, name: "Kentucky Ave", type: "property", color: "red", price: 220, rent: 18 },
  { id: 23, name: "Chance", type: "special", color: "special" },
  { id: 24, name: "Indiana Ave", type: "property", color: "red", price: 220, rent: 18 },
  { id: 25, name: "Illinois Ave", type: "property", color: "red", price: 240, rent: 20 },
  { id: 26, name: "B&O Railroad", type: "railroad", color: "railroad", price: 200 },
  { id: 27, name: "Atlantic Ave", type: "property", color: "yellow", price: 260, rent: 22 },
  
  // Row 4 (Bottom)
  { id: 28, name: "Ventnor Ave", type: "property", color: "yellow", price: 260, rent: 22 },
  { id: 29, name: "Water Works", type: "utility", color: "utility", price: 150 },
  { id: 30, name: "Marvin Gardens", type: "property", color: "yellow", price: 280, rent: 24 },
  { id: 31, name: "Go To Jail", type: "special", color: "special" },
  { id: 32, name: "Pacific Ave", type: "property", color: "green", price: 300, rent: 26 },
  { id: 33, name: "North Carolina Ave", type: "property", color: "green", price: 300, rent: 26 },
  { id: 34, name: "Community Chest", type: "special", color: "special" },
  { id: 35, name: "Pennsylvania Ave", type: "property", color: "green", price: 320, rent: 28 },
  { id: 36, name: "Short Line Railroad", type: "railroad", color: "railroad", price: 200 },
];

const getSquareColorClass = (square: BoardSquare) => {
  if (!square.color) return "bg-board-square";
  
  const colorMap: Record<string, string> = {
    brown: "bg-board-brown",
    "light-blue": "bg-board-light-blue", 
    pink: "bg-board-pink",
    orange: "bg-board-orange",
    red: "bg-board-red",
    yellow: "bg-board-yellow",
    green: "bg-board-green",
    "dark-blue": "bg-board-dark-blue",
    utility: "bg-board-utility",
    railroad: "bg-board-railroad text-white",
    special: "bg-board-special text-white"
  };
  
  return colorMap[square.color] || "bg-board-square";
};

const BoardSquareComponent = ({ square }: { square: BoardSquare }) => (
  <div 
    className={cn(
      "aspect-square border-2 border-board-square-border flex flex-col justify-center items-center p-1 relative transition-all hover:scale-105",
      getSquareColorClass(square)
    )}
  >
    <div className="text-center">
      <h3 className="font-bold text-[10px] sm:text-xs leading-tight mb-1">
        {square.name}
      </h3>
      {square.price && (
        <div className="text-[8px] sm:text-[10px] opacity-90">
          ${square.price}
        </div>
      )}
      {square.rent && (
        <div className="text-[7px] sm:text-[9px] opacity-80">
          Rent: ${square.rent}
        </div>
      )}
    </div>
    
    {/* Color strip for properties */}
    {square.type === "property" && square.color && (
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 h-2",
          getSquareColorClass(square)
        )} 
      />
    )}
  </div>
);

export const MonopolyBoard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
        Monopoly Board
      </h1>
      
      <div className="bg-board-center p-4 sm:p-6 rounded-lg shadow-2xl border-4 border-board-square-border">
        {/* 9x4 Grid */}
        <div className="grid grid-cols-9 gap-1 sm:gap-2 w-fit">
          {boardSquares.map((square) => (
            <BoardSquareComponent key={square.id} square={square} />
          ))}
        </div>
        
        {/* Center Logo/Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-board-center/90 backdrop-blur-sm rounded-full p-4 sm:p-6 border-2 border-board-square-border shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-foreground">
              MONOPOLY
            </h2>
            <p className="text-sm text-center text-muted-foreground mt-1">
              9×4 Board
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-muted-foreground max-w-md">
        <p>Custom Monopoly board with 36 squares arranged in a 9×4 grid. Each square represents a property, utility, railroad, or special space.</p>
      </div>
    </div>
  );
};