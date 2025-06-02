import React, { useState } from "react";
import UpdateProfileImage from "./UpdateProfileImage";
import ChangeCoverImage from "./ChangeCoverImage";
import ChangePersonalInfo from "./ChangePersonalInfo";
import ChangePassword from "./ChangePassword";

const settingsTabs = [
  { key: "update-profile-image", label: "Update Profile Image" },
  { key: "change-cover-image", label: "Change Cover Image" },
  { key: "change-personal-info", label: "Change Personal Info" },
  { key: "change-password", label: "Change Password" },
];

const UserSettingPanel = () => {
  const [activeTab, setActiveTab] = useState("update-password");

  const renderTabContent = () => {
    switch (activeTab) {
      case "update-profile-image":
        return <UpdateProfileImage />;
      case "change-cover-image":
        return <ChangeCoverImage />;
      case "change-personal-info":
        return <ChangePersonalInfo />;
      case "change-password":
        return <ChangePassword />;
      default:
        return (
          <div className="text-gray-300">
            Select a setting from the sidebar.
          </div>
        );
    }
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>
        <ul className="space-y-2">
          {settingsTabs.map((tab) => (
            <li key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-900 p-6 rounded-lg shadow-md text-gray-200">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserSettingPanel;
