import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartActivity = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new('chart-activity');

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(90),
        innerRadius: am5.percent(90)
      })
    );

    // Define data
    var data = [
      {
        title: 'Max',
        value: 550,
        color: '#1de9b6'
      },
      {
        title: 'Min',
        value: 237,
        color: '#f4c22b'
      }
    ];

    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: 'Title',
        valueField: 'value',
        categoryField: 'title'
      })
    );

    series.data.setAll(data);

    // Disabling labels and ticks
    series.slices.template.setAll({
      fillOpacity: 1,
      stroke: am5.color(0xffffff),
      strokeWidth: 2
    });
    series.labels.template.set('visible', false);
    series.ticks.template.set('visible', false);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chart-activity" className="chart-activity" style={{ width: '100%', height: '230px' }}></div>;
};

export default AmChartActivity;
