import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styles from "./query-controls.module.css";

export const QueryControls = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  const [robot, setRobot] = useState(search.robot === "true");
  const [delay, setDelay] = useState(Number(search.delay) || 1000);
  const [items, setItems] = useState(Number(search.items) || 100);

  useEffect(() => {
    navigate({
      search: (prev) =>
        ({
          ...prev,
          robot: String(robot),
          delay: String(delay),
          items: String(items),
        } as never),
      replace: true,
    });
  }, [robot, delay, items, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={robot}
            onChange={(e) => setRobot(e.target.checked)}
          />
          Ativar Robô de Teste
        </label>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="delay">
          Delay da API (ms)
        </label>
        <input
          id="delay"
          type="number"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          min={0}
        />
      </div>

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
