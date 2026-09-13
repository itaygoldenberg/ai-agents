import readline from "readline/promises";
 
class Terminal {
 
    public async getResponse(request: string): Promise<string> {
 
        // Create reader:
        const reader = readline.createInterface({
            input: process.stdin, // stdin: Standard Input --> terminal
            output: process.stdout // stdout: Standard Output --> terminal
        });
 
        // Display request and wait for response:
        const response = await reader.question(request); // Waiting for the user to press Enter.
 
        // Close the reader:
        reader.close();
 
        // Return the response:
        return response;
    }
 
}
export const terminal = new Terminal();
 