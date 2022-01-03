import Link from "next/link";

interface props {
  children: React.ReactNode;
}

const Layout: React.FC<props> = ({ children }) => {
  return (
    <div>
      <header>
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
          <Link href="/scratchpad">
            <a>Code scratchpad</a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
