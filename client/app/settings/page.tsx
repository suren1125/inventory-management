"use client";

import React, { useState } from "react";
import Header from "../(components)/Header";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Username", value: "john doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full transition-colors duration-300">
      <Header name="User Settings" />
      <div className="overflow-x-auto mt-5 shadow-md border border-border-main rounded-lg">
        <table className="min-w-full bg-surface">
          <thead className="bg-surface border-b border-border-main">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-foreground">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-foreground">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            {userSettings.map((setting, index) => (
              <tr
                className="border-b border-border-main hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                key={setting.label}
              >
                <td className="py-4 px-4">{setting.label}</td>
                <td className="py-4 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        title={setting.type}
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      title={setting.label}
                      type="text"
                      className="px-4 py-2 border border-border-main rounded-lg bg-background text-foreground focus:outline-none focus:border-blue-500 transition-colors"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
