import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profiles, setProfiles] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        address: '',
        phone: '',
        email: ''
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await fetch('/api/profiles');
            const data = await response.json();
            setProfiles(data);
        } catch (err) {
            setError('Failed to fetch profiles');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const url = editing ? `/api/profiles/${currentId}` : '/api/profiles';
            const method = editing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                if (editing) {
                    setProfiles(profiles.map(p => p.id === currentId ? data : p));
                    setEditing(false);
                    setCurrentId(null);
                } else {
                    setProfiles([...profiles, data]);
                }
                setFormData({ name: '', lastname: '', address: '', phone: '', email: '' });
                setSuccess(editing ? 'Profile updated successfully!' : 'Profile created successfully!');
            } else {
                const data = await response.json();
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    const handleEdit = (profile) => {
        setFormData(profile);
        setEditing(true);
        setCurrentId(profile.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this profile?')) return;

        try {
            const response = await fetch(`/api/profiles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                }
            });

            if (response.ok) {
                setProfiles(profiles.filter(p => p.id !== id));
                setSuccess('Profile deleted successfully!');
            } else {
                setError('Failed to delete profile');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2>{editing ? 'Edit Profile' : 'Create Profile'}</h2>
                {error && <div style={styles.error}>{error}</div>}
                {success && <div style={styles.success}>{success}</div>}
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        {editing ? 'Update' : 'Create'} Profile
                    </button>
                    {editing && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditing(false);
                                setCurrentId(null);
                                setFormData({ name: '', lastname: '', address: '', phone: '', email: '' });
                            }}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            <div style={styles.listContainer}>
                <h2>Profiles</h2>
                {profiles.map(profile => (
                    <div key={profile.id} style={styles.profileCard}>
                        <div>
                            <h3>{profile.name} {profile.lastname}</h3>
                            <p>Email: {profile.email}</p>
                            <p>Address: {profile.address}</p>
                            {profile.phone && <p>Phone: {profile.phone}</p>}
                        </div>
                        <div style={styles.cardButtons}>
                            <button
                                onClick={() => handleEdit(profile)}
                                style={styles.editButton}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(profile.id)}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        padding: '20px',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    formContainer: {
        flex: '0 0 400px',
    },
    listContainer: {
        flex: 1,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    cancelButton: {
        padding: '10px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
    },
    error: {
        color: '#f44336',
        marginBottom: '10px',
    },
    success: {
        color: '#4CAF50',
        marginBottom: '10px',
    },
    profileCard: {
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardButtons: {
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Profile;