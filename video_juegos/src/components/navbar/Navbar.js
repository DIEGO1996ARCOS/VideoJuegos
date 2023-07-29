import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faGamepad,
    faGenderless,
  } from "@fortawesome/free-solid-svg-icons";
import {
    NavItem, NavLink, Nav, Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand, } from "reactstrap";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Consolas from "../Consolas";
import Generos from "../Generos";
import VideoJuegos from "../VideoJuegos";
import Home from "../Home";

const NavBar = () => {

    return(
        <Router>
            <Navbar color="info"  expand="lg">
                <NavbarBrand className="mr-auto">Video Juegos</NavbarBrand>
                <NavbarToggler className="mr-2" />
                <Collapse isOpen={true}>
                    <Nav navbar>
                        <NavItem>
                            <NavLink as={Link} href="/">
                                <FontAwesomeIcon icon={faGenderless} className="mr-2" />
                                Inicio
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink as={Link} href="/consolas">
                                <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                                Consolas
                            </NavLink>
                        </NavItem>
       
                        <NavItem>
                            <NavLink tag={Link} to={"/generos"}>
                                <FontAwesomeIcon icon={faGenderless} className="mr-2" />
                                G&#233;nero
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to={"/videojuegos"}>
                                <FontAwesomeIcon icon={faGamepad} className="mr-2" />
                                Video Juegos
                            </NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                    
                </Navbar>

            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/consolas" element={<Consolas />} />
                    <Route path="/generos" element={<Generos />} />
                    <Route path="/videojuegos" element={<VideoJuegos />} />
                </Routes>
                
            </div>
            
       
        </Router>
  
        
    )
}

export default NavBar;