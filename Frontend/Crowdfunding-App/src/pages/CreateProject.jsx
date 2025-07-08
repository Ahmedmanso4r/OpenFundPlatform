

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/projects/create/',
        {
          title,
          description,
          target_amount: goal,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('✅ Project created successfully!');
      setTitle('');
      setDescription('');
      setGoal('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError('❌ Failed to create project. Please try again.');
      console.error(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(to right, #667eea, #764ba2)',
        backgroundAttachment: 'fixed',
        padding: '30px',
      }}
    >
      <div className="card shadow-lg border-0" style={{ maxWidth: 600, width: '100%' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div
              className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{ width: 60, height: 60 }}
            >
              <i className="fas fa-folder-plus" style={{ fontSize: 24 }}></i>
            </div>
            <h2 className="text-dark fw-bold">Create New Project</h2>
            <p className="text-muted">Fill in your project details below</p>
          </div>

          <hr className="my-4" style={{ borderTop: '2px dashed #ccc' }} />

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {message && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="fas fa-check-circle me-2"></i>
              {message}
              <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                <i className="fas fa-heading me-2 text-primary"></i>
                Project Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control form-control-lg fw-medium"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-semibold">
                <i className="fas fa-align-left me-2 text-primary"></i>
                Description
              </label>
              <textarea
                id="description"
                className="form-control form-control-lg fw-medium"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter project description"
                rows={4}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="goal" className="form-label fw-semibold">
                <i className="fas fa-dollar-sign me-2 text-primary"></i>
                Target Amount
              </label>
              <input
                type="number"
                id="goal"
                className="form-control form-control-lg fw-medium"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder="Enter fundraising target"
                required
                min="1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="startDate" className="form-label fw-semibold">
                <i className="fas fa-calendar-alt me-2 text-primary"></i>
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="form-control form-control-lg fw-medium"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="endDate" className="form-label fw-semibold">
                <i className="fas fa-calendar-alt me-2 text-primary"></i>
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="form-control form-control-lg fw-medium"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100 mb-3 fw-semibold"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                border: 'none',
                padding: '12px',
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Creating Project...
                </>
              ) : (
                <>
                  <i className="fas fa-folder-plus me-2"></i>
                  Create Project
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => navigate('/home')}
              className="btn btn-link text-secondary fw-semibold text-decoration-none"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
