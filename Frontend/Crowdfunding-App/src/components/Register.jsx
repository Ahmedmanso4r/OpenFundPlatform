import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post('http://localhost:8000/api/register/', formData);
            navigate('/home', {
                state: {
                    userData: {
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        email: formData.email,
                        phone_number: formData.phone_number
                    }
                }
            });
        } catch (err) {
            if (err.response?.data) {
                const errors = err.response.data;
                if (typeof errors === 'object') {
                    const errorMessages = Object.values(errors).flat().join(', ');
                    setError(errorMessages);
                } else {
                    setError(errors);
                }
            } else {
                setError('Server connection error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px'
            }}>
            <div className="card shadow-lg border-0" style={{ maxWidth: 550, width: '100%' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                            style={{ width: 60, height: 60 }}>
                            <i className="fas fa-user-plus" style={{ fontSize: 24 }}></i>
                        </div>
                        <h2 className="text-dark fw-bold">Create New Account</h2>
                        <p className="text-muted">Join our crowdfunding platform</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError('')}></button>
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <i className="fas fa-check-circle me-2"></i>
                            {success}
                            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="first_name" className="form-label fw-semibold">
                                    <i className="fas fa-user me-2 text-primary"></i>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    className="form-control form-control-lg"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your first name"
                                    style={{ borderColor: '#e1e5e9' }}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="last_name" className="form-label fw-semibold">
                                    <i className="fas fa-user me-2 text-primary"></i>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    className="form-control form-control-lg"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your last name"
                                    style={{ borderColor: '#e1e5e9' }}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">
                                <i className="fas fa-envelope me-2 text-primary"></i>
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control form-control-lg"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                style={{ borderColor: '#e1e5e9' }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone_number" className="form-label fw-semibold">
                                <i className="fas fa-phone me-2 text-primary"></i>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                className="form-control form-control-lg"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                                placeholder="Example: 01012345678"
                                pattern="01[0125][0-9]{8}"
                                style={{ borderColor: '#e1e5e9' }}
                            />
                            <div className="form-text">
                                <i className="fas fa-info-circle me-1"></i>
                                Must be a valid Egyptian phone number (Example: 01012345678)
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className="form-label fw-semibold">
                                    <i className="fas fa-lock me-2 text-primary"></i>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control form-control-lg"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                    minLength="8"
                                    style={{ borderColor: '#e1e5e9' }}
                                />
                            </div>
                            <div className="col-md-6 mb-4">
                                <label htmlFor="confirm_password" className="form-label fw-semibold">
                                    <i className="fas fa-lock me-2 text-primary"></i>
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    className="form-control form-control-lg"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Re-enter your password"
                                    minLength="8"
                                    style={{ borderColor: '#e1e5e9' }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success btn-lg w-100 mb-3 fw-semibold"
                            disabled={loading}
                            style={{
                                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                border: 'none',
                                padding: '12px'
                            }}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-user-plus me-2"></i>
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-muted mb-0">
                            Already have an account?
                            <button
                                onClick={() => navigate('/login')}
                                className="btn btn-link text-primary fw-semibold ms-1 text-decoration-none p-0"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register; 