import React, {useState} from 'react';
import './index.css';

const Information = () => {

    const [information, setInfo] = useState([['馬偕兒童醫院', 'https://www.hc.mmh.org.tw/child/'], ['新竹早療補助', 'https://kids.hccg.gov.tw/explain.php?pageid=JCUyMTcjIQ==']]);
    const [qa, setQA] = useState([['Q1: ...', 'A1: ...'], ['Q2: ...', 'A2: ...']]);

    return <div>
        <div className="title">早療資訊</div>
        {information.map((item) => {
            const [ name, url ] = item;
            return (<div className="information"><a href={url} target="_blank" rel="noreferrer">{name}</a></div>);
        })}
        <div className="title">常見Q/A</div>
        {qa.map((item) => {
            const [ q, a ] = item;
            return (<div><div className="information">{q}</div>
                    <div className="information">{a}</div></div>);
        })}
    </div>
}

export default Information