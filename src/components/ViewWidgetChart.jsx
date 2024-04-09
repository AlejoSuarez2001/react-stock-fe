import React, { useEffect, useRef } from "react";

export default function ViewWidgetChart(props) {
  const container = useRef();
  const symbol = props.symbol;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
          {
            "autosize": true,
            "symbol": "NASDAQ:${symbol}",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "es",
            "enable_publishing": false,
            "allow_symbol_change": false,
            "support_host": "https://www.tradingview.com"
          }`;
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div style={{ height: "600px", width: "80%", margin: "auto" }}>
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: "500px", width: "80%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        ></div>
      </div>
    </div>
  );
}
