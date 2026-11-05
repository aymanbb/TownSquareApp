import React from "react";
import { followRealm } from "@/features/realms/api/realms-api";

type ButtonProps = {
    userId: string | undefined;
    realmId: string;
    followStatus: boolean;
};

export const RealmsCardButton: React.FC<ButtonProps> = ({ followStatus, realmId, userId, }) => { 
    function handleVisitRealm() { 
        if (!userId || !followStatus) return; 
        window.location.href = `/realms/${realmId}`; }

    function handleJoinRealm() { 
        void (async () => { 
            if (!userId) return;

            const result = await followRealm(userId, realmId);

            if (!result.success) {
                console.error(result.error.message);
                return;
            }

            console.log("Joined!");
            window.location.href = `/realms/${realmId}`;
        })();
    }

    return followStatus ? (
        <button 
            type="button" 
            onClick={handleVisitRealm} 
            className=" ml-4 whitespace-nowrap rounded-lg border border-amber-300 bg-black/70 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-black hover:border-amber-200 " 
        > 
            Visit realm 
        </button> 
        ): ( 
        <button 
            type="button" 
            onClick={handleJoinRealm} 
            className=" ml-4 whitespace-nowrap rounded-lg border border-amber-300 bg-black/70 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-black hover:border-amber-200 " 
        > 
            Join realm
        </button>
    ); 
};