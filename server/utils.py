import structlog
from flask import request

structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ],
)

logger = structlog.get_logger()

def log_request(response):
    logger.info(
        "request_processed",
        method=request.method,
        path=request.path,
        status_code=response.status_code,
        user_agent=request.headers.get("User-Agent"),
    )
    return response