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
                    data.chart = this.chartData.chart;
                    const chart = Object.assign(
                        {},
                        this.chartData,
                        data
                    );

                    this.chart = new Highcharts.chart(
                        chart
                    );
                }

                destroy(){
                    this.chart.destroy();
                }
            }
        }

        component.init();
    }
)();
