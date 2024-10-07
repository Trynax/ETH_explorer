import TransactionDetails from "./TransactionDetails";
import WalletDetails from "./WalletDetails";
import { useParams } from "react-router-dom";
import { getInputType } from "../../utils/getChainData";

export default function WalletAndReceipt() {
  const { input } = useParams(); // Get the input from the URL
  const result = getInputType(input); // Determine the input type (transaction hash, wallet, or block)

  return (
    <>
      {result.type === "Transaction hash" && <TransactionDetails txnhash={input} />}
      {result.type === "Wallet address" && <WalletDetails walletAddress={input} />}
    </>
  );
}
