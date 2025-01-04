# Frontend Architecture Documentation

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Next.js pages and routes
├── services/      # Blockchain and API services
├── store/         # Redux state management
├── utils/         # Helper functions and types
└── hooks/         # Custom React hooks
```

## Key Components

### State Management
- Redux store configuration
- Global state slices
- Action creators and reducers

### Blockchain Integration
- Contract interaction services
- Wallet connection handling
- Transaction management

### Authentication
- RainbowKit integration
- NextAuth.js configuration
- Protected routes