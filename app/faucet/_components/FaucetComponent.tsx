import ModalTransactionCustom from "@/components/modal/modal-transaction-custom";
import { useMintAI } from "@/hooks/mutation/api/useMintAI";
import { useMint } from "@/hooks/mutation/useMint";
import { cn } from "@/lib/utils";
import { TokenResponse } from "@/types/api/token.types";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Wallet } from "lucide-react";
import { useCallback, useState } from "react";

export function FaucetComponent({
  token,
}: {
  token?: TokenResponse;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      <Feature
        index={0}
        token={token || {
          name: '',
          symbol: '',
          address: '',
          chain: '',
          decimals: 0,
          logo: '',
          priceChange24H: 0,
          tags: [],
        }}
        buttonColor={"warning"}
      />
    </div>
  );
}

const Feature = ({
  index,
  token,
  buttonColor
}: {
  index: number;
  token: TokenResponse;
  buttonColor: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenAI, setIsModalOpenAI] = useState<boolean>(false);

  const { mutation: mintMutation, txHash } = useMint();
  const { mutation: mintMutationAI, result: txHashAI } = useMintAI();

  const handleMintAI = async () => {
    mintMutationAI.mutate({
      asset_id: token.name.toLowerCase() || '',
      amount: "1000",
    }, {
      onSuccess: () => {
        setIsModalOpenAI(true);
      }
    });
  }

  const handleMint = async () => {
    mintMutation.mutate({
      addressToken: token.address as HexAddress,
      amount: "1000",
      decimals: token.decimals,
    }, {
      onSuccess: () => {
        setIsModalOpen(true);
      }
    });
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const closeModalAI = useCallback(() => {
    setIsModalOpenAI(false);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800 items-center justify-center",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="flex w-full justify-center items-center">
        <Image src={token?.logo || "https://s2.coinmarketcap.com/static/img/coins/64x64/32684.png"} alt={token.name} width={50} height={50} className="mx-auto" />
      </div>

      <Button variant="flat" color={buttonColor as "success" | "secondary" | "warning" | "primary" | "default" | "danger" | undefined} className={cn("mt-4 mx-10", `flex flex-row items-center`)} onPress={handleMint}>
        <Wallet className="w-4 h-4" />
        <span>Claim 1000 ${token.symbol}</span>
      </Button>

      <Button variant="flat" color={buttonColor as "success" | "secondary" | "warning" | "primary" | "default" | "danger" | undefined} className={cn("mt-4 mx-10", `flex flex-row items-center`)} onPress={handleMintAI}>
        <Wallet className="w-4 h-4" />
        <span>Claim 1000 ${token.symbol} to AI</span>
      </Button>

      <ModalTransactionCustom
        isOpen={isModalOpen}
        setIsOpen={closeModal}
        status={mintMutation.status || ""}
        data={txHash || ""}
        errorMessage={mintMutation.error?.message || undefined}
        name='mint'
      />

      <ModalTransactionCustom
        isOpen={isModalOpenAI}
        setIsOpen={closeModalAI}
        status={mintMutationAI.status || ""}
        data={txHashAI?.txhash || ""}
        errorMessage={mintMutationAI.error?.message || undefined}
        name='mint'
      />
    </div>
  );
};
