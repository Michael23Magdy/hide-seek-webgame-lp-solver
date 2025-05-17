
const BoxContainer = ({children, className = ""}) => {
    return (
        <div className={`bg-white p-4 rounded-2xl shadow-xl ${className}`}>
            {children}
        </div>
    )
}

export default BoxContainer;