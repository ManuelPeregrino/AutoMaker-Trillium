from ..ports.printer_port import PrinterPort
from ..domain.printer_domain import TemperatureControl, MovementControl

class PrinterService:
    def __init__(self, printer_port: PrinterPort):
        self.printer_port = printer_port

    def get_status(self):
        return self.printer_port.get_printer_status()
    
    def set_temperature(self, temp_control: TemperatureControl):
        self.printer_port.set_temperature(temp_control)

    def move(self, movement: MovementControl):
        self.printer_port.move_printer(movement)