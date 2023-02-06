import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartStatistics8 = (props) => {
  useLayoutEffect(() => {
    var root = am5.Root.new('earnings-chart');

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
      { date: new Date(1999, 0, 1).getTime(), value: 30 },
      { date: new Date(2000, 0, 2).getTime(), value: 55 },
      { date: new Date(2001, 0, 3).getTime(), value: 80 },
      { date: new Date(2002, 0, 4).getTime(), value: 60 },
      { date: new Date(2003, 0, 5).getTime(), value: 70 },
      { date: new Date(2004, 0, 6).getTime(), value: 70 },
      { date: new Date(2005, 0, 7).getTime(), value: 110 },
      { date: new Date(2006, 0, 7).getTime(), value: 90 },
      { date: new Date(2007, 0, 7).getTime(), value: 130 }
    ];

    // Create axes
    var xAxis = chart.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
          timeUnit: 'year',
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

    // Add series
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{valueY}'
        })
      })
    );

    series.data.setAll(data);

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get('fill'),
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
    series.appear(1000, 100);
    chart.appear(1000, 100);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="earnings-chart" style={{ width: '100%', height: props.height }}></div>;
};

export default AmChartStatistics8;
