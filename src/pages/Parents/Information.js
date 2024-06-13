import React, {useState, useEffect} from 'react';
import './index.css';

const Information = () => {

    const [information, setInfo] = useState([['馬偕兒童醫院', 'https://www.hc.mmh.org.tw/child/'], ['新竹早療補助', 'https://kids.hccg.gov.tw/explain.php?pageid=JCUyMTcjIQ==']]);
    const [qa, setQA] = useState([['Q1: ...', 'A1: ...'], ['Q2: ...', 'A2: ...']]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const inforesponse = await fetch('http://localhost:8888/info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await inforesponse.json();
            setInfo(data || []);
            }
        catch (err) {
                console.error('Failed to fetch information');
                setInfo([]);
            }
        try{
            const qaresponse = await fetch('http://localhost:8888/qa', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const qadata = await qaresponse.json();
            setQA(qadata || []);
            } 
        catch (error) {
            console.error('Error fetching data:', error);
            setInfo([]);
            setQA([]);
        }
    };
    return <div>
        <div className="title">早療資訊</div>
        {information.map((item) => {
            // const [ name, url ] = item;
            return (<div className="information"><a href={item.url} target="_blank" rel="noreferrer">{item.name}</a></div>);
        })}
        <div className="title">常見Q/A</div>
        {qa.map((item) => {
            // const [ q, a ] = item;
            return (<div><div className="information">{item.question}</div>
                    <div className="information">{item.answer}</div></div>);
        })}
    </div>
}

export default Information