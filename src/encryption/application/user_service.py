from ..ports.encryption_ports import EncryptionPort

class UserService:
    def __init__(self, encryption_port: EncryptionPort):
        self.encryption_port = encryption_port

    def create_user(self, password: str):
        hashed_password = self.encryption_port.hash_password(password)
        # Guardar el hashed_password en la base de datos...

    def login_user(self, password: str, stored_hashed_password: str):
        if self.encryption_port.verify_password(password, stored_hashed_password):
            # Inicio de sesión exitoso
            return True
        else:
            # Fallo en el inicio de sesión
            return False
