from playwright.sync_api import sync_playwright
import time

def verify_material_widgets():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PageError: {err}"))

        url = "http://localhost:8000"
        print(f"Navigating to {url}")

        page.goto(url)

        try:
            # Wait for Dashboard title
            page.wait_for_selector("h1", timeout=10000)
            print("Dashboard loaded")

            # Wait for Dropdown
            page.wait_for_selector(".dropdown", timeout=5000)
            print("Dropdown found")

            # Wait for Offcanvas button
            # We added a button "Open Drawer"
            page.wait_for_selector("button:has-text('Open Drawer')", timeout=5000)
            print("Offcanvas button found")

            # Wait for FAB
            # It has class .btn-floating
            page.wait_for_selector(".btn-floating", timeout=5000)
            print("FAB found")

            # Wait for Floating Label
            # Class .form-floating
            page.wait_for_selector(".form-floating", timeout=5000)
            print("Floating Label found")

            # Take screenshot
            screenshot_path = "material_widgets.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_material_widgets()
