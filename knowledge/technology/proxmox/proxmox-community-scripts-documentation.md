---
title: "Proxmox VE Community Scripts Documentation"
description: "Documentation for Proxmox VE Helper-Scripts Community Edition including data migration, container management, and system administration tools."
category: "Infrastructure"
subcategory: "Virtualization"
product_line: "Desktop Commander"
audience: "System Administrators"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - proxmox
  - virtualization
  - community-scripts
  - containers
  - system-administration
---

# Proxmox VE Community Scripts Documentation

This document contains documentation for the Proxmox VE Helper-Scripts (Community Edition) retrieved from Context7.

**Library ID:** `/community-scripts/proxmoxve`  
**Description:** Proxmox VE Helper-Scripts (Community Edition)  
**Code Snippets:** 9  
**Trust Score:** 6.8

## Data Migration Scripts

The community scripts provide various utilities for copying data between different installations in Proxmox VE environments.

### Home Assistant Migrations

#### Copy Between Home Assistant Container Installations

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/copy-data/home-assistant-container-copy-data-home-assistant-container.sh)"
```

_Copies data from one Home Assistant Container to another Home Assistant Container._

#### Home Assistant Container to Home Assistant Core

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/copy-data/home-assistant-container-copy-data-home-assistant-core.sh)"
```

_Migrates data from a Home Assistant Container to a Home Assistant Core installation._

#### Home Assistant Container to Podman Home Assistant

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/copy-data/home-assistant-container-copy-data-podman-home-assistant.sh)"
```

_Transfers data from a Home Assistant Container to a Podman-based Home Assistant installation._

#### Podman Home Assistant to Home Assistant Container

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/copy-data/podman-home-assistant-copy-data-home-assistant-container.sh)"
```

_Migrates data from a Podman-based Home Assistant installation to a Home Assistant Container._

#### Home Assistant Core to Home Assistant Container

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/copy-data/home-assistant-core-copy-data-home-assistant-container.sh)"
```

_Migrates data from a Home Assistant Core installation to a Home Assistant Container._

#### Copy Between Home Assistant Core Installations

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/copy-data/home-assistant-core-copy-data-home-assistant-core.sh)"
```

_Copies data from one Home Assistant Core installation to another Home Assistant Core installation._

### Media Server Migrations

#### Copy Between Plex Installations

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/copy-data/plex-copy-data-plex.sh)"
```

_Transfers data from one Plex server to another Plex server._

### IoT/Smart Home Migrations

#### Copy Between Zigbee2MQTT Installations

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/copy-data/z2m-copy-data-z2m.sh)"
```

_Copies data from one Zigbee2MQTT installation to another Zigbee2MQTT installation._

#### Migrate from Zwavejs2MQTT to Zwave JS UI

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/tools/copy-data/zwavejs2mqtt-copy-data-zwavejsui.sh)"
```

_Migrates data from a Zwavejs2MQTT installation to a Zwave JS UI installation._

### System Maintenance

#### Update Repository URL for LXC

```bash
bash -c "$(curl -fsSL https://github.com/community-scripts/ProxmoxVE/raw/main/misc/update-repo.sh)"
```

_Updates the repository URL used by Debian/Ubuntu LXC containers to ensure updates pull from the correct source._

## Usage Notes

- All scripts are designed to be executed directly from the Proxmox Shell
- Scripts are fetched directly from the GitHub repository using `curl`
- Each script handles the specific migration path between different installation types
- Scripts are maintained by the community and focus on common migration scenarios

## Source Information

All scripts and documentation are sourced from the [community-scripts/ProxmoxVE](https://github.com/community-scripts/ProxmoxVE) GitHub repository.
