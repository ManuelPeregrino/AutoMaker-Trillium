from ..ports.encryption_ports import EncryptionPort
from ..domain.encryption_domain import PasswordManager

class EncryptionAdapter(EncryptionPort):
    def hash_password(self, password: str) -> str:
        return PasswordManager.hash_password(password)

    def verify_password(self, password: str, hashed: str) -> bool:
        return PasswordManager.verify_password(password, hashed)
