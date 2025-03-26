const mongoose = require('mongoose');

// Connect to MongoDB
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

// Car Model
const Car = mongoose.model('Car', carSchema);

// Sample cars data
const sampleCars = [
  {
    name: 'Audi A4',
    year: 2023,
    pricePerDay: 13000,
    available: true
  },
  {
    name: 'Hyundai Creta',
    year: 2022,
    pricePerDay: 11500,
    available: true
  },
  {
    name: 'BMW 6-Series',
    year: 2023,
    pricePerDay: 16600,
    available: true
  },
  {
    name: 'Mercedes-Benz E-Class',
    year: 2022,
    pricePerDay: 21000,
    available: true
  },
  {
    name: 'Ford EcoSport',
    year: 2021,
    pricePerDay: 9500,
    available: true
  },
  {
    name: 'Toyota Fortunar',
    year: 2021,
    pricePerDay: 18000,
    available: true
  },
  {
    name: 'MG Hector',
    year: 2023,
    pricePerDay: 17500,
    available: true
  },
  {
    name: 'Suzuki S-Cross',
    year: 2024,
    pricePerDay: 14700,
    available: true
  }
];

// Function to seed the database
async function seedDB() {
  try {
    // Clear existing cars
    await Car.deleteMany({});
    console.log('Cleared existing cars');
    
    // Insert sample cars
    const result = await Car.insertMany(sampleCars);
    console.log(`${result.length} cars inserted`);
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.disconnect();
  }
}

// Run the seed function
seedDB();