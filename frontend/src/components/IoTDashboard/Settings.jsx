import { useState } from "react";
import { Trash2, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../../services/user";

const Settings = () => {
  const queryClient = useQueryClient();
  const [deleteLoading, setDeleteLoading] = useState(null);

  const { data: usersData, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserService.getAllUsers(),
    staleTime: 1000 * 60 * 5, 
  });

  const deleteMutation = useMutation({
    mutationFn: (uid) => UserService.deleteProfile(uid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const users = usersData?.users || [];

  const stats = {
    total: users.length,
    farmers: users.filter(u => u.role === 'farmer').length,
    herders: users.filter(u => u.role === 'herder').length,
    suspended: 0 
  };

  const handleDeleteUser = async (uid, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleteLoading(uid);
      await deleteMutation.mutateAsync(uid);
      alert(`User ${userName} has been deleted successfully`);
    } catch (err) {
      alert(`Failed to delete user: ${err.message}`);
      console.error('Error deleting user:', err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const formatLocation = (user) => {
    return `${user.LGA || 'N/A'}, ${user.state || 'N/A'}`;
  };

  const capitalizeFirst = (str) => {
    if (!str) return 'N/A';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Users Profiles */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Users Management</h2>
          <p className="text-gray-600">
            Manage registered Users and their information
          </p>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Active Farmers</h3>
            <p className="text-3xl font-bold">{stats.farmers}</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Active Herders</h3>
            <p className="text-3xl font-bold">{stats.herders}</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Suspended Accounts</h3>
            <p className="text-3xl font-bold">{stats.suspended}</p>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Registered Users
            </h3>
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? 'Refreshing...' : 'Refresh List'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
              <AlertCircle size={20} />
              <span>{error?.message || 'Failed to fetch users'}</span>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Contact
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Location
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Role
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Joined
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.uid} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {user.displayName || 'N/A'}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {user.phoneNumber || 'N/A'}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-800">
                        {formatLocation(user)}
                      </td>
                      <td className="px-4 py-2 border-b text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'farmer' 
                            ? 'bg-green-100 text-green-800' 
                            : user.role === 'herder'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {capitalizeFirst(user.role)}
                        </span>
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-600">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-2 border-b text-sm">
                        <button
                          onClick={() => handleDeleteUser(user.uid, user.displayName)}
                          disabled={deleteLoading === user.uid || deleteMutation.isPending}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          {deleteLoading === user.uid ? (
                            <>
                              <div className="inline-block animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                              <span>Deleting...</span>
                            </>
                          ) : (
                            <>
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Communication Settings */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Communication Settings</h2>
          <p className="text-gray-600">
            Configure communication providers and emergency contacts
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Provider Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Provider
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="twilio">Twilio</option>
                  <option value="nexmo">Nexmo/Vonage</option>
                  <option value="aws">AWS SNS</option>
                  <option value="custom">Custom Provider</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  placeholder="Enter API Key"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice Call Provider
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="twilio">Twilio Voice</option>
                  <option value="plivo">Plivo</option>
                  <option value="aws">AWS Connect</option>
                  <option value="custom">Custom Provider</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auth Token
                </label>
                <input
                  type="password"
                  placeholder="Enter Auth Token"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">
            Security & Privacy Settings
          </h2>
          <p className="text-gray-600">
            Configure system security and data protection
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Access Control
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-600">
                  Require 2FA for admin access
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">API Encryption</h4>
                <p className="text-sm text-gray-600">
                  Encrypt all API communications
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Audit Logging</h4>
                <p className="text-sm text-gray-600">
                  Log all system activities
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;