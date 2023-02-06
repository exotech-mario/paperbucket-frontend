import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartStatistics5 = (props) => {
  useLayoutEffect(() => {
    var root = am5.Root.new('chart-percent');

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
        title: 'page done',
        value: 23,
        color: '#1de9b6'
      },
      {
        title: 'page progress',
        value: 14,
        color: '#f4c22b'
      },
      {
        title: 'page outstanding',
        value: 35,
        color: '#a389d4'
      },
      {
        title: 'page started',
        value: 28,
        color: '#1AB394'
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

  return <div id="chart-percent" className="chart-percent" style={{ width: '100%', height: props.height }}></div>;
};

export default AmChartStatistics5;
