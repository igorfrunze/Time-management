import { Link } from 'react-router-dom';
import styles from './aside.module.css';

export const Aside = () => {
  return (
    <aside className={styles.aside_component}>
      <main>
        <ul className={styles.aside_ul}>
          <li>
            <Link className={styles.link_li} to="/projects/create">
              Create project
            </Link>
          </li>
          <li>
            <Link className={styles.link_li} to="/projects">
              All projects
            </Link>
          </li>
          <li>
            <Link className={styles.link_li} to="/analytics">
              Analytics
            </Link>
          </li>
          <li>Filter</li>
          <li>Sort</li>
        </ul>
      </main>
    </aside>
  );
};
