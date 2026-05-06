export const styles = {
  "appContainer": {
    "minHeight": "100vh",
    "display": "flex",
    "flexDirection": "column"
  },
  "navbar": {
    "display": "flex",
    "justifyContent": "space-between",
    "alignItems": "center",
    "padding": "0.75rem 2rem",
    "background": "var(--nav-bg)",
    "backdropFilter": "blur(12px)",
    "WebkitBackdropFilter": "blur(12px)",
    "borderBottom": "1px solid var(--glass-border)",
    "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    "position": "sticky",
    "top": "0",
    "zIndex": "50"
  },
  "navbarLeft": {
    "display": "flex",
    "alignItems": "center",
    "gap": "0.75rem",
    "cursor": "pointer",
    "transition": "transform 0.2s ease"
  },
  "logoIcon": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "width": "36px",
    "height": "36px",
    "background": "var(--primary-color)",
    "color": "#ffffff",
    "borderRadius": "8px",
    "fontWeight": "700",
    "fontSize": "1.1rem",
    "border": "none",
    "boxShadow": "0 2px 4px rgba(249, 115, 22, 0.3)"
  },
  "logoText": {
    "fontSize": "1.25rem",
    "fontWeight": "700",
    "color": "var(--primary-color)",
    "letterSpacing": "-0.025em"
  },
  "navbarRight": {
    "display": "flex",
    "alignItems": "center",
    "gap": "0.75rem",
    "padding": "0.35rem 0.75rem 0.35rem 0.35rem",
    "borderRadius": "9999px",
    "transition": "background-color 0.2s ease, transform 0.2s ease",
    "cursor": "pointer",
    "backgroundColor": "transparent"
  },
  "avatar": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "width": "32px",
    "height": "32px",
    "backgroundColor": "#fff7ed",
    "color": "var(--primary-color)",
    "borderRadius": "50%",
    "fontWeight": "600",
    "fontSize": "0.875rem",
    "border": "1px solid rgba(249, 115, 22, 0.1)"
  },
  "userName": {
    "fontWeight": "500",
    "fontSize": "0.95rem",
    "color": "var(--text-main)"
  },
  "mainContent": {
    "flex": "1",
    "display": "flex",
    "padding": "2rem"
  },
  "mainContentsplitLayout": {
    "flexDirection": "column",
    "gap": "3rem"
  },
  "contentLeft": {
    "flex": "1.05"
  },
  "contentRight": {
    "flex": "0.95",
    "background": "#ffffff",
    "padding": "2.5rem",
    "borderRadius": "16px",
    "boxShadow": "0 10px 30px rgba(249, 115, 22, 0.1)",
    "border": "1px solid rgba(249, 115, 22, 0.2)"
  },
  "contentLeft_h1": {
    "fontSize": "3.5rem",
    "fontWeight": "800",
    "marginBottom": "1.5rem",
    "lineHeight": "1.15",
    "letterSpacing": "-0.05em",
    "color": "var(--primary-color)"
  },
  "contentLeft_p": {
    "fontSize": "1.25rem",
    "lineHeight": "1.6",
    "color": "var(--text-muted)"
  },
  "contentRight_h2": {
    "fontSize": "2rem",
    "fontWeight": "700",
    "marginTop": "0",
    "marginBottom": "1rem",
    "color": "#111827",
    "letterSpacing": "-0.03em"
  },
  "contentRight_p": {
    "fontSize": "1.1rem",
    "lineHeight": "1.6",
    "color": "var(--text-muted)"
  },
  "searchBox": {
    "marginTop": "2rem",
    "background": "#fafaf9",
    "border": "1px solid rgba(249, 115, 22, 0.15)",
    "borderRadius": "20px",
    "padding": "1.25rem 1.25rem 0.75rem 1.25rem",
    "display": "flex",
    "flexDirection": "column",
    "transition": "border-color 0.2s, box-shadow 0.2s"
  },
  "searchBox:focusWithin": {
    "borderColor": "var(--primary-color)",
    "boxShadow": "0 0 0 3px rgba(249, 115, 22, 0.1)"
  },
  "searchBox_textarea": {
    "width": "100%",
    "border": "none",
    "background": "transparent",
    "resize": "none",
    "fontFamily": "inherit",
    "fontSize": "1.05rem",
    "color": "var(--text-main)",
    "outline": "none",
    "lineHeight": "1.5"
  },
  "searchActions": {
    "display": "flex",
    "justifyContent": "flex-end",
    "gap": "0.75rem",
    "marginTop": "0.5rem"
  },
  "iconBtn": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "width": "44px",
    "height": "44px",
    "borderRadius": "50%",
    "border": "none",
    "cursor": "pointer",
    "transition": "transform 0.15s, background-color 0.2s"
  },
  "micBtn": {
    "background": "#ffffff",
    "color": "#6b7280",
    "border": "1px solid #e5e7eb",
    "boxShadow": "0 2px 4px rgba(0, 0, 0, 0.02)"
  },
  "submitBtn": {
    "background": "var(--primary-color)",
    "color": "#ffffff",
    "boxShadow": "0 2px 8px rgba(249, 115, 22, 0.3)"
  },
  "featuresSection": {
    "maxWidth": "1200px",
    "margin": "6rem auto 4rem",
    "padding": "0 2rem",
    "textAlign": "left"
  },
  "featuresHeader": {
    "marginBottom": "3rem"
  },
  "badge": {
    "display": "inline-flex",
    "alignItems": "center",
    "gap": "0.5rem",
    "fontSize": "0.85rem",
    "fontWeight": "600",
    "color": "#6b7280",
    "letterSpacing": "0.05em",
    "textTransform": "uppercase",
    "marginBottom": "1rem"
  },
  "dot": {
    "width": "8px",
    "height": "8px",
    "backgroundColor": "#a855f7",
    "borderRadius": "50%"
  },
  "featuresHeader_h2": {
    "fontSize": "3.5rem",
    "fontWeight": "800",
    "color": "#111827",
    "lineHeight": "1.1",
    "letterSpacing": "-0.04em",
    "margin": "0"
  },
  "featuresGrid": {
    "gridTemplateColumns": "1fr"
  },
  "featureCard": {
    "display": "flex",
    "flexDirection": "column",
    "background": "#ffffff",
    "border": "1px solid #f3f4f6",
    "borderRadius": "16px",
    "padding": "1rem",
    "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.02)"
  },
  "featureGraphic": {
    "borderRadius": "12px",
    "height": "240px",
    "marginBottom": "1.25rem",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "position": "relative",
    "overflow": "hidden",
    "boxShadow": "0 1px 3px rgba(0, 0, 0, 0.05)"
  },
  "graphic-1": {
    "background": "radial-gradient(circle at bottom right, #fbc2eb 0%, #e6dee9 100%)"
  },
  "graphic-2": {
    "background": "radial-gradient(circle at bottom center, #e0c3fc 0%, #f3e8ff 100%)"
  },
  "graphic-3": {
    "background": "radial-gradient(circle at top left, #e0e7ff 0%, #fdf4ff 100%)"
  },
  "featureCard_h3": {
    "fontSize": "1.35rem",
    "fontWeight": "700",
    "color": "#111827",
    "margin": "0 0 0.5rem 0",
    "lineHeight": "1.3",
    "letterSpacing": "-0.01em"
  },
  "featureCard_p": {
    "fontSize": "0.95rem",
    "color": "var(--text-muted)",
    "lineHeight": "1.6",
    "margin": "0"
  },
  "mockCard": {
    "background": "rgba(255, 255, 255, 0.75)",
    "backdropFilter": "blur(10px)",
    "borderRadius": "16px",
    "padding": "1.5rem",
    "width": "80%",
    "boxShadow": "0 4px 20px rgba(0, 0, 0, 0.05)",
    "border": "1px solid rgba(255, 255, 255, 0.8)",
    "display": "flex",
    "flexDirection": "column",
    "gap": "1rem"
  },
  "mockAvatar": {
    "width": "56px",
    "height": "56px",
    "borderRadius": "50%",
    "background": "#cbd5e1",
    "backgroundImage": "url('data:image/svg+xmlutf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"56\" height=\"56\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path><circle cx=\"12\" cy=\"7\" r=\"4\"></circle></svg>');",
    "backgroundPosition": "center",
    "backgroundRepeat": "no-repeat",
    "backgroundSize": "32px"
  },
  "mockInfo_strong": {
    "display": "block",
    "fontSize": "1.25rem",
    "color": "#1f2937",
    "marginBottom": "0.25rem"
  },
  "mockInfo_span": {
    "display": "block",
    "fontSize": "0.9rem",
    "color": "#6b7280"
  },
  "mockMeta": {
    "display": "flex",
    "gap": "1rem",
    "marginTop": "0.75rem",
    "fontSize": "0.85rem",
    "color": "#6b7280"
  },
  "mockSearch": {
    "background": "#ffffff",
    "padding": "0.85rem 1.25rem",
    "borderRadius": "24px",
    "fontSize": "0.9rem",
    "fontWeight": "500",
    "color": "#374151",
    "boxShadow": "0 4px 15px rgba(0, 0, 0, 0.05)",
    "display": "flex",
    "alignItems": "center",
    "gap": "0.5rem",
    "width": "85%"
  },
  "mockSubtitle": {
    "marginTop": "1.5rem",
    "fontSize": "0.85rem",
    "color": "rgba(255, 255, 255, 0.9)",
    "fontWeight": "500",
    "textShadow": "0 1px 2px rgba(0, 0, 0, 0.1)"
  },
  "featureGraphicgraphic-3": {
    "alignItems": "stretch",
    "padding": "1.5rem 1.5rem 0 1.5rem"
  },
  "mockListHeader": {
    "textAlign": "center",
    "fontSize": "0.9rem",
    "fontWeight": "600",
    "color": "#6d28d9",
    "marginBottom": "1.25rem"
  },
  "mockList": {
    "background": "rgba(255, 255, 255, 0.8)",
    "backdropFilter": "blur(10px)",
    "borderRadius": "16px 16px 0 0",
    "padding": "1.25rem",
    "display": "flex",
    "flexDirection": "column",
    "gap": "1rem",
    "flex": "1",
    "boxShadow": "0 -4px 20px rgba(0, 0, 0, 0.03)",
    "border": "1px solid rgba(255, 255, 255, 0.8)",
    "borderBottom": "none"
  },
  "mockListItem": {
    "display": "flex",
    "alignItems": "center",
    "gap": "0.75rem",
    "fontSize": "0.85rem"
  },
  "mockCheckbox": {
    "width": "16px",
    "height": "16px",
    "border": "1.5px solid #d1d5db",
    "borderRadius": "4px"
  },
  "mockListItem_strong": {
    "color": "#374151",
    "width": "85px",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis"
  },
  "mockStatus": {
    "color": "#6b7280",
    "whiteSpace": "nowrap",
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "flex": "1"
  }
};