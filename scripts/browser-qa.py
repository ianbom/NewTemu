import json
import os
import time

BASE = os.environ.get("QA_ORIGIN", "http://localhost:3017")
OUT = "E:/Webgrow/Temunew/artifacts"
os.makedirs(OUT, exist_ok=True)
report = {"routes": [], "checks": []}


def evaluate(expression):
    return json.loads(js("JSON.stringify(" + expression + ")"))


def check(condition, name):
    assert condition, name
    report["checks"].append(name)
    print("PASS", name, flush=True)


def viewport(width):
    cdp(
        "Emulation.setDeviceMetricsOverride",
        width=width,
        height=900 if width >= 768 else 844,
        deviceScaleFactor=1,
        mobile=width < 768,
    )


def navigate(route):
    goto_url(BASE + route)
    wait_for_load()
    time.sleep(0.35)


def click_name(name, role="button"):
    nodes = cdp("Accessibility.getFullAXTree")["nodes"]
    matches = [
        node
        for node in nodes
        if not node.get("ignored")
        and node.get("name", {}).get("value", "").casefold() == name.casefold()
        and node.get("role", {}).get("value") == role
    ]
    assert matches, "Missing " + role + ": " + name
    backend = matches[0]["backendDOMNodeId"]
    cdp("DOM.scrollIntoViewIfNeeded", backendNodeId=backend)
    time.sleep(0.15)
    corners = cdp("DOM.getBoxModel", backendNodeId=backend)["model"]["content"]
    click_at_xy(sum(corners[0::2]) / 4, sum(corners[1::2]) / 4)
    time.sleep(0.25)


def click_selector(selector):
    root = cdp("DOM.getDocument")["root"]["nodeId"]
    node = cdp("DOM.querySelector", nodeId=root, selector=selector)["nodeId"]
    assert node, "Missing selector: " + selector
    cdp("DOM.scrollIntoViewIfNeeded", nodeId=node)
    time.sleep(0.15)
    corners = cdp("DOM.getBoxModel", nodeId=node)["model"]["content"]
    click_at_xy(sum(corners[0::2]) / 4, sum(corners[1::2]) / 4)
    time.sleep(0.2)


def fill(selector, value):
    click_selector(selector)
    cdp(
        "Input.dispatchKeyEvent",
        type="keyDown",
        key="a",
        code="KeyA",
        windowsVirtualKeyCode=65,
        modifiers=2,
        commands=["selectAll"],
    )
    cdp(
        "Input.dispatchKeyEvent",
        type="keyUp",
        key="a",
        code="KeyA",
        windowsVirtualKeyCode=65,
        modifiers=2,
    )
    type_text(value)
    time.sleep(0.2)


new_tab(BASE)
wait_for_load()
drain_events()
cdp("Runtime.enable")
cdp("Log.enable")
routes = [
    "/",
    "/about-us",
    "/our-process",
    "/work",
    "/work/auren",
    "/services",
    "/showcase",
    "/our-approach",
    "/careers",
    "/contact",
    "/work/category/web-applications",
]
for width in [] if os.environ.get("QA_INTERACTIONS_ONLY") else [1440, 1280, 768, 390]:
    viewport(width)
    for route in routes:
        navigate(route)
        data = evaluate(
            "({title:document.title,headings:document.querySelectorAll('h1').length,width:innerWidth,pageWidth:document.documentElement.scrollWidth,hero:document.querySelector('.hero')?.offsetHeight,header:document.querySelector('header').offsetHeight,images:[...document.images].filter(image=>image.complete&&!image.naturalWidth).map(image=>image.src),links:[...document.querySelectorAll('a')].map(link=>link.getAttribute('href')),text:document.querySelector('main').innerText})"
        )
        check(data["pageWidth"] <= data["width"], str(width) + " no overflow " + route)
        check(data["headings"] == 1, str(width) + " single h1 " + route)
        check(data["header"] == 80, str(width) + " 80px header " + route)
        title_size = int(
            float(
                evaluate("getComputedStyle(document.querySelector('h1')).fontSize").replace(
                    "px", ""
                )
            )
        )
        expected_size = (
            (36 if width >= 768 else 30)
            if route == "/work/auren"
            else (
                (60 if width >= 1024 else 48 if width >= 768 else 36)
                if route == "/contact"
                else (72 if width >= 1024 else 60 if width >= 768 else 36)
            )
        )
        check(title_size == expected_size, str(width) + " reference heading size " + route)
        if data.get("hero"):
            expected_hero = (
                (320 if width < 768 else 450)
                if route == "/contact"
                else (844 if width < 768 else 900)
            )
            check(data["hero"] == expected_hero, str(width) + " reference hero height " + route)
        if route == "/work/auren":
            ratio = evaluate(
                "document.querySelector('.gallery-main').offsetWidth / document.querySelector('.gallery-main').offsetHeight"
            )
            check(abs(ratio - 4 / 3) < 0.01, str(width) + " reference project image ratio")
        check(not data["images"], str(width) + " loaded images " + route)
        check(
            not any(not link or link == "#" for link in data["links"]),
            str(width) + " no placeholder links " + route,
        )
        check(
            not any(
                term in data["text"].lower()
                for term in [
                    "galerya",
                    "furniture",
                    "woodworking",
                    "demo website",
                    "template preview",
                ]
            ),
            str(width) + " transformed copy " + route,
        )
        name = "home" if route == "/" else route.strip("/").replace("/", "-")
        if width in [1440, 390]:
            for position in range(0, int(evaluate("document.documentElement.scrollHeight")), 750):
                js("window.scrollTo(0," + str(position) + ")")
                time.sleep(0.035)
            js("window.scrollTo(0,0)")
            time.sleep(0.2)
            capture_screenshot(
                OUT + "/" + name + "-" + str(width) + ".png", full=True, max_dim=3000
            )
        report["routes"].append(
            {
                "route": route,
                "width": width,
                "heroHeight": data.get("hero"),
                "pageWidth": data["pageWidth"],
            }
        )

viewport(1440)
navigate("/")
click_name("Open project categories")
check(evaluate("document.querySelector('.nav-dropdown') !== null"), "Desktop dropdown opens")
press_key("Escape")
check(
    evaluate("document.querySelector('.nav-dropdown') === null"),
    "Desktop dropdown Escape dismisses",
)
first = evaluate("document.querySelector('.featured-grid h3').innerText")
click_name("Next projects")
check(
    evaluate("document.querySelector('.featured-grid h3').innerText") != first,
    "Featured carousel advances",
)
click_name("Web Applications", "tab")
check(
    "NORDEN" in evaluate("document.querySelector('#showcase-panel').innerText"),
    "Showcase tab changes project",
)
press_key("ArrowRight")
check(
    "AUREN" in evaluate("document.querySelector('#showcase-panel').innerText"),
    "Showcase keyboard navigation",
)
click_name("Healthcare & Services")
check(
    "Healthcare & Services" in evaluate("document.querySelector('.industry-label').textContent"),
    "Industry selector updates",
)

navigate("/work")
check(
    evaluate("document.querySelectorAll('.portfolio-grid .project-card').length") == 6,
    "Portfolio six projects per page",
)
first = evaluate("document.querySelector('.portfolio-grid h3').innerText")
click_name("Next page")
check(
    evaluate("document.querySelector('.portfolio-grid h3').innerText") != first,
    "Pagination changes results",
)
click_selector(".category-group:nth-child(2)>button")
check(
    evaluate("document.querySelectorAll('.portfolio-grid .project-card').length") == 3,
    "Category filter returns three projects",
)
fill("input[type=search]", "NORDEN")
check(
    evaluate("document.querySelectorAll('.portfolio-grid .project-card').length") == 1,
    "Search combines with category",
)
fill("input[type=search]", "nothing-matches-this")
check(evaluate("document.querySelector('.empty-state') !== null"), "Search empty state")
click_name("Reset Filters")
check(
    evaluate("document.querySelectorAll('.portfolio-grid .project-card').length") == 6,
    "Reset restores results",
)

navigate("/work/auren")
before = evaluate("document.querySelector('.gallery-expand img').getAttribute('src')")
click_name("Next image")
check(
    evaluate("document.querySelector('.gallery-expand img').getAttribute('src')") != before,
    "Project gallery next image",
)
click_name("Show image 3")
check(
    evaluate(
        "document.querySelector('.gallery-thumbnails button:nth-child(3)').getAttribute('aria-pressed')"
    )
    == "true",
    "Project thumbnail selection",
)
click_name("Enlarge AUREN image 3")
check(evaluate("document.querySelector('[role=dialog]') !== null"), "Project lightbox opens")
press_key("Escape")
check(
    evaluate("document.querySelector('[role=dialog]') === null"),
    "Project lightbox Escape dismisses",
)

navigate("/showcase")
click_name("Website Design")
check(evaluate("document.querySelectorAll('.showcase-tile').length") == 6, "Showcase filter")
click_selector(".showcase-tile")
check(evaluate("document.querySelector('[role=dialog]') !== null"), "Showcase lightbox opens")
before = evaluate("document.querySelector('[role=dialog] h2').textContent")
click_name("Next project")
check(
    evaluate("document.querySelector('[role=dialog] h2').textContent") != before,
    "Showcase lightbox advances",
)
press_key("Escape")
time.sleep(0.15)
check(
    evaluate("document.activeElement?.classList.contains('showcase-tile')"),
    "Showcase lightbox restores focus",
)

navigate("/contact?type=Web%20Application&project=NORDEN")
check(
    evaluate("document.querySelector('select').value") == "Web Application",
    "Contact type preselected",
)
check("NORDEN" in evaluate("document.querySelector('textarea').value"), "Contact project prefilled")
click_name("Continue on WhatsApp")
check(not evaluate("document.querySelector('form').checkValidity()"), "Contact required validation")
fill("input[name=name]", "Alex & Co")
fill("input[name=email]", "alex@example.com")
fill("input[name=phone]", "+62 851 1234 5678")
check(evaluate("document.querySelector('form').checkValidity()"), "Contact valid input accepted")
js("window.__contactUrl=null;window.open=(url)=>{window.__contactUrl=url;return null}")
click_name("Continue on WhatsApp")
check(
    evaluate("window.__contactUrl?.startsWith('https://wa.me/6285151994724?text=')"),
    "WhatsApp correct recipient and encoded message",
)
check(
    "Alex & Co" in evaluate("new URL(window.__contactUrl).searchParams.get('text')"),
    "WhatsApp preserves contact data",
)
check(
    "Review" in evaluate("document.querySelector('[role=status]').textContent"),
    "Contact honest handoff status",
)

viewport(390)
navigate("/")
click_name("Open navigation menu")
check(evaluate("document.querySelector('[role=dialog]') !== null"), "Mobile navigation opens")
check(
    evaluate("getComputedStyle(document.body).overflow") == "hidden",
    "Mobile navigation scroll lock",
)
click_name("02 Our Process", "link")
time.sleep(0.6)
check("/our-process" in page_info()["url"], "Mobile navigation route works")
check(
    evaluate("document.querySelector('[role=dialog]') === null"),
    "Mobile navigation closes after selection",
)
click_name("Open navigation menu")
press_key("Escape")
check(
    evaluate("document.querySelector('[role=dialog]') === null"),
    "Mobile navigation Escape dismisses",
)
cdp("Emulation.setEmulatedMedia", features=[{"name": "prefers-reduced-motion", "value": "reduce"}])
check(
    evaluate("getComputedStyle(document.documentElement).scrollBehavior") == "auto",
    "Reduced-motion scrolling",
)
cdp("Emulation.setEmulatedMedia", features=[])
navigate("/work/not-a-project")
check(
    "out of frame" in evaluate("document.querySelector('main').textContent"),
    "Unknown project branded not-found",
)
events = drain_events()
errors = [event for event in events if event.get("method") == "Runtime.exceptionThrown"]
report["runtimeExceptions"] = errors
check(not errors, "No browser runtime exceptions")
console_errors = [
    event
    for event in events
    if event.get("method") == "Runtime.consoleAPICalled"
    and event.get("params", {}).get("type") == "error"
]
report["consoleErrors"] = console_errors
check(not console_errors, "No browser console errors")
with open(OUT + "/browser-qa.json", "w", encoding="utf-8") as handle:
    json.dump(report, handle, indent=2)
print(
    "VERIFIED",
    len(report["routes"]),
    "route/viewports;",
    len(report["checks"]),
    "checks",
    flush=True,
)
