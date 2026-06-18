# 🎉 Birthday Surprise Journey

A magical interactive birthday surprise experience for your best friend!

## How to Access

### Option 1: Open the HTML File Directly
- Simply open `index.html` in your web browser on any device

### Option 2: Share on Mobile (Same Network)

1. **Find Your Computer's IP Address:**
   - On Windows, open PowerShell and run:
     ```
     ipconfig
     ```
   - Look for "IPv4 Address" under your network (usually starts with 192.168.x.x or 10.x.x.x)

2. **Start a Local Server:**
   
   **Using Python 3:**
   ```
   cd e:\birthday
   python -m http.server 8000
   ```

   **Using Node.js Live Server (if installed):**
   ```
   cd e:\birthday
   npx http-server -p 8000
   ```

   **Using VS Code Live Server Extension:**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

3. **Access from Mobile:**
   - On your mobile device, open a browser
   - Go to: `http://YOUR-IP-ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`

### Option 3: Create a Shareable Link
- Use a service like **ngrok** to expose your local server to the internet:
  ```
  ngrok http 8000
  ```

---

## Features

✨ **Beautiful Birthday Greeting** - Heartfelt opening message  
🎁 **Scratch Cards** - Interactive wishes to reveal  
💌 **Personalized Letter** - Emotional message from the heart  
📸 **Memory Gallery** - Scrapbook-style photos  
🎊 **Final Surprise** - Touching celebration of friendship

---

**Enjoy the magical journey!** ✨
