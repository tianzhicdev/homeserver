import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useState } from 'react';

const TimeSeriesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/hodls')
      .then(response => response.json())
      .then(hodls => {
        const sortedHodls = hodls.sort((a, b) => new Date(a.date) - new Date(b.date));
        const formattedData = [
          {
            id: 'hodls data',
            data: sortedHodls.map(hodl => ({
              x: hodl.date,
              y: hodl.hodls,
            })),
          },
        ];
        setData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
          },
        ]}
      />
    </div>
  );
};

export default TimeSeriesChart;
