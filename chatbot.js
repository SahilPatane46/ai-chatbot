document.addEventListener('DOMContentLoaded', function () {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicator = document.getElementById('typing-indicator');
    const menuBtn = document.getElementById('menu-btn');
    const attachBtn = document.getElementById('attach-btn');

    // Check if mobile device
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Check for saved theme preference or use system preference
    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Add user message to chat
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message animate__animated animate__fadeIn';
        messageDiv.innerHTML = `
            <div class="flex items-start justify-end">
                <div class="bg-blue-600 text-white p-3 rounded-lg max-w-[70%] md:max-w-[60%]">
                    <p>${message}</p>
                </div>
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        `;
        chatContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Add bot message to chat
    function addBotMessage(message) {
        typingIndicator.classList.add('hidden');

        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message animate__animated animate__fadeIn';
        messageDiv.innerHTML = `
            <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="bg-blue-100 p-3 rounded-lg max-w-[70%] md:max-w-[60%]">
                    <p class="text-gray-800">${message}</p>
                </div>
            </div>
        `;
        chatContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth',
        });
    }

    // Send message to backend
    async function sendMessageToBackend(message) {
        try {
            typingIndicator.classList.remove('hidden');

            // Simulate API call delay for demo purposes
            await new Promise((resolve) => setTimeout(resolve, isMobile ? 800 : 500));

            // For demo, we'll just generate a simple reply
            const reply = generateDemoReply(message);
            addBotMessage(reply);
        } catch (error) {
            console.error('Error:', error);
            addBotMessage("Sorry, I'm having trouble connecting to the server.");
        }
    }

    // Simple reply generation for demo
    function generateDemoReply(message) {
        const lowerCaseMsg = message.toLowerCase();

        if (lowerCaseMsg.includes('hello') || lowerCaseMsg.includes('hi')) {
            return "Hello there! How can I assist you today?";
        } else if (lowerCaseMsg.includes('how are you')) {
            return "I'm just a computer program, but I'm functioning well! How about you?";
        } else if (lowerCaseMsg.includes('bye') || lowerCaseMsg.includes('goodbye')) {
            return "Goodbye! Feel free to come back if you have more questions.";
        } else if (lowerCaseMsg.includes('thank')) {
            return "You're welcome! Is there anything else I can help with?";
        } else if (lowerCaseMsg.includes('name')) {
            return "I'm your friendly AI assistant. You can call me ChatBot!";
        } else if (lowerCaseMsg.includes('mobile') || lowerCaseMsg.includes('phone')) {
            return "Yes, this chat interface is fully responsive and works well on mobile devices!";
        } else if (lowerCaseMsg.includes('responsive')) {
            return "The UI adapts to different screen sizes, from mobile phones to desktop computers.";
        } else {
            const randomResponses = [
                "That's an interesting point. Can you tell me more?",
                "I'm not sure I understand. Could you rephrase that?",
                "I'm still learning. Could you ask me something else?",
                "Let me think about that... Do you have any other questions?",
                "I'm designed to help with general inquiries. What else would you like to know?",
            ];
            return randomResponses[Math.floor(Math.random() * randomResponses.length)];
        }
    }

    // Handle send button click
    sendBtn.addEventListener('click', function () {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            sendMessageToBackend(message);
        }
    });

    // Handle Enter key press
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Menu button for mobile
    menuBtn.addEventListener('click', function () {
        alert('Mobile menu would open here in a full implementation');
    });

    // Attach button
    attachBtn.addEventListener('click', function () {
        alert('File attachment dialog would open here');
    });

    // Focus input on load
    userInput.focus();

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const themeIconLight = document.getElementById('theme-icon-light');

    function toggleTheme() {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            // Switch to light
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            themeIconDark.classList.add('hidden');
            themeIconLight.classList.remove('hidden');
        } else {
            // Switch to dark
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            themeIconLight.classList.add('hidden');
            themeIconDark.classList.remove('hidden');
        }
    }

    // Set initial icon state
    if (document.documentElement.classList.contains('dark')) {
        themeIconLight.classList.add('hidden');
        themeIconDark.classList.remove('hidden');
    } else {
        themeIconDark.classList.add('hidden');
        themeIconLight.classList.remove('hidden');
    }

    // Theme toggle button event
    themeToggle.addEventListener('click', toggleTheme);

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!('theme' in localStorage)) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
                themeIconLight.classList.add('hidden');
                themeIconDark.classList.remove('hidden');
            } else {
                document.documentElement.classList.remove('dark');
                themeIconDark.classList.add('hidden');
                themeIconLight.classList.remove('hidden');
            }
        }
    });
});