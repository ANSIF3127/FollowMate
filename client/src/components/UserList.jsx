import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const UserList = ({ users, title, type, fullPage = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Increased items per page slightly

    const filteredUsers = users.filter(user =>
        user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply pagination ONLY if NOT fullPage
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;

    const currentUsers = fullPage
        ? filteredUsers
        : filteredUsers.slice(startIdx, startIdx + itemsPerPage);

    const statusBadge = type === 'non-followers'
        ? <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-extrabold tracking-wider uppercase border border-red-500/20">Not Following</span>
        : <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-[10px] font-extrabold tracking-wider uppercase border border-green-500/20">Fan</span>;

    const actionButton = type === 'non-followers'
        ? "bg-blue-600 hover:bg-blue-500 text-white"
        : "bg-slate-700 hover:bg-slate-600 text-white";

    const actionText = type === 'non-followers' ? "Unfollow" : "Follow";

    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-xl font-bold dark:text-white capitalize">{title}</h3>

                {/* Search Bar */}
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by username..."
                        className="w-full bg-slate-100 dark:bg-[#151A23] border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-[#151A23] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <div className="col-span-6">User</div>
                    <div className="col-span-3 text-center">Status</div>
                    <div className="col-span-3 text-right">Action</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {currentUsers.map((user, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">

                            {/* User Column */}
                            <div className="col-span-6 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold shadow-inner border border-slate-600">
                                    {user.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-slate-900 dark:text-gray-100 truncate">{user}</p>
                                    <a
                                        href={`https://instagram.com/${user}`}
                                        target="_blank"
                                        className="text-xs text-slate-500 hover:text-blue-500 transition-colors"
                                    >
                                        @{user}
                                    </a>
                                </div>
                            </div>

                            {/* Status Column */}
                            <div className="col-span-3 flex justify-center">
                                {statusBadge}
                            </div>

                            {/* Action Column */}
                            <div className="col-span-3 flex justify-end">
                                <a
                                    href={`https://instagram.com/${user}`}
                                    target="_blank"
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md ${actionButton}`}
                                >
                                    {actionText}
                                </a>
                            </div>
                        </div>
                    ))}

                    {currentUsers.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            No users found matching "{searchTerm}"
                        </div>
                    )}
                </div>

                {/* Pagination Footer - Hide if Full Page */}
                {!fullPage && (
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
                        <p className="text-xs text-slate-500">
                            Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filteredUsers.length)} of {users.length}
                        </p>
                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default UserList;
