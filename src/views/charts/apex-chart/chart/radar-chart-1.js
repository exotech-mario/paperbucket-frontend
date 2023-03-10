const chartData = {
  height: 350,
  type: 'radar',
  options: {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColor: '#f3f6ff',
          fill: {
            colors: ['#f3f6ff', '#fff']
          }
        }
      }
    },
    title: {
      text: 'Radar with Polygon Fill'
    },
    colors: ['#FF5370'],
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColor: '#FF5370',
      strokeWidth: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 0.7,
        stops: [40, 100]
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        }
      }
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: function (val, i) {
          if (i % 2 === 0) {
            return val;
          } else {
            return '';
          }
        }
      }
    }
  },
  series: [
    {
      name: 'Series 1',
      data: [20, 100, 40, 30, 50, 80, 33]
    }
  ]
};
export default chartData;
