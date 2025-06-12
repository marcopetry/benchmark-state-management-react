import { Link } from "@tanstack/react-router";

import styles from "./navbar.module.css";

type NavbarProps = {
  baseRoute: string;
  libName: string;
};

export const Navbar = ({ baseRoute, libName }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/" title="Página inicial">
            Home
          </Link>
        </li>
        <li>
          <Link to={`/${baseRoute}/products`} title="Produtos">
            {libName}
          </Link>
        </li>
        <li>
          <Link to={`/${baseRoute}/cart`} title="Carrinho">
            Carrinho
          </Link>
        </li>
      </ul>
    </nav>
  );
};
