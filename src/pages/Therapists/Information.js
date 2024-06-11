import React, { useState } from 'react';
import './PoJun.css'

const Information = () => {

    const [information, setInfo] = useState([['馬偕兒童醫院', 'https://www.hc.mmh.org.tw/child/'], ['新竹早療補助', 'https://kids.hccg.gov.tw/explain.php?pageid=JCUyMTcjIQ==']]);
    const [qa, setQA] = useState([['Q1: ...', 'A1: ...'], ['Q2: ...', 'A2: ...']]);
    const [savedInfo, setSavedInfo] = useState([]);
    const [savedQA, setSavedQA] = useState([]);
    const [infoEditing, setInfoEditing] = useState(false);
    const [qaEditing, setQAEditing] = useState(false);
    const [infoAddWindow, setInfoAddWindow] = useState(false);
    const [qaAddWindow, setQAAddWindow] = useState(false);
    const [newInfoName, setNewInfoName] = useState('');
    const [newInfoUrl, setNewInfoUrl] = useState('');
    const [newQ, setNewQ] = useState('');
    const [newA, setNewA] = useState('');

    const edit = (s) => {
        if(s==='Info') {
            setSavedInfo(information);
            setInfoEditing(true);
        }
        else {
            setSavedQA(qa);
            setQAEditing(true);
        }
    };

    const del = (s, index) => {
        if(s==="Info") {
            const newInfo = information.filter((_, i) => i !== index);
            setInfo(newInfo);
        }
        else {
            const newQA = qa.filter((_, i) => i !== index);
            setQA(newQA);
        }
    };

    const add = (s) => {
        if(s==="Info") {
            const newInfo = [...information, [newInfoName, newInfoUrl]];
            setInfo(newInfo);
            setNewInfoName('');
            setNewInfoUrl('');
            setInfoAddWindow(false);
        }
        else {
            const n = qa.length+1;
            const newQA = [...qa, [`Q${n}: ${newQ}`, `A${n}: ${newA}`]];
            setQA(newQA);
            setNewQ('');
            setNewA('');
            setQAAddWindow(false);
        }
    };

    const finish = (t, s) => {
        if(s==="Info") {
            setInfoEditing(false);
            if(t==='cancel')
                setInfo(savedInfo);
        }
        else {
            setQAEditing(false);
            if(t==='cancel')
                setQA(savedQA);
        }
    };

    return (
    <div>
        <div className="title">早療資訊
            <button className="btn2" onClick={() => {edit('Info')}} disabled={infoEditing}>編輯</button>
        </div>
        {information.map((item, index) => {
            const [ name, url ] = item;
            return (
                <div className="information" key={index}>
                    <a href={url} target="_blank" rel="noreferrer">{name}</a>
                    {infoEditing && <button className="btn2" onClick={() => {del("Info", index)}}>刪除</button>}
                </div>);
        })}
        {infoEditing && <div>
            <button onClick={() => {setInfoAddWindow(true)}}>新增</button>
        </div>}
        {infoAddWindow &&
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setInfoAddWindow(false)}>&times;</span>
                    <form onSubmit={() => {add('Info')}}>
                        <div>
                            <label>
                                名稱:
                                <input
                                    type="text"
                                    value={newInfoName}
                                    onChange={(e) => setNewInfoName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                網址:
                                <input
                                    type="url"
                                    value={newInfoUrl}
                                    onChange={(e) => setNewInfoUrl(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">提交</button>
                    </form>
                </div>
            </div>
        }
        {infoEditing && <div>
            <button onClick={() => {finish('cancel', 'Info')}}>取消</button>
            <button onClick={() => {finish('confirm', 'Info')}}>確定</button>
        </div>}
        
        <div className="title">常見Q/A
            <button className="btn2" onClick={() => {edit('QA')}} disabled={qaEditing}>編輯</button>
        </div>
        {qa.map((item, index) => {
            const [ q, a ] = item;
            return (
                <div className="information" key={index}>
                    <div>{q}</div>
                    <div>{a}{qaEditing && <button className="btn2" onClick={() => {del("QA", index)}}>刪除</button>}</div>
                </div>);
        })}
        {qaEditing && <div>
            <button onClick={() => {setQAAddWindow(true)}}>新增</button>
        </div>}
        {qaAddWindow &&
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setQAAddWindow(false)}>&times;</span>
                    <form onSubmit={() => {add('QA')}}>
                        <div>
                            <label>
                                Q:
                                <input
                                    type="text"
                                    value={newQ}
                                    onChange={(e) => setNewQ(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                A:
                                <input
                                    type="text"
                                    value={newA}
                                    onChange={(e) => setNewA(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit">提交</button>
                    </form>
                </div>
            </div>
        }
        {qaEditing && <div>
            <button onClick={() => {finish('cancel', 'QA')}}>取消</button>
            <button onClick={() => {finish('confirm', 'QA')}}>確定</button>
        </div>}
    </div>)
}

export default Information