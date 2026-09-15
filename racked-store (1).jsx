import React, { useState } from "react";
const PRODUCTS = [
  { id: "t1", name: "Ridge Tank", category: "tops", price: 650, color: "#3a3f33", sizes: ["S", "M", "L", "XL"],
    desc: "A drop-armhole tank cut from a heavyweight cotton-poly blend so it holds its shape set after set. Bonded seams mean no chafing under a barbell or a backpack strap.",
    care: "Machine wash cold, inside out, with like colors. Tumble dry low or hang dry. Do not iron the print. Skip fabric softener — it clogs the moisture-wicking fibers." },
  { id: "t2", name: "Motion Tee", category: "tops", price: 590, color: "#232320", sizes: ["S", "M", "L", "XL"],
    desc: "The everyday training tee. Four-way stretch fabric moves with you through overhead presses and floor work, and stays light even when it's soaked through.",
    care: "Machine wash cold, inside out. Tumble dry low. Do not dry clean. Wash within a few hours of a hard session to keep odor-resistant treatment working." },
  { id: "t3", name: "Cutoff Muscle Tee", category: "tops", price: 540, color: "#54432f", sizes: ["S", "M", "L", "XL"],
    desc: "Wide-cut armholes for max range of motion on pulling days. Raw-edge hem, garment-washed for a broken-in feel right out of the bag.",
    care: "Machine wash cold with similar colors. Lay flat to dry to preserve the raw hem — tumble drying will fray the cut edges faster." },
  { id: "t4", name: "Zip Half-Jacket", category: "tops", price: 1450, color: "#2c2f2b", sizes: ["S", "M", "L", "XL"],
    desc: "A brushed-fleece quarter-zip for the walk into the gym and the cooldown after. Thumbholes keep sleeves put through warmups.",
    care: "Machine wash cold, zipper closed, inside out. Tumble dry low. Do not iron the zip tape or bonded logo." },
  { id: "b1", name: "Load Shorts", category: "bottoms", price: 720, color: "#2b2b28", sizes: ["S", "M", "L", "XL"],
    desc: "A 7-inch training short with a split hem for squat depth and a zip pocket that actually holds your keys during a set.",
    care: "Machine wash cold, inside out. Tumble dry low. Close the zip pocket before washing to protect the zipper teeth." },
  { id: "b2", name: "Compression Leggings", category: "bottoms", price: 890, color: "#33322f", sizes: ["S", "M", "L", "XL"],
    desc: "Second-skin compression with a wide waistband that stays put through burpees and box jumps. Squat-tested, fully opaque.",
    care: "Machine wash cold, inside out, mesh bag recommended. Do not tumble dry — hang dry to protect the compression fibers. No fabric softener." },
  { id: "b3", name: "Track Pant", category: "bottoms", price: 980, color: "#3d3a34", sizes: ["S", "M", "L", "XL"],
    desc: "A tapered, mid-weight track pant with zip ankles so it layers over shoes. Deep side pockets fit a phone without bouncing.",
    care: "Machine wash cold, inside out, zip ankles closed. Tumble dry low. Do not iron directly on the zip trim." },
  { id: "b4", name: "Bike Short", category: "bottoms", price: 610, color: "#4a4f3e", sizes: ["S", "M", "L", "XL"],
    desc: "A 4-inch compressive short built for conditioning work — no ride-up, no see-through, no excuses on burpee day.",
    care: "Machine wash cold, inside out, mesh bag recommended. Hang dry. Avoid high heat, which breaks down the compression fabric." },
  { id: "a1", name: "Chalk Bag", category: "accessories", price: 320, color: "#4a4f3e", sizes: ["One Size"],
    desc: "A drawstring chalk bag with a brush loop and a carabiner clip, sized to hang off a bag or a rack without getting in the way.",
    care: "Spot clean with a damp cloth only. Empty chalk fully before washing. Air dry — do not machine wash or dry." },
  { id: "a2", name: "Lifting Belt", category: "accessories", price: 1350, color: "#2a2320", sizes: ["S/M", "L/XL"],
    desc: "A 10mm single-prong leather belt for real intra-abdominal pressure under the bar. Breaks in over a few sessions, then holds its shape.",
    care: "Wipe down with a dry or slightly damp cloth after use. Do not machine wash. Condition the leather occasionally and keep it out of direct sun." },
  { id: "a3", name: "Gym Towel", category: "accessories", price: 240, color: "#33322f", sizes: ["One Size"],
    desc: "A quick-dry microfiber towel that folds down small enough to live in the bottom of your bag permanently.",
    care: "Machine wash cold with like colors. Tumble dry low or air dry. No fabric softener — it kills the microfiber's absorbency." },
  { id: "a4", name: "Wrist Wraps", category: "accessories", price: 260, color: "#232320", sizes: ["One Size"],
    desc: "Stiff 18-inch wraps for pressing days, with a thumb loop for a fast, even wrap and a wide velcro closure that won't slip mid-set.",
    care: "Hand wash cold and air dry. Machine washing breaks down the velcro closure faster — spot clean when possible instead." },
];

const CATEGORY_LABEL = { tops: "TOP", bottoms: "BOTTOM", accessories: "ACCESSORY" };

const SIZE_CHARTS = {
  tops: {
    columns: ["Size", "Chest (in)", "Length (in)"],
    rows: [
      ["S", "34–36", "27"],
      ["M", "38–40", "28"],
      ["L", "42–44", "29"],
      ["XL", "46–48", "30"],
    ],
  },
  bottoms: {
    columns: ["Size", "Waist (in)", "Inseam (in)"],
    rows: [
      ["S", "28–30", "30"],
      ["M", "31–33", "31"],
      ["L", "34–36", "31"],
      ["XL", "37–39", "32"],
    ],
  },
  accessories: {
    columns: ["Size", "Fits"],
    rows: [
      ["S/M", "28–36 in waist"],
      ["L/XL", "37–46 in waist"],
      ["One Size", "Fits most"],
    ],
  },
};

/* ---------------- icons ---------------- */
const Icon = {
  Tee: (p) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M16 8 L24 12 L32 8 L40 14 L35 21 L31 18 L31 40 L17 40 L17 18 L13 21 L8 14 Z" strokeLinejoin="round" />
    </svg>
  ),
  Shorts: (p) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M10 10 H38 L37 26 L30 40 L26 40 L24 24 L22 40 L18 40 L11 26 Z" strokeLinejoin="round" />
    </svg>
  ),
  Accessory: (p) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="24" cy="24" r="14" />
      <path d="M24 16 V24 L30 28" strokeLinecap="round" />
    </svg>
  ),
  Cart: (p) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" {...p}>
      <path d="M14 16 H10 L8 22 L10 40 H38 L40 22 L38 16 H14 Z M14 16 L16 8 H32 L34 16" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M3 6 H21 M3 12 H21 M3 18 H21" strokeLinecap="round" />
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 5 L19 19 M19 5 L5 19" strokeLinecap="round" />
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...p}>
      <path d="M12 5 V19 M5 12 H19" strokeLinecap="round" />
    </svg>
  ),
  Minus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" {...p}>
      <path d="M5 12 H19" strokeLinecap="round" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" {...p}>
      <path d="M4 12 L10 18 L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M6 9 L12 15 L18 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Cash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="2.5" y="6" width="19" height="12" rx="1.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M2.5 9.5 h2 M19.5 9.5 h2 M2.5 14.5 h2 M19.5 14.5 h2" strokeLinecap="round" />
    </svg>
  ),
  Card: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.8" />
      <path d="M2.5 9.5 H21.5" />
      <path d="M6 14.5 H11" strokeLinecap="round" />
    </svg>
  ),
  Store: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M3 9 L4.5 4 H19.5 L21 9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 9 V20 H21 V9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 9 a3 3 0 0 0 6 0 a3 3 0 0 0 6 0 a3 3 0 0 0 6 0" />
      <path d="M9.5 20 V14 H14.5 V20" />
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <path d="M12 21 C12 21 19 14.4 19 9.5 A7 7 0 0 0 5 9.5 C5 14.4 12 21 12 21 Z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  ),
};

function CategoryIcon({ category, ...rest }) {
  if (category === "tops") return <Icon.Tee {...rest} />;
  if (category === "bottoms") return <Icon.Shorts {...rest} />;
  return <Icon.Accessory {...rest} />;
}

const fmt = (n) => `EGP ${Math.round(n).toLocaleString("en-US")}`;

const EGYPT_CITIES = [
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Giza", lat: 30.0131, lon: 31.2089 },
  { name: "Alexandria", lat: 31.2001, lon: 29.9187 },
  { name: "Mansoura", lat: 31.0409, lon: 31.3785 },
  { name: "Tanta", lat: 30.7865, lon: 31.0004 },
  { name: "Hurghada", lat: 27.2579, lon: 33.8116 },
  { name: "Luxor", lat: 25.6872, lon: 32.6396 },
  { name: "Aswan", lat: 24.0889, lon: 32.8998 },
];

const PAYMENT_METHODS = [
  { key: "cod", label: "CASH ON DELIVERY", desc: "Pay in cash when your order arrives." },
  { key: "visa", label: "VISA / CARD", desc: "Pay securely online with a debit or credit card." },
  { key: "fawry", label: "FAWRY", desc: "Get a payment code, pay at any Fawry outlet." },
];

/* ---------------- plate-stack cart glyph (signature element) ---------------- */
function BarGlyph({ count }) {
  const plates = Math.min(count, 4);
  return (
    <span className="barglyph">
      <span className="barglyph-bar" />
      <span className="barglyph-plates">
        {Array.from({ length: plates }).map((_, i) => (
          <span key={i} className="barglyph-plate" />
        ))}
      </span>
    </span>
  );
}

/* ---------------- Header ---------------- */
function Header({ view, setView, cartCount, onCartClick, menuOpen, setMenuOpen }) {
  const NavLink = ({ target, label }) => (
    <button
      className={"navlink" + (view === target ? " navlink-active" : "")}
      onClick={() => {
        setView(target);
        setMenuOpen(false);
      }}
    >
      {label}
    </button>
  );
  return (
    <header className="header">
      <div className="header-inner">
        <button className="logo" onClick={() => setView("home")}>
          RACKED<span className="logo-dot" />
        </button>
        <nav className="nav-desktop">
          <NavLink target="home" label="HOME" />
          <NavLink target="shop" label="SHOP" />
          <NavLink target="policy" label="POLICY" />
        </nav>
        <div className="header-actions">
          <button className="cart-btn" onClick={onCartClick} aria-label="Open cart">
            <BarGlyph count={cartCount} />
            <span className="cart-count">{cartCount}</span>
          </button>
          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            {menuOpen ? <Icon.Close className="icon-20" /> : <Icon.Menu className="icon-20" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="nav-mobile">
          <NavLink target="home" label="HOME" />
          <NavLink target="shop" label="SHOP" />
          <NavLink target="policy" label="POLICY" />
        </nav>
      )}
    </header>
  );
}

/* ---------------- Home ---------------- */
function Hero({ setView }) {
  return (
    <section className="hero">
      <div className="hero-stripe" />
      <div className="hero-content">
        <p className="eyebrow">SET 001 — FALL COLLECTION</p>
        <h1 className="hero-title">
          TRAIN.
          <br />
          LOAD.
          <br />
          REPEAT.
        </h1>
        <p className="hero-sub">
          Apparel built for the plates you actually lift. Cut for movement, tested under load, no
          gimmicks on the label.
        </p>
        <button className="btn btn-accent" onClick={() => setView("shop")}>
          SHOP THE SET
        </button>
      </div>
    </section>
  );
}

function CategoryShowcase({ setView, setCategory }) {
  const cats = [
    { key: "tops", label: "TOPS", desc: "Tanks, tees, half-zips" },
    { key: "bottoms", label: "BOTTOMS", desc: "Shorts, leggings, track pants" },
    { key: "accessories", label: "ACCESSORIES", desc: "Belts, wraps, chalk" },
  ];
  return (
    <section className="showcase">
      <div className="section-head">
        <p className="eyebrow">SHOP BY CATEGORY</p>
      </div>
      <div className="showcase-grid">
        {cats.map((c) => (
          <button
            key={c.key}
            className="showcase-card"
            onClick={() => {
              setCategory(c.key);
              setView("shop");
            }}
          >
            <CategoryIcon category={c.key} className="showcase-icon" />
            <span className="showcase-label">{c.label}</span>
            <span className="showcase-desc">{c.desc}</span>
            <span className="showcase-arrow">
              <Icon.Chevron className="icon-16 rotate-neg90" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Strip() {
  const words = ["NO SHORTCUTS", "SWEAT TESTED", "MADE TO MOVE", "RACK READY", "BUILT UNDER LOAD"];
  return (
    <div className="strip">
      <div className="strip-track">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="strip-item">
            {w} <span className="strip-dot">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Product Grid ---------------- */
function ProductCard({ product, onAdd, onOpen }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  };

  return (
    <div className="product-card">
      <button className="product-swatch product-swatch-btn" style={{ background: product.color }} onClick={() => onOpen(product)}>
        <CategoryIcon category={product.category} className="product-icon" />
        <span className="product-tag">{CATEGORY_LABEL[product.category]}</span>
      </button>
      <div className="product-body">
        <div className="product-row">
          <button className="product-name product-name-link" onClick={() => onOpen(product)}>
            {product.name}
          </button>
          <span className="product-price">{fmt(product.price)}</span>
        </div>
        <div className="size-row">
          {product.sizes.map((s) => (
            <button
              key={s}
              className={"size-chip" + (size === s ? " size-chip-active" : "")}
              onClick={(e) => {
                e.stopPropagation();
                setSize(s);
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <button className={"btn btn-add" + (added ? " btn-added" : "")} onClick={handleAdd}>
          {added ? (
            <>
              <Icon.Check className="icon-16" /> ADDED
            </>
          ) : (
            <>
              <Icon.Plus className="icon-16" /> ADD TO CART
            </>
          )}
        </button>
        <button className="product-detail-link" onClick={() => onOpen(product)}>
          SIZE CHART &amp; CARE
        </button>
      </div>
    </div>
  );
}

function ShopPage({ category, setCategory, onAdd, onOpen }) {
  const filtered = category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
  const tabs = [
    { key: "all", label: "ALL" },
    { key: "tops", label: "TOPS" },
    { key: "bottoms", label: "BOTTOMS" },
    { key: "accessories", label: "ACCESSORIES" },
  ];
  return (
    <section className="shop">
      <div className="section-head">
        <p className="eyebrow">FULL CATALOG</p>
        <h2 className="section-title">SHOP ALL</h2>
      </div>
      <div className="tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={"tab" + (category === t.key ? " tab-active" : "")}
            onClick={() => setCategory(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Product Detail ---------------- */
function ProductDetail({ product, onAdd, setView }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("desc");
  const chart = SIZE_CHARTS[product.category];

  const handleAdd = () => {
    onAdd(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <section className="detail">
      <button className="back-link" onClick={() => setView("shop")}>
        ← BACK TO SHOP
      </button>
      <div className="detail-grid">
        <div className="detail-swatch" style={{ background: product.color }}>
          <CategoryIcon category={product.category} className="detail-icon" />
          <span className="product-tag">{CATEGORY_LABEL[product.category]}</span>
        </div>
        <div className="detail-info">
          <p className="eyebrow">{product.category.toUpperCase()}</p>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">{fmt(product.price)}</p>

          <p className="form-legend">SIZE</p>
          <div className="size-row">
            {product.sizes.map((s) => (
              <button
                key={s}
                className={"size-chip size-chip-lg" + (size === s ? " size-chip-active" : "")}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <button className={"btn btn-accent btn-full" + (added ? " btn-added" : "")} onClick={handleAdd}>
            {added ? (
              <>
                <Icon.Check className="icon-16" /> ADDED TO BAG
              </>
            ) : (
              <>
                <Icon.Plus className="icon-16" /> ADD TO CART
              </>
            )}
          </button>

          <div className="detail-tabs">
            <button className={"detail-tab" + (tab === "desc" ? " detail-tab-active" : "")} onClick={() => setTab("desc")}>
              DESCRIPTION
            </button>
            <button className={"detail-tab" + (tab === "size" ? " detail-tab-active" : "")} onClick={() => setTab("size")}>
              SIZE CHART
            </button>
            <button className={"detail-tab" + (tab === "care" ? " detail-tab-active" : "")} onClick={() => setTab("care")}>
              WASH &amp; CARE
            </button>
          </div>

          {tab === "desc" && <p className="detail-text">{product.desc}</p>}

          {tab === "size" && (
            <div className="size-chart-wrap">
              <table className="size-chart">
                <thead>
                  <tr>
                    {chart.columns.map((c) => (
                      <th key={c}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chart.rows.map((row) => (
                    <tr key={row[0]} className={row[0] === size ? "size-chart-row-active" : ""}>
                      {row.map((cell, i) => (
                        <td key={i}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="detail-hint">Measurements are body measurements, in inches. Between sizes? Size up for a relaxed fit.</p>
            </div>
          )}

          {tab === "care" && <p className="detail-text">{product.care}</p>}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Policy ---------------- */
function PolicyPage() {
  const sections = [
    {
      title: "SHIPPING",
      body:
        "Orders ship within 1–2 business days. Standard shipping takes 3–5 business days; express takes 1–2. Free standard shipping on orders over $100.",
    },
    {
      title: "RETURNS & EXCHANGES",
      body:
        "Unworn items with tags attached can be returned within 30 days of delivery for a full refund. Exchanges ship free one time per order.",
    },
    {
      title: "SIZING",
      body:
        "Our fits run true to size. If you're between sizes on compression pieces, size up for a relaxed feel or stay true for full compression.",
    },
    {
      title: "CARE",
      body:
        "Machine wash cold, inside out, like colors. Skip the fabric softener — it breaks down performance fibers. Hang dry when possible.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="policy">
      <div className="section-head">
        <p className="eyebrow">THE FINE PRINT</p>
        <h2 className="section-title">POLICY</h2>
      </div>
      <div className="policy-list">
        {sections.map((s, i) => (
          <div key={s.title} className="policy-item">
            <button className="policy-head" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="policy-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="policy-title">{s.title}</span>
              <Icon.Chevron className={"icon-16 policy-chev" + (open === i ? " policy-chev-open" : "")} />
            </button>
            {open === i && <p className="policy-body">{s.body}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Cart Drawer ---------------- */
function CartDrawer({ open, onClose, cart, updateQty, removeItem, subtotal, setView }) {
  return (
    <>
      {open && <div className="backdrop" onClick={onClose} />}
      <aside className={"cart-drawer" + (open ? " cart-drawer-open" : "")}>
        <div className="cart-drawer-head">
          <h3 className="cart-drawer-title">YOUR BAG</h3>
          <button onClick={onClose} aria-label="Close cart">
            <Icon.Close className="icon-20" />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty. Time to load up.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.key} className="cart-item">
                  <div className="cart-item-swatch" style={{ background: item.color }}>
                    <CategoryIcon category={item.category} className="cart-item-icon" />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-row">
                      <span className="cart-item-name">{item.name}</span>
                      <button className="cart-item-remove" onClick={() => removeItem(item.key)}>
                        REMOVE
                      </button>
                    </div>
                    <span className="cart-item-size">SIZE {item.size}</span>
                    <div className="cart-item-row">
                      <div className="qty-control">
                        <button onClick={() => updateQty(item.key, -1)} aria-label="Decrease">
                          <Icon.Minus className="icon-14" />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.key, 1)} aria-label="Increase">
                          <Icon.Plus className="icon-14" />
                        </button>
                      </div>
                      <span className="cart-item-price">{fmt(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-drawer-footer">
              <div className="cart-subtotal-row">
                <span>SUBTOTAL</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <button
                className="btn btn-accent btn-full"
                onClick={() => {
                  setView("checkout");
                  onClose();
                }}
              >
                CHECKOUT
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ---------------- Checkout ---------------- */
function PaymentSelector({ method, setMethod }) {
  const icons = { cod: Icon.Cash, visa: Icon.Card, fawry: Icon.Store };
  return (
    <div className="payment-grid">
      {PAYMENT_METHODS.map((m) => {
        const Ico = icons[m.key];
        return (
          <button
            type="button"
            key={m.key}
            className={"payment-card" + (method === m.key ? " payment-card-active" : "")}
            onClick={() => setMethod(m.key)}
          >
            <Ico className="icon-20" />
            <span className="payment-label">{m.label}</span>
            <span className="payment-desc">{m.desc}</span>
          </button>
        );
      })}
    </div>
  );
}

function CheckoutPage({ cart, subtotal, shipping, tax, total, onPlaceOrder }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: EGYPT_CITIES[0].name,
    notes: "",
    payment: "cod",
    card: "",
    expiry: "",
    cvc: "",
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setPayment = (key) => setForm((f) => ({ ...f, payment: key }));

  const [error, setError] = useState("");

  const missingFields = () => {
    const missing = [];
    if (!form.name) missing.push("full name");
    if (!form.email) missing.push("email");
    if (!form.phone) missing.push("phone number");
    if (!form.address) missing.push("address");
    if (!form.city) missing.push("city");
    if (form.payment === "visa") {
      if (!form.card) missing.push("card number");
      if (!form.expiry) missing.push("card expiry");
      if (!form.cvc) missing.push("CVC");
    }
    return missing;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError("Your bag is empty — add something before checking out.");
      return;
    }
    const missing = missingFields();
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(", ")}.`);
      return;
    }
    setError("");
    onPlaceOrder(form);
  };

  return (
    <section className="checkout">
      <div className="section-head">
        <p className="eyebrow">STEP 02</p>
        <h2 className="section-title">CHECKOUT</h2>
      </div>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <p className="form-legend">SHIPPING INFO</p>
          <div className="form-row">
            <input className="input" placeholder="Full name" value={form.name} onChange={update("name")} />
            <input className="input" placeholder="Phone number" value={form.phone} onChange={update("phone")} />
          </div>
          <input className="input" placeholder="Email" type="email" value={form.email} onChange={update("email")} />
          <input
            className="input"
            placeholder="Address (street, building, floor, apt)"
            value={form.address}
            onChange={update("address")}
          />
          <div className="form-row">
            <select className="input" value={form.city} onChange={update("city")}>
              {EGYPT_CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder="Delivery notes (optional)"
              value={form.notes}
              onChange={update("notes")}
            />
          </div>

          <p className="form-legend">PAYMENT METHOD</p>
          <PaymentSelector method={form.payment} setMethod={setPayment} />

          {form.payment === "visa" && (
            <>
              <input className="input" placeholder="Card number" value={form.card} onChange={update("card")} />
              <div className="form-row">
                <input className="input" placeholder="MM/YY" value={form.expiry} onChange={update("expiry")} />
                <input className="input" placeholder="CVC" value={form.cvc} onChange={update("cvc")} />
              </div>
            </>
          )}
          {form.payment === "cod" && (
            <p className="form-hint form-hint-left">Pay in cash to the courier when your order arrives. Please have the amount ready.</p>
          )}
          {form.payment === "fawry" && (
            <p className="form-hint form-hint-left">You'll get a Fawry payment code after placing your order — pay at any Fawry outlet within 24 hours.</p>
          )}

          <button type="submit" className="btn btn-accent btn-full">
            PLACE ORDER — {fmt(total)}
          </button>
          {error && <p className="form-hint form-error">{error}</p>}
        </form>

        <div className="order-summary">
          <p className="form-legend">ORDER SUMMARY</p>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.key} className="summary-item">
                <span>
                  {item.name} × {item.qty}
                  <span className="summary-size"> ({item.size})</span>
                </span>
                <span>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="summary-line">
            <span>SUBTOTAL</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>SHIPPING</span>
            <span>{shipping === 0 ? "FREE" : fmt(shipping)}</span>
          </div>
          <div className="summary-line">
            <span>TAX (14%)</span>
            <span>{fmt(tax)}</span>
          </div>
          <div className="summary-line summary-total">
            <span>TOTAL</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfirmationPage({ orderNumber, orderDetails, setView }) {
  if (!orderDetails) {
    return (
      <section className="confirmation">
        <p className="confirmation-text">No recent order found.</p>
        <button className="btn btn-accent" onClick={() => setView("home")}>
          BACK TO HOME
        </button>
      </section>
    );
  }

  const city = EGYPT_CITIES.find((c) => c.name === orderDetails.city) || EGYPT_CITIES[0];
  const bbox = [city.lon - 0.04, city.lat - 0.025, city.lon + 0.04, city.lat + 0.025].join("%2C");
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${city.lat}%2C${city.lon}`;
  const paymentInfo = PAYMENT_METHODS.find((m) => m.key === orderDetails.payment);
  const itemCount = orderDetails.items.reduce((s, i) => s + i.qty, 0);

  return (
    <section className="confirmation confirmation-wide">
      <div className="confirmation-head">
        <div className="confirmation-check">
          <Icon.Check className="icon-32" />
        </div>
        <p className="eyebrow">ORDER CONFIRMED</p>
        <h2 className="section-title">THANKS, {orderDetails.name.split(" ")[0].toUpperCase()} — RACKED &amp; LOADED</h2>
        <p className="confirmation-text">
          Order <span className="mono-strong">#{orderNumber}</span> is confirmed — {itemCount} item{itemCount !== 1 ? "s" : ""}
          , total <span className="mono-strong">{fmt(orderDetails.total)}</span>.
        </p>
      </div>

      <div className="confirmation-grid">
        <div className="confirmation-card">
          <p className="form-legend">DELIVERY DETAILS</p>
          <dl className="detail-list">
            <div><dt>Name</dt><dd>{orderDetails.name}</dd></div>
            <div><dt>Phone</dt><dd>{orderDetails.phone}</dd></div>
            <div><dt>Email</dt><dd>{orderDetails.email}</dd></div>
            <div><dt>Address</dt><dd>{orderDetails.address}</dd></div>
            <div><dt>City</dt><dd>{orderDetails.city}</dd></div>
            {orderDetails.notes && <div><dt>Notes</dt><dd>{orderDetails.notes}</dd></div>}
          </dl>

          <p className="form-legend">PAYMENT</p>
          <div className="confirmation-payment">
            <span className="payment-chip">{paymentInfo.label}</span>
            {orderDetails.payment === "visa" && orderDetails.card && (
              <span className="mono-small">CARD ENDING •••• {orderDetails.card.slice(-4)}</span>
            )}
            {orderDetails.payment === "fawry" && (
              <span className="mono-small">REF CODE: {orderNumber}</span>
            )}
            {orderDetails.payment === "cod" && <span className="mono-small">PAY ON ARRIVAL</span>}
          </div>

          <p className="form-legend">ITEMS</p>
          <div className="summary-items">
            {orderDetails.items.map((item) => (
              <div key={item.key} className="summary-item">
                <span>
                  {item.name} × {item.qty}
                  <span className="summary-size"> ({item.size})</span>
                </span>
                <span>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="summary-line">
            <span>SUBTOTAL</span>
            <span>{fmt(orderDetails.subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>SHIPPING</span>
            <span>{orderDetails.shipping === 0 ? "FREE" : fmt(orderDetails.shipping)}</span>
          </div>
          <div className="summary-line">
            <span>TAX</span>
            <span>{fmt(orderDetails.tax)}</span>
          </div>
          <div className="summary-line summary-total">
            <span>TOTAL</span>
            <span>{fmt(orderDetails.total)}</span>
          </div>
        </div>

        <div className="confirmation-card confirmation-map-card">
          <p className="form-legend">
            <Icon.Pin className="icon-14 map-pin-icon" /> DELIVERY LOCATION
          </p>
          <div className="map-wrap">
            <iframe
              title="Delivery location map"
              className="map-frame"
              src={mapSrc}
              loading="lazy"
            />
          </div>
          <p className="detail-hint">Approximate map centered on {orderDetails.city}. Courier will confirm the exact address by phone.</p>
        </div>
      </div>

      <button className="btn btn-accent" onClick={() => setView("home")}>
        CONTINUE SHOPPING
      </button>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ setView }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <button className="logo" onClick={() => setView("home")}>
            RACKED<span className="logo-dot" />
          </button>
          <p className="footer-tag">Apparel for the work that doesn't show up on camera.</p>
        </div>
        <div className="footer-col">
          <p className="footer-heading">SHOP</p>
          <button onClick={() => setView("shop")}>All Products</button>
          <button onClick={() => setView("shop")}>Tops</button>
          <button onClick={() => setView("shop")}>Bottoms</button>
          <button onClick={() => setView("shop")}>Accessories</button>
        </div>
        <div className="footer-col">
          <p className="footer-heading">COMPANY</p>
          <button onClick={() => setView("policy")}>Shipping</button>
          <button onClick={() => setView("policy")}>Returns</button>
          <button onClick={() => setView("policy")}>Sizing</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="mono-small">SET IN MOTION</span>
      </div>
    </footer>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  const [view, setView] = useState("home");
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setView("product");
    window.scrollTo && window.scrollTo(0, 0);
  };

  const addToCart = (product, size) => {
    const key = `${product.id}-${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { key, id: product.id, name: product.name, price: product.price, category: product.category, color: product.color, size, qty: 1 }];
    });
  };

  const updateQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (key) => setCart((prev) => prev.filter((i) => i.key !== key));

  const [orderDetails, setOrderDetails] = useState(null);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 1500 ? 0 : 60;
  const tax = subtotal * 0.14;
  const total = subtotal + shipping + tax;

  const placeOrder = (formData) => {
    const num = "RK" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(num);
    setOrderDetails({ ...formData, items: cart, subtotal, shipping, tax, total });
    setCart([]);
    setView("confirmation");
  };

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --bg: #191916;
          --bg-alt: #221f1c;
          --card: #232320;
          --ink: #f3f1ea;
          --steel: #96988f;
          --line: #38352f;
          --accent: #ff4520;
          --accent-ink: #1a0d08;
          --olive: #545f3e;
        }
        * { box-sizing: border-box; }
        .app {
          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
        }
        .mono, .mono-small, .mono-strong { font-family: 'JetBrains Mono', monospace; }
        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          color: var(--accent);
          margin: 0 0 10px;
          text-transform: uppercase;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 5vw, 48px);
          letter-spacing: 0.02em;
          margin: 0 0 28px;
        }
        .section-head { padding: 0 6vw; margin-top: 64px; }

        /* header */
        .header { position: sticky; top: 0; z-index: 40; background: rgba(25,25,22,0.92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); }
        .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 6vw; }
        .logo { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 0.05em; background: none; border: none; color: var(--ink); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
        .logo-dot { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; display: inline-block; }
        .nav-desktop { display: flex; gap: 32px; }
        .navlink { background: none; border: none; color: var(--steel); font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.08em; cursor: pointer; padding: 6px 0; border-bottom: 2px solid transparent; transition: color .2s, border-color .2s; }
        .navlink:hover { color: var(--ink); }
        .navlink-active { color: var(--ink); border-bottom-color: var(--accent); }
        .header-actions { display: flex; align-items: center; gap: 18px; }
        .cart-btn { background: none; border: none; color: var(--ink); cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .cart-count { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--accent); }
        .menu-btn { display: none; background: none; border: none; color: var(--ink); cursor: pointer; }
        .icon-14 { width: 14px; height: 14px; }
        .icon-16 { width: 16px; height: 16px; }
        .icon-20 { width: 20px; height: 20px; }
        .icon-32 { width: 32px; height: 32px; }
        .rotate-neg90 { transform: rotate(-90deg); }
        .nav-mobile { display: none; }

        /* barglyph */
        .barglyph { position: relative; display: inline-flex; align-items: center; width: 28px; height: 20px; }
        .barglyph-bar { position: absolute; left: 4px; right: 4px; top: 9px; height: 2px; background: var(--steel); }
        .barglyph-plates { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 2px; }
        .barglyph-plate { width: 4px; height: 16px; background: var(--accent); border-radius: 1px; }

        /* buttons */
        .btn { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.1em; padding: 14px 22px; border-radius: 3px; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: transform .15s ease, background .2s; }
        .btn:active { transform: scale(0.97); }
        .btn-accent { background: var(--accent); color: var(--accent-ink); font-weight: 700; }
        .btn-accent:hover { background: #ff5a38; }
        .btn-accent:disabled { background: #4a3a33; color: #8a8079; cursor: not-allowed; }
        .btn-full { width: 100%; }
        .btn-add { background: var(--card); color: var(--ink); border: 1px solid var(--line); width: 100%; }
        .btn-add:hover { border-color: var(--accent); color: var(--accent); }
        .btn-added { background: var(--olive); color: var(--ink); border-color: var(--olive); }

        /* hero */
        .hero { position: relative; padding: 90px 6vw 70px; overflow: hidden; }
        .hero-stripe { position: absolute; top: 0; right: -10%; width: 60%; height: 100%; background: linear-gradient(135deg, rgba(255,69,32,0.13), rgba(84,95,62,0.08)); clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%); }
        .hero-content { position: relative; max-width: 640px; }
        .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(56px, 10vw, 108px); line-height: 0.92; letter-spacing: 0.01em; margin: 0 0 24px; }
        .hero-sub { color: var(--steel); font-size: 16px; line-height: 1.6; max-width: 440px; margin: 0 0 32px; }

        /* showcase */
        .showcase-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 0 6vw; margin-top: 24px; }
        .showcase-card { background: var(--card); border: 1px solid var(--line); border-radius: 4px; padding: 28px 22px; text-align: left; cursor: pointer; color: var(--ink); position: relative; transition: border-color .2s, transform .2s; }
        .showcase-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .showcase-icon { width: 30px; height: 30px; color: var(--accent); margin-bottom: 40px; }
        .showcase-label { display: block; font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 0.03em; }
        .showcase-desc { display: block; color: var(--steel); font-size: 13px; margin-top: 6px; }
        .showcase-arrow { position: absolute; top: 24px; right: 22px; color: var(--steel); }

        /* strip */
        .strip { margin-top: 70px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 16px 0; overflow: hidden; white-space: nowrap; }
        .strip-track { display: inline-flex; animation: scroll 22s linear infinite; }
        .strip-item { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.04em; padding: 0 18px; color: var(--steel); display: inline-flex; align-items: center; }
        .strip-dot { color: var(--accent); margin-left: 18px; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .strip-track { animation: none; } }

        /* shop */
        .shop { padding-bottom: 80px; }
        .tabs { display: flex; gap: 10px; padding: 0 6vw; margin-bottom: 32px; flex-wrap: wrap; }
        .tab { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.08em; background: var(--card); color: var(--steel); border: 1px solid var(--line); padding: 9px 16px; border-radius: 20px; cursor: pointer; }
        .tab-active { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); font-weight: 700; }
        .product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 0 6vw; }
        .product-card { background: var(--card); border: 1px solid var(--line); border-radius: 4px; overflow: hidden; display: flex; flex-direction: column; }
        .product-swatch { position: relative; height: 180px; display: flex; align-items: center; justify-content: center; width: 100%; border: none; padding: 0; }
        .product-swatch-btn { cursor: pointer; }
        .product-icon { width: 48px; height: 48px; color: rgba(243,241,234,0.55); }
        .product-tag { position: absolute; top: 10px; left: 10px; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; background: rgba(0,0,0,0.35); padding: 3px 8px; border-radius: 10px; color: var(--steel); }
        .product-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .product-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
        .product-name { font-size: 15px; font-weight: 600; margin: 0; }
        .product-name-link { background: none; border: none; color: var(--ink); padding: 0; text-align: left; cursor: pointer; }
        .product-name-link:hover { color: var(--accent); }
        .product-price { font-family: 'JetBrains Mono', monospace; color: var(--accent); font-size: 14px; }
        .size-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .size-chip { font-family: 'JetBrains Mono', monospace; font-size: 11px; background: var(--bg-alt); color: var(--steel); border: 1px solid var(--line); padding: 5px 9px; border-radius: 3px; cursor: pointer; }
        .size-chip-active { border-color: var(--accent); color: var(--ink); }
        .size-chip-lg { padding: 8px 14px; font-size: 12px; }
        .product-detail-link { background: none; border: none; color: var(--steel); font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; padding: 0; text-align: left; }
        .product-detail-link:hover { color: var(--accent); }

        /* product detail */
        .detail { padding: 40px 6vw 90px; }
        .back-link { background: none; border: none; color: var(--steel); font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.06em; cursor: pointer; margin-bottom: 28px; padding: 0; }
        .back-link:hover { color: var(--accent); }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: start; }
        .detail-swatch { height: 460px; border-radius: 6px; display: flex; align-items: center; justify-content: center; position: relative; }
        .detail-icon { width: 96px; height: 96px; color: rgba(243,241,234,0.5); }
        .detail-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(34px, 4vw, 46px); letter-spacing: 0.02em; margin: 4px 0 10px; }
        .detail-price { font-family: 'JetBrains Mono', monospace; color: var(--accent); font-size: 18px; margin: 0 0 26px; }
        .detail-info .form-legend { margin-top: 0; }
        .detail-info .btn-full { margin: 20px 0 30px; }
        .detail-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--line); margin-bottom: 20px; }
        .detail-tab { background: none; border: none; color: var(--steel); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.07em; padding: 10px 6px; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; }
        .detail-tab:hover { color: var(--ink); }
        .detail-tab-active { color: var(--ink); border-bottom-color: var(--accent); }
        .detail-text { color: var(--steel); font-size: 14px; line-height: 1.75; max-width: 480px; }
        .size-chart-wrap { display: flex; flex-direction: column; gap: 12px; }
        .size-chart { width: 100%; border-collapse: collapse; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
        .size-chart th { text-align: left; color: var(--steel); font-weight: 500; padding: 8px 10px; border-bottom: 1px solid var(--line); letter-spacing: 0.05em; }
        .size-chart td { padding: 10px; border-bottom: 1px solid var(--line); color: var(--ink); }
        .size-chart-row-active { background: rgba(255,69,32,0.08); }
        .detail-hint { color: var(--steel); font-size: 12px; }

        /* policy */
        .policy { padding-bottom: 90px; }
        .policy-list { padding: 0 6vw; max-width: 760px; }
        .policy-item { border-top: 1px solid var(--line); }
        .policy-item:last-child { border-bottom: 1px solid var(--line); }
        .policy-head { width: 100%; background: none; border: none; color: var(--ink); display: flex; align-items: center; gap: 18px; padding: 20px 0; cursor: pointer; text-align: left; }
        .policy-index { font-family: 'JetBrains Mono', monospace; color: var(--accent); font-size: 13px; }
        .policy-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.03em; flex: 1; }
        .policy-chev { color: var(--steel); transition: transform .2s; }
        .policy-chev-open { transform: rotate(180deg); }
        .policy-body { color: var(--steel); font-size: 14px; line-height: 1.7; padding: 0 0 22px 40px; max-width: 560px; }

        /* cart drawer */
        .backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 50; }
        .cart-drawer { position: fixed; top: 0; right: -420px; width: 400px; max-width: 90vw; height: 100%; background: var(--bg-alt); border-left: 1px solid var(--line); z-index: 60; display: flex; flex-direction: column; transition: right .3s ease; }
        .cart-drawer-open { right: 0; }
        .cart-drawer-head { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid var(--line); }
        .cart-drawer-head button { background: none; border: none; color: var(--ink); cursor: pointer; }
        .cart-drawer-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.04em; margin: 0; }
        .cart-empty { padding: 40px 20px; color: var(--steel); font-size: 14px; }
        .cart-items { flex: 1; overflow-y: auto; padding: 12px 20px; }
        .cart-item { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--line); }
        .cart-item-swatch { width: 56px; height: 56px; border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .cart-item-icon { width: 24px; height: 24px; color: rgba(243,241,234,0.55); }
        .cart-item-info { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .cart-item-row { display: flex; justify-content: space-between; align-items: center; }
        .cart-item-name { font-size: 14px; font-weight: 600; }
        .cart-item-remove { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.06em; color: var(--steel); background: none; border: none; cursor: pointer; }
        .cart-item-remove:hover { color: var(--accent); }
        .cart-item-size { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--steel); }
        .cart-item-price { font-family: 'JetBrains Mono', monospace; font-size: 13px; }
        .qty-control { display: flex; align-items: center; gap: 10px; background: var(--card); border: 1px solid var(--line); border-radius: 3px; padding: 4px 10px; }
        .qty-control button { background: none; border: none; color: var(--ink); cursor: pointer; display: flex; }
        .qty-control span { font-family: 'JetBrains Mono', monospace; font-size: 12px; min-width: 12px; text-align: center; }
        .cart-drawer-footer { padding: 18px 20px 22px; border-top: 1px solid var(--line); }
        .cart-subtotal-row { display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 14px; }

        /* checkout */
        .checkout { padding: 0 6vw 90px; }
        .checkout-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; align-items: start; }
        .checkout-form { display: flex; flex-direction: column; gap: 12px; background: var(--card); border: 1px solid var(--line); padding: 26px; border-radius: 4px; }
        .form-legend { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; color: var(--accent); margin: 10px 0 2px; }
        .form-legend:first-child { margin-top: 0; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-row-3 { grid-template-columns: 1.4fr 1fr 1fr; }
        .input { background: var(--bg-alt); border: 1px solid var(--line); color: var(--ink); padding: 12px 14px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 14px; width: 100%; }
        .input:focus { outline: none; border-color: var(--accent); }
        .input::placeholder { color: var(--steel); }
        .form-hint { color: var(--steel); font-size: 12px; text-align: center; }
        .form-error { color: var(--accent); }
        .order-summary { background: var(--card); border: 1px solid var(--line); padding: 26px; border-radius: 4px; position: sticky; top: 100px; }
        .summary-items { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; max-height: 220px; overflow-y: auto; }
        .summary-item { display: flex; justify-content: space-between; font-size: 13px; gap: 10px; }
        .summary-size { color: var(--steel); }
        .summary-line { display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--steel); padding: 8px 0; border-top: 1px solid var(--line); }
        .summary-total { color: var(--ink); font-size: 16px; font-weight: 700; border-top: 1px solid var(--line); }

        /* confirmation */
        .confirmation { padding: 100px 6vw; text-align: center; max-width: 560px; margin: 0 auto; }
        .confirmation-check { width: 64px; height: 64px; border-radius: 50%; background: var(--olive); color: var(--ink); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
        .confirmation-text { color: var(--steel); line-height: 1.7; margin: 16px 0 32px; }
        .mono-strong { font-family: 'JetBrains Mono', monospace; color: var(--accent); font-weight: 700; }

        /* payment selector */
        .payment-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 4px; }
        .payment-card { background: var(--bg-alt); border: 1px solid var(--line); border-radius: 4px; padding: 14px 12px; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; cursor: pointer; color: var(--ink); text-align: left; transition: border-color .2s; }
        .payment-card:hover { border-color: var(--steel); }
        .payment-card-active { border-color: var(--accent); background: rgba(255,69,32,0.06); }
        .payment-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; font-weight: 700; }
        .payment-desc { font-size: 11px; color: var(--steel); line-height: 1.4; }
        .form-hint-left { text-align: left; color: var(--steel); font-size: 12px; line-height: 1.6; margin: -4px 0 4px; }

        /* confirmation (wide, with data + map) */
        .confirmation-wide { max-width: 1000px; text-align: center; }
        .confirmation-head { max-width: 560px; margin: 0 auto; }
        .confirmation-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left; margin: 40px 0 36px; }
        .confirmation-card { background: var(--card); border: 1px solid var(--line); border-radius: 4px; padding: 24px; }
        .detail-list { display: flex; flex-direction: column; gap: 10px; margin: 0 0 20px; }
        .detail-list > div { display: flex; justify-content: space-between; gap: 16px; font-size: 13px; border-bottom: 1px solid var(--line); padding-bottom: 8px; }
        .detail-list dt { color: var(--steel); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.05em; }
        .detail-list dd { margin: 0; text-align: right; max-width: 60%; }
        .confirmation-payment { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .payment-chip { background: var(--olive); color: var(--ink); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; padding: 5px 10px; border-radius: 12px; }
        .confirmation-map-card { display: flex; flex-direction: column; }
        .map-pin-icon { color: var(--accent); vertical-align: -2px; margin-right: 4px; }
        .map-wrap { border-radius: 4px; overflow: hidden; border: 1px solid var(--line); flex: 1; min-height: 260px; }
        .map-frame { width: 100%; height: 100%; min-height: 260px; border: none; filter: grayscale(0.3) contrast(1.05); }

        /* footer */
        .footer { margin-top: 100px; border-top: 1px solid var(--line); padding: 50px 6vw 24px; }
        .footer-top { display: flex; justify-content: space-between; gap: 40px; flex-wrap: wrap; margin-bottom: 40px; }
        .footer-tag { color: var(--steel); font-size: 13px; margin-top: 12px; max-width: 240px; }
        .footer-col { display: flex; flex-direction: column; gap: 10px; }
        .footer-heading { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; color: var(--steel); margin-bottom: 4px; }
        .footer-col button { background: none; border: none; color: var(--ink); text-align: left; padding: 0; cursor: pointer; font-size: 13px; opacity: 0.85; }
        .footer-col button:hover { color: var(--accent); opacity: 1; }
        .footer-bottom { display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid var(--line); color: var(--steel); font-size: 12px; }
        .mono-small { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }

        /* focus visibility */
        button:focus-visible, .input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

        /* responsive */
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr; }
          .order-summary { position: static; }
          .product-grid { grid-template-columns: repeat(2, 1fr); }
          .showcase-grid { grid-template-columns: 1fr; }
          .detail-grid { grid-template-columns: 1fr; gap: 28px; }
          .detail-swatch { height: 320px; }
          .confirmation-grid { grid-template-columns: 1fr; }
          .payment-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .nav-desktop { display: none; }
          .menu-btn { display: flex; }
          .nav-mobile { display: flex; flex-direction: column; padding: 8px 6vw 20px; gap: 4px; border-top: 1px solid var(--line); }
          .nav-mobile .navlink { padding: 12px 0; text-align: left; border-bottom: 1px solid var(--line); }
          .product-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .form-row, .form-row-3 { grid-template-columns: 1fr; }
          .hero { padding: 60px 6vw 50px; }
          .cart-drawer { width: 100%; max-width: 100%; }
        }
        @media (max-width: 420px) {
          .product-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Header
        view={view}
        setView={setView}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {view === "home" && (
        <>
          <Hero setView={setView} />
          <CategoryShowcase setView={setView} setCategory={setCategory} />
          <Strip />
        </>
      )}

      {view === "shop" && (
        <ShopPage category={category} setCategory={setCategory} onAdd={addToCart} onOpen={openProduct} />
      )}

      {view === "product" && selectedProduct && (
        <ProductDetail product={selectedProduct} onAdd={addToCart} setView={setView} />
      )}

      {view === "policy" && <PolicyPage />}

      {view === "checkout" && (
        <CheckoutPage
          cart={cart}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          onPlaceOrder={placeOrder}
        />
      )}

      {view === "confirmation" && (
        <ConfirmationPage orderNumber={orderNumber} orderDetails={orderDetails} setView={setView} />
      )}

      <Footer setView={setView} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
        subtotal={subtotal}
        setView={setView}
      />
    </div>
  );
}
