import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';
import { Client } from 'pg';

const TimeSeriesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const client = new Client({
        user: 'abc',
        host: 'localhost',
        database: 'bitcoin',
        password: '12345',
        port: 5432,
      });

      try {
        await client.connect();
        const res = await client.query('SELECT date, hodls FROM hodls ORDER BY date ASC');
        const chartData = [
          {
            id: 'hodls data',
            data: res.rows.map(row => ({ x: row.date.toISOString().split('T')[0], y: row.hodls })),
          },
        ];
        setData(chartData);
      } catch (err) {
        console.error('Error fetching data from PostgreSQL:', err);
      } finally {
        await client.end();
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={data}
        // other props
      />
    </div>
  );
};

function TimeSeriesChart() {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Value',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default TimeSeriesChart;
