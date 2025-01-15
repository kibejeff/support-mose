interface MpesaResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

// This should be your backend API endpoint that handles the M-PESA integration
const MPESA_API_ENDPOINT = 'https://your-backend-url/api/mpesa/stkpush';

export const initiateMpesaPayment = async (phoneNumber: string, amount: number): Promise<MpesaResponse> => {
  try {
    // Format phone number to include country code if it doesn't start with 254
    const formattedPhone = phoneNumber.startsWith('254') 
      ? phoneNumber 
      : `254${phoneNumber.substring(1)}`;

    const response = await fetch(MPESA_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: formattedPhone,
        amount: Math.ceil(amount),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Payment initiation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('M-PESA payment error:', error);
    throw new Error('Failed to initiate M-PESA payment. Please try again or contact support.');
  }
};