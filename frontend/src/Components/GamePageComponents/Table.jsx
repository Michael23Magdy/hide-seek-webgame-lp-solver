import BoxContainer from "../ui/BoxContainer";

const Table = ({ Data, size, title }) => {
  if (!Data) return null;

  //const colsClass = columnClass[size] || "grid-cols-1";
  const columnsClass = `grid-cols-${size}`;

  return (
    <BoxContainer className="w-full max-h-screen">
      <h2 className="text-xl text-gray-800 text-center font-bold">{title}</h2>
      <div className={`grid gap-2 ${columnsClass}`}>
        {Data.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="text-center flex justify-center items-center"
            >
              {cell.toFixed(4)}
            </div>
          ))
        )}
      </div>
    </BoxContainer>
  );
};

export default Table;
