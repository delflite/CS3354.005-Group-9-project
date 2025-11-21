# Skill Swap App

SkillSwap is a community driven mobile app designed to bring people together through shared learning. Users can list the skills they already have and the skills they want to learn, allowing the platform to match them with others who share similar interests.

Beyond skill sharing, SkillSwap also serves as a social platform where people can connect, collaborate, and grow together. Whether users want to teach, learn, or simply meet new people, the app creates a space where time is spent productively and meaningfully.

SkillSwap is built as a React Native mobile application using Expo Router, enabling fast, seamless navigation and cross-platform performance. Users can create an account, authenticate, and maintain a personalized skill portfolio with proof images showcasing their abilities..

## Project Overview

SkillSwap App is a application that enables users to:
- Register and authenticate securely
- Add skills with image proof 
- Manage their skill portfolio
- View their profile

## Features Implemented 
- **User Authentication**: Secure login and registration with email validation
- **Skill Management**: Add, view, and manage skills with images
- **Image Upload**: Upload immages to represent skills (.png, .jpeg, .jpg) up to 5MB
- **Form Validation**: Comprehensive input validation for all user inputs
- **Cross Platform**: Runs on iOS, Android, and Web

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router v6
- **Backend**: Appwrite 
- **Storage**: Appwrite Storage for image uploads
- **State Management**: React Context API
- **Testing**: Jest & React Native Testing Library
- **Language**: JavaScript (JSX)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download) (v18 or higher)
- npm or yarn package manager
- [Expo CLI](https://docs.expo.dev/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)
- [Git](https://git-scm.com/)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/delflite/CS3354.005-Group-9-project.git
   cd CS3354.005-Group-9-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Appwrite**
   - Create an [Appwrite](https://appwrite.io/) project
   - Set up authentication
   - Create a storage bucket for skill images
   - Create a database for user skills
   - Update the Appwrite configuration in `lib/appwrite.js` with your project credentials

4. **Start the development server**
   ```bash
   npm start
   ```

5. **How to run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator, `w` for web

## Commands for running the project 

- `npm start` - start the Expo development server
- `npm run android` - run on android device/emulator
- `npm run ios` - run on iOS simulator (macOS only)
- `npm run web` - run in web browser
- `npm test` - run Jest tests


### Email Validation
- Must contain "@" symbol
- Cannot contain spaces
- Required field

### Password Validation
- 8-20 characters long
- At least one uppercase letter
- At least one number
- At least one special character
- No spaces allowed

### Skill Name Validation
- 3-50 characters long
- Letters and spaces only
- No numbers or special characters
- Required field

### Skill Proof Image Validation
- File formats: .png, .jpeg, or .jpg
- Maximum file size is 5MB
- Required field

## Testing

The project includes comprehensive unit tests for validation logic:

```bash
npm test
```

**Test Coverage:**
- Login form validation
- Registration form validation
- Skill creation validation
- Image upload validation

Test files are located in the `/tests` directory and use Jest with React Native Testing Library.

## Security Features

- Secure authentication with Appwrite
- Password strength requirements
- Email validation
- File type and size validation
- Protected routes (auth required)

## Documentation & Resources

### Official Documentation
- [Node.js Download](https://nodejs.org/en/download)
- [Expo Documentation](https://docs.expo.dev/)
- [Appwrite Documentation](https://appwrite.io/docs)
- [React Native Getting Started](https://reactnative.dev/docs/getting-started)
- [Jest React Native Testing](https://jestjs.io/docs/tutorial-react-native)
- [React Native Testing Overview](https://reactnative.dev/docs/testing-overview)

### Tutorials
- [React Native Tutorial Series](https://www.youtube.com/watch?v=J2j1yk-34OY&list=PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2) - YouTube playlist followed for initial setup



