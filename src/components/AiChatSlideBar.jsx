import {CloseOutlined, RobotOutlined, PlusOutlined} from "@ant-design/icons";
import AICopilot from "./AICopilot";
import {Drawer, Button} from "antd";
import React, {useRef} from "react";

function AiChatSlideBar({isAiChatVisible, setAiChatVisible}) {
    const aiCopilotRef = useRef();

    const handleNewConversation = () => {
        // Call the reset function from AICopilot component
        if (aiCopilotRef.current && aiCopilotRef.current.resetConversation) {
            aiCopilotRef.current.resetConversation();
        }
    };

    return (
        <Drawer
            title={
                <div className="ai-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <div className="ai-copilot-total">
                        <RobotOutlined />
                        <span>Travel Copilot</span>
                    </div>
                    <Button
                        type="text"
                        size="middle"
                        icon={<PlusOutlined />}
                        onClick={handleNewConversation}
                        style={{ marginRight: '12px' }}
                    >
                    </Button>
                </div>
            }
            placement="right"
            width={600}
            onClose={() => setAiChatVisible(false)}
            open={isAiChatVisible}
            closeIcon={<CloseOutlined />}
        >
            <AICopilot ref={aiCopilotRef} />
        </Drawer>
    )
}

export default AiChatSlideBar