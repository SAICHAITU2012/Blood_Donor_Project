import './DonorCard.css';

/**
 * DonorCard – Displays a single donor's information
 * Props:
 *   donor         {object}   – donor data object
 *   isRequested   {boolean}  – whether request has been sent
 *   onRequest     {function} – called with donor.id when button is clicked
 */
function DonorCard({ donor, isRequested, onRequest }) {
    // Get initials for avatar
    const initials = donor.name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join('');

    return (
        <div className="donor-card">
            {/* Header: Avatar + Name + Blood Group Badge */}
            <div className="card-header">
                <div className="donor-avatar">{initials}</div>
                <div className="donor-name-group">
                    <div className="donor-name">{donor.name}</div>
                    <div className="donor-username">@{donor.username}</div>
                </div>
                <div className="blood-group-badge">{donor.bloodGroup}</div>
            </div>

            {/* Info rows */}
            <div className="card-info">
                {/* City */}
                <div className="info-row">
                    <span className="info-icon">📍</span>
                    <span>{donor.city}</span>
                </div>

                {/* Email */}
                <div className="info-row">
                    <span className="info-icon">✉️</span>
                    <span>{donor.email}</span>
                </div>

                {/* Phone */}
                <div className="info-row">
                    <span className="info-icon">📞</span>
                    <span>{donor.phone}</span>
                </div>

                {/* Availability */}
                <div className="info-row">
                    <span className="info-icon">🩺</span>
                    {donor.available ? (
                        <span className="availability-badge available">
                            <span className="availability-dot" />
                            Available Now
                        </span>
                    ) : (
                        <span className="availability-badge unavailable">
                            <span className="availability-dot" />
                            Unavailable
                        </span>
                    )}
                </div>
            </div>

            {/* Request Button */}
            {isRequested ? (
                <button className="request-btn sent" disabled>
                    <span>✅</span> Request Sent
                </button>
            ) : (
                <button
                    className="request-btn idle"
                    onClick={() => onRequest(donor.id)}
                >
                    <span>🩸</span> Request Help
                </button>
            )}
        </div>
    );
}

export default DonorCard;
