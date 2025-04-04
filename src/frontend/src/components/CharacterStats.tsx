import { Zap, Coins, Heart } from "lucide-react";
import { CharacterInfoType } from "../types";

// Character stats
const CharacterStats = ({ character }: { character: CharacterInfoType }) => {
  return (
    <div className="flex justify-between p-8 pb-0">
      {/* Points */}
      <div className="flex gap-4 items-center group cursor-pointer">
        <div className="bg-linear-to-bl from-yellow-600 to-orange-600 transition group-hover:from-yellow-500 group-hover:to-orange-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg p-3 rounded-lg inset-ring-white/20 inset-ring-4">
          <Coins className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className=" font-semibold text-3xl leading-none">
            {character.points.toLocaleString()}
          </div>
          <div className=" text-sm tracking-wider font-semibold text-gray-400 uppercase">
            Points
          </div>
        </div>
      </div>

      {/* Health */}
      <div className="flex gap-4 items-center group cursor-pointer">
        <div className="bg-linear-to-bl from-rose-600 to-pink-600 transition group-hover:from-rose-500 group-hover:to-pink-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg p-3 rounded-lg inset-ring-white/20 inset-ring-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className=" font-semibold text-3xl leading-none">
            {character.health}
          </div>
          <div className=" text-sm tracking-wider font-semibold text-gray-400 uppercase">
            Health
          </div>
        </div>
      </div>

      {/* Energy */}
      <div className="flex gap-4 items-center group cursor-pointer">
        <div className="bg-linear-to-bl from-lime-600 to-emerald-600 transition group-hover:from-lime-500 group-hover:to-emerald-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg p-3 rounded-lg inset-ring-white/20 inset-ring-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className=" font-semibold text-3xl leading-none">
            {character.energy}
          </div>
          <div className=" text-sm tracking-wider font-semibold text-gray-400 uppercase">
            Energy
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterStats;
