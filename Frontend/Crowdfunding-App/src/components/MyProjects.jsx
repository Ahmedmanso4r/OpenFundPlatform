import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const accessToken = localStorage.getItem('access_token');
            const userData = localStorage.getItem('user_data');
            let username = null;
            if (userData) {
                try {
                    username = JSON.parse(userData).username;
                } catch {
                    // Optionally log or handle error
                }
            }
            if (!username) {
                setError('User not found.');
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get('http://localhost:8000/api/projects/projects/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                // Filter projects by owner id
                const userDataObj = userData ? JSON.parse(userData) : null;
                const myProjects = res.data.filter(p => Number(p.owner) === Number(userDataObj?.id));
                setProjects(myProjects);
            } catch (err) {
                setError('Failed to fetch your projects.');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleDelete = async (projectId) => {
        const accessToken = localStorage.getItem('access_token');
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            await axios.delete(`http://localhost:8000/api/projects/${projectId}/delete/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            // Remove deleted project from state
            setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
        } catch (error) {
            alert("Failed to delete project.");
            console.error("Delete error:", error);
        }
    };

    if (loading) {
        return <div className="container py-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    if (error) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger">{error}</div>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center text-primary">My Projects</h2>
            {projects.length === 0 ? (
                <div className="alert alert-info text-center">You have not created any projects yet.</div>
            ) : (
                <div className="row g-4">
                    {projects.map(project => (
                        <div key={project.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card shadow-lg border-0 h-100">
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold text-dark mb-2">{project.title}</h5>
                                    <p className="card-text text-muted mb-3">{project.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/edit/${project.id}`)}>
                                            <i className="fas fa-edit me-1"></i> Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(project.id)}>
                                            <i className="fas fa-trash-alt me-1"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
        </div>
    );
};

export default MyProjects;
