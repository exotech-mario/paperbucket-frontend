import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartAge = (props) => {
  useLayoutEffect(() => {
    let root = am5.Root.new('Stack-age');
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
        age: '<20',
        visits: 30,
        color: ['#1de9b6', '#1dc4e9']
      },
      {
        age: '30',
        visits: 35,
        color: ['#899FD4', '#A389D4']
      },
      {
        age: '40',
        visits: 40,
        color: ['#1de9b6', '#1dc4e9']
      },
      {
        age: '50',
        visits: 30,
        color: ['#899FD4', '#A389D4']
      },
      {
        age: '60',
        visits: 32,
        color: ['#1de9b6', '#1dc4e9']
      },
      {
        age: '>70',
        visits: 38,
        color: ['#899FD4', '#A389D4']
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
        categoryField: 'age',
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
        categoryXField: 'age',
        fill: am5.color(0x1dc4e9)
      })
    );

    series1.columns.template.setAll({
      tooltipText: '{categoryX}: {valueY}',
      width: am5.percent(90),
      tooltipY: 0
    });
    series1.data.setAll(data);

    series1.columns.template.set(
      'fillGradient',
      am5.LinearGradient.new(root, {
        stops: [
          {
            color: am5.color(0x1de9b6),
            opacity: 1
          },
          {
            color: am5.color(0xa389d4),
            opacity: 0.5
          }
        ]
      })
    );

    let legend = chart.children.push(am5.Legend.new(root, {}));

    legend.data.setAll(chart.series.values);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="Stack-age" style={{ width: '100%', height: props.height }}></div>;
};

export default AmChartAge;
