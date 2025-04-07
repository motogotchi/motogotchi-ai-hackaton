// import { Coins, ShoppingCart, ArrowLeft } from "lucide-react"; // Import necessary icons

// // Hooks (Assuming these are needed for UserInfo and Chat in the sidebar)
// import { useAuth } from "../hooks/useAuth";
// import { useUserInfo } from "../hooks/useUserInfo";
// import { useChat } from "../hooks/useChat";
// import { useActors } from "../hooks/useActors"; // Might be needed if UserInfo/Chat depend on it

// // Types and Components
// import GameContainer from "../components/GameContainer";
// import UserInfo from "../components/UserInfo";
// import Chat from "../components/Chat";
// import Loading from "src/components/Loading"; // For loading states

// // Define a type for Marketplace Items
// type MarketplaceItemType = {
//   id: string;
//   name: string;
//   description: string;
//   image: string; // URL or path to the item image
//   price: number;
// };

// // Placeholder data for items
// const sampleItems: MarketplaceItemType[] = [
//   {
//     id: "item1",
//     name: "Energy Potion",
//     description: "Restores 10 energy points.",
//     image: "/items/potion-energy.webp", // Example path - ensure you have images
//     price: 50,
//   },
//   {
//     id: "item2",
//     name: "Health Elixir",
//     description: "Boosts health by 20 points.",
//     image: "/items/potion-health.webp",
//     price: 75,
//   },
//   {
//     id: "item3",
//     name: "Shiny Toy",
//     description: "A fun toy for your Motogotchi.",
//     image: "/items/toy-ball.webp",
//     price: 100,
//   },
//   {
//     id: "item4",
//     name: "Cozy Bed",
//     description: "Improves rest quality.",
//     image: "/items/bed.webp",
//     price: 250,
//   },
//   {
//     id: "item5",
//     name: "Gourmet Snack",
//     description: "A delicious treat!",
//     image: "/items/snack-gourmet.webp",
//     price: 30,
//   },
//   {
//     id: "item6",
//     name: "Training Manual",
//     description: "Learn new tricks.",
//     image: "/items/book.webp",
//     price: 150,
//   },
// ];

// // Marketplace component props (similar to Game)
// interface MarketplacePageProps {
//   logout: () => Promise<void>;
//   // Add a function to navigate back to the game view if needed
//   navigateToGame: () => void;
// }

// // Marketplace Page Component
// const Marketplace: React.FC<MarketplacePageProps> = ({
//   logout,
//   navigateToGame,
// }) => {
//   // --- Hooks ---
//   const { principal } = useAuth();
//   const {
//     userInfo,
//     isLoading: isLoadingUserInfo,
//     error: userInfoError,
//   } = useUserInfo(); // To display user info/points
//   const {
//     messages,
//     sendMessage,
//     setUserInfoWithLLM,
//     isLoading: isLoadingChat,
//     error: chatError,
//   } = useChat(); // For the chat sidebar
//   const { isLoading: isLoadingActors } = useActors();

//   // --- Local UI State ---
//   // Add state for potential filtering or selected items later if needed
//   // const [filter, setFilter] = useState<string | null>(null);

//   // --- Action Handler ---
//   const handleBuyClick = (item: MarketplaceItemType) => {
//     // Placeholder for buy logic
//     // This would eventually interact with a backend function
//     console.log(`Attempting to buy ${item.name} for ${item.price} points`);
//     alert(`Buying ${item.name} (Not Implemented)`);
//     // You might want to check if userInfo.points >= item.price
//   };

//   // --- Loading and Error States ---
//   if (isLoadingActors) {
//     return (
//       <GameContainer>
//         <Loading message="Loading backend..." />
//       </GameContainer>
//     );
//   }

//   // --- Render ---
//   const userId = principal ? principal.toText() : "Unknown Principal";

//   return (
//     <GameContainer>
//       {/* Display Errors (Optional, reuse from Game.tsx if desired) */}
//       {userInfoError && (
//         <div className="absolute top-2 left-2 bg-red-600 p-2 rounded text-white z-10">
//           User Info Error: {userInfoError}
//         </div>
//       )}
//       {chatError && (
//         <div className="absolute top-12 left-2 bg-red-600 p-2 rounded text-white z-10">
//           Chat Error: {chatError}
//         </div>
//       )}

//       {/* Main Content Area (Marketplace Items) */}
//       <div className="flex-1 flex flex-col p-6 pr-2 overflow-hidden">
//         {/* Marketplace Header */}
//         <div className="flex items-center justify-between mb-6 px-2">
//           <button
//             onClick={navigateToGame}
//             title="Back to Game"
//             className="flex items-center gap-2 text-lg font-medium text-indigo-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10 active:bg-white/20"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back
//           </button>
//           <h1 className="text-3xl font-bold font-clash text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 flex items-center gap-3">
//             <ShoppingCart className="w-8 h-8" />
//             Marketplace
//           </h1>
//           {/* Optional: Placeholder for Points Display or Filters */}
//           <div></div>
//         </div>

//         {/* Items Grid */}
//         <div className="flex-1 overflow-y-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {sampleItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex flex-col bg-gray-800/50 border border-white/10 rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-emerald-500/20 hover:scale-[1.02] hover:border-emerald-500/30"
//               >
//                 {/* Item Image */}
//                 <div className="aspect-video bg-gray-700/50 flex items-center justify-center overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-contain p-2" // Use contain to see the whole item
//                     onError={(e) => (e.currentTarget.src = "/placeholder.png")} // Basic image error handling
//                   />
//                 </div>

//                 {/* Item Details */}
//                 <div className="p-4 flex flex-col flex-grow">
//                   <h3 className="text-lg font-semibold font-clash text-white mb-1 truncate">
//                     {item.name}
//                   </h3>
//                   <p className="text-sm text-gray-300 mb-3 flex-grow">
//                     {item.description}
//                   </p>

//                   {/* Price and Buy Button */}
//                   <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
//                     <div className="flex items-center gap-1 text-yellow-400 font-semibold">
//                       <Coins className="w-4 h-4" />
//                       <span>{item.price}</span>
//                     </div>
//                     <button
//                       onClick={() => handleBuyClick(item)}
//                       className="px-3 py-1.5 text-sm font-medium rounded-md bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow active:translate-y-px transition-all"
//                     >
//                       Buy
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Sidebar Area (Reused from Game.tsx) */}
//       <div className="w-96 flex flex-col gap-4">
//         <UserInfo
//           userInfo={userInfo} // Display user details
//           userId={userId}
//           logout={logout}
//           isLoading={isLoadingUserInfo}
//         />
//         {/* Optionally keep chat, or remove if not needed in marketplace */}
//         <Chat
//           messages={messages}
//           sendMessage={sendMessage}
//           setUserInfoWithLLM={setUserInfoWithLLM} // Maybe disable this command here?
//           isLoading={isLoadingChat}
//         />
//       </div>
//     </GameContainer>
//   );
// };

// export default Marketplace;
