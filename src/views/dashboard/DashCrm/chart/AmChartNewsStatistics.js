import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartNewsStatistics = (props) => {
  useLayoutEffect(() => {
    let root = am5.Root.new('bar-chart');
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    // Define data
    let data = [
      {
        game: 'Sport',
        visits: 53,
        color: ['#1de9b6', '#1dc4e9']
      },
      {
        game: 'Music',
        visits: 13,
        color: ['#a389d4', '#899ed4']
      },
      {
        game: 'Travel',
        visits: 30,
        color: ['#1AB394', '#049df5']
      },
      {
        game: 'News',
        visits: 4,
        color: ['#f44236', '#f48f36']
      }
    ];

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'game',
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.4,
          cellEndLocation: 0.6,
          minGridDistance: 5
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    xAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Visits',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'visits',
        categoryXField: 'game'
      })
    );

    series1.columns.template.setAll({
      tooltipText: '{categoryX}: {valueY}',
      width: am5.percent(90),
      tooltipY: 0
    });
    series1.data.setAll(data);

    let legend = chart.children.push(am5.Legend.new(root, {}));

    legend.data.setAll(chart.series.values);
    chart.get('colors').set('colors', [am5.color(0x1de9b6), am5.color(0x899ed4), am5.color(0x049df5), am5.color(0xf48f36)]);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="bar-chart" className="lineChart ChartShadow" style={{ width: '100%', height: props.height }}></div>;
};

export default AmChartNewsStatistics;
