from printer.ports.webhook_port import WebhookPort
import requests

class WebhookAdapter(WebhookPort):
    def __init__(self, webhook_url):
        self.webhook_url = webhook_url

    def send_status(self, status_event):
        payload = status_event.dict()
        response = requests.post(self.webhook_url, json=payload)
        response.raise_for_status()
        return response.json()
