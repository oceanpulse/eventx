# Third-Party Integration Documentation

## Table of Contents
1. [RainbowKit Integration](#rainbowkit-integration)
2. [Avalanche Network](#avalanche-network)
3. [IPFS Image Storage](#ipfs-image-storage)
4. [Block Explorer API](#block-explorer-api)

## RainbowKit Integration

### Overview
RainbowKit provides wallet connection and authentication services.

### Configuration
```typescript
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
const chains = [avalancheFuji]

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'DappEventX', chains })
    ]
  }
])
```

### Authentication Endpoints
- **Connect Wallet**
  - Method: `POST`
  - Endpoint: `/api/auth/request-message`
  - Rate Limit: 100 requests/hour
  - Response Format:
    ```json
    {
      "success": boolean,
      "message": string,
      "signature": string
    }
    ```

### Error Handling
```typescript
try {
  await connect()
} catch (error) {
  if (error.code === 4001) {
    // User rejected connection
  } else if (error.code === -32002) {
    // Pending request
  }
}
```

## Avalanche Network

### RPC Configuration
- **Endpoint**: `https://api.avax-test.network/ext/bc/C/rpc`
- **Chain ID**: 43113
- **Rate Limits**: 
  - Free tier: 100 requests/second
  - Premium: Unlimited

### API Methods
```typescript
// Transaction Broadcasting
POST /ext/bc/C/rpc
Content-Type: application/json
{
  "jsonrpc": "2.0",
  "method": "eth_sendRawTransaction",
  "params": [signedTx],
  "id": 1
}
```

### Error Codes
- `32000`: Invalid input
- `32001`: Resource not found
- `32002`: Rate limit exceeded

## IPFS Image Storage

### Endpoint Configuration
```typescript
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'
const IPFS_API = 'https://api.ipfs.io/api/v0/'
```

### Upload Methods
- **Add File**
  - Endpoint: `POST /api/v0/add`
  - Max Size: 100MB
  - Rate Limit: 50 uploads/minute
  - Response:
    ```json
    {
      "Hash": "Qm...",
      "Size": "number",
      "Name": "string"
    }
    ```

### Error Handling
```typescript
try {
  const response = await uploadToIPFS(file)
  return `ipfs://${response.Hash}`
} catch (error) {
  if (error.status === 413) {
    // File too large
  } else if (error.status === 429) {
    // Rate limit exceeded
  }
}
```

## Block Explorer API

### Snowtrace API
- **Base URL**: `https://api-testnet.snowtrace.io/api`
- **Authentication**: API Key required in header
- **Rate Limits**: 5 calls/second

### Endpoints

#### Get Contract ABI
```typescript
GET /api
  ?module=contract
  &action=getabi
  &address=${contractAddress}
  &apikey=${apiKey}
```

#### Get Transaction Status
```typescript
GET /api
  ?module=transaction
  &action=gettxreceiptstatus
  &txhash=${txHash}
  &apikey=${apiKey}
```

### Response Formats
```typescript
interface ApiResponse {
  status: "0" | "1"
  message: string
  result: any
}
```

### Error Handling
```typescript
const handleApiError = (error: any) => {
  switch (error.status) {
    case 429:
      return 'Rate limit exceeded'
    case 403:
      return 'Invalid API key'
    case 404:
      return 'Resource not found'
    default:
      return 'Unknown error occurred'
  }
}
```

## Usage Guidelines

1. **Rate Limiting**
   - Implement exponential backoff
   - Cache responses where possible
   - Use batch requests when available

2. **Error Recovery**
   - Implement retry mechanisms
   - Log failed requests
   - Provide user feedback

3. **Security**
   - Never expose API keys in client
   - Validate all responses
   - Use HTTPS only