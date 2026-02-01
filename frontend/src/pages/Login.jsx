import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // If already logged in, redirect based on role
    if (user) {
        if (user.role === 'admin') return <Navigate to="/admin" />;
        if (user.role === 'mentor') return <Navigate to="/mentor" />;
        if (user.role === 'student') return <Navigate to="/student" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData.email, formData.password);

            // Role based redirect after login
            if (data.role === 'admin') navigate('/admin');
            if (data.role === 'mentor') navigate('/mentor');
            if (data.role === 'student') navigate('/student');

        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                    alt="Students learning"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="relative z-10 p-16 flex flex-col justify-end h-full text-white">
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        Unlock Your Potential with Premium Learning
                    </h2>
                    <p className="text-lg text-gray-300 max-w-md">
                        Join thousands of students and mentors on a journey to mastery.
                    </p>
                </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4">
                            <span className="text-2xl">🎓</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-500 mt-2">Please sign in to your account</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-center gap-2">
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a
                            href="/register"
                            className="font-bold text-indigo-600 hover:text-indigo-500"
                        >
                            Create an account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
