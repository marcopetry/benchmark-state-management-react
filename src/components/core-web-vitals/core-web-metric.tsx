import styles from "./core-web-vitals.module.css";

type CoreWebMetricCardProps = {
  title: string;
  value: string;
};

export const CoreWebMetricCard: React.FC<CoreWebMetricCardProps> = ({
  title,
  value,
}) => {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};
