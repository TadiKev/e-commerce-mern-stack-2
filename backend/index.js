require('dotenv').config();
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 4000;
const mongooseURI = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());


if (!mongooseURI) {
    console.error("Error: Missing MONGO_URI. Please check your .env file.");
    process.exit(1); 
}
if (!jwtSecret) {
    console.error("Error: Missing JWT_SECRET. Please check your .env file.");
    process.exit(1);
}

// Ensure upload directory exists
const uploadDir = './upload/image';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Database connection with MongoDB
mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
      console.error("MongoDB connection error:", error.message);
      process.exit(1); // Exit if the database connection fails
  });

// Serve static files from the 'upload' directory
app.use('/upload/image', express.static(path.join(__dirname, 'upload', 'image')));

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/image',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Multer upload setup with error handling
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }  // Limit file size to 10MB
}).single('image');

// Creating upload endpoint for image
app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ success: 0, message: "File upload error", error: err.message });
        }
        if (!req.file) {
            console.error("No file uploaded");
            return res.status(400).json({ success: 0, message: "No file uploaded" });
        }
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/upload/image/${req.file.filename}`
        });
    });
});

// Schema for creating products
const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number, 
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("Product", ProductSchema);

// Add product route
app.post("/addproduct", async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error("Error uploading file:", err);
                return res.status(500).json({ success: 0, message: "Error uploading file", error: err.message });
            }

            const { name, category, new_price, old_price } = req.body;
            const image = req.file ? `http://localhost:${port}/upload/image/${req.file.filename}` : '';

            if (!name || !image || !category || !new_price || !old_price) {
                return res.status(400).json({ 
                    success: 0, 
                    message: "All fields are required" 
                });
            }

            const products = await Product.find({});
            const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

            const product = new Product({
                id,
                name,
                image,  // Storing the full image URL in the database
                category,
                new_price,
                old_price
            });

            await product.save();

            res.status(201).json({
                success: 1,
                message: "Product added successfully",
                product
            });
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: 0,
            message: "Error adding product",
            error: error.message
        });
    }
});

app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products",
            error: error.message
        });
    }
});



// Remove product route
app.post("/removeproduct", async (req, res) => {
    try {
        const { id } = req.body;

        // Ensure that the id is provided
        if (!id) {
            return res.status(400).json({ success: 0, message: "Product ID is required" });
        }

        // Find and delete the product by ID
        const deletedProduct = await Product.findOneAndDelete({ id });

        if (!deletedProduct) {
            return res.status(404).json({ success: 0, message: "Product not found" });
        }

        res.status(200).json({
            success: 1,
            message: "Product removed successfully",
            product: deletedProduct
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: 0,
            message: "Error removing product",
            error: error.message
        });
    }
});

//Schema for creating the user model

const User = mongoose.model('User', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Endpoint for registering the user
const bcrypt = require("bcrypt");

app.post('/signup', async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "Existing user found with the same email address" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });

        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


// Creating endpoint for user login
app.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const passMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passMatch) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


//creating endpints for latest products
app.get('/newcollections',async(req,res)=>{
    let product = await Product.find({})
    let newcollection = product.slice(1).slice(-8)
    console.log("new collection fetched");
    res.send(newcollection)
    
})

app.get('/popularproducts', async (req, res) => {
    try {
        const category = req.query.category || 'Women'; 
        const products = await Product.find({ category });
        const popularProducts = products.slice(5,10);
        console.log(`Popular products for category "${category}" fetched`);
        res.status(200).send(popularProducts);
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).send({ message: "Failed to fetch popular products" });
    }
});


app.get('/relatedproducts', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find({});
        
        // Get the first 4 products
        const relatedProducts = products.slice(0, 4);

        console.log("Related products fetched");
        res.status(200).send(relatedProducts);
    } catch (error) {
        console.error("Error fetching related products:", error);
        res.status(500).send({ message: "Failed to fetch related products" });
    }
});


// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, 'secret-ecom'); // Ensure this matches your JWT secret
    req.user = data.user; // Assuming data.user contains user information
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token, please authenticate" });
  }
};

app.post('/addtocart', fetchUser, async (req, res) => {
    try {
      let userData = await User.findOne({ _id: req.user.id });
      if (!userData) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (!userData.cartData) {
        userData.cartData = {};
      }
  
      const itemId = req.body.itemId;
      if (!itemId) {
        return res.status(400).json({ error: "Item ID is required" });
      }
  
      userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;
  
      // Ensure the database is updated with the modified cartData
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { cartData: userData.cartData } }
      );
  
      res.json({ message: "Added" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// Creating an endpoint to get items from the cart
app.get('/getcart', fetchUser, async (req, res) => {
    try {
        console.log("Fetching cart data...");
        
        // Find the user based on the authenticated user ID
        let userData = await User.findOne({ _id: req.user.id });

        // If user data is found, send the cart data
        if (userData) {
            res.json(userData.cartData); 
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Creating endpoint for removing cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({ success: false, message: 'Item ID is required.' });
        }

        const user = await User.findOne({ _id: req.user.id });

        if (!user || !user.cartData || !user.cartData[itemId]) {
            return res.status(404).json({ success: false, message: 'Item not found in cart.' });
        }

        // Decrease the quantity or remove the item if quantity becomes zero
        if (user.cartData[itemId] > 1) {
            user.cartData[itemId] -= 1; // Decrement quantity
        } else {
            delete user.cartData[itemId]; // Remove item completely
        }

        // Save updated cartData back to the database
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: { cartData: user.cartData } }
        );

        res.status(200).json({ success: true, message: 'Item removed successfully.', cartData: user.cartData });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});



app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error:", error);
  }
});
