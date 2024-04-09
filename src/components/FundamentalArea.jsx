import "../styles/fundamentalArea.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FundamentalArea(props) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const symbol = props.symbol;
  const [stockFundamental, setStockFundamental] = useState([]);

  useEffect(() => {
    async function fetchStockData() {
      try {
        const ApiURL =
          "https://financialmodelingprep.com/api/v3/profile/" +
          symbol +
          "?apikey=" +
          apiKey;
        const response = await axios.get(ApiURL);
        setStockFundamental(response.data[0]);
        console.log(stockFundamental);
      } catch (error) {
        console.log("Error al traer los datos fundamentales del symbol");
      }
    }

    fetchStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, symbol]);

  return (
    <div className="fundamentalArea col-3 p-4">
      <h4 className="text-center mb-2">Fundamental Information</h4>
      <p>{stockFundamental.ceo}</p>
    </div>
  );
}
