import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/componentToPrint';
import { useReactToPrint } from 'react-to-print';

const POSPage = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,

  }

  // console.log(products.products);

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const result = await axios.get('https://bilal-shafeeq.github.io/api/products.json')
      setProducts(await result.data.products);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false)
  }


  const addProductCart = async (product) => {
    // console.log(product);
    let findProductInCart = await cart.find(i => {
      return i.id === product.id
    })

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if (cartItem.id == product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem)
        } else {
          newCart.push(cartItem)
        }
      })

      setCart(newCart)
      toast(`Added ${newItem.name} to cart`, toastOptions)

    } else {
      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct])
      toast(`Added ${product.name} to cart`, toastOptions)


    }
  }


  useEffect(() => {
    fetchProducts()
  }, [])


  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount)
    })
    setTotalAmount(newTotalAmount)
  }, [cart])


  const removeProduct = async (product) => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id)
    setCart(newCart)
  }

  const componentRef = useRef()

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint()
  }


  return (
    <MainLayout>
      <div className='row'>
        <div className='col-lg-8'>
          {isLoading ?
            <div class="spinner-border " style={{ color: "rgba(2, 85, 162)", margin: "40%", width: "6rem", height: "6rem" }} role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            :
            <div className='row'>
              {products.map((item, index) =>
                <div key={index} className='col-lg-4'>
                  <div className='pos-item px-3 text-center border mb-4' style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }} onClick={() => addProductCart(item)}>
                    <p>{item.name}</p>
                    <img src={item.image} alt={item.name} className='img-fluid' />
                    <p>Rs: {item.price}</p>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
        <div className='col-md-4'>
          <div style={{ display: 'none' }}>
            <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
          </div>
          <div className='table-responsive bg-dark'>
            <table className='table table-responsive table-dark table-hover'>
              <thead>
                <tr>
                  <d>#</d>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Qty</td>
                  <td>Total</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {cart ? cart.map((cartProduct, index) => <tr key={index}>
                  <td>{cartProduct.id}</td>
                  <td>{cartProduct.name}</td>
                  <td>{cartProduct.price}</td>
                  <td>{cartProduct.quantity}</td>
                  <td>{cartProduct.totalAmount}</td>
                  <td>
                    <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                  </td>
                </tr>)
                  : 'No Item in Cart'}
              </tbody>
            </table>
            <h2 className='px-2 text-white'>Total Amount: Rs: {totalAmount}</h2>
          </div>

          <div className='mt-3'>
            {
              totalAmount !== 0 ? <div>
                <button className='btn btn-primary mb-3' onClick={handlePrint}>
                  Pay Now
                </button>
              </div> : <h5>Please add a product to the cart</h5>
            }
          </div>


        </div>
      </div>
    </MainLayout>
  )
}

export default POSPage