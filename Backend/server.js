import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import customerAuthRoutes from "./routes/customerAuthRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { Server } from "socket.io";
import http from "http";
import chatRoutes from "./routes/chatRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import dashboardIndexRoutes from "./routes/dashboardIndexRoutes.js";

// app config
const app = express();
const port = process.env.PORT;

const server = http.createServer(app);

//middleware
app.use(express.json());

// app.use(cors())
app.use(cookieParser());

app.use(
  cors({
    origin:  process.env.NODE_ENV === "production"
        ? [process.env.FRONTEND_URL, process.env.DASHBOARD_URL]
        : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);


//socket
const io = new Server(server, {
  cors: {
    origin:  process.env.NODE_ENV === "production"
        ? [process.env.FRONTEND_URL, process.env.DASHBOARD_URL]
        : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

var allCustomer = [];
var allSeller = [];

const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some((u) => u.customerId === customerId);
  if (!checkUser) {
    allCustomer.push({
      customerId,
      socketId,
      userInfo,
    });
  }
};

const addSeller = (sellerId, socketId, userInfo) => {
  const checkSeller = allSeller.some((u) => u.sellerId === sellerId);
  if (!checkSeller) {
    allSeller.push({
      sellerId,
      socketId,
      userInfo,
    });
  }
};

const findCustomer = (customerId) => {
  return allCustomer.find((c) => c.customerId === customerId);
};

const findSeller = (sellerId) => {
  return allSeller.find((c) => c.sellerId === sellerId);
};

const remove = (socketId) => {
  allCustomer = allCustomer.filter((c) => c.socketId !== socketId);
  allSeller = allSeller.filter((c) => c.socketId !== socketId);
};

let admin = {};

const removeAdmin = (socketId) => {
  if(admin.socketId === socketId){
    admin ={}
  }
}

io.on("connection", (socket) => {
  console.log("Socket server is connected", socket.id);

  socket.on("add_user", (customerId, userInfo) => {
    addUser(customerId, socket.id, userInfo);
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });

  socket.on("add_seller", (sellerId, userInfo) => {
    addSeller(sellerId, socket.id, userInfo);
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
    io.emit("activeAdmin" , {status:true} )
  });

  // socket.on("add_admin", (adminInfo) => {
  //   console.log(adminInfo)

  //   delete adminInfo.email
  //   admin = adminInfo
  //   admin.socketId = socket.id

  //   io.emit('activeSeller' , allSeller)
  //   // addSeller(sellerId, socket.id, userInfo);
  //   // io.emit("activeSeller", allSeller);
  //   // io.emit("activeCustomer", allCustomer);
  // });

  socket.on("add_admin", (adminInfo) => {
    console.log(adminInfo);

    const { email, ...rest } = adminInfo;

    admin = {
      ...rest,
      socketId: socket.id,
    };

    io.emit("activeSeller", allSeller);
    io.emit("activeAdmin" , {status:true} )
  });

  socket.on("sendSellerMessage", (msg) => {
    const customer = findCustomer(msg.receverId);
    if (customer !== undefined) {
      socket.to(customer.socketId).emit("sellerMessage", msg);
    }
  });

  socket.on("sendCustomerMessage", (msg) => {
    const seller = findSeller(msg.receverId);
    if (seller !== undefined) {
      socket.to(seller.socketId).emit("customerMessage", msg);
    }
  });

  socket.on("sendMessageAdminToSeller", (msg) => {
    const seller = findSeller(msg.receverId);
    if (seller !== undefined) {
      socket.to(seller.socketId).emit("receveredAdminMessage", msg);
    }
  });


  socket.on("sendMessageSellerToAdmin", (msg) => {
    if (admin.socketId) {
      socket.to(admin.socketId).emit("receveredSellerMessage", msg);
    }
  });
  

  socket.on("disconnect", () => {
    console.log("user disconnect");
    remove(socket.id);
    removeAdmin(socket.id)
    io.emit('activeAdmin' , {status:false})
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });
});

//db connection

connectDB();

// api endpoints
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", sellerRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/customer", customerAuthRoutes);
app.use("/api/home/product", cardRoutes);
app.use("/api/home/order", orderRoutes);
app.use("/api", chatRoutes);
app.use("/api", paymentRoutes);
app.use("/api" , bannerRoutes);
app.use("/api" , dashboardIndexRoutes)

app.get("/", (req, res) => {
  res.send("API working");
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
