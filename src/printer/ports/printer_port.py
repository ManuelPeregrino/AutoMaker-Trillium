from abc import ABC, abstractmethod
from ..domain.printer_domain import TemperatureControl, PrinterState, MovementControl

class PrinterPort(ABC):
    @abstractmethod
    def get_printer_status(self) -> PrinterState:
        pass

    @abstractmethod
    def set_temperature(self, temperature:TemperatureControl) -> None:
        pass
    
    @abstractmethod
    def move_printer(self, movement:MovementControl) -> None:
        pass