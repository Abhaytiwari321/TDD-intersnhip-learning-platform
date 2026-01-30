import { Link } from 'react-router-dom';

export const MentorStats = ({ courses }) => {
    const totalCourses = courses.length;
    const allStudents = courses.flatMap(c => c.students);
    const uniqueStudents = new Set(allStudents).size;

    // Mock functionality for earning calculation
    const totalEarnings = uniqueStudents * 49.99; // Assuming avg price

    const stats = [
        {
            label: 'Total Sales', value: `$${totalEarnings.toLocaleString('en-US', { local: 'en-US' })}`, change: '+12.5%', isPositive: true, icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ), bg: 'bg-indigo-500'
        },
        {
            label: 'Active Courses', value: totalCourses, change: '2 New', isPositive: true, icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ), bg: 'bg-emerald-500'
        },
        {
            label: 'Total Students', value: uniqueStudents, change: '+4.3%', isPositive: true, icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ), bg: 'bg-blue-500'
        },
        {
            label: 'Course Rating', value: '4.8', change: 'Top Rated', isPositive: true, icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ), bg: 'bg-amber-500'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bg} shadow-lg shadow-indigo-100`}>
                            {stat.icon}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className={`font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                        </span>
                        <span className="text-gray-400 ml-2">from last month</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const CourseGrid = ({ courses, deleteCourse }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
                <div key={course._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    {/* Image Area */}
                    <div className="h-48 relative overflow-hidden bg-gray-100">
                        {course.image ? (
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                                <span className="text-5xl mb-2">🎓</span>
                                <span className="text-white text-opacity-80 font-medium">Course Preview</span>
                            </div>
                        )}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            {course.students.length} Students
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <div className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase rounded-md tracking-wide">Development</div>
                            <div className="flex items-center text-amber-400 text-xs font-bold">
                                <span>★</span> <span className="ml-1 text-gray-600">4.9</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition-colors" title={course.title}>
                            {course.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-5 line-clamp-2 h-10">
                            {course.description}
                        </p>

                        {/* Progress Bar (Mock) */}
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Completeness</span>
                                <span>85%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-50">
                            <Link
                                to={`/mentor/course/${course._id}`}
                                className="flex-1 bg-gray-50 text-gray-700 hover:bg-indigo-600 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-center flex items-center justify-center gap-2 group-btn"
                            >
                                Manage Course
                            </Link>
                            <button
                                onClick={() => deleteCourse(course._id)}
                                className="p-2.5 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                                title="Delete Course"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={() => document.getElementById('create-course-btn')?.click()}
                className="group relative flex flex-col items-center justify-center h-full min-h-[380px] border-2 border-dashed border-gray-300 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer"
            >
                <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700">Create New Course</h3>
                <p className="text-sm text-gray-500 mt-1">Start building your next masterpiece</p>
            </button>
        </div>
    );
};
