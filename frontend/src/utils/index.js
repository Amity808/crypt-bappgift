import { JsonRpcProvider } from "ethers";
import { supportedNetworks } from "@/config/wgami";
import SendGiftMail from "@/email/Welcome";
import { render } from "@react-email/components"

export const shortenAddress = (address, length = 4) => {
    return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const truncateString = (str, num) => {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + "...";
};

let readonlyProvider = null;

export const getReadOnlyProvider = () => {
    if (readonlyProvider) return readonlyProvider;
    readonlyProvider = new JsonRpcProvider(
        supportedNetworks[0].rpcUrls.default.http[0]
    );
    
    return readonlyProvider;
};

export const isSupportedNetwork = (chainId) => {
    return supportedNetworks.some((network) => network.id === chainId);
};


export const sendEmail = async ({link, recipentName, address, email, subjectLine}) => {
    const emailHtml = render(<SendGiftMail userFirstname={recipentName} address={address} link={link} content={subjectLine} />);

    console.log("Generated email HTML:", emailHtml);
    try {
      const response = await fetch('/api/email/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'codestrom808@gmail.com',
          reciever: email,
          subject: subjectLine,
          message: emailHtml,
        }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };