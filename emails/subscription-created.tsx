import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type SubscriptionCreatedEmailProps = {
  name: string;
  price: number;
  currency: string;
  billingCycle: "monthly" | "yearly";
  renewalDate?: string;
  serviceIcon?: string | null;
};

const iconMap: Record<string, string> = {
  netflix: "https://cdn.simpleicons.org/netflix",
  spotify: "https://cdn.simpleicons.org/spotify",
  apple: "https://cdn.simpleicons.org/apple",
  github: "https://cdn.simpleicons.org/github",
  openai: "https://cdn.simpleicons.org/openai",
  discord: "https://cdn.simpleicons.org/discord",
  youtube: "https://cdn.simpleicons.org/youtube",
  amazon: "https://cdn.simpleicons.org/amazon",
  microsoft: "https://cdn.simpleicons.org/microsoft",
  google: "https://cdn.simpleicons.org/google",
  gemini: "https://cdn.simpleicons.org/googlegemini",
  chatgpt: "https://cdn.simpleicons.org/openai",
  notion: "https://cdn.simpleicons.org/notion",
  slack: "https://cdn.simpleicons.org/slack",
  figma: "https://cdn.simpleicons.org/figma",
  canva: "https://cdn.simpleicons.org/canva",
  adobe: "https://cdn.simpleicons.org/adobe",
  dropbox: "https://cdn.simpleicons.org/dropbox",
  zoom: "https://cdn.simpleicons.org/zoom",
  linkedin: "https://cdn.simpleicons.org/linkedin",
};

const fallbackIcon =
  "https://unpkg.com/lucide-static@latest/icons/package.svg";

function getServiceIcon(
  serviceIcon?: string | null,
  name?: string
): string {
  if (serviceIcon) {
    const key = serviceIcon.toLowerCase().trim();

    if (iconMap[key]) {
      return iconMap[key];
    }
  }

  if (name) {
    const key = name.toLowerCase().trim();

    if (iconMap[key]) {
      return iconMap[key];
    }
  }

  return fallbackIcon;
}

export default function SubscriptionCreatedEmail({
  name,
  price,
  currency,
  billingCycle,
  renewalDate,
  serviceIcon,
}: SubscriptionCreatedEmailProps) {
  const iconUrl = getServiceIcon(serviceIcon, name);

  return (
    <Html>
      <Head />

      <Preview>
        Your {name} subscription has been added to SubIntel.
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Heading style={styles.logo}>
              SubIntel
            </Heading>

            <Text style={styles.tagline}>
              Your subscriptions, organized and under control.
            </Text>
          </Section>

          {/* Service icon */}
          <Section style={styles.iconSection}>
            <Section style={styles.iconBox}>
              <Img
                src={iconUrl}
                alt={`${name} icon`}
                width="24"
                height="24"
                style={styles.serviceIcon}
              />
            </Section>
          </Section>

          {/* Subscription */}
          <Heading style={styles.subscriptionName}>
            {name}
          </Heading>

          <Text style={styles.successText}>
            Subscription added successfully
          </Text>

          <Text style={styles.description}>
            SubIntel is now tracking this subscription
            for you. Here are the details you saved.
          </Text>

          {/* Details */}
          <Section style={styles.card}>
            <Text style={styles.label}>
              PRICE
            </Text>

            <Text style={styles.value}>
              {currency} {price}
            </Text>

            <Text style={styles.label}>
              BILLING CYCLE
            </Text>

            <Text style={styles.value}>
              {billingCycle}
            </Text>

            {renewalDate && (
              <>
                <Text style={styles.label}>
                  RENEWAL DATE
                </Text>

                <Text style={styles.value}>
                  {renewalDate}
                </Text>
              </>
            )}
          </Section>

          {/* Closing */}
          <Text style={styles.closingText}>
            Keep your subscriptions organized and stay
            on top of your upcoming renewals with SubIntel.
          </Text>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              You received this email because a subscription
              was added to your SubIntel account.
            </Text>

            <Text style={styles.footerBrand}>
              — SubIntel
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#000000",
    margin: "0",
    padding: "40px 20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },

  container: {
    maxWidth: "560px",
    margin: "0 auto",
    backgroundColor: "#111113",
    border: "1px solid #2a2a2d",
    borderRadius: "16px",
    padding: "42px 36px",
    textAlign: "center" as const,
  },

  header: {
    textAlign: "center" as const,
  },

  logo: {
    margin: "0",
    color: "#ffffff",
    fontSize: "30px",
    lineHeight: "38px",
    fontWeight: "700",
    letterSpacing: "-0.8px",
  },

  tagline: {
    margin: "8px 0 0",
    color: "#8f8f96",
    fontSize: "13px",
    lineHeight: "20px",
  },

  iconSection: {
    marginTop: "32px",
    textAlign: "center" as const,
  },

  iconBox: {
    width: "42px",
    height: "42px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
  },

  serviceIcon: {
    width: "24px",
    height: "24px",
    margin: "9px auto 0",
    objectFit: "contain" as const,
  },

  subscriptionName: {
    margin: "16px 0 0",
    color: "#ffffff",
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: "600",
    textAlign: "center" as const,
  },

  successText: {
    margin: "6px 0 0",
    color: "#a1a1aa",
    fontSize: "14px",
    lineHeight: "22px",
    textAlign: "center" as const,
  },

  description: {
    maxWidth: "430px",
    margin: "20px auto 0",
    color: "#8f8f96",
    fontSize: "14px",
    lineHeight: "22px",
    textAlign: "center" as const,
  },

  card: {
    marginTop: "28px",
    padding: "26px 28px",
    backgroundColor: "#19191d",
    border: "1px solid #2b2b30",
    borderRadius: "12px",
    textAlign: "center" as const,
  },

  label: {
    margin: "0 0 6px",
    color: "#77777f",
    fontSize: "11px",
    lineHeight: "16px",
    fontWeight: "700",
    letterSpacing: "1px",
    textAlign: "center" as const,
  },

  value: {
    margin: "0 0 24px",
    color: "#ffffff",
    fontSize: "18px",
    lineHeight: "26px",
    fontWeight: "600",
    textAlign: "center" as const,
  },

  closingText: {
    maxWidth: "440px",
    margin: "28px auto 0",
    color: "#8f8f96",
    fontSize: "13px",
    lineHeight: "21px",
    textAlign: "center" as const,
  },

  footer: {
    marginTop: "32px",
    paddingTop: "24px",
    borderTop: "1px solid #29292d",
    textAlign: "center" as const,
  },

  footerText: {
    margin: "0 auto",
    maxWidth: "420px",
    color: "#66666d",
    fontSize: "11px",
    lineHeight: "18px",
    textAlign: "center" as const,
  },

  footerBrand: {
    margin: "12px 0 0",
    color: "#888890",
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: "500",
    textAlign: "center" as const,
  },
};