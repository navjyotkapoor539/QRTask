import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";
import Menu from "./models/Menu.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const DB_URI = process.env.MONGODB_URI;

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);

app.use(express.json());

try {
  await mongoose.connect(DB_URI);
  console.log("Connected to Mongodb");
} catch (error) {
  console.log(error);
}


const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PASSWORD,
        salt
      );

      const admin = new Admin({
        username: process.env.DEFAULT_ADMIN_USERNAME,
        password: hashPassword,
      });
      await admin.save();
      console.log("Default admin created: Username: admin, Password: admin123");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error creating default admin:", error.message);
  }
};

seedAdmin();

const seedMenu = async () => {
  const existingMenu = await Menu.find();
  if (existingMenu.length === 0) {
    const items = [
      {
        name: "Pizza",description: "Cheesy pizza with toppings",price: 12,imageUrl: "https://img.freepik.com/free-photo/front-view-delicious-cheese-pizza-consists-olives-pepper-tomatoes-dark-surface_179666-34391.jpg?ga=GA1.1.640239555.1726669102&semt=ais_hybrid",
      },
      {
        name: "Burger",description: "Juicy beef burger",price: 8,imageUrl: "https://img.freepik.com/free-photo/front-view-tasty-meat-burger-with-cheese-salad-dark-background_140725-89597.jpg?ga=GA1.1.640239555.1726669102&semt=ais_hybrid",
      },
      {
        name: "Pasta", description: "Italian pasta with sauce",price: 10, imageUrl: "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg?ga=GA1.1.640239555.1726669102&semt=ais_hybrid",
      },
      {
        name: "Sushi",description: "Fresh sushi rolls",price: 15,imageUrl: "https://img.freepik.com/free-photo/variety-sushi-rolls-isolated-grey-table_114579-22111.jpg?ga=GA1.1.640239555.1726669102&semt=ais_hybrid",
      },
      {
        name: "Salad",description: "Healthy green salad",price: 7,imageUrl: "https://img.freepik.com/free-photo/close-up-view-delicious-vegan-salad-with-fresh-ingredients-plate_179666-47139.jpg?ga=GA1.1.640239555.1726669102&semt=ais_hybrid",  
      },
    ];
    await Menu.insertMany(items);
    console.log("Menu seeded with default items");
  }
};
seedMenu();

app.use("/admin", adminRoutes);
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log("Server is listening");
});