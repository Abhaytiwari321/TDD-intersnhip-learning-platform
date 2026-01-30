import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import CreateCourseModal from '../../components/mentor/CreateCourseModal';
import { MentorStats, CourseGrid } from '../../components/mentor/MentorDashboardComponents';
import MentorLayout from '../../components/mentor/MentorLayout';

const MentorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/my`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setCourses(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCourse = async (courseData) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/courses`, courseData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchCourses();
        } catch (error) {
            console.error(error);
            alert('Failed to create course');
        }
    };

    const deleteCourse = async (id) => {
        if (!window.confirm('Delete this course and all its chapters? This action cannot be undone.')) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchCourses();
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <MentorLayout>
            <div className="space-y-8">
                {/* Hero / Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome back, {user?.name?.split(" ")[0] || "Mentor"}. Here's your daily overview.</p>
                    </div>
                    <button
                        id="create-course-btn"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create New Course
                    </button>
                </div>

                {/* Stats Grid */}
                <MentorStats courses={courses} />

                {/* Content Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Your Courses</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select className="text-sm border-none bg-transparent font-medium text-gray-700 focus:ring-0 cursor-pointer">
                                <option>Recent</option>
                                <option>Popular</option>
                            </select>
                        </div>
                    </div>
                    <CourseGrid courses={courses} deleteCourse={deleteCourse} />
                </div>
            </div>

            <CreateCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateCourse}
            />
        </MentorLayout>
    );
};

export default MentorDashboard;
