from twilio.rest import Client
from ..ports.messaging_ports import MessagingPort
from ..domain.messaging_domain import SMSRequest
from encryption.adapters.encryption_adapter import EncryptionAdapter
from encryption.application.user_service import UserService

from dotenv import load_dotenv
import os

encryption_adapter = EncryptionAdapter()
user_service = UserService(encryption_adapter)

load_dotenv()

class TwilioAdapter(MessagingPort):
    def __init__(self):
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.client = Client(account_sid, auth_token)
        self.phone_number = os.getenv("TWILIO_PHONE_NUMBER")


    def send_sms(self, sms_request: SMSRequest) -> str:
        message = self.client.messages.create(
            body=sms_request.message,
            from_=self.phone_number,
            to=sms_request.to
        )
        return message.sid
