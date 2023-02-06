import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartDevices = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new('device-chart');

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5percent.PieChart.new(root, {}));

    // Define data
    let data = [
      {
        device: 'Tablet',
        percentage: 25.9
      },
      {
        device: 'Mobile',
        percentage: 32.5
      },
      {
        device: 'Desktop',
        percentage: 41.6
      }
    ];

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Series',
        valueField: 'percentage',
        categoryField: 'device',
        alignLabels: false
      })
    );

    series.data.setAll(data);

    series.labels.template.setAll({
      fontSize: 12,
      text: '{category}',
      textType: 'radial',
      radius: 0,
      centerX: am5.percent(100),
      fill: am5.color(0xffffff)
    });

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="device-chart" className="device-chart" style={{ width: '250px', height: '250px' }}></div>;
};

export default AmChartDevices;
