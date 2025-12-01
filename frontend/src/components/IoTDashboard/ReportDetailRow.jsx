import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ExternalLink, Loader2, Trash2 } from "lucide-react";
import React from "react";
import { ReportServices } from "../../services/report";
import { formatDate } from "../../utils/localFunctions";

export const ReportDetailRow = ({ reportId, onUpdate, onDelete }) => {
    const { data: reportDetail, isLoading, error } = useQuery({
        queryKey: ['reportDetail', reportId],
        queryFn: () => ReportServices.getReportById(reportId),
        enabled: !!reportId, 
        select: (response) => response.report, 
    });

    const COL_SPAN = 8; 

    if (isLoading) {
        return (
            <td colSpan={COL_SPAN} className="p-4 bg-gray-50">
                <div className="flex justify-center items-center py-4">
                    <Loader2 className="animate-spin text-green-500" size={24} />
                    <span className="ml-2 text-gray-600">Loading details...</span>
                </div>
            </td>
        );
    }

    if (error || !reportDetail) {
        return (
            <td colSpan={COL_SPAN} className="p-4 bg-red-50 text-red-700">
                <div className="flex items-center justify-center">
                    <AlertTriangle size={20} className="mr-2" />
                    Failed to load report details.
                </div>
            </td>
        );
    }

    const detailFieldStyle = "text-sm text-gray-900";
    const labelStyle = "text-xs font-semibold text-gray-600 uppercase mb-1 block";

    return (
        <td colSpan={COL_SPAN} className="p-6 bg-gray-50 border-t-2 border-green-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Column 1: Extended Reporter/Location Data */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-700 border-b pb-1">CONTACT INFO</h4>
                    <div>
                        <label className={labelStyle}>Phone Number</label>
                        <p className={detailFieldStyle}>{reportDetail.phoneNumber || 'N/A'}</p>
                    </div>
                    <div>
                        <label className={labelStyle}>LGA</label>
                        <p className={detailFieldStyle}>{reportDetail.LGA || 'N/A'}</p>
                    </div>
                    <div>
                        <label className={labelStyle}>Last Updated</label>
                        <p className={detailFieldStyle}>{formatDate(reportDetail.createdAt, true)}</p>
                    </div>
                </div>

                {/* Column 2: Full Description */}
                <div className="md:col-span-2 space-y-4">
                    <h4 className="text-sm font-bold text-gray-700 border-b pb-1">DESCRIPTION</h4>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap max-h-48 overflow-y-auto">
                            {reportDetail.description || 'No detailed description provided.'}
                        </p>
                    </div>
                </div>

                {/* Column 3: Evidence Files */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-700 border-b pb-1">EVIDENCE ({reportDetail.evidence?.length || 0})</h4>
                    
                    {reportDetail.evidence && reportDetail.evidence.length > 0 ? (
                        <div className="space-y-2">
                            {reportDetail.evidence.map((file, index) => (
                                <div key={index} className="flex items-center justify-between text-xs p-2 bg-white rounded-md border border-gray-200 hover:bg-green-50">
                                    <p className="text-gray-800 truncate flex-1 min-w-0">{file.filename}</p>
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 text-green-600 hover:text-green-700"
                                        title="View File"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No evidence files attached.</p>
                    )}
                </div>
            </div>

            {/* Actions Section - Styled with existing button classes */}
            <div className="mt-8 pt-4 border-t border-gray-300 flex flex-wrap gap-3 items-center">
                <span className="text-sm font-bold text-gray-700 mr-2">Update Status:</span>

                <button
                    onClick={() => onUpdate(reportDetail.reportId, 'status', 'In Progress')}
                    className="text-sm px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    In Progress
                </button>
                <button
                    onClick={() => onUpdate(reportDetail.reportId, 'status', 'Resolved')}
                    className="text-sm px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Resolve
                </button>
                <button
                    onClick={() => onUpdate(reportDetail.reportId, 'escalate')}
                    className="text-sm px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                    Escalate
                </button>
                <button
                    onClick={() => onUpdate(reportDetail.reportId, 'status', 'Police')}
                    className="text-sm px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                    Contact Police
                </button>
                <button
                    onClick={() => onUpdate(reportDetail.reportId, 'status', 'Dismissed')}
                    className="text-sm px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    Dismiss
                </button>
                
                {/* Delete Button - separated and styled as danger */}
                <button 
                    onClick={() => onDelete(reportDetail.reportId)}
                    className="ml-auto flex items-center gap-1 text-sm px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200"
                >
                    <Trash2 size={16} /> Delete Report
                </button>
            </div>
        </td>
    );
};