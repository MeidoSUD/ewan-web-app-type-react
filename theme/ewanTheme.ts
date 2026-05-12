
export const ewanTheme = {
  colors: {
    primary: '#00aeef', // Cyan
    secondary: '#00d19e', // Turquoise Green
    dark: '#414042', // Dark Gray Text
    gray: '#e6e7e8', // Light Gray Pills
    light: '#f1f1f2', // Background
    white: '#ffffff',
    black: '#1a1a1a',
  },
  fonts: {
    arabic: "'Cairo', sans-serif",
    english: "'Poppins', sans-serif",
    main: "'Inter', sans-serif",
  },
  transitions: {
    spring: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
    smooth: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};
