import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import Cart from "./Cart";
import Checkout from "./Checkout";
import PaymentDetails from "./PaymentDetails";

const products = [
    {
        name: "Product 1",
        description: "Description for Product 1",
        price: 100,
        quantity: 1,
    },
    {
        name: "Product 2",
        description: "Description for Product 2",
        price: 200,
        quantity: 2,
    },
    {
        name: "Product 3",
        description: "Description for Product 3",
        price: 300,
        quantity: 3,
    },
];

function App() {
    const calculateTotal = (products) => {
        let total = 0;

        if (!products) return 0;

        for (let product of products) {
            total += product.price * product.quantity;
        }

        return total;
    };
    
    const [productsInCart, setProductsInCart] = useState(products);
    const [total, setTotal] = useState(calculateTotal(productsInCart));

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Cart
                            total={total.toFixed(2)}
                            setTotal={setTotal}
                            productsInCart={productsInCart}
                            setProductsInCart={setProductsInCart}
                            calculateTotal={calculateTotal}
                        />
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <Checkout
                            total={total.toFixed(2)}
                            calculateTotal={calculateTotal}
                            productsInCart={productsInCart}
                            setTotal={setTotal}
                        />
                    }
                />
                <Route
                    path="/checkout/payment"
                    element={<PaymentDetails total={total.toFixed(2)} />}
                />
            </Routes>
        </div>
    );
}

export default App;
