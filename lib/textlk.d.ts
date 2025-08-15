export interface SendSMSParams {
  phoneNumber: string;
  message: string;
  senderId?: string;
  apiToken?: string;
}

export interface SendSMSResponse {
  success: boolean;
  result?: any;
  error?: string;
}

export declare function sendSMS(params: SendSMSParams): Promise<SendSMSResponse>;
