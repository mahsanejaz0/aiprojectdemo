# Sentiment Analysis Blog

A full-stack web application for blog posts with sentiment analysis on reviews. Built with React, Node.js, and Material-UI.

## Features

- Create and view blog posts
- Add reviews with ratings
- Automatic sentiment analysis of reviews
- Word frequency analysis
- Responsive design
- Material-UI components

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- Recharts for visualizations

### Backend
- Node.js
- Express
- MongoDB
- Sentiment analysis using 'sentiment' package

## Setup

1. Clone the repository:
```bash
git clone https://github.com/mahsanejaz0/aiprojectdemo.git
cd aiprojectdemo
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Start the application:
```bash
# Start backend (from backend directory)
npm start

# Start frontend (from frontend directory)
npm start
```

## Project Structure

```
├── backend/             # Backend Node.js application
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
└── frontend/           # Frontend React application
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 
