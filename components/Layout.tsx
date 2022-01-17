import Link from "next/link";
import Sidebar from "./sidebar";

interface props {
  children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className="h-screen">
      <header className="bg-secondary h-10vh">
        <Sidebar />
      </header>
      {children}
    </div>
  );
};

export default Layout;
