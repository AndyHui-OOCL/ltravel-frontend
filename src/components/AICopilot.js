import React, {useState} from 'react';
import {Avatar, Button, Card, Input, Typography} from 'antd';
import {PlusOutlined, ReloadOutlined, RobotOutlined, SendOutlined, UserOutlined} from '@ant-design/icons';
import axios from 'axios';
import './AICopilot.css';

const { Text, Paragraph } = Typography;

const AICopilot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '我是世界的旅游管家，很高兴为你服务！',
      subContent: 'Hi,你好！这里有属于你的问题！今天想去哪里？有什么公里的相关问题吗请对我说我知！'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [aiChatResults, setAiChatResults] = useState([]);

  const suggestedQuestions = [
    '秋天哪个城市最漂亮？',
    '国庆7天去哪游玩线',
    '周末不清假玩转马来西亚'
  ];

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputValue
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // 请求后端AIChatDTO
      try {
        const response = await axios.post('http://localhost:8080/ai-chat', { prompt: inputValue });
        if (Array.isArray(response.data)) {
          setAiChatResults(response.data);
        }
      } catch (error) {
        // 错误处理
        setAiChatResults([]);
      }

      // 模拟AI回复（可选保留）
      setTimeout(() => {
        const botReply = {
          id: messages.length + 2,
          type: 'bot',
          content: '感谢您的问题！我正在为您查找相关的旅游信息...'
        };
        setMessages(prev => [...prev, botReply]);
      }, 1000);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="ai-copilot-container">
      {/* Messages Area */}
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">
              <Avatar
                icon={message.type === 'bot' ? <RobotOutlined /> : <UserOutlined />}
                className={message.type === 'bot' ? 'bot-avatar' : 'user-avatar'}
              />
            </div>
            <div className="message-content">
              <div className="message-bubble">
                <Text>{message.content}</Text>
                {message.subContent && (
                  <Paragraph className="message-sub-content">
                    {message.subContent}
                  </Paragraph>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* AIChatDTO 展示区 */}
        {aiChatResults.length > 0 && (
            <div className="ai-chat-results">
              {(aiChatResults.slice(0, 2)).map((item) => (
                  <div key={item.travelId} className="ai-chat-result-card">
                    <div className="ai-chat-result-info">
                      <span className="ai-chat-result-city">{item.cityName}</span>
                      <span className="ai-chat-result-desc" title={item.description}>{item.description}</span>
                    </div>
                    <img src={item.imageUrl} alt={item.cityName} className="ai-chat-result-img"/>
                  </div>
              ))}
            </div>
        )}
      </div>

      {/* Suggested Questions */}
      <div className="suggested-questions">
        <Text className="suggested-label">我可以解答本话题相关问题：</Text>
        <div className="questions-list">
          {suggestedQuestions.map((question, index) => (
              <Card
                  key={index}
                  className="question-card"
                  onClick={() => handleSuggestedQuestion(question)}
                  hoverable
              >
                <Text className="question-text">{question}</Text>
              </Card>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="input-area">
        <div className="input-container">
          <Input
              value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入问题让我来帮你"
            className="chat-input"
            suffix={
              <Button
                type="text"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                className="send-button"
                disabled={!inputValue.trim()}
              />
            }
          />
        </div>
        <div className="input-actions">
          <Button type="text" size="small" className="action-button">
            <PlusOutlined />
          </Button>
          <Button type="text" size="small" className="action-button">
            <ReloadOutlined />
          </Button>
        </div>
        <Text className="disclaimer">内容可能不准确，请谨慎参考。</Text>
      </div>
    </div>
  );
};

export default AICopilot;
