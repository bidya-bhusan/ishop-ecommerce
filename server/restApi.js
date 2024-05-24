var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var express = require("express");
var multer = require("multer");
const path = require("path");

var conStr = "mongodb://127.0.0.1:27017";

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "../server/images")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

app.post("/resister-admin", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("ishop");
        var admin = {
            UserId: req.body.UserId,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Password: req.body.Password
        };
        database.collection("tbladmin").insertOne(admin).then(() => {
            console.log("admin added sucessfully")
            res.end();
        });

    });
});



//Get Admin
app.get("/get-admin", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("ishop")
        database.collection("tbladmin").find({}).toArray().then((admin) => {
            res.send(admin)
            res.end()
        })
    })
})


// Resister Costomer
app.post("/resister-customer", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("ishop");
        var customer = {
            CustomerId: req.body.CustomerId,
            Name: req.body.Name,
            Email: req.body.Email,
            Password: req.body.Password,
            Address: req.body.Address,
            City: req.body.City,
            State: req.body.State,
            Contact: parseInt(req.body.Contact)
        };
        database.collection("tblcustomers").insertOne(customer).then(() => {
            console.log("user resistred");
            res.end();
        });
    });
});


//Get Costomer
app.get("/get-customers", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("ishop");
        database.collection("tblcustomers").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        });
    });
});


// Add Product
app.post("/add-product", upload.single("file"), (req, res) => {
    const uploadFile = req.file;
    if (!uploadFile) {
        return res.send(400).send("no file uploaded")
    }
    var product = {
        ProductId: parseInt(req.body.ProductId),
        Title: req.body.Title,
        Price: parseInt(req.body.Price),
        CategoryId: parseInt(req.body.CategoryId),
        VendorId: parseInt(req.body.VendorId),
        Image: req.file.filename
    }
    mongoClient.connect(conStr).then(clientObject => {
        var database = clientObject.db("ishop");
        database.collection("tblproducts").insertOne(product).then(() => {
            console.log("Product Added");
            res.end();
        });
    });
});

// get all products
app.get("/get-products", (req, res) => {
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("ishop");
        database.collection("tblproducts").find({}).toArray().then(products => {
            res.send(products);
            res.end();
        });
    });
});


// Get Product By Product ID
app.get("/product/:id", (req, res) => {
    var productId = parseInt(req.params.id);
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("ishop");
        database.collection("tblproducts").findOne({ ProductId: productId })
            .then(product => {
                res.send(product)
            })
    });
});

// Get Product By Category Id
app.get("/product/category/:id", (req, res) => {
    var categoryId = parseInt(req.params.id);
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("ishop");
        database.collection("tblproducts").find({ CategoryId: categoryId })
            .toArray().then(products => {
                res.send(products);
            })
    });
});




//filter Product
app.get("/filter-product", (req, res) => {
    mongoClient.connect(conStr)
        .then(client => {
            const db = client.db("ishop");
            db.collection("tblproducts")
                .find({})
                .toArray()
                .then(products => {
                    const uniqueProducts = []; // To store unique products
                    const seenCategoryIds = new Set(); // To keep track of seen category IDs

                    products.forEach(product => {
                        if (!seenCategoryIds.has(product.CategoryId)) { // If category ID is not seen
                            uniqueProducts.push(product); // Add product to uniqueProducts
                            seenCategoryIds.add(product.CategoryId); // Add category ID to seenCategoryIds
                        }
                    });

                    res.send(uniqueProducts); // Send unique products as response
                })

        })

});


// Get Images Product id
app.get("/get-images/:ProductId", (req, res) => {
    const ProductId = parseInt(req.params.ProductId)
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("ishop")
        database.collection("tblproducts").findOne({ ProductId: ProductId }).then(product => {
            res.sendFile(`${__dirname}/images/${product.Image}`)
        });
    });
});


// Ger Categories
app.get("/get-categories", (req, res) => {
    mongoClient.connect(conStr).then(clientObject => {
        var database = clientObject.db("ishop");
        database.collection("tblcategories").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    });
});


// Get Vensors
app.get("/get-vendors", (req, res) => {
    mongoClient.connect(conStr).then(clientObject => {
        var database = clientObject.db("ishop");
        database.collection("tblvendors").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});


// Get VEndor By Categories ID
app.get("/get-vendor/:cartid", (req, res) => {
    var catid = parseInt(req.params.catid);
    mongoClient.connect(conStr).then(clientObject => {
        var database = clientObject.db("ishop");
        database.collection("tblvendors").find({ CategoryId: catid }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.listen(2020);
console.log("Server Started 2020");