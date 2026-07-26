const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const Homestay = require("./models/homestayModel");

const homestays = [
    {
        name: "Himalayan Bliss Homestay",
        location: "Mussoorie",
        price: 2500,
        description: "A cozy mountain-view homestay near Mall Road with homemade Garhwali meals.",
        contact: "+91-9876543210",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "River View Retreat",
        location: "Rishikesh",
        price: 2200,
        description: "Peaceful stay beside the Ganga, ideal for yoga and adventure lovers.",
        contact: "+91-9876543211",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Snow Peak Cottage",
        location: "Auli",
        price: 3500,
        description: "Comfortable cottage offering stunning Himalayan views and easy access to skiing.",
        contact: "+91-9876543212",
        image: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Chopta Eco Lodge",
        location: "Chopta",
        price: 1800,
        description: "Budget-friendly eco lodge located close to the Tungnath trek.",
        contact: "+91-9876543213",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Mandakini Homestay",
        location: "Rudraprayag",
        price: 1700,
        description: "Riverside stay perfect for travelers visiting Kedarnath.",
        contact: "+91-9876543214",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Devbhoomi Stay",
        location: "Guptkashi",
        price: 2000,
        description: "Clean rooms with scenic valley views and easy Kedarnath access.",
        contact: "+91-9876543215",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Lake Breeze Cottage",
        location: "Nainital",
        price: 3200,
        description: "Family-friendly cottage near Naini Lake with beautiful surroundings.",
        contact: "+91-9876543216",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Pine Valley Homestay",
        location: "Almora",
        price: 2100,
        description: "Traditional Kumaoni home surrounded by pine forests.",
        contact: "+91-9876543217",
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Hill Crest Retreat",
        location: "Ranikhet",
        price: 2400,
        description: "Quiet getaway with sunrise views and nearby nature trails.",
        contact: "+91-9876543218",
        image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Munsiyari Mountain Nest",
        location: "Munsiyari",
        price: 2800,
        description: "Perfect base for trekking with panoramic Panchachuli mountain views.",
        contact: "+91-9876543219",
        image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80"
    },
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        await Homestay.deleteMany({});
        console.log("Old homestays removed");

        await Homestay.insertMany(homestays);
        console.log("Sample homestays inserted successfully");

        await mongoose.disconnect();
        console.log("Database connection closed");

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seedDatabase();