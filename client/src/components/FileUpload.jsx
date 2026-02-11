import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, X, ArrowUpCircle } from 'lucide-react';

const FileUpload = ({ onUpload }) => {
    const [files, setFiles] = useState({ followers: null, following: null });
    const [format, setFormat] = useState('json');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        processFiles(newFiles);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
    };

    const processFiles = (newFiles) => {
        let updated = { ...files };
        const ext = format === 'json' ? '.json' : '.html';

        newFiles.forEach(file => {
            if (!file.name.toLowerCase().endsWith(ext)) {
                // Skip files that don't match selected format
                return;
            }

            if (file.name.includes('followers')) {
                updated.followers = file;
            } else if (file.name.includes('following')) {
                updated.following = file;
            } else {
                // Fallback logic
                if (!updated.followers) updated.followers = file;
                else if (!updated.following) updated.following = file;
            }
        });

        setFiles(updated);
    };

    const clearFile = (type) => {
        setFiles(prev => ({ ...prev, [type]: null }));
    };

    const handleProcess = () => {
        if (files.followers && files.following) {
            onUpload(files.followers, files.following, format);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    Import Your Data
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Upload your information files to see who unfollowed you.
                </p>

                {/* Format Toggle */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                        onClick={() => { setFormat('json'); setFiles({ followers: null, following: null }); }}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${format === 'json' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    >
                        JSON Format
                    </button>
                    <button
                        onClick={() => { setFormat('html'); setFiles({ followers: null, following: null }); }}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${format === 'html' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    >
                        HTML Format
                    </button>
                </div>
            </div>

            {/* Drag & Drop Zone */}
            <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] opacity-20 group-hover:opacity-40 blur transition duration-500 ${isDragging ? 'opacity-60' : ''}`}></div>
                <div className={`relative border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-surface-dark/50'} rounded-[1.75rem] p-12 md:p-16 flex flex-col items-center justify-center gap-6 text-center hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all`}>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept={format === 'json' ? ".json" : ".html"}
                    />

                    <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-10 h-10 text-blue-500" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {isDragging ? 'Drop files now' : 'Drag and drop your files here'}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            Accepts {format === 'json' ? '.json' : '.html'} files
                        </p>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20 mt-4">
                        Browse Files
                    </button>
                </div>
            </div>

            {/* File Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Followers Card */}
                <div className={`bg-white border border-slate-200 rounded-2xl dark:bg-surface-dark dark:border-slate-800/60 p-6 flex flex-col gap-4 relative overflow-hidden transition-all ${files.followers ? 'border-green-500/30' : ''}`}>
                    <div className="flex items-center justify-between z-10">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${files.followers ? 'bg-green-500/10 text-green-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg dark:text-white">
                                    {files.followers ? files.followers.name : `followers.${format}`}
                                </h4>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                                    {files.followers ? (files.followers.size / 1024).toFixed(1) + ' KB' : 'Waiting...'}
                                </p>
                            </div>
                        </div>
                        {files.followers && (
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-extrabold text-green-500 bg-green-500/10 px-2 py-1 rounded uppercase tracking-wider">
                                    Complete
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); clearFile('followers'); }}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-700 ease-out ${files.followers ? 'w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'w-0'}`}
                        />
                    </div>
                </div>

                {/* Following Card */}
                <div className={`bg-white border border-slate-200 rounded-2xl dark:bg-surface-dark dark:border-slate-800/60 p-6 flex flex-col gap-4 relative overflow-hidden transition-all ${files.following ? 'border-blue-500/30' : ''}`}>
                    <div className="flex items-center justify-between z-10">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${files.following ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg dark:text-white">
                                    {files.following ? files.following.name : `following.${format}`}
                                </h4>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                                    {files.following ? (files.following.size / 1024).toFixed(1) + ' KB' : 'Waiting...'}
                                </p>
                            </div>
                        </div>
                        {files.following && (
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-extrabold text-blue-500 bg-blue-500/10 px-2 py-1 rounded uppercase tracking-wider">
                                    Ready
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); clearFile('following'); }}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-700 ease-out ${files.following ? 'w-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-0'}`}
                        />
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col items-center pt-6">
                <button
                    onClick={handleProcess}
                    disabled={!files.followers || !files.following}
                    className={`
                        py-4 px-12 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all transform duration-300
                        ${files.followers && files.following
                            ? 'bg-brand-gradient text-white shadow-xl shadow-pink-500/20 hover:scale-105 hover:shadow-pink-500/30 cursor-pointer'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-50'}
                    `}
                >
                    <ArrowUpCircle className="w-6 h-6" />
                    Process My Data
                </button>
                <p className="mt-4 text-xs font-medium text-slate-500 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Files are processed locally in your browser and never stored.
                </p>
            </div>
        </div>
    );
};

export default FileUpload;
