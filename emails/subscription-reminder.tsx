import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface SubscriptionReminderEmailProps {
  name: string;
  price: number;
  currency: string;
  billingCycle: string;
  renewalDate: string;
  reminderType: string;
}

export default function SubscriptionReminderEmail({
  name,
  price,
  currency,
  billingCycle,
  renewalDate,
  reminderType,
}: SubscriptionReminderEmailProps) {
  const reminderMessage =
    reminderType === "three_days_before"
      ? "Your subscription renews in 3 days."
      : reminderType === "renewal_day"
        ? "Your subscription renews today."
        : "You have a subscription reminder scheduled for today.";

  return (
    <Html>
      <Head />

      <Body
        style={{
          backgroundColor: "#000000",
          margin: 0,
          padding: "40px 20px",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#111111",
            borderRadius: "16px",
            padding: "40px",
            border: "1px solid #2a2a2a",
          }}
        >
          {/* Header */}
          <Section>
            <Text
              style={{
                color: "#ffffff",
                fontSize: "32px",
                fontWeight: "700",
                textAlign: "center",
                margin: "0 0 8px",
              }}
            >
              SubIntel
            </Text>

            <Text
              style={{
                color: "#888888",
                fontSize: "14px",
                textAlign: "center",
                margin: 0,
              }}
            >
              Your subscriptions, organized and under
              control.
            </Text>
          </Section>

          {/* Reminder */}
          <Section
            style={{
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "600",
                margin: "0 0 12px",
              }}
            >
              Subscription Reminder
            </Text>

            <Text
              style={{
                color: "#bbbbbb",
                fontSize: "16px",
                lineHeight: "24px",
                margin: 0,
              }}
            >
              {reminderMessage}
            </Text>
          </Section>

          {/* Subscription */}
          <Section
            style={{
              marginTop: "32px",
              backgroundColor: "#191919",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #2a2a2a",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "600",
                margin: "0 0 20px",
              }}
            >
              {name}
            </Text>

            <Text
              style={{
                color: "#777777",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1px",
                margin: "0 0 4px",
              }}
            >
              PRICE
            </Text>

            <Text
              style={{
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: "600",
                margin: "0 0 20px",
              }}
            >
              {currency} {price.toFixed(2)}
            </Text>

            <Text
              style={{
                color: "#777777",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1px",
                margin: "0 0 4px",
              }}
            >
              BILLING CYCLE
            </Text>

            <Text
              style={{
                color: "#ffffff",
                fontSize: "16px",
                margin: "0 0 20px",
              }}
            >
              {billingCycle}
            </Text>

            <Text
              style={{
                color: "#777777",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1px",
                margin: "0 0 4px",
              }}
            >
              RENEWAL DATE
            </Text>

            <Text
              style={{
                color: "#ffffff",
                fontSize: "16px",
                margin: 0,
              }}
            >
              {renewalDate}
            </Text>
          </Section>

          <Hr
            style={{
              borderColor: "#2a2a2a",
              margin: "32px 0",
            }}
          />

          {/* Footer */}
          <Text
            style={{
              color: "#666666",
              fontSize: "13px",
              lineHeight: "20px",
              textAlign: "center",
              margin: 0,
            }}
          >
            This is an automated reminder from
            SubIntel.
          </Text>

          <Text
            style={{
              color: "#555555",
              fontSize: "12px",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            Your subscriptions, organized and under
            control.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}