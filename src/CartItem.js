import React from "react";

const CartItem = (props) => {
    
    // increaseQuantity = () => {
    //     // console.log('this', this.state);
    //     // setstate form 1
    //     // this.setState({   // for rerendering the component with the updated value.
    //     //     Qty: this.state.Qty + 1
    //     // }, () => {
    //     //     console.log('this.state', this.state);
    //     // });
    //     //setstate form 2 -if previous state is required use this
    //     this.setState((prevState) => {
    //         return {
    //             Qty: prevState.Qty + 1
    //         }
    //     }, () => {
    //         console.log('this.state', this.state);
    //     });
    // }

    // decreaseQuantity = () => {
    //     const { Qty } = this.state;
    //     if 
    //     (Qty === 0){
    //         return;
    //     }
    //     this.setState((prevState) => {
    //         return {
    //             Qty: prevState.Qty - 1
    //         }
    //     }, () => {
    //         console.log('this.state', this.state);
    //     });
    // }
// this.increaseQuantity = this.increaseQuantity.bind(this);
    const { price, title, Qty } = props.product;
    const { product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct } = props;
    return (
        <div className="cart-item">
            <div className="left-block">
                <img style={styles.image} src = {product.img}></img>
            </div>
            <div className="right-block">
                <div style={{ fontSize: 25 }}> {title} </div>
                <div style={{ color: '#777' }}> Rs {price}  </div>
                <div style={{ color: '#777' }}> Qty: {Qty} </div>
                <div className="cart-item-actions">
                    {/* Buttons */}
                    <img 
                        alt = "increase"
                        className="action-icons"
                        src = "https://cdn-icons-png.flaticon.com/512/992/992651.png"
                        onClick = {() => onIncreaseQuantity(product)}>
                    </img>
                    <img
                        alt = "decrease"
                        className="action-icons"
                        src = "https://cdn-icons-png.flaticon.com/512/992/992683.png"
                        onClick = {() => onDecreaseQuantity(product)}>
                    </img>
                    <img
                        alt = "delete"
                        className="action-icons"
                        src = "https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                        onClick = {() => onDeleteProduct(product.id)}>
                    </img>
                </div>
            </div>
        </div>
    );
}

const styles = {
    image: {
        height: 120,
        width: 120,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;