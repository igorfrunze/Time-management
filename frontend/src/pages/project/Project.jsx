import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { putProject, getSingleProject, deleteProject, selectProjects } from '../../redux';
import { Aside, Button } from '../../components';
import styles from './project.module.css';

export const Project = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleProject } = useSelector(selectProjects);

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (singleProject) {
      setProjectName(singleProject.name || '');
      setProjectDescription(singleProject.content || '');
    }
  }, [singleProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(putProject(projectId, projectName, projectDescription));
    navigate('/projects');
  };

  const handleDelete = async () => {
    if (confirm('Delete this project?')) {
      await dispatch(deleteProject(projectId));
      navigate('/projects');
    }
  };

  return (
    <main className={styles.project_main}>
      <Aside />
      <form className={styles.project_form} onSubmit={handleSubmit}>
        <span>Edit Project</span>
        <input
          className={styles.project_input}
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          className={styles.project_textarea}
          placeholder="Project description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <div className={styles.project_buttons}>
          <Button>Edit</Button>
          <Button onClick={handleDelete} type="button" style={{ marginLeft: '1rem' }}>
            Delete
          </Button>
        </div>
      </form>
    </main>
  );
};