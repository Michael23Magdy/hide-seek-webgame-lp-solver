const Cell= ({x,y,level,hiderChoice,seekerChoice,onClick})=>{
    const Colors = ['bg-red-200', 'bg-green-200', 'bg-gray-200'];
    const Names = ['Hard', 'Medium', 'Neutral'];
    const isHider = hiderChoice.x === x && hiderChoice.y === y;
    const isSeeker = seekerChoice.x === x && seekerChoice.y === y;
    const found = hiderChoice.x === seekerChoice.x && hiderChoice.y === seekerChoice.y;
    let name = Names[level];
    if(found && isHider && isSeeker){
        name = '✔️';
    }
    const cellColor=Colors[level];
    return(
        <div
            onClick={() => onClick(x, y)}
            className={`
                ${cellColor} aspect-square p-6
                flex items-center justify-center 
                text-l font-medium text-gray-700 
                border border-gray-600 rounded-lg cursor-pointer 
                hover:scale-105 transition-transform select-none
            `}
        >
            {name}
        </div>
    );

};
export default Cell;