import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartStatistics9 = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new('sales-render');

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX'
      })
    );

    // Add cursor
    var cursor = chart.set(
      'cursor',
      am5radar.RadarCursor.new(root, {
        behavior: 'zoomX'
      })
    );

    cursor.lineY.set('visible', false);

    // Create axes and their renderers
    var xRenderer = am5radar.AxisRendererCircular.new(root, {});
    xRenderer.labels.template.setAll({
      radius: 10
    });

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: 'Month',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5radar.AxisRendererRadial.new(root, {})
      })
    );

    // Create series
    var series = chart.series.push(
      am5radar.RadarLineSeries.new(root, {
        name: 'Visits',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'visit',
        categoryXField: 'Month',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}'
        })
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get('fill')
        })
      });
    });

    var series2 = chart.series.push(
      am5radar.RadarLineSeries.new(root, {
        name: 'Sales',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'sales',
        categoryXField: 'Month',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}'
        })
      })
    );

    series2.strokes.template.setAll({
      strokeWidth: 2
    });

    series2.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series2.get('fill')
        })
      });
    });

    // Set data
    var data = [
      {
        Month: 'Jan',
        visit: 100,
        sales: 80
      },
      {
        Month: 'Feb',
        visit: 60,
        sales: 90
      },
      {
        Month: 'Mar',
        visit: 100,
        sales: 80
      },
      {
        Month: 'Apr',
        visit: 100,
        sales: 110
      },
      {
        Month: 'May',
        visit: 100,
        sales: 40
      },
      {
        Month: 'Jun',
        visit: 80,
        sales: 115
      }
    ];
    series.data.setAll(data);
    series2.data.setAll(data);
    xAxis.data.setAll(data);

    // Animate chart and series in
    series.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="sales-render" style={{ width: '100%', height: '300px' }}></div>;
};

export default AmChartStatistics9;
