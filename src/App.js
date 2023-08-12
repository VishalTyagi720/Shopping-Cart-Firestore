import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from 'firebase/app';
import 'firebase/firestore';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      products:[],
      loading: true
        // {
        //   price: 9999,
        //   title: 'Phone',
        //   Qty: 1,
        //   img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        //   id: 1
        // },
        // {
        //   price: 999,
        //   title: 'Watch',
        //   Qty: 10,
        //   img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        //   id: 2
        // },
        // {
        //   price: 100000,
        //   title: 'Laptop',
        //   Qty: 2,
        //   img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        //   id: 3
        // }
    };
    this.db = firebase.firestore();
  }

  componentDidMount () {
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data())
    //     });

    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       data['id'] = doc.id;
    //       return data;
    //     })

    //     this.setState({
    //       products: products,
    //       loading: false
    //     })
    //   })

    this.db
      .collection('products')
      // .where('price', '>', 1000)   // for accessing a specific type of data
      // .where('title', "==", 'Mouse')
      .orderBy('price', 'desc')  // for sorting the data
      .onSnapshot((snapshot) => {
        console.log(snapshot);

        snapshot.docs.map((doc) => {
          console.log(doc.data())
        });

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        })

        this.setState({
          products: products,
          loading: false
        })
      })
  }

  handleIncreaseQuantity = (product) => {
    console.log('increses the quntity', product);
    const { products }  = this.state;
    const index = products.indexOf(product);

    // products[index].Qty += 1;
    // this.setState({
    //     products         //:products
    // })

    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
      .update({
        Qty: products[index].Qty + 1
      })
      .then(() => {
        console.log('update increased successfully');
      })
      .catch((error) => {
        console.log('Error', error);
      })
  }

  handleDecreaseQuantity = (product) => {
    console.log('increses the quntity', product);
    const { products }  = this.state;
    const index = products.indexOf(product);

    if (products[index].Qty === 0){
        return;
    }

    // products[index].Qty -= 1;
    // this.setState({
    //     products         //:products
    // })

    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
      .update({
        Qty: products[index].Qty - 1
      })
      .then(() => {
        console.log('update decreased successfully');
      })
      .catch((error) => {
        console.log('Error', error);
      })
  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id);
    // this.setState({
    //   products: items
    // })

    const docRef = this.db.collection('products').doc(id);
    docRef
      .delete()
      .then(() => {
        console.log('update deleted successfully');
      })
      .catch((error) => {
        console.log('Error', error);
      })
  }

  getCartCount  = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.Qty;
    })
    
    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;
    products.map((product) => {
      if (product.Qty > 0){
        cartTotal = cartTotal + product.Qty * product.price;
      }
      return "";
    });
    return cartTotal;
  }

  addProduct = () => {
    this.db
      .collection('products')
      .add({
        img: "",
        price: 400,
        Qty: 1,
        title: "Earphone"
      })
      .then((docRef) => {
        console.log('Product have been added', docRef);
      })
      .catch((error) => {
        console.log('Error: ', error);
      })
  }

  render () {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count = {this.getCartCount()}></Navbar>
        <button onClick={this.addProduct} style = {{padding: 20, fontSize: 20, cursor: "pointer", borderRadius: '7%' }}> Add a product </button>
        <Cart
          products = {products}
          onIncreaseQuantity = {this.handleIncreaseQuantity}
          onDecreaseQuantity = {this.handleDecreaseQuantity}
          onDeleteProduct = {this.handleDeleteProduct}>
        </Cart>
        {loading && <h1> LOADING PRODUCTS .... </h1>}
        <div style={{padding: 10, fontSize: 30, textAlign:"end"}}> TOTAL : {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;


