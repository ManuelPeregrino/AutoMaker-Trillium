from pydantic import BaseModel

class TemperatureControl(BaseModel):
    hotend_temp: float = None
    bed_temp: float = None

class PrinterState(BaseModel):
    state: str
    temperature: dict

    def to_event(self, temp_control: "TemperatureControl") -> "PrinterStatusEvent":
        return PrinterStatusEvent(state=self, temperature=temp_control)

class MovementControl(BaseModel):
    x: float = None
    y: float = None
    z: float = None
    e: float = None
    speed: float = None

class PrinterStatusEvent(BaseModel):
    state: PrinterState
    temperature: TemperatureControl
