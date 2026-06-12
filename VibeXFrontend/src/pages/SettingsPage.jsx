import React, { useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import {
  MdDarkMode,
  MdDownload,
  MdMusicNote,
  MdNotifications,
  MdStorage,
  MdInfoOutline,
} from "react-icons/md";

export default function SettingsPage() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const [settings, setSettings] = useState({
    glassEffect: true,
    compactMode: false,
    autoplay: true,
    crossfade: true,
    highQuality: true,
    wifiOnly: true,
    smartDownloads: false,
    notifications: true,
    releaseAlerts: true,
  });

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <MainContent>
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            Customize your VibeX experience
          </p>
        </div>

        {/* Appearance */}
        <SettingsCard
          title="Appearance"
          icon={<MdDarkMode size={22} />}
        >
          <SettingItem
            title="Dark Mode"
            description="Use dark theme throughout the app"
            enabled={dark}
            onToggle={() => setDark(!dark)}
          />

          <SettingItem
            title="Glass Effects"
            description="Enable blur and transparency effects"
            enabled={settings.glassEffect}
            onToggle={() => toggleSetting("glassEffect")}
          />

          <SettingItem
            title="Compact Mode"
            description="Reduce spacing across the application"
            enabled={settings.compactMode}
            onToggle={() => toggleSetting("compactMode")}
          />
        </SettingsCard>

        {/* Playback */}
        <SettingsCard
          title="Playback"
          icon={<MdMusicNote size={22} />}
        >
          <SettingItem
            title="Autoplay"
            description="Automatically play related songs"
            enabled={settings.autoplay}
            onToggle={() => toggleSetting("autoplay")}
          />

          <SettingItem
            title="Crossfade"
            description="Smooth transition between tracks"
            enabled={settings.crossfade}
            onToggle={() => toggleSetting("crossfade")}
          />

          <SettingItem
            title="High Quality Audio"
            description="Use higher bitrate streaming"
            enabled={settings.highQuality}
            onToggle={() => toggleSetting("highQuality")}
          />
        </SettingsCard>

        {/* Downloads */}
        <SettingsCard
          title="Downloads"
          icon={<MdDownload size={22} />}
        >
          <SettingItem
            title="Wi-Fi Only Downloads"
            description="Download songs only when connected to Wi-Fi"
            enabled={settings.wifiOnly}
            onToggle={() => toggleSetting("wifiOnly")}
          />

          <SettingItem
            title="Smart Downloads"
            description="Automatically download favorite tracks"
            enabled={settings.smartDownloads}
            onToggle={() => toggleSetting("smartDownloads")}
          />
        </SettingsCard>

        {/* Notifications */}
        <SettingsCard
          title="Notifications"
          icon={<MdNotifications size={22} />}
        >
          <SettingItem
            title="Push Notifications"
            description="Receive app notifications"
            enabled={settings.notifications}
            onToggle={() => toggleSetting("notifications")}
          />

          <SettingItem
            title="New Release Alerts"
            description="Notify when artists release new content"
            enabled={settings.releaseAlerts}
            onToggle={() => toggleSetting("releaseAlerts")}
          />
        </SettingsCard>

        {/* Storage */}
        <SettingsCard
          title="Storage"
          icon={<MdStorage size={22} />}
        >
          <ActionItem
            title="Clear Cache"
            description="Remove temporary downloaded files"
          />

          <ActionItem
            title="Manage Downloads"
            description="View and manage downloaded songs"
          />
        </SettingsCard>

        {/* About */}
        <SettingsCard
          title="About"
          icon={<MdInfoOutline size={22} />}
        >
          <InfoItem label="Version" value="VibeX v1.0.0" />
          <InfoItem label="Build" value="2026.06.13" />
        </SettingsCard>
      </div>
    </MainContent>
  );
}

/* ==========================
   SETTINGS CARD
========================== */

function SettingsCard({ title, icon, children }) {
  return (
    <div
      className="
        rounded-3xl
        overflow-hidden
        backdrop-blur-xl
        bg-white/70
        dark:bg-zinc-900/70
        border border-zinc-200
        dark:border-zinc-700
        shadow-sm
      "
    >
      <div
        className="
          flex items-center gap-3
          px-5 py-4
          border-b border-zinc-200 dark:border-zinc-700
        "
      >
        {icon}

        <h2 className="font-semibold text-lg">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

/* ==========================
   TOGGLE ITEM
========================== */

function SettingItem({
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div
      className="
        flex items-center justify-between
        px-5 py-4
        border-b last:border-0
        border-zinc-200 dark:border-zinc-700
      "
    >
      <div>
        <h3 className="font-medium">
          {title}
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>

      <button
        onClick={onToggle}
        className={`
          relative
          h-8 w-14
          rounded-full
          transition-all duration-300
          ${
            enabled
              ? "bg-emerald-500"
              : "bg-zinc-300 dark:bg-zinc-700"
          }
        `}
      >
        <span
          className={`
            absolute top-1 left-1
            h-6 w-6
            rounded-full
            bg-white
            shadow
            transition-transform duration-300
            ${enabled ? "translate-x-6" : ""}
          `}
        />
      </button>
    </div>
  );
}

/* ==========================
   ACTION ITEM
========================== */

function ActionItem({ title, description }) {
  return (
    <button
      className="
        w-full text-left
        px-5 py-4
        border-b last:border-0
        border-zinc-200 dark:border-zinc-700
        hover:bg-black/5
        dark:hover:bg-white/5
        transition
      "
    >
      <div className="font-medium">
        {title}
      </div>

      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {description}
      </div>
    </button>
  );
}

/* ==========================
   INFO ITEM
========================== */

function InfoItem({ label, value }) {
  return (
    <div
      className="
        flex justify-between
        px-5 py-4
        border-b last:border-0
        border-zinc-200 dark:border-zinc-700
      "
    >
      <span className="text-zinc-500">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}