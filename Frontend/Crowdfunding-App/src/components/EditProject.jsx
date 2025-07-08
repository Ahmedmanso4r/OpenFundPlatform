import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProject = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        target_amount: '',
        start_date: '',
        end_date: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            const accessToken = localStorage.getItem('access_token');
            try {
                const res = await axios.get(`http://localhost:8000/api/projects/projects/${projectId}/`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                setForm({
                    title: res.data.title || '',
                    description: res.data.description || '',
                    target_amount: res.data.target_amount || '',
                    start_date: res.data.start_date || '',
                    end_date: res.data.end_date || ''
                });
            } catch (err) {
                setError('Failed to load project data.');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const accessToken = localStorage.getItem('access_token');
        try {
            await axios.put(`http://localhost:8000/api/projects/projects/${projectId}/`, form, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            setSuccess('Project updated successfully!');
            setTimeout(() => navigate('/view-projects'), 1200);
        } catch (err) {
            setError('Failed to update project.');
        }
    };

    if (loading) {
        return <div className="container py-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-4">
                            <h2 className="mb-4 text-center text-primary">Edit Project</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows="4" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Target Amount</label>
                                    <input type="number" className="form-control" name="target_amount" value={form.target_amount} onChange={handleChange} required min="0" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Start Date</label>
                                    <input type="date" className="form-control" name="start_date" value={form.start_date} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">End Date</label>
                                    <input type="date" className="form-control" name="end_date" value={form.end_date} onChange={handleChange} required />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/view-projects')}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProject; 