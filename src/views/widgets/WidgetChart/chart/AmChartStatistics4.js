import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartStatistics4 = (props) => {
  useLayoutEffect(() => {
    var root = am5.Root.new('line-chart2');

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX'
      })
    );

    // Define data
    var data = [
      { date: new Date(2000, 0, 1).getTime(), value1: 160, value2: 85 },
      { date: new Date(2000, 1, 1).getTime(), value1: 140, value2: 95 },
      { date: new Date(2000, 2, 1).getTime(), value1: 150, value2: 90 },
      { date: new Date(2000, 3, 1).getTime(), value1: 95, value2: 125 },
      { date: new Date(2000, 4, 1).getTime(), value1: 130, value2: 105 },
      { date: new Date(2000, 5, 1).getTime(), value1: 55, value2: 120 },
      { date: new Date(2000, 6, 1).getTime(), value1: 75, value2: 110 },
      { date: new Date(2000, 7, 1).getTime(), value1: 65, value2: 140 },
      { date: new Date(2000, 8, 1).getTime(), value1: 140, value2: 100 },
      { date: new Date(2000, 9, 1).getTime(), value1: 120, value2: 95 },
      { date: new Date(2000, 10, 1).getTime(), value1: 110, value2: 130 },
      { date: new Date(2000, 11, 1).getTime(), value1: 180, value2: 80 }
    ];

    var xAxis = chart.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: 'day',
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    var series1 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value1',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{valueY}'
        })
      })
    );

    series1.data.setAll(data);

    series1.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series1.get('fill'),
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 5
        })
      });
    });

    var series2 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value2',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{valueY}'
        })
      })
    );

    series2.data.setAll(data);

    series2.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series2.get('fill'),
          stroke: root.interfaceColors.get('background'),
          strokeWidth: 5
        })
      });
    });
    // Add cursor
    var cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        xAxis: xAxis
      })
    );
    cursor.lineY.set('visible', false);

    // add scrollbar
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal'
      })
    );

    // Make stuff animate on load
    series1.appear(1000, 100);
    series2.appear(1000, 100);
    chart.appear(1000, 100);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="line-chart2" className="lineChart2 ChartShadow" style={{ width: '100%', height: '350px' }}></div>;
};

export default AmChartStatistics4;
