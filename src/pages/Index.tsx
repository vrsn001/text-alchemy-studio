import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Liquid, Colors } from "@/components/ui/liquid-gradient";
import { Sparkles } from "@/components/ui/sparkles";
import { GradientBorderCard } from "@/components/ui/gradient-border-card";
import { BentoGrid } from "@/components/BentoGrid";
import { AnimateSvg, decorativePaths } from "@/components/ui/animate-svg";
import { useSmartScroll } from "@/hooks/useSmartScroll";
import { ScrollTextMarquee } from "@/components/ui/scroll-text-marquee";
import { Github, Star } from "lucide-react";



const Index = () => {
  const { trackCategoryInteraction } = useSmartScroll();
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
      bgColor: "bg-rose-50 dark:bg-slate-950",
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
      bgColor: "bg-cyan-50 dark:bg-gray-900",
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
      bgColor: "bg-blue-50 dark:bg-slate-950",
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
      bgColor: "bg-green-50 dark:bg-gray-900",
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
      bgColor: "bg-purple-50 dark:bg-slate-950",
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

  // Staggered top positions for enhanced stacking effect
  const stackingTops = ["top-0", "top-4", "top-8", "top-12", "top-16"];

  return (
    <ReactLenis root>
      <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0 overflow-x-hidden">
        {/* Blur Vignette Effect */}
        <div className="blur-vignette"></div>
        
        {/* Grid Pattern Background */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
        
        {/* Main Container */}
        <div className="relative z-10">
          
          <Header />
          
          {/* Hero Section - TextCraft 3D */}
          <section className="h-screen w-full overflow-hidden bg-black text-white sticky top-0">
            <article className="grid gap-4 text-center relative z-10 pt-10 px-4">
              {/* Badge */}
              <span className="inline-block text-sm border p-1 px-3 w-fit mx-auto rounded-full border-[#3273ff] bg-[#0f1c35]">
                Transform Your Text
              </span>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-b from-[#edeffd] to-[#7b9cda] bg-clip-text text-transparent leading-[100%] tracking-tighter px-4">
                Transform Your Text With a Global
                <br />
                Perspective, Innovate with Ease.
              </h1>

              {/* 3D TextCraft Component */}
              <div className="relative w-full h-[400px] flex items-center justify-center [perspective:1000px]">
                {/* Orbiting Particles Background */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60 animate-[pulse_2s_ease-in-out_infinite]"
                      style={{
                        transform: `rotate(${i * 45}deg) translateX(150px) translateY(-50%)`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Main 3D Text */}
                <div className="relative z-10">
                  <h2 
                    className="text-5xl md:text-6xl lg:text-8xl font-black select-none tracking-[-0.05em] bg-gradient-to-br from-[#3273ff] to-[#9333ea] bg-clip-text text-transparent [filter:drop-shadow(0_0_40px_rgba(50,115,255,0.5))_drop-shadow(0_0_80px_rgba(50,115,255,0.3))] animate-[textcraft-float_6s_ease-in-out_infinite] [transform-style:preserve-3d]"
                  >
                    TextCraft
                  </h2>
                  
                  {/* Reflection Effect */}
                  <h2 
                    className="text-5xl md:text-6xl lg:text-8xl font-black select-none tracking-[-0.05em] bg-gradient-to-br from-[#3273ff] to-[#9333ea] bg-clip-text text-transparent opacity-10 blur-[2px] absolute top-0 left-0 [transform:scaleY(-1)_translateY(100%)]"
                    aria-hidden="true"
                  >
                    TextCraft
                  </h2>
                </div>

                {/* Glow Effect Layer */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <div className="w-96 h-96 bg-blue-500/20 rounded-full blur-[60px] animate-[glow-pulse_4s_ease-in-out_infinite]" />
                </div>
              </div>
            </article>

            {/* Bottom Gradient + Sparkles Section */}
            <div className="relative -mt-32 h-80 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
              {/* Before pseudo-element effect */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)]" />
              
              {/* After pseudo-element effect */}
              <div className="absolute -left-1/2 top-1/2 w-[200%] rounded-[10%] border-t border-[#163474] bg-[#08132b] aspect-[1/0.7]" />
              
              {/* Sparkles */}
              <Sparkles
                density={800}
                speed={1.2}
                size={1.2}
                direction="top"
                opacitySpeed={2}
                color="#32A7FF"
                className="absolute inset-x-0 bottom-0 h-full w-full"
              />
            </div>
          </section>

          {/* Infinite Brand Scroll */}
          <section className="mb-8 relative z-20 bg-background">
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

          {/* Scroll Text Marquee */}
          <section className="py-8 relative z-20 bg-background overflow-hidden">
            <ScrollTextMarquee baseVelocity={50}>
              <span>Star the repo if you like it</span>
              <span>Share it if you like it</span>
              <span>100% Free & Open Source</span>
              <span>Built with React & TypeScript</span>
            </ScrollTextMarquee>
            <ScrollTextMarquee baseVelocity={-30} className="mt-4 opacity-60">
              <span>Text Tools</span>
              <span>Link Manager</span>
              <span>Case Converter</span>
              <span>Encoding & Decoding</span>
            </ScrollTextMarquee>
          </section>

          {/* Enhanced Stacking Category Cards */}
          <section id="text-tools" className="w-full relative">
            {/* Section Header */}
            <div className="sticky top-0 z-30 bg-background py-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Explore Our <span className="gradient-text">Tools</span>
              </h2>
              <p className="text-muted-foreground">Scroll down to discover each category</p>
            </div>
            
            {categories.map((category, categoryIndex) => (
              <section 
                key={category.id}
                data-category={category.id}
                className={`${stackingTops[categoryIndex]} sticky h-screen w-full grid place-content-center overflow-hidden ${category.bgColor} ${categoryIndex > 0 ? 'rounded-t-3xl' : ''}`}
              >
                {/* Grid Pattern for this section */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
                
                <div className="w-[90%] md:w-[85%] max-w-6xl mx-auto relative z-10">
                  <GradientBorderCard 
                    variant={categoryIndex === 0 ? 'pink' : categoryIndex === 1 ? 'purple' : 'default'}
                    className="rounded-[32px]"
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
                            onClick={() => trackCategoryInteraction(category.id)}
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
                
                {/* Scroll hint for all but last */}
                {categoryIndex < categories.length - 1 && (
                  <motion.div 
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronDown className="w-6 h-6 text-muted-foreground" />
                  </motion.div>
                )}
              </section>
            ))}
          </section>


          {/* Compact Footer Section with Liquid Gradient */}
          <section className="relative h-[40vh] w-full overflow-hidden">
            <Liquid
              colors={{
                color1: '#FFFFFF',
                color2: '#1E10C5',
                color3: '#9089E2',
                color4: '#FCFCFE',
                color5: '#F9F9FD',
                color6: '#B2B8E7',
                color7: '#0E2DCB',
                color8: '#0017E9',
                color9: '#4743EF',
                color10: '#7D7BF4',
                color11: '#0B06FC',
                color12: '#C5C1EA',
                color13: '#1403DE',
                color14: '#B6BAF6',
                color15: '#C1BEEB',
                color16: '#290ECB',
                color17: '#3F4CC0',
              }}
              className="opacity-60"
            />
            <div className="absolute inset-0 bg-background/60" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-6">
              {/* Made with love pill */}
              <div className="px-5 py-2.5 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm">
                <span className="text-sm text-muted-foreground">
                  Made with <span className="text-pink-500">❤️</span> · 100% Private · No Data Stored
                </span>
              </div>
              
              {/* Logo + Typography */}
              <div className="flex items-center gap-3">
                {/* Crescent Moon Logo with floating animation */}
                <motion.div 
                  className="relative w-8 h-8"
                  animate={{ 
                    y: [0, -4, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/30" />
                  <div className="absolute top-0.5 right-0.5 w-6 h-6 rounded-full bg-background" />
                </motion.div>
                <h2 className="text-xl font-semibold text-foreground tracking-tight">
                  TextCraft
                </h2>
                <span className="text-muted-foreground text-sm">—</span>
                <p className="text-muted-foreground text-sm">Your Text, Transformed</p>
              </div>
              
              {/* Compact GitHub Button */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center gap-2 px-5 py-2.5 bg-foreground/90 hover:bg-foreground text-background rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                  <Github className="w-4 h-4" />
                  <span className="font-medium text-sm">Star on GitHub</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-background/20 rounded-full">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">1.2k</span>
                  </div>
                </div>
              </a>
            </div>
          </section>
          
          {/* Footer */}
          <Footer />

        </div>
        
        <BottomNav />
      </div>
    </ReactLenis>
  );
};

export default Index;
