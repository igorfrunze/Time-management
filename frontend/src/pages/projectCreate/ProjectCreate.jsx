import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postProject } from '../../redux';
import { Aside, Button } from '../../components';
import styles from './project-create.module.css';

export const ProjectCreate = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = localStorage.getItem('id');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await dispatch(postProject(id, projectName, projectDescription));
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project', error);
    }
  }

  return (
    <main className={styles.project_create_main}>
      <Aside />
      <form className={styles.project_create_form} onSubmit={handleSubmit}>
        <span>Create new project</span>
        <input
          className={styles.project_create_input}
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        />
        <textarea
          className={styles.project_create_textarea}
          placeholder="Project description"
          value={projectDescription}
          onChange={(event) => setProjectDescription(event.target.value)}
        ></textarea>
        <Button>Create</Button>
      </form>
    </main>
  );
};
