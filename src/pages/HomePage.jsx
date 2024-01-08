import React from 'react'
import { NavLink } from 'react-router-dom'
import MainLayout from './../layouts/MainLayout';
import logo from '../assets/bilal.jpg';

const HomePage = () => {
    return (
        <MainLayout>
            <div class="container">
                <div class="row bg-light p-5 mt-4 rounded-3">
                    <div class="col-md-9" >
                        <h1>Welcome to the simple POS for small business</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus consequatur nisi reiciendis totam.</p>
                        <p>If you have an issue, call 123-456-789 anytimes</p>
                        <NavLink to="/pos" className='btn btn-primary mb-5 mt-3'>Click here to sell products</NavLink>
                    </div>
                    <div className="col-md-3 d-flex flex-column align-items-center justify-content-center">
                        <img src={logo} style={{ maxWidth: "100%", height: "auto" }} className="img-fluid rounded-circle mb-3" />
                        <h6>Developed by <span style={{ fontWeight: "bold" }}>BILAL 😎</span></h6>
                    </div>
                </div>
            </div>

        </MainLayout>
    )
}

export default HomePage