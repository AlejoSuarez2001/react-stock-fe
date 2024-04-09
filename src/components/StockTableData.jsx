import React, { useEffect, useState } from "react";
import "../styles/stockTableData.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LineChart from "./LineChart";

export default function StockTableData({ stock }) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [stockHistory, setStockHistory] = useState([]);
  const [stockPriceHistory, setStockPriceHistory] = useState([]);
  const stockInfo = ["symbol", "companyName", "price"];
  const stockChange = ["1D", "5D", "1M"];
  const navigate = useNavigate();

  const generateRedirect = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [stockDataResponse, priceHistoryResponse] = await Promise.all([
          axios.get(
            `https://financialmodelingprep.com/api/v3/stock-price-change/${stock.symbol}?apikey=${apiKey}`
          ),
          axios.get(
            `https://financialmodelingprep.com/api/v3/historical-price-full/${stock.symbol}?apikey=${apiKey}`
          ),
        ]);
        setStockHistory(stockDataResponse.data);
        setStockPriceHistory(priceHistoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [apiKey, stock.symbol]);

  return (
    <tr
      className="tableRow"
      key={stock.symbol}
      onClick={() => generateRedirect(stock.symbol)}
    >
      {stockInfo.map((info, index) => (
        <td
          key={index}
          className={`tableItem p-4 border-0 font-weight-bold p-2 ${
            info === "companyName" ? "itemCompanyName" : ""
          }`}
        >
          {stock[info]}
        </td>
      ))}

      {stockChange.map((change, index) => (
        <td
          key={index}
          className={`tableItem p-4 border-0 font-weight-bold p-2 ${
            stockHistory.length > 0 && stockHistory[0]?.[change] !== undefined
              ? stockHistory[0][change] > 0
                ? "alAlza"
                : stockHistory[0][change] < 0
                ? "AlaBaja"
                : ""
              : ""
          }`}
        >
          {stockHistory.length > 0 && stockHistory[0]?.[change] !== undefined
            ? stockHistory[0][change].toFixed(2) + " %"
            : ""}
        </td>
      ))}

      <td className={`tableItem p-4 border-0 font-weight-bold p-2`}>
        {stock.marketCap}
      </td>
      <td
        className={`tableItem d-flex justify-content-center p-4 border-0 font-weight-bold p-2`}
      >
        <LineChart stockPriceHistory={stockPriceHistory} />
      </td>
    </tr>
  );
}
