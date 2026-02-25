import DonorCard from './DonorCard';
import '../App.css';

/**
 * DonorList – Renders a grid of DonorCard components
 * Props:
 *   donors        {Array}    – filtered donors array
 *   requestStatus {object}   – { [id]: boolean } map
 *   onRequest     {function} – passed down to each DonorCard
 */
function DonorList({ donors, requestStatus, onRequest }) {
    return (
        <div className="donor-grid">
            {donors.map((donor) => (
                <DonorCard
                    key={donor.id}
                    donor={donor}
                    isRequested={!!requestStatus[donor.id]}
                    onRequest={onRequest}
                />
            ))}
        </div>
    );
}

export default DonorList;
