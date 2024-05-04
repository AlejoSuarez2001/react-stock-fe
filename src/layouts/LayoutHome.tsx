import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import StockTableData from "../components/StockTableData";
import TitleHome from "../components/TitleHome";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/stockTableData.css";

export default function LayoutHome() {
  interface IStock {
    beta: number;
    companyName: string;
    country: string;
    exchange: string;
    exchangeShortName: string;
    industry: string;
    isActivelyTrading: boolean;
    isEtf: boolean;
    isFund: boolean;
    lastAnnualDividend: number;
    marketCap: number;
    price: number;
    sector: string;
    volumes: number;
    symbol: string;
    volume: number;
  }

  const url = `https://financialmodelingprep.com/api/v3/stock-screener?apikey=${process.env.REACT_APP_API_KEY}`;
  const [stockData, setStockData] = useState<IStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStockData(url: string) {
      try {
        const response = await axios.get(url);
        const data: IStock[] = response.data;
        setStockData(data);
        setLoading(false);
      } catch (error) {
        console.error("Some Error Occured:", error);
        setError("Error fetching data");
        setLoading(false);
      }
      //setStockData(stockExample); // Esto
    }
    fetchStockData(url);
  }, []);

  return (
    <>
      <TitleHome />
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="container-fluid w-75">
          <table className="table">
            <thead>
              <tr className="tableHeader">
                <th className="border-0 text-center font-weight-bold">
                  Symbol
                </th>
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
                .slice(0, 3)
                .map((stock, index) => (
                  <StockTableData key={index} stock={stock} />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
