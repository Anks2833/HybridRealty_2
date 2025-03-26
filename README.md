# BuildEstate - Premium Real Estate Platform

<div align="center">
  <img src="./frontend/src/assets/home-regular-24.png" alt="BuildEstate Logo" width="120" />
  <h3>Find Your Perfect Property with AI-Powered Insights</h3>
</div>

## 📋 Overview

BuildEstate is a comprehensive real estate platform built with the MERN stack that provides advanced property search capabilities, AI-powered market insights, and a complete property management system. The platform helps users find their ideal properties while providing valuable investment analysis through cutting-edge AI technology.

## ✨ Features

### 🏠 User Features

- **Advanced Property Search:** Filter properties by location, price range, amenities, and property type
- **Virtual Property Tours:** Detailed property listings with high-quality images and comprehensive information
- **User Authentication:** Secure registration and login with JWT
- **Appointment Scheduling:** Book and manage property viewings with email notifications
- **Favorites System:** Save properties for later viewing
- **Responsive Design:** Fully optimized for all devices

### 🤖 AI-Powered Features

- **Smart Property Recommendations:** AI-powered search that finds properties matching specific requirements
- **Location Trend Analysis:** Visualizes market trends, rental yields, and property appreciation rates
- **Investment Insights:** AI-generated recommendations for different areas
- **Real-time Property Analysis:** Backend services fetch and analyze property data

### 👩‍💼 Admin Features

- **Dashboard Analytics:** Comprehensive statistics on properties, users, and platform metrics
- **Property Management:** Add, edit, and delete property listings
- **Appointment Management:** Handle viewing requests and update appointment status
- **User Management:** Track user activity and manage accounts

## 🛠️ Technologies

### Frontend
- React 18 with functional components and hooks
- TailwindCSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API requests
- Context API for state management

### Backend
- Node.js & Express for API
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email notifications
- Express Rate Limit and Helmet for security

### AI Integration
- Azure AI for text generation
- FirecrawlJS for real estate data extraction

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB instance (local or Atlas)
- API keys for AI services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AAYUSH412/Real-Estate-Website.git
   cd Real-Estate-Website
   ```

2. **Setup environment variables**
   
   Create `.env` files in the backend, frontend, and admin directories with the following variables:

   **Backend (.env)**
   ```
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL=your_email_for_sending_notifications
   PASSWORD=your_email_password
   AZURE_API_KEY=your_azure_ai_key
   FIRECRAWL_API_KEY=your_firecrawl_api_key
   ```

   **Frontend (.env.local)**
   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```

   **Admin (.env.local)**
   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```

3. **Install dependencies**

   ```bash
   # Backend dependencies
   cd backend
   npm install

   # Frontend dependencies
   cd ../frontend
   npm install

   # Admin dependencies
   cd ../admin
   npm install
   ```

4. **Run the development servers**

   ```bash
   # Run backend server
   cd backend
   npm run dev

   # Run frontend app (in a new terminal)
   cd frontend
   npm run dev

   # Run admin app (in a new terminal)
   cd admin
   npm run dev
   ```

5. **Access the applications**
   - Frontend: http://localhost:5173
   - Admin Panel: http://localhost:5174
   - Backend API: http://localhost:4000

## 📱 App Structure

```
project/
├── admin/                 # Admin dashboard React app
├── backend/               # Express server and API
│   ├── config/            # Server configuration
│   ├── controller/        # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── services/          # External service integrations
│   └── server.js          # Main server file
└── frontend/              # User-facing React app
    ├── public/            # Static assets
    └── src/
        ├── assets/        # Images and static resources
        ├── components/    # Reusable UI components
        ├── context/       # React context providers
        ├── pages/         # Main page components
        └── utils/         # Helper functions
```

## 🖼️ Screenshots

### Home Page
<img src="https://ik.imagekit.io/xh3awoalr/Property/github/Screenshot%202025-03-07%20at%2011.28.47%E2%80%AFAM.png?updatedAt=1741327228785" alt="Home Page" width="100%" />

### Property Listings
<img src="https://ik.imagekit.io/xh3awoalr/Property/github/Screenshot%202025-03-07%20at%2011.28.54%E2%80%AFAM.png?updatedAt=1741327229157" alt="Property Listings Page" width="100%" />

### Property Details
<img src="https://ik.imagekit.io/xh3awoalr/Property/github/Screenshot%202025-03-07%20at%2011.29.18%E2%80%AFAM.png?updatedAt=1741327228975" alt="Property Details Page" width="100%" />

### AI-Powered Property Analysis
<img src="https://ik.imagekit.io/xh3awoalr/Property/github/Screenshot%202025-03-11%20at%204.01.34%E2%80%AFPM.png?updatedAt=1741689154739" alt="AI Property Analysis" width="100%" />

### AI-Powered Location Trends
<img src="https://ik.imagekit.io/xh3awoalr/Property/github/Screenshot%202025-03-11%20at%204.01.51%E2%80%AFPM.png?updatedAt=1741689154924" alt="AI Location Trends" width="100%" />


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Azure AI](https://azure.microsoft.com/en-us/services/cognitive-services/ai-services/)

## 📧 Contact

Aayush Vaghela - [GitHub](https://github.com/AAYUSH412)

Project Link: [https://github.com/AAYUSH412/Real-Estate-Website](https://github.com/AAYUSH412/Real-Estate-Website)

---

<div align="center">
  <p>Built with ❤️ by Aayush Vaghela</p>
  <p>© 2024 BuildEstate. All Rights Reserved.</p>
</div>
