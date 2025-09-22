import {CloseOutlined, RobotOutlined} from "@ant-design/icons";
import AICopilot from "./AICopilot";
import {Drawer} from "antd";
import React from "react";

function AiChatSlideBar({isAiChatVisible, setAiChatVisible}) {
    return (
        <Drawer
            title={
                <div className="ai-header">
                    <RobotOutlined />
                    <span>Travel Copilot</span>
                </div>
            }
            placement="right"
            width={400}
            onClose={() => setAiChatVisible(false)}
            open={isAiChatVisible}
            closeIcon={<CloseOutlined />}
        >
            <AICopilot />
        </Drawer>
    )
}

export default AiChatSlideBar