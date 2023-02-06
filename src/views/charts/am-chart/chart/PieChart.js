import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const PieChart = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new('am-pie-2');

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5percent.PieChart.new(root, {}));

    // Define data
    let data = [
      {
        country: 'Lithuania',
        litres: 201.9
      },
      {
        country: 'Germany',
        litres: 165.8
      },
      {
        country: 'Australia',
        litres: 139.9
      },
      {
        country: 'Austria',
        litres: 128.3
      },
      {
        country: 'UK',
        litres: 99
      },
      {
        country: 'Belgium',
        litres: 60
      }
    ];

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Series',
        valueField: 'litres',
        categoryField: 'country',
        alignLabels: false
      })
    );

    series.data.setAll(data);

    series.labels.template.setAll({
      fontSize: 12,
      text: '{category}',
      textType: 'adjusted',
      radius: 10
    });
    series.slices.template.setAll({
      fillOpacity: 1,
      stroke: am5.color(0xffffff),
      strokeWidth: 2
    });

    series.labels.template.set('text', "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="am-pie-2" style={{ width: '100%', height: '500px' }}></div>;
};

export default PieChart;
