// Layout.js
import Header from "../components/Header"
import Footer from "../components/Footer"
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './DefaultLayout.css';

function DefaultLayout() {
  return (
    <div>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default DefaultLayout;
