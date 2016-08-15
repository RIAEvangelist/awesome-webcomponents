'use strict';

awesome.requireScript(`${awesome.bower}highcharts/highcharts.js`);
awesome.requireCSS(`${awesome.path}components/charts/awesome-scatter-plot.css`);

(
    function(){
        const defaults={
            chartTitle:'awesome-scatter-plot',
            legendTitle:'Your Legend Title'
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-scatter-plot';
        component.extends='BaseComponent';

        component.create=function createAwesomeScatterPlot() {
            return class AwesomeScatterPlot extends awesome.component.BaseComponent{
                createdCallback(){
                    this.mergeDataset(defaults);
                    super.createdCallback();
                    this.classList.add(AwesomeScatterPlot.elementTagName);

                    this.chart = null;

                    //setting up defaults
                    this.chartData = {
                        chart:{
                            renderTo: this,
                            type: 'scatter'
                        },
                        title:{
                            text:this.dataset.chartTitle,
                            align:'center'
                        },
                        legend:{
                            align: 'right',
                            verticalAlign: 'top',
                            layout: 'vertical',
                            title:{
                                text:this.dataset.legendTitle
                            }
                        },
                        plotOptions:{
                            allowPointSelect:true
                        },
                        series:[],
                        xAxis:{
                            min:-100,
                            max:100
                        },
                        yAxis:{
                            min:-100,
                            max:100
                        }
                    }
                }

                load(data){
                    this.chartData.series = [];

                    for(const dataName in data){
                        this.chartData.series.push(
                            {
                                data:data[dataName].coordinates,
                                name:dataName,
                                color:data[dataName].color,
                                marker:{
                                    symbol:data[dataName].symbol
                                }
                            }
                        );
                    }

                    this.chartData.title.aling = data.titleAlign || this.chartData.title.aling;
                    this.chartData.legend.aling = data.legendAlign || this.chartData.legend.aling;
                    this.chartData.legend.verticalAlign = data.legendVerticalAlign || this.chartData.legend.verticalAlign;
                    this.chartData.plotOptions.allowPointSelect = data.allowPointSelect || this.chartData.plotOptions.allowPointSelect;
                    this.chartData.xAxis.min = data.xAxisMin || this.chartData.xAxis.min;
                    this.chartData.xAxis.max = data.xAxisMax || this.chartData.xAxis.max;
                    this.chartData.yAxis.min = data.yAxisMin || this.chartData.yAxis.min;
                    this.chartData.yAxis.max = data.yAxisMax || this.chartData.yAxis.max;

                    this.chart = new Highcharts.chart(
                        this.chartData
                    );
                }
            }
        }

        component.init();
    }
)();
