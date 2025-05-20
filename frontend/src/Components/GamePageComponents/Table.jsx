import BoxContainer from "../ui/BoxContainer";

// Helper to get background color based on value (0-1 normalized)
function getCellColor(value, min, max) {
  if (typeof value !== "number" || isNaN(value)) return "";
  // Normalize value between 0 and 1
  const norm = max === min ? 0 : (value - min) / (max - min);
  // Use HSL: 220deg (blue) with increasing saturation for higher values
  const saturation = 30 + norm * 70; // 30% to 100%
  const lightness = 90 - norm * 40; // 90% to 50%
  return `background-color: hsl(220, ${saturation}%, ${lightness}%);`;
}

const Table = ({ Data, size, title, round = 0 }) => {
  if (!Data || !Array.isArray(Data)) return null;

  // Flatten data to find min/max for coloring
  const flat = Data.flat().filter((v) => typeof v === "number");
  const min = Math.min(...flat);
  const max = Math.max(...flat);

  const columnsClass = `grid-cols-${size}`;

  return (
    <div className="w-full max-h-screen">
      <h2 className="text-xl text-gray-800 text-center font-bold mb-3">{title}</h2>
      <div className={`grid ${size<7?"gap-2":""} ${columnsClass} ${size<7?"text-xl": "text-sm"}`}>
        {Data.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="text-center flex justify-center items-center"
              style={typeof cell === "number" ? { ...Object.fromEntries(getCellColor(cell, min, max).split(';').filter(Boolean).map(s => s.split(':').map(x => x.trim())))} : {}}
            >
              {typeof cell === "number" ? cell.toFixed(round) : cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
