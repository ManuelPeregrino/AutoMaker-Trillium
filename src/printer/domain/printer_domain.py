from pydantic import BaseModel

class TemperatureControl(BaseModel):
    hotend_temp: float = None
    bed_temp: float = None

class PrinterState(BaseModel):
    state: str
    temperature: dict

class MovementControl(BaseModel):
    x: float = None
    y: float = None
    z: float = None
    e: float = None
    speed: float = None
