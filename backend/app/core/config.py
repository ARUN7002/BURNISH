from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Burnish"
    VERSION: str = "1.0.0"

    DATAHUB_URL: str = "http://localhost:8080"
    DATAHUB_TOKEN: str = ""

    class Config:
        env_file = ".env"


settings = Settings()