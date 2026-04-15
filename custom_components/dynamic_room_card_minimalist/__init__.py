"""Dynamic Room Card Minimalist — serves the Lovelace card JS from custom_components."""
import os
import logging

from homeassistant.core import HomeAssistant
from homeassistant.components.http import StaticPathConfig

_LOGGER = logging.getLogger(__name__)

DOMAIN = "dynamic_room_card_minimalist"
JS_FILE = "dynamic-room-card-minimalist.js"


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Register the JS file as a static HTTP path."""
    component_dir = os.path.dirname(os.path.abspath(__file__))
    js_path = os.path.join(component_dir, JS_FILE)

    if not os.path.isfile(js_path):
        _LOGGER.error(
            "Dynamic Room Card Minimalist: %s not found in %s. "
            "Run 'npm run build && npm run deploy' in the project directory.",
            JS_FILE,
            component_dir,
        )
        return False

    await hass.http.async_register_static_paths([
        StaticPathConfig(
            f"/{DOMAIN}/{JS_FILE}",
            js_path,
            # cache=False keeps the browser from serving stale builds during
            # development; flip to True once you are done making changes.
            False,
        )
    ])

    _LOGGER.info("Dynamic Room Card Minimalist loaded from custom_components")
    return True
