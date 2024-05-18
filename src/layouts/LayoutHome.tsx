import Lottie from "lottie-react";
import LoadingArrow from "../assets/LoadingArrow.json";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import TitleHome from "../components/TitleHome";
import StockTable from "../components/StockTable";
import StickyHeadTable from "../components/example";

export default function LayoutHome() {
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
      <TitleHome />
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
        <>
          <StockTable stockData={stockData} />
        </>
      )}
    </>
  );
}
