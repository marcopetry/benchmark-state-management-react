import styles from "./page-checkout.module.css";
import { UseCartHook } from "@/types/cart-state.types";
import { useNavigate } from "@tanstack/react-router";
import { Profiler } from "react";

type PageCheckoutProps = {
  basePath: string;
  useCart: UseCartHook;
};

export const PageCheckout: React.FC<PageCheckoutProps> = ({
  basePath,
  useCart,
}) => {
  const { items, clearCart } = useCart();

  const navigate = useNavigate();
  const total = items.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <Profiler id={`${basePath}/page-checkout`} onRender={console.log}>
      <div className={styles.page}>
        <div className={styles.container}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: `/${basePath}/products` });
              clearCart();
            }}
          >
            <h2 className={styles.sectionTitle}>Informações de Pagamento</h2>

            <div className={styles.field}>
              <label>Nome no Cartão</label>
              <input type="text" required />
            </div>

            <div className={styles.field}>
              <label>Número do Cartão</label>
              <input type="text" required maxLength={19} />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Validade</label>
                <input type="text" placeholder="MM/AA" required />
              </div>
              <div className={styles.field}>
                <label>CVV</label>
                <input type="text" maxLength={4} required />
              </div>
            </div>

            <button type="submit" className={styles.payButton}>
              Confirmar Pagamento
            </button>
          </form>

          <div className={styles.summary}>
            <h2 className={styles.sectionTitle}>Resumo do Pedido</h2>
            <ul className={styles.productList}>
              {items.map((p) => (
                <li key={p.id} className={styles.productItem}>
                  <span className={styles.title}>{p.title}</span>
                  <span className={styles.total}>
                    {p.quantity} × R$ {p.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.totalRow}>
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Profiler>
  );
};
