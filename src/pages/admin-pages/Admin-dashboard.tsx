import { AlertTriangle, Users, FolderKanban, DollarSign } from "lucide-react";

const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold h-[60px] border-b flex justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                Admin Dashboard
            </h1>

            <div className="max-w-7xl mx-auto py-8 px-4 pb-20">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome to Admin Panel
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Manage disputes, users, and monitor platform activity
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-100 text-sm font-medium">
                                    Active Disputes
                                </p>
                                <p className="text-4xl font-bold mt-2">--</p>
                            </div>
                            <AlertTriangle className="h-12 w-12 text-red-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">
                                    Total Users
                                </p>
                                <p className="text-4xl font-bold mt-2">--</p>
                            </div>
                            <Users className="h-12 w-12 text-blue-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">
                                    Active Projects
                                </p>
                                <p className="text-4xl font-bold mt-2">--</p>
                            </div>
                            <FolderKanban className="h-12 w-12 text-green-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">
                                    Total Revenue
                                </p>
                                <p className="text-4xl font-bold mt-2">--</p>
                            </div>
                            <DollarSign className="h-12 w-12 text-purple-200" />
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a
                            href="/admin/disputes"
                            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                        >
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="font-semibold text-gray-800">View Disputes</p>
                                <p className="text-sm text-gray-500">
                                    Manage active disputes
                                </p>
                            </div>
                        </a>

                        <a
                            href="/admin/users"
                            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                        >
                            <Users className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="font-semibold text-gray-800">Manage Users</p>
                                <p className="text-sm text-gray-500">View all users</p>
                            </div>
                        </a>

                        <a
                            href="/admin/projects"
                            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                        >
                            <FolderKanban className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="font-semibold text-gray-800">View Projects</p>
                                <p className="text-sm text-gray-500">Monitor all projects</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
