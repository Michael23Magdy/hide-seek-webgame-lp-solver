const Layout = ({ children }) => {
return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex flex-col items-center justify-center p-2 " style={{ fontFamily: "'Pacifico', cursive" }}>
        {children}
    </div>
);
};

export default Layout;