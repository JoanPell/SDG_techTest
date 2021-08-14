import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartOptions: {},
            isLoaded: false,
        };
    }

    
    fetchData() {
        fetch('https://api.idescat.cat/pob/v1/geo.json?tipus=com&lang=es')
            .then(response => {
                return response.json();
            })
            .then(data => {
                

                const { comarques, homes, dones, total } = data.feed.entry.reduce(
                    (result, entry) => {
                        
                        const title = entry.title;
                        
                        const [homes, dones, total] =
                            entry['cross:DataSet']['cross:Section'][
                                'cross:Obs'
                            ];

                        
                        result.comarques.push(title);
                        result.homes.push(parseInt(homes['OBS_VALUE']));
                        result.dones.push(parseInt(dones['OBS_VALUE']));
                        result.total.push(parseInt(total['OBS_VALUE']));
                       
                        return result;
                    },
                    { comarques: [], homes: [], dones: [], total: [] }
                );

                
                let chartSeries = [];

                
                if (this.props.type === 'homes') {
                    chartSeries = [
                        {
                            name: 'Homes',
                            data: homes,
                        },
                    ];
                    
                } else if (this.props.type === 'dones') {
                    chartSeries = [
                        {
                            name: 'Dones',
                            data: dones,
                        },
                    ];
                    
                } else if (this.props.type === 'total') {
                    chartSeries = [
                        {
                            name: 'Total',
                            data: total,
                        },
                    ];
                    
                } else {
                    chartSeries = [
                        {
                            name: 'Dones',
                            data: dones,
                        },
                        {
                            name: 'Homes',
                            data: homes,
                        },
                        {
                            name: 'Total',
                            data: total,
                        },
                    ];
                }

                
                this.setState({
                    chartOptions: {
                        chart: {
                            type: 'column',
                        },
                        title: {
                            text: 'Comarques',
                        },
                        xAxis: {
                            categories: comarques,
                            crosshair: true,
                        },
                        series: chartSeries,
                    },
                });

                
                this.setState({ isLoaded: true });
            })
            .catch(error => {
                console.log(error);
            });
    }

    
    componentDidUpdate(prevProps) {
        
        if (prevProps.type !== this.props.type) {
            this.setState({ isLoaded: false });
            this.fetchData();
        }
    }

    
    componentDidMount() {
        
        this.fetchData();
    }

    render() {
        const { isLoaded, chartOptions } = this.state;

        if (!isLoaded) return <div>Loading...</div>;

        return (
            <div className="chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        );
    }
}

export default Chart;
