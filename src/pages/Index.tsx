import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";
import { GradientBorderCard } from "@/components/ui/gradient-border-card";
import { BentoGrid } from "@/components/BentoGrid";
import { AnimateSvg, decorativePaths } from "@/components/ui/animate-svg";


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
      id: "links",
      title: "Link Tools",
      subtitle: "Manage and validate URLs",
      icon: "fa-link",
      gradient: "gradient-overlay-cyan",
      iconGradient: "from-cyan-500 to-blue-500",
      tools: [
        { icon: "fa-link", color: "text-cyan-accent", name: "Link Manager", desc: "Validate & organize URLs", href: "/tools/link-manager" },
        { icon: "fa-broom", color: "text-pink-accent", name: "URL Cleaner", desc: "Remove tracking params", href: "/tools/link-manager" },
        { icon: "fa-check-circle", color: "text-green-accent", name: "Link Validator", desc: "Check active links", href: "/tools/link-manager" },
        { icon: "fa-sitemap", color: "text-purple-accent", name: "Categorize Links", desc: "Sort by platform", href: "/tools/link-manager" },
        { icon: "fa-clone", color: "text-orange-accent", name: "Find Duplicates", desc: "Remove duplicate URLs", href: "/tools/link-manager" },
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
  ];

  // Incremental top positions for stacking effect
  const stackingTops = ["top-0", "top-2", "top-4", "top-6", "top-8"];

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
          <section className="text-foreground h-[85vh] md:h-screen w-full grid place-content-center sticky top-0 relative overflow-hidden">
            {/* Sparkles Background - Purple Layer */}
            <div className="absolute inset-0 z-0">
              <Sparkles 
                className="w-full h-full"
                color="#a855f7"
                density={150}
                speed={0.5}
                opacity={0.8}
                size={1.2}
              />
            </div>
            
            {/* Sparkles Background - Pink Layer */}
            <div className="absolute inset-0 z-0">
              <Sparkles 
                className="w-full h-full"
                color="#ec4899"
                density={100}
                speed={0.3}
                opacity={0.6}
                size={1.5}
              />
            </div>

            {/* Animated SVG decorative elements */}
            <div className="absolute top-[15%] left-[8%] w-40 h-40 opacity-20 hidden md:block">
              <AnimateSvg
                path={decorativePaths.spiral}
                strokeColor="#a855f7"
                strokeWidth={1.5}
                animationDuration={2.5}
                animationDelay={0.3}
                enableHoverAnimation
                hoverAnimationType="glow"
              />
            </div>
            <div className="absolute top-[20%] right-[10%] w-32 h-32 opacity-15 hidden md:block">
              <AnimateSvg
                path={decorativePaths.infinity}
                strokeColor="#ec4899"
                strokeWidth={1}
                animationDuration={3}
                animationDelay={0.6}
                enableHoverAnimation
                hoverAnimationType="redraw"
              />
            </div>
            <div className="absolute bottom-[25%] left-[12%] w-36 h-36 opacity-20 hidden md:block">
              <AnimateSvg
                path={decorativePaths.wave}
                strokeColor="#a855f7"
                strokeWidth={2}
                animationDuration={2}
                animationDelay={0.9}
              />
            </div>
            <div className="absolute bottom-[20%] right-[8%] w-28 h-28 opacity-15 hidden md:block">
              <AnimateSvg
                path={decorativePaths.spark}
                strokeColor="#ec4899"
                strokeWidth={1.5}
                animationDuration={1.8}
                animationDelay={1.2}
                enableHoverAnimation
                hoverAnimationType="glow"
              />
            </div>
            <div className="absolute top-[40%] left-[3%] w-24 h-24 opacity-10 hidden lg:block">
              <AnimateSvg
                path={decorativePaths.circle}
                strokeColor="#a855f7"
                strokeWidth={1}
                animationDuration={2.2}
                animationDelay={1.5}
              />
            </div>
            <div className="absolute top-[35%] right-[5%] w-20 h-20 opacity-10 hidden lg:block">
              <AnimateSvg
                path={decorativePaths.loop}
                strokeColor="#ec4899"
                strokeWidth={1}
                animationDuration={2.8}
                animationDelay={1.8}
              />
            </div>
            
            <motion.div
              className="text-center px-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl 2xl:text-7xl font-bold mb-4 tracking-tight leading-[120%]">
                Transform Your Text
                <br />
                <span className="gradient-text">Instantly</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-2 flex items-center justify-center gap-1.5">
                Made with <span className="text-red-500">❤️</span> by{" "}
                <a 
                  href="https://www.linkedin.com/in/lakshayrohilla/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:text-purple-400 transition-all duration-300 underline-offset-2 hover:underline hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] inline-block"
                >
                  Lakshay Rohilla
                </a>
              </p>
              <p className="text-muted-foreground text-sm">
                at Creative Fuel
              </p>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-8 h-8 text-muted-foreground" />
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

          {/* BentoGrid Section */}
          <section className="py-12 px-4 relative z-20 bg-background">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                Why Choose <span className="gradient-text">TextCraft</span>?
              </h2>
              <p className="text-muted-foreground mt-2">Powerful features at your fingertips</p>
            </motion.div>
            <div className="max-w-6xl mx-auto">
              <BentoGrid />
            </div>
          </section>

          {/* Stacking Category Cards */}
          <section className="w-full pb-20 relative">
            {/* Sparkles Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <Sparkles 
                className="w-full h-full"
                color="#a855f7"
                density={150}
                speed={0.8}
                opacity={0.6}
                size={1.5}
              />
            </div>
            
            {categories.map((category, categoryIndex) => (
              <div 
                key={category.id}
                data-category={category.id}
                className={`sm:sticky ${stackingTops[categoryIndex]} w-full`}
              >
                <div className="w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center py-8">
                  <GradientBorderCard 
                    variant={categoryIndex === 0 ? 'pink' : categoryIndex === 1 ? 'purple' : 'default'}
                    className="w-[90%] md:w-[85%] max-w-6xl rounded-[32px]"
                  >
                    <div className={`p-6 md:p-10 rounded-[32px] ${category.gradient}`}>
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
                              <div className="group relative cursor-pointer p-4 rounded-xl h-full overflow-hidden tool-item">
                                {/* Default State */}
                                <div className="translate-y-0 group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-300">
                                  <i className={`fas ${tool.icon} ${tool.color} text-2xl mb-2`}></i>
                                  <h4 className="text-foreground font-semibold text-sm">{tool.name}</h4>
                                  <p className="text-muted-foreground text-xs mt-1">{tool.desc}</p>
                                </div>
                                
                                {/* Hover State */}
                                <div className="flex flex-col items-start justify-center absolute inset-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-semibold text-sm">{tool.name}</span>
                                    <ArrowRight className="w-4 h-4 text-white" />
                                  </div>
                                  <p className="text-white/80 text-xs">{tool.desc}</p>
                                </div>
                                
                                {/* Expanding Circle Background with Glow */}
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gradient-to-br ${category.iconGradient} scale-0 group-hover:scale-[20] transition-all duration-500 ease-out group-hover:shadow-[0_0_40px_rgba(168,85,247,0.6),0_0_80px_rgba(236,72,153,0.4)]`}></div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </GradientBorderCard>
                </div>
              </div>
            ))}
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
