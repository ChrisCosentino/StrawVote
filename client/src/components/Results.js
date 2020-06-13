import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../charts/canvasjs.react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

import 'react-notifications/lib/notifications.css';


const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Results = (props) => {

    const [results, setResults] = useState(null);
    const [dataPointsChart, setDataPoints] = useState([]);

    useEffect(() => {
        axios.get(`/api/poll/${props.match.params.id}`)
            .then(res => {
                setResults(res.data);

                const points = [];
                res.data.options.map(item => {
                    points.push({
                        y: item.votes,
                        label: item.option
                    });
                })
                setDataPoints(points);
            })
    }, [])

    if(!results){
        return <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        verticalAlign: 'middle',
                        alignItems: 'center'
                    }} />
    }




    const optionsPie = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", // "light1", "dark1", "dark2"
        title:{
            text: results.question
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y} votes",		
            startAngle: -90,
            dataPoints: dataPointsChart
        }]
    }

    const optionsChart = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        title:{
            text: results.question
        },
        data: [{
            type: "column",
            indexLabel: "{label}: {y} votes",		
            startAngle: -90,
            dataPoints: dataPointsChart
        }]
    }

    const votePath = () => {
        return props.location.pathname.replace("/results", "");
    }

    const createNotification = () => {
        NotificationManager.success('Share this link to others!', 'Copied!');
    }
    
    return (
        <div className="results-container">
            <div className="results-feature">
                <div>
                    <Link className="vote-btn" to={votePath}>Vote</Link>
                </div>
                <div>
                    <CopyToClipboard text={window.location.toString()} >
                        <button id="copy-link-btn" className="btn" onClick={createNotification} >Copy Link</button>
                    </CopyToClipboard>
                </div>
            </div>
            <CanvasJSChart options={optionsPie} />
            <CanvasJSChart options={optionsChart} />
            
        </div>
    )
}

export default Results
