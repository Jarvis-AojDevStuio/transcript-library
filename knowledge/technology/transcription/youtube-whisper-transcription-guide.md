# YouTube Whisper Transcription Guide

## Overview

This guide explains how to use the `youtube-whisper-transcribe.py` script to transcribe YouTube videos using OpenAI's Whisper AI model via the faster-whisper implementation.

**Key Benefits:**
- 🚀 **4x faster** than standard Whisper (using CTranslate2)
- 🎯 **Word-level timestamps** for precise timing
- 🌍 **Multilingual** with auto-detection or manual language selection
- 💾 **Multiple formats**: TXT, JSON, WebVTT
- 🔊 **Voice Activity Detection** to filter silence
- ⚡ **GPU acceleration** when available

## Installation

### Step 1: Install Python Dependencies

```bash
# Install faster-whisper (optimized Whisper implementation)
pip install faster-whisper

# Install yt-dlp (YouTube downloader)
pip install yt-dlp

# Optional: Install PyTorch for GPU acceleration
# For CUDA 12.x (NVIDIA GPUs):
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# For macOS/CPU only:
pip install torch torchvision torchaudio
```

### Step 2: Verify Installation

```bash
# Check yt-dlp
yt-dlp --version

# Check faster-whisper (run in Python)
python -c "import faster_whisper; print('faster-whisper installed')"

# Check GPU availability (optional)
python -c "import torch; print(f'CUDA available: {torch.cuda.is_available()}')"
```

## Usage

### Basic Usage

```bash
# Transcribe with default settings (balanced quality)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID"
```

### Quality Presets

The script offers three quality presets:

| Preset | Model | Speed | Quality | Use Case |
|--------|-------|-------|---------|----------|
| `fast` | base | ⚡⚡⚡ | ⭐⭐ | Quick drafts, meeting notes |
| `balanced` | medium | ⚡⚡ | ⭐⭐⭐ | General use (default) |
| `high` | large-v3 | ⚡ | ⭐⭐⭐⭐⭐ | Professional transcripts, research |

```bash
# Fast transcription (for quick reviews)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" --quality fast

# High-quality transcription (for research/documentation)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" --quality high
```

### Advanced Options

#### Word-Level Timestamps

```bash
# Enable word-level timestamps (useful for editing or captioning)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" \
  --word-timestamps
```

#### Language Selection

```bash
# Auto-detect language (default)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID"

# Specify language (faster, more accurate if known)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" \
  --language en  # English

python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" \
  --language es  # Spanish

python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" \
  --language fr  # French
```

**Common Language Codes:**
- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `zh` - Chinese
- `ja` - Japanese
- `ko` - Korean

#### Output Formats

```bash
# All formats (default): TXT, JSON, VTT
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID"

# Text only (plain transcript)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" \
  --format txt

# JSON only (structured data with metadata)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" \
  --format json

# WebVTT only (for video subtitles)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" \
  --format vtt
```

#### Custom Output Directory

```bash
# Specify custom output directory
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" \
  --output-dir ./my-transcriptions

# Keep extracted audio file (for reuse or debugging)
python scripts/python/youtube-whisper-transcribe.py "https://youtu.be/VIDEO_ID" \
  --keep-audio
```

### Complete Example

```bash
# High-quality English transcription with word timestamps, JSON output only
python scripts/python/youtube-whisper-transcribe.py \
  "https://youtu.be/42wHbH2zMEw" \
  --quality high \
  --language en \
  --word-timestamps \
  --format json \
  --output-dir ./outputs/transcriptions
```

## Output Formats

### 1. Plain Text (.txt)

**Best for:** Reading, copying, basic analysis

```
Title: Training Dental Teams How to Schedule Patients
Channel: Dr. Anissa Holmes
URL: https://youtu.be/42wHbH2zMEw
Language: en
Duration: 457.00s
Transcribed: 2025-10-27_14-30-00

================================================================================

[0.00s -> 5.50s]
Welcome to today's training on strategic patient scheduling.

[5.50s -> 12.30s]
We'll cover the rocks, sand, and water framework for optimizing your dental practice.
```

### 2. JSON (.json)

**Best for:** Programming, data analysis, integration with other tools

```json
{
  "video_info": {
    "title": "Training Dental Teams How to Schedule Patients",
    "channel": "Dr. Anissa Holmes",
    "url": "https://youtu.be/42wHbH2zMEw",
    "duration": 457,
    "upload_date": "20210831"
  },
  "transcription_info": {
    "language": "en",
    "language_probability": 0.98,
    "duration": 457.0,
    "duration_after_vad": 420.5
  },
  "transcribed_at": "2025-10-27_14-30-00",
  "segments": [
    {
      "start": 0.0,
      "end": 5.5,
      "text": "Welcome to today's training on strategic patient scheduling.",
      "avg_logprob": -0.23,
      "no_speech_prob": 0.01,
      "words": [
        {
          "start": 0.0,
          "end": 0.5,
          "word": "Welcome",
          "probability": 0.99
        }
      ]
    }
  ]
}
```

### 3. WebVTT (.vtt)

**Best for:** Video subtitles, closed captions, video editing

```
WEBVTT

1
00:00:00.000 --> 00:00:05.500
Welcome to today's training on strategic patient scheduling.

2
00:00:05.500 --> 00:00:12.300
We'll cover the rocks, sand, and water framework for optimizing your dental practice.
```

## Integration with /analyze-youtube-videos Command

### For Videos Without Transcripts

When a video lacks transcripts, use this workflow:

```bash
# Step 1: Extract and transcribe using Whisper
python scripts/python/youtube-whisper-transcribe.py \
  "https://youtu.be/iam_69NF4fs" \
  --quality high \
  --format json

# Step 2: Use the generated transcript with your analysis workflow
# The JSON output can be loaded by your analysis agents
```

### Automated Workflow

You can modify the `/analyze-youtube-videos` command to automatically:

1. Try to fetch native transcripts via yt-dlp
2. If unavailable, fall back to Whisper transcription
3. Proceed with analysis using the generated transcript

## Performance Tips

### GPU Acceleration

If you have an NVIDIA GPU with CUDA support:

```bash
# Verify CUDA is available
python -c "import torch; print(f'CUDA: {torch.cuda.is_available()}')"

# The script automatically uses GPU when available
# High-quality transcription with GPU is ~5-10x faster than CPU
```

### Quality vs Speed Trade-offs

**For Research & Documentation:**
- Use `--quality high` with `--word-timestamps`
- Accept slower processing for maximum accuracy
- Estimated: ~1 minute per 10 minutes of audio on GPU

**For Quick Reviews:**
- Use `--quality fast`
- Skip word timestamps
- Estimated: ~20 seconds per 10 minutes of audio on GPU

**For Batch Processing:**
- Use `--quality balanced` as a middle ground
- Process multiple videos in parallel (separate terminal windows)

### Batch Processing Script

Create a simple batch script for multiple videos:

```bash
#!/bin/bash
# batch-transcribe.sh

VIDEOS=(
  "https://youtu.be/VIDEO_1"
  "https://youtu.be/VIDEO_2"
  "https://youtu.be/VIDEO_3"
)

for url in "${VIDEOS[@]}"; do
  python scripts/python/youtube-whisper-transcribe.py "$url" \
    --quality balanced \
    --format all
done
```

## Troubleshooting

### Issue: "faster-whisper not installed"

```bash
# Solution:
pip install faster-whisper

# If GPU issues, install CPU version:
pip install faster-whisper --no-deps
pip install ctranslate2
```

### Issue: "yt-dlp not installed"

```bash
# Solution:
pip install yt-dlp

# Or update if already installed:
pip install --upgrade yt-dlp
```

### Issue: "CUDA out of memory"

```bash
# Solution 1: Use smaller model
python scripts/python/youtube-whisper-transcribe.py "URL" --quality balanced

# Solution 2: Use CPU instead
# The script will automatically fall back to CPU if CUDA is unavailable
```

### Issue: "Video download failed"

```bash
# Update yt-dlp (YouTube frequently changes their API)
pip install --upgrade yt-dlp

# Or use specific video quality
yt-dlp -f 'bestaudio' "https://youtu.be/VIDEO_ID"
```

## Model Sizes & Requirements

| Model | Disk Space | VRAM (GPU) | RAM (CPU) | Relative Speed |
|-------|-----------|------------|-----------|----------------|
| base | ~150 MB | ~1 GB | ~2 GB | 10x |
| medium | ~1.5 GB | ~2.5 GB | ~5 GB | 4x |
| large-v3 | ~3 GB | ~5 GB | ~10 GB | 1x |

**First Run:** Models are downloaded automatically and cached in `~/.cache/huggingface/hub/`

## Use Cases

### 1. Dental Practice Training

```bash
# Transcribe training videos for documentation
python scripts/python/youtube-whisper-transcribe.py \
  "https://youtu.be/42wHbH2zMEw" \
  --quality high \
  --language en \
  --format all \
  --output-dir ./unified-dental/training-transcripts
```

### 2. Research & Analysis

```bash
# Create searchable transcripts for research videos
python scripts/python/youtube-whisper-transcribe.py \
  "https://youtu.be/RESEARCH_VIDEO" \
  --quality high \
  --word-timestamps \
  --format json
```

### 3. Meeting Notes

```bash
# Quick transcription of recorded meetings
python scripts/python/youtube-whisper-transcribe.py \
  "https://youtu.be/MEETING_VIDEO" \
  --quality fast \
  --format txt
```

### 4. Content Creation

```bash
# Generate subtitles for your own videos
python scripts/python/youtube-whisper-transcribe.py \
  "https://youtu.be/YOUR_VIDEO" \
  --quality high \
  --word-timestamps \
  --format vtt
```

## Next Steps

After transcription:

1. **Analyze Content**: Use the transcript with AI analysis tools
2. **Create Summaries**: Feed JSON to report-generator agents
3. **Extract Insights**: Search for specific topics or keywords
4. **Generate Documentation**: Convert to structured knowledge base entries

## Related Documentation

- [YouTube Analysis Command](/docs/research/youtube-analysis-workflow.md)
- [AI Documentation Standards](/ai-docs/workflows/naming-conventions.md)
- [Unified Dental Knowledge Base](/unified-dental/dental-knowledge-base/)

## Resources

- [faster-whisper GitHub](https://github.com/SYSTRAN/faster-whisper)
- [OpenAI Whisper](https://github.com/openai/whisper)
- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp)
- [Context7 Whisper Docs](https://context7.com/systran/faster-whisper)

---

**Last Updated:** 2025-10-27
**Maintained By:** AOJDevStudio
