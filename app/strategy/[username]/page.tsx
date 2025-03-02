import { dataKOL } from "@/data/data-kol";
import KOLComponent from "./_components/KOLComponent";

interface Params {
  params: Promise<{ username: string }>
}

export default async function page({
  params
}: Params) {
  const { username } = await params;

  const curKOL = dataKOL.find(kol => kol.twitter_username === username);

  if (!curKOL) {
    return <div className="pt-28">KOL not found</div>;
  }

  return (
    <KOLComponent curKOL={curKOL} />
  )
}
