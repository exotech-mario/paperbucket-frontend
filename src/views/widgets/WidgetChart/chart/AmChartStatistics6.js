import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartStatistics6 = (props) => {
  useLayoutEffect(() => {
    let root = am5.Root.new('bar-chart2');
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
        Year: '2014',
        sales: 2,
        visits: 4,
        clicks: 3
      },
      {
        Year: '2015',
        sales: 4,
        visits: 7,
        clicks: 5
      },
      {
        Year: '2016',
        sales: 2,
        visits: 3,
        clicks: 4
      },
      {
        Year: '2017',
        sales: 4.5,
        visits: 6,
        clicks: 4
      }
    ];

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'Year',

        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.4,
          cellEndLocation: 0.7,
          minGridDistance: 20
        })
      })
    );
    xAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Sales',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'sales',
        categoryXField: 'Year',
        fill: am5.color(0x1dc4e9),
        legendLabelText: '$[bold]{valueY}M'
      })
    );

    series1.columns.template.setAll({
      tooltipText: '{name}: {valueY}M',
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

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Visits',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'visits',
        categoryXField: 'Year',
        fill: am5.color(0xa389d4),
        legendLabelText: '$[bold]{valueY}M'
      })
    );

    series2.columns.template.setAll({
      tooltipText: '{name}: {valueY}M',
      width: am5.percent(90),
      tooltipY: 0
    });
    series2.data.setAll(data);

    series2.columns.template.set(
      'fillGradient',
      am5.LinearGradient.new(root, {
        stops: [
          {
            color: am5.color(0xa389d4),
            opacity: 1
          },
          {
            color: am5.color(0x899ed4),
            opacity: 0.5
          }
        ]
      })
    );

    let series3 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Clicks',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'clicks',
        categoryXField: 'Year',
        fill: am5.color(0x04a9f5),
        legendLabelText: '$[bold]{valueY}M'
      })
    );

    series3.columns.template.setAll({
      tooltipText: '{name}: {valueY}M',
      width: am5.percent(90),
      tooltipY: 0
    });
    series3.data.setAll(data);

    series3.columns.template.set(
      'fillGradient',
      am5.LinearGradient.new(root, {
        stops: [
          {
            color: am5.color(0x04a9f5),
            opacity: 1
          },
          {
            color: am5.color(0x04a9f5),
            opacity: 0.5
          }
        ]
      })
    );

    let legend = chart.children.push(am5.Legend.new(root, {}));

    legend.data.setAll(chart.series.values);
    xAxis.set('tooltip', am5.Tooltip.new(root, {}));

    yAxis.set('tooltip', am5.Tooltip.new(root, {}));

    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="bar-chart2" className="bar-chart2" style={{ width: '100%', height: props.height }}></div>;
};

export default AmChartStatistics6;
