import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {Avatar, Button, Card, Input, Typography} from 'antd';
import {RightOutlined, RobotOutlined, SendOutlined, UserOutlined} from '@ant-design/icons';
import './AICopilot.css';
import {useNavigate} from 'react-router-dom';
import {getAIChatByPrompt} from "../apis/aiCopilot";

const { Text, Paragraph } = Typography;

const AICopilot = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const suggestedQuestions = [
    '秋天哪个城市最漂亮？',
    '国庆7天去哪游玩线',
    '周末不清假玩转马来西亚'
  ];

  const initialMessage = {
    id: 1,
    type: 'bot',
    content: '我是LTravel旅游管家，很高兴为您服务！',
    subContent: 'Hi,你好！今天想去哪里？有什么旅游的相关问题吗？',
    suggestedQuestions: suggestedQuestions
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [inputValue, setInputValue] = useState('');

  // 创建ref用于滚动
  const messagesEndRef = React.useRef(null);

  // 重置会话函数
  const resetConversation = () => {
    setMessages([initialMessage]);
    setInputValue('');
  };

  // 暴露resetConversation方法给父组件
  useImperativeHandle(ref, () => ({
    resetConversation
  }));

  // 滚动到最底部
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 监听消息变化自动滚动到底部
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 抽取公共处理函数
  const sendMessageAndHandleResponse = async (question) => {
    const userMessageId = messages.length + 1;
    const newMessage = {
      id: userMessageId,
      type: 'user',
      content: question
    };
    setMessages(prev => [...prev, newMessage]);

    const tempBotMessage = {
      id: userMessageId + 1,
      type: 'bot',
      content: '感谢您的问题！我正在为您查找相关的旅游信息...'
    };
    setMessages(prev => [...prev, tempBotMessage]);

    try {
      const response = await getAIChatByPrompt(question);
      const failMessage = response.data.failMessage;
      if (failMessage === null) {
        const finalBotMessage = {
          id: userMessageId + 1,
          type: 'bot',
          content: '以下是我为您找到的旅游信息：',
          aiChatResults: response.data.slice(0, 2)
        };
        setMessages(prev =>
          prev.map(msg => msg.id === tempBotMessage.id ? finalBotMessage : msg)
        );
      } else {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === tempBotMessage.id
              ? {...msg, content: failMessage}
              : msg
          )
        );
      }
    } catch (error) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempBotMessage.id
            ? {...msg, content: '抱歉，获取旅游信息时出现了问题。请稍后再试。'}
            : msg
        )
      );
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const messageToSend = inputValue;
      setInputValue('');
      await sendMessageAndHandleResponse(messageToSend);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputValue('');
    sendMessageAndHandleResponse(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleViewDetail = (travelId) => {
    navigate(`/travel-plans/detail/${travelId}`);
  };

  return (
    <div className="ai-copilot-container">
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

                {/* Render suggested questions if they exist in this message */}
                {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                  <div className="suggested-questions">
                    <Text className="suggested-label">我可以解答本话题相关问题：</Text>
                    <div className="questions-list">
                      {message.suggestedQuestions.map((question, index) => (
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
                )}

                {/* Render AI chat results if they exist in this message */}
                {message.aiChatResults && message.aiChatResults.length > 0 && (
                  <div className="ai-chat-results">
                    {message.aiChatResults.map((item) => (
                      <div key={item.travelId} className="ai-chat-result-card">
                        <div className="ai-chat-result-info">
                          <span className="ai-chat-result-city">{item.cityName}</span>
                          <span className="ai-chat-result-desc" title={item.description}>{item.description}</span>
                        </div>
                        <img src={item.imageUrl} alt={item.cityName} className="ai-chat-result-img"/>
                        <Button
                          type="link"
                          className="view-detail-btn"
                          onClick={() => handleViewDetail(item.travelId)}
                        >
                          查看详情 <RightOutlined />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

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
        <Text className="disclaimer">内容可能不准确，请谨慎参考。</Text>
      </div>
    </div>
  );
});

export default AICopilot;
