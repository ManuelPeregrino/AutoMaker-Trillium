from ..ports.messaging_ports import MessagingPort
from ..domain.messaging_domain import SMSRequest

class MessagingService:
    def __init__(self, messaging_port: MessagingPort):
        self.messaging_port = messaging_port

    def send_sms(self, sms_request: SMSRequest):
        return self.messaging_port.send_sms(sms_request)