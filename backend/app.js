const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const dotenv = require("dotenv");

dotenv.config();
const swaggerOptions = require("./swagger.json");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const db = require("./models");

// Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");
const foodItemsRouter = require("./routes/foodItemsRoutes");
const foodCategoriesRouter = require("./routes/foodCategoriesRoutes");
const nearbyRestaurantRouter = require("./routes/nearbyRestaurantRoutes");
const resetPasswordRouter = require("./routes/resetPasswordRoutes");
const orderRouter = require("./routes/orderRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware
app.use(cookieParser());

// CORS Middleware with debugging headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/fooditems", foodItemsRouter);
app.use("/api/foodCategories", foodCategoriesRouter);
app.use("/api/nearbyrestaurants", nearbyRestaurantRouter);
app.use("/api/resetpassword", resetPasswordRouter);
app.use("/api/order", orderRouter);

// Sync database
db.sequelize.sync().then((req) => {

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
