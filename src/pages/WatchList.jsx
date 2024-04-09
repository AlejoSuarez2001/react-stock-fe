import "../styles/dashboard.css";
import Footer from "../layouts/Footer";
import Nav from "../layouts/Nav";
import ViewWidgetBar from "../layouts/ViewWidgetBar";

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
