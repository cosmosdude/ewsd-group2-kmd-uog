import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
/**
 * Default color informations
*/
export let colors = {
    background: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
    ],
    border: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ]
}

/**
 * Chart JS component
 * 
 * @param type Chart type. Default is 'bar'
 * @param data Chart data.
 * @param options Chart options
*/
function EWSDChart({type = 'bar', data = {}, options = {} }) {
    return (
        <Chart 
        className=""
        type={type}
        options={options}
        data = {data}
        />
    );
}

export default EWSDChart;