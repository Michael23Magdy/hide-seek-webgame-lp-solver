
const PopupWindow = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-lg shadow-lg w-fit min-w-lg p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                {title && (
                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                )}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default PopupWindow;