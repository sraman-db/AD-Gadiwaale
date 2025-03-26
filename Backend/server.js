const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
const app = express();
const PORT = 5500;

// Middleware
// app.use(cors());
app.use(express.json());

app.use(cors({
  origin: '*', // Allow all origins, change to specific domain if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/carRental', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Car Schema
const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  carName: { type: String, required: true },
  customerName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now }
});

// Car Model
const Car = mongoose.model('Car', carSchema);

// User Model
const User = mongoose.model('User', userSchema);

// Booking Model
const Booking = mongoose.model('booking_history', bookingSchema);

// Routes
// Get all cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create car
app.post('/api/cars', async (req, res) => {
  const car = new Car({
    name: req.body.name,
    year: req.body.year,
    pricePerDay: req.body.pricePerDay,
    available: req.body.available
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// app.post('/api/users/register', async (req, res) => {
//   res.status(200).json({ message: "POST request received" });
// });


// In the registration route handler
app.post('/api/users/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log('User already exists with email:', req.body.email);
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      licenseNumber: req.body.licenseNumber
    });

    console.log('Attempting to save user to database');
    const savedUser = await user.save();
    console.log('User saved successfully');
    
    // Don't send password in response
    const userResponse = {
      _id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email
    };
    
    res.status(201).json(userResponse);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ message: err.message });
  }
});

// Login user
app.post('/api/users/login', async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Send successful response
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new booking
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking({
      carId: req.body.carId,
      carName: req.body.carName,
      customerName: req.body.customerName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      totalPrice: req.body.totalPrice,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});