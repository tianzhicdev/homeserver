import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useState } from 'react';

const TimeSeriesChart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('http://marcus-mini.is-very-nice.org:3001/hodls')
      .then(response => response.json())
      .then(hodls => {
        const sortedHodls = hodls.sort((a, b) => new Date(a.date) - new Date(b.date));
        const now = new Date();
        let filteredHodls;

        if (filter === '6months') {
          const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
          filteredHodls = sortedHodls.filter(hodl => new Date(hodl.date) >= sixMonthsAgo);
        } else if (filter === '1year') {
          const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
          filteredHodls = sortedHodls.filter(hodl => new Date(hodl.date) >= oneYearAgo);
        } else {
          filteredHodls = sortedHodls;
        }

        const formattedData = [
          {
            id: 'hodls data',
            data: filteredHodls.map(hodl => ({
              x: new Date(hodl.date),
              y: hodl.hodls,
            })),
          },
        ];
        setData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [filter]);

  return (
    <div style={{ height: 400 }}>
      <div>
        <button onClick={() => setFilter('6months')}>Last 6 Months</button>
        <button onClick={() => setFilter('1year')}>Last Year</button>
        <button onClick={() => setFilter('all')}>All</button>
      </div>
      <ResponsiveLine
        data={data}
        enablePoints={false}
        enableGridX={false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{                     
          type: "time",
          format: "%Y-%m-%d",
          precision: "day" }}
        xFormat= "time:%d/%m/%Y"
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
          legendOffset: 36,
          legendPosition: 'middle',                    
          format: "%d/%m/%Y",
          tickRotation: -38,
          tickValues: data[0]?.data.length > 10 ? 10 : data[0]?.data.length, 
          legendOffset: -12
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '# of Hodlers',
          legendOffset: -60,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};

export default TimeSeriesChart;
