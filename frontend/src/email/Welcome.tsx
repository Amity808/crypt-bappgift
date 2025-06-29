import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface KoalaWelcomeEmailProps {
    userFirstname: string;
    address: string;
    content: string;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    link: any;
  }
  
  // const baseUrl = process.env.VERCEL_URL
  //   ? `https://${process.env.VERCEL_URL}`
  //   : "";
  
  export const SendGiftMail = ({
    userFirstname, address, content , link
  }: KoalaWelcomeEmailProps) => (
    <Html>
      <Head />
      <Preview>
        Crypto Gifting to family and friend made easy
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`/CryptGift.png`}
            width="170"
            height="50"
            alt="cryptgift"
            style={logo}
          />
          <Text style={paragraph}>Hi {userFirstname},</Text>
          <Text style={paragraph}>
            Welcome to CryptoGift, you have been gifted by {address}
          </Text>
          <Text style={paragraph}>
              {content}
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={link}>
              Claim Token
            </Button>
          </Section>
          <Text style={paragraph}>
            Best regards,
            <br />
            The CryptGift team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Blockchain Innovation Hub, Ibadan, Nigeira
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  SendGiftMail.PreviewProps = {
    userFirstname: "Alan",
  } as KoalaWelcomeEmailProps;
  
  export default SendGiftMail;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };