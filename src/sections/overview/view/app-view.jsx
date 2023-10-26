import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import { UserView } from 'src/sections/user/view';

import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppConversionRates from '../app-conversion-rates';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function AppView() {

  const total_time = (Date.now()/1000).toFixed(0) - 1698281007 //1698314400
  const prod_piece = total_time * 4
  const defected= Number((total_time / 60).toFixed(0))
  const complaiant=prod_piece - defected
  const downtime= Number((total_time / 60).toFixed(0)) 
  const availability= ((total_time - downtime)/total_time).toFixed(1)
  const target= prod_piece + Number((total_time / 60).toFixed(0)) 
  const performance= ((target - prod_piece)/target).toFixed(1)
  const quality= ((prod_piece - defected)/prod_piece).toFixed(1)

  const [variables, setVariables] = useState({  })
  const [seed, setSeed] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setSeed(seed + 1)
    }, 1000)
  })

  useEffect(() => { 
   const intervalId = setInterval(() => {
    const copy = {
      total_time: (Date.now()/1000).toFixed(0) - 1698281007, // 1698314400,
    prod_piece: variables.total_time * 4,
    defected: Number((variables.total_time / 60).toFixed(0)),
    complaiant: variables.prod_piece - variables.defected,
    downtime: Number((variables.total_time / 60).toFixed(0)), 
    availability: ((variables.total_time - variables.downtime)/variables.total_time).toFixed(1),
    target: variables.prod_piece + Number((variables.total_time / 60).toFixed(0)), 
    performance: ((variables.target - variables.prod_piece)/variables.target).toFixed(1),
    quality: ((variables.prod_piece - variables.defected)/variables.prod_piece).toFixed(1)
  }
  setVariables(copy)
}, 1000)
    
    
    return () => clearInterval(intervalId);
  }, [variables.defected, variables.downtime, variables.prod_piece, variables.target, variables.total_time])

    
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Pigeons are spying 👀
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Piece produced"
            total={variables.prod_piece}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="% Availability"
            total="87%"
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="% Performance"
            total="98%"
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="% Quality"
            total="78%"
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
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
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 0],
                },
                {
                  name: 'Total',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 0],
                },
                {
                  name: 'Compliant',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 0],
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
                { label: 'Defected', value: 4344 },
                { label: 'Ok', value: 5435 },
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
            title="Productivity"
            list={[
              {
                name: 'Count',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Target',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Performance',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
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
            list={[...Array(3)].map((_, index) => ({
              id: faker.string.uuid(),
              title: ['Batch X', 'Batch Y', 'Batch Z'][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
