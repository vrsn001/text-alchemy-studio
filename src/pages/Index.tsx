import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactLenis } from "lenis/react";

const Index = () => {
  const brandItems = [
    { icon: "fa-bolt", color: "text-purple-accent", text: "Lightning Fast" },
    { icon: "fa-shield-alt", color: "text-green-accent", text: "100% Private" },
    { icon: "fa-magic", color: "text-pink-accent", text: "40+ Tools" },
    { icon: "fa-mobile-alt", color: "text-blue-accent", text: "Mobile Friendly" },
    { icon: "fa-code", color: "text-orange-accent", text: "Developer Tools" },
    { icon: "fa-paint-brush", color: "text-yellow-accent", text: "Beautiful Design" },
  ];

  const categories = [
    {
      id: "case",
      title: "Case Transformations",
      subtitle: "Change text casing styles",
      icon: "fa-text-height",
      gradient: "gradient-overlay-purple",
      iconGradient: "from-purple-500 to-pink-500",
      tools: [
        { icon: "fa-arrow-up", color: "text-purple-accent", name: "UPPERCASE", desc: "ALL CAPS", href: "/tools/case-converter" },
        { icon: "fa-arrow-down", color: "text-blue-accent", name: "lowercase", desc: "all lowercase", href: "/tools/case-converter" },
        { icon: "fa-h", color: "text-red-accent", name: "Title Case", desc: "Each Word Capitalized", href: "/tools/case-converter" },
        { icon: "fa-paragraph", color: "text-yellow-accent", name: "Sentence case", desc: "First word only", href: "/tools/case-converter" },
        { icon: "fa-terminal", color: "text-orange-accent", name: "camelCase", desc: "For variables", href: "/tools/case-converter" },
        { icon: "fa-p", color: "text-pink-accent", name: "PascalCase", desc: "For classes", href: "/tools/case-converter" },
        { icon: "fa-underline", color: "text-cyan-accent", name: "snake_case", desc: "With underscores", href: "/tools/case-converter" },
        { icon: "fa-minus", color: "text-red-accent", name: "kebab-case", desc: "With hyphens", href: "/tools/case-converter" },
      ]
    },
    {
      id: "modify",
      title: "Text Modifications",
      subtitle: "Edit and manipulate text",
      icon: "fa-pen-to-square",
      gradient: "gradient-overlay-pink",
      iconGradient: "from-pink-500 to-red-500",
      tools: [
        { icon: "fa-right-left", color: "text-purple-accent", name: "Reverse Text", desc: "Mirror text", href: "/tools/reverse-text" },
        { icon: "fa-compress", color: "text-blue-accent", name: "Remove Spaces", desc: "No whitespace", href: "/tools/add-line-breaks" },
        { icon: "fa-text-height", color: "text-green-accent", name: "Add Line Breaks", desc: "Break after characters", href: "/tools/add-line-breaks" },
        { icon: "fa-bars", color: "text-orange-accent", name: "Remove Line Breaks", desc: "Single line", href: "/tools/add-line-breaks" },
      ]
    },
    {
      id: "encode",
      title: "Encoding & Decoding",
      subtitle: "Convert between formats",
      icon: "fa-code",
      gradient: "gradient-overlay-blue",
      iconGradient: "from-blue-500 to-purple-600",
      tools: [
        { icon: "fa-lock", color: "text-purple-accent", name: "Base64 Encode", desc: "Encode to Base64", href: "/tools/text-to-html" },
        { icon: "fa-lock-open", color: "text-blue-accent", name: "Base64 Decode", desc: "Decode from Base64", href: "/tools/text-to-html" },
        { icon: "fa-link", color: "text-green-accent", name: "URL Encode", desc: "For URLs", href: "/tools/text-to-html" },
        { icon: "fa-link-slash", color: "text-yellow-accent", name: "URL Decode", desc: "Decode URLs", href: "/tools/text-to-html" },
        { icon: "fa-code", color: "text-orange-accent", name: "HTML Entities", desc: "Escape HTML", href: "/tools/text-to-html" },
      ]
    },
    {
      id: "format",
      title: "Formatting Tools",
      subtitle: "Structure your text",
      icon: "fa-list",
      gradient: "gradient-overlay-green",
      iconGradient: "from-green-500 to-yellow-500",
      tools: [
        { icon: "fa-list-ol", color: "text-purple-accent", name: "Add Line Numbers", desc: "Number lines", href: "/tools/add-line-breaks" },
        { icon: "fa-list-ul", color: "text-blue-accent", name: "Add Bullets", desc: "Bullet points", href: "/tools/add-line-breaks" },
        { icon: "fa-clone", color: "text-green-accent", name: "Remove Duplicates", desc: "Unique lines", href: "/tools/add-line-breaks" },
        { icon: "fa-arrow-down-a-z", color: "text-yellow-accent", name: "Sort Lines A-Z", desc: "Alphabetical", href: "/tools/alphabetical-order" },
      ]
    },
  ];

  // Incremental top positions for stacking effect
  const stackingTops = ["top-0", "top-4", "top-8", "top-12"];

  return (
    <ReactLenis root>
      <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0 overflow-x-hidden">
        {/* Blur Vignette Effect */}
        <div className="blur-vignette"></div>
        
        {/* Grid Pattern Background */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
        
        {/* Main Container */}
        <div className="relative z-10">
          <Header />
          
          {/* Hero Section - Sticky */}
          <section className="text-foreground h-screen w-full grid place-content-center sticky top-0">
            <motion.div
              className="text-center px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl 2xl:text-7xl font-bold mb-4 tracking-tight leading-[120%]">
                Transform Your Text
                <br />
                <span className="gradient-text">Instantly</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Professional text tools with a beautiful interface. Scroll down! 👇
              </p>
            </motion.div>
          </section>

          {/* Infinite Brand Scroll */}
          <section className="mb-8 relative z-20">
            <div className="infinity-scroll">
              <div className="infinity-scroll-inner">
                {[...brandItems, ...brandItems].map((item, index) => (
                  <div key={index} className="brand-item">
                    <div className="liquid-glass px-6 py-3 rounded-xl flex items-center">
                      <i className={`fas ${item.icon} ${item.color} mr-2`}></i>
                      <span className="text-foreground font-medium">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stacking Category Cards */}
          <section className="w-full pb-20">
            {categories.map((category, categoryIndex) => (
              <div 
                key={category.id}
                data-category={category.id}
                className={`sm:sticky ${stackingTops[categoryIndex]} w-full`}
              >
                <div className="w-full min-h-screen flex items-center justify-center py-8">
                  <div className={`w-[90%] md:w-[85%] max-w-6xl liquid-glass rounded-[32px] p-6 md:p-10 ${category.gradient} [box-shadow:0_-5px_16px_4px_rgba(0,0,0,0.8),0_2px_4px_-1px_rgba(0,0,0,0.06)]`}>
                    {/* Category Header */}
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.iconGradient} rounded-xl flex items-center justify-center mr-4`}>
                        <i className={`fas ${category.icon} text-white text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                        <p className="text-muted-foreground">{category.subtitle}</p>
                      </div>
                    </div>
                    
                    {/* Tools Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {category.tools.map((tool, toolIndex) => (
                        <motion.div
                          key={tool.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: toolIndex * 0.05 }}
                        >
                          <Link to={tool.href}>
                            <div className="tool-item p-4 rounded-xl h-full">
                              <i className={`fas ${tool.icon} ${tool.color} text-2xl mb-2`}></i>
                              <h4 className="text-foreground font-semibold text-sm">{tool.name}</h4>
                              <p className="text-muted-foreground text-xs mt-1">{tool.desc}</p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Workspace Section */}
          <section className="px-6 py-16 max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Input Area */}
              <div className="liquid-glass rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <i className="fas fa-edit text-muted-foreground mr-2"></i>
                    <span className="text-foreground font-semibold">Input</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="glass-btn px-3 py-1.5 rounded-lg text-sm text-foreground">
                      Sample
                    </button>
                    <button className="glass-btn px-3 py-1.5 rounded-lg text-sm text-foreground">
                      Clear
                    </button>
                  </div>
                </div>
                <textarea
                  className="textarea-glass w-full h-80 rounded-2xl p-4 text-sm"
                  placeholder="Enter your text here..."
                />
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="liquid-glass rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground">Characters</p>
                    <p className="text-lg font-bold text-foreground">0</p>
                  </div>
                  <div className="liquid-glass rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground">Words</p>
                    <p className="text-lg font-bold text-foreground">0</p>
                  </div>
                  <div className="liquid-glass rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground">Lines</p>
                    <p className="text-lg font-bold text-foreground">0</p>
                  </div>
                </div>
              </div>

              {/* Output Area */}
              <div className="liquid-glass rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <i className="fas fa-file-export text-muted-foreground mr-2"></i>
                    <span className="text-foreground font-semibold">Output</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="glass-btn px-3 py-1.5 rounded-lg text-sm text-foreground">
                      <i className="fas fa-copy mr-1"></i> Copy
                    </button>
                    <button className="glass-btn px-3 py-1.5 rounded-lg text-sm text-foreground">
                      <i className="fas fa-download mr-1"></i> Download
                    </button>
                  </div>
                </div>
                <textarea
                  className="textarea-glass w-full h-80 rounded-2xl p-4 text-sm"
                  placeholder="Transformed text will appear here..."
                  readOnly
                />
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="group">
            <h1 className="text-[12vw] md:text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              TextCraft
            </h1>
            <div className="bg-background h-40 relative z-10 grid place-content-center rounded-t-[50%]">
              <p className="text-muted-foreground text-sm">
                Made with ❤️ · 100% Private · No Data Stored
              </p>
            </div>
          </footer>
        </div>
        
        <BottomNav />
      </div>
    </ReactLenis>
  );
};

export default Index;
