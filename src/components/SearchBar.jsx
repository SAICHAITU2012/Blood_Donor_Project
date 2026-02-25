import './SearchBar.css';

/**
 * SearchBar – City search input (Bonus feature)
 * Props:
 *   value          {string}   – current search text
 *   onSearchChange {function} – called with new value
 */
function SearchBar({ value, onSearchChange }) {
    return (
        <div className="search-group">
            <label className="search-label" htmlFor="city-search">
                🏙️ Search by City
            </label>
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    id="city-search"
                    type="text"
                    className="search-input"
                    placeholder="e.g. Gwenborough, Roscoeview..."
                    value={value}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Search donors by city"
                />
            </div>
        </div>
    );
}

export default SearchBar;
