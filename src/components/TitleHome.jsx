import "../styles/titleHome.css";

export default function TitleHome() {
  return (
    <>
      <div className="titleHomeContainer px-4">
        <div className="container-fluid d-flex align-items-center justify-content-center">
          <h1 className="title text-center">
            Today's Nasdaq Stocks Prices Orders by{" "}
            <p className="title text-center" style={{ color: "#7897f4" }}>
              Market Cap
            </p>
          </h1>
        </div>
        <p className="text-center my-3">
          NASDAQ is the second largest stock market and electronic, automated
          stock exchange in the United States.
        </p>
      </div>
    </>
  );
}
