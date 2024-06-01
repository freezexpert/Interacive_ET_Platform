import React, {useState} from 'react';

const EditStudentList = ({ studentList, setStudentList }) => {
    const [newStudent, setNewStudent] = useState('');
    const [tempStudentList, setTempStudentList] = useState([...studentList]);
    const [changesMade, setChangesMade] = useState(false);

    const handleAddStudent = (e) => {
        e.preventDefault();
        if (newStudent.trim() !== '') {
            setTempStudentList([...tempStudentList, newStudent.trim()]);
            setNewStudent('');
            setChangesMade(true);
        }
    };

    const handleDeleteStudent = (index) => {
        const updatedList = tempStudentList.filter((_, i) => i !== index);
        setTempStudentList(updatedList);
        setChangesMade(true);
    };

    const handleConfirmChanges = () => {
        setStudentList(tempStudentList);
        setChangesMade(false);
    };

    const handleCancelChanges = () => {
        setTempStudentList([...studentList]);
        setChangesMade(false);
    };

    return (
        <div>
            <form onSubmit={handleAddStudent}>
                <label>
                    新學生 Gmail:
                    <input
                        type="email"
                        value={newStudent}
                        onChange={(e) => setNewStudent(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">添加</button>
            </form>
            <ul>
                {tempStudentList.map((student, index) => (
                    <li key={index}>
                        {student} <button onClick={() => handleDeleteStudent(index)}>刪除</button>
                    </li>
                ))}
            </ul>
            {changesMade && (
                <div>
                    <button onClick={handleConfirmChanges}>確認更改</button>
                    <button onClick={handleCancelChanges}>取消更改</button>
                </div>
            )}
        </div>
    );
};

export default EditStudentList;