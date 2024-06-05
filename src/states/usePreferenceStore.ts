import { create } from "zustand";

interface ISettings {
  isSidebarOpen: boolean;
}

interface IPreferenceState {
  preferences: ISettings;
  setPreferences: (settings: ISettings) => void;
}

const defaultSettings: ISettings = {
  isSidebarOpen: true,
};

const usePreferenceStore = create<IPreferenceState>((set) => ({
  preferences: JSON.parse(
    localStorage.getItem("settings") || JSON.stringify(defaultSettings)
  ),
  setPreferences: (settings) => {
    localStorage.setItem("settings", JSON.stringify(settings));
    set({ preferences: settings });
  },
}));

export default usePreferenceStore;
