
import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Package, Camera, Sparkles, BarChart3, CreditCard,
  Settings, Bell, ChevronRight, Menu, X, Upload, Loader2, Check,
  TrendingUp, Users, ShoppingBag, Zap, Star, ArrowRight, Moon, Sun,
  LogOut, ChevronDown, Eye, Heart, Download, Plus, Image, Shirt,
  RotateCcw, Play, Shield, Globe, Layers, AlertCircle
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockProducts = [
  { id: 1, name: "Silk Wrap Dress", category: "Dresses", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop", tryOns: 142, conversions: 38 },
  { id: 2, name: "Linen Blazer", category: "Tops", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop", tryOns: 98, conversions: 22 },
  { id: 3, name: "Pleated Trousers", category: "Bottoms", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop", tryOns: 76, conversions: 19 },
  { id: 4, name: "Cashmere Sweater", category: "Tops", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop", tryOns: 210, conversions: 67 },
  { id: 5, name: "Maxi Skirt", category: "Bottoms", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=300&h=400&fit=crop", tryOns: 54, conversions: 11 },
  { id: 6, name: "Structured Coat", category: "Outerwear", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop", tryOns: 189, conversions: 52 },
];

const tryOnData = [
  { day: "Mon", tryOns: 34 }, { day: "Tue", tryOns: 58 }, { day: "Wed", tryOns: 47 },
  { day: "Thu", tryOns: 72 }, { day: "Fri", tryOns: 91 }, { day: "Sat", tryOns: 83 },
  { day: "Sun", tryOns: 62 },
];
const conversionData = [
  { month: "Jan", rate: 2.1 }, { month: "Feb", rate: 2.8 }, { month: "Mar", rate: 3.2 },
  { month: "Apr", rate: 2.9 }, { month: "May", rate: 3.8 }, { month: "Jun", rate: 4.2 },
  { month: "Jul", rate: 4.7 }, { month: "Aug", rate: 5.1 },
];
const topProducts = [
  { name: "Cashmere Sweater", value: 67 }, { name: "Structured Coat", value: 52 },
  { name: "Silk Wrap Dress", value: 38 }, { name: "Linen Blazer", value: 22 },
  { name: "Pleated Trousers", value: 19 },
];
const pieData = [
  { name: "Try-On", value: 40 }, { name: "Size Rec", value: 30 },
  { name: "Outfit Gen", value: 20 }, { name: "Photo Gen", value: 10 },
];
const PIE_COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"];

const outfitSuggestions = [
  { id: 1, title: "Parisian Chic", items: ["Linen Blazer", "Pleated Trousers", "White Shirt"], image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop" },
  { id: 2, title: "Weekend Casual", items: ["Cashmere Sweater", "Maxi Skirt", "Sneakers"], image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop" },
  { id: 3, title: "Power Dressing", items: ["Structured Coat", "Silk Wrap Dress", "Heels"], image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop" },
  { id: 4, title: "Editorial Look", items: ["Silk Wrap Dress", "Statement Belt", "Boots"], image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=400&h=500&fit=crop" },
];

const STATS = [
  { label: "Total Try-Ons", value: "12,847", change: "+18%", icon: Eye, color: "indigo" },
  { label: "Conversion Rate", value: "5.1%", change: "+2.3%", icon: TrendingUp, color: "violet" },
  { label: "Active Users", value: "3,241", change: "+9%", icon: Users, color: "purple" },
  { label: "Revenue Impact", value: "$48,320", change: "+31%", icon: ShoppingBag, color: "fuchsia" },
];

// ─── THEME & UTILS ────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "try-on", label: "AI Try-On", icon: Camera },
  { id: "outfit-generator", label: "Outfit Generator", icon: Sparkles },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function LoadingSpinner({ size = "md", className = "" }) {
  const sz = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-10 h-10" : "w-6 h-6";
  return <Loader2 className={`${sz} animate-spin text-indigo-500 ${className}`} />;
}

function Badge({ children, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    violet: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

function Card({ children, className = "", hover = false }) {
  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm ${hover ? "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", size = "md", onClick, className = "", disabled = false, icon: Icon }) {
  const base = "inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-sm",
    secondary: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-gray-400",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 focus:ring-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    gradient: "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 focus:ring-indigo-500",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-6 py-3 text-base" };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

function Input({ label, type = "text", placeholder, value, onChange, className = "" }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
    </div>
  );
}

function Select({ label, options, value, onChange, className = "" }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <select
        value={value} onChange={onChange}
        className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function UploadImage({ label = "Upload Image", onUpload, preview }) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();
  const handleFile = (f) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    onUpload(url);
  };
  return (
    <div
      onClick={() => fileRef.current.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
      className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200
        ${dragging ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30" : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20"}
        ${preview ? "min-h-[200px]" : "min-h-[160px]"}`}
    >
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
      {preview ? (
        <img src={preview} alt="Preview" className="w-full max-h-48 object-cover rounded-xl" />
      ) : (
        <>
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center">
            <Upload className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
          </div>
        </>
      )}
    </div>
  );
}

function ImagePreview({ src, alt = "Preview", onRemove }) {
  if (!src) return null;
  return (
    <div className="relative group rounded-2xl overflow-hidden">
      <img src={src} alt={alt} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        {onRemove && (
          <button onClick={onRemove} className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function ResultViewer({ src, loading }) {
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex flex-col items-center justify-center gap-4 h-80 border-2 border-dashed border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 rounded-full animate-ping opacity-75" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">AI is working its magic…</p>
          <p className="text-xs text-gray-400 mt-1">This usually takes 3–5 seconds</p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }
  if (!src) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex flex-col items-center justify-center gap-3 h-80 border-2 border-dashed border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
          <Image className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-400">Result will appear here</p>
      </div>
    );
  }
  return (
    <div className="relative rounded-2xl overflow-hidden group">
      <img src={src} alt="AI Result" className="w-full h-80 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="secondary" size="sm" icon={Download} className="flex-1 bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30">Download</Button>
        <Button variant="secondary" size="sm" icon={Heart} className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30">Save</Button>
      </div>
    </div>
  );
}

function ProductCard({ product, selectable, selected, onSelect }) {
  return (
    <Card hover className={`overflow-hidden cursor-pointer transition-all ${selectable && selected ? "ring-2 ring-indigo-500 shadow-indigo-100 dark:shadow-indigo-900/30" : ""}`}
      onClick={() => selectable && onSelect && onSelect(product)}>
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        {selectable && selected && (
          <div className="absolute top-3 right-3 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge>{product.category}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{product.name}</h3>
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{product.tryOns} try-ons</span>
          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{product.conversions} conv.</span>
        </div>
      </div>
    </Card>
  );
}

function OutfitCard({ outfit, saved, onSave }) {
  return (
    <Card hover className="overflow-hidden">
      <div className="relative">
        <img src={outfit.image} alt={outfit.title} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-semibold text-white text-sm">{outfit.title}</p>
          <p className="text-white/70 text-xs mt-1">{outfit.items.join(" · ")}</p>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex gap-1">
          {outfit.items.slice(0, 3).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-indigo-400" style={{ opacity: 1 - i * 0.25 }} />
          ))}
        </div>
        <button onClick={() => onSave(outfit.id)}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${saved ? "text-rose-500" : "text-gray-400 hover:text-rose-400"}`}>
          <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </Card>
  );
}

function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-5">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </Card>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  const colorMap = {
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
    violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    fuchsia: "bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-600 dark:text-fuchsia-400",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
          <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" />{stat.change} this month
          </span>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[stat.color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ currentPage, setPage, dark, collapsed, setCollapsed }) {
  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden" onClick={() => setCollapsed(true)} />
      )}
      <aside className={`fixed top-0 left-0 h-full z-30 flex flex-col
        bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 transition-all duration-300
        ${collapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64"}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <Shirt className="w-4 h-4 text-white" />
          </div>
          {!collapsed && <span className="font-bold text-gray-900 dark:text-gray-100 text-sm tracking-tight">FashionAI</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button key={item.id} onClick={() => { setPage(item.id); setCollapsed(window.innerWidth < 1024); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${active
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"}`}>
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        {!collapsed && (
          <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">Jane Cooper</p>
                <p className="text-xs text-gray-500 truncate">Growth Plan</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ dark, setDark, collapsed, setCollapsed }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button onClick={() => setCollapsed(!collapsed)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900 dark:text-gray-100">Acme Fashion Store</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setDark(!dark)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 ml-1 cursor-pointer" />
      </div>
    </header>
  );
}

function DashboardLayout({ children, currentPage, setPage, dark, setDark }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className={`min-h-screen ${dark ? "dark" : ""} bg-gray-50 dark:bg-gray-950`}>
      <Sidebar currentPage={currentPage} setPage={setPage} dark={dark} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`transition-all duration-300 ${collapsed ? "lg:pl-16" : "lg:pl-64"}`}>
        <Navbar dark={dark} setDark={setDark} collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, Jane. Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(s => <StatCard key={s.label} stat={s} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard className="lg:col-span-2" title="Try-On Activity" subtitle="Last 7 days">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={tryOnData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-800" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", fontSize: 12 }} />
              <Area type="monotone" dataKey="tryOns" stroke="#6366f1" strokeWidth={2.5} fill="url(#g1)" dot={false} activeDot={{ r: 5, fill: "#6366f1" }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="AI Feature Usage" subtitle="Distribution this month">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-gray-100">{d.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Top Products by Conversions</h3>
            <p className="text-xs text-gray-500 mt-0.5">Ranked by try-on to purchase rate</p>
          </div>
        </div>
        <div className="space-y-3">
          {mockProducts.slice(0, 4).map((p, i) => (
            <div key={p.id} className="flex items-center gap-4">
              <span className="w-5 text-xs font-bold text-gray-400">{i + 1}</span>
              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{p.name}</p>
                <p className="text-xs text-gray-500">{p.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.conversions}</p>
                <p className="text-xs text-gray-500">conversions</p>
              </div>
              <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${(p.conversions / 70) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ProductsPage() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Dresses");
  const [products, setProducts] = useState(mockProducts);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!name) return;
    setSaving(true);
    setTimeout(() => {
      setProducts([...products, {
        id: Date.now(), name, category,
        image: image || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=400&fit=crop",
        tryOns: 0, conversions: 0
      }]);
      setName(""); setImage(null); setSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your clothing catalog for AI features</p>
        </div>
        <Badge color="violet">{products.length} items</Badge>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Product Image</label>
            <UploadImage onUpload={setImage} preview={image} />
          </div>
          <div className="space-y-4">
            <Input label="Product Name" placeholder="e.g. Silk Wrap Dress" value={name} onChange={e => setName(e.target.value)} />
            <Select label="Category" value={category} onChange={e => setCategory(e.target.value)}
              options={["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"].map(v => ({ value: v, label: v }))} />
            <Button onClick={handleSave} disabled={saving || !name} icon={saving ? Loader2 : Plus} className="w-full justify-center mt-2">
              {saving ? "Saving…" : "Add Product"}
            </Button>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-3">Your Catalog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}

function TryOnPage() {
  const [step, setStep] = useState(1);
  const [userPhoto, setUserPhoto] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    setLoading(true); setResult(null);
    setTimeout(() => {
      setResult("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop");
      setLoading(false);
    }, 3500);
  };

  const canGenerate = userPhoto && selectedProduct;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Virtual Try-On</h1>
        <p className="text-sm text-gray-500 mt-0.5">Let customers see how clothes look on them before buying</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${step >= s ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`}>{s}</div>
            {s < 3 && <div className={`h-0.5 w-12 transition-all ${step > s ? "bg-indigo-500" : "bg-gray-200 dark:bg-gray-700"}`} />}
          </div>
        ))}
        <div className="ml-3 flex gap-4 text-xs text-gray-500">
          <span className={step >= 1 ? "text-indigo-600 font-medium" : ""}>Upload Photo</span>
          <span className={step >= 2 ? "text-indigo-600 font-medium" : ""}>Select Item</span>
          <span className={step >= 3 ? "text-indigo-600 font-medium" : ""}>Generate</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Step 1 — User Photo</h3>
              {userPhoto && <Badge color="green">✓ Ready</Badge>}
            </div>
            {userPhoto ? (
              <div className="space-y-3">
                <ImagePreview src={userPhoto} onRemove={() => { setUserPhoto(null); setStep(1); }} />
                <Button variant="secondary" size="sm" onClick={() => { setUserPhoto(null); setStep(1); }} className="w-full justify-center">Change Photo</Button>
              </div>
            ) : (
              <UploadImage label="Upload user photo" onUpload={(url) => { setUserPhoto(url); setStep(2); }} />
            )}
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Step 2 — Select Clothing</h3>
              {selectedProduct && <Badge color="green">✓ {selectedProduct.name}</Badge>}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto">
              {mockProducts.map(p => (
                <div key={p.id} onClick={() => { setSelectedProduct(p); if (userPhoto) setStep(3); }}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedProduct?.id === p.id ? "border-indigo-500" : "border-transparent"}`}>
                  <img src={p.image} alt={p.name} className="w-full h-24 object-cover" />
                  {selectedProduct?.id === p.id && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 p-1.5">
                    <p className="text-white text-xs font-medium truncate">{p.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Button onClick={handleGenerate} disabled={!canGenerate || loading} variant="gradient" size="lg" icon={canGenerate && !loading ? Play : undefined} className="w-full justify-center">
            {loading ? <><LoadingSpinner size="sm" />Generating Try-On…</> : "Generate Try-On"}
          </Button>
        </div>

        <div>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Step 3 — Result</h3>
              {result && !loading && <Badge color="green">✓ Generated</Badge>}
            </div>
            <ResultViewer src={result} loading={loading} />
            {result && !loading && (
              <div className="mt-3 flex gap-2">
                <Button variant="primary" size="sm" icon={Download} className="flex-1 justify-center">Download</Button>
                <Button variant="secondary" size="sm" icon={RotateCcw} onClick={() => { setResult(null); setStep(1); setUserPhoto(null); setSelectedProduct(null); }}>Reset</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function OutfitGeneratorPage() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState([]);
  const [saved, setSaved] = useState({});

  const handleGenerate = () => {
    setLoading(true); setOutfits([]);
    setTimeout(() => { setOutfits(outfitSuggestions); setLoading(false); }, 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Outfit Generator</h1>
        <p className="text-sm text-gray-500 mt-0.5">Generate complete outfit suggestions around any clothing item</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-3">Select Clothing Item</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {mockProducts.map(p => (
              <div key={p.id} onClick={() => setSelected(p)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                  ${selected?.id === p.id ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20" : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.category}</p>
                </div>
                {selected?.id === p.id && <Check className="w-4 h-4 text-indigo-500 flex-shrink-0" />}
              </div>
            ))}
          </div>
          <Button onClick={handleGenerate} disabled={!selected || loading} variant="gradient" className="w-full justify-center mt-4">
            {loading ? <><LoadingSpinner size="sm" />Generating…</> : <><Sparkles className="w-4 h-4" />Generate Outfits</>}
          </Button>
        </Card>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 py-16">
              <LoadingSpinner size="lg" />
              <p className="text-sm text-gray-500">AI is styling outfits for you…</p>
            </div>
          ) : outfits.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Generated Outfits</h3>
                <Badge color="violet">{outfits.length} looks</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {outfits.map(o => (
                  <OutfitCard key={o.id} outfit={o} saved={saved[o.id]} onSave={id => setSaved(s => ({ ...s, [id]: !s[id] }))} />
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Select an item and generate</p>
                <p className="text-xs text-gray-400 mt-1">AI will create 4 unique outfit combinations</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track performance and conversion metrics across your AI features</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(s => <StatCard key={s.label} stat={s} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Try-On Usage" subtitle="Daily sessions this week">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tryOnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-800" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", fontSize: 12 }} cursor={{ fill: "#f3f4f6" }} />
              <Bar dataKey="tryOns" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Conversion Rate" subtitle="Monthly trend (%)">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-800" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", fontSize: 12 }} />
              <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Top Performing Products" subtitle="Conversions from AI try-on">
        <div className="space-y-3 mt-2">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="w-5 text-xs font-bold text-gray-400 text-right">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{p.name}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.value}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                    style={{ width: `${(p.value / 70) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}

function BillingPage() {
  const plans = [
    { name: "Starter", price: "$49", period: "/mo", features: ["500 Try-Ons/mo", "AI Size Rec", "Basic Analytics", "Email Support"], current: false, popular: false },
    { name: "Growth", price: "$149", period: "/mo", features: ["5,000 Try-Ons/mo", "Outfit Generator", "Advanced Analytics", "Priority Support", "API Access"], current: true, popular: true },
    { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited Try-Ons", "White-label", "Custom Models", "Dedicated CSM", "SLA Guarantee"], current: false, popular: false },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Billing</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your subscription and payment details</p>
      </div>
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <p className="font-bold text-gray-900 dark:text-gray-100 mt-1">Growth — $149/month</p>
            <p className="text-xs text-gray-500 mt-0.5">Renews April 9, 2025</p>
          </div>
          <Badge color="green">Active</Badge>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Try-Ons used</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">3,241 / 5,000</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <div className="h-full w-[65%] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(p => (
          <Card key={p.name} className={`p-6 relative ${p.popular ? "border-indigo-400 dark:border-indigo-600 ring-1 ring-indigo-300 dark:ring-indigo-700" : ""}`}>
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
              </div>
            )}
            <div className="mb-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{p.name}</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{p.price}</span>
                <span className="text-sm text-gray-500">{p.period}</span>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              {p.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />{f}
                </div>
              ))}
            </div>
            <Button variant={p.current ? "secondary" : p.popular ? "gradient" : "secondary"} className="w-full justify-center">
              {p.current ? "Current Plan" : p.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  const [workspace, setWorkspace] = useState("Acme Fashion Store");
  const [email, setEmail] = useState("jane@acme.com");
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your workspace and preferences</p>
      </div>
      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm border-b border-gray-100 dark:border-gray-800 pb-3">Workspace</h2>
        <Input label="Workspace Name" value={workspace} onChange={e => setWorkspace(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} icon={saved ? Check : undefined}>
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </Card>
      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm border-b border-gray-100 dark:border-gray-800 pb-3">Integrations</h2>
        {[
          { name: "Shopify", desc: "Sync product catalog automatically", connected: true },
          { name: "WooCommerce", desc: "Connect your WooCommerce store", connected: false },
          { name: "Klaviyo", desc: "Send try-on results via email", connected: false },
        ].map(i => (
          <div key={i.name} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{i.name}</p>
              <p className="text-xs text-gray-500">{i.desc}</p>
            </div>
            <Button variant={i.connected ? "secondary" : "primary"} size="sm">{i.connected ? "Connected" : "Connect"}</Button>
          </div>
        ))}
      </Card>
      <Card className="p-6 border-red-100 dark:border-red-900/30">
        <h2 className="font-semibold text-red-600 text-sm mb-3">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">Delete Workspace</p>
            <p className="text-xs text-gray-500">This action is irreversible</p>
          </div>
          <Button variant="danger" size="sm">Delete</Button>
        </div>
      </Card>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Camera, title: "AI Virtual Try-On", desc: "Let customers see how any garment looks on them instantly — no studio needed. Powered by diffusion models trained on fashion data.", tag: "Boost returns by 40%" },
  { icon: Layers, title: "Smart Size Recommendation", desc: "Intelligent size matching using body measurements and brand-specific fit data. Reduces returns, increases confidence.", tag: "Reduce returns by 28%" },
  { icon: Sparkles, title: "AI Outfit Generator", desc: "Automatically create complete outfit suggestions from any product. Increase cart value by inspiring customers to buy the full look.", tag: "Lift AOV by 35%" },
  { icon: Image, title: "AI Product Photo Generator", desc: "Transform plain product shots into stunning lifestyle imagery. Generate diverse model photography at scale, instantly.", tag: "Save $12k/year on shoots" },
  { icon: BarChart3, title: "Conversion Analytics", desc: "Deep insights into which AI features drive the most conversions. A/B test, segment, and optimize your AI strategy.", tag: "Full attribution data" },
];
const PRICING = [
  { name: "Starter", price: "$49", features: ["500 Try-Ons/month", "AI Size Recommendation", "Basic Analytics", "Email support"], cta: "Start Free Trial", gradient: false },
  { name: "Growth", price: "$149", features: ["5,000 Try-Ons/month", "Outfit Generator", "Advanced Analytics", "Priority support", "API access"], cta: "Start Free Trial", gradient: true },
  { name: "Enterprise", price: "Custom", features: ["Unlimited Try-Ons", "White-label product", "Custom AI models", "Dedicated success manager", "SLA & uptime guarantee"], cta: "Book Demo", gradient: false },
];

function LandingPage({ setView }) {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* NAV */}
        <nav className="fixed top-0 inset-x-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Shirt className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight">FashionAI</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              {["Features", "Pricing", "Docs", "Blog"].map(l => (
                <a key={l} href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setDark(!dark)} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500">
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => setView("login")} className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Sign in</button>
              <Button onClick={() => setView("signup")} variant="primary" size="sm">Get Started</Button>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/20 dark:via-gray-950 dark:to-violet-950/20" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-800/10 rounded-full blur-3xl" />
          <div className="absolute top-32 right-1/4 w-80 h-80 bg-violet-200/30 dark:bg-violet-800/10 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full px-4 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-6">
              <Zap className="w-3.5 h-3.5" /> Trusted by 500+ fashion brands
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              AI Platform for<br />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Fashion Ecommerce</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Virtual Try-On, AI Outfit Generation, Smart Size Recommendation and Conversion Analytics — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Button onClick={() => setView("signup")} variant="gradient" size="lg" icon={ArrowRight}>Start Free Trial</Button>
              <Button variant="secondary" size="lg">Book Demo</Button>
            </div>
            <p className="mt-4 text-xs text-gray-400">No credit card required · 14-day free trial · Cancel anytime</p>
          </div>

          {/* Hero visual */}
          <div className="relative max-w-5xl mx-auto mt-14">
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-100 dark:shadow-indigo-950/50 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700 px-5 py-3 flex items-center gap-2">
                {["#ef4444","#eab308","#22c55e"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{background:c}} />)}
                <div className="flex-1 mx-3 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Total Try-Ons", value: "12,847", trend: "+18%", color: "indigo" },
                    { label: "Conversion Rate", value: "5.1%", trend: "+2.3%", color: "violet" },
                    { label: "Revenue Impact", value: "$48,320", trend: "+31%", color: "fuchsia" },
                  ].map(s => (
                    <div key={s.label} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{s.value}</p>
                      <span className="text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-0.5 rounded-full mt-1 inline-block">{s.trend}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 h-36 flex items-end gap-1">
                  {tryOnData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-violet-500" style={{height: `${(d.tryOns/100)*120}px`}} />
                      <span className="text-xs text-gray-400">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Everything your brand needs</h2>
              <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Five AI-powered features that work together to drive conversions, reduce returns, and delight customers.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                    <div className="w-11 h-11 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{f.desc}</p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />{f.tag}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Simple, transparent pricing</h2>
              <p className="mt-3 text-gray-500 dark:text-gray-400">Start free, scale as you grow. No hidden fees.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PRICING.map(p => (
                <div key={p.name} className={`rounded-2xl p-7 relative transition-all
                  ${p.gradient
                    ? "bg-gradient-to-b from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-500/30 scale-105"
                    : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"}`}>
                  {p.gradient && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full shadow">
                      Most Popular
                    </div>
                  )}
                  <p className={`font-bold text-lg ${p.gradient ? "text-white/80" : "text-gray-900 dark:text-gray-100"}`}>{p.name}</p>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className={`text-4xl font-black ${p.gradient ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>{p.price}</span>
                    {p.price !== "Custom" && <span className={`text-sm ${p.gradient ? "text-white/60" : "text-gray-500"}`}>/month</span>}
                  </div>
                  <div className="space-y-2.5 mb-6">
                    {p.features.map(f => (
                      <div key={f} className={`flex items-center gap-2 text-sm ${p.gradient ? "text-white/80" : "text-gray-600 dark:text-gray-400"}`}>
                        <Check className={`w-4 h-4 flex-shrink-0 ${p.gradient ? "text-indigo-200" : "text-emerald-500"}`} />{f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setView("signup")}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all
                    ${p.gradient
                      ? "bg-white text-indigo-600 hover:bg-indigo-50"
                      : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"}`}>
                    {p.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gray-100 dark:border-gray-800 py-10 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Shirt className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-sm">FashionAI</span>
            </div>
            <p className="text-xs text-gray-400">© 2025 FashionAI. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-gray-400">
              {["Privacy", "Terms", "Docs"].map(l => <a key={l} href="#" className="hover:text-gray-600 transition-colors">{l}</a>)}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function AuthLayout({ children, title, subtitle, footer }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-950 dark:to-indigo-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <Shirt className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">{title}</h1>
          <p className="text-sm text-gray-500 mt-1.5">{subtitle}</p>
        </div>
        <Card className="p-6 shadow-xl shadow-gray-100/80 dark:shadow-gray-900/50">{children}</Card>
        <p className="text-center text-sm text-gray-500 mt-5">{footer}</p>
      </div>
    </div>
  );
}

function LoginPage({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setView("dashboard"); }, 1500);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your FashionAI account"
      footer={<>Don't have an account? <button onClick={() => setView("signup")} className="text-indigo-600 hover:underline font-medium">Sign up free</button></>}>
      <div className="space-y-4">
        <Input label="Email" type="email" placeholder="jane@store.com" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input type="checkbox" className="rounded" /> Remember me
          </label>
          <button className="text-sm text-indigo-600 hover:underline">Forgot password?</button>
        </div>
        <Button onClick={handleLogin} disabled={loading} variant="gradient" className="w-full justify-center" size="lg">
          {loading ? <LoadingSpinner size="sm" /> : null}
          {loading ? "Signing in…" : "Sign In"}
        </Button>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800" /></div>
          <div className="relative flex justify-center"><span className="bg-white dark:bg-gray-900 px-3 text-xs text-gray-400">or continue with</span></div>
        </div>
        <button className="w-full flex items-center justify-center gap-2.5 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Globe className="w-4 h-4" /> Continue with Google
        </button>
      </div>
    </AuthLayout>
  );
}

function SignupPage({ setView }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setView("dashboard"); }, 1800);
  };

  return (
    <AuthLayout title="Create account" subtitle="Start your 14-day free trial — no card required"
      footer={<>Already have an account? <button onClick={() => setView("login")} className="text-indigo-600 hover:underline font-medium">Sign in</button></>}>
      <div className="space-y-4">
        <Input label="Full Name" placeholder="Jane Cooper" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input label="Work Email" type="email" placeholder="jane@store.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <Button onClick={handleSignup} disabled={loading} variant="gradient" className="w-full justify-center" size="lg">
          {loading ? <LoadingSpinner size="sm" /> : null}
          {loading ? "Creating account…" : "Create Free Account"}
        </Button>
        <p className="text-xs text-center text-gray-400">By creating an account you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.</p>
      </div>
    </AuthLayout>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing"); // landing | login | signup | dashboard
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);

  if (view === "landing") return <LandingPage setView={setView} />;
  if (view === "login") return <LoginPage setView={setView} />;
  if (view === "signup") return <SignupPage setView={setView} />;

  const pages = {
    dashboard: <DashboardPage />,
    products: <ProductsPage />,
    "try-on": <TryOnPage />,
    "outfit-generator": <OutfitGeneratorPage />,
    analytics: <AnalyticsPage />,
    billing: <BillingPage />,
    settings: <SettingsPage />,
  };

  return (
    <DashboardLayout currentPage={page} setPage={setPage} dark={dark} setDark={setDark}>
      {pages[page] || <DashboardPage />}
    </DashboardLayout>
  );
}
