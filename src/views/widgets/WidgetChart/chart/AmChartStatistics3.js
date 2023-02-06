import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartStatistics3 = (props) => {
  useLayoutEffect(() => {
    var root = am5.Root.new('line-chart1');

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
      { date: new Date(2000, 0, 1).getTime(), value: 65, value2: 125, value3: 175 },
      { date: new Date(2000, 1, 1).getTime(), value: 145, value2: 30, value3: 160 },
      { date: new Date(2000, 2, 1).getTime(), value: 105, value2: 80, value3: 190 },
      { date: new Date(2000, 3, 1).getTime(), value: 105, value2: 70, value3: 190 },
      { date: new Date(2000, 4, 1).getTime(), value: 145, value2: 110, value3: 140 },
      { date: new Date(2000, 5, 1).getTime(), value: 185, value2: 150, value3: 100 }
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
        valueYField: 'value',
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

    var series3 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value3',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{valueY}'
        })
      })
    );

    series3.data.setAll(data);

    series3.bullets.push(function () {
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
    series3.appear(1000, 100);
    chart.appear(1000, 100);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="line-chart1" className="ChartShadow" style={{ width: '100%', height: '350px' }}></div>;
};

export default AmChartStatistics3;
