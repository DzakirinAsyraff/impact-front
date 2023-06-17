import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  Typography,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { socket } from "../../socket";

interface IProps {
  name: string;
  series: [
    {
      name: string;
      data: number[];
      type: string;
      categories: string[];
    }
  ];
}

const Dashboard = () => {
  const [period, setPeriod] = useState<number>(7);
  const [products, setProducts] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [value, setValue] = useState<number>(0);
  const [state, setState] = useState<any>({
    series: [
      {
        name: "Daily Sales per Stock",
        type: "line",
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
      },
      {
        name: "Stock Level",
        type: "line",
        data: [3, 2, 8, 20, 7, 30, 10, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
      },
      {
        name: "Safety Stock",
        type: "area",
        data: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 7, 7, 5, 5, 5, 2, 5, 5, 1],
      },
      {
        name: "Exponential Moving Average of Daily Demand",
        data: [], // Placeholder for SMA data
        type: "line",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4,
            },
            stroke: {
              color: "#0D47A1",
              opacity: 0.4,
              width: 1,
            },
          },
        },
      },
      //   forecastDataPoints: {
      //     count: 7,
      //   },
      annotations: {
        yaxis: [
          {
            y: 6,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396",
              },
              text: "Reorder Point",
            },
          },
        ],
        points: [
          {
            x: new Date("10/11/2000").getTime(),
            y: 12,
            marker: {
              size: 8,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
              },

              text: "Last Reorder Point",
            },
          },
        ],
      },
      stroke: {
        width: 3,
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "1/1/2000",
          "1/2/2000",
          "1/3/2000",
          "1/4/2000",
          "1/5/2000",
          "1/6/2000",
          "1/7/2000",
          "1/8/2000",
          "1/9/2000",
          "1/10/2000",
          "1/11/2000",
          "1/12/2000",
          "1/13/2000",
          "1/14/2000",
          "1/15/2000",
          "1/16/2000",
          "1/17/2000",
          "1/18/2000",
        ],
        tickAmount: 10,
        title: {
          text: "Date",
        },
        labels: {
          formatter: function (value: any, timestamp: any, opts: any) {
            return opts.dateFormatter(new Date(timestamp), "dd MMM");
          },
        },
      },
      title: {
        text: "Stock of product A",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      fill: {
        type: "solid",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      yaxis: {
        min: 0,
        title: {
          text: "Stock (unit)",
        },
        labels: {
          formatter: function (value: any) {
            return value.toFixed(0);
          },
        },
      },
    },
  });

  useEffect(() => {
    socket.on("receiveProducts", (data: any) => {
      setProducts(data);
    });
    socket.on("receiveIDProducts", (data: any) => {
      setList(data);
      setupChartProduct();
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("getIDProducts");
  }, []);

  function setupChartProduct() {
    if (products.length > 0) {
      console.log(products[value]);
      setState({
        series: [
          {
            name: "Daily Sales per Stock",
            type: "line",
            data: products[value].sales.dailySales.map(
              (sale: any) => sale.quantity
            ),
            categories: products[value].sales.dailySales.map(
              (sale: any) => sale.date
            ),
          },
          {
            name: "Stock Level",
            type: "line",
            data: products[value].stock.history.map(
              (stock: any) => stock.quantity
            ),
            categories: products[value].stock.history.map(
              (stock: any) => stock.date
            ),
          },
          {
            name: "Safety Stock",
            type: "area",
            data: products[value].stock.history.map(
              (stock: any) => stock.safetyStock
            ),
            categories: products[value].stock.history.map(
              (stock: any) => stock.date
            ),
          },
          {
            name: "Exponential Moving Average of Daily Demand",
            data: [], // Placeholder for SMA data
            type: "line",
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: true,
              type: "x",
              autoScaleYaxis: true,
              zoomedArea: {
                fill: {
                  color: "#90CAF9",
                  opacity: 0.4,
                },
                stroke: {
                  color: "#0D47A1",
                  opacity: 0.4,
                  width: 1,
                },
              },
            },
          },
          //   forecastDataPoints: {
          //     count: 7,
          //   },
          annotations: {
            yaxis: [
              {
                y: products[value].stock.history[0].reorderPoint,
                borderColor: "#00E396",
                label: {
                  borderColor: "#00E396",
                  style: {
                    color: "#fff",
                    background: "#00E396",
                  },
                  text: "Reorder Point",
                },
              },
            ],
          },
          stroke: {
            width: 3,
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: products[value].stock.history.map(
              (stock: any) => stock.date
            ),
            tickAmount: 10,
            title: {
              text: "Date",
            },
            labels: {
              formatter: function (value: any, timestamp: any, opts: any) {
                return opts.dateFormatter(new Date(timestamp), "dd MMM");
              },
            },
          },
          title: {
            text: "Stock of product A",
            align: "left",
            style: {
              fontSize: "16px",
              color: "#666",
            },
          },
          fill: {
            type: "solid",
            gradient: {
              shade: "dark",
              gradientToColors: ["#FDD835"],
              shadeIntensity: 1,
              type: "horizontal",
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          },
          yaxis: {
            min: 0,
            title: {
              text: "Stock (unit)",
            },
            labels: {
              formatter: function (value: any) {
                return value.toFixed(0);
              },
            },
          },
        },
      });
    }
  }

  function updatePeriod(event: any) {
    setPeriod(event.target.value);
  }

  useEffect(() => {
    // Calculate EMA data
    const seriesData = state.series[0].data;
    const emaData = calculateEMA(seriesData);

    // Update the state with EMA data
    setState((prevState: any) => ({
      ...prevState,
      series: [
        prevState.series[0],
        prevState.series[1],
        prevState.series[2],
        {
          ...prevState.series[3],
          data: emaData,
        },
      ],
    }));
  }, [period]);

  const calculateEMA = (data: number[]) => {
    const emaData: any[] = [];
    const multiplier = 2 / (+period + 1);
    let ema = data[0];

    emaData.push(ema);

    for (let i = 1; i < data.length; i++) {
      ema = (data[i] - ema) * multiplier + ema;
      emaData.push(ema);
    }
    return emaData;
  };

  function handleChange(event: any) {
    setValue(event.target.value);
    setupChartProduct();
  }

  return list ? (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              height={350}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 5 }}>
            <Typography variant="h6">Product</Typography>
            <Select
              native
              value={value}
              //   onChange={handleChange}
              inputProps={{
                name: "age",
              }}
            >
              {list.map((product) => (
                <option value={product.id}>{product.name}</option>
              ))}
            </Select>
          </Paper>

          <Paper sx={{ p: 5 }}>
            <Typography variant="h6">EMA</Typography>
            <ButtonGroup>
              <Button
                value={3}
                variant={+period === 3 ? "contained" : "outlined"}
                onClick={updatePeriod}
              >
                3
              </Button>
              <Button
                value={7}
                onClick={updatePeriod}
                variant={+period === 7 ? "contained" : "outlined"}
              >
                7
              </Button>
              <Button
                value={30}
                onClick={updatePeriod}
                variant={+period === 30 ? "contained" : "outlined"}
              >
                30
              </Button>
            </ButtonGroup>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">Analysis Stock</Typography>
            <Grid container sx={{ p: 5 }} spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6">Stock Level</Typography>
                  <Typography variant="h6">5</Typography>
                  <Typography variant="subtitle1" color="red">
                    Too Low and the safety stock is not enough
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6">Stockout</Typography>
                  <Typography variant="h6" color="yellow">
                    5% Chance
                  </Typography>
                  <Typography variant="subtitle1">Need to reorder</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6">Stock Category</Typography>
                  <Typography variant="h6">B</Typography>
                  <Typography variant="subtitle1">
                    Expected new model
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6">Stockout</Typography>
                  <Typography variant="h6">1 time in 3 months</Typography>
                  <Typography variant="subtitle1">Good</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6">Miss best reorder date</Typography>
                  <Typography variant="h6">3 times</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6">Late reorder date</Typography>
                  <Typography variant="h6">2 times</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <div></div>
  );
};

export default Dashboard;
