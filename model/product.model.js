module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
        title: String,
        description: String,
        price: Number,
        model: String
    }
);

schema.method("toJSON", function() {

    const { _v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

const Product = mongoose.model("product", schema);
return Product;

};
