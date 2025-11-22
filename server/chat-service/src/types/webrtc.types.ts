export interface WebRTCCallOfferPayload {
  type: "call-offer";
  data: {
    callId: string;
    fromUserId: string;
    toUserId: string;
    offer: RTCSessionDescriptionInit;
    timestamp: Date;
  };
}

export interface WebRTCCallAnswerPayload {
    callId: string;
    answer: RTCSessionDescriptionInit;
    targetUserId: string;
}

export interface WebRTCCallIceCandidatePayload {
    callId: string;
    candidate: RTCIceCandidateInit;
    targetUserId: string;
}

export interface WebRTCCallRingingPayload {
    callId: string;
    targetUserId: string;
}

export interface WebRTCCallMutePayload {
    callId: string;
    targetUserId: string;
    isMuted: boolean;
}

export interface WebRTCRejectCallPayload {
    callId: string;
    targetUserId: string;
    reason?: string;
}

export interface WebRTCCallEndPayload {
    callId: string;
    targetUserId: string;
    reason?: string;
}
