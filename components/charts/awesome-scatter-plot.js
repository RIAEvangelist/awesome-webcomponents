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

                    this.innerHTML=`
                        <section class = 'chartArea'>
                        </section>
                    `;
                    this.chartArea = this.querySelector('.chartArea');
                    this.chart = null;

                    this.chartData = {
                        chart:{
                            renderTo: this.chartArea,
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

                    for(const dataset in data){
                        this.chartData.series.push(
                            {
                                data:data[dataset].coordinates,
                                name:dataset,
                                color:data[dataset].color,
                                marker:{
                                    symbol:data[dataset].symbol
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
