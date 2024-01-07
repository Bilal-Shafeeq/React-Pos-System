// https://www.npmjs.com/package/react-to-print
import React from 'react'
import logo from '../assets/logo.png';

export const ComponentToPrint = React.forwardRef((props, ref) => {

    const { cart, totalAmount } = props;
    return (
        <div ref={ref} className='p-5'>
            <center>
                <img src={logo} alt="NexusBerry"/>
                <h2>NexusBerry Mart</h2>
                <p>Contact : 0312345678 | Faisal Town, Lahore</p>
            </center>
            <table className='table'>
                <thead>
                    <tr>
                        <d>#</d>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Qty</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    {cart ? cart.map((cartProduct, index) => <tr key={index}>
                        <td>{cartProduct.id}</td>
                        <td>{cartProduct.name}</td>
                        <td>{cartProduct.price}</td>
                        <td>{cartProduct.quantity}</td>
                        <td>{cartProduct.totalAmount}</td>

                    </tr>)
                        : ''}
                </tbody>
            </table>
            <h2 className='px-2'>Total Amount: Rs: {totalAmount}</h2>
        </div>
    );
});