export interface Message {
    id: number
    senderUserName: string
    senderId: number
    recipientId: number
    senderPhotoUrl: string
    recipientPhotoUrl: string
    recipientUsername: string
    content: string
    dateRead?: Date
    messageSent: Date
  }
  