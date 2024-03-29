import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';

const Home = () => {
    const [search, setSearch] = useState("");
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);


    const loadData = async () => {
        let response = await fetch("https://foody-back.onrender.com/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json();
        setfoodItem(response[0]);
        setfoodCat(response[1]);

        //console.log(response[0],response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div> <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center" >
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/100×100/?burger" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/100×100/?pastry" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/100×100/?pizza" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
      
                {
                 
                         foodCat && foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className="fs-3 m-3">
                                        {data.categoryname}
                                    </div>
                                    <hr />

                                    {    foodItem && foodItem.filter((item) => (item.categoryname === data.categoryname) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                        <Card foodItem={filterItems}
                                                            options={filterItems.options[0]}
                                                        // imgSrc={filterItems.img}
                                                        ></Card>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            )
                        })
                        
                }

            </div>

            <hr />

            <div><Footer /></div>
        </>

    )
}

export default Home
