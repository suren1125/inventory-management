import "dotenv/config"; // must be first
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

/* route imports */
import dashboardRoutes from "./routes/dashboardRoutes.ts";
import productRoutes from "./routes/productRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import expenseRoutes from "./routes/expenseRoutes.ts";

/* configurations */
const app = express();

app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* routes */
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

/* server */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
