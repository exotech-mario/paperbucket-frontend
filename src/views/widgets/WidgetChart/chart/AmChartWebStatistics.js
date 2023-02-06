import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const AmChartWebStatistics = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new('webchart');

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
        categoryField: 'direction',
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
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'direction',
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

    // Set data
    var data = [
      {
        direction: 'Sales',
        value: 15
      },
      {
        direction: 'Visits',
        value: 13
      },
      {
        direction: 'Views',
        value: 11.1
      },
      {
        direction: 'Clicks',
        value: 15
      }
    ];
    series.data.setAll(data);
    xAxis.data.setAll(data);

    // Animate chart and series in
    series.appear(1000);
    chart.appear(1000, 100);

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="webchart" style={{ width: '100%', height: '250px' }}></div>;
};

export default AmChartWebStatistics;
