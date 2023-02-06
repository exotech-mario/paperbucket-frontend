import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const XyChart = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new('am-xy-1');
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: true,
        layout: root.verticalLayout
      })
    );

    // Define data
    let data = [
      {
        country: 'Lithuania',
        research: 501.9,
        marketing: 250,
        sales: 199
      },
      {
        country: 'Czech Republic',
        research: 301.9,
        marketing: 222,
        sales: 251
      },
      {
        country: 'Ireland',
        research: 201.1,
        marketing: 170,
        sales: 199
      },
      {
        country: 'Germany',
        research: 165.8,
        marketing: 122,
        sales: 90
      },
      {
        country: 'Australia',
        research: 139.9,
        marketing: 99,
        sales: 252
      },
      {
        country: 'Austria',
        research: 128.3,
        marketing: 85,
        sales: 84
      },
      {
        country: 'UK',
        research: 99,
        marketing: 93,
        sales: 142
      },
      {
        country: 'Belgium',
        research: 60,
        marketing: 50,
        sales: 55
      },
      {
        country: 'The Netherlands',
        research: 50,
        marketing: 42,
        sales: 25
      }
    ];

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    var label1 = am5.Label.new(root, {
      rotation: -90,
      text: 'Expenditure (M)',
      y: am5.p50,
      centerX: am5.p50
      //x: am5.p0,
      //centerY: am5.p0
    });

    yAxis.children.unshift(label1);

    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'country',

        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
          minGridDistance: 20
        })
      })
    );

    xAxis.data.setAll(data);
    var label2 = am5.Label.new(root, {
      rotation: 0,
      text: 'Local country offices',
      // x: am5.p50,
      // y:am5.p50,
      // centerx: am5.p50
      x: am5.p50,
      centerY: am5.p0
    });

    xAxis.children.unshift(label2);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Research',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'research',
        categoryXField: 'country',
        legendLabelText: '{name}: [bold]{valueY}[/]'
      })
    );
    series1.columns.template.setAll({
      tooltipText: '{categoryX}, {name}:{valueY}',
      width: am5.percent(90),
      tooltipY: 0
    });
    series1.data.setAll(data);

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Marketing',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'marketing',
        categoryXField: 'country',
        legendLabelText: '{name}: [bold]{valueY}[/]'
      })
    );
    series2.columns.template.setAll({
      tooltipText: '{categoryX}, {name}:{valueY}',
      width: am5.percent(90),
      tooltipY: 0
    });
    series2.data.setAll(data);

    let series3 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Sales',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'sales',
        categoryXField: 'country',
        legendLabelText: '{name}: [bold]{valueY}[/]'
      })
    );
    series3.columns.template.setAll({
      tooltipText: '{categoryX}, {name}:{valueY}',
      width: am5.percent(90),
      tooltipY: 0
    });
    series3.data.setAll(data);

    let legend = chart.children.push(am5.Legend.new(root, {}));

    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    root.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="am-xy-1" style={{ width: '100%', height: '500px' }}></div>;
};

export default XyChart;
