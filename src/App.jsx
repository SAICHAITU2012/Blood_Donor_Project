import { useState, useEffect } from 'react';
import './App.css';

// Components
import NavBar from './components/NavBar';
import StatsBar from './components/StatsBar';
import BloodGroupFilter from './components/BloodGroupFilter';
import SearchBar from './components/SearchBar';
import DonorList from './components/DonorList';
import LoadingSpinner from './components/LoadingSpinner';
import NoDonorsFound from './components/NoDonorsFound';

// ─────────────────────────────────────────────
// Blood groups to randomly assign to each user
// ─────────────────────────────────────────────
const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB+', 'AB−'];

/**
 * Map a raw JSONPlaceholder user object → donor object
 * We deterministically assign blood group and availability
 * based on the user's id so results are consistent on re-fetch.
 */
function mapUserToDonor(user) {
  const bloodGroup = BLOOD_GROUPS[user.id % BLOOD_GROUPS.length];
  const available = user.id % 3 !== 0;           // ~67% available
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    city: user.address.city,
    bloodGroup,
    available,
  };
}

// ─────────────────────────────────────────────
// Root App Component
// ─────────────────────────────────────────────
function App() {
  // ── State ────────────────────────────────────
  const [donors, setDonors] = useState([]);          // Full donor list from API
  const [loading, setLoading] = useState(true);         // Loading spinner
  const [error, setError] = useState(null);          // Error message
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');  // Dropdown filter
  const [citySearch, setCitySearch] = useState('');            // City search input
  const [requestStatus, setRequestStatus] = useState({});            // { [id]: true } per donor

  // ── Side Effect: Fetch donors on mount ───────
  useEffect(() => {
    async function fetchDonors() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();
        const mappedDonors = users.map(mapUserToDonor);
        setDonors(mappedDonors);
      } catch (err) {
        setError('Failed to load donors. Please check your connection and try again.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDonors();
  }, []); // Empty dependency array → runs only once on mount

  // ── Derived State: Filtered donors ───────────
  const filteredDonors = donors.filter((donor) => {
    const matchesBloodGroup =
      selectedBloodGroup === 'All' || donor.bloodGroup === selectedBloodGroup;

    const matchesCity =
      citySearch.trim() === '' ||
      donor.city.toLowerCase().includes(citySearch.toLowerCase().trim());

    return matchesBloodGroup && matchesCity;
  });

  // ── Stats (derived) ───────────────────────────
  const availableCount = filteredDonors.filter((d) => d.available).length;
  const requestedCount = Object.values(requestStatus).filter(Boolean).length;

  // ── Handler: Request Help button click ───────
  function handleRequest(donorId) {
    setRequestStatus((prev) => ({
      ...prev,
      [donorId]: true,
    }));
  }

  // ── Render ────────────────────────────────────
  return (
    <div className="app">
      <NavBar />

      <main className="main-content">
        <div className="container">
          {/* Stats bar */}
          <StatsBar
            total={filteredDonors.length}
            available={availableCount}
            requested={requestedCount}
          />

          {/* Controls: Filter + Search */}
          <div className="controls-row">
            <BloodGroupFilter
              value={selectedBloodGroup}
              onFilterChange={setSelectedBloodGroup}
            />
            <SearchBar
              value={citySearch}
              onSearchChange={setCitySearch}
            />
          </div>

          {/* Conditional Rendering */}
          {loading ? (
            /* Loading State */
            <LoadingSpinner />
          ) : error ? (
            /* Error State */
            <div className="center-box">
              <p style={{ color: 'var(--red-primary)', fontWeight: 600 }}>⚠️ {error}</p>
            </div>
          ) : filteredDonors.length === 0 ? (
            /* Empty State */
            <NoDonorsFound
              selectedBloodGroup={selectedBloodGroup}
              citySearch={citySearch}
            />
          ) : (
            /* Donor Grid */
            <DonorList
              donors={filteredDonors}
              requestStatus={requestStatus}
              onRequest={handleRequest}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
