import Lottie from "lottie-react";
import LoadingArrow from "../assets/LoadingArrow.json";
import { Box } from "@mui/material";
import { responsive } from "../theme";
import { useMediaQuery } from "@mui/material";
import TitleHome from "../components/TitleHome";
import Table from "../components/Table";

export default function LayoutHome() {
  return (
    <>
      <TitleHome />
      <Table />
    </>
  );
}
