import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Aside, TimerControls } from '../../components';
import { Button } from '../../components';
import { fetchProject, fetchTimers } from '../../redux';
import styles from './projects.module.css';
import { selectProjects, selectTimers } from '../../redux';
import { formatTime } from '../../utils';

export const Projects = () => {
  const [sortBy, setSortBy] = useState('desc');
  const [filter, setFilter] = useState('');
  const [tick, setTick] = useState(0);
  const { projects, page, totalPages, loading } = useSelector(selectProjects);
  const timers = useSelector(selectTimers);
  const userId = localStorage.getItem('id');
  const [flipPage, setFlipPage] = useState(page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchProject(userId, flipPage, 6, sortBy, filter));
      dispatch(fetchTimers());
    }
  }, [dispatch, userId, flipPage, sortBy, filter]);

  useEffect(() => {
    const hasRunningTimers = Object.values(timers).some(
      (timer) => timer.isRunning
    );

    if (hasRunningTimers) {
      const interval = setInterval(() => {
        setTick((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timers]);

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

  const getDisplayedTime = (timer) => {
    if (!timer) return 0;
    if (!timer.isRunning) return timer.timeSpent || 0;
    if (!timer.startedAt) return timer.timeSpent || 0;

    const startedAt = new Date(timer.startedAt);
    if (isNaN(startedAt.getTime())) return timer.timeSpent || 0;

    const now = new Date();
    const liveSeconds = (now - startedAt) / 1000;
    return Math.floor((timer.timeSpent || 0) + liveSeconds);
  };

  return (
    <main className={styles.project_main}>
      <Aside />
      <div className={styles.projects_zone}>
        <input
          className={styles.projects_input_filter}
          type="text"
          placeholder="Filter by title"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          className={styles.projects_dropdown}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>

        {loading ? (
          <>
            <p className={styles.loading}></p>
            <span>Loading...</span>
          </>
        ) : projects.length === 0 ? (
          <p>No projects found. Create a new one to get started</p>
        ) : (
          <div className={styles.projects_list}>
            <div className={styles.projects_list_cards}>
              {projects.map((project) => {
                const projectTimer = timers[project._id];
                const timeSpent = getDisplayedTime(projectTimer);

                return (
                  <div key={project._id} className={styles.project_card}>
                    <span className={styles.projects_timer}>
                      Timer <TimerControls projectId={project._id} />
                      <div>
                        {projectTimer?.isRunning ? (
                          <span>Running...</span>
                        ) : (
                          <span>Stopped</span>
                        )}
                        <br />
                        Time spent: {formatTime(timeSpent)}
                      </div>
                    </span>
                    <Link to={`/projects/edit/${project._id}`}>
                      <h3 className={styles.project_card_h2}>
                        {project.name.length > 20
                          ? project.name.slice(0, 20) + '...'
                          : project.name}
                      </h3>
                    </Link>
                    <p className={styles.project_card_p}>
                      {project.content.length > 150
                        ? project.content.slice(0, 150) + ' ...'
                        : project.content}
                    </p>
                    <small className={styles.project_card_small}>
                      Created:{' '}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                );
              })}
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
