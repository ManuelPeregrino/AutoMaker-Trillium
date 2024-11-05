from ..ports.printer_port import PrinterPort
from ..ports.webhook_port import WebhookPort
from ..domain.printer_domain import TemperatureControl, MovementControl, PrinterState

class PrinterService:
    def __init__(self, printer_port: PrinterPort, webhook_port: WebhookPort):
        self.printer_port = printer_port
        self.webhook_port = webhook_port

    def get_status(self) -> PrinterState:
        return self.printer_port.get_printer_status()
    
    def set_temperature(self, temp_control: TemperatureControl):
        self.printer_port.set_temperature(temp_control)
        status = self.get_status()
        self.send_status_update(status, temp_control)

    def move(self, movement: MovementControl):
        self.printer_port.move_printer(movement)
        status = self.get_status()
        self.send_status_update(status)

    def send_status_update(self, printer_state: PrinterState, temp_control: TemperatureControl = None):
        # Generar el evento de estado y enviarlo al webhook
        if temp_control:
            event = printer_state.to_event(temp_control)
        else:
            event = printer_state.to_event(TemperatureControl())  # Solo estado sin temperatura

        self.webhook_port.send_status(event)
