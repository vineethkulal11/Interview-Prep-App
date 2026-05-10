# Java Interview Prep App

This is a production-ready React Native (Expo) tutorial application designed to help users prepare for Java interviews.

## Features
- **Structured Categories**: Categorizes questions by difficulty (Beginner, Intermediate, Advanced, Scenario-based).
- **Modern UI**: Uses a clean, vibrant color palette, vector icons, and card layouts.
- **Detailed Content**: Provides questions, detailed explanations, and code examples.

## Project Structure
- `src/theme/colors.js`: Global color tokens for the app.
- `src/data/javaQuestions.js`: The mock data representing the database of interview questions.
- `src/navigation/AppNavigator.js`: The stack navigator setting up the screens.
- `src/screens/HomeScreen.js`: The category selection screen.
- `src/screens/CategoryScreen.js`: Lists questions for the selected category.
- `src/screens/QuestionDetailScreen.js`: Shows the full answer and code snippet for the selected question.

## How to Run
Make sure you have Node.js and the Expo CLI installed.
1. Run `npm install`
2. Run `npm start`
3. Scan the QR code with your Expo Go app, or press `a` to run on Android emulator, `i` to run on iOS simulator.
