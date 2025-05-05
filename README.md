# 🎥 Movie Recommendations App

A smart movie recommendation system that understands your mood and preferences to suggest the perfect movies to watch. Describe how you're feeling or what you're in the mood for, and receive three tailored movie recommendations.

---

## ✨ Features

- AI-powered movie recommendations using OpenAI  
- Detailed movie information from TMDB  
- Exactly three personalized suggestions based on mood  
- Responsive UI built with Chakra UI  
- High-quality movie posters and trailer links  

---

## 🛠️ Technologies Used

### Frontend
- React.js  
- Chakra UI  

### Backend
- Node.js  
- Express.js  
- OpenAI API
- TMDB API

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v14 or higher)  
- npm (v6 or higher)  
- OpenAI API key  
- TMDB API key  

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/movie-recommendations.git
cd movie-recommendations
```

2. Install dependencies for both backend and frontend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
npm install
```

3. Set up environment variables
- Create a `.env` file in the `server/` directory with the following:
```
PORT=3001
OPENAI_API_KEY=your_openai_api_key
TMDB_API_KEY=your_tmdb_api_key
```

4. Start the development servers
```bash
# Start the backend server (from server directory)
npm start

# Start the frontend server (from client directory)
npm start
```

The application will be available at `http://localhost:3000`

---

## 🎮 How to Use

1. Open the app in your browser  
2. Enter your mood or preference in the search bar  
   - Examples:  
     - movies for a rainy day  
     - feeling nostalgic  
3. Click "Get Recommendations"  
4. View the three personalized movie suggestions  
5. Click "Watch Trailer" to view each movie's trailer  

---
