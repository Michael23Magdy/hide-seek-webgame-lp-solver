import BoxContainer from "../ui/BoxContainer";

const Table = ({ Data, size, title, round = 0 }) => {
  if (!Data || !Array.isArray(Data)) return null;

  const columnsClass = `grid-cols-${size}`;

  return (
    <div className="w-full max-h-screen">
      <h2 className="text-xl text-gray-800 text-center font-bold">{title}</h2>
      <div className={`grid ${size<7?"gap-2":""} ${columnsClass} ${size<7?"text-xl": "text-sm"}`}>
        {Data.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="text-center flex justify-center items-center"
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
