export default function EmailTemplate({
  firstName = "there",
  title = "Welcome to our platform!",
  message = "Thank you for joining us. We're excited to have you on board and look forward to providing you with an amazing experience.",
  buttonText = "Get Started",
  buttonUrl = "https://example.com",
  companyName = "Your Company",
  companyLogo = "/placeholder.svg?height=40&width=120&text=Logo",
}) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </head>
      <body style={main}>
        <div style={container}>
          {/* Header */}
          <div style={header}>
            <img src={companyLogo || "/placeholder.svg"} width="120" height="40" alt={companyName} style={logo} />
          </div>

          {/* Main Content */}
          <div style={content}>
            <h1 style={h1}>Hi {firstName}!</h1>

            <h2 style={h2}>{title}</h2>

            <p style={text}>{message}</p>

            {buttonText && buttonUrl && (
              <div style={buttonContainer}>
                <a href={buttonUrl} style={button}>
                  {buttonText}
                </a>
              </div>
            )}

            <p style={text}>
              If you have any questions, feel free to reach out to our support team. We're here to help!
            </p>

            <p style={text}>
              Best regards,
              <br />
              The {companyName} Team
            </p>
          </div>

          <hr style={hr} />

          {/* Footer */}
          <div style={footer}>
            <p style={footerText}>© 2024 {companyName}. All rights reserved.</p>

            <p style={footerText}>
              <a href="#" style={footerLink}>
                Privacy Policy
              </a>
              {" • "}
              <a href="#" style={footerLink}>
                Terms of Service
              </a>
              {" • "}
              <a href="#" style={footerLink}>
                Unsubscribe
              </a>
            </p>

            <p style={footerText}>
              123 Business Street, Suite 100
              <br />
              City, State 12345
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  margin: 0,
  padding: 0,
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
}

const header = {
  padding: "20px 30px",
  backgroundColor: "#ffffff",
}

const logo = {
  margin: "0 auto",
  display: "block",
}

const content = {
  padding: "0 30px",
}

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.25",
  margin: "16px 0",
}

const h2 = {
  color: "#374151",
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "1.25",
  margin: "16px 0",
}

const text = {
  color: "#6b7280",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "16px 0",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
}

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  border: "none",
  cursor: "pointer",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
  border: "none",
  borderTop: "1px solid #e5e7eb",
}

const footer = {
  padding: "0 30px",
}

const footerText = {
  color: "#9ca3af",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "8px 0",
  textAlign: "center" as const,
}

const footerLink = {
  color: "#6b7280",
  textDecoration: "underline",
}
