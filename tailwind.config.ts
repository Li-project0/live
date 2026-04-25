import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gaegu: ['Gaegu', 'cursive'],
        noto: ['"Noto Sans KR"', 'sans-serif'],
      },
      colors: {
        cream:    '#fff9f0',
        paper:    '#fffdf7',
        purple:   '#b78be0',
        'purple-l': '#ede0ff',
        pink:     '#f4a7c3',
        'pink-l': '#ffe0ee',
        green:    '#7dc98a',
        'green-l':'#dff5e3',
        yellow:   '#f9d94e',
        blue:     '#7eb8e8',
        'blue-l': '#dcefff',
        orange:   '#f5a36b',
        'orange-l':'#ffe8d6',
        brand:    '#b78be0',
      },
    },
  },
  plugins: [],
}

export default config
