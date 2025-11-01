import { useThemeStore } from "../store/useThemeStore";
import { DAISYUI_THEMES } from "../constants/theme";

const SettingsPage = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <h2 className="text-2xl font-bold text-base-content/80 mb-6 text-center">
                Theme Settings
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {DAISYUI_THEMES.map((themeName) => (
                    <div
                        key={themeName}
                        className={`cursor-pointer rounded-xl border transition-all hover:shadow-lg ${theme === themeName ? "border-primary shadow-lg" : "border-base-200"
                            }`}
                        onClick={() => setTheme(themeName)}
                        data-theme={themeName}
                    >
                        {/* Color swatches */}
                        <div className="flex items-center justify-center gap-1 p-3 bg-base-100 rounded-t-xl">
                            <span className="w-6 h-6 rounded-full bg-primary" />
                            <span className="w-6 h-6 rounded-full bg-secondary" />
                            <span className="w-6 h-6 rounded-full bg-accent" />
                            <span className="w-6 h-6 rounded-full bg-neutral" />
                        </div>

                        {/* Theme name */}
                        <div className="text-center py-2 text-sm font-medium capitalize text-base-content">
                            {themeName}
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default SettingsPage;
