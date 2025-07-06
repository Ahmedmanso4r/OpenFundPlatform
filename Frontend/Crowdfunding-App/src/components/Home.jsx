import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated
        const accessToken = localStorage.getItem('access_token');
        const storedUserData = localStorage.getItem('user_data');

        if (accessToken && storedUserData) {
            setIsAuthenticated(true);
            setUserData(JSON.parse(storedUserData));
        } else if (location.state?.userData) {
            // If coming from registration, use the passed data
            setIsAuthenticated(true);
            setUserData(location.state.userData);
        } else {
            // Not authenticated, redirect to login
            setIsAuthenticated(false);
        }
    }, [location]);

    const handleCreateProject = () => {
        navigate('/create-project');
    };

    const handleViewProjects = () => {
        navigate('/view-projects');
    };

    const handleEditProject = () => {
        navigate('/edit-project');
    };

    const handleLogout = () => {
        // Clear all stored data
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');

        // Navigate to login page
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    // If not authenticated, show login prompt
    if (!isAuthenticated) {
        return (
            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '20px'
                }}>
                <div className="card shadow-lg border-0" style={{ maxWidth: 500, width: '100%' }}>
                    <div className="card-body p-5 text-center">
                        <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                            style={{ width: 80, height: 80 }}>
                            <i className="fas fa-exclamation-triangle" style={{ fontSize: 40 }}></i>
                        </div>
                        <h2 className="text-dark fw-bold mb-3">Access Denied</h2>
                        <p className="text-muted fs-5 mb-4">
                            You need to be logged in to access this page.
                        </p>
                        <button
                            className="btn btn-primary btn-lg px-5"
                            onClick={handleLogin}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                fontWeight: '600'
                            }}
                        >
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // If authenticated, show home content
    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px'
            }}>
            <div className="card shadow-lg border-0" style={{ maxWidth: 700, width: '100%' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                            style={{ width: 80, height: 80, fontSize: 40 }}>
                            ✓
                        </div>
                        <h1 className="text-dark fw-bold mb-2">Welcome to Crowdfunding!</h1>
                        <p className="text-muted fs-5">Your journey starts here</p>
                    </div>

                    {userData && (
                        <div className="alert alert-info border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
                            <div className="d-flex align-items-center">
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: 50, height: 50 }}>
                                    <i className="fas fa-user" style={{ fontSize: 20 }}></i>
                                </div>
                                <div>
                                    <h4 className="mb-1 fw-bold">Hello, {userData.first_name} {userData.last_name}!</h4>
                                    <p className="mb-0">Welcome back to our crowdfunding platform.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-5">
                        <p className="fs-5 text-muted mb-2">What would you like to do today?</p>
                        <p className="text-muted">Explore projects, create your own campaigns, or manage existing ones.</p>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <button
                                className="btn btn-primary btn-lg w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4 shadow-sm"
                                onClick={handleCreateProject}
                                style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    minHeight: '120px'
                                }}
                            >
                                <i className="fas fa-plus-circle mb-2" style={{ fontSize: 32 }}></i>
                                <span className="fw-semibold">Create Project</span>
                            </button>
                        </div>
                        <div className="col-md-4">
                            <button
                                className="btn btn-success btn-lg w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4 shadow-sm"
                                onClick={handleViewProjects}
                                style={{
                                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                    border: 'none',
                                    minHeight: '120px'
                                }}
                            >
                                <i className="fas fa-eye mb-2" style={{ fontSize: 32 }}></i>
                                <span className="fw-semibold">View Projects</span>
                            </button>
                        </div>
                        <div className="col-md-4">
                            <button
                                className="btn btn-warning btn-lg w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4 shadow-sm text-white"
                                onClick={handleEditProject}
                                style={{
                                    background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
                                    border: 'none',
                                    minHeight: '120px'
                                }}
                            >
                                <i className="fas fa-edit mb-2" style={{ fontSize: 32 }}></i>
                                <span className="fw-semibold">Edit Project</span>
                            </button>
                        </div>
                    </div>

                    <div className="text-center pt-4 border-top">
                        <button
                            className="btn btn-outline-danger btn-lg px-5"
                            onClick={handleLogout}
                            style={{
                                borderWidth: '2px',
                                fontWeight: '600'
                            }}
                        >
                            <i className="fas fa-sign-out-alt me-2"></i>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;