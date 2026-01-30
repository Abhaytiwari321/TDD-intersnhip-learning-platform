import { useState } from 'react';

const CreateCourseModal = ({ isOpen, onClose, onCreate }) => {
    const [newCourse, setNewCourse] = useState({ title: '', description: '', image: '', initialStudentEmail: '' });
    const [step, setStep] = useState(1);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(newCourse);
        setNewCourse({ title: '', description: '', image: '', initialStudentEmail: '' });
        setStep(1);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Create New Course</h2>
                        <p className="text-gray-500 text-sm mt-1">Share your knowledge with the world.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        {/* Course Details Section */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                                    placeholder="e.g. Master React in 30 Days"
                                    value={newCourse.title}
                                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 placeholder-gray-400 min-h-[120px]"
                                    placeholder="What will students learn in this course?"
                                    value={newCourse.description}
                                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image URL</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                                        placeholder="https://example.com/image.jpg"
                                        value={newCourse.image}
                                        onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Leave empty for auto-generated gradient.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Initial Student (Optional)</label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                                        placeholder="student@example.com"
                                        value={newCourse.initialStudentEmail}
                                        onChange={(e) => setNewCourse({ ...newCourse, initialStudentEmail: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preview Section (Optional, could be added later) */}

                    </form>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Course
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCourseModal;
