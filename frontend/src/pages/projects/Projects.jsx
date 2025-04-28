import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Aside } from '../../components';
import { Button } from '../../components';
import { fetchProject } from '../../redux';
import styles from './projects.module.css';
import { selectProjects } from '../../redux';

export const Projects = () => {
  const dispatch = useDispatch();
  const { projects, page, totalPages } = useSelector(selectProjects);
  const userId = localStorage.getItem('id');
  const [flipPage, setFlipPage] = useState(page);
  useEffect(() => {
    if (userId) {
      dispatch(fetchProject(userId, flipPage));
    }
  }, [dispatch, userId, flipPage]);

  const handlePageChangeIncrease = () => {
    if (flipPage < totalPages) {
      setFlipPage((prev) => prev + 1);
    }
  };

  const handlePageChangeDecrease = () => {
    if (flipPage > 1) {
      setFlipPage((prev) => prev - 1);
    }
  };

  return (
    <main className={styles.project_main}>
      <Aside />
      <div className={styles.projects_zone}>
        <h2>Your Projects</h2>
        {projects.length === 0 ? (
          <p>No projects found. Create a new one to get started</p>
        ) : (
          <div className={styles.projects_list}>
            <div className={styles.projects_list_cards}>
              {projects.map((project) => (
                <div key={project._id} className={styles.project_card}>
                  <Link to={`/projects/${project._id}`}>
                    <h3 className={styles.project_card_h2}>{project.name}</h3>
                  </Link>
                  <p className={styles.project_card_p}>
                    {project.content.length > 200
                      ? project.content.slice(0, 200) + ' ...'
                      : project.content}
                  </p>
                  <small className={styles.project_card_small}>
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
            <div className={styles.projects_pagination}>
              <Button onClick={handlePageChangeDecrease}>Previous</Button>
              <div>
                {page} of {totalPages}
              </div>
              <Button onClick={handlePageChangeIncrease}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
