import styles from "./home-card.module.css";

type LibCardProps = {
  name: string;
  logoUrl: string;
  githubUrl: string;
};

const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const HomeCard = ({ name, logoUrl, githubUrl }: LibCardProps) => {
  const kebabName = toKebabCase(name);

  return (
    <div className={styles.card}>
      <img src={logoUrl} alt={`${name} logo`} className={styles.logo} />
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.links}>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            className={styles.githubIcon}
          />
        </a>
        <a href={`/${kebabName}/products`} className={styles.detailsLink}>
          Ver detalhes
        </a>
      </div>
    </div>
  );
};
