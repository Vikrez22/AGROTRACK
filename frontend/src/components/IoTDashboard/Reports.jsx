import { AlertTriangle, FileText, Phone, User, Activity } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
          Incident Reports Management
        </h2>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          Review, manage and track incident reports submitted through the
          platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 bg-red-50 p-4 rounded-lg flex items-center justify-between">
            <span className="text-red-600 font-semibold">Critical</span>
            <span className="text-2xl font-bold text-red-600">3</span>
          </div>
          <div className="flex-1 bg-yellow-50 p-4 rounded-lg flex items-center justify-between">
            <span className="text-yellow-600 font-semibold">Pending</span>
            <span className="text-2xl font-bold text-yellow-600">7</span>
          </div>
          <div className="flex-1 bg-blue-50 p-4 rounded-lg flex items-center justify-between">
            <span className="text-blue-600 font-semibold">In Progress</span>
            <span className="text-2xl font-bold text-blue-600">5</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
            <option value="">All Statuses</option>
            <option value="critical">Critical</option>
            <option value="pending">Pending Review</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
            <option value="">All Types</option>
            <option value="crop_damage">Crop Damage</option>
            <option value="boundary_dispute">Boundary Dispute</option>
            <option value="violence">Violence</option>
            <option value="theft">Theft</option>
            <option value="trespassing">Trespassing</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Search reports..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 flex-1 min-w-[200px]"
          />
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-auto">
            Export CSV
          </button>
        </div>
      </div>

      {/* Reports Table the red should be white*/}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-5xl w-full overflow-x-auto">
        <table className="min-w-full sm:w-full text-sm md:text-base">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reporter
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Report 1 - Critical */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #RPT-2024-001
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Adamu Garba
                    </div>
                    <div className="text-sm text-gray-500">
                      +234 803 123 4567
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Violence
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Plateau State, Jos North
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Dec 25, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Critical
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-900">
                  High
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                  View
                </button>
                <button className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded">
                  Assign
                </button>
                <button className="text-orange-600 hover:text-orange-900 bg-orange-100 px-3 py-1 rounded">
                  Contact
                </button>
              </td>
            </tr>

            {/* Report 2 - Pending */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #RPT-2024-002
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Musa Ibrahim
                    </div>
                    <div className="text-sm text-gray-500">
                      +234 816 987 6543
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Crop Damage
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Kaduna State, Zaria
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Dec 24, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending Review
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-900">
                  Medium
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                  View
                </button>
                <button className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded">
                  Approve
                </button>
                <button className="text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded">
                  Dismiss
                </button>
              </td>
            </tr>

            {/* Report 3 - In Progress */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #RPT-2024-003
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Fatima Aliyu
                    </div>
                    <div className="text-sm text-gray-500">
                      +234 701 234 5678
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Boundary Dispute
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Nasarawa State, Lafia
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Dec 23, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Investigating
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-900">
                  Medium
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                  View
                </button>
                <button className="text-purple-600 hover:text-purple-900 bg-purple-100 px-3 py-1 rounded">
                  Update
                </button>
                <button className="text-orange-600 hover:text-orange-900 bg-orange-100 px-3 py-1 rounded">
                  Escalate
                </button>
              </td>
            </tr>

            {/* Report 4 - Resolved */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #RPT-2024-004
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Sani Mohammed
                    </div>
                    <div className="text-sm text-gray-500">
                      +234 812 345 6789
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Trespassing
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Benue State, Makurdi
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Dec 20, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Resolved
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-900">
                  Low
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                  View
                </button>
                <button className="text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded">
                  Archive
                </button>
                <button className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded">
                  Report
                </button>
              </td>
            </tr>

            {/* Report 5 - Theft */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #RPT-2024-005
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <User className="text-white" size={16} />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Hauwa Abdullahi
                    </div>
                    <div className="text-sm text-gray-500">
                      +234 809 876 5432
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Theft
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Kano State, Kano Municipal
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Dec 22, 2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Investigating
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-900">
                  High
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                  View
                </button>
                <button className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded">
                  Police
                </button>
                <button className="text-orange-600 hover:text-orange-900 bg-orange-100 px-3 py-1 rounded">
                  Priority
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">5</span> of{" "}
                  <span className="font-medium">38</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-green-500 text-sm font-medium text-white">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 text-red-700">
            <AlertTriangle size={20} />
            Emergency Response
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 text-blue-700">
            <Phone size={20} />
            Mass Alert System
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 text-green-700">
            <FileText size={20} />
            Generate Report
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 text-purple-700">
            <Activity size={20} />
            Analytics Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
export default Reports;
