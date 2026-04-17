# 🌿 Kumusta AI - React Version

Your mental health chatbot is now built with **React**! Here's how to get started.

## 📦 Prerequisites

- **Node.js** (v16 or higher) - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### Step 1: Install Dependencies

Open PowerShell in this directory and run:

```powershell
npm install
```

This will install React, React Router, and Vite (the build tool).

### Step 2: Start Development Server

```powershell
npm run dev
```

The app will automatically open at **http://localhost:3000**

The server includes hot reload - changes you make to files will appear instantly in the browser!

### Step 3: Build for Production

When you're ready to deploy:

```powershell
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 📁 Project Structure

```
CS ELECTIVE CHATBOT FILES/
├── index.html                 # Main HTML entry point
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Main app component with routing
│   ├── style.css            # All styling (same as before)
│   ├── components/
│   │   └── Navbar.jsx       # Navigation component
│   ├── pages/
│   │   ├── Home.jsx         # Home page
│   │   ├── Chatbot.jsx      # Chatbot page
│   │   └── Progress.jsx     # Progress tracking page
│   └── utils/
│       ├── data.js          # All data (moods, quotes, breathing exercises)
│       └── storage.js       # Local storage utilities
├── style.css                 # Original CSS (for reference)
├── script.js                 # Original JS (for reference)
├── chatbot.html             # Original HTML (for reference)
├── progress.html            # Original HTML (for reference)
└── README.md                # This file
```

## 🎯 What's New in React?

✅ **Component-Based:** Each page is now a separate React component  
✅ **State Management:** Using React hooks (useState, useRef, useEffect)  
✅ **Routing:** React Router for navigation between pages  
✅ **Hot Reload:** Changes appear instantly during development  
✅ **Same Functionality:** All features work exactly as before  
✅ **Same Styling:** All CSS is preserved  

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production version |
| `npm run preview` | Preview the production build locally |

## 📝 Project Layout

**Components** organize the UI:
- `Navbar.jsx` - Navigation between pages
- `Home.jsx` - Welcome page with features
- `Chatbot.jsx` - Main chatbot interface
- `Progress.jsx` - Mood tracking and statistics

**Utils** handle data and storage:
- `data.js` - All constants (moods, quotes, breathing exercises)
- `storage.js` - Local storage helper functions

**State Management:**
- Each page manages its own state with hooks
- Data persists using browser's localStorage (same as before)

## 💡 Tips

- **Mood Data:** All mood data is the same as the HTML version
- **Breathing Exercises:** Three exercises available - Basic, Box Breathing, 4-7-8 Technique
- **Local Storage:** Your data persists even after closing the browser
- **Responsive:** The app works on desktop, tablet, and mobile

## 🐛 Troubleshooting

### "npm: The term 'npm' is not recognized"
- Node.js might not be installed. Download from nodejs.org

### "Module not found" errors
- Run `npm install` again to make sure all dependencies are installed

### Port 3000 is already in use
- Edit `vite.config.js` and change the port number in the `server` section

### Hot reload not working
- Try stopping the server (Ctrl+C) and running `npm run dev` again

## 🎨 Customization

The React components make it easy to customize:

1. **Add new pages:** Create new files in `src/pages/`
2. **Add components:** Create new files in `src/components/`
3. **Update styling:** Edit `src/style.css`
4. **Modify data:** Update `src/utils/data.js`

## 📚 React Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

## 💚 Features

✅ Mood tracking with emotional support  
✅ AI chatbot for mental health conversations  
✅ Multiple breathing exercises  
✅ Progress visualization with statistics  
✅ Daily inspirational quotes  
✅ Wellness tips and suggestions  
✅ Streak counter for daily check-ins  
✅ Responsive design  

---

Ready to develop? Run `npm run dev` and start building! 🚀

Remember: It's okay to not be okay. 💚
