import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartStatistics1 = (props) => {
  useLayoutEffect(() => {
    var root = am5.Root.new('line-area2');

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
      { date: new Date(1999, 0, 1).getTime(), value1: 5, value2: 80 },
      { date: new Date(2000, 1, 2).getTime(), value1: 30, value2: 95 },
      { date: new Date(2001, 2, 3).getTime(), value1: 25, value2: 87 },
      { date: new Date(2002, 3, 4).getTime(), value1: 25, value2: 87 },
      { date: new Date(2003, 4, 5).getTime(), value1: 45, value2: 140 },
      { date: new Date(2004, 5, 6).getTime(), value1: 65, value2: 147 },
      { date: new Date(2005, 6, 7).getTime(), value1: 60, value2: 130 },
      { date: new Date(2006, 7, 7).getTime(), value1: 105, value2: 180 },
      { date: new Date(2007, 8, 7).getTime(), value1: 80, value2: 160 },
      { date: new Date(2009, 9, 7).getTime(), value1: 110, value2: 175 },
      { date: new Date(2010, 10, 7).getTime(), value1: 120, value2: 165 },
      { date: new Date(2011, 11, 7).getTime(), value1: 150, value2: 200 }
    ];

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

    var series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
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
      am5xy.LineSeries.new(root, {
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

  return <div id="line-area2" className="lineAreaDashboard" style={{ width: '100%', height: props.height }}></div>;
};

export default AmChartStatistics1;
