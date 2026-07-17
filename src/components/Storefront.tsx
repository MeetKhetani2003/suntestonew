"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

type IconName = "search" | "heart" | "bag" | "user" | "arrow" | "plus" | "minus" | "close" | "chevron" | "leaf" | "truck" | "shield" | "spark" | "play" | "menu" | "check" | "star" | "instagram" | "mail" | "globe";

type Product = {
  name: string;
  kind: string;
  price: number;
  size: string;
  color: "berry" | "mango" | "fig" | "cacao" | "pitaya" | "berryblue";
  note: string;
  badge?: string;
  image?: string;
  slug: string;
};

export const products: Product[] = [
  { name: "Strawberry Crisp", kind: "Freeze-dried fruit", price: 249, size: "18g · 1.8 cups fresh fruit", color: "berry", note: "Pure fruit. Brightly crisp.", badge: "Bestseller", slug: "strawberry-crisp", image: "/strawberry_hero.png" },
  { name: "Mango Slices", kind: "Freeze-dried fruit", price: 269, size: "20g · Alphonso mango", color: "mango", note: "Sunshine, in every bite.", slug: "mango-slices", image: "/mango_hero.png" },
  { name: "Dark Cacao Berry", kind: "Chocolate-coated fruit", price: 329, size: "70g · 60% dark cacao", color: "cacao", note: "Fruit-forward indulgence.", badge: "New", slug: "dark-cacao-berry", image: "/chocolate-hero.png" },
  { name: "Lemon Dust", kind: "Fruit powder", price: 299, size: "80g · 25 servings", color: "pitaya", note: "A vivid everyday ritual.", slug: "lemon-dust", image: "/lemon-hero.png" },
  { name: "Banana Crisp", kind: "Freeze-dried fruit", price: 279, size: "16g · Mountain grown", color: "berryblue", note: "Sweet and crisp.", slug: "banana-crisp", image: "/banana_hero.png" },
  { name: "Pineapple Crunch", kind: "Whole fruit snack", price: 289, size: "90g · Naturally sweet", color: "fig", note: "The considered snack.", slug: "pineapple-crunch", image: "/pineapple-hero.png" },
];

function Icon({ name, size = 20, stroke = 1.7 }: { name: IconName; size?: number; stroke?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    heart: <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.4 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
    bag: <><path d="M5 8.5h14l-1 12H6l-1-12Z" /><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3" /></>,
    user: <><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20c.7-3.4 3-5.2 6.5-5.2s5.8 1.8 6.5 5.2" /></>,
    arrow: <><path d="M4 12h15" /><path d="m14 6 6 6-6 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chevron: <path d="m7 10 5 5 5-5" />,
    leaf: <><path d="M20 4C11.5 4.2 5.7 7.5 5.7 14.2c0 3.4 2.5 5.7 5.3 5.7C17.8 19.9 20 12.7 20 4Z" /><path d="M4 20c3-4 6.5-6.6 11.3-8.7" /></>,
    truck: <><path d="M3 6h11v10H3zM14 10h3l3 3v3h-6z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>,
    shield: <><path d="M12 3 19 6v5.3c0 4.3-2.9 7.7-7 9.7-4.1-2-7-5.4-7-9.7V6l7-3Z" /><path d="m8.7 12 2.1 2.1 4.6-4.6" /></>,
    spark: <path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Zm7 14 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />,
    play: <path fill="currentColor" stroke="none" d="m9 7 8 5-8 5V7Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    check: <path d="m5 12 4 4L19 6" />,
    star: <path fill="currentColor" stroke="none" d="m12 2.7 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.3l6.2-.9L12 2.7Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.7" r=".7" fill="currentColor" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`wordmark ${inverse ? "wordmark-inverse" : ""}`} aria-label="Sustento home" style={{ display: 'flex', alignItems: 'center' }}>
      <img src={inverse ? "/LOGO/SUSTENTO_LOGO_WHITE.png" : "/LOGO/SUSTENTO_LOGO_BLACK.png"} alt="Sustento logo" style={{ height: '28px', width: 'auto', display: 'block' }} />
    </Link>
  );
}

export function Pack({ product, large = false }: { product: Product; large?: boolean }) {
  if (!product.image) return null;
  return <img src={product.image} alt={`${product.name} package`} className={`pack ${large ? "pack-large" : ""}`} style={{ objectFit: 'contain', background: 'transparent', boxShadow: 'none', padding: 0, filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))', opacity: 1, scale: large ? '1.8' : '1.6' }} />;
}

export function Announcement() {
  return <div className="announcement"><span>Farm-fresh fruit, delicately preserved.</span><span className="announcement-promo">Complimentary shipping on orders over ₹799 <span>·</span> <Link href="/shop">Shop our bestsellers <Icon name="arrow" size={13} /></Link></span></div>;
}

type HeaderProps = { cartCount: number; onCart: () => void; onSearch: () => void };
export function StoreHeader({ cartCount, onCart, onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <header className="site-header">
      <nav className="site-nav shell" aria-label="Main navigation">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"><Icon name={menuOpen ? "close" : "menu"} /></button>
        <div className="nav-links">
          <div className="nav-menu-wrap"><button className="nav-link" onClick={() => setMenuOpen(!menuOpen)}>Shop <Icon name="chevron" size={14} /></button>{menuOpen && <div className="mega-menu"><div><p className="eyebrow">Discover by collection</p><Link href="/shop">All snacks <span>→</span></Link><Link href="/shop">Freeze-dried fruits <span>→</span></Link><Link href="/shop">Chocolate coated <span>→</span></Link><Link href="/shop">Fruit powders <span>→</span></Link></div><div className="mega-highlight"><p>Build your own box</p><span>Save 15% on 4 or more packs.</span><Link href="/shop" className="text-link">Create a box <Icon name="arrow" size={15} /></Link></div></div>}</div>
          <Link href="/story" className="nav-link">Our story</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>
        <Wordmark />
        <div className="nav-actions">
          <button onClick={onSearch} aria-label="Search"><Icon name="search" /></button>
          <Link href="/wishlist" aria-label="Wishlist" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}><Icon name="heart" /></Link>
          <Link href="/account" className="account-action" aria-label="Account" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="user" /></Link>
          <Link href="/cart" className="bag-action" aria-label="Cart" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><Icon name="bag" /><span>{cartCount}</span></Link>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-nav-dropdown" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fcfaf5', padding: '20px 0', borderBottom: '1px solid rgba(34,54,39,.08)', display: 'flex', flexDirection: 'column' }}>
          <div className="shell" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link href="/shop" onClick={() => setMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 600, padding: '10px 0', borderBottom: '1px solid #eee' }}>Shop All Snacks</Link>
            <Link href="/story" onClick={() => setMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 600, padding: '10px 0', borderBottom: '1px solid #eee' }}>Our Story</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 600, padding: '10px 0', borderBottom: '1px solid #eee' }}>Contact</Link>
            <Link href="/account" onClick={() => setMenuOpen(false)} style={{ fontSize: '18px', fontWeight: 600, padding: '10px 0' }}>Account</Link>
          </div>
        </div>
      )}
    </header>
  </>;
}

export function CartDrawer({ open, onClose, count }: { open: boolean; onClose: () => void; count: number }) {
  const [quantity, setQuantity] = useState(Math.max(count, 1));
  if (!open) return null;
  return <div className="overlay" onMouseDown={onClose}><aside className="cart-drawer" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">Your selection</p><h2>Good things inside.</h2></div><button onClick={onClose} aria-label="Close cart"><Icon name="close" /></button></div><div className="cart-item"><Pack product={products[0]} /><div className="cart-item-info"><p>Strawberry Crisp</p><span>18g pouch</span><strong>₹249</strong><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Icon name="minus" size={14} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}><Icon name="plus" size={14} /></button></div></div></div><div className="drawer-foot"><div className="shipping-meter"><div><span>You&apos;re ₹550 away from free delivery</span><strong>₹799</strong></div><i><b></b></i></div><div className="cart-total"><span>Subtotal</span><strong>₹{249 * quantity}</strong></div><Link href="/checkout" className="button button-dark" onClick={onClose}>Checkout securely <Icon name="arrow" size={17} /></Link><p className="payment-line"><Icon name="shield" size={15} /> Safe, secure payments</p></div></aside></div>;
}

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3), [query]);
  if (!open) return null;
  return <div className="search-panel"><div className="search-panel-inner shell"><div className="search-input-row"><Icon name="search" size={23} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What are you looking for?" /><button onClick={onClose}><Icon name="close" /></button></div><div className="search-suggestions"><p className="eyebrow">{query ? "Results" : "Popular right now"}</p>{results.map((product) => <Link href={`/products/${product.slug}`} onClick={onClose} className="search-result" key={product.slug}><Pack product={product} /><span><b>{product.name}</b><small>{product.kind}</small></span><Icon name="arrow" size={16} /></Link>)}</div></div></div>;
}

export function ProductCard({ product, onAdd, index = 0 }: { product: Product; onAdd: (product: Product) => void; index?: number }) {
  const bgColors: Record<string, string> = { berry: "#f9eaea", mango: "#fcf4e3", cacao: "#f2efe9", pitaya: "#fcf0f5", berryblue: "#eef2f6", fig: "#f4f1db" };
  const cardBg = bgColors[product.color] || "#f2eee3";

  return (
    <article className="product-card reveal" style={{ transitionDelay: `${index * 60}ms`, background: cardBg }}>
      <div className="product-card-art">
        <Link href={`/products/${product.slug}`} className="product-art-link" aria-label={`View ${product.name}`}>
          <div className="product-art-inner" onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <img src={product.image} alt={product.name} />
          </div>
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </div>
      <div className="product-card-details">
        <Link href={`/products/${product.slug}`} className="product-card-title">{product.name.toUpperCase()}</Link>
        <p className="product-card-desc"><em>{product.note}</em></p>
        <div className="product-card-pricing">
          <strong className="product-price">₹{product.price}</strong>
          <span className="product-price-old">₹{Math.floor(product.price * 1.38)}</span>
          <span className="product-price-discount">27% OFF</span>
        </div>
        <div className="product-buy-row">
          <button onClick={() => onAdd(product)} className="product-buy-btn">
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, copy, link }: { eyebrow: string; title: ReactNode; copy?: string; link?: string }) { return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{copy && <p className="section-copy">{copy}</p>}{link && <Link className="text-link" href={link}>See all treats <Icon name="arrow" size={16} /></Link>}</div>; }

function TrustPill({ icon, children }: { icon: IconName; children: ReactNode }) { return <div className="trust-pill"><Icon name={icon} size={16} /><span>{children}</span></div>; }

export function Footer() {
  const [done, setDone] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setDone(true); };
  return <footer className="footer"><div className="shell"><div className="footer-top"><div><Wordmark inverse /><p>Food with a little more feeling.<br />Made slowly, for days that move fast.</p></div><div className="newsletter"><p className="eyebrow">A letter from the orchard</p><h3>Small seasonal things,<br />sent your way.</h3><form onSubmit={submit}><input type="email" required placeholder="Your email address" aria-label="Email address" /><button aria-label="Subscribe"><Icon name="arrow" /></button></form>{done && <span className="subscribed">You&apos;re on the list. Welcome in.</span>}</div></div><div className="footer-links"><div><p>Shop</p><Link href="/shop">All products</Link><Link href="/shop">Best sellers</Link><Link href="/shop">Build a box</Link><Link href="/shop">Gift cards</Link></div><div><p>About</p><Link href="/story">Our story</Link><Link href="#process">Our process</Link><Link href="#journal">Journal</Link><Link href="#bulk">Wholesale</Link></div><div><p>Help</p><Link href="#faq">FAQ</Link><Link href="/checkout">Shipping & returns</Link><Link href="/contact">Contact us</Link><Link href="/checkout">Track an order</Link></div><div><p>Follow along</p><a href="https://instagram.com" target="_blank">Instagram <Icon name="arrow" size={14} /></a><a href="https://pinterest.com" target="_blank">Pinterest <Icon name="arrow" size={14} /></a><a href="mailto:hello@sustento.in">hello@sustento.in <Icon name="arrow" size={14} /></a></div></div><div className="footer-bottom"><span>© 2025 Sustento Foods Pvt. Ltd.</span><span>Made with care in India</span><div><Link href="/checkout">Privacy</Link><Link href="/checkout">Terms</Link></div></div></div></footer>;
}

function Hero({ onShop }: { onShop?: () => void }) { return <section className="hero" style={{ minHeight: '100vh', position: 'relative' }}><video className="hero-video" src="/hero.webm" autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} /></section>; }

function CategoryCard({ title, count, product, image, index }: { title: string; count: string; product: Product; image: string; index: number }) { return <Link href="/shop" className={`category-card category-${index}`}><div className="category-image"><img src={image} alt="" style={{ objectFit: 'contain', background: 'var(--sage)' }} /></div><div className="category-label"><div><p>{count}</p><h3>{title}</h3></div><span className="circle-arrow"><Icon name="arrow" size={18} /></span></div></Link>; }

function WhyFreezeDried() { const [active, setActive] = useState(0); const steps = [{ label: "Picked at peak", title: "The ripe moment matters.", copy: "We work with growers to pick each fruit at peak ripeness, when flavour and nutrients have reached their fullest expression.", icon: "✦" }, { label: "Slowly frozen", title: "Nature, paused.", copy: "The fruit is carefully frozen to lock in its vivid colour, cellular structure and fresh-picked character.", icon: "❄" }, { label: "Gently dried", title: "Only the water leaves.", copy: "In a low-temperature vacuum, ice turns to vapour—leaving the goodness, crunch and joy of the fruit behind.", icon: "○" }]; const step = steps[active]; return <section className="freeze-section" id="process"><div className="shell freeze-grid"><div className="freeze-visual" style={{ background: '#f8f6f0', borderRadius: '40px', position: 'relative', overflow: 'hidden', minHeight: '540px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.02)' }}><div style={{ position: 'absolute', width: '100%', height: '100%', background: `radial-gradient(circle at center, ${active === 0 ? 'rgba(252,244,227,1)' : active === 1 ? 'rgba(238,242,246,1)' : 'rgba(249,234,234,1)'} 0%, rgba(248,246,240,0) 70%)`, transition: 'background 0.8s ease' }}></div><img src={active === 0 ? "/mango_hero.png" : active === 1 ? "/banana_hero.png" : "/strawberry_hero.png"} alt="Sustento process" style={{ position: 'relative', width: '380px', objectFit: 'contain', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.2))', transform: `scale(${active === 1 ? 1.05 : 1}) rotate(${active === 0 ? 5 : active === 1 ? -5 : 2}deg)`, transition: 'all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)' }} /><div className="freeze-note note-a" style={{ opacity: active === 0 ? 1 : 0.3, transition: 'opacity 0.4s ease' }}>fresh-picked<br /><b>flavour</b></div><div className="freeze-note note-b" style={{ opacity: active === 1 ? 1 : 0.3, transition: 'opacity 0.4s ease' }}>light &<br /><b>crunchy</b></div><div className="freeze-note note-c" style={{ opacity: active === 2 ? 1 : 0.3, transition: 'opacity 0.4s ease' }}>nothing<br /><b>added</b></div></div><div className="freeze-content"><p className="eyebrow">Why freeze-dried</p><h2>All of the fruit.<br /><em>None of the fuss.</em></h2><p className="freeze-intro">A little science, a lot of respect for the ingredient. Freeze-drying protects the delicious parts of fruit without needing sugar, preservatives or high heat.</p><div className="process-tabs">{steps.map((item, index) => <button className={active === index ? "active" : ""} onClick={() => setActive(index)} key={item.label}><span>0{index + 1}</span>{item.label}<Icon name="arrow" size={16} /></button>)}</div><div className="process-detail"><span>{step.icon}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></div><div style={{ marginTop: '40px' }}><Link href="/shop" className="button button-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', borderRadius: '30px', background: '#2c3e2e', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '14px', transition: 'background 0.2s', boxShadow: '0 8px 20px rgba(44, 62, 46, 0.2)' }} onMouseOver={(e) => e.currentTarget.style.background = '#1a251b'} onMouseOut={(e) => e.currentTarget.style.background = '#2c3e2e'}>Explore products <Icon name="arrow" size={16} /></Link></div></div></div></section>; }

function Showcase() { return <section className="showcase shell"><div className="showcase-card showcase-berry"><div className="showcase-photo"><img src="/strawberry_hero.png" alt="Fresh strawberries being picked on a farm" style={{ objectFit: 'contain', background: '#f6d154' }} /><span className="image-caption">Mahabaleshwar, Maharashtra · 2024 harvest</span></div><div className="showcase-copy"><p className="eyebrow">From farm to family</p><h2>It begins with the <em>good stuff.</em></h2><p>We follow fruit back to the farm, partnering with growers who make room for flavour, patience and a more thoughtful way forward.</p><Link href="#our-story" className="text-link">Our way of growing <Icon name="arrow" size={16} /></Link><div className="origin-stamp"><Icon name="leaf" size={24} /><span>Source<br /><b>with intention</b></span></div></div></div><div className="showcase-card showcase-bowl"><div className="showcase-copy"><p className="eyebrow">Snack slowly</p><h2>A little joy,<br /><em>anywhere.</em></h2><p>Breakfast bowls, afternoon bags, late-night nibbles. The best snacks fit right into the rhythm of your real life.</p><Link href="/shop" className="text-link">Find your favourite <Icon name="arrow" size={16} /></Link></div><div className="showcase-photo"><img src="/banana_hero.png" alt="A colourful bowl of fresh berries" style={{ objectFit: 'contain', background: '#d6af9e' }} /></div></div></section>; }

function ComboSection({ onAdd }: { onAdd: (product: Product) => void }) { return <section className="combos"><div className="shell"><SectionHeading eyebrow="Better together" title={<>Curated for the <em>way you snack.</em></>} copy="Thoughtful bundles of fruit for gifting, sharing, or keeping all to yourself." /><div className="combo-grid"><article className="combo-card combo-card-main">
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '65%' }}>
            <p className="eyebrow">The discovery box</p><h3>Six little reasons<br />to look forward<br />to snack time.</h3><span>₹1,299 <s>₹1,614</s> · Save 20%</span><div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}><button className="button button-dark" onClick={() => onAdd(products[0])}>Add box to bag <Icon name="arrow" size={16} /></button><Link href="/shop" className="button button-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', borderRadius: '30px', border: '1px solid rgba(0,0,0,0.1)', color: '#2c3e2e', textDecoration: 'none', fontWeight: 600, fontSize: '14px', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>Explore products <Icon name="arrow" size={16} /></Link></div></div><div className="combo-packs"><Pack product={products[0]} /><Pack product={products[1]} /><Pack product={products[3]} /></div></article><article className="combo-card combo-card-side"><div className="combo-side-image"><img src="/strawberry_hero.png" alt="Rich ripe strawberries" style={{ objectFit: 'contain', background: '#f5d8d8' }} /></div><div><p className="eyebrow">The berry bunch</p><h3>For the fruit-forward.</h3><span>3 berry favourites · ₹699</span><button onClick={() => onAdd(products[0])} className="text-link">Add to bag <Icon name="arrow" size={16} /></button></div></article></div></div></section>; }

function StorySection() { const [active, setActive] = useState(1); const milestones = [{ year: "2019", title: "An idea took root", text: "A question: could a snack be more delicious and better considered?" }, { year: "2021", title: "Our first harvest", text: "The first strawberry crisps came out of a small kitchen in Pune." }, { year: "2023", title: "Growing together", text: "We grew our grower collective and sent our millionth pouch." }, { year: "Today", title: "Still becoming", text: "More fruit, more growers and more room for goodness." }]; return <section className="story" id="our-story"><div className="shell story-layout"><div className="story-intro"><p className="eyebrow eyebrow-light">Our story</p><h2>We&apos;re here for a more <em>fruitful</em> future.</h2><p>We think everyday food can be a small force for good. That means choosing real ingredients, building enduring farm relationships and making the delicious choice the easy one.</p><Link href="#journal" className="button button-outline-light">Read our story <Icon name="arrow" size={17} /></Link></div><div className="story-timeline">{milestones.map((item, index) => <button onClick={() => setActive(index)} className={active === index ? "active" : ""} key={item.year}><span>{item.year}</span><i></i><div><h3>{item.title}</h3><p>{item.text}</p></div></button>)}</div></div></section>; }

function Reviews() { const [review, setReview] = useState(0); const reviews = [{ quote: "The kind of snack that makes you stop mid-scroll and actually taste your food.", name: "Ananya S.", note: "Strawberry Crisp enthusiast" }, { quote: "My children call them fruit confetti. I call them the easiest win in my pantry.", name: "Rhea J.", note: "Mother of two" }, { quote: "Big flavour, no strange aftertaste. Sustento has turned my 4pm slump into a ritual.", name: "Karan M.", note: "Daily snacker" }]; const item = reviews[review]; return <section className="reviews"><div className="shell reviews-wrap"><p className="eyebrow">Loved by snackers</p><div className="review-stars">★★★★★</div><blockquote>“{item.quote}”</blockquote><div className="review-by"><span className="avatar">{item.name[0]}</span><div><strong>{item.name}</strong><p>{item.note}</p></div></div><div className="review-controls"><button onClick={() => setReview((review + 2) % 3)} aria-label="Previous review">←</button><span>0{review + 1} <i></i> 03</span><button onClick={() => setReview((review + 1) % 3)} aria-label="Next review">→</button></div></div></section>; }

function Gallery() { const images = ["/strawberry_hero.png", "/mango_hero.png", "/chocolate-hero.png", "/banana_hero.png", "/lemon-hero.png"]; return <section className="gallery" id="journal"><div className="shell gallery-head"><div><p className="eyebrow">The Sustento table</p><h2>Made for a <em>life in full colour.</em></h2></div><a href="https://instagram.com" target="_blank" className="text-link"><Icon name="instagram" size={17} /> @sustentofoods</a></div><div className="gallery-strip">{images.map((image, index) => <a href="https://instagram.com" target="_blank" className={`gallery-tile tile-${index}`} key={image}><img src={image} alt="Sustento fruit moment" style={{ objectFit: 'contain', background: 'var(--sage)' }} /><span><Icon name="instagram" size={19} /></span></a>)}</div></section>; }

function FAQ() { const faqs = [{ q: "What exactly is freeze-drying?", a: "It is a gentle preservation method that removes water from frozen fruit at a very low temperature. This keeps the fruit's character wonderfully intact—right down to its crunch." }, { q: "Are your snacks really just fruit?", a: "Yes. Our core crisp range is made from one ingredient: the fruit on the front of the pouch. No added sugar, oil, sulphites or preservatives." }, { q: "How long do they stay fresh?", a: "Every pouch has a 9-month shelf life when sealed. Once open, we recommend enjoying within a few days for the most satisfying crunch." }, { q: "Where do you source your fruit?", a: "We work with a small network of growers in India and beyond who share our care for seasonality, traceability and exceptional flavour." }]; const [open, setOpen] = useState<number | null>(0); return <section className="faq shell" id="faq"><div className="faq-intro"><p className="eyebrow">A little clarity</p><h2>Questions, <em>answered.</em></h2><p>Need something else? Our small team is here for you at <a href="mailto:hello@sustento.in">hello@sustento.in</a>.</p></div><div className="faq-list">{faqs.map((faq, index) => <div className={open === index ? "faq-item open" : "faq-item"} key={faq.q}><button onClick={() => setOpen(open === index ? null : index)}><span>{faq.q}</span><Icon name={open === index ? "minus" : "plus"} size={18} /></button><div><p>{faq.a}</p></div></div>)}</div></section>; }

function ClosingCTA() { return <section className="closing-cta"><div className="closing-fruit closing-left"></div><div className="closing-fruit closing-right"></div><div><p className="eyebrow">Your next good habit</p><h2>Bring a little more<br /><em>fruitfulness</em> home.</h2><Link href="/shop" className="button button-dark">Shop the collection <Icon name="arrow" size={17} /></Link></div></section>; }

export function HomeStorefront() {
  const [cart, setCart] = useState(0); const [cartOpen, setCartOpen] = useState(false); const [searchOpen, setSearchOpen] = useState(false); const [bulkOpen, setBulkOpen] = useState(false);
  const add = () => { setCart((value) => value + 1); setCartOpen(true); };
  return <><Announcement /><StoreHeader cartCount={cart} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} /><main><Hero onShop={() => document.getElementById("best-sellers")?.scrollIntoView({ behavior: "smooth" })} /><section className="trustbar shell"><TrustPill icon="leaf">Made with <b>whole fruit</b></TrustPill><TrustPill icon="spark"><b>Nothing strange</b> added</TrustPill><TrustPill icon="truck">Free shipping over <b>₹799</b></TrustPill><TrustPill icon="shield"><b>30-day</b> happy-snacking promise</TrustPill></section><section className="categories shell"><SectionHeading eyebrow="Find your fruit" title={<>A snack for every<br /><em>little moment.</em></>} copy="Real fruit, reimagined in bright, delicious ways. Pick a path—or follow your craving." /><div className="category-grid"><CategoryCard title="Freeze-dried fruits" count="01 · Crisp & pure" product={products[0]} index={0} image="/strawberry_hero.png" /><CategoryCard title="Chocolate-coated" count="02 · An indulgent layer" product={products[2]} index={1} image="/chocolate-hero.png" /><CategoryCard title="Fruit powders" count="03 · Spoonfuls of colour" product={products[3]} index={2} image="/lemon-hero.png" /></div></section><section className="best-sellers shell" id="best-sellers"><SectionHeading eyebrow="Most loved" title={<>The ones they<br /><em>come back for.</em></>} link="/shop" /><div className="product-grid">{products.slice(0, 4).map((product, index) => <ProductCard product={product} index={index} onAdd={add} key={product.slug} />)}</div></section><WhyFreezeDried /><Showcase /><ComboSection onAdd={add} /><section className="bulk-section-custom shell" id="bulk">
  <div className="bulk-art-custom">
    <img src="/strawberry_hero.png" alt="Strawberry Crisp bulk" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.15)' }} />
  </div>
  <div className="bulk-copy-custom">
    <p className="eyebrow" style={{ color: '#8b9a8b', letterSpacing: '0.15em', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>For workplaces & gatherings</p>
    <h2 style={{ fontSize: 'clamp(48px, 5vw, 64px)', lineHeight: 1.05, margin: '20px 0 30px', color: '#1a251b', letterSpacing: '-0.02em', fontFamily: 'var(--serif)' }}>Good snacks<br />make good <em style={{ color: '#527a54', fontStyle: 'italic' }}>company.</em></h2>
    <p style={{ color: '#556655', fontSize: '16px', lineHeight: 1.6, maxWidth: '420px', marginBottom: '40px' }}>Put better fruit on the table. From team pantries to party favours, we&apos;d love to make something delicious happen with our wholesale boxes.</p>
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button onClick={() => setBulkOpen(true)} className="button button-dark" style={{ alignSelf: 'flex-start', background: '#2c3e2e', color: '#fff', borderRadius: '30px', padding: '16px 32px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s', boxShadow: '0 8px 20px rgba(44, 62, 46, 0.2)', border: 'none', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.background = '#1a251b'} onMouseOut={(e) => e.currentTarget.style.background = '#2c3e2e'}>Talk bulk orders <Icon name="arrow" size={16} /></button>
      <Link href="/shop" className="button button-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', borderRadius: '30px', border: '1px solid rgba(0,0,0,0.1)', color: '#2c3e2e', textDecoration: 'none', fontWeight: 600, fontSize: '14px', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>Explore products <Icon name="arrow" size={16} /></Link>
    </div>
  </div>
</section>
<StoryTeaser /><Reviews /><Gallery /><FAQ /><ClosingCTA /></main><Footer /><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} count={cart} /><SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} /><BulkModal open={bulkOpen} onClose={() => setBulkOpen(false)} /></>;
}

export function ShopStorefront() { const [cart, setCart] = useState(0); const [cartOpen, setCartOpen] = useState(false); const [searchOpen, setSearchOpen] = useState(false); const [sort, setSort] = useState("Featured"); const [selected, setSelected] = useState("All treats"); const collection = selected === "All treats" ? products : products.filter((p) => p.kind.toLowerCase().includes(selected === "Fruit crisps" ? "freeze" : selected === "Choco fruit" ? "chocolate" : "powder")); const sorted = [...collection].sort((a, b) => sort === "Price: low to high" ? a.price - b.price : sort === "Price: high to low" ? b.price - a.price : 0); const add = () => { setCart((v) => v + 1); setCartOpen(true); }; return <><Announcement /><StoreHeader cartCount={cart} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} /><main className="shop-page"><section className="shop-hero"><div className="shell"><p className="eyebrow">The full collection</p><h1>Fruit in its<br /><em>best light.</em></h1><p>Single-ingredient crispness, cacao-coated joy and spoonfuls of colour. No shortcuts, just exceptionally good fruit.</p></div><div className="shop-hero-visual"><span></span><span></span><Pack product={products[1]} large /></div></section><div className="shop-layout shell"><aside className="filter-side"><p className="eyebrow">Filter by</p><div className="filter-group"><span>Collection</span>{["All treats", "Fruit crisps", "Choco fruit", "Fruit powders"].map((filter) => <button className={selected === filter ? "active" : ""} onClick={() => setSelected(filter)} key={filter}>{filter}<i>{filter === "All treats" ? products.length : ""}</i></button>)}</div><div className="filter-group"><span>Snack mood</span><button>Something tangy</button><button>Gift-worthy</button><button>Just fruit</button></div></aside><section className="shop-products"><div className="shop-toolbar"><span>{sorted.length} considered treats</span><label>Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select></label></div><div className="product-grid product-grid-shop">{sorted.map((product, index) => <ProductCard product={product} onAdd={add} index={index} key={product.slug} />)}</div></section></div><section className="shop-callout shell"><span>✦</span><div><p className="eyebrow">A note on our fruit</p><h2>Simple by nature.<br /><em>Special by design.</em></h2></div><p>We preserve the bright, nutrient-rich moment of each fruit with a gentle process that leaves nothing behind but its honest, delicious best.</p><Link href="/#process" className="text-link">See our process <Icon name="arrow" size={16} /></Link></section></main><Footer /><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} count={cart} /><SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} /></>; }

export function ProductStorefront({ slug }: { slug: string }) {
  const initial = products.find((p) => p.slug === slug) ?? products[0];
  const [product] = useState(initial);
  const [cart, setCart] = useState(0); const [cartOpen, setCartOpen] = useState(false); const [searchOpen, setSearchOpen] = useState(false);
  const [variant, setVariant] = useState("Single pouch"); const [quantity, setQuantity] = useState(1); const [tab, setTab] = useState("Ingredients");
  const add = () => { setCart((v) => v + quantity); setCartOpen(true); };
  const details: Record<string, string> = { Ingredients: "That’s it: 100% ripe strawberries. No sugar, no oil, no preservatives, no hidden extras.", Nutrition: "A naturally colourful source of fibre and vitamin C. One pouch starts with nearly two cups of fresh fruit.", Shipping: "Orders leave our Pune studio in 1–2 working days. Complimentary delivery applies to orders over ₹799." };
  const bgColors: Record<string, string> = { berry: "#f9eaea", mango: "#fcf4e3", cacao: "#f2efe9", pitaya: "#fcf0f5", berryblue: "#eef2f6", fig: "#f4f1db" };
  const cardBg = bgColors[product.color] || "#f2eee3";

  return (
    <>
      <Announcement />
      <StoreHeader cartCount={cart} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
      <main className="product-page shell" style={{ padding: '40px 0 140px' }}>
        <div className="breadcrumb" style={{ marginBottom: '40px' }}>
          <Link href="/shop">Shop</Link><span> / </span><Link href="/shop">{product.kind}</Link><span> / </span><span style={{ color: '#111' }}>{product.name}</span>
        </div>
        <div className="product-layout pdp-layout">
          <div className="product-gallery">
            <div className="product-main-image" style={{ background: cardBg }}>
              <img src={product.image} alt={product.name} style={{ width: '85%', height: '85%', objectFit: 'contain', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))' }} />
            </div>
          </div>
          <div className="product-buy" style={{ paddingTop: '20px' }}>
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '16px' }}>{product.kind}</p>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 5vw, 72px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 24px', color: '#111' }}>{product.name}</h1>
            <p style={{ fontSize: '18px', color: '#444', lineHeight: 1.6, marginBottom: '32px' }}>{product.note} Vibrant, whole fruit picked at the right moment and turned into a delicate, lasting crunch.</p>
            <strong style={{ display: 'block', fontSize: '28px', color: '#111', marginBottom: '40px' }}>₹{product.price}</strong>
            
            <div className="purchase-block" style={{ borderTop: '1px solid #ddd', paddingTop: '40px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Choose your size</p>
              <div className="variant-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {["Single pouch", "Pack of 3", "Pack of 6"].map((item, index) => (
                  <button 
                    className={variant === item ? "active" : ""} 
                    onClick={() => setVariant(item)} 
                    key={item}
                    style={{ background: variant === item ? '#111' : '#f5f5f5', color: variant === item ? '#fff' : '#111', border: 'none', padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{item}</span>
                    <small style={{ fontSize: '11px', opacity: 0.7 }}>{index === 0 ? "Try it out" : index === 1 ? "Save 8%" : "Save 15%"}</small>
                  </button>
                ))}
              </div>
              
              <div className="add-row" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div className="quantity" style={{ display: 'flex', alignItems: 'center', border: '1px solid #111', width: '120px', justifyContent: 'space-between', padding: '0 16px' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', height: '54px', display: 'flex', alignItems: 'center' }}><Icon name="minus" size={16} /></button>
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', height: '54px', display: 'flex', alignItems: 'center' }}><Icon name="plus" size={16} /></button>
                </div>
                <button className="add-button" onClick={add} style={{ flex: 1, background: '#111', color: '#fff', border: 'none', fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#333'} onMouseOut={(e) => e.currentTarget.style.background = '#111'}>
                  Add to bag — ₹{product.price * quantity}
                </button>
              </div>
            </div>
            
            <div className="details-accordion" style={{ borderTop: '1px solid #ddd', marginTop: '40px' }}>
              {Object.entries(details).map(([key, value]) => (
                <div className={tab === key ? "open" : ""} key={key} style={{ borderBottom: '1px solid #ddd' }}>
                  <button onClick={() => setTab(tab === key ? "" : key)} style={{ background: 'transparent', border: 'none', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
                    <span>{key}</span>
                    <Icon name={tab === key ? "minus" : "plus"} size={17} />
                  </button>
                  {tab === key && <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6, paddingBottom: '24px', margin: 0 }}>{value}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <section className="related" style={{ marginTop: '160px' }}>
          <SectionHeading eyebrow="Keep exploring" title={<>You might also <em>like these.</em></>} link="/shop" />
          <div className="product-grid">{products.filter((p) => p.slug !== product.slug).slice(0, 4).map((item, index) => <ProductCard product={item} onAdd={add} index={index} key={item.slug} />)}</div>
        </section>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} count={cart} />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}


export function CheckoutStorefront() {
  const [payment, setPayment] = useState("online");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [done, setDone] = useState(false);
  
  const subtotal = 747;
  const onlineDiscount = payment === "online" ? Math.round(subtotal * 0.1) : 0;
  const couponDiscount = applied ? 50 : 0;
  const total = subtotal - onlineDiscount - couponDiscount;
  
  const applyCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (coupon.trim()) setApplied(true);
  };
  
  return (
    <main className="checkout-page" style={{ background: '#f8f6f0', minHeight: '100vh', paddingBottom: '100px' }}>
      <div className="shell" style={{ maxWidth: '1200px' }}>
        <div className="checkout-brand" style={{ padding: '40px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Wordmark />
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#54704f', fontWeight: 600, fontSize: '14px' }}>
            <Icon name="shield" size={16} /> Secure SSL Checkout
          </span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'start' }}>
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#556655', textDecoration: 'none', fontWeight: 600 }}>← Back to bag</Link>
              <span style={{ fontSize: '14px' }}>Already have an account? <Link href="/account" style={{ color: '#1a251b', fontWeight: 600, textDecoration: 'underline' }}>Sign in</Link></span>
            </div>
            
            <div style={{ background: '#fff', padding: '50px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
                <span style={{ background: '#eef0e8', color: 'var(--moss)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>1</span>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', margin: 0 }}>Delivery details</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>First name<input placeholder="Aarav" style={{ padding: '16px', border: '1px solid #e0dfd5', borderRadius: '12px', marginTop: '8px', fontSize: '15px' }} /></label>
                <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>Last name<input placeholder="Sharma" style={{ padding: '16px', border: '1px solid #e0dfd5', borderRadius: '12px', marginTop: '8px', fontSize: '15px' }} /></label>
                <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>Email<input type="email" placeholder="aarav@email.com" style={{ padding: '16px', border: '1px solid #e0dfd5', borderRadius: '12px', marginTop: '8px', fontSize: '15px' }} /></label>
                <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>Mobile number<input type="tel" placeholder="+91 98765 43210" style={{ padding: '16px', border: '1px solid #e0dfd5', borderRadius: '12px', marginTop: '8px', fontSize: '15px' }} /></label>
              </div>
            </div>
            
            <div style={{ background: '#fff', padding: '50px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
                <span style={{ background: '#eef0e8', color: 'var(--moss)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>2</span>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', margin: 0 }}>Shipping address</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>Address<input placeholder="House number, street, landmark" style={{ padding: '16px', border: '1px solid #e0dfd5', borderRadius: '12px', marginTop: '8px', fontSize: '15px' }} /></label>
                <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>City<input placeholder="Mumbai" style={{ padding: '16px', border: '1px solid #e0dfd5', borderRadius: '12px', marginTop: '8px', fontSize: '15px' }} /></label>
                <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>PIN code<input placeholder="400001" style={{ padding: '16px', border: '1px solid #e0dfd5', borderRadius: '12px', marginTop: '8px', fontSize: '15px' }} /></label>
                <label style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>State<select defaultValue="" style={{ padding: '16px', border: '1px solid #e0dfd5', borderRadius: '12px', marginTop: '8px', fontSize: '15px', background: '#fff' }}><option value="" disabled>Select a state</option><option>Maharashtra</option><option>Karnataka</option><option>Delhi</option><option>Goa</option></select></label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '30px', padding: '20px', background: '#f8f6f0', borderRadius: '16px' }}>
                <Icon name="truck" size={24} />
                <div>
                  <b style={{ display: 'block', marginBottom: '4px' }}>Expected delivery in 3–5 working days</b>
                  <p style={{ color: '#556655', fontSize: '14px', margin: 0 }}>We'll share tracking as soon as your fruit is on its way.</p>
                </div>
              </div>
            </div>
            
            <div style={{ background: '#fff', padding: '50px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
                <span style={{ background: '#eef0e8', color: 'var(--moss)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>3</span>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', margin: 0 }}>Payment preference</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button 
                  onClick={() => setPayment("online")}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', border: payment === "online" ? '2px solid var(--moss)' : '1px solid #e0dfd5', borderRadius: '16px', background: payment === "online" ? '#fbfaf8' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: payment === "online" ? '6px solid var(--moss)' : '1px solid #ccc' }}></div>
                    <div>
                      <b style={{ display: 'block', fontSize: '16px' }}>Pay online</b>
                      <small style={{ color: '#556655', fontSize: '13px' }}>UPI, card, net banking & wallets</small>
                    </div>
                  </div>
                  <strong style={{ background: '#eef0e8', color: 'var(--moss)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>Save 10%</strong>
                </button>
                <button 
                  onClick={() => setPayment("cod")}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', border: payment === "cod" ? '2px solid var(--moss)' : '1px solid #e0dfd5', borderRadius: '16px', background: payment === "cod" ? '#fbfaf8' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: payment === "cod" ? '6px solid var(--moss)' : '1px solid #ccc' }}></div>
                    <div>
                      <b style={{ display: 'block', fontSize: '16px' }}>Cash on delivery</b>
                      <small style={{ color: '#556655', fontSize: '13px' }}>Pay when your order arrives</small>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            {!done ? (
              <button onClick={() => setDone(true)} className="button button-dark" style={{ width: '100%', justifyContent: 'center', padding: '20px', fontSize: '18px', borderRadius: '16px' }}>
                Place secure order <Icon name="arrow" size={17} />
              </button>
            ) : (
              <div style={{ background: 'var(--moss)', color: '#fff', padding: '40px', borderRadius: '32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={32} /></div>
                <div>
                  <b style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>Order processing ready</b>
                  <p style={{ margin: 0, opacity: 0.9 }}>Your beautiful selection is ready to be finalized securely.</p>
                </div>
              </div>
            )}
          </section>
          
          <aside style={{ position: 'sticky', top: '40px' }}>
            <div style={{ background: '#fff', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
              <div style={{ marginBottom: '30px' }}>
                <p className="eyebrow">Your order</p>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', margin: 0 }}>A few good things.</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                {[products[0], products[2], products[3]].map((product) => (
                  <div key={product.slug} style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', gap: '16px', alignItems: 'center' }}>
                    <div style={{ background: 'var(--sage)', borderRadius: '12px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Pack product={product} />
                    </div>
                    <div>
                      <b style={{ display: 'block', fontSize: '15px' }}>{product.name}</b>
                      <small style={{ color: '#556655' }}>1 × {product.size.split("·")[0]}</small>
                    </div>
                    <strong>₹{product.price}</strong>
                  </div>
                ))}
              </div>
              
              <form onSubmit={applyCoupon} style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
                <input value={coupon} onChange={(e) => { setCoupon(e.target.value); setApplied(false); }} placeholder="Coupon code" style={{ flex: 1, padding: '14px', border: '1px solid #e0dfd5', borderRadius: '12px' }} />
                <button style={{ padding: '0 24px', background: '#eef0e8', color: 'var(--moss)', fontWeight: 600, border: 'none', borderRadius: '12px', cursor: 'pointer' }}>Apply</button>
              </form>
              {applied && <p style={{ color: 'var(--moss)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><Icon name="check" size={14} /> Welcome gift applied · ₹50 off</p>}
              
              <div style={{ borderTop: '1px solid #e0dfd5', paddingTop: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#556655' }}><span>Subtotal</span><b>₹{subtotal}</b></div>
                {payment === "online" && <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--moss)' }}><span>Online payment reward (10%)</span><b>−₹{onlineDiscount}</b></div>}
                {applied && <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--moss)' }}><span>Coupon discount</span><b>−₹{couponDiscount}</b></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#556655' }}><span>Shipping</span><b style={{ color: 'var(--moss)' }}>Free</b></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 600, marginTop: '10px', paddingTop: '20px', borderTop: '1px solid #e0dfd5' }}><span>Total</span><strong>₹{total}</strong></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px', padding: '0 20px', color: '#556655', fontSize: '14px' }}>
              <Icon name="leaf" size={20} />
              <p style={{ margin: 0 }}>You're choosing snacks made with whole fruit and a little more care.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export function CartStorefront() {
  const [cart, setCart] = useState(0); const [cartOpen, setCartOpen] = useState(false); const [searchOpen, setSearchOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Announcement />
      <StoreHeader cartCount={cart} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
      <main className="shell" style={{ padding: '80px 0', minHeight: '60vh' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: '48px', marginBottom: '40px' }}>Your Bag</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: '24px', alignItems: 'center', paddingBottom: '30px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ background: 'var(--sage)', borderRadius: '16px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Pack product={products[0]} />
              </div>
              <div>
                <p className="eyebrow">{products[0].kind}</p>
                <h3 style={{ fontSize: '20px', margin: '4px 0 8px' }}>{products[0].name}</h3>
                <p style={{ color: '#556655', fontSize: '14px' }}>18g pouch</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                <strong style={{ fontSize: '18px' }}>₹{products[0].price * quantity}</strong>
                <div className="quantity">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Icon name="minus" size={14} /></button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}><Icon name="plus" size={14} /></button>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#889988', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
              </div>
            </div>
          </div>
          <div style={{ background: '#f8f6f0', padding: '40px', borderRadius: '32px' }}>
            <h3 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '24px' }}>Order Summary</h3>
            <div className="shipping-meter" style={{ marginBottom: '30px' }}>
              <div><span>You're ₹550 away from free delivery</span><strong>₹799</strong></div><i><b></b></i>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#556655' }}><span>Subtotal</span><span>₹{products[0].price * quantity}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: '#556655' }}><span>Shipping</span><span>Calculated at checkout</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '20px', fontWeight: 600, borderTop: '1px solid #e0dfd5', paddingTop: '24px' }}><span>Total</span><span>₹{products[0].price * quantity}</span></div>
            <Link href="/checkout" className="button button-dark" style={{ width: '100%', justifyContent: 'center', padding: '18px' }}>Proceed to Checkout <Icon name="arrow" size={16} /></Link>
            <p className="payment-line" style={{ marginTop: '20px', justifyContent: 'center' }}><Icon name="shield" size={15} /> Safe, secure payments</p>
          </div>
        </div>
        <section className="related" style={{ marginTop: '80px' }}>
          <SectionHeading eyebrow="Keep exploring" title={<>You might also <em>like these.</em></>} link="/shop" />
          <div className="product-grid">{products.slice(1, 5).map((item, index) => <ProductCard product={item} onAdd={() => {}} index={index} key={item.slug} />)}</div>
        </section>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} count={cart} />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export function AccountStorefront() {
  const [cart, setCart] = useState(0); const [cartOpen, setCartOpen] = useState(false); const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Orders");
  
  const dummyOrders = [
    { id: "#ORD-8492", date: "Oct 12, 2025", status: "Delivered", items: ["Strawberry Crisp", "Mango Slices"], total: 850 },
    { id: "#ORD-7102", date: "Sep 04, 2025", status: "Delivered", items: ["The Discovery Box"], total: 1250 }
  ];

  return (
    <>
      <Announcement />
      <StoreHeader cartCount={cart} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
      <main className="shell" style={{ padding: '80px 0', minHeight: '60vh' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: '48px', marginBottom: '10px' }}>My Account</h1>
        <p style={{ color: '#556655', marginBottom: '60px' }}>Welcome back, Aarav.</p>
        
        <div className="account-layout">
          <aside className="account-nav">
            {["Orders", "Profile Details", "Addresses"].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '12px', background: activeTab === tab ? '#f8f6f0' : 'transparent', fontWeight: activeTab === tab ? 600 : 400, color: '#1a251b', border: 'none', cursor: 'pointer', fontSize: '15px' }}
              >{tab}</button>
            ))}
            <button style={{ textAlign: 'left', padding: '12px 16px', color: '#d9534f', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '15px' }}>Sign out</button>
          </aside>
          
          <div>
            {activeTab === "Orders" && (
              <div>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '24px' }}>Order History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {dummyOrders.map(order => (
                    <div key={order.id} className="account-order-card">
                      <div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '18px' }}>{order.id}</strong>
                          <span style={{ background: '#eef0e8', color: 'var(--moss)', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{order.status}</span>
                        </div>
                        <p style={{ color: '#556655', fontSize: '14px', marginBottom: '16px' }}>{order.date}</p>
                        <p style={{ fontSize: '14px' }}>{order.items.join(" · ")}</p>
                      </div>
                      <div className="account-order-total">
                        <strong style={{ display: 'block', fontSize: '20px', marginBottom: '12px' }}>₹{order.total}</strong>
                        <button className="button button-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>View receipt</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "Profile Details" && (
              <div style={{ maxWidth: '500px' }}>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '24px' }}>Profile Details</h3>
                <div className="form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>First name<input defaultValue="Aarav" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '6px' }} /></label>
                  <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>Last name<input defaultValue="Sharma" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '6px' }} /></label>
                  <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600 }}>Email address<input type="email" defaultValue="aarav@email.com" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '6px' }} /></label>
                  <button className="button button-dark" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>Save changes</button>
                </div>
              </div>
            )}
            
            {activeTab === "Addresses" && (
              <div>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '24px' }}>Saved Addresses</h3>
                <div style={{ border: '1px solid var(--line)', borderRadius: '24px', padding: '30px', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '30px', right: '30px', background: '#eef0e8', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>Default</span>
                  <strong style={{ display: 'block', fontSize: '18px', marginBottom: '12px' }}>Aarav Sharma</strong>
                  <p style={{ color: '#556655', lineHeight: 1.6, fontSize: '14px' }}>142 Palm Meadows, Whitefield<br/>Bengaluru, Karnataka<br/>560066<br/>India</p>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#1a251b', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Edit</button>
                    <button style={{ background: 'none', border: 'none', color: '#d9534f', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Delete</button>
                  </div>
                </div>
                <button className="button button-outline" style={{ marginTop: '24px' }}>+ Add new address</button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} count={cart} />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export function StoryTeaser() {
  return (
    <section className="shell" style={{ padding: '100px 0', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
      <p className="eyebrow">Our Story</p>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 56px)', margin: '20px 0 35px' }}>We&apos;re here for a more <em>fruitful</em> future.</h2>
      <Link href="/story" className="button button-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', borderRadius: '30px', border: '1px solid rgba(0,0,0,0.1)', color: '#2c3e2e', textDecoration: 'none', fontWeight: 600 }}>Read our story <Icon name="arrow" size={16} /></Link>
    </section>
  );
}

export function BulkModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); };
  if (!open) return null;
  return (
    <div className="overlay" onMouseDown={onClose} style={{ zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" onMouseDown={e => e.stopPropagation()} style={{ background: '#fff', padding: '40px', borderRadius: '24px', width: '90%', maxWidth: '500px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}><Icon name="close" /></button>
        {!done ? (
          <>
            <p className="eyebrow" style={{ color: '#54704f' }}>Wholesale Inquiry</p>
            <h2 style={{ fontSize: '32px', marginBottom: '20px', fontFamily: 'var(--serif)' }}>Let&apos;s talk bulk orders.</h2>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600, color: '#1a251b' }}>Name<input required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '4px', fontSize: '15px' }} /></label>
              <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600, color: '#1a251b' }}>Email<input required type="email" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '4px', fontSize: '15px' }} /></label>
              <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600, color: '#1a251b' }}>Company / Organization<input required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '4px', fontSize: '15px' }} /></label>
              <label style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600, color: '#1a251b' }}>Inquiry Details<textarea required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '4px', minHeight: '100px', resize: 'vertical', fontSize: '15px' }}></textarea></label>
              <button className="button button-dark" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>Submit Inquiry <Icon name="arrow" size={16} /></button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ background: 'var(--moss)', width: '64px', height: '64px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><Icon name="check" size={32} /></div>
            <h2 style={{ fontSize: '28px', margin: '0 0 16px', fontFamily: 'var(--serif)' }}>Inquiry Received</h2>
            <p style={{ color: '#556655', lineHeight: 1.6 }}>Thank you for reaching out. Our team will get back to you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function StoryStorefront() {
  const [cart, setCart] = useState(0); const [cartOpen, setCartOpen] = useState(false); const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <Announcement />
      <StoreHeader cartCount={cart} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
      <main className="story-page" style={{ paddingBottom: '100px' }}>
        
        {/* Story Hero */}
        <section className="story-hero-section">
          <div className="shell story-hero-content">
            <p className="eyebrow" style={{ color: '#54704f' }}>Our Story</p>
            <h1>
              We&apos;re here for a <br/><em style={{ color: '#527a54', fontStyle: 'italic' }}>fruitful</em> future.
            </h1>
            <p>
              What started as a search for a better snack for our own families turned into a mission to preserve the honest, bright joy of whole fruit.
            </p>
          </div>
          
          {/* Decorative floating fruits */}
          <img src="/strawberry_hero.png" alt="" className="story-hero-fruit-1" />
          <img src="/mango_hero.png" alt="" className="story-hero-fruit-2" />
        </section>

        {/* The Philosophy */}
        <section className="shell story-philosophy-section">
          <div className="story-philosophy-container">
            <div className="story-philosophy-text">
              <p className="eyebrow">Our Philosophy</p>
              <h2>Rooted in <em>respect.</em></h2>
              <p>
                We believe that nature already perfected the snack. There is no need for added sugars, strange preservatives, or complicated ingredient lists.
              </p>
              <p>
                By partnering directly with farmers we trust, we ensure that every piece of fruit is harvested at its absolute peak of ripeness, and gently preserved to lock in that exact moment.
              </p>
            </div>
            <div className="story-philosophy-image">
              <div className="story-philosophy-bg"></div>
              <img src="/pineapple-hero.png" alt="Pineapple" />
            </div>
          </div>
        </section>

        {/* The Process Steps */}
        <section className="shell story-process-section">
          <div className="story-process-header">
            <p className="eyebrow">How we do it</p>
            <h2>Slowly, with care.</h2>
          </div>
          
          <div className="story-process-grid">
            {[
              { num: '01', title: 'Peak Harvest', desc: 'We wait patiently. Our fruit stays on the branch until the sun brings out its fullest, sweetest flavour.', icon: 'leaf' as IconName },
              { num: '02', title: 'Gentle Preservation', desc: 'Using careful freeze-drying methods, we remove the water but keep the vibrant colour, nutrients, and crunch.', icon: 'spark' as IconName },
              { num: '03', title: 'Honest Packaging', desc: 'No sneaky ingredients are added. What goes into our pouches is just 100% real fruit, ready to be enjoyed anywhere.', icon: 'shield' as IconName }
            ].map(step => (
              <div key={step.num} className="story-process-card">
                <div className="story-process-icon">
                  <Icon name={step.icon} size={24} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#8b9a8b', marginBottom: '8px' }}>Phase {step.num}</span>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '16px' }}>{step.title}</h3>
                <p style={{ color: '#556655', lineHeight: 1.6, fontSize: '15px', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission / Quote */}
        <section className="shell story-quote-section">
          <div className="story-quote-container">
            <div className="story-quote-content">
              <Icon name="star" size={32} />
              <h2>
                &quot;We&apos;re redefining what a snack can be. Something that feels light, tastes decadent, and treats the earth with kindness.&quot;
              </h2>
              <p>The Sustento Team</p>
            </div>
            
            {/* Background elements */}
            <div className="story-quote-bg"></div>
          </div>
        </section>
        
        {/* Next step CTA */}
        <section className="shell story-cta-section">
          <p className="eyebrow">Taste the difference</p>
          <h2>Ready to explore?</h2>
          <Link href="/shop" className="button button-dark story-cta-btn">Shop the collection <Icon name="arrow" size={16} /></Link>
        </section>

      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} count={cart} />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export function ContactStorefront() {
  const [cart, setCart] = useState(0); const [cartOpen, setCartOpen] = useState(false); const [searchOpen, setSearchOpen] = useState(false);
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); };
  return (
    <>
      <Announcement />
      <StoreHeader cartCount={cart} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
      <main className="shell contact-page-section">
        <p className="eyebrow" style={{ textAlign: 'center' }}>Get in touch</p>
        <h1>We&apos;d love to <em>hear from you.</em></h1>
        <p className="contact-subtitle">Whether you have a question about our fruit, your order, or just want to say hello, we&apos;re here.</p>
        {!done ? (
          <form onSubmit={submit} className="contact-form">
            <div className="contact-form-row">
              <label>First name<input required /></label>
              <label>Last name<input required /></label>
            </div>
            <label className="full">Email<input required type="email" /></label>
            <label className="full">Message<textarea required></textarea></label>
            <button className="button button-dark contact-submit">Send message <Icon name="arrow" size={16} /></button>
          </form>
        ) : (
          <div className="contact-success">
            <div className="contact-success-icon"><Icon name="check" size={40} /></div>
            <h2>Message sent!</h2>
            <p>Thank you. We&apos;ll be in touch as soon as possible.</p>
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} count={cart} />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export function WishlistStorefront() {
  const [cart, setCart] = useState(0); 
  const [cartOpen, setCartOpen] = useState(false); 
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Dummy wishlist items
  const wishlistItems = products.slice(1, 4);

  return (
    <>
      <Announcement />
      <StoreHeader cartCount={cart} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
      <main className="shell" style={{ padding: '80px 0', minHeight: '70vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
          <div>
            <p className="eyebrow">Your selection</p>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: '48px', margin: '8px 0 0' }}>Wishlist.</h1>
          </div>
          <span style={{ color: '#556655', fontSize: '15px' }}>{wishlistItems.length} items</span>
        </div>
        
        {wishlistItems.length > 0 ? (
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {wishlistItems.map((item, index) => (
              <ProductCard 
                product={item} 
                onAdd={() => { setCart(cart + 1); setCartOpen(true); }} 
                index={index} 
                key={item.slug} 
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', background: '#f8f6f0', borderRadius: '32px' }}>
            <div style={{ background: '#eef0e8', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--moss)' }}>
              <Icon name="heart" size={32} />
            </div>
            <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '16px' }}>Your wishlist is empty</h2>
            <p style={{ color: '#556655', marginBottom: '30px' }}>Save your favorite snacks here for later.</p>
            <Link href="/shop" className="button button-dark" style={{ display: 'inline-flex', padding: '14px 28px' }}>Explore snacks <Icon name="arrow" size={16} /></Link>
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} count={cart} />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
