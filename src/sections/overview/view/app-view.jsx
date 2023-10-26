import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { UserView } from 'src/sections/user/view';

import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [variables, setVariables] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      const copy = {
        total_time: (Date.now() / 1000).toFixed(0) - 1698281007, // 1698314400,
        prod_piece: variables.total_time * 4,
        defected: Number((variables.total_time / 2).toFixed(0)),
        complaiant: variables.prod_piece - variables.defected,
        downtime: Number((variables.total_time / 60).toFixed(0)),
        availability:
          ((variables.total_time - variables.downtime) / variables.total_time).toFixed(1) * 100,
        target: variables.prod_piece + Number((variables.total_time / 60).toFixed(0)),
        performance: (variables.prod_piece / variables.target).toFixed(1) * 100,
        quality:
          ((variables.prod_piece - variables.defected) / variables.prod_piece).toFixed(1) * 100,
        energy: (1000 + Math.cos(variables.total_time % 100) * 100).toFixed(0),
      };
      setVariables(copy);
    }, 1000);

    console.log(variables);

    return () => clearInterval(intervalId);
  });

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Pigeons are spying 👀
      </Typography>

      {variables.prod_piece > 1 ? (
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Piece produced"
              total={variables.prod_piece}
              color="success"
              icon={<img alt="icon" src="/assets/icons/timeline.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="% Availability"
              total={`${variables.availability} %`}
              color="info"
              icon={<img alt="icon" src="/assets/icons/24-hours.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="% Performance"
              total={`${variables.performance} %`}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/growth.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="% Quality"
              total={`${variables.quality} %`}
              color="error"
              icon={<img alt="icon" src="/assets/icons/quality-assurance.png" />}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Hourly production overview"
              subheader="(+4%) than last month"
              chart={{
                labels: [
                  '2023-03-26T01:00:00Z',
                  '2023-03-26T02:00:00Z',
                  '2023-03-26T03:00:00Z',
                  '2023-03-26T04:00:00Z',
                  '2023-03-26T05:00:00Z',
                  '2023-03-26T06:00:00Z',
                  '2023-03-26T07:00:00Z',
                  '2023-03-26T08:00:00Z',
                  '2023-03-26T09:00:00Z',
                  '2023-03-26T10:00:00Z',
                  '2023-03-26T11:00:00Z',
                  '2023-03-26T12:00:00Z',
                ],
                series: [
                  {
                    name: 'Defected',
                    type: 'column',
                    fill: 'solid',
                    data: [
                      23000,
                      11000,
                      22000,
                      27000,
                      13000,
                      22000,
                      37000,
                      21000,
                      44000,
                      22000,
                      30000,
                      variables.defected,
                    ],
                  },
                  {
                    name: 'Total',
                    type: 'area',
                    fill: 'gradient',
                    data: [
                      44000,
                      55000,
                      41000,
                      67000,
                      22000,
                      43000,
                      21000,
                      41000,
                      56000,
                      27000,
                      43000,
                      variables.prod_piece,
                    ],
                  },
                  {
                    name: 'Compliant',
                    type: 'line',
                    fill: 'solid',
                    data: [
                      30000,
                      25000,
                      36000,
                      30000,
                      45000,
                      35000,
                      64000,
                      52000,
                      59000,
                      36000,
                      39000,
                      variables.complaiant,
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Quality"
              chart={{
                series: [
                  { label: 'Defected', value: variables.defected },
                  { label: 'Compliant', value: variables.complaiant },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Machine downtime"
              subheader="(-2%) than last month"
              chart={{
                series: [
                  { label: '18 mar', value: 3 },
                  { label: '19 mar', value: 6 },
                  { label: '20 mar', value: 2 },
                  { label: '23 mar', value: 1 },
                  { label: '24 mar', value: 2 },
                  { label: '25 mar ', value: 1 },
                  { label: '26 mar ', value: 0.2 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Production"
              list={[
                {
                  name: 'Count',
                  value: variables.prod_piece,
                  icon: <img alt="icon" src="/assets/icons/counter.png" width={32} />,
                },
                {
                  name: 'Target',
                  value: 115200,
                  icon: <img alt="icon" src="/assets/icons/target.png" width={32} />,
                },
                {
                  name: 'Energy KW/h',
                  value: ` ${fShortenNumber(variables.energy)}`,
                  icon: <img alt="icon" src="/assets/icons/power.png" width={32} />,
                },
                {
                  name: '% to goal',
                  value: ` ${((variables.prod_piece / 115200) * 100).toFixed(2)}%`,
                  icon: <img alt="icon" src="/assets/icons/business-plan.png" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid lg={8} xs={12}>
            <UserView />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Production timeline"
              list={[
                {
                  id: 'order1',
                  title: 'Batch X',
                  type: 'order1',
                  time: '2023-10-23T07:40:24.000Z',
                },
                {
                  id: 'order2',
                  title: 'Batch Y',
                  type: 'order2',
                  time: '2023-05-05T07:40:24.000Z',
                },
                {
                  id: 'order3',
                  title: 'Batch Z',
                  type: 'order3',
                  time: '2022-08-18T07:40:24.000Z',
                },
              ]}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <h1>Loading</h1>
          <h2>wait...</h2>
        </>
      )}
    </Container>
  );
}
