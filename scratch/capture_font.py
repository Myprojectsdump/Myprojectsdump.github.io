import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 720})
        abs_path = os.path.abspath("scratch/font_test.html")
        await page.goto(f"file:///{abs_path}")
        await page.wait_for_timeout(1500) # wait for web font to load
        await page.screenshot(path="scratch/font_test_render.png")
        await browser.close()
    print("Screenshot saved to scratch/font_test_render.png")

asyncio.run(main())
