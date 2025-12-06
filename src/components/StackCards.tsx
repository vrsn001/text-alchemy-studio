import { useEffect, useRef } from 'react';

interface StackCard {
  title: string;
  description: string;
  counter: string;
}

const STACK_CARDS: StackCard[] = [
  {
    title: "Text Transformation",
    description: "Convert text between different cases, formats, and styles. Transform your content instantly with powerful text manipulation tools.",
    counter: "6/6",
  },
  {
    title: "Line Break Magic",
    description: "Add, remove, or modify line breaks in your text. Perfect for formatting content, cleaning up copied text, or preparing data for import.",
    counter: "5/6",
  },
  {
    title: "Word & Character Analysis",
    description: "Count words, characters, sentences, and paragraphs. Get detailed statistics about your text content for any purpose.",
    counter: "4/6",
  },
  {
    title: "URL Management",
    description: "Extract, validate, and manage URLs from any text. Detect duplicates, fix broken links, and organize your link collection.",
    counter: "3/6",
  },
  {
    title: "HTML Conversion",
    description: "Transform plain text into properly formatted HTML. Convert paragraphs, lists, and special characters automatically.",
    counter: "2/6",
  },
  {
    title: "Alphabetical Sorting",
    description: "Sort lines of text alphabetically, reverse order, or randomly. Perfect for organizing lists and data cleaning tasks.",
    counter: "1/6",
  },
];

export const StackCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll('.stack-card-item');
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight + 300;
      const scrollPosition = window.scrollY;
      const scrollDown = scrollPosition > lastScrollTop.current;
      lastScrollTop.current = scrollPosition <= 0 ? 0 : scrollPosition;

      const progress = Math.max(0, (scrollPosition - containerRect.top + windowHeight) / (windowHeight * 2));

      const numCards = cards.length;
      for (let index = numCards - 1; index >= 0; index--) {
        const card = cards[index] as HTMLElement;
        if (index === numCards - 1) {
          if (scrollPosition > containerRect.top - windowHeight * 0.2) {
            card.classList.add('slide-up');
          } else {
            card.classList.remove('slide-up');
          }
        } else {
          if (scrollDown) {
            if (index >= numCards - progress && index !== numCards - 1) {
              card.classList.add('slide-up');
            } else {
              card.classList.remove('slide-up');
            }
          } else {
            if (index > numCards - progress - 1 && index !== numCards - 1) {
              card.classList.add('slide-up');
            } else {
              card.classList.remove('slide-up');
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="stack-cards-container" ref={containerRef}>
      {/* SVG background rays - only visible in this section */}
      <div className="stack-rays" aria-hidden="true">
        <div className="stack-rays-inner">
          <svg className="stack-rays-scene" width="395px" height="3118px" viewBox="0 0 395 3118">
            <g>
              <path stroke="hsl(174 84% 50%)" d="M 1,0 L 1,51 M 1,175 L 1,199 M 1,237 L 1,252 M 1,298 L 1,325 M 1,382 L 1,406 M 1,507 L 1,530 M 1,607 L 1,655 M 1,770 L 1,776 M 1,869 L 1,920 M 1,1042 L 1,1075 M 1,1278 L 1,1285 M 1,1316 L 1,1360 M 1,1459 L 1,1501 M 1,1606 L 1,1615 M 1,1647 L 1,1657 M 1,1685 L 1,1736 M 1,1889 L 1,1897 M 1,2105 L 1,2120 M 1,2266 L 1,2280 M 1,2420 L 1,2452 M 1,2645 L 1,2659 M 1,2705 L 1,2729 M 1,2940 L 1,2943 M 1,3112 L 1,3118" style={{ animationDuration: '85s' }} />
              <path stroke="hsl(270 70% 60%)" d="M 16,0 L 16,34 M 16,95 L 16,127 M 16,355 L 16,361 M 16,390 L 16,433 M 16,521 L 16,526 M 16,679 L 16,697 M 16,909 L 16,919 M 16,1020 L 16,1025 M 16,1052 L 16,1077 M 16,1309 L 16,1353 M 16,1432 L 16,1468 M 16,1655 L 16,1690 M 16,1783 L 16,1821 M 16,2015 L 16,2030 M 16,2109 L 16,2159 M 16,2298 L 16,2333 M 16,2410 L 16,2460 M 16,2624 L 16,2663 M 16,2821 L 16,2830 M 16,3050 L 16,3094" style={{ animationDuration: '64s' }} />
              <path stroke="hsl(174 40% 60%)" d="M 31,0 L 31,32 M 31,198 L 31,248 M 31,470 L 31,475 M 31,701 L 31,722 M 31,835 L 31,877 M 31,919 L 31,953 M 31,1008 L 31,1023 M 31,1181 L 31,1192 M 31,1403 L 31,1427 M 31,1615 L 31,1631 M 31,1734 L 31,1748 M 31,1893 L 31,1930 M 31,2075 L 31,2127 M 31,2226 L 31,2265 M 31,2451 L 31,2504 M 31,2671 L 31,2718 M 31,2753 L 31,2767 M 31,2952 L 31,2958" style={{ animationDuration: '58s' }} />
              <path stroke="hsl(270 70% 60%)" d="M 46,0 L 46,17 M 46,91 L 46,111 M 46,248 L 46,272 M 46,486 L 46,499 M 46,604 L 46,647 M 46,777 L 46,793 M 46,909 L 46,927 M 46,1114 L 46,1132 M 46,1243 L 46,1265 M 46,1306 L 46,1310 M 46,1420 L 46,1429 M 46,1528 L 46,1576 M 46,1750 L 46,1759 M 46,1887 L 46,1912 M 46,2003 L 46,2016 M 46,2132 L 46,2181 M 46,2211 L 46,2246 M 46,2335 L 46,2380 M 46,2464 L 46,2470 M 46,2517 L 46,2557 M 46,2620 L 46,2667 M 46,2833 L 46,2858 M 46,3024 L 46,3071" style={{ animationDuration: '32s' }} />
              <path stroke="hsl(174 84% 50%)" d="M 61,0 L 61,42 M 61,198 L 61,245 M 61,453 L 61,476 M 61,659 L 61,694 M 61,794 L 61,838 M 61,884 L 61,911 M 61,1138 L 61,1156 M 61,1180 L 61,1210 M 61,1234 L 61,1238 M 61,1398 L 61,1411 M 61,1616 L 61,1668 M 61,1767 L 61,1801 M 61,1941 L 61,1979 M 61,2112 L 61,2140 M 61,2267 L 61,2315 M 61,2424 L 61,2451 M 61,2640 L 61,2648 M 61,2753 L 61,2774 M 61,2857 L 61,2897 M 61,3112 L 61,3118" style={{ animationDuration: '69s' }} />
              <path stroke="hsl(270 70% 60%)" d="M 76,0 L 76,15 M 76,115 L 76,160 M 76,291 L 76,321 M 76,384 L 76,411 M 76,436 L 76,484 M 76,702 L 76,750 M 76,929 L 76,942 M 76,1048 L 76,1082 M 76,1201 L 76,1253 M 76,1368 L 76,1418 M 76,1443 L 76,1485 M 76,1678 L 76,1706 M 76,1758 L 76,1771 M 76,1903 L 76,1908 M 76,2035 L 76,2048 M 76,2280 L 76,2284 M 76,2456 L 76,2486 M 76,2672 L 76,2695 M 76,2718 L 76,2732 M 76,2965 L 76,3016 M 76,3078 L 76,3104" style={{ animationDuration: '59s' }} />
              <path stroke="hsl(270 70% 60%)" d="M 91,0 L 91,17 M 91,245 L 91,252 M 91,356 L 91,375 M 91,398 L 91,415 M 91,501 L 91,526 M 91,681 L 91,699 M 91,843 L 91,864 M 91,968 L 91,976 M 91,1058 L 91,1101 M 91,1321 L 91,1361 M 91,1522 L 91,1567 M 91,1632 L 91,1650 M 91,1755 L 91,1775 M 91,1960 L 91,1988 M 91,2218 L 91,2270 M 91,2420 L 91,2463 M 91,2647 L 91,2689 M 91,2886 L 91,2889 M 91,3095 L 91,3118" style={{ animationDuration: '35s' }} />
              <path stroke="hsl(174 40% 60%)" d="M 106,0 L 106,15 M 106,239 L 106,248 M 106,473 L 106,483 M 106,675 L 106,681 M 106,890 L 106,897 M 106,1129 L 106,1171 M 106,1256 L 106,1272 M 106,1300 L 106,1322 M 106,1461 L 106,1464 M 106,1609 L 106,1624 M 106,1647 L 106,1689 M 106,1752 L 106,1768 M 106,1891 L 106,1917 M 106,1938 L 106,1947 M 106,2142 L 106,2163 M 106,2241 L 106,2284 M 106,2444 L 106,2472 M 106,2643 L 106,2679 M 106,2800 L 106,2836 M 106,2975 L 106,3026" style={{ animationDuration: '90s' }} />
              <path stroke="hsl(174 40% 60%)" d="M 121,0 L 121,38 M 121,272 L 121,316 M 121,424 L 121,428 M 121,453 L 121,462 M 121,605 L 121,611 M 121,694 L 121,719 M 121,907 L 121,953 M 121,1078 L 121,1123 M 121,1158 L 121,1166 M 121,1328 L 121,1346 M 121,1474 L 121,1478 M 121,1555 L 121,1561 M 121,1758 L 121,1801 M 121,1897 L 121,1917 M 121,1995 L 121,1999 M 121,2162 L 121,2197 M 121,2314 L 121,2351 M 121,2462 L 121,2488 M 121,2629 L 121,2640 M 121,2869 L 121,2920 M 121,3110 L 121,3118" style={{ animationDuration: '81s' }} />
              <path stroke="hsl(174 84% 50%)" d="M 136,0 L 136,45 M 136,265 L 136,294 M 136,502 L 136,519 M 136,553 L 136,598 M 136,773 L 136,777 M 136,903 L 136,950 M 136,982 L 136,1016 M 136,1191 L 136,1195 M 136,1274 L 136,1321 M 136,1483 L 136,1512 M 136,1663 L 136,1690 M 136,1747 L 136,1774 M 136,1925 L 136,1929 M 136,2104 L 136,2116 M 136,2323 L 136,2341 M 136,2441 L 136,2465 M 136,2651 L 136,2672 M 136,2885 L 136,2902" style={{ animationDuration: '40s' }} />
            </g>
          </svg>
        </div>
      </div>

      <div className="stack-cards">
        {STACK_CARDS.map((card, index) => (
          <div key={index} className="stack-card-item">
            <div className="stack-card-inner">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="stack-card-counter">{card.counter}</div>
            </div>
            <div className="stack-card-shadow" />
          </div>
        ))}
      </div>
    </section>
  );
};
