"""Render an animated HTML reel template to an MP4 (1080x1920, 30fps).

Usage: python3 render_reel.py templates/reel-cliffhanger.html posts/2026-10-28-council-says-no.mp4 [seconds]

The template's CSS animations must be paused; each frame sets every animation's currentTime.
Needs ffmpeg. Output is silent H.264 + a silent AAC track (Instagram accepts it; add music in the app if wanted).
"""
import os, subprocess, sys, tempfile
from playwright.sync_api import sync_playwright

src, out = sys.argv[1], sys.argv[2]
seconds = float(sys.argv[3]) if len(sys.argv) > 3 else 15.0
fps = 30
frames = int(seconds * fps)

with tempfile.TemporaryDirectory() as tmp:
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1080, "height": 1920})
        pg.goto("file://" + os.path.abspath(src))
        pg.wait_for_timeout(500)
        for i in range(frames):
            t = i * 1000 / fps
            pg.evaluate("t => document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; })", t)
            pg.screenshot(path=f"{tmp}/f{i:05d}.png")
        b.close()
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error", "-framerate", str(fps), "-i", f"{tmp}/f%05d.png",
        "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", out,
    ], check=True)
    # cover image: the "What's your move?" frame
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "12", "-i", out, "-frames:v", "1",
                    out.rsplit(".", 1)[0] + "-cover.jpg"], check=True)
print("ok", out)
