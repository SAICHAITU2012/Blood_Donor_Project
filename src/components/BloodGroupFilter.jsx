import './BloodGroupFilter.css';

// All supported blood groups
const BLOOD_GROUPS = ['All', 'A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB+', 'AB−'];

/**
 * BloodGroupFilter – Dropdown to filter donors by blood group
 * Props:
 *   value          {string}   – currently selected value
 *   onFilterChange {function} – called with new value on change
 */
function BloodGroupFilter({ value, onFilterChange }) {
    return (
        <div className="filter-group">
            <label className="filter-label" htmlFor="blood-group-select">
                🩸 Blood Group
            </label>
            <select
                id="blood-group-select"
                className="filter-select"
                value={value}
                onChange={(e) => onFilterChange(e.target.value)}
            >
                {BLOOD_GROUPS.map((group) => (
                    <option key={group} value={group}>
                        {group === 'All' ? 'All Blood Groups' : group}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default BloodGroupFilter;
