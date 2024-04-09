import { useEffect, useState } from "react";
import axios from "axios";
import StockTableData from "../components/StockTableData";
import TitleHome from "../components/TitleHome";
import "../styles/stockTableData.css";

export default function LayoutHome() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [stockData, setStockData] = useState([]);

  const stockExample = [
    // Esto
    {
      symbol: "BAC-PL",
      companyName: "Bank of America Corporation",
      marketCap: 9519430436381,
      sector: "Financial Services",
      industry: "Banks—Diversified",
      beta: 1.399232,
      price: 1181.25,
      lastAnnualDividend: 72.5,
      volume: 2817,
      exchange: "New York Stock Exchange",
      exchangeShortName: "NYSE",
      country: "US",
      isEtf: false,
      isActivelyTrading: true,
    },
    {
      symbol: "BAC-PL",
      companyName: "Bank of America Corporation",
      marketCap: 9519430436381,
      sector: "Financial Services",
      industry: "Banks—Diversified",
      beta: 1.399232,
      price: 1181.25,
      lastAnnualDividend: 72.5,
      volume: 2817,
      exchange: "New York Stock Exchange",
      exchangeShortName: "NYSE",
      country: "US",
      isEtf: false,
      isActivelyTrading: true,
    },
    {
      symbol: "BAC-PL",
      companyName: "Bank of America Corporation",
      marketCap: 9519430436381,
      sector: "Financial Services",
      industry: "Banks—Diversified",
      beta: 1.399232,
      price: 1181.25,
      lastAnnualDividend: 72.5,
      volume: 2817,
      exchange: "New York Stock Exchange",
      exchangeShortName: "NYSE",
      country: "US",
      isEtf: false,
      isActivelyTrading: true,
    },
  ];

  useEffect(() => {
    async function fetchStockData() {
      try {
        const ApiURL =
          "https://financialmodelingprep.com/api/v3/stock-screener?apikey=" +
          apiKey;
        const response = await axios.get(ApiURL);
        setStockData(response.data);
      } catch (error) {
        console.log("Error al traer stocks");
      }
    }

    fetchStockData();
    //setStockData(stockExample); // Esto
  }, [apiKey]);

  return (
    <>
      <TitleHome />
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
              <th className="border-0 text-center font-weight-bold">
                30D Chart
              </th>
            </tr>
          </thead>
          <tbody>
            {stockData
              .filter((stock) => stock.exchange != "NASDAQ")
              .slice(0, 10)
              .map((stock, index) => (
                <StockTableData key={index} stock={stock} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
