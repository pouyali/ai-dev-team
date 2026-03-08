import ThemeToggle from './ThemeToggle';

const Settings = () => {
  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      <div className="setting-item">
        <label htmlFor="sunny-mode">Sunny Mode</label>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Settings;