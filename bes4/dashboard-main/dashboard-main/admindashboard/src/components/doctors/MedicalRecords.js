import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import './MedicalRecords.css';

const MedicalRecords = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;

    const navigate = useNavigate();

    const viewRecordDetails = (record) => {
        navigate('/record-details', { state: { record } });
    };

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                setLoading(true);
                const storedDoctorId = localStorage.getItem('doctor_id');
                if (storedDoctorId) {
                    const response = await axios.get(`http://localhost:8081/api/v1/medicalrecords/doctor/${storedDoctorId}`);
                    setMedicalRecords(response.data);
                    setError('');
                } else {
                    setError('Doctor ID not found');
                }
            } catch (error) {
                console.error('Error fetching medical records', error);
                setError('Unable to load medical records data');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicalRecords();
    }, []);

    const filteredMedicalRecords = medicalRecords.filter(record =>
        record.patients[0]?.patient_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedRecords = [...filteredMedicalRecords].sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
            case 'date':
                comparison = new Date(a.follow_up_date) - new Date(b.follow_up_date);
                break;
            case 'name':
                comparison = (a.patients[0]?.patient_name || '').localeCompare(b.patients[0]?.patient_name || '');
                break;
            case 'id':
                comparison = a.record_id - b.record_id;
                break;
            default:
                comparison = 0;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('desc');
        }
        setCurrentPage(1);
    };

    const handleOpenTodayAppointments = () => {
        navigate('/todayappointments');
    };

    const handleOpenMonthlyAppointments = () => {
        navigate('/monthlyappointments');
    };

    const handleOpenMedicalRecords = () => {
        navigate('/medicalrecords');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (diagnosis) => {
        const colors = ['#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff3e0', '#fce4ec'];
        const hash = diagnosis.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        return colors[Math.abs(hash) % colors.length];
    };

    if (loading) {
        return (
            <div className="medical-records">
                <Sidebar
                    handleOpenTodayAppointments={handleOpenTodayAppointments}
                    handleOpenMonthlyAppointments={handleOpenMonthlyAppointments}
                    handleOpenMedicalRecords={handleOpenMedicalRecords}
                />
                <div className="content">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading data...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="medical-records">
                <Sidebar
                    handleOpenTodayAppointments={handleOpenTodayAppointments}
                    handleOpenMonthlyAppointments={handleOpenMonthlyAppointments}
                    handleOpenMedicalRecords={handleOpenMedicalRecords}
                />
                <div className="content">
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <h3>An error occurred</h3>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="retry-btn">
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="medical-records">
            <Sidebar
                handleOpenTodayAppointments={handleOpenTodayAppointments}
                handleOpenMonthlyAppointments={handleOpenMonthlyAppointments}
                handleOpenMedicalRecords={handleOpenMedicalRecords}
            />
            <div className="content">
                <div className="header-section">
                    <h1 className="page-title">
                        <span className="title-icon">📋</span>
                        Medical Records
                    </h1>
                    <div className="controls-stats-container">
                        <div className="search-container-v1">
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Search by patient name..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="search-input"
                                />
                                {searchQuery && (
                                    <button
                                        className="clear-search-1"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setCurrentPage(1);
                                        }}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="sort-container">
                            <label>Sort by:</label>
                            <div className="sort-buttons">
                                <button
                                    className={`sort-btn ${sortBy === 'date' ? 'active' : ''}`}
                                    onClick={() => handleSortChange('date')}
                                >
                                    Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                                <button
                                    className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
                                    onClick={() => handleSortChange('name')}
                                >
                                    Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                                <button
                                    className={`sort-btn ${sortBy === 'id' ? 'active' : ''}`}
                                    onClick={() => handleSortChange('id')}
                                >
                                    ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                            </div>
                        </div>
                        <div className="stats-container">
                            <div className="stat-card">
                                <div className="stat-number">{medicalRecords.length}</div>
                                <div className="stat-label">Total Records</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">{filteredMedicalRecords.length}</div>
                                <div className="stat-label">Search Results</div>
                            </div>
                        </div>
                    </div>
                </div>

                {currentRecords.length === 0 ? (
                    <div className="no-results">
                        <div className="no-results-icon">📄</div>
                        <h3>No medical records found</h3>
                        <p>
                            {searchQuery
                                ? `No results found for "${searchQuery}"`
                                : "No medical records have been created"
                            }
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="records-list">
                            {currentRecords.map((record, index) => (
                                <div key={record.record_id} className="record-item">
                                    <div className="record-content">
                                        <div className="record-header">
                                            <div className="record-id">
                                                <span className="id-label">MR-</span>
                                                <span className="id-number">{String(record.record_id).padStart(4, '0')}</span>
                                            </div>
                                            <div
                                                className="diagnosis-badge"
                                                style={{ backgroundColor: getStatusColor(record.diagnosis) }}
                                            >
                                                {record.diagnosis}
                                            </div>
                                        </div>

                                        <div className="record-body">
                                            <div className="patient-info">
                                                <div className="patient-avatar">
                                                    {record.patients[0]?.patient_name?.charAt(0)?.toUpperCase() || 'N'}
                                                </div>
                                                <div className="patient-details">
                                                    <h4 className="patient-name">
                                                        {record.patients[0]?.patient_name || 'N/A'}
                                                    </h4>
                                                    <p className="patient-email">
                                                        {record.patients[0]?.patient_email || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="record-info">
                                                <div className="info-row">
                                                    <span className="info-icon">📅</span>
                                                    <span className="info-text">
                                                        {formatDate(record.follow_up_date)}
                                                    </span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="info-icon">🩺</span>
                                                    <span className="info-text symptoms">
                                                        {record.symptoms}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="record-actions">
                                            <button
                                                className="view-details-btn"
                                                onClick={() => viewRecordDetails(record)}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                                                onClick={() => handlePageChange(pageNumber)}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    } else if (
                                        pageNumber === currentPage - 2 ||
                                        pageNumber === currentPage + 2
                                    ) {
                                        return <span key={`dots-${pageNumber}`} className="pagination-dots">...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    className="pagination-btn"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MedicalRecords;