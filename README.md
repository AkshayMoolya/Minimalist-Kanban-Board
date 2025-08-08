# 🎯 Kanban Board Application

A modern, responsive Kanban board built with React, Vite, and Tailwind CSS. Features drag-and-drop functionality, task management, subtasks, due dates, and persistent storage.

## 🚀 Live Demo

The application is currently running at: `http://localhost:3000`

## ✨ Features

- **📋 Four Columns**: Not Started, In Progress, Blocked, Done
- **🔄 Drag & Drop**: Move tasks between columns with smooth animations
- **📝 Task Management**: Create, edit, and delete tasks
- **✅ Subtasks**: Add and manage subtasks with completion tracking
- **📅 Due Dates**: Set due dates with color-coded status indicators
- **💾 Persistent Storage**: Automatically saves to browser localStorage
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS styling

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3.1** - UI library for building user interfaces
- **Vite 5.1.6** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework

### Key Libraries
- **@dnd-kit/core 6.1.0** - Drag and drop functionality
- **@dnd-kit/sortable 8.0.0** - Sortable drag and drop utilities
- **@dnd-kit/utilities 3.2.2** - Helper utilities for dnd-kit
- **lucide-react 0.344.0** - Beautiful icons library
- **date-fns 3.3.1** - Date manipulation and formatting

### Development Tools
- **ESLint 8.57.0** - Code linting and quality
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - Automatic CSS vendor prefixes

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kanban-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 🗂️ Project Structure

```
src/
├── components/           # React components
│   ├── KanbanBoard.jsx # Main board component
│   ├── KanbanColumn.jsx # Column component
│   ├── TaskCard.jsx    # Individual task card
│   └── TaskModal.jsx   # Task creation/edit modal
├── types/              # Type definitions and factories
│   └── index.js       # Column types and task factories
├── utils/             # Utility functions
│   ├── storage.js     # localStorage management
│   └── dateUtils.js   # Date formatting utilities
├── App.jsx            # Root application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Customization

### Adding New Columns

1. **Update ColumnType in `src/types/index.js`**:
   ```javascript
   export const ColumnType = {
     NOT_STARTED: 'Not Started',
     IN_PROGRESS: 'In Progress',
     BLOCKED: 'Blocked',
     DONE: 'Done',
     YOUR_NEW_COLUMN: 'Your New Column' // Add this
   }
   ```

2. **Add corresponding colors in ColumnColors**:
   ```javascript
   export const ColumnColors = {
     [ColumnType.NOT_STARTED]: 'bg-gray-100 border-gray-300',
     [ColumnType.IN_PROGRESS]: 'bg-blue-100 border-blue-300',
     [ColumnType.BLOCKED]: 'bg-red-100 border-red-300',
     [ColumnType.DONE]: 'bg-green-100 border-green-300',
     [ColumnType.YOUR_NEW_COLUMN]: 'bg-purple-100 border-purple-300' // Add this
   }
   ```

3. **Update initial state in KanbanBoard.jsx**:
   ```javascript
   const [columns, setColumns] = useState({
     [ColumnType.NOT_STARTED]: [],
     [ColumnType.IN_PROGRESS]: [],
     [ColumnType.BLOCKED]: [],
     [ColumnType.DONE]: [],
     [ColumnType.YOUR_NEW_COLUMN]: [] // Add this
   });
   ```

### Styling Customization

The application uses Tailwind CSS classes throughout. You can customize:

- **Colors**: Modify classes in `ColumnColors` object
- **Spacing**: Adjust Tailwind spacing utilities
- **Typography**: Update font sizes and weights
- **Animations**: Customize drag and drop animations

### Adding New Features

#### New Task Properties
1. **Update Task factory function** in `src/types/index.js`
2. **Update TaskModal** to include new input fields
3. **Update TaskCard** to display new properties
4. **Update storage functions** if needed

#### Custom Icons
1. **Import from lucide-react**:
   ```javascript
   import { YourIcon } from 'lucide-react'
   ```
2. **Use in components** with appropriate styling

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📱 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   # Kill process on port 3000 (Windows)
   npx kill-port 3000
   
   # Or use a different port
   npm run dev -- --port 3001
   ```

2. **Module not found errors**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **localStorage issues**
   - Clear browser cache
   - Check browser console for errors
   - Ensure localStorage is enabled

### Development Tips

- **Hot Reload**: Changes are automatically reflected in the browser
- **Browser DevTools**: Use React DevTools extension for debugging
- **Console Logs**: Check browser console for any warnings or errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


