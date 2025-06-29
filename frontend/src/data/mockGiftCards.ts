
export interface GiftCard {
  id: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  message: string;
  amount: number;
  currency: string;
  image: string;
  backgroundColor?: string;
  status: 'pending' | 'sent' | 'redeemed';
  createdAt: string;
  expiresAt: string;
}

export const mockGiftCards: GiftCard[] = [
  {
    id: '1',
    recipientName: 'Alex Johnson',
    recipientEmail: 'alex@example.com',
    senderName: 'You',
    message: 'Happy Birthday!',
    amount: 50,
    currency: 'ETH',
    image: 'https://images.unsplash.com/photo-1523837157348-ffbdaccfc7de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VsZWJyYXRpb258ZW58MHx8MHx8fDA%3D',
    backgroundColor: '#4f46e5',
    status: 'sent',
    createdAt: '2023-10-15T10:00:00Z',
    expiresAt: '2024-10-15T10:00:00Z',
  },
  {
    id: '2',
    recipientName: 'Sam Smith',
    recipientEmail: 'sam@example.com',
    senderName: 'You',
    message: 'Congratulations!',
    amount: 100,
    currency: 'BTC',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2VsZWJyYXRpb258ZW58MHx8MHx8fDA%3D',
    backgroundColor: '#16a34a',
    status: 'redeemed',
    createdAt: '2023-09-05T14:30:00Z',
    expiresAt: '2024-09-05T14:30:00Z',
  },
  {
    id: '3',
    recipientName: 'Jamie Lee',
    recipientEmail: 'jamie@example.com',
    senderName: 'You',
    message: 'Happy Holidays!',
    amount: 25,
    currency: 'SOL',
    image: 'https://images.unsplash.com/photo-1481162854517-d9e353af153d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNocmlzdG1hc3xlbnwwfHwwfHx8MA%3D%3D',
    backgroundColor: '#dc2626',
    status: 'pending',
    createdAt: '2023-12-20T09:00:00Z',
    expiresAt: '2024-12-20T09:00:00Z',
  },
  {
    id: '4',
    recipientName: 'Casey Morgan',
    recipientEmail: 'casey@example.com',
    senderName: 'You',
    message: 'Thank you!',
    amount: 75,
    currency: 'USDC',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhbmslMjB5b3V8ZW58MHx8MHx8fDA%3D',
    backgroundColor: '#2563eb',
    status: 'sent',
    createdAt: '2023-11-10T16:45:00Z',
    expiresAt: '2024-11-10T16:45:00Z',
  },
  {
    id: '5',
    recipientName: 'Taylor Jones',
    recipientEmail: 'taylor@example.com',
    senderName: 'You',
    message: 'Happy Graduation!',
    amount: 200,
    currency: 'ETH',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JhZHVhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    backgroundColor: '#7c3aed',
    status: 'pending',
    createdAt: '2023-06-15T11:30:00Z',
    expiresAt: '2024-06-15T11:30:00Z',
  },
  {
    id: '6',
    recipientName: 'Robin Kim',
    recipientEmail: 'robin@example.com',
    senderName: 'You',
    message: 'Happy Wedding Day!',
    amount: 300,
    currency: 'BTC',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D',
    backgroundColor: '#ec4899',
    status: 'redeemed',
    createdAt: '2023-08-22T13:15:00Z',
    expiresAt: '2024-08-22T13:15:00Z',
  }
];
