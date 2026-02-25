---
category: technology
format: tutorial
video_url: https://youtu.be/FEDiAHzS0zw
video_title: "Claude Code on your phone in 10 minutes"
channel: NetworkChuck
duration: "9:41"
upload_date: 2026-01-29
analysis_date: 2026-01-30
analysis_focus: step-by-step
analysis_depth: standard
word_count: ~1500
transcript_quality: MEDIUM
key_topics:
  - Claude Code mobile access
  - VPS setup and hardening
  - SSH key authentication
  - tmux session persistence
  - Termius mobile terminal
github_repo: https://github.com/theNetworkChuck/remote-claude-code
packages_tracked: 6
---

# Claude Code on Your Phone in 10 Minutes

**Channel:** NetworkChuck | **Duration:** 9:41 | **Published:** 2026-01-29 | **Views:** 87,585

## Executive Summary

NetworkChuck demonstrates how to run Claude Code from a mobile phone by setting up a "forever terminal" -- a cloud VPS with Claude Code pre-installed, accessed via the Termius mobile SSH client, with tmux providing session persistence across disconnections. The tutorial covers VPS provisioning on Hostinger, three-step server hardening (fail2ban, UFW firewall, SSH key-only authentication), mobile terminal setup with Termius, and tmux configuration for persistent coding sessions.

## Architecture Overview

```
Phone (Termius SSH Client)
    |
    | SSH (port 22, key-based auth)
    |
    v
Cloud VPS (Hostinger / any provider)
    |-- fail2ban (brute force protection)
    |-- UFW firewall (port 22 only)
    |-- SSH key auth (no passwords)
    |-- tmux (session persistence)
    |     |
    |     +-- Claude Code (running inside tmux session)
    |
    [Sessions survive disconnects, sleep, signal loss]
```

**Data Flow:** Phone opens SSH tunnel to VPS via Termius -> tmux maintains persistent terminal session -> Claude Code runs inside tmux -> user can disconnect/reconnect freely without losing work.

## Package & Tool Inventory

| Package/Tool | Category | Role in Tutorial | Required |
|-------------|----------|------------------|----------|
| Claude Code (`@anthropic-ai/claude-code`) | CLI Tool | Core tool -- AI coding assistant running on VPS | Yes |
| Termius | Mobile App | SSH client for phone-to-VPS connection | Yes |
| tmux | System Tool | Terminal multiplexer for session persistence | Yes |
| fail2ban | Security Tool | Blocks brute force SSH attacks automatically | Yes |
| UFW (Uncomplicated Firewall) | Security Tool | Firewall -- restricts to port 22 only | Yes |
| Hostinger VPS (KVM 2) | Service | Cloud VPS provider with Claude Code template | Recommended (any VPS works) |

**Alternative VPS Providers** (from GitHub repo):

| Provider | Price | Notes |
|----------|-------|-------|
| Hostinger | ~$5/mo | Has Claude Code pre-installed template |
| Hetzner | ~$5/mo | Great value, Europe-focused |
| Vultr | ~$12/mo | Fast performance |
| DigitalOcean | ~$6/mo | Developer-friendly |

## Step-by-Step Guide

### Phase 1: VPS Setup (0:00 - 2:34)

**1. Provision a VPS on Hostinger**
```
- Go to hostinger.com/networkchuck
- Select Services > VPS Hosting
- Choose KVM 2 plan (recommended for Claude Code)
- Use coupon code: NETWORKCHUCK
```

**2. Select the Claude Code OS template**
```
- In OS selection, search for "Cloud" (or "Claude")
- Select the Claude Code template (comes pre-installed)
- Set a root password
- Enable free malware scanner
- Wait for provisioning to complete
```

**3. Verify Claude Code works**
```bash
# Access terminal from Hostinger dashboard (top-right button)
claude
# Log in with your Anthropic account
```

### Phase 2: Server Hardening (2:34 - 3:27)

**4. Install and enable fail2ban**
```bash
sudo apt install fail2ban -y
systemctl status fail2ban
# Verify it shows "active (running)"
```

**5. Configure UFW firewall**
```bash
sudo ufw allow 22    # Allow SSH port only
sudo ufw enable      # Activate firewall
ufw status           # Verify rules
```

**6. Disable password authentication** (done after SSH key setup in Phase 3)
```bash
# Modifies both config files for safety:
#   /etc/ssh/sshd_config
#   /etc/ssh/sshd_config.d/*.conf (Hostinger override)
sudo sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' \
  /etc/ssh/sshd_config /etc/ssh/sshd_config.d/*.conf && \
  sudo systemctl restart ssh
```

### Phase 3: Mobile Access with Termius (3:27 - 6:18)

**7. Install Termius on your phone**
```
- Download Termius from App Store / Google Play
- Open app -- no account required (continue without)
- Decline local network access (not needed for public VPS)
```

**8. Add your VPS as a host**
```
- Create new host
- Hostname: Use DNS name or IP from Hostinger dashboard
- Label: "Claude Code"
- Username: root
- Password: (your VPS password)
- Save and connect
- Accept unknown host fingerprint
```

**9. Test Claude Code from phone**
```bash
claude
# It works -- Claude Code running from your phone
```

**10. Generate and export SSH key (replaces password auth)**
```
- In Termius: go to Keychain
- Tap "+" > Generate Key
- Name it (e.g., "my key")
- Long-press the key > Share > Export to Host
- Select your "Claude Code" host
- Edit host: remove password, save
- Reconnect -- now using key-only auth
```

**11. Disable password auth on server** (Step 6 above)
```bash
# Run the sed command from Step 6 after confirming key auth works
# Test: try connecting with password from another device -- should fail
```

### Phase 4: Session Persistence with tmux (6:18 - 9:41)

**12. Install tmux**
```bash
sudo apt install tmux -y
# Likely already installed on most VPS images
```

**13. Start a named tmux session**
```bash
tmux new -s plane     # Start session named "plane"
claude                # Launch Claude Code inside tmux
```

**14. Test persistence**
```
- Start a Claude Code task in tmux
- Kill your Termius connection (or let phone sleep)
- Reconnect to VPS via Termius
- Reattach to session:
```
```bash
tmux a                # Attach to most recent session
# OR
tmux a -t plane       # Attach to specific named session
```

**15. Enable mouse scrolling for mobile**
```bash
echo "set -g mouse on" >> ~/.tmux.conf
tmux source-file ~/.tmux.conf
```

**16. Key tmux commands**

| Command | Action |
|---------|--------|
| `tmux new -s <name>` | Start new named session |
| `tmux a` | Attach to last session |
| `tmux a -t <name>` | Attach to specific session |
| `tmux ls` | List all sessions |
| `Ctrl+B, D` | Detach from session (keeps it running) |

## Production Readiness Checklist

- [x] **VPS provisioning** -- Covered (Hostinger with Claude Code template)
- [x] **Brute force protection** -- Covered (fail2ban)
- [x] **Firewall** -- Covered (UFW, port 22 only)
- [x] **SSH key authentication** -- Covered (Termius key generation + export)
- [x] **Password auth disabled** -- Covered (sed on sshd_config)
- [x] **Session persistence** -- Covered (tmux)
- [x] **Mouse/scroll support** -- Covered (tmux mouse config)
- [ ] **Non-root user** -- NOT covered; tutorial uses root throughout
- [ ] **SSH port change** -- NOT covered; default port 22 used
- [ ] **Automatic updates** -- NOT covered; no unattended-upgrades
- [ ] **Backup/snapshot strategy** -- NOT covered
- [ ] **OAuth/API key setup** -- Mentioned only in GitHub repo troubleshooting
- [ ] **Resource monitoring** -- NOT covered (GitHub repo mentions htop)
- [ ] **Rate limiting on SSH** -- Partially covered via fail2ban

## Key Patterns & Techniques

### "Forever Terminal" Pattern
The core architectural pattern: a cloud VPS that is always on, always accessible, running persistent terminal sessions. The phone is just a thin client SSH window into this persistent environment. This decouples your development environment from any single device.

### Security Hardening Triad
Three-layer security approach: (1) fail2ban for automated brute force blocking, (2) UFW firewall restricting to SSH-only, (3) key-based authentication eliminating passwords entirely. This is a solid baseline for any internet-facing Linux server.

### tmux Session Persistence
The critical enabler for mobile workflows. Without tmux, every phone disconnection (sleep, signal loss, app switch) kills the Claude Code session. With tmux, sessions survive indefinitely on the server, and you simply reattach.

## Tool Comparison

| Tool Used | Alternatives | Trade-offs |
|-----------|-------------|------------|
| Termius (SSH client) | JuiceSSH, Blink Shell, Prompt 3 | Termius is free, cross-platform; Blink Shell is iOS-only but more powerful |
| Hostinger VPS | Hetzner, DigitalOcean, Vultr, Linode | Hostinger has Claude Code pre-installed template; others require manual setup |
| tmux (multiplexer) | screen, Zellij, byobu | tmux is the standard; screen is simpler; Zellij is more modern |
| UFW (firewall) | iptables, nftables, firewalld | UFW is the simplest; iptables is more powerful but complex |

## Quality Assessment

- **Tutorial quality:** GOOD -- Clear, well-paced, beginner-friendly with visual demonstrations
- **Code quality:** GOOD -- Commands are correct and practical; GitHub repo provides clean reference
- **Production readiness:** MEDIUM -- Covers essential security (fail2ban, UFW, SSH keys) but misses non-root user, SSH port change, automatic updates, and monitoring
- **Audience:** Beginners and intermediate developers who want mobile Claude Code access
- **Sponsor integration:** Hostinger is the sponsor; tutorial works with any VPS provider

## GitHub Repo Summary

The companion repository ([theNetworkChuck/remote-claude-code](https://github.com/theNetworkChuck/remote-claude-code)) provides:
- Complete setup commands for manual VPS installation (without Hostinger template)
- Troubleshooting for OAuth issues on headless VPS (SSH port forwarding or API key)
- Quick reference table of tmux commands
- VPS provider comparison with pricing
- MIT licensed
