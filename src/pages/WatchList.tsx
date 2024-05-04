import Footer from "../layouts/Footer";
import Nav from "../layouts/Nav";
import ViewWidgetBar from "../layouts/ViewWidgetBar";
import React from "react";
import "../styles/dashboard.css";

export default function WatchList() {
  return (
    <>
      <ViewWidgetBar />
      <Nav />
      <div className="container my-5 text-center">Coming Soon</div>
      <Footer />
    </>
  );
}
