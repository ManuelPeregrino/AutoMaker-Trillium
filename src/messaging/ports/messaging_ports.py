from abc import ABC, abstractmethod
from ..domain.messaging_domain import SMSRequest

class MessagingPort(ABC):
    @abstractmethod
    def send_sms(self, sms_request: SMSRequest) -> str:
        pass
