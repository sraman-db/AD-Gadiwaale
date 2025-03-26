# AD-Gadiwaale 🚗 Online Car Rental System

## Project Overview
AD-Gadiwaale is a comprehensive web-based car rental platform that simplifies the process of renting vehicles for local and tourist travelers. The application provides a user-friendly interface with multiple features to enhance the car rental experience.

## 🌟 Key Features

### User Management
- User account creation and authentication
- Secure login system
- User data storage in MongoDB database

### Car Rental Process
- Browse available car inventory
- Select rental dates
- View car availability in real-time
- Flexible booking options
- Booking history tracking

### Additional Offerings
- Interactive tourism spots recommendations
- Integrated map locations
- User review system
- Contact form with message storage

## 🛠 Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: 
  - User Data: MongoDB
  - Booking History: MongoDB
  - Contact Form Messages: Google Sheets
- Payment Gateway: Static mock implementation
- Authentication: Custom login system

## 📦 Project Structure
```
AD-Gadiwaale/
│
├── public/                 # Static assets
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/                  # HTML templates
│   ├── index.html
│   ├── cars.html
│   ├── login.html
│   ├── booking.html
│   └── contact.html
│
├── routes/                 # Server-side routes
│   ├── auth.js
│   ├── booking.js
│   └── contact.js
│
├── models/                 # Database models
│   ├── user.js
│   └── booking.js
│
├── config/                 # Configuration files
│   ├── database.js
│   └── sheets.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.x or later)
- MongoDB
- Google Sheets API credentials

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/AD-Gadiwaale.git
   cd AD-Gadiwaale
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file
   - Add MongoDB connection string
   - Add Google Sheets API credentials

4. Run the application
   ```bash
   npm start
   ```

## 🔐 Authentication Flow
1. User creates an account
2. User data stored in MongoDB
3. Secure login process
4. Access to booking features

## 💳 Booking Process
1. Select rental dates
2. Browse available cars
3. Choose a vehicle
4. Mock payment gateway
   - Cash payment option
   - UPI payment option
5. Booking details stored in database

## 🗺️ Tourism Integration
- Curated local tourism spots
- Interactive map locations
- Recommendations based on rental routes

## 📝 User Reviews
- Submit and view user experiences
- Rating system for cars and service

## 📞 Contact Us
- Message submission
- Direct storage in Google Sheets
- Quick response mechanism

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact
Your Name - youremail@example.com

Project Link: [https://github.com/yourusername/AD-Gadiwaale](https://github.com/yourusername/AD-Gadiwaale)

---

**Note**: This is a mock implementation. Ensure proper security measures and compliance with local regulations when deploying a real car rental system.
