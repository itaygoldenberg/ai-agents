import { BaseMessage } from "langchain";
 
class Logger {
 
    public logMessages(messages: BaseMessage[]): void {
        for(const msg of messages) {
            const msgType = msg.constructor.name;
            const msgContent = msg.text;
            console.log(`${msgType}: ${msgContent}`);
            console.log("--------------------------------------");
        }
    }
 
}
 
export const logger = new Logger();
 