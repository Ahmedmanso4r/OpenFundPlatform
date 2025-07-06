import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData);

            // Store tokens in localStorage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user_data', JSON.stringify(response.data.user));

            // Navigate to home page
            navigate('/home', {
                state: {
                    userData: response.data.user
                }
            });
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Login failed. Please check your connection and try again.');
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
            <div className="card shadow-lg border-0" style={{ maxWidth: 450, width: '100%' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                            style={{ width: 60, height: 60 }}>
                            <i className="fas fa-user" style={{ fontSize: 24 }}></i>
                        </div>
                        <h2 className="text-dark fw-bold">Welcome Back!</h2>
                        <p className="text-muted">Sign in to your account</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show border-0 shadow-sm" role="alert"
                            style={{ background: 'linear-gradient(135deg, #fee 0%, #fcc 100%)' }}>
                            <div className="d-flex align-items-center">
                                <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: 40, height: 40 }}>
                                    <i className="fas fa-exclamation-triangle" style={{ fontSize: 16 }}></i>
                                </div>
                                <div className="flex-grow-1">
                                    <strong>Login Error:</strong> {error}
                                </div>
                                <button type="button" className="btn-close" onClick={() => setError('')}></button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
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

                        <div className="mb-4">
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
                                style={{ borderColor: '#e1e5e9' }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100 mb-3 fw-semibold"
                            disabled={loading}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                padding: '12px'
                            }}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-sign-in-alt me-2"></i>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-muted mb-0">
                            Don't have an account?
                            <button
                                onClick={() => navigate('/register')}
                                className="btn btn-link text-primary fw-semibold ms-1 text-decoration-none p-0"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 