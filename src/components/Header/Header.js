import React, { useState, useEffect } from "react";
// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  Nav,
  Container,
  UncontrolledTooltip,
  Media
} from "reactstrap";

import {ReactComponent as Logo} from '../../assets/logo/tasty.svg';
import { MdAddShoppingCart } from 'react-icons/md';
import './header.css'

function Header({itemsInCart, setModalOpen}) {
  return (
    <>
      <Navbar className={"fixed-top"} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <div id="navbar-brand" className="main-logo">
              <Logo />
            </div>
          </div>
          <div className="shopping-cart"><MdAddShoppingCart size={30} fill={'#FFF'} onClick={() => setModalOpen(true)}/><span className="cart-count">{itemsInCart.length}</span></div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
