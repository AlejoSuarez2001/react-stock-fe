import Footer from "../layouts/Footer";
import Nav from "../layouts/Nav";
import ViewWidgetBar from "../layouts/ViewWidgetBar";
import LayoutHome from "../layouts/LayoutHome";
import React from "react";

export default function Home() {
  return (
    <>
      <ViewWidgetBar />
      <Nav />
      <LayoutHome />
      <Footer />
    </>
  );
}
