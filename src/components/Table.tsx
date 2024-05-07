import Lottie from "lottie-react";
import LoadingArrow from "../assets/LoadingArrow.json";
import { Box } from "@mui/material";
import { responsive } from "../theme";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import StockTableData from "../components/StockTableData";
import "../styles/stockTableData.css";

export default function Table() {
  interface IStock {
    symbol: string;
    companyName: string;
    marketCap: number;
    sector: string;
    industry: string;
    beta: number;
    price: number;
    lastAnnualDividend: number;
    volume: number;
    exchange: string;
    exchangeShortName: string;
    country: string;
    isEtf: boolean;
    isFund: boolean;
    isActivelyTrading: boolean;
  }

  const url = `https://financialmodelingprep.com/api/v3/stock-screener?apikey=${process.env.REACT_APP_API_KEY}`;
  const [stockData, setStockData] = useState<IStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const matches = useMediaQuery(responsive);

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
    }
    fetchStockData(url);
  }, []);

  return (
    <>
      {loading ? (
        <Box
          style={{
            width: "80px",
            height: "80px",
            margin: "auto",
            marginBlock: "100px",
          }}
        >
          <Lottie animationData={LoadingArrow} />
        </Box>
      ) : (
        <Box marginX={matches ? "10%" : "0px"}>
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
                .slice(0, 1)
                .map((stock, index) => (
                  <StockTableData key={index} stock={stock} />
                ))}
            </tbody>
          </table>
        </Box>
      )}
    </>
  );
}
