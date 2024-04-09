import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ViewWidgetChart from "../components/ViewWidgetChart";
import FundamentalArea from "../components/FundamentalArea";
import axios from "axios";
import "../styles/layoutStockDetail.css";

export default function LayoutStockDetail() {
  const { symbol } = useParams();
  const apiKey = process.env.REACT_APP_API_KEY;
  const [stockDetails, setStockDetails] = useState([]);

  useEffect(() => {
    async function fetchStockData() {
      try {
        const ApiURL =
          "https://financialmodelingprep.com/api/v3/quote/" +
          symbol +
          "?apikey=" +
          apiKey;
        const response = await axios.get(ApiURL);
        setStockDetails(response.data[0]);
        console.log(stockDetails);
      } catch (error) {
        console.log("Error al traer los detalles del symbol");
      }
    }

    fetchStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  return (
    <>
      <div>
        <h2 className="title-symbol text-center m-4"> 
          {stockDetails.symbol} - {stockDetails.name}
        </h2>
      </div>
      <div className="chartContainer container-fluid d-flex p-0">
        <div className="TechniqueArea col-3 p-4">
          <div>
            <h4 className="text-center mb-2">Technique Information</h4>
            <p className="price">${stockDetails.price}</p>
          </div>
        </div>
        <ViewWidgetChart className="col-6" symbol={symbol} />
        <FundamentalArea symbol={symbol} />
      </div>
    </>
  );
}
