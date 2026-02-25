import './LoadingSpinner.css';

/**
 * LoadingSpinner – Shown while API data is loading
 */
function LoadingSpinner() {
    return (
        <div className="spinner-wrapper" role="status" aria-label="Loading donors...">
            <div className="spinner-container">
                <div className="spinner-ring" />
                <div className="spinner-inner" />
            </div>
            <p className="spinner-text">Finding nearby donors...</p>
        </div>
    );
}

export default LoadingSpinner;
