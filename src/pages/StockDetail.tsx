import Footer from "../layouts/Footer";
import Nav from "../layouts/Nav";
import ViewWidgetBar from "../layouts/ViewWidgetBar";
import LayoutStockDetail from "../layouts/LayoutStockDetail";
import React from "react";

export default function StockDetail() {
  return (
    <>
      <ViewWidgetBar />
      <Nav />
      <LayoutStockDetail />
      <Footer />
    </>
  );
}
