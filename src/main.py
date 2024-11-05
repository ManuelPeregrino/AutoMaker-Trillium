import os
from fastapi import FastAPI
from dotenv import load_dotenv
from printer.adapters.octoprint_adapter import OctoPrintAdapter
from printer.adapters.webhook_adapter import WebhookAdapter
from printer.application.printer_service import PrinterService
from printer.domain.printer_domain import TemperatureControl, MovementControl
from messaging.adapters.twilio_adapter import TwilioAdapter
from messaging.application.messaging_service import MessagingService
from messaging.domain.messaging_domain import SMSRequest
from encryption.adapters.encryption_adapter import EncryptionAdapter
from encryption.application.user_service import UserService
from pydantic import BaseModel

# Cargar variables del archivo .env
load_dotenv()

# Inicializar la aplicación FastAPI
app = FastAPI()

class UserRequest(BaseModel):
    username: str
    password: str
    email: str
    phone: str

# Inyectar adaptadores y servicios
octoprint_adapter = OctoPrintAdapter()

# Configuración del Webhook
webhook_url = os.getenv("WEBHOOK_URL")  # Asegúrate de definir WEBHOOK_URL en el archivo .env
webhook_adapter = WebhookAdapter(webhook_url)
print("Webhook URL:", webhook_url)  # Solo para verificar que esté cargado

# Inicializar el servicio de impresora con el adaptador de OctoPrint y el adaptador de Webhook
printer_service = PrinterService(octoprint_adapter, webhook_adapter)

twilio_adapter = TwilioAdapter()
messaging_service = MessagingService(twilio_adapter)
encryption_adapter = EncryptionAdapter()
user_service = UserService(encryption_adapter)

# Rutas

@app.get("/printer/status")
def get_printer_status():
    return printer_service.get_status()

@app.post("/printer/set_temperature")
def set_printer_temperature(temp_control: TemperatureControl):
    return printer_service.set_temperature(temp_control)

@app.post("/printer/move")
def move_printer(movement_control: MovementControl):
    return printer_service.move(movement_control)

@app.post("/sms/send")
def send_sms(sms_request: SMSRequest):
    return messaging_service.send_sms(sms_request)

@app.post("/user/create")
def create_user(user: UserRequest):
    return user_service.create_user(user.username, user.password, user.email, user.phone)

@app.get("/test-webhook")
def test_webhook():
    try:
        response = webhook_adapter.send_status(printer_service.get_status())
        return {"message": "Webhook enviado", "response": response}
    except Exception as e:
        return {"error": str(e)}
