import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import mainLogo from './assets/mainlogo_transparent.png';
import WebDesignImg from './assets/Web Design.png';
import WebAppsImg from './assets/webapps.png';
import WebManagementImg from './assets/WebManagement.png';
import outdoorPreview from './assets/outdoor-preview.jpg';
import sleatsPreview from './assets/sleats-preview.jpg';
import travelPreview from './assets/travel-preview.jpg';
import backgroundVideo from './assets/PWS Background Video.mp4';
import '../style.css';

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Card examples imported from pws_design.json definition
const cardExamples = [
  // Order: Web Design, Business Automation & AI, Complete Business Package
  { index: '6',  weight: '12.011', symbol: 'Wd', title: 'Web Design', image: WebDesignImg },
  { index: '18', weight: '39.948', symbol: 'Wa', title: 'Business Automation & AI', image: WebAppsImg },
  { index: '20', weight: '40.078', symbol: 'Wm', title: 'Complete Business Package', image: WebManagementImg },
];

// Service definitions (enhanced for card layout)
const servicesData = [
  {
    id: '06',
    symbol: 'Wd',
    title: 'Web Design',
    desc: 'Professional and mobile-friendly websites that are focused on driving engagement and showcasing your brand in the greatest way possible.',
    items: [
      'Custom UX/UI design',
      'Responsive layouts',
      'Brand-aligned visuals',
    ],
    symbolColor: '#1E4D2B',
  },
  {
    id: '16',
    symbol: 'Ai',
    title: 'Business Automation & AI Management',
    desc: 'Streamlining business objectives with smart automation, powerful dashboards, and AI-enhanced tools.',
    items: [
      'Business Email, Newsletter, and Calendar',
      'Business Automation and AI tools ',
      'Business Dashboards and Reports',
    ],
    symbolColor: '#B54325',
  },
  {
    id: '94',
    symbol: 'Cb',
    title: 'Complete Business Package',
    desc: 'Managing the online business infrastructure by combining web design, automation, analytics, and ongoing support.',
    items: [
      'Web App Development',
      'Database Management',
      'Everything from Web Design and Development to Automation and AI Management',
    ],
    symbolColor: '#88B04B',
  },
];

// Detailed services data for modal
const detailedServicesData = {
  "Basic Business Web Design": {
    "summary": "Professional and mobile-friendly websites that are focused on driving engagement and showcasing your brand in the greatest way possible.",
    "services": [
      {
        "title": "Design Plan Creation",
        "price": "$200",
        "description": "Get a comprehensive design roadmap crafted just for your brand. From fonts and color palettes to layout themes and structure—this is the blueprint that ensures your website is cohesive, eye-catching, and aligned with your business identity."
      },
      {
        "title": "Custom Page Design",
        "price": "$300 (1–3 Pages), $600 (4–6 Pages), $900 (7+ Pages)",
        "description": "Bring your site to life! We develop each page with custom code, stunning visuals, and seamless functionality—designed to impress and built to perform."
      },
      {
        "title": "WordPress Page Design",
        "price": "$100 per page",
        "description": "Professionally designed WordPress pages tailored to your needs. Whether you want sleek product pages or elegant service layouts, we've got you covered."
      },
      {
        "title": "SEO / AIO Integration",
        "price": "Included",
        "description": "Every site includes built-in SEO and AIO (AI Optimization) to help you rank higher on search engines and stay competitive with smarter automation behind the scenes."
      },
      {
        "title": "Mobile Responsiveness",
        "price": "Included",
        "description": "We ensure your website is fully responsive on all mobile and tablet devices. Your brand will look amazing—anywhere, anytime."
      },
      {
        "title": "Basic eCommerce",
        "price": "$200",
        "description": "Want to sell online? Add a polished eCommerce section with product listings, cart functionality, and a smooth user experience to convert visitors into buyers."
      },
      {
        "title": "Contact Forms",
        "price": "$200",
        "description": "Capture leads and connect with your audience through sleek contact forms. (Third-party integration services not included.)"
      },
      {
        "title": "WordPress Plugin Setup",
        "price": "At cost per plugin",
        "description": "We'll install, configure, and test each WordPress plugin for your site to ensure full compatibility and functionality."
      },
      {
        "title": "Post Design Adjustments & Maintenance",
        "price": "2 Free Adjustments within 3 Months",
        "description": "Enjoy peace of mind with two free design updates within 90 days—ideal for minor refinements or post-launch tweaks."
      },
      {
        "title": "Upfront Cost",
        "price": "50% of Total Project Cost",
        "description": "Begin the journey to your perfect website with a 50% upfront deposit after our first design meeting."
      }
    ]
  },
  "Business Automation & AI Management": {
    "summary": "Streamlining business objectives with smart automation, powerful dashboards, and AI-enhanced tools.",
    "services": [
      {
        "title": "Business Email & Calendar Setup + Management",
        "price": "Included in Monthly Rate",
        "description": "Set up secure business emails, shared calendars, tasks, and notes—all managed and optimized for productivity and collaboration."
      },
      {
        "title": "Business Newsletter Setup & Management",
        "price": "Included in Monthly Rate",
        "description": "Content-rich newsletters crafted for engagement. Includes writing, design, delivery, and performance tracking."
      },
      {
        "title": "Business Automation and AI Tools Creation & Management",
        "price": "Included in Monthly Rate",
        "description": "Automate repetitive tasks and integrate powerful AI tools to enhance your business workflow and productivity."
      },
      {
        "title": "Business Analytics Dashboard",
        "price": "Included in Monthly Rate",
        "description": "We build real-time analytics dashboards tailored to your KPIs, giving you insight into your business performance at a glance."
      },
      {
        "title": "PowerShell, Microsoft Power Apps & SharePoint Automation",
        "price": "$20/month (Optional)",
        "description": "Advanced automation tools built within the Microsoft ecosystem, ideal for internal systems, reporting, and workflow optimization. Requires Microsoft 365 Business Standard"
      },
      {
        "title": "Monthly Rate",
        "price": "$1000/month (+$350 for extra newsletters)",
        "description": "Includes full automation development, newsletter management, analytics, maintenance, and continued support."
      },
      {
        "title": "Upfront Cost",
        "price": "$500",
        "description": "Kick off your automation journey with a one-time setup fee after the first meeting."
      }
    ]
  },
  "Complete Business Package": {
    "summary": "Managing the online business infrastructure by combining web design, automation, analytics, and ongoing support.",
    "services": [
      {
        "title": "Design Plan Creation",
        "price": "Included in Monthly Rate",
        "description": "Everything from fonts to layout—we craft a complete design plan to ensure your digital presence is strong and unified."
      },
      {
        "title": "Custom Page Design",
        "price": "$200 (1–3 Pages), $500 (4–6 Pages), $800 (7+ Pages)",
        "description": "Includes all features of the Basic Web Design Custom Pages—built for impact and usability."
      },
      {
        "title": "SEO / AIO Integration",
        "price": "Included in Monthly Rate",
        "description": "Boost your site's visibility and automation using modern SEO tactics and AI-powered enhancements."
      },
      {
        "title": "Mobile Responsiveness",
        "price": "Included in Monthly Rate",
        "description": "Responsive design that guarantees your site looks flawless on any screen size."
      },
      {
        "title": "Basic eCommerce",
        "price": "Included in Monthly Rate",
        "description": "Add a product section with secure checkout features, polished layouts, and product filtering."
      },
      {
        "title": "Contact Forms",
        "price": "Included in Monthly Rate",
        "description": "Simple, functional contact forms that help you connect with clients efficiently."
      },
      {
        "title": "Domain Registration",
        "price": "Cost Based on Cloudflare",
        "description": "We help you register and manage your custom domain through Cloudflare for optimal speed and security."
      },
      {
        "title": "Database Setup (Supabase)",
        "price": "$100 Flat Rate",
        "description": "We'll set up a powerful and scalable Supabase database to store your site data and app information."
      },
      {
        "title": "Business Email & Calendar Setup (Zoho Mail)",
        "price": "$50/month (Optional)",
        "description": "Full business email suite with calendar and task syncing through Zoho Mail—optional but highly recommended."
      },
      {
        "title": "Newsletter Management (Zoho Campaigns)",
        "price": "$250 (1), $350 (2), $450 (3+)",
        "description": "Includes content writing, graphics, and performance analytics. Monthly newsletter plans that grow with your audience."
      },
      {
        "title": "Web App Creation & Maintenance",
        "price": "$1200/month per app (Optional)",
        "description": "Custom-built web applications for internal operations or customer-facing portals—maintained monthly for reliability."
      },
      {
        "title": "Automation & AI Management (Make.com)",
        "price": "$150/month (Optional)",
        "description": "Harness the power of Make.com to automate repetitive tasks and integrate smart systems into your operations."
      },
      {
        "title": "Monthly Management Fee",
        "price": "$1650/month",
        "description": "Covers all ongoing maintenance, design, and system optimization for your entire business web presence."
      },
      {
        "title": "Upfront Cost",
        "price": "$200 + Custom Page Design + Database + Domain + Options",
        "description": "Begin your business transformation with a one-time upfront investment, tailored to your selected features."
      }
    ]
  }
};

// Sample cards data
const samplesData = [
  {
    name: 'Outdoor Exchange',
    tagline: 'Outdoor fashion company',
    image: outdoorPreview,
    url: 'https://brassguy.github.io/OutdoorExchange/',
  },
  {
    name: 'Sleats',
    tagline: 'A Salt Lake lifestyle website',
    image: sleatsPreview,
    url: 'https://brassguy.github.io/sleats/',
  },
  {
    name: 'TravelWeb',
    tagline: 'A Travel companies website',
    image: travelPreview,
    url: 'https://brassguy.github.io/TravelWeb/',
  },
];

// FAQ data
const faqData = [
  {
    id: 1,
    question: "What makes Pezzolla Web Studio different from other web design agencies?",
    answer: "We don't just do basic web designs, we develop high end websites, business automation and AI driven tools for a business infrastructure that will enable your business to thrive. It is a full business platform that is designed to grow with alongside you."
  },
  {
    id: 2,
    question: "What kind of businesses do you work with?",
    answer: "Small to mid-sized businesses, entrepreneurs, and non-profits are our specialty. If you are looking to elevate your online presence and improve or build your businesses infrastructure, we will gladly work with you to achieve greatness!"
  },
  {
    id: 3,
    question: "How long does a typical project take?",
    answer: "This all depends on the size and scope of the project. A simple website design can take a few short days, but building an entire business infrastructure can take 2 to 3 months. When you receive your quote, you will receive an \"estimated time of completion\". Remember, we are looking for quality, every project is personal. So, we will take the time necessary to ensure everything meets your request and is ready to help make your business thrive."
  },
  {
    id: 4,
    question: "Do I need to provide my own content?",
    answer: "You can, but it is not required. We will build the content and develop everything ourselves. However, if you do provide the core information, we will use that and create something we can all still be proud of."
  },
  {
    id: 5,
    question: "Is SEO included?",
    answer: "Not only is SEO included, but AIO (AI Optimization) is as well. Free of charge. We want to ensure that your website is indexed, fast, and visible to Search Engines and AI searches from day one."
  },
  {
    id: 6,
    question: "Do you offer ongoing maintenance or support?",
    answer: "Yes! In two of our packages (\"Business Automation & AI Management\" and the \"Complete Business Package\") we offer daily support that covers design updates, performance improvements, automation tweaks, new feature implementation, newsletters, emails, and more! We are at your service, let us know how we can support!"
  },
  {
    id: 7,
    question: "Can I update the website myself?",
    answer: "If your site is built with WordPress, you will have access to make your own updates provided by WordPress itself. Either way, we will also provide training and accompanying documentation that will help guide you in managing everything confidently."
  },
  {
    id: 8,
    question: "Can you help with business automation or email marketing?",
    answer: "Yes! One of the biggest differentiators between us and other Web Design firms is in setting up automation tools, email systems and analytics dashboards."
  },
  {
    id: 9,
    question: "Do you offer eCommerce solutions?",
    answer: "We can absolutely create fully functional eCommerce sites with product listings, carts, payment gateways, and order management, all of which is optimized for mobile, SEO, and AIO."
  },
  {
    id: 10,
    question: "What can you do for businesses that are just starting out?",
    answer: "Everything! We love helping new businesses. We can assist with domain registration, email setup, web design, and even business automation like scheduling invoices and newsletters."
  },
  {
    id: 11,
    question: "If I choose only Web Design, does that apply to anything more than just the look of the site?",
    answer: "Web Design is just designing the front-end look and feel of the website. It does not include any \"back end\" work such as domain registration, database development, server-side logic, API development or anything that does not involve the look and feel of a website."
  },
  {
    id: 12,
    question: "Can I request features that are not listed in your service plans?",
    answer: "Yes! Make those requests and we will do our best to add those services on. If we can build it, we will."
  }
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [openFAQs, setOpenFAQs] = useState(new Set());
  
  // Progressive background colors - getting darker towards footer
  const sectionBackgrounds = {
    hero: 'linear-gradient(135deg, #f8fafb 0%, #f1f5f8 100%)',
    services: 'linear-gradient(135deg, #e8eef4 0%, #dae4ec 100%)',
    faq: 'linear-gradient(135deg, #d8e2ed 0%, #c9d7e5 100%)',
    samples: 'linear-gradient(135deg, #d1dce6 0%, #c2d1dd 100%)',
    about: 'linear-gradient(135deg, #b8c8d6 0%, #a8bccf 100%)',
    footer: 'linear-gradient(135deg, #7d9bb7 0%, #6d8faf 100%)'
  };

  // Section style with smooth transitions
  const getSectionStyle = (backgroundKey) => ({
    background: sectionBackgrounds[backgroundKey],
    position: 'relative',
    minHeight: '100vh',
    paddingTop: '60px',
    paddingBottom: '60px',
    transition: 'all 0.3s ease',
    zIndex: 1
  });

  // Function to handle opening the modal with service details
  const handleLearnMore = (serviceTitle) => {
    let serviceKey;
    if (serviceTitle === 'Web Design') {
      serviceKey = 'Basic Business Web Design';
    } else if (serviceTitle === 'Business Automation & AI Management') {
      serviceKey = 'Business Automation & AI Management';
    } else if (serviceTitle === 'Complete Business Package') {
      serviceKey = 'Complete Business Package';
    }
    
    setSelectedService(detailedServicesData[serviceKey]);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  // Function to open quote modal
  const openQuoteModal = () => {
    setQuoteModalOpen(true);
  };

  // Function to close quote modal
  const closeQuoteModal = () => {
    setQuoteModalOpen(false);
  };

  // Function to toggle FAQ items
  const toggleFAQ = (faqId) => {
    setOpenFAQs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  };

  // Scramble logo text animation
  const scrambleText = (e) => {
    const element = e.currentTarget;
    const originalText = element.dataset.value;
    if (element.dataset.animating === 'true') return; // Prevent overlapping animations
    element.dataset.animating = 'true';

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let iteration = 0;

    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, idx) => {
          if (idx < iteration) {
            return originalText[idx];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
        element.dataset.animating = 'false';
      }

      iteration += 1;
    }, 40);
  };

  useEffect(() => {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    // Animate hero section on component mount
    function animateHero() {
      const heroTitle = document.querySelector('.hero-title');
      if (!heroTitle) return;
      gsap.from(heroTitle.children, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      });
    }

    // Header scroll state handler
    function handleScroll() {
      const header = document.querySelector('header');
      if (!header) return;
      
      const scrollY = window.scrollY;
      const threshold = 50;
      
      if (scrollY > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Initialize all animations
    animateHero();
    initScrollAnimations();
    
    // Only initialize card transition animation on desktop
    if (!isMobile) {
      initCardTransitionAnimation();
    }
    
    // Add scroll listener for header
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize header state

    // Handle Escape key for modals
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (modalOpen) {
          closeModal();
        }
        if (quoteModalOpen) {
          closeQuoteModal();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Initialize Zoho form when quote modal opens
    if (quoteModalOpen) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        initZohoForm();
      }, 100);
    }
    
    // Handle window resize to update mobile detection
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        window.location.reload(); // Reload to reinitialize animations
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };

    // Scroll-triggered animations
    function initScrollAnimations() {
      gsap.utils.toArray('.samples-grid .work-item').forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.from('.about-content p, .about-content .cta-link', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 70%',
        },
      });

      // Note: Service card animations are handled in initCardTransitionAnimation
    }

    // Card transition animation from hero to services
    function initCardTransitionAnimation() {
      const heroCards = gsap.utils.toArray('.hero-grid .work-item');
      const serviceCards = gsap.utils.toArray('.service-card');
      
      if (heroCards.length === 0 || serviceCards.length === 0) return;

      // Create individual scroll triggers for each card to create V-shape movement
      heroCards.forEach((heroCard, index) => {
        const serviceCard = serviceCards[index];
        if (!serviceCard) return;

        const cardId = serviceCard.querySelector('.card-id');
        if (!cardId) return;

        // Create V-shape timing - center card (Web Apps) moves first, others slightly delayed
        const isCenter = index === 1; // Web Apps is at index 1
        const startOffset = isCenter ? 'top 85%' : 'top 80%';
        const endOffset = isCenter ? 'top 15%' : 'top 10%';

        gsap.set(heroCard, { zIndex: isCenter ? 10 : 5 }); // Center card on top

        ScrollTrigger.create({
          trigger: '.services',
          start: startOffset,
          end: endOffset,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Calculate dynamic positions
            const heroRect = heroCard.getBoundingClientRect();
            const serviceRect = cardId.getBoundingClientRect();
            const viewportOffset = window.scrollY;
            
            // Calculate movement distances relative to current scroll position
            const deltaX = (serviceRect.left + window.scrollX) - (heroRect.left + window.scrollX);
            const deltaY = (serviceRect.top + viewportOffset) - (heroRect.top + viewportOffset);

            // Apply V-shape easing - center moves smoothly, sides have slight curve
            const easedProgress = isCenter ? 
              gsap.utils.interpolate(0, 1, progress) :
              gsap.utils.interpolate(0, 1, Math.pow(progress, 0.8));

            // Apply transformations
            gsap.set(heroCard, {
              x: deltaX * easedProgress,
              y: deltaY * easedProgress,
              scale: gsap.utils.interpolate(1, 0.2, easedProgress),
              opacity: gsap.utils.interpolate(1, 0, Math.pow(progress, 2)),
              transformOrigin: 'center center',
            });
          }
        });
      });

             // Ensure service cards are visible and animate them in properly
       gsap.set(serviceCards, { opacity: 1, scale: 1, y: 0 });
       
       // Animate service cards to appear with a bounce effect
       ScrollTrigger.create({
         trigger: '.services',
         start: 'top 70%',
         onEnter: () => {
           gsap.fromTo(serviceCards, 
             {
               scale: 0.8,
               y: 30,
               opacity: 0.3,
             },
             {
               scale: 1,
               y: 0,
               opacity: 1,
               duration: 0.8,
               stagger: 0.15,
               ease: 'back.out(1.7)',
               delay: 0.3,
               clearProps: "all"
             }
           );
         },
         onLeave: () => {
           // Ensure cards remain visible when scrolling back up
           gsap.set(serviceCards, { opacity: 1, scale: 1, y: 0 });
         },
         onEnterBack: () => {
           // Ensure cards remain visible when scrolling back down
           gsap.set(serviceCards, { opacity: 1, scale: 1, y: 0 });
         }
       });
    }

    // Initialize Zoho form
    function initZohoForm() {
      // Clear any existing form
      const existingDiv = document.getElementById("zf_div_FGNwV7ikGuauxs_xf06En1uEJn3izLcW_vpw4imep68");
      if (existingDiv) {
        existingDiv.innerHTML = '';
      }

      // Initialize the Zoho form
      try {
        var f = document.createElement("iframe");
        
        var ifrmSrc = 'https://forms.zohopublic.com/pezzstudiozoho1/form/PezzollaWebStudioQuotes/formperma/FGNwV7ikGuauxs_xf06En1uEJn3izLcW_vpw4imep68?zf_rszfm=1';
        
        try {
          if (typeof ZFAdvLead != "undefined" && typeof zfutm_zfAdvLead != "undefined") {
            for (var prmIdx = 0; prmIdx < ZFAdvLead.utmPNameArr.length; prmIdx++) {
              var utmPm = ZFAdvLead.utmPNameArr[prmIdx];
              utmPm = (ZFAdvLead.isSameDomian && (ZFAdvLead.utmcustPNameArr.indexOf(utmPm) == -1)) ? "zf_" + utmPm : utmPm;
              var utmVal = zfutm_zfAdvLead.zfautm_gC_enc(ZFAdvLead.utmPNameArr[prmIdx]);
              if (typeof utmVal !== "undefined") {
                if (utmVal != "") {
                  if (ifrmSrc.indexOf('?') > 0) {
                    ifrmSrc = ifrmSrc + '&' + utmPm + '=' + utmVal;
                  } else {
                    ifrmSrc = ifrmSrc + '?' + utmPm + '=' + utmVal;
                  }
                }
              }
            }
          }
          if (typeof ZFLead !== "undefined" && typeof zfutm_zfLead !== "undefined") {
            for (var prmIdx = 0; prmIdx < ZFLead.utmPNameArr.length; prmIdx++) {
              var utmPm = ZFLead.utmPNameArr[prmIdx];
              var utmVal = zfutm_zfLead.zfutm_gC_enc(ZFLead.utmPNameArr[prmIdx]);
              if (typeof utmVal !== "undefined") {
                if (utmVal != "") {
                  if (ifrmSrc.indexOf('?') > 0) {
                    ifrmSrc = ifrmSrc + '&' + utmPm + '=' + utmVal;
                  } else {
                    ifrmSrc = ifrmSrc + '?' + utmPm + '=' + utmVal;
                  }
                }
              }
            }
          }
        } catch (e) {}
        
        f.src = ifrmSrc;
        f.style.border = "none";
        f.style.height = "661px";
        f.style.width = "100%";
        f.style.transition = "all 0.5s ease";
        f.setAttribute("aria-label", 'Pezzolla Web Studio Quote');
        
        var d = document.getElementById("zf_div_FGNwV7ikGuauxs_xf06En1uEJn3izLcW_vpw4imep68");
        if (d) {
          d.appendChild(f);
        }
        
        window.addEventListener('message', function(event) {
          var evntData = event.data;
          if (evntData && evntData.constructor == String) {
            var zf_ifrm_data = evntData.split("|");
            if (zf_ifrm_data.length == 2 || zf_ifrm_data.length == 3) {
              var zf_perma = zf_ifrm_data[0];
              var zf_ifrm_ht_nw = (parseInt(zf_ifrm_data[1], 10) + 15) + "px";
              var iframe = document.getElementById("zf_div_FGNwV7ikGuauxs_xf06En1uEJn3izLcW_vpw4imep68").getElementsByTagName("iframe")[0];
              if ((iframe.src).indexOf('formperma') > 0 && (iframe.src).indexOf(zf_perma) > 0) {
                var prevIframeHeight = iframe.style.height;
                var zf_tout = false;
                if (zf_ifrm_data.length == 3) {
                  iframe.scrollIntoView();
                  zf_tout = true;
                }

                if (prevIframeHeight != zf_ifrm_ht_nw) {
                  if (zf_tout) {
                    setTimeout(function() {
                      iframe.style.height = zf_ifrm_ht_nw;
                    }, 500);
                  } else {
                    iframe.style.height = zf_ifrm_ht_nw;
                  }
                }
              }
            }
          }
        }, false);
      } catch (e) {}
    }
  }, [modalOpen, quoteModalOpen]);

  return (
    <>
      {/* Ambient Overlay */}
      <div className="ambient-overlay" aria-hidden="true"></div>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <a href="#" className="logo-link">
            <img src={mainLogo} alt="Pezzolla Web Studio" className="logo-img" />
          </a>
        </div>
        <nav className="nav desktop-nav">
          <ul>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#samples">Samples</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          className={`hamburger menu-toggle ${mobileOpen ? 'active' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="line" aria-hidden="true"></span>
          <span className="line" aria-hidden="true"></span>
          <span className="line" aria-hidden="true"></span>
        </button>

        <div className="social-icons" aria-label="Social media links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="social-link"
          >
            <i className="fab fa-facebook-f" aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${mobileOpen ? 'active' : ''}`} id="mobile-menu">
        <button
          className="mobile-menu-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
        >
          ×
        </button>
        <ul>
          <li>
            <a href="#services" onClick={() => setMobileOpen(false)}>
              Services
            </a>
          </li>
          <li>
            <a href="#faq" onClick={() => setMobileOpen(false)}>
              FAQ
            </a>
          </li>
          <li>
            <a href="#samples" onClick={() => setMobileOpen(false)}>
              Samples
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setMobileOpen(false)}>
              About
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="main" style={{ background: 'transparent' }}>
        {/* Hero */}
        <section className="hero" id="hero" style={getSectionStyle('hero')}>
          {/* Background Video */}
          <video 
            className="hero-background-video"
            autoPlay 
            loop 
            muted 
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-inner">
            {/*
            <h1 className="hero-title">
              <span>Artistry</span>
              <span>in Code &amp;</span>
              <span>Nature</span>
            </h1>
            */}

            <div className="work-grid hero-grid">
              {cardExamples.map((card) => (
                <a
                  key={`hero-${card.title}`}
                  href="#services"
                  className="work-item hero-card"
                  data-service={card.title.toLowerCase().replace(/\s+/g, '-')}
                >
                  <img src={card.image} alt={card.title} />
                  <div className="hero-card-overlay">
                    <span className="hero-card-title">{card.title}</span>
                  </div>
                </a>
              ))}
            </div>
            <h2 className="hero-label">
              {Array.from('Pezzolla Web Studio').map((char, idx) => (
                <span key={idx} className="hero-char">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
            
            {/* Call to Action Buttons */}
            <div className="hero-cta-buttons">
              <button onClick={openQuoteModal} className="btn btn-primary hero-cta-btn">
                Get a Free Quote!
              </button>
              <a href="#services" className="btn btn-secondary hero-cta-btn">
                Check out our services!
              </a>
            </div>
            
            {/* Section Navigation Arrows */}
            <div className="section-nav">
              <a
                href="#services"
                className="scroll-arrow"
                aria-label="Scroll to Services section"
              ></a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="services" id="services" style={getSectionStyle('services')}>
          {/* Section Navigation Arrows */}
          <div className="section-nav">
            <a href="#hero" className="scroll-arrow up" aria-label="Scroll to Hero section"></a>
            <a href="#faq" className="scroll-arrow" aria-label="Scroll to FAQ section"></a>
          </div>
          <h2 className="work-title">Services</h2>
          <div className="services-columns">
            {servicesData.map((srv) => (
              <article className="service-card" key={srv.id}>
                <div className="card-header">
                  <span className="card-id">{srv.id}</span>
                  <span className="card-symbol" style={{ color: srv.symbolColor }}>
                    {srv.symbol}
                  </span>
                </div>
                <h3 className="card-title">{srv.title}</h3>
                <p className="card-desc">{srv.desc}</p>
                <ul className="card-features">
                  {srv.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="card-buttons">
                  <button onClick={() => handleLearnMore(srv.title)} className="btn btn-primary">Learn More</button>
                  <button onClick={openQuoteModal} className="btn btn-secondary">Get Quote</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="faq" id="faq" style={getSectionStyle('faq')}>
          {/* Section Navigation Arrows */}
          <div className="section-nav">
            <a href="#services" className="scroll-arrow up" aria-label="Scroll to Services section"></a>
            <a href="#samples" className="scroll-arrow" aria-label="Scroll to Samples section"></a>
          </div>
          <h2 className="work-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqData.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={openFAQs.has(faq.id)}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    {openFAQs.has(faq.id) ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`faq-answer ${openFAQs.has(faq.id) ? 'open' : ''}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Samples */}
        <section className="work" id="samples" style={getSectionStyle('samples')}>
          {/* Section Navigation Arrows */}
          <div className="section-nav">
            <a href="#faq" className="scroll-arrow up" aria-label="Scroll to FAQ section"></a>
            <a href="#about" className="scroll-arrow" aria-label="Scroll to About section"></a>
          </div>
          <h2 className="work-title">Samples</h2>
          <div className="samples-grid">
            {samplesData.map((sample) => (
              <a key={sample.name} href={sample.url} target="_blank" rel="noopener noreferrer" className="work-item" data-service={sample.name.toLowerCase().replace(/\s+/g, '-') }>
                <img src={sample.image} alt={sample.name} />
                <div className="work-item-overlay">
                  <h3>{sample.name}</h3>
                  <p>{sample.tagline}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="about" id="about" style={getSectionStyle('about')}>
          {/* Section Navigation Arrows */}
          <div className="section-nav">
            <a href="#samples" className="scroll-arrow up" aria-label="Scroll to Samples section"></a>
          </div>
          <div className="about-content">
            <p>
                Pezzolla Web Studio is about delivering outstanding business infrastructure support. Delivering high-quality, scalable, and efficient digital services so you don't have to worry about a thing.
            </p>
            <p>
                We were built with the vision of creating a world were efficiency is maximized, where business owners can spend more time building their business, and less time worrying about their websites and digital infrastructure.
            </p>
            <p>
                Together we can achieve great things and deliever to the world your product in the greatest and most optimized way possible! 
            </p>
            <button onClick={openQuoteModal} className="btn btn-secondary">
              Sign up for a quote!
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer" style={{ 
          background: sectionBackgrounds.footer,
          position: 'relative',
          paddingTop: '60px',
          paddingBottom: '40px',
          transition: 'all 0.3s ease',
          zIndex: 1
        }}>
          <div className="footer-container">
            {/* Branding Section */}
            <div className="footer-section footer-branding">
              <div className="footer-logo">
                <img src={mainLogo} alt="Pezzolla Web Studio" className="footer-logo-img" />
                <div className="footer-brand-text">
                  <h3 className="footer-company-name">Pezzolla Web Studio</h3>
                  <p className="footer-tagline">Building A Powerful Online Business Infrustructure</p>
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="footer-section footer-navigation">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-links">
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#samples">Samples</a></li>
                <li><button onClick={openQuoteModal} className="footer-quote-btn">Get Quote</button></li>
                <li><a href="mailto:pezzstudio@zohomail.com">Contact</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="footer-section footer-contact">
              <h4 className="footer-heading">Contact Info</h4>
              <div className="footer-contact-info">
                <p className="footer-contact-item">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  <span>Herriman, UT</span>
                </p>
                <p className="footer-contact-item">
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  <a href="mailto:pezzstudio@zohomail.com">pezzstudio@zohomail.com</a>
                </p>
                <p className="footer-contact-item">
                  <i className="fas fa-phone" aria-hidden="true"></i>
                  <a href="tel:+18018319443">+1 (801) 831-9443</a>
                </p>
                <p className="footer-contact-item">
                  <i className="fas fa-clock" aria-hidden="true"></i>
                  <span>Mon-Sat 3am–11pm MT</span>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="footer-section footer-social">
              <h4 className="footer-heading">Follow Us</h4>
              <div className="footer-social-links">
                <a href="https://instagram.com/pezzollaweb" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="https://linkedin.com/company/pezzollaweb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin" aria-hidden="true"></i>
                </a>
                <a href="https://facebook.com/pezzollaweb" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a href="https://github.com/pezzollaweb" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fab fa-github" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-legal">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/accessibility">Accessibility Statement</a>
              </div>
              <div className="footer-copyright">
                <p>&copy; 2025 Pezzolla Web Studio. All rights reserved.</p>
              </div>
              <div className="footer-extras">
                <button 
                  className="back-to-top-btn"
                  onClick={() => {
                    gsap.to(window, { duration: 1, scrollTo: { y: 0 } });
                  }}
                  aria-label="Back to top"
                >
                  <i className="fas fa-arrow-up" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Service Details Modal */}
      {modalOpen && selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-summary">{selectedService.summary}</p>
              <div className="services-list">
                {selectedService.services.map((service, index) => (
                  <div key={index} className="service-detail-item">
                    <div className="service-detail-header">
                      <h3 className="service-detail-title">{service.title}</h3>
                      <span className="service-detail-price">{service.price}</span>
                    </div>
                    <p className="service-detail-description">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <p className="veterans-notice">
                🇺🇸 1% of every payment will be donated to a verified nonprofit supporting U.S. military veterans of your choice
              </p>
              <button onClick={closeModal} className="btn btn-secondary">Close</button>
              <button onClick={() => { closeModal(); openQuoteModal(); }} className="btn btn-primary">Get Quote</button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {quoteModalOpen && (
        <div className="modal-overlay" onClick={closeQuoteModal}>
          <div className="modal-content quote-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close" onClick={closeQuoteModal} aria-label="Close modal">
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-summary"></p>
              
              {/* Zoho Form Embed */}
              <div id="zf_div_FGNwV7ikGuauxs_xf06En1uEJn3izLcW_vpw4imep68"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App; 