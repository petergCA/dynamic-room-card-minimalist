# Dynamic Room Card Minimalist

A highly customizable Home Assistant Lovelace card for displaying room status with a large icon, rich text labels, and up to 8 entity state indicators. Designed to pair naturally with the [UI Lovelace Minimalist](https://ui-lovelace-minimalist.github.io/UI/) theme.

---

## Features

- Room name, secondary, and tertiary text lines (plain text or HA templates)
- Large decorative room icon with color-coded background circle
- Up to **8 entity indicators** displayed in a configurable grid
- Per-entity icon, color, and state customization
- Background options: solid color circle, custom image, or person entity picture
- Full tap / hold / double-tap action support on the card and individual entities
- Multi-state mode for climate, media player, lock, cover, and more

---

## Installation

### HACS (recommended)

1. Open HACS → **Frontend** → **+ Explore & Download Repositories**
2. Search for **Dynamic Room Card Minimalist** and install it
3. Restart Home Assistant
4. Clear your browser cache / hard refresh

### Manual

1. Copy `dynamic-room-card-minimalist.js` into `config/www/`
2. Add the resource in **Settings → Dashboards → Resources**:
   ```yaml
   url: /local/dynamic-room-card-minimalist.js
   type: module
   ```
3. Restart Home Assistant and hard-refresh your browser

---

## Card Configuration

### Top-Level Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **required** | `custom:dynamic-room-card-minimalist` |
| `name` | string | **required** | Room name displayed as the card title |
| `icon` | string | **required** | MDI icon for the room (e.g. `mdi:sofa`) |
| `card_template` | string | random | Color preset for the icon background. See [Color Presets](#color-presets) |
| `background_type` | string | `color` | Background style: `none`, `color`, `image`, `person` |
| `background_circle_color` | string | — | Override the background circle color (CSS value or template) |
| `background_image` | string | — | URL or template for background image (when `background_type: image`) |
| `background_image_square` | boolean | `false` | Use a square crop instead of circle for the background image |
| `background_person_entity` | string | — | Entity ID of a `person` entity to use their picture as background |
| `secondary` | string | — | Secondary text line below the title — supports HA templates |
| `secondary_color` | string | — | CSS color for the secondary text |
| `secondary_entity` | string | — | Entity to trigger tap/hold actions on the secondary line |
| `secondary_allow_html` | boolean | `false` | Allow HTML in the secondary text |
| `tertiary` | string | — | Third text line — supports HA templates |
| `tertiary_color` | string | — | CSS color for the tertiary text |
| `tertiary_entity` | string | — | Entity to trigger tap/hold actions on the tertiary line |
| `tertiary_allow_html` | boolean | `false` | Allow HTML in the tertiary text |
| `use_template_color_for_title` | boolean | `false` | Apply the card template's text color to the room name |
| `use_template_color_for_secondary` | boolean | `false` | Apply the card template's text color to the secondary line |
| `use_template_color_for_tertiary` | boolean | `false` | Apply the card template's text color to the tertiary line |
| `entity_columns` | integer | `1` | Number of entity columns in the right panel (1 or 2) |
| `entities_reverse_order` | boolean | `false` | Render entities starting from the bottom of the panel |
| `entities` | list | `[]` | List of up to 8 entity items (see [Entity Options](#entity-options)) |
| `tap_action` | action | — | Action on card tap |
| `hold_action` | action | — | Action on card hold |
| `double_tap_action` | action | — | Action on card double-tap |

---

### Entity Options

Each item in the `entities` list supports the following. Set `type: entity` to bind to an HA entity, or `type: template` for fully template-driven indicators.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **required** | `entity` or `template` |
| `entity` | string | — | Entity ID (`type: entity` only) |
| `name` | string | — | Label shown next to the icon |
| `icon` | string | — | MDI icon when the entity/condition is **on/active** |
| `icon_off` | string | — | MDI icon when the entity/condition is **off/inactive** |
| `on_state` | string | — | State value considered "on" for `type: entity` (e.g. `on`, `open`) |
| `condition` | string | — | Template string evaluated as the on/off condition (`type: template`) |
| `color_on` | string/bool | — | Icon color when on. Set `true` to use the entity's light color |
| `color_off` | string | — | Icon color when off |
| `background_color_on` | string | — | Circle background color when on |
| `background_color_off` | string | — | Circle background color when off |
| `use_light_color` | boolean | `false` | Pull icon and background color from the light entity's current color |
| `template_on` | string/list | — | Color preset name(s) to apply when on (e.g. `yellow`) |
| `template_off` | string/list | — | Color preset name(s) to apply when off (e.g. `red`) |
| `show_value` | boolean | `false` | Display the entity state value in a badge below the icon |
| `value_template` | string | — | Template to compute the displayed value when `show_value: true` |
| `use_multi_state` | boolean | `false` | Enable multi-state mode (climate, media player, lock, etc.) |
| `custom_states` | string | — | Comma-separated list of custom state names for multi-state mode |
| `tap_action` | action | — | Action on entity tap |
| `hold_action` | action | — | Action on entity hold |
| `double_tap_action` | action | — | Action on entity double-tap |

---

### Color Presets

The `card_template` option and `template_on` / `template_off` entity options accept any of the following preset names:

`blue` · `lightblue` · `red` · `green` · `lightgreen` · `yellow` · `purple` · `orange` · `pink` · `grey` · `teal`

---

### Action Options

Actions follow the standard HA action format:

```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/living-room
```

Common action types: `none`, `toggle`, `more-info`, `navigate`, `call-service`, `url`

---

## Examples

### 4-Entity Example

A bedroom card with temperature/humidity readouts and four entity indicators in a single column.

```yaml
type: custom:dynamic-room-card-minimalist
name: Bedroom
icon: mdi:bed-king
card_template: blue
background_type: color
use_template_color_for_title: true
use_template_color_for_secondary: true
secondary: "{{ states('sensor.bedroom_temperature') }} °F"
tertiary: "{{ states('sensor.bedroom_humidity') }} %"
tap_action:
  action: none
hold_action:
  action: none
entity_columns: 1
entities:
  - type: entity
    entity: light.bedroom_lights
    name: Ceiling Light
    icon: mdi:lightbulb-on
    icon_off: mdi:lightbulb-outline
    on_state: "on"
    use_light_color: true
    color_on: true
    tap_action:
      action: toggle

  - type: entity
    entity: light.bedroom_lamp
    name: Bedside Lamp
    icon: mdi:lamp
    icon_off: mdi:lamp-outline
    on_state: "on"
    use_light_color: true
    color_on: true
    tap_action:
      action: toggle

  - type: entity
    entity: cover.bedroom_blinds
    name: Blinds
    icon: mdi:blinds-horizontal
    icon_off: mdi:roller-shade-closed
    on_state: open
    color_on: true
    use_light_color: false
    tap_action:
      action: toggle

  - type: entity
    entity: climate.bedroom_thermostat
    name: Thermostat
    icon: mdi:thermostat
    icon_off: mdi:thermostat-off
    on_state: heat
    color_on: true
    use_light_color: false
    show_value: true
    value_template: "{{ state_attr('climate.bedroom_thermostat', 'current_temperature') }}°"
    tap_action:
      action: more-info
```

---

### 8-Entity Example

A living room card with two entity columns showing lights, fan, blinds, and a media player.

```yaml
type: custom:dynamic-room-card-minimalist
name: Living Room
icon: mdi:sofa
card_template: grey
background_type: color
use_template_color_for_title: true
use_template_color_for_secondary: true
secondary: "{{ states('sensor.living_room_temperature') }} °F"
tertiary: "{{ states('sensor.living_room_humidity') }} %"
tap_action:
  action: none
hold_action:
  action: none
entity_columns: 2
entities:
  - type: entity
    entity: light.living_room_lights
    name: Ceiling Lights
    icon: mdi:lightbulb-on
    icon_off: mdi:light-recessed
    on_state: "on"
    use_light_color: true
    color_on: true
    tap_action:
      action: toggle

  - type: entity
    entity: light.living_room_lamp
    name: Lamp
    icon: mdi:lamp-outline
    icon_off: mdi:lamp
    on_state: "on"
    use_light_color: true
    color_on: true
    tap_action:
      action: toggle

  - type: entity
    entity: fan.living_room_fan
    name: Fan
    icon: mdi:ceiling-fan-light
    icon_off: mdi:ceiling-fan
    on_state: "on"
    color_on: true
    use_light_color: false
    tap_action:
      action: toggle

  - type: entity
    entity: cover.living_room_blinds
    name: Blinds
    icon: mdi:blinds-horizontal
    icon_off: mdi:roller-shade-closed
    on_state: open
    color_on: true
    use_light_color: false
    tap_action:
      action: toggle

  - type: entity
    entity: media_player.living_room_tv
    name: TV
    icon: mdi:television-play
    icon_off: mdi:television-off
    on_state: playing
    color_on: true
    use_light_color: false
    tap_action:
      action: more-info

  - type: entity
    entity: switch.living_room_speaker
    name: Speaker
    icon: mdi:speaker-play
    icon_off: mdi:speaker-off
    on_state: "on"
    color_on: true
    use_light_color: false
    tap_action:
      action: toggle

  - type: entity
    entity: binary_sensor.living_room_motion
    name: Motion
    icon: mdi:motion-sensor
    icon_off: mdi:motion-sensor-off
    on_state: "on"
    template_on: green
    use_light_color: false
    tap_action:
      action: none

  - type: entity
    entity: lock.front_door
    name: Front Door
    icon: mdi:lock-open
    icon_off: mdi:lock
    on_state: unlocked
    template_on: red
    template_off: green
    use_light_color: false
    tap_action:
      action: toggle
```

---

## Tips

- **Templates** in `secondary`, `tertiary`, `condition`, and `value_template` use standard [HA Jinja2 templating](https://www.home-assistant.io/docs/configuration/templating/).
- **Entity limit**: The card renders a maximum of 8 entities regardless of how many are defined in the list.
- **`entity_columns: 2`** works best when entity names are short. Use `entity_columns: 1` for longer names.
- **`use_light_color: true`** only has an effect on `light` entities — it reads the current RGB color from the light's attributes.
- **Color presets** (`template_on` / `template_off`) reference the UI Lovelace Minimalist color palette and will automatically pick up your theme's color variables.
