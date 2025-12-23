import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
        { icon: "fa-heading", color: "text-green-accent", name: "Title Case", desc: "Each Word Capitalized", href: "/tools/case-converter" },
        { icon: "fa-paragraph", color: "text-yellow-accent", name: "Sentence case", desc: "First word only", href: "/tools/case-converter" },
        { icon: "fa-code", color: "text-orange-accent", name: "camelCase", desc: "For variables", href: "/tools/case-converter" },
        { icon: "fa-brackets-curly", color: "text-pink-accent", name: "PascalCase", desc: "For classes", href: "/tools/case-converter" },
        { icon: "fa-underscore", color: "text-cyan-accent", name: "snake_case", desc: "With underscores", href: "/tools/case-converter" },
        { icon: "fa-minus", color: "text-red-accent", name: "kebab-case", desc: "With hyphens", href: "/tools/case-converter" },
      ]
    },
    {
      id: "modify",
      title: "Text Modifications",
      subtitle: "Edit and manipulate text",
      icon: "fa-edit",
      gradient: "gradient-overlay-pink",
      iconGradient: "from-pink-500 to-red-500",
      tools: [
        { icon: "fa-exchange-alt", color: "text-purple-accent", name: "Reverse Text", desc: "Mirror text", href: "/tools/reverse-text" },
        { icon: "fa-compress", color: "text-blue-accent", name: "Remove Spaces", desc: "No whitespace", href: "/tools/add-line-breaks" },
        { icon: "fa-cut", color: "text-green-accent", name: "Trim Whitespace", desc: "Remove edges", href: "/tools/add-line-breaks" },
        { icon: "fa-quote-right", color: "text-yellow-accent", name: "Add Quotes", desc: "Wrap in quotes", href: "/tools/add-line-breaks" },
        { icon: "fa-eraser", color: "text-red-accent", name: "Remove Quotes", desc: "Strip quotes", href: "/tools/add-line-breaks" },
        { icon: "fa-align-justify", color: "text-orange-accent", name: "Remove Line Breaks", desc: "Single line", href: "/tools/add-line-breaks" },
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
        { icon: "fa-unlock", color: "text-blue-accent", name: "Base64 Decode", desc: "Decode from Base64", href: "/tools/text-to-html" },
        { icon: "fa-link", color: "text-green-accent", name: "URL Encode", desc: "For URLs", href: "/tools/text-to-html" },
        { icon: "fa-unlink", color: "text-yellow-accent", name: "URL Decode", desc: "Decode URLs", href: "/tools/text-to-html" },
        { icon: "fa-file-code", color: "text-orange-accent", name: "HTML Entities", desc: "Escape HTML", href: "/tools/text-to-html" },
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
        { icon: "fa-copy", color: "text-green-accent", name: "Remove Duplicates", desc: "Unique lines", href: "/tools/add-line-breaks" },
        { icon: "fa-sort-alpha-down", color: "text-yellow-accent", name: "Sort Lines A-Z", desc: "Alphabetical", href: "/tools/alphabetical-order" },
      ]
    },
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-background pb-20 md:pb-0 overflow-x-hidden">
      {/* Blur Vignette Effect */}
      <div className="blur-vignette"></div>
      
      {/* Main Container */}
      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <section className="px-6 py-16 text-center">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Transform Your Text
            <br />
            <span className="gradient-text">Instantly</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professional text tools with a beautiful interface
          </motion.p>
        </section>

        {/* Infinite Brand Scroll */}
        <section className="mb-16">
          <div className="infinity-scroll">
            <div className="infinity-scroll-inner">
              {/* Duplicate for seamless loop */}
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

        {/* Stacking Categories */}
        <div className="stack-container">
          {categories.map((category, categoryIndex) => (
            <div key={category.id} className="category-card">
              <div className={`card-content ${category.gradient}`}>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-y-auto max-h-[calc(100%-120px)]">
                  {category.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + toolIndex * 0.05 }}
                    >
                      <Link to={tool.href}>
                        <div className="tool-item p-4 rounded-xl">
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
          ))}
        </div>

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

        <Footer />
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Index;
