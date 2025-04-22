
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/agentica-org/DeepCoder-14B-Preview";

const mockResponses: Record<string, string> = {
  "default": `function helloWorld() {
  console.log("Hello, world!");
}

helloWorld();`,
  "Build a dark-themed dashboard with Tailwind": `// Dark-themed dashboard with Tailwind CSS
import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Users</h2>
            <p className="text-3xl font-bold">1,245</p>
            <p className="text-green-400 mt-2">↑ 12% from last week</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Revenue</h2>
            <p className="text-3xl font-bold">$42,500</p>
            <p className="text-green-400 mt-2">↑ 8% from last month</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Conversion</h2>
            <p className="text-3xl font-bold">3.2%</p>
            <p className="text-red-400 mt-2">↓ 1% from yesterday</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Traffic</h2>
            <p className="text-3xl font-bold">14,281</p>
            <p className="text-green-400 mt-2">↑ 5% from yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  "Explain this TypeScript error": `/*
TypeScript Error Explanation:

Error: Type '{ id: number; name: string; completed: boolean; }[]' is not assignable to type 'Todo[]'.
  Property 'dueDate' is missing in type '{ id: number; name: string; completed: boolean; }' but required in type 'Todo'.

This error occurs when you're trying to assign an array of objects to a variable or parameter that expects an array of 'Todo' type objects.

The 'Todo' interface likely has a required 'dueDate' property:

interface Todo {
  id: number;
  name: string;
  completed: boolean;
  dueDate: Date; // This property is required
}

But you're providing objects without the 'dueDate' property:

const todos = [
  { id: 1, name: "Buy groceries", completed: false },
  { id: 2, name: "Clean house", completed: true }
];

Solution:
1. Add the missing 'dueDate' property to each object:

const todos: Todo[] = [
  { id: 1, name: "Buy groceries", completed: false, dueDate: new Date() },
  { id: 2, name: "Clean house", completed: true, dueDate: new Date() }
];

2. Or make 'dueDate' optional in the Todo interface:

interface Todo {
  id: number;
  name: string;
  completed: boolean;
  dueDate?: Date; // Optional property (note the ?)
}
*/`,
  "Create a login form with validation": `import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()\\[\\]\\.,;:\\s@"]+(\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@(([^<>()\\[\\]\\.,;:\\s@"]+\.)+[^<>()\\[\\]\\.,;:\\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ email: '', password: '' });
    
    // Validate inputs
    let valid = true;
    const newErrors = { email: '', password: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }
    
    setErrors(newErrors);
    
    if (valid) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted successfully', { email, password });
        setIsSubmitting(false);
        // Here you would normally redirect or show success message
      }, 1000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={\`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 \${
              errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }\`}
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={\`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 \${
              errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }\`}
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">
          Forgot password?
        </a>
      </div>
    </div>
  );
}

export default LoginForm;`,
  "Build a collapsible sidebar in React": `import React, { useState } from 'react';
import { ChevronLeft, Menu, Home, Settings, Users, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={\`bg-gray-800 text-white transition-all duration-300 \${
          isCollapsed ? 'w-16' : 'w-64'
        }\`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && <h1 className="text-xl font-semibold">Dashboard</h1>}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-700"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="p-2">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <Home size={20} />
                {!isCollapsed && <span className="ml-3">Home</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <Users size={20} />
                {!isCollapsed && <span className="ml-3">Users</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <Settings size={20} />
                {!isCollapsed && <span className="ml-3">Settings</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <HelpCircle size={20} />
                {!isCollapsed && <span className="ml-3">Help</span>}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Main Content</h2>
        <p>This is the main content area. It expands to fill the available space.</p>
      </div>
    </div>
  );
};

export default Sidebar;`,
  "Refactor this function to be more readable": `// Original function
// function calc(a,b,c,t){let r;if(t==='add'){r=a+b+c}else if(t==='subtract'){r=a-b-c}else if(t==='multiply'){r=a*b*c}else if(t==='divide'){if(b===0||c===0)throw new Error('Cannot divide by zero');r=a/b/c}else{throw new Error('Invalid operation')}return r;}

// Refactored function
/**
 * Performs arithmetic operations on three numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {number} c - Third number
 * @param {string} operation - One of: 'add', 'subtract', 'multiply', 'divide'
 * @returns {number} - Result of the operation
 * @throws {Error} - When attempting to divide by zero or using invalid operation
 */
function calculate(a, b, c, operation) {
  switch (operation) {
    case 'add':
      return a + b + c;
      
    case 'subtract':
      return a - b - c;
      
    case 'multiply':
      return a * b * c;
      
    case 'divide':
      if (b === 0 || c === 0) {
        throw new Error('Cannot divide by zero');
      }
      return a / b / c;
      
    default:
      throw new Error('Invalid operation. Use: add, subtract, multiply, or divide');
  }
}

// Example usage:
// try {
//   const result = calculate(10, 5, 2, 'divide');
//   console.log(result); // 1
// } catch (error) {
//   console.error(error.message);
// }`,
  "Generate SEO metadata for a blog post": `/**
 * SEO Metadata for Blog Post: "10 Essential Tips for Remote Work Productivity"
 *
 * HTML Head Tags:
 */

// Title tag (50-60 characters)
<title>10 Essential Tips for Remote Work Productivity | WorkSmarter Blog</title>

// Meta description (150-160 characters)
<meta 
  name="description" 
  content="Discover 10 proven strategies to boost your remote work productivity. Learn how to create an effective workspace, maintain work-life balance, and stay motivated."
/>

// Canonical URL
<link rel="canonical" href="https://www.worksmarter.com/blog/remote-work-productivity-tips" />

// Open Graph tags for social sharing
<meta property="og:type" content="article" />
<meta property="og:title" content="10 Essential Tips for Remote Work Productivity" />
<meta property="og:description" content="Discover proven strategies to boost your remote work productivity. Learn workspace optimization, work-life balance, and motivation techniques." />
<meta property="og:image" content="https://www.worksmarter.com/images/remote-work-tips-cover.jpg" />
<meta property="og:url" content="https://www.worksmarter.com/blog/remote-work-productivity-tips" />
<meta property="og:site_name" content="WorkSmarter Blog" />

// Twitter Card tags
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="10 Essential Tips for Remote Work Productivity" />
<meta name="twitter:description" content="Discover proven strategies to boost your remote work productivity. Learn workspace optimization, work-life balance, and motivation techniques." />
<meta name="twitter:image" content="https://www.worksmarter.com/images/remote-work-tips-cover.jpg" />
<meta name="twitter:site" content="@WorkSmarterBlog" />

// Article specific metadata
<meta property="article:published_time" content="2023-04-15T09:00:00+00:00" />
<meta property="article:author" content="Sarah Johnson" />
<meta property="article:section" content="Productivity" />
<meta property="article:tag" content="Remote Work" />
<meta property="article:tag" content="Productivity" />
<meta property="article:tag" content="Work From Home" />
<meta property="article:tag" content="Time Management" />

/**
 * JSON-LD Structured Data for Article
 */
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "10 Essential Tips for Remote Work Productivity",
  "image": "https://www.worksmarter.com/images/remote-work-tips-cover.jpg",
  "author": {
    "@type": "Person",
    "name": "Sarah Johnson"
  },
  "publisher": {
    "@type": "Organization",
    "name": "WorkSmarter Blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.worksmarter.com/logo.png"
    }
  },
  "datePublished": "2023-04-15T09:00:00+00:00",
  "dateModified": "2023-04-17T14:30:00+00:00",
  "description": "Discover 10 proven strategies to boost your remote work productivity. Learn how to create an effective workspace, maintain work-life balance, and stay motivated.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.worksmarter.com/blog/remote-work-productivity-tips"
  },
  "keywords": ["Remote Work", "Productivity", "Work From Home", "Time Management"]
}
</script>`
};

export async function generateCode(prompt: string) {
  try {
    // First, try to use the Hugging Face API
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      // If the API call fails, fall back to mock responses
      console.warn("Falling back to mock responses due to API error");
      
      // Check if we have a specific mock response for this prompt
      for (const key in mockResponses) {
        if (prompt.toLowerCase().includes(key.toLowerCase())) {
          return mockResponses[key];
        }
      }
      
      return mockResponses["default"];
    }

    const result = await response.json();
    return result[0].generated_text;
    
  } catch (error) {
    console.error('Error generating code:', error);
    // Fallback to mock responses on error
    return mockResponses["default"];
  }
}
