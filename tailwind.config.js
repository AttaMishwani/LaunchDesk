// tailwind.config.js
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // 🎯 Accent / Primary
                primary: "#0EA5E9", // Sky Blue

                // ✅ Success
                success: "#10B981", // Emerald Green

                // ❌ Error
                error: "#EF4444", // Red 500

                // ⚪ Text & UI
                textLight: "#F1F5F9",   // Almost White
                textMuted: "#9CA3AF",   // Gray 400
                cardBg: "#1F2937",      // Gray 800
                baseBg: "#121212",      // Dark base background
            },
        },
    },
    plugins: [],
}
