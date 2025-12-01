import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, FileText, User, Activity, Loader2, X, ExternalLink, Download, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { ReportServices } from "../../services/report";
import { formatDate } from "../../utils/localFunctions";
import { ReportDetailRow } from "./ReportDetailRow";

const Reports = () => {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState({
        status: "",
        type: "",
        search: ""
    });
    const [expandedReportId, setExpandedReportId] = useState(null); 

    // Fetch reports with filters
    const { data: reportsData, isLoading: reportsLoading, error: reportsError } = useQuery({
        queryKey: ['reports', filters.status, filters.type],
        queryFn: async () => {
            const params = {};
            if (filters.status) params.status = filters.status;
            if (filters.type) params.type = filters.type;
            return await ReportServices.getReports(params);
        }
    });

    console.log('this is what reports data looks like', reportsData)

    // Fetch statistics
    const { data: statsData, isLoading: statsLoading } = useQuery({
        queryKey: ['reportStatistics'],
        queryFn: () => ReportServices.getReportStatistics()
    });

    // Update mutations (status, priority, escalate, delete) remain the same

    const updateStatusMutation = useMutation({
        mutationFn: ({ reportId, status }) => 
            ReportServices.updateReportStatus(reportId, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['reports']);
            queryClient.invalidateQueries(['reportDetail', expandedReportId]); // Invalidate detail view if open
            queryClient.invalidateQueries(['reportStatistics']);
        }
    });

    const updatePriorityMutation = useMutation({
        mutationFn: ({ reportId, priority }) => 
            ReportServices.updateReportPriority(reportId, priority),
        onSuccess: () => {
            queryClient.invalidateQueries(['reports']);
            queryClient.invalidateQueries(['reportDetail', expandedReportId]); // Invalidate detail view if open
            queryClient.invalidateQueries(['reportStatistics']);
        }
    });

    const escalateMutation = useMutation({
        mutationFn: (reportId) => 
            ReportServices.escalateReport(reportId),
        onSuccess: () => {
            queryClient.invalidateQueries(['reports']);
            queryClient.invalidateQueries(['reportDetail', expandedReportId]); // Invalidate detail view if open
            queryClient.invalidateQueries(['reportStatistics']);
        }
    });

    const deleteReportMutation = useMutation({
        mutationFn: (reportId) => ReportServices.deleteReport(reportId),
        onSuccess: () => {
            queryClient.invalidateQueries(['reports']);
            queryClient.invalidateQueries(['reportStatistics']);
            if (expandedReportId === reportId) {
                setExpandedReportId(null);
            }
        }
    });

    const handleUpdate = (reportId, action, value) => {
        if (action === 'status') {
            updateStatusMutation.mutate({ reportId, status: value });
        } else if (action === 'priority') {
            updatePriorityMutation.mutate({ reportId, priority: value });
        } else if (action === 'escalate') {
            escalateMutation.mutate(reportId);
        }
    };

    const handleDeleteReport = (reportId) => {
        if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
            deleteReportMutation.mutate(reportId);
        }
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const handleToggleDetails = (reportId) => {
        setExpandedReportId(prevId => prevId === reportId ? null : reportId);
    };

    const handleExportCSV = () => {
        if (!reportsData?.reports || reportsData.reports.length === 0) {
            alert('No reports to export');
            return;
        }

        const headers = ['Report ID', 'Reporter', 'Phone', 'Type', 'Location', 'LGA', 'Date', 'Status', 'Priority', 'Description'];
        const csvContent = [
            headers.join(','),
            ...reportsData.reports.map(report => [
                report.reportId,
                report.displayName || 'Anonymous',
                report.phoneNumber || 'N/A',
                report.type,
                report.location,
                report.LGA || 'N/A',
                formatDate(report.createdAt, true), 
                report.status,
                report.priority,
                `"${(report.description || '').replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reports_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Filter reports by search term locally
    const filteredReports = reportsData?.reports?.filter(report => {
        if (!filters.search) return true;
        const searchLower = filters.search.toLowerCase();
        return (
            report.displayName?.toLowerCase().includes(searchLower) ||
            report.location?.toLowerCase().includes(searchLower) ||
            report.reportId?.toLowerCase().includes(searchLower) ||
            report.description?.toLowerCase().includes(searchLower)
        );
    }) || [];

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Resolved': return 'bg-green-100 text-green-800';
            case 'Dismissed': return 'bg-gray-100 text-gray-800';
            case 'Escalated': return 'bg-red-100 text-red-800';
            case 'Police': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityBadgeClass = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-200 text-red-900';
            case 'Medium': return 'bg-yellow-200 text-yellow-900';
            case 'Low': return 'bg-green-200 text-green-900';
            default: return 'bg-gray-200 text-gray-900';
        }
    };

    const getTypeBadgeClass = (type) => {
        const typeMap = {
            'Violence': 'bg-red-100 text-red-800',
            'Crop Damage': 'bg-orange-100 text-orange-800',
            'Boundary Dispute': 'bg-purple-100 text-purple-800',
            'Theft': 'bg-red-100 text-red-800',
            'Trespassing': 'bg-indigo-100 text-indigo-800'
        };
        return typeMap[type] || 'bg-gray-100 text-gray-800';
    };

    if (reportsError) {
        return (
            <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Reports</h3>
                    <p className="text-red-600">{reportsError.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* ... Statistics and Filters (Unchanged) ... */}

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                    Incident Reports Management
                </h2>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    Review, manage and track incident reports submitted through the platform.
                </p>
                
                {statsLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="animate-spin text-green-500" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-red-50 p-4 rounded-lg flex items-center justify-between">
                            <span className="text-red-600 font-semibold text-sm">Pending</span>
                            <span className="text-2xl font-bold text-red-600">
                                {statsData?.statistics?.byStatus?.Pending || 0}
                            </span>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg flex items-center justify-between">
                            <span className="text-yellow-600 font-semibold text-sm">High Priority</span>
                            <span className="text-2xl font-bold text-yellow-600">
                                {statsData?.statistics?.byPriority?.High || 0}
                            </span>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                            <span className="text-blue-600 font-semibold text-sm">In Progress</span>
                            <span className="text-2xl font-bold text-blue-600">
                                {statsData?.statistics?.byStatus?.['In Progress'] || 0}
                            </span>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
                            <span className="text-green-600 font-semibold text-sm">Resolved</span>
                            <span className="text-2xl font-bold text-green-600">
                                {statsData?.statistics?.byStatus?.Resolved || 0}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
                    <select 
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Dismissed">Dismissed</option>
                        <option value="Escalated">Escalated</option>
                        <option value="Police">Police</option>
                    </select>
                    <select 
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="Crop Damage">Crop Damage</option>
                        <option value="Boundary Dispute">Boundary Dispute</option>
                        <option value="Violence">Violence</option>
                        <option value="Theft">Theft</option>
                        <option value="Trespassing">Trespassing</option>
                        <option value="Other">Other</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search reports..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 flex-1 min-w-[200px]"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                    <button 
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-auto flex items-center justify-center gap-2"
                        onClick={handleExportCSV}
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>
            </div>


            {/* Reports Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {reportsLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="animate-spin text-green-500" size={48} />
                        <span className="ml-3 text-gray-600">Loading reports...</span>
                    </div>
                ) : filteredReports.length === 0 ? (
                    <div className="text-center py-12 px-4">
                        <FileText className="mx-auto mb-4 text-gray-400" size={48} />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Reports Found</h3>
                        <p className="text-gray-500">No reports match your current filters.</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {/* Adjusted headers to match the 8 columns (including the expand column) */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                                            {/* Expand Col */}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Report ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Reporter
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Priority
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredReports.map((report) => (
                                        <>
                                            <tr 
                                                key={report.reportId} 
                                                className={`hover:bg-gray-50 cursor-pointer ${expandedReportId === report.reportId ? 'bg-gray-100' : ''}`}
                                                onClick={() => handleToggleDetails(report.reportId)} // Click to expand/collapse
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {expandedReportId === report.reportId ? (
                                                        <ChevronUp size={18} className="text-green-600" />
                                                    ) : (
                                                        <ChevronDown size={18} className="text-gray-500" />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    #{report.reportId?.substring(0, 12)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                            <User className="text-white" size={16} />
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {report.displayName || 'Anonymous'}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {report.phoneNumber || 'N/A'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeClass(report.type)}`}>
                                                        {report.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {report.location}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatDate(report.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(report.status)}`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(report.priority)}`}>
                                                        {report.priority}
                                                    </span>
                                                </td>
                                            </tr>
                                            
                                            {/* Conditional Expanded Detail Row */}
                                            {expandedReportId === report.reportId && (
                                                <tr className="border-t-0">
                                                    <ReportDetailRow 
                                                        reportId={report.reportId} 
                                                        onUpdate={handleUpdate} 
                                                        onDelete={handleDeleteReport} 
                                                    />
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Info */}
                        <div className="bg-white px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{filteredReports.length}</span> of{" "}
                                    <span className="font-medium">{reportsData?.count || 0}</span> results
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Reports;