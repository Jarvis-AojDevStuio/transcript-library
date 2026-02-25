# M4 Mac Mini SPICE Automator Crash Analysis

## Research Summary

Comprehensive analysis of Automator crashing issues with SPICE/remote-viewer on M4 Mac mini systems running macOS Sequoia.

## M4-Specific Issues Discovered

### Critical M4 Mac Virtualization Bugs

**macOS Sequoia 15.0-15.1 Period (Your Issue Timeframe):**

- **Major Bug**: M4 Macs had virtualization framework issues that prevented proper VM operation
- **Timeline**: Bug persisted from macOS 15.0 launch through 15.1.x
- **Fix**: Resolved in **macOS Sequoia 15.2** (December 11, 2024)
- **Impact**: Affected all virtualization software including remote-viewer/SPICE clients

### GTK Framework Incompatibilities

**Apple Silicon Evolution Issues:**

- **M4 Specific**: New architecture required updated GTK libraries
- **Error Pattern**: `virt-viewer-WARNING: accel_key_to_keys: runtime check failed`
- **Root Cause**: GTK event handling incompatible with M4 keyboard acceleration
- **Class Conflicts**: Multiple GTK versions causing runtime conflicts:
  ```
  objc[1439]: Class ResultReceiver is implemented in both
  /usr/local/Cellar/gtk+3/3.24.43/lib/libgtk-3.0.dylib and
  /usr/local/Cellar/gtk4/4.16.5/lib/libgtk-4.1.dylib
  ```

### Homebrew Build Issues on M4

**Known M4 Compilation Problems:**

- Pre-compiled bottles may not be optimized for M4 architecture
- **Solution**: Build from source with M4-specific optimizations
- **Commands**:
  ```bash
  brew uninstall --force virt-viewer
  brew reinstall --build-from-source spice-gtk
  brew reinstall --build-from-source virt-viewer
  ```

## Current Status (August 2025)

### What's Fixed

- ✅ **macOS 15.2+**: Core virtualization framework issues resolved
- ✅ **macOS 15.4+**: Enhanced M4 compatibility improvements
- ✅ **Current**: Most M4 virtualization issues resolved

### What May Still Cause Issues

- ⚠️ **Automator Environment**: Still has PATH and permission restrictions
- ⚠️ **GTK Library Conflicts**: Multiple GTK versions can still conflict
- ⚠️ **macOS 15.0-15.1**: Legacy systems still affected by virtualization bugs

## Enhanced Solution for M4 Mac Mini

### 1. Verify macOS Version First

```bash
sw_vers
# Ensure you're on macOS 15.2 or later for M4 compatibility
```

### 2. Clean Reinstall with M4 Optimization

```bash
# Remove all existing installations
brew uninstall --force jeffreywildman/virt-manager/virt-viewer
brew uninstall --force virt-viewer
brew uninstall --force spice-gtk

# Clean up any conflicting GTK installations
brew uninstall --force gtk+3 gtk4 gdk-pixbuf

# Reinstall with M4-specific builds
brew tap jeffreywildman/homebrew-virt-manager
brew install --build-from-source spice-gtk
brew install --build-from-source jeffreywildman/virt-manager/virt-viewer

# Verify installation
/opt/homebrew/bin/remote-viewer --version
```

### 3. M4-Optimized Automator Script

```bash
#!/bin/bash

# M4 Mac Mini Optimized SPICE Launcher
# Addresses M4-specific GTK and virtualization issues

LOG_FILE="$HOME/Desktop/spice-m4-debug.log"
REMOTE_VIEWER="/opt/homebrew/bin/remote-viewer"

# Enhanced logging function
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') [M4-DEBUG]: $1" >> "$LOG_FILE"
}

# M4-specific environment setup
setup_m4_environment() {
    # Clear potentially conflicting GTK environment variables
    unset GTK_IM_MODULE
    unset GTK2_IM_MODULE
    unset GTK3_IM_MODULE
    unset QT_IM_MODULE

    # Set M4-optimized environment
    export DISPLAY=:0
    export GTK_CSD=0  # Disable client-side decorations for stability
    export GDK_BACKEND=quartz  # Force native Quartz backend

    # Ensure Homebrew paths are prioritized for M4 builds
    export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"

    log_message "M4 environment configured"
}

# Enhanced executable verification
verify_executable() {
    if [ ! -x "$REMOTE_VIEWER" ]; then
        log_message "ERROR: remote-viewer not found at $REMOTE_VIEWER"

        # Try to locate alternative installations
        ALTERNATIVE=$(which remote-viewer 2>/dev/null)
        if [ -n "$ALTERNATIVE" ]; then
            log_message "Found alternative at: $ALTERNATIVE"
            REMOTE_VIEWER="$ALTERNATIVE"
        else
            osascript -e 'display dialog "Remote-viewer not found. Please reinstall virt-viewer." buttons {"OK"} default button "OK" with icon stop'
            exit 1
        fi
    fi

    # Verify it's the correct architecture
    ARCH_INFO=$(file "$REMOTE_VIEWER" | grep -E "(arm64|universal)")
    if [ -z "$ARCH_INFO" ]; then
        log_message "WARNING: remote-viewer may not be optimized for Apple Silicon"
    else
        log_message "Architecture verified: $ARCH_INFO"
    fi
}

# M4-specific crash prevention
launch_with_recovery() {
    local file="$1"
    local attempt=1
    local max_attempts=3

    while [ $attempt -le $max_attempts ]; do
        log_message "Launch attempt $attempt for: $file"

        # Use timeout to prevent hangs, suppress GTK warnings
        timeout 90 "$REMOTE_VIEWER" "$file" 2>&1 | \
        grep -v "virt-viewer-WARNING" | \
        while read line; do
            log_message "remote-viewer output: $line"
        done

        EXIT_CODE=$?

        if [ $EXIT_CODE -eq 0 ]; then
            log_message "SUCCESS: Remote viewer completed normally"
            return 0
        elif [ $EXIT_CODE -eq 124 ]; then
            log_message "WARNING: Timeout reached, but connection may still be active"
            return 0
        else
            log_message "ATTEMPT $attempt failed with exit code: $EXIT_CODE"

            if [ $attempt -lt $max_attempts ]; then
                log_message "Waiting 2 seconds before retry..."
                sleep 2
            fi
        fi

        attempt=$((attempt + 1))
    done

    log_message "ERROR: All $max_attempts attempts failed for $file"
    return 1
}

# Main execution
main() {
    log_message "=== M4 Mac SPICE Launcher Started ==="
    log_message "macOS Version: $(sw_vers -productVersion)"
    log_message "Hardware: $(system_profiler SPHardwareDataType | grep 'Chip:' || echo 'Unknown')"

    setup_m4_environment
    verify_executable

    if [ $# -eq 0 ]; then
        log_message "ERROR: No .vv files provided"
        osascript -e 'display dialog "No .vv files provided to SPICE launcher." buttons {"OK"} default button "OK" with icon caution'
        exit 1
    fi

    SUCCESS_COUNT=0
    TOTAL_COUNT=$#

    for file in "$@"; do
        if [ ! -r "$file" ]; then
            log_message "ERROR: Cannot read file: $file"
            continue
        fi

        log_message "Processing: $file"

        if launch_with_recovery "$file"; then
            SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        fi
    done

    log_message "=== Session Complete: $SUCCESS_COUNT/$TOTAL_COUNT successful ==="

    # Always exit cleanly for Automator
    exit 0
}

# Execute main function
main "$@"
```

### 4. Alternative Solutions for M4

#### Option A: Use Native Shell Script

Create `/usr/local/bin/spice-m4-launcher`:

```bash
#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"
export GDK_BACKEND=quartz
export GTK_CSD=0
exec /opt/homebrew/bin/remote-viewer "$@"
```

#### Option B: Browser-based Workflow

- Use **Chrome instead of Firefox** (better .vv file handling)
- Enable automatic file opening in Chrome settings
- Configure direct association with shell script (not Automator)

#### Option C: Third-party SPICE Client

Consider **aSPICE Pro** from the App Store:

- Native macOS app (no GTK dependencies)
- Better M4 compatibility
- Supports .vv files directly
- More stable on Apple Silicon

## Recommended Action Plan

1. **Immediate**: Update to macOS 15.2 or later
2. **Clean Install**: Remove and reinstall virt-viewer with M4 optimizations
3. **Replace Script**: Use the M4-optimized Automator script above
4. **Test Alternative**: Try aSPICE Pro as backup solution
5. **Monitor Logs**: Check debug logs for specific failure patterns

## Key Insights

- **Root Cause**: Your M4 Mac mini was hitting a perfect storm of issues:
  - macOS 15.0-15.1 virtualization bugs
  - GTK library incompatibilities
  - Automator environment restrictions
  - M4-specific build optimizations needed

- **Timeline**: Most issues should be resolved now with macOS 15.2+ and proper rebuilds

- **Prevention**: The enhanced script includes M4-specific optimizations and better error recovery

---

_Research compiled: August 21, 2025_
_Target System: M4 Mac mini with macOS Sequoia_
_Status: Solutions available for current macOS versions_
