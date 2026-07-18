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
    },
    {
        name: "River View Retreat",
        location: "Rishikesh",
        price: 2200,
        description: "Peaceful stay beside the Ganga, ideal for yoga and adventure lovers.",
        contact: "+91-9876543211",
    },
    {
        name: "Snow Peak Cottage",
        location: "Auli",
        price: 3500,
        description: "Comfortable cottage offering stunning Himalayan views and easy access to skiing.",
        contact: "+91-9876543212",
    },
    {
        name: "Chopta Eco Lodge",
        location: "Chopta",
        price: 1800,
        description: "Budget-friendly eco lodge located close to the Tungnath trek.",
        contact: "+91-9876543213",
    },
    {
        name: "Mandakini Homestay",
        location: "Rudraprayag",
        price: 1700,
        description: "Riverside stay perfect for travelers visiting Kedarnath.",
        contact: "+91-9876543214",
    },
    {
        name: "Devbhoomi Stay",
        location: "Guptkashi",
        price: 2000,
        description: "Clean rooms with scenic valley views and easy Kedarnath access.",
        contact: "+91-9876543215",
    },
    {
        name: "Lake Breeze Cottage",
        location: "Nainital",
        price: 3200,
        description: "Family-friendly cottage near Naini Lake with beautiful surroundings.",
        contact: "+91-9876543216",
    },
    {
        name: "Pine Valley Homestay",
        location: "Almora",
        price: 2100,
        description: "Traditional Kumaoni home surrounded by pine forests.",
        contact: "+91-9876543217",
    },
    {
        name: "Hill Crest Retreat",
        location: "Ranikhet",
        price: 2400,
        description: "Quiet getaway with sunrise views and nearby nature trails.",
        contact: "+91-9876543218",
    },
    {
        name: "Munsiyari Mountain Nest",
        location: "Munsiyari",
        price: 2800,
        description: "Perfect base for trekking with panoramic Panchachuli mountain views.",
        contact: "+91-9876543219",
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