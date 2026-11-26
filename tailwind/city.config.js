// Styles for the city SEO landing pages (public/<city>.html)
module.exports = {
  content: ['./public/lahore.html', './public/karachi.html', './public/islamabad.html', './public/rawalpindi.html',
    './public/faisalabad.html', './public/multan.html', './public/peshawar.html', './public/sialkot.html', './public/gujranwala.html'],
  theme: {
    extend: {
      colors: {
        forest: { 900: '#0B291B', 800: '#133E2B', 700: '#1A523A', 600: '#23694B' },
        terracotta: { DEFAULT: '#C86D51', dark: '#B0593E' },
        cream: { 50: '#FDFBF7', 100: '#F6F2EA', 200: '#ECE5D8' },
        charcoal: { 900: '#1F2421', 700: '#3D4440', 500: '#68726C', 400: '#8A958F' }
      },
      fontFamily: {
        'serif-luxury': ['"Playfair Display"', 'serif'],
        'sans': ['"Plus Jakarta Sans"', 'sans-serif']
      }
    }
  }
};
