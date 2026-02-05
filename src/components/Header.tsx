import "./Header.css";

interface HeaderProps {
  onAddTask: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({
  onAddTask,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon">
              <svg
                viewBox="0 0 36 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Barra 1 - Cyan (menor) */}
                <rect
                  x="2"
                  y="12"
                  width="8"
                  height="18"
                  rx="2"
                  fill="url(#gradient1)"
                  className="logo-bar bar-1"
                />
                {/* Barra 2 - Amarela (média) */}
                <rect
                  x="14"
                  y="6"
                  width="8"
                  height="24"
                  rx="2"
                  fill="url(#gradient2)"
                  className="logo-bar bar-2"
                />
                {/* Barra 3 - Verde (maior) */}
                <rect
                  x="26"
                  y="2"
                  width="8"
                  height="28"
                  rx="2"
                  fill="url(#gradient3)"
                  className="logo-bar bar-3"
                />
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="6"
                    y1="12"
                    x2="6"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#00d9ff" />
                    <stop offset="1" stopColor="#0099cc" />
                  </linearGradient>
                  <linearGradient
                    id="gradient2"
                    x1="18"
                    y1="6"
                    x2="18"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#ffd93d" />
                    <stop offset="1" stopColor="#e6b800" />
                  </linearGradient>
                  <linearGradient
                    id="gradient3"
                    x1="30"
                    y1="2"
                    x2="30"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#6bcb77" />
                    <stop offset="1" stopColor="#4aa356" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Kanban</h1>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <div className="search-container">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 20L16.5 16.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar tarefas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <button className="add-task-btn" onClick={onAddTask}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span>Nova tarefa</span>
          </button>
        </div>
      </div>
    </header>
  );
}
