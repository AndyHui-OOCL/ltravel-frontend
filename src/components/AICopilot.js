import React, { useState } from 'react';
import { Input, Button, Avatar, Typography, Space, Card, Divider } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
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

  const suggestedQuestions = [
    '秋天哪个城市最漂亮？',
    '国庆7天去哪游玩线',
    '周末不清假玩转马来西亚'
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputValue
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // 模拟AI回复
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
