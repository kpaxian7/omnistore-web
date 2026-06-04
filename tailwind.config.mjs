/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb',
          ink: '#171717',
          subtle: '#525252',
          mute: '#a3a3a3',
          paper: '#fafafa',
          line: '#e5e5e5',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 8px 32px -8px rgba(0,0,0,0.10)',
        card: '0 1px 2px rgba(0,0,0,0.04), 0 12px 36px -12px rgba(0,0,0,0.12)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};
