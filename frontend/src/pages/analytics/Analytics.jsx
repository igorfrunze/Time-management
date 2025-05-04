import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { selectProjects, selectTimers } from '../../redux';
import { Aside } from '../../components';
import styles from './analytics.module.css';

const COLORS = ['#00C49F', '#FF8042'];

const getAnalyticsData = (projects, timers) => {
  let started = 0;
  let notStarted = 0;

  projects.forEach((project) => {
    const timer = timers[project._id];
    const timeSpent = timer?.timeSpent || 0;
    const isRunning = timer?.isRunning || false;

    if (isRunning || timeSpent > 1) {
      started += 1;
    } else {
      notStarted += 1;
    }
  });

  return [
    { name: 'Started Projects', value: started },
    { name: 'Not Started', value: notStarted },
  ];
};

export const Analytics = () => {
  const { projects, loading } = useSelector(selectProjects);
  const timers = useSelector(selectTimers);

  const chartData = getAnalyticsData(projects, timers);

  if (loading) return <p>Loading analytics...</p>;

  return (
    <main className={styles.analytics_main}>
      <Aside />
      <div className={styles.analytics_container}>
        <h2 className={styles.analytics_heading}>Project Timer Status</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </main>
  );
};
