import './StatsBar.css';

/**
 * StatsBar – Shows live donor statistics
 * Props:
 *   total         {number} – total donors fetched
 *   available     {number} – donors with availability === true
 *   requested     {number} – donors whose request has been sent
 */
function StatsBar({ total, available, requested }) {
    return (
        <div className="stats-bar">
            <div className="stat-item">
                <div className="stat-icon">🧑‍🤝‍🧑</div>
                <div className="stat-text">
                    <span className="stat-value">{total}</span>
                    <span className="stat-label">Total Donors</span>
                </div>
            </div>

            <div className="stats-divider" />

            <div className="stat-item">
                <div className="stat-icon">✅</div>
                <div className="stat-text">
                    <span className="stat-value" style={{ color: 'var(--green)' }}>{available}</span>
                    <span className="stat-label">Available Now</span>
                </div>
            </div>

            <div className="stats-divider" />

            <div className="stat-item">
                <div className="stat-icon">📨</div>
                <div className="stat-text">
                    <span className="stat-value" style={{ color: 'var(--yellow)' }}>{requested}</span>
                    <span className="stat-label">Requests Sent</span>
                </div>
            </div>
        </div>
    );
}

export default StatsBar;
