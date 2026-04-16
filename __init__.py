"""Dynamic Room Card Minimalist — serves the Lovelace card JS from custom_components."""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

DOMAIN = "dynamic_room_card_minimalist"
JS_FILE = "dynamic-room-card-minimalist.js"


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Register the Lovelace JS file as a static path."""
    component_dir = Path(__file__).resolve().parent
    js_path = component_dir / JS_FILE

    if not js_path.is_file():
        _LOGGER.error("%s: %s not found in %s", DOMAIN, JS_FILE, component_dir)
        return False

    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                url_path=f"/{DOMAIN}/{JS_FILE}",
                path=str(js_path),
                cache_headers=False,
            )
        ]
    )

    _LOGGER.info("%s loaded from %s", DOMAIN, js_path)
    return True
