'use strict';

awesome.requireScript(`${awesome.bower}highcharts/highcharts.js`);
awesome.requireCSS(`${awesome.path}components/charts/awesome-scatter-plot.css`);

(
    function(){
        const defaults={
            chartTitle:'awesome-scatter-plot',
            legendTitle:'Data!',
            xMin:-100,
            xMax:100,
            yMin:-100,
            yMax:100,
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
                            min: this.dataset.xMin,
                            max: this.dataset.xMax
                        },
                        yAxis:{
                            min: this.dataset.yMin,
                            max: this.dataset.yMax
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

                    this.chart = new Highcharts.chart(
                        this.chartData
                    );
                }
            }
        }

        component.init();
    }
)();
