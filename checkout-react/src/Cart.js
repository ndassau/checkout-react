import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart({
    total,
    setTotal,
    productsInCart,
    setProductsInCart,
    calculateTotal,
}) {
    useEffect(() => {
        setTotal(calculateTotal(productsInCart));
    }, []);

    const updateQuantity = (product, index) => {
        const updatedProducts = [...productsInCart];
        updatedProducts[index] = product;
        setProductsInCart(updatedProducts);
    };

    const updateCart = (products = productsInCart) => {
        const newTotal = calculateTotal(products);
        setTotal(newTotal);
    };

    const removeProduct = (index) => {
        let updatedProducts = [...productsInCart];
        updatedProducts.splice(index, 1);
        setProductsInCart(updatedProducts);
        updateCart(updatedProducts);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-8">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <h5>
                                            <span className="glyphicon glyphicon-shopping-cart"></span>{" "}
                                            Shopping Cart
                                        </h5>
                                    </div>
                                    <div className="col-xs-6">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm btn-block"
                                        >
                                            <span className="glyphicon glyphicon-share-alt"></span>{" "}
                                            Continue shopping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            {productsInCart.map((product, index) => (
                                <div key={index}>
                                    <div className="row">
                                        <div className="col-xs-2">
                                            <img
                                                className="img-responsive"
                                                src="http://placehold.it/100x70"
                                                alt="product-img"
                                            />
                                        </div>
                                        <div className="col-xs-4">
                                            <h4 className="product-name">
                                                <strong>{product.name}</strong>
                                            </h4>
                                            <h4>
                                                <small>
                                                    {product.description}
                                                </small>
                                            </h4>
                                        </div>
                                        <div className="col-xs-6">
                                            <div className="col-xs-6 text-right">
                                                <h6>
                                                    <strong>
                                                        $
                                                        {product.price.toFixed(
                                                            2
                                                        )}{" "}
                                                        <span className="text-muted">
                                                            x
                                                        </span>
                                                    </strong>
                                                </h6>
                                            </div>
                                            <div className="col-xs-4">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="form-control input-sm"
                                                    value={product.quantity}
                                                    onChange={(e) => {
                                                        product.quantity =
                                                            e.target.value;
                                                        updateQuantity(
                                                            product,
                                                            index
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="col-xs-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-link btn-xs"
                                                    onClick={() =>
                                                        removeProduct(index)
                                                    }
                                                >
                                                    <span className="glyphicon glyphicon-trash">
                                                        {" "}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                            <div className="row">
                                <div className="text-center">
                                    <div className="col-xs-9">
                                        <h6 className="text-right">
                                            Added items?
                                        </h6>
                                    </div>
                                    <div className="col-xs-3">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => updateCart()}
                                        >
                                            Update cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <div className="row text-center">
                                <div className="col-xs-9">
                                    <h4 className="text-right">
                                        Total <strong>${total}</strong>
                                    </h4>
                                </div>
                                <div className="col-xs-3">
                                    <Link
                                        to="/checkout"
                                        className={
                                            !productsInCart.length
                                                ? "disabled-link"
                                                : ""
                                        }
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-success btn-block"
                                            disabled={!productsInCart.length}
                                        >
                                            Checkout
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
