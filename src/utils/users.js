// Simple user database with credentials
// In a real application, this would be on a backend server with password hashing
export const users = [
  {
    id: 1,
    username: 'john_doe',
    password: 'password123',
    email: 'john@example.com',
    fullName: 'John Doe'
  },
  {
    id: 2,
    username: 'jane_smith',
    password: 'securepass456',
    email: 'jane@example.com',
    fullName: 'Jane Smith'
  },
  {
    id: 3,
    username: 'demo',
    password: 'demo123',
    email: 'demo@example.com',
    fullName: 'Demo User'
  },
  {
    id: 4,
    username: 'alex_mental',
    password: 'mindful2024',
    email: 'alex@example.com',
    fullName: 'Alex Chen'
  }
]

/**
 * Authenticate user with username and password
 * @param {string} username - The username entered by user
 * @param {string} password - The password entered by user
 * @returns {object|null} - User object if credentials match, null otherwise
 */
export const authenticateUser = (username, password) => {
  const user = users.find(u => u.username === username)
  
  if (user && user.password === password) {
    // Return user object without password
    const { password: _, ...safeUser } = user
    return safeUser
  }
  
  return null
}

/**
 * Get user by username (for registration checking, etc.)
 */
export const getUserByUsername = (username) => {
  return users.find(u => u.username === username)
}
