import Link from "next/link";
import TokenrateWarning from "./tokenwarning";

const Navbar = () => {
  return (

    <Link href="/">
      <TokenrateWarning/>
      <nav className="mx-48 pt-10 mb-10 text-4xl SquatinaRegular">Docs Saver</nav>

    </Link>
  );
};

export default Navbar;
