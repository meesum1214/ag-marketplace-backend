const db = require("../models");
const Cart = db.cart;

// Create and Save a new Cart
exports.addToCart = (req, res) => {
    const { item_quantity, user_id, product_id } = req.body;

    // Create a Cart
    const cart = {
        item_quantity,
        user_id,
        product_id
    };

    // Save Cart in the database
    Cart.create(cart)
        .then(data => {
            res.send({
                message: "Cart added successfully",
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cart."
            });
        });

};

// Retrieve all Carts from the database.
exports.getCart = (req, res) => {
    const { user_id } = req.query;
    Cart.findAll({
        where: { user_id },
        include: [
            {
                model: db.product,
                as: "product",
                attributes: ["id", "productName", "price"]
            },
            {
                model: db.user,
                as: "user",
                attributes: ["id", "firstName", "lastName", "email"]
            },
        ]
    })
        .then(data => {
            res.send({
                message: "Cart fetched successfully",
                data,
                totalItems: data.length
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving carts."
            });
        });
};

// Delete a Cart with the specified id in the request
exports.deleteCart = async (req, res) => {
    const { cart_id } = req.query;
    try {
        const cart = await Cart.destroy({
            where: { id: cart_id }
        });
        if (cart === 0) return res.status(404).send({ message: "Cart not found" });
        res.status(200).send({
            message: "Cart deleted successfully",
            cart
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while deleting the Cart."
        });
    }
}

// Update a Cart by the id in the request
exports.updateCart = (req, res) => {
    const { cart_id, item_quantity } = req.body;

    if (item_quantity < 1) {
        Cart.destroy({
            where: { id: cart_id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Cart was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
                    });
                }
            })

        return;
    }

    Cart.update({ item_quantity }, {
        where: { id: cart_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cart was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Cart with id=" + id
            });
        });
};