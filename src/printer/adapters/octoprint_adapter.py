import requests
from ..ports.printer_port import PrinterPort
from ..domain.printer_domain import PrinterState, TemperatureControl, MovementControl
import os

class OctoPrintAdapter(PrinterPort):
    
    def __init__(self):
        self.base_url = os.getenv("OCTOPRINT_URL")
        self.headers = {"X-Api-Key": os.getenv("OCTOPRINT_API_KEY")}

    def get_printer_status(self) -> PrinterState:
        response = requests.get(f"{self.base_url}/printer", headers=self.headers)
        if response.status_code != 200:
            raise Exception("Failed to fetch printer status")
        data = response.json()
        return PrinterState(state=data['state']['text'], temperature=data['temperature'])

    def set_temperature(self, temperature: TemperatureControl):
            requests.post(f"{self.base_url}/printer/tool", headers=self.headers, json={
                "command": "target", "targets": {"tool0": temperature.hotend_temp}
            })
                
            if temperature.bed_temp:
                requests.post(f"{self.base_url}/printer/bed", headers=self.headers, json={
                    "command": "target", "target": temperature.bed_temp
                })


    def move_printer(self, movement: MovementControl) -> None:
        gcode_command = "G0"
        absolute_pos = "G0"
        if movement.x:
            gcode_command += f" X{movement.x}"
        if movement.y:
            gcode_command += f" Y{movement.y}"
        if movement.z:
            gcode_command += f" Z{movement.z}"
        if movement.e:
            absolute_pos += f" E{movement.e}"
        if movement.speed:
            gcode_command += f" F{movement.speed}"

        requests.post(f"{self.base_url}/printer/command", headers=self.headers, json={"commands": [gcode_command, absolute_pos]})

