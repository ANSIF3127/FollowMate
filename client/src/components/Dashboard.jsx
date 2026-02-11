import React from 'react';
import { Users, UserMinus, UserPlus, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = ({ stats }) => {
    if (!stats) return null;

    const followerRatio = (stats.totalFollowers / (stats.totalFollowing || 1)).toFixed(2);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gradient-to-br dark:from-[#1a2130] dark:to-[#2a1b3d] flex flex-col gap-2 animate-fade-in-up hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center justify-between">
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Total Followers</p>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                        <Users className="text-blue-500 w-5 h-5" />
                    </div>
                </div>
                <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{stats.totalFollowers.toLocaleString()}</p>
                <div className="flex items-center gap-1.5 mt-2">
                    <span className="flex items-center text-emerald-500 text-sm font-bold animate-pulse">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Live
                    </span>
                    <span className="text-slate-400 text-xs">Updated just now</span>
                </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gradient-to-br dark:from-[#1a2130] dark:to-[#2a1b3d] flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
                <div className="flex items-center justify-between">
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Total Following</p>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                        <UserPlus className="text-purple-500 w-5 h-5" />
                    </div>
                </div>
                <p className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{stats.totalFollowing.toLocaleString()}</p>
                <div className="flex items-center gap-1.5 mt-2">
                    <span className="flex items-center text-emerald-500 text-sm font-bold animate-pulse">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Live
                    </span>
                    <span className="text-slate-400 text-xs">Updated just now</span>
                </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gradient-to-br dark:from-[#1a2130] dark:to-[#2a1b3d] flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center justify-between">
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Follower Ratio</p>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10">
                        <TrendingDown className="text-pink-500 w-5 h-5" />
                    </div>
                </div>
                <p className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">{followerRatio}</p>
                <div className="flex items-center gap-1.5 mt-2">
                    <span className="flex items-center text-primary text-sm font-bold">
                        {followerRatio > 1 ? 'Healthy' : 'Low'}
                    </span>
                    <span className="text-slate-400 text-xs">followers per following</span>
                </div>
            </div>

            <div className="md:col-span-3 p-6 rounded-xl border border-rose-200 dark:border-rose-900/30 bg-gradient-to-r from-rose-50/50 to-pink-50/50 dark:from-rose-900/10 dark:to-pink-900/10 flex flex-col md:flex-row items-center justify-between gap-4 animate-scale-in">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-full text-rose-600 dark:text-rose-400 animate-pulse">
                        <UserMinus className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Not Following Back</h3>
                        <p className="text-slate-500 text-sm">People you follow who don't follow you back</p>
                    </div>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-4xl font-extrabold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">{stats.totalNotFollowingBack.toLocaleString()}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-400">Accounts</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;