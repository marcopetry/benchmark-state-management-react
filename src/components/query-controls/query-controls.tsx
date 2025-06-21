import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styles from "./query-controls.module.css";

export const QueryControls = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  const [items, setItems] = useState(Number(search.items) || 100);

  useEffect(() => {
    navigate({
      search: (prev) =>
        ({
          ...prev,
          items: String(items),
        } as never),
      replace: true,
    });
  }, [items, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="items">
          Quantidade de Itens
        </label>
        <input
          id="items"
          type="number"
          value={items}
          onChange={(e) => setItems(Number(e.target.value))}
          min={1}
        />
      </div>
    </div>
  );
};
