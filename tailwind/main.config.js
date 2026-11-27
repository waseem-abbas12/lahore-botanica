// Styles for index.html (website) and admin.html — run `npm run build:css` after changing classes
module.exports = {
  content: ['./public/index.html', './public/admin.html', './public/app.js', './public/admin.js'],
  theme: {
    extend: {
      colors: {
        forest: { 900: '#0C2419', 800: '#133E2B', 700: '#1B5239', 600: '#267351', 500: '#348B64' },
        terracotta: { DEFAULT: '#C86D51', dark: '#B0573C', light: '#F7EAE5' },
        cream: { 50: '#FCFAF6', 100: '#F6F2EA', 200: '#EAE3D5' },
        charcoal: { 900: '#191B18', 700: '#3E433C', 500: '#6B7267' }
      }
    }
  }
};
