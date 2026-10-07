export const CONTENT = {
  name: "Priyanshu Raj",
  headline: "Java & Spring Boot Developer",
  email: "devxpriyanshu@gmail.com",
  links: {
    github: "https://github.com/Raj-Priyanshu45",
    linkedin: "https://www.linkedin.com/in/priyanshu-raj-ba102035b/",
    leetcode: "https://leetcode.com/u/devxpriyanshu/",
  },
  education: {
    degree: "B.E. Information Science and Engineering",
    institute: "Siddaganga Institute of Technology",
    location: "Tumkur",
    semester: "5th semester",
    graduation: "2028",
  },
  projects: [
    {
      id: "chat", number: "01", name: "Real-Time Chat App", category: "REALTIME SYSTEMS",
      summary: "Conversations in real time. Consistency across reconnects.",
      description: "A room-based messaging application with public and private rooms, 1:1 conversations, and membership-aware authorization.",
      tags: ["Spring Boot", "WebSocket / STOMP", "MongoDB", "React", "Docker", "Cloudinary"],
      url: "https://chat-app-sole-xdev.vercel.app/", linkLabel: "Open live app",
      flow: [
        { name: "React client", detail: "Messages & media", kind: "client" },
        { name: "Spring Boot", detail: "Membership auth", kind: "core" },
        { name: "STOMP broker", detail: "Room subscriptions", kind: "service" },
        { name: "MongoDB", detail: "Message history", kind: "storage" },
      ],
      flowLabel: "MESSAGE LIFECYCLE", protocol: "WebSocket / STOMP",
      details: [
        { title: "Authorized by room", text: "Room membership checks protect private conversations and 1:1 messaging." },
        { title: "Two paths. One message.", text: "Media travels over REST to Cloudinary; its metadata is delivered in real time." },
        { title: "Reconnect without losing context", text: "Paginated history and timestamp-based catch-up restore messages after a reconnect." },
      ],
      note: "REST media upload → Cloudinary · Realtime metadata → room subscribers",
    },
    {
      id: "shop", number: "02", name: "ShopNetic", category: "COMMERCE & AUTHORIZATION",
      summary: "A commerce backend with boundaries built in.",
      description: "A multi-role commerce system connecting SKU inventory, vendor approval, and guarded cart-to-checkout order flows.",
      tags: ["Spring Boot", "MySQL", "Keycloak", "Cloudinary", "Virtual threads"],
      url: "https://github.com/Raj-Priyanshu45/Ecomm", linkLabel: "View repository",
      flow: [
        { name: "Client request", detail: "JWT access token", kind: "client" },
        { name: "Keycloak", detail: "Identity & roles", kind: "service" },
        { name: "Spring Boot", detail: "@PreAuthorize", kind: "core" },
        { name: "MySQL", detail: "Inventory & orders", kind: "storage" },
      ],
      flowLabel: "CHECKOUT REQUEST PATH", protocol: "JWT / REST",
      details: [
        { title: "Explicit permission boundaries", text: "Multi-role RBAC, JWT validation, and @PreAuthorize guard access to commerce operations." },
        { title: "Guarded order lifecycle", text: "SKU inventory, warehouse resolution, vendor approval, and order guards shape the checkout flow." },
        { title: "Work beyond the request", text: "Notifications and asynchronous media and email processing use virtual threads." },
      ],
      note: "Cart → checkout → warehouse resolution → guarded order · Async media & email",
    },
    {
      id: "gateway", number: "03", name: "Distributed API Gateway", category: "DISTRIBUTED SYSTEMS",
      summary: "One entry point. Deliberate failure boundaries.",
      description: "A centralized gateway for route authorization, traffic control, resilient downstream requests, and distributed tracing.",
      tags: ["Spring Cloud Gateway", "Redis", "Resilience4j", "Keycloak", "Jaeger"],
      url: "https://github.com/Raj-Priyanshu45/API-gateway", linkLabel: "View repository",
      flow: [
        { name: "Incoming request", detail: "JWT & route", kind: "client" },
        { name: "Gateway", detail: "Custom filters", kind: "core" },
        { name: "Redis", detail: "Token bucket", kind: "storage" },
        { name: "Downstream", detail: "Circuit & fallback", kind: "service" },
      ],
      flowLabel: "GATEWAY REQUEST PATH", protocol: "HTTP / JWT",
      details: [
        { title: "Centralized access control", text: "JWT and route authorization are handled at the gateway through a custom GatewayFilterFactory." },
        { title: "Traffic with limits", text: "Redis-backed token-bucket rate limiting controls requests before they reach downstream services." },
        { title: "Visible, contained failures", text: "Resilience4j circuit breaking and fallback protect request flows; Jaeger provides tracing." },
      ],
      note: "Keycloak → JWT validation · Resilience4j → fallback · Jaeger → distributed traces",
    },
  ],
  stack: [
    { label: "LANGUAGES & CORE", items: ["Java", "Spring Boot", "Spring Cloud Gateway", "REST APIs"] },
    { label: "DATA & MESSAGING", items: ["MySQL", "MongoDB", "Redis", "WebSocket / STOMP"] },
    { label: "SECURITY & RESILIENCE", items: ["Keycloak", "JWT / RBAC", "Resilience4j", "Jaeger"] },
    { label: "CLIENT & DELIVERY", items: ["React", "Docker", "Cloudinary", "Git / GitHub"] },
  ],
} as const;

export type Project = (typeof CONTENT.projects)[number];
