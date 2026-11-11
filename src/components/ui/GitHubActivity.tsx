import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../../context/ThemeContext';

/** GitHub contribution calendar; its own chunk so the About page renders before the calendar library loads. */
const GitHubActivity: React.FC = () => {
  const { theme } = useTheme();
  return (
    <GitHubCalendar
      username="DhruvAthaide"
      colorScheme={theme === 'dark' ? 'dark' : 'light'}
      blockSize={12}
      blockMargin={5}
      fontSize={14}
    />
  );
};

export default GitHubActivity;
