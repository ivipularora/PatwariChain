import type { ChangeEvent, MouseEvent } from "react";
import { useCrowdfundingProjectFunctionWriter } from "../hooks";
import {
    usePublishedProjs,
  } from "../read";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import {toWei } from "../utils"; 

function SingleCampaignPage() {
    const publishedProjsAddress = usePublishedProjs(1);
    const addRecentTransaction = useAddRecentTransaction();
  
    const { writeAsync, isError } = useCrowdfundingProjectFunctionWriter({
      contractAddress: publishedProjsAddress || "",
      functionName: "makeDonation",
    });

    const handleDonate = async (e: MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault();
        const valueToWei = toWei("0.01");
        const tx = await writeAsync({
          overrides: {
            value: valueToWei,
          },
        });
  
        addRecentTransaction({
          hash: tx.hash,
          description: `Donate  MATIC`,
        });
      } catch (error) {
        console.log("errror >>> ", error);
      }
    };

  return (
    <>
    <button  onClick={handleDonate} >Donate</button>
          </>
  )
}

export default SingleCampaignPage