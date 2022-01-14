import Link from "next/link";

interface props {
  children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className="h-screen">
      <header className="bg-secondary h-10vh">
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/projects">
            <a>Projects</a>
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Layout;
