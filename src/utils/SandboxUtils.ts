import { toast } from "sonner";

// Creates sandbox HTML with the generated code
export const createSandboxHtml = (code: string): string => {
  // Basic HTML structure with imported React and ReactDOM
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <style>
          body {
            font-family: sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f7f7f7;
          }
          #root {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            min-height: 200px;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          try {
            ${code}
            
            // Try to find React components in the code
            const possibleComponents = Object.keys(window)
              .filter(key => typeof window[key] === 'function' && /^[A-Z]/.test(key))
              .map(key => window[key]);
            
            // If we found components, try to render the first one
            if (possibleComponents.length > 0) {
              const App = possibleComponents[0];
              ReactDOM.createRoot(document.getElementById('root')).render(<App />);
            } else {
              // If no components were found, try to execute the code as is
              document.getElementById('root').innerHTML = '<div class="code-output">Code executed. See console for output.</div>';
            }
          } catch (error) {
            document.getElementById('root').innerHTML = '<div style="color: red; padding: 10px; border: 1px solid red; border-radius: 4px; background: rgba(255,0,0,0.05);">' + 
              '<strong>Error:</strong> ' + error.message + '</div>';
            console.error(error);
          }
        </script>
      </body>
    </html>
  `;
};

// Function to open sandbox in new tab with less restrictions
export const openSandboxInNewTab = (code: string): void => {
  if (!code) {
    toast.error("Generate some code first before opening in a new tab");
    return;
  }

  // Create a blob from the HTML content
  const htmlContent = createSandboxHtml(code);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Open the blob URL in a new tab/window
  window.open(url, '_blank');
  
  toast.info("Opening code sandbox in a new tab");
};

// Get placeholder image based on prompt content
export const getPlaceholderImage = (prompt: string, placeholders: string[], specialImages: Record<string, string>): string => {
  const lowercasePrompt = prompt.toLowerCase();
  
  // Check for specific app types in the prompt
  if (lowercasePrompt.includes("countdown timer") || 
      lowercasePrompt.includes("countdown app") || 
      lowercasePrompt.includes("timer component") ||
      lowercasePrompt.includes("timer app") ||
      lowercasePrompt.includes("countdown")) {
    return specialImages.countdownTimer;
  }
  
  if (lowercasePrompt.includes("weather application") || 
      lowercasePrompt.includes("weather app") || 
      lowercasePrompt.includes("weather forecast") ||
      lowercasePrompt.includes("weather")) {
    return specialImages.weather;
  }
  
  if (lowercasePrompt.includes("calculator application") || 
      lowercasePrompt.includes("calculator app") || 
      lowercasePrompt.includes("calculator")) {
    return specialImages.calculator;
  }
  
  if (lowercasePrompt.includes("todo application") || 
      lowercasePrompt.includes("todo list") || 
      lowercasePrompt.includes("todo app")) {
    return specialImages.todo;
  }
  
  // Otherwise return a random image from the placeholders
  const randomIndex = Math.floor(Math.random() * placeholders.length);
  return placeholders[randomIndex];
};
