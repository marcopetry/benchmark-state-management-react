import { Link } from "@tanstack/react-router";

import styles from "./navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/" title="Página inicial">
            Home
          </Link>
        </li>
        <li>
          <Link to="/context-api/products" title="Sobre nós">
            Context Api
          </Link>
        </li>
      </ul>
    </nav>
  );
};
