


const RadioButton = ({
    id,
    name,
    value,
    checked = true,
    onChange,
    icon,
    label,
    disabled = false
})=>{
    return (
        <div className={`flex flex-col  items-center p-6 rounded-2xl shadow transition-all
            ${checked ? "bg-green-400 hover:bg-green-600" : "bg-sky-200"}`}
            onClick={()=>onChange()}>
            <h3 className="text-xl font-medium">{label}</h3>
            <div className="mt-2"><span className="text-2xl">{icon}</span></div>
        </div>
    )
}

export default RadioButton