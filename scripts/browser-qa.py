import json
import os
import time

LOCALE = os.environ.get("QA_LOCALE", "en")
assert LOCALE in ["id", "en"]
BASE = os.environ.get("QA_ORIGIN", "http://localhost:3017") + "/" + LOCALE
OUT = "E:/Webgrow/Temunew/artifacts"
os.makedirs(OUT, exist_ok=True)
report = {"routes": [], "checks": []}

LABELS = {
    "Next projects": "Proyek berikutnya",
    "Web Applications": "Aplikasi Web",
    "Healthcare & Services": "Kesehatan & Layanan",
    "Next page": "Halaman berikutnya",
    "Reset Filters": "Atur Ulang Filter",
    "Next image": "Gambar berikutnya",
    "Show image 3": "Tampilkan gambar 3",
    "Enlarge AUREN image 3": "Perbesar gambar AUREN, tampilan 3",
    "Website Design": "Desain Situs Web",
    "Websites": "Situs Web",
    "Next project": "Proyek berikutnya",
    "All Work": "Semua Karya",
    "Open navigation menu": "Buka menu navigasi",
    "03 Our Process": "03 Proses Kerja",
}


def translated(label):
    return LABELS.get(label, label) if LOCALE == "id" else label


def evaluate(expression):
    return json.loads(js("JSON.stringify(" + expression + ")"))


def check(condition, name):
    assert condition, name
    report["checks"].append(name)
    print("PASS", name, flush=True)


def viewport(width):
    height = 900 if width >= 768 else 844
    cdp(
        "Emulation.setDeviceMetricsOverride",
        width=width,
        height=height,
        deviceScaleFactor=1,
        mobile=width < 768,
    )
    actual_width = evaluate("innerWidth")
    if actual_width != width:
        ratio = width / actual_width
        cdp(
            "Emulation.setDeviceMetricsOverride",
            width=round(width * ratio),
            height=round(height * ratio),
            deviceScaleFactor=1 / ratio,
            mobile=width < 768,
        )
    check(evaluate("innerWidth") == width, "Exact CSS viewport " + str(width))


def navigate(route):
    goto_url(BASE + route)
    wait_for_load()
    time.sleep(0.35)


def click_point(x, y):
    js("window.__qaPointer=null;document.addEventListener('mousemove',event=>window.__qaPointer=event.clientX,{once:true})")
    probe = 37
    cdp("Input.dispatchMouseEvent", type="mouseMoved", x=probe, y=37)
    actual = evaluate("window.__qaPointer")
    if actual is None:
        probe = 47
        cdp("Input.dispatchMouseEvent", type="mouseMoved", x=probe, y=47)
        actual = evaluate("window.__qaPointer")
    assert actual and actual > 0, "Mouse coordinate calibration"
    scale = probe / actual
    click_at_xy(x * scale, y * scale)


def click_name(name, role="button"):
    name = translated(name)
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
    click_point(sum(corners[0::2]) / 4, sum(corners[1::2]) / 4)
    time.sleep(0.25)


def click_selector(selector):
    root = cdp("DOM.getDocument")["root"]["nodeId"]
    node = cdp("DOM.querySelector", nodeId=root, selector=selector)["nodeId"]
    assert node, "Missing selector: " + selector
    cdp("DOM.scrollIntoViewIfNeeded", nodeId=node)
    time.sleep(0.15)
    corners = cdp("DOM.getBoxModel", nodeId=node)["model"]["content"]
    click_point(sum(corners[0::2]) / 4, sum(corners[1::2]) / 4)
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
    "/pricing",
    "/portfolio",
    "/our-approach",
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
        check(
            evaluate("document.documentElement.lang") == LOCALE,
            str(width) + " page language " + route,
        )
        check(
            evaluate(
                "[...document.querySelectorAll('a[href^=\"/\"]')].filter(link=>!link.closest('.language-switcher')).every(link=>link.getAttribute('href').startsWith('/"
                + LOCALE
                + "'))"
            ),
            str(width) + " localized internal links " + route,
        )
        check(
            evaluate(
                "document.querySelector('link[rel=alternate][hreflang=\"id-ID\"]') !== null && document.querySelector('link[rel=alternate][hreflang=\"en-US\"]') !== null"
            ),
            str(width) + " alternate languages " + route,
        )
        check(data["header"] == 80, str(width) + " 80px header " + route)
        if route == "/pricing":
            check(evaluate("document.querySelectorAll('main img').length") == 0, str(width) + " image-free pricing")
            check(evaluate("document.querySelectorAll('.pricing-package').length") == 18, str(width) + " eighteen pricing packages")
            check(evaluate("document.querySelectorAll('.pricing-service').length") == 6, str(width) + " six priced services")
        title_size = int(
            float(
                evaluate(
                    "getComputedStyle(document.querySelector('h1')).fontSize"
                ).replace("px", "")
            )
        )
        expected_size = 72 if width >= 1024 else 60 if width >= 768 else 36
        check(
            title_size == expected_size, str(width) + " reference heading size " + route
        )
        if data.get("hero"):
            expected_hero = 844 if width < 768 else 900
            check(
                data["hero"] == expected_hero,
                str(width) + " reference hero height " + route,
            )
        check(not data["images"], str(width) + " loaded images " + route)
        check(
            not any(
                link
                and any(
                    part in link.split("?")[0].split("/")
                    for part in ["work", "careers", "showcase", "contact"]
                )
                for link in data["links"]
            ),
            str(width) + " no removed internal destinations " + route,
        )
        check(
            not any(not link or link == "#" for link in data["links"]),
            str(width) + " no placeholder links " + route,
        )
        check(
            not any(
                term in data["text"].lower()
                for term in [
                    "furniture",
                    "woodworking",
                    "demo website",
                    "template preview",
                ]
            ),
            str(width) + " transformed copy " + route,
        )
        contacts = evaluate(
            """[...document.querySelectorAll('a[href^="https://wa.me/"]')].map(link=>({href:link.href,target:link.target,rel:link.rel}))"""
        )
        check(len(contacts) >= 7, str(width) + " contact actions present " + route)
        for contact in contacts:
            check(
                contact["href"].startswith("https://wa.me/6285151994724?text="),
                str(width) + " direct WhatsApp destination " + route,
            )
            check(
                contact["target"] == "_blank"
                and {"noopener", "noreferrer"}.issubset(set(contact["rel"].split())),
                str(width) + " safe external contact action " + route,
            )
        check(
            evaluate("document.querySelector('form') === null"),
            str(width) + " no contact form " + route,
        )
        name = "home" if route == "/" else route.strip("/").replace("/", "-")
        if width in [1440, 390]:
            for position in range(
                0, int(evaluate("document.documentElement.scrollHeight")), 750
            ):
                js("window.scrollTo(0," + str(position) + ")")
                time.sleep(0.035)
            js("window.scrollTo(0,0)")
            time.sleep(0.2)
            capture_screenshot(
                OUT + "/" + LOCALE + "-" + name + "-" + str(width) + ".png",
                full=True,
                max_dim=3000,
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
check(
    evaluate("document.querySelector('.desktop-navigation a[aria-current]') === null"),
    "Home navigation has no incorrect active page",
)
check(
    evaluate(
        "[...document.querySelectorAll('.desktop-navigation a')].some(link=>link.getAttribute('href')==='/' + document.documentElement.lang + '/portfolio')"
    ),
    "Desktop navigation exposes portfolio",
)
first = evaluate("document.querySelector('.featured-grid h3').innerText")
click_name("Next projects")
check(
    evaluate("document.querySelector('.featured-grid h3').innerText") != first,
    "Featured carousel advances",
)
click_name("Next image")
check(
    "vyren.webp" in evaluate("document.querySelector('.industry-visual img').src"),
    "Industry arrow advances the image without text overlays",
)

navigate("/portfolio")
check(
    evaluate("document.querySelectorAll('.showcase-tile').length") == 11,
    "Portfolio shows all eleven websites without filtering",
)
check(
    evaluate("document.querySelector('.portfolio-introduction').textContent")
    == ("Ragam website untuk kebutuhan bisnis Anda." if LOCALE == "id"
        else "Websites for a range of business needs."),
    "Portfolio introduction follows active language",
)
check(
    evaluate("document.querySelector('.gallery-filters, .gallery-count') === null"),
    "Portfolio has no filters or dynamic result count",
)
js("window.__portfolioClick=null;document.addEventListener('click',event=>{const link=event.target.closest('a.showcase-tile');if(link){window.__portfolioClick=link.href;event.preventDefault();}},true)")
click_selector(".showcase-tile")
check(
    evaluate("window.__portfolioClick") == "https://vyren-ecom.vercel.app/",
    "Portfolio click follows the supplied external destination",
)
check(
    evaluate("document.querySelector('[role=dialog]') === null"),
    "Portfolio click opens no detail popup",
)


def intercept_whatsapp():
    js(
        "window.__whatsappClick=null;document.addEventListener('click',event=>{const link=event.target.closest('a[href^=\"https://wa.me/\"]');if(link){window.__whatsappClick=link.href;event.preventDefault();}},true)"
    )


navigate("/pricing")
check(
    evaluate("document.querySelectorAll('.pricing-package-description').length") == 18,
    "All eighteen packages explain their business fit",
)
check(
    evaluate("document.querySelectorAll('.pricing-scope:not([open])').length") == 18,
    "Delivery limits start collapsed in native disclosures",
)
click_selector(".pricing-scope summary")
check(
    evaluate("document.querySelector('.pricing-scope').open"),
    "Package delivery scope opens",
)
press_key("Enter")
check(
    not evaluate("document.querySelector('.pricing-scope').open"),
    "Package delivery scope keyboard toggles closed",
)
check(
    evaluate(
        "document.querySelectorAll('.pricing-package a[href^=\"https://wa.me/\"]').length"
    )
    == 18,
    "All eighteen package actions link to WhatsApp",
)
click_selector('.pricing-index a[href="#e-commerce"]')
check(evaluate("location.hash") == "#e-commerce", "Pricing service anchor navigates")
click_selector(".pricing-faq details:first-child summary")
check(evaluate("document.querySelector('.pricing-faq details').open"), "Pricing FAQ opens")
press_key("Enter")
check(not evaluate("document.querySelector('.pricing-faq details').open"), "Pricing FAQ keyboard toggles closed")
message = evaluate(
    "new URL(document.querySelector('.pricing-package a').href).searchParams.get('text')"
)
check(
    ("Halo TemuWeb" if LOCALE == "id" else "Hello TemuWeb") in message,
    "WhatsApp message follows active language",
)
check(
    ("Situs Web Profil Perusahaan" if LOCALE == "id" else "Company Profile Website")
    in message,
    "WhatsApp message preserves service context",
)
intercept_whatsapp()
click_selector(".header-contact")
check(
    evaluate("window.__whatsappClick?.startsWith('https://wa.me/6285151994724?text=')"),
    "Desktop contact click opens WhatsApp destination",
)
js("window.__whatsappClick=null")
root = cdp("DOM.getDocument")["root"]["nodeId"]
button = cdp("DOM.querySelector", nodeId=root, selector=".header-contact")["nodeId"]
cdp("DOM.focus", nodeId=button)
press_key("Enter")
check(
    evaluate("window.__whatsappClick?.startsWith('https://wa.me/6285151994724?text=')"),
    "Contact action supports keyboard activation",
)

other = "en" if LOCALE == "id" else "id"
navigate("/pricing?view=2#main")
click_selector('.desktop-header-actions .language-switcher a[lang="' + other + '"]')
time.sleep(0.5)
check(
    evaluate("document.documentElement.lang") == other,
    "Desktop language switch changes locale",
)
check(
    evaluate("location.pathname") == "/" + other + "/pricing"
    and evaluate("new URLSearchParams(location.search).get('view')") == "2"
    and evaluate("location.hash") == "#main",
    "Language switch preserves page, query, and hash",
)

viewport(390)
navigate("/portfolio?view=2#main")
click_name("Open navigation menu")
click_selector('.mobile-menu .language-switcher a[lang="' + other + '"]')
time.sleep(0.5)
check(
    evaluate("document.documentElement.lang") == other,
    "Mobile language switch changes locale",
)
check(
    evaluate("location.pathname") == "/" + other + "/portfolio"
    and evaluate("location.search") == "?view=2",
    "Mobile language switch preserves portfolio",
)
check(
    evaluate("document.querySelector('[role=dialog]') === null"),
    "Mobile language switch closes menu",
)
navigate("/")
intercept_whatsapp()
click_selector(".mobile-contact")
check(
    evaluate("window.__whatsappClick?.startsWith('https://wa.me/6285151994724?text=')"),
    "Mobile header contact uses WhatsApp",
)
click_name("Open navigation menu")
click_selector('.mobile-menu nav:not(.language-switcher) a[href^="https://wa.me/"]')
check(
    evaluate("window.__whatsappClick?.startsWith('https://wa.me/6285151994724?text=')"),
    "Mobile menu contact uses WhatsApp",
)
check(
    evaluate("document.querySelector('[role=dialog]') === null"),
    "Mobile menu closes after WhatsApp action",
)
navigate("/")
click_name("Open navigation menu")
check(
    evaluate("document.querySelector('[role=dialog]') !== null"),
    "Mobile navigation opens",
)
check(
    evaluate("getComputedStyle(document.body).overflow") == "hidden",
    "Mobile navigation scroll lock",
)
click_name("03 Our Process", "link")
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
cdp(
    "Emulation.setEmulatedMedia",
    features=[{"name": "prefers-reduced-motion", "value": "reduce"}],
)
check(
    evaluate("getComputedStyle(document.documentElement).scrollBehavior") == "auto",
    "Reduced-motion scrolling",
)
cdp("Emulation.setEmulatedMedia", features=[])
for route in [
    "/careers",
    "/work",
    "/work/auren",
    "/work/category/web-applications",
    "/portfolio/auren",
]:
    navigate(route)
    check(
        "404" in evaluate("document.querySelector('main').textContent"),
        "Removed route branded not-found " + route,
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
with open(OUT + "/browser-qa-" + LOCALE + ".json", "w", encoding="utf-8") as handle:
    json.dump(report, handle, indent=2)
print(
    "VERIFIED",
    len(report["routes"]),
    "route/viewports;",
    len(report["checks"]),
    "checks",
    flush=True,
)
