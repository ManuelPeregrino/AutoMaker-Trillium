from abc import ABC, abstractmethod

class WebhookPort(ABC):
    @abstractmethod
    def send_status(self, status_event):
        pass
