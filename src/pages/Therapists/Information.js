import React, { useState, useEffect } from 'react';
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
    const deleteInformation = async (id) => {
        try {
            await fetch(`http://localhost:8888/info/${id}`, {
                method: 'DELETE',
            });
            setInfo(information.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting information:', error);
        }
    };
    const deleteQA = async (id) => {
        try {
            await fetch(`http://localhost:8888/qa/${id}`, {
                method: 'DELETE',
            });
            setQA(qa.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting QA:', error);
        }
    };
    const addInformation = async (e) => {
        e.preventDefault();
        const newInfo = {
            name: newInfoName,
            url: newInfoUrl
        };
        try {
            const response = await fetch('http://localhost:8888/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newInfo),
            });
            if (response.ok) {
                const addedInfo = await response.json();
                setInfo([...information, addedInfo]);
                setNewInfoName('');
                setNewInfoUrl('');
                setInfoAddWindow(false);
            } else {
                console.error('Error adding info');
            }
        } catch (error) {
            console.error('Error adding information:', error);
        }
    };
    const addQA = async (e) => {
        e.preventDefault();
        const newQAItem = {
            question: newQ,
            answer: newA
        };

        try {
            const response = await fetch('http://localhost:8888/qa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQAItem),
            });
            const addedQA = await response.json();
            setQA([...qa, addedQA]);
            setNewQ('');
            setNewA('');
            setQAAddWindow(false);
        } catch (error) {
            console.error('Error adding QA:', error);
        }
    };

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
        if (s === "Info") {
            const item = information[index];
            deleteInformation(item.id);
        }
        else {
            const item = qa[index];
            deleteQA(item.id);
        }
    };

    const add = (s) => {
        if (s === "Info") {
            setInfoAddWindow(true);
        }
        else {
            setQAAddWindow(true);
        }
    };

    const finish = (t, s) => {
        if (s === "Info") {
            setInfoEditing(false);
            if (t === 'cancel') setInfo(savedInfo);
        } else {
            setQAEditing(false);
            if (t === 'cancel') setQA(savedQA);
        }
    };

    return (
    <div>
        <div className="title">早療資訊
            <button className="btn2" onClick={() => {edit('Info')}} disabled={infoEditing}>編輯</button>
        </div>
        {information.map((item, index) => {
            // const [ name, url ] = item;
            return (
                <div className="information" key={item.id}>
                    <a href={item.url} target="_blank" rel="noreferrer">{item.name}</a>
                    {infoEditing && <button className="btn2" onClick={() => {del("Info", index)}}>刪除</button>}
                </div>);
        })}
        {infoEditing && <div>
            <button onClick={() => {add('Info')}}>新增</button>
        </div>}
        {infoAddWindow &&
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setInfoAddWindow(false)}>&times;</span>
                    <form onSubmit={addInformation}>
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
                <button className="btn2" onClick={() => { edit('QA') }} disabled={qaEditing}>編輯</button>
            </div>
            {qa.map((item, index) => {
                return (
                    <div className="information" key={item.id}>
                        <div>{item.question}</div>
                        <div>{item.answer}{qaEditing && <button className="btn2" onClick={() => { del("QA", index) }}>刪除</button>}</div>
                    </div>);
            })}
            {qaEditing && <div>
                <button onClick={() => { add('QA') }}>新增</button>
            </div>}
            {qaAddWindow &&
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setQAAddWindow(false)}>&times;</span>
                        <form onSubmit={addQA}>
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
                <button onClick={() => { finish('cancel', 'QA') }}>取消</button>
                <button onClick={() => { finish('confirm', 'QA') }}>確定</button>
            </div>}
        </div>
    );
}

export default Information