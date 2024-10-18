import React, { useState } from 'react';

function App() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    const askQuestion = async () => {
        // Логика для отправки вопроса в API и получения ответа
    };

    return (
        <div>
            <h1>AI-Powered Question and Answer System</h1>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                <option value="">Select a subject</option>
                <option value="math">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="geography">Geography</option>
                <option value="biology">Biology</option>
                <option value="computer-science">Computer Science</option>
            </select>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your question here..."
            />
            <button onClick={askQuestion}>Ask</button>
            {answer && (
                <div>
                    <h2>Answer:</h2>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
}

export default App;
