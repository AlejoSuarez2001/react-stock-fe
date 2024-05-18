import React, { useState } from "react";
import { Box, Table, TableRow, TableCell } from "@mui/material";
import StockTableRow from "./StockTableRow";
import "../styles/stockTableData.css";
import { responsive } from "../theme";
import { useMediaQuery } from "@mui/material";

const styles = {
  table: {
    color: "rgb(255, 255, 255)",
  },
  tableHeader: {
    borderBottom: "1px #323546 solid",
    fontSize: "16px",
  },
  columnHeader: {
    border: "0",
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: "20px",
  } as React.CSSProperties,
};

interface ISortConfig {
  key: string;
  direction: string;
}

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

type PropsTable = {
  stockData: IStock[];
};

export default function StockTable({ stockData }: PropsTable) {
  const [sortConfig, setSortConfig] = useState<ISortConfig>({
    key: "",
    direction: "",
  });
  const matches = useMediaQuery(responsive);

  const sortedData = [...stockData].sort((a, b) => {
    // Validations
    if (!sortConfig.key || !(sortConfig.key in a) || !(sortConfig.key in b))
      return 0;

    const keyA =
      typeof a[sortConfig.key as keyof IStock] === "number"
        ? a[sortConfig.key as keyof IStock]
        : a[sortConfig.key as keyof IStock].toString().toLowerCase();
    const keyB =
      typeof b[sortConfig.key as keyof IStock] === "number"
        ? b[sortConfig.key as keyof IStock]
        : b[sortConfig.key as keyof IStock].toString().toLowerCase();

    if (keyA < keyB) return sortConfig.direction === "ascending" ? -1 : 1;
    if (keyA > keyB) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig.key === key &&
      sortConfig.direction &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <Box marginX={matches ? "10%" : "0px"}>
        <Table style={styles.table}>
          <TableRow style={styles.tableHeader}>
            <TableCell
              style={styles.columnHeader}
              onClick={() => requestSort("symbol")}
            >
              Symbol
            </TableCell>
            <TableCell
              style={styles.columnHeader}
              onClick={() => requestSort("companyName")}
            >
              Company Name
            </TableCell>
            <TableCell
              style={styles.columnHeader}
              onClick={() => requestSort("price")}
            >
              Price
            </TableCell>
            <TableCell style={styles.columnHeader}>1D %</TableCell>
            <TableCell style={styles.columnHeader}>1W %</TableCell>
            <TableCell style={styles.columnHeader}>1Y %</TableCell>
            <TableCell
              style={styles.columnHeader}
              onClick={() => requestSort("marketCap")}
            >
              Market Cap
            </TableCell>
            <TableCell style={styles.columnHeader}>30D Chart</TableCell>
          </TableRow>
          <tbody>
            {sortedData
              .filter((stock) => stock.exchange !== "NASDAQ")
              .slice(0, 3)
              .map((stock, index) => (
                <StockTableRow key={index} stock={stock} />
              ))}
          </tbody>
        </Table>
      </Box>
    </>
  );
}
