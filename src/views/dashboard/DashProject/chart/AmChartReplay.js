import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartReplay = (props) => {
  useLayoutEffect(() => {
    let root = am5.Root.new('bar-chart1');
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
        Average: '0-1',
        value: 53,
        color: am5.color(0x00aade)
      },
      {
        Average: '1-4',
        value: 13,
        color: am5.color(0x00aade)
      },
      {
        Average: '8-24',
        value: 30,
        color: am5.color(0x00aade)
      },
      {
        Average: '>24',
        value: 4,
        color: am5.color(0x00aade)
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
        categoryField: 'Average',

        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
          minGridDistance: 5,
          fill: 'color',
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: 'color'
          })
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    xAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Value',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'Average'
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

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="bar-chart1" className="BarChart barChart1 ChartShadow" style={{ width: '100%', height: props.height }}></div>;
};

export default AmChartReplay;
