import React, { useEffect, useState } from "react";
import axios from "axios";
import StockTableData from "../components/StockTableData";
import "../styles/stockTableData.css";

const LayoutHome = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const ApiURL =
          "https://financialmodelingprep.com/api/v3/stock-screener?apikey=" +
          apiKey;
        const response = await axios.get(ApiURL);
        setStockData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [apiKey]);

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div className="container-fluid w-75">
      <table className="table">
        <thead>
          <tr className="tableHeader">
            <th className="border-0 text-center font-weight-bold">Symbol</th>
            <th className="border-0 text-center font-weight-bold">
              Company Name
            </th>
            <th className="border-0 text-center font-weight-bold">Price</th>
            <th className="border-0 text-center font-weight-bold">1D %</th>
            <th className="border-0 text-center font-weight-bold">1W %</th>
            <th className="border-0 text-center font-weight-bold">1Y %</th>
            <th className="border-0 text-center font-weight-bold">
              Market Cap
            </th>
            <th className="border-0 text-center font-weight-bold">30D Chart</th>
          </tr>
        </thead>
        <tbody>
          {stockData
            .slice(0, showMore ? stockData.length : 1)
            .map((stock, index) => (
              <StockTableData key={index} stock={stock} />
            ))}
        </tbody>
      </table>
      {!showMore && (
        <div className="text-center mt-3">
          <button onClick={handleShowMore} className="btn btn-primary">
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
};

export default LayoutHome;
