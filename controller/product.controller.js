const db = require("../model");
const Products = db.products;


exports.showAll = (req, res) => {

    Products.find({})
    .then(data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving Products."
        });
    });
};

// Create and Save a new Product
exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({ message: "Title can not be empty!"});
        return;
    }

// Create a Product
const product = new Products({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    model: req.body.model
});

// Save the Product in the database
product
.save(product)
.then(data => {
    // res.send(data);
    res.send("Insertion successful");
})
.catch(err => {
    res.status(500).send({
       message:
       err.message || "Some error occured while creating the Product.." 
    });
});

};

// Update a Products by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Products with id=${id}. Maybe Products was not found!`
          });
        } else res.send({ message: "Products was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Products with id=" + id
        });
      });
  };

   // Delete a Products with the specified id in the request
   exports.delete = (req, res) => {
    const id = req.params.id;
  
    Products.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Products with id=${id}. Maybe Products was not found!`
          });
        } else {
          res.send({
            message: "Products was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Products with id=" + id
        });
      });
  };

  // Delete all Products from the database.
  exports.deleteAll = (req, res) => {
    Products.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Products were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Products."
        });
      });
  };


