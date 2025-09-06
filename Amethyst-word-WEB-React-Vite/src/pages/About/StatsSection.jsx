// import { FiUsers, FiShoppingBag, FiAward, FiThumbsUp } from 'react-icons/fi';

// const StatsSection = () => {
//   const stats = [
//     {
//       id: 1,
//       icon: <FiUsers size={40} className="text-orange-500" />,
//       value: '10K+',
//       label: 'Happy Customers',
//     },
//     {
//       id: 2,
//       icon: <FiShoppingBag size={40} className="text-orange-500" />,
//       value: '5K+',
//       label: 'Premium Products',
//     },
//     {
//       id: 3,
//       icon: <FiAward size={40} className="text-orange-500" />,
//       value: '15+',
//       label: 'Awards Won',
//     },
//     {
//       id: 4,
//       icon: <FiThumbsUp size={40} className="text-orange-500" />,
//       value: '98%',
//       label: 'Customer Satisfaction',
//     },
//   ];

//   return (
//     <section className="py-16 bg-purple-500 text-white">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {stats.map((stat) => (
//             <div key={stat.id} className="text-center bg-pink-600/30 p-8 rounded-lg backdrop-blur-sm">
//               <div className="flex justify-center mb-4">{stat.icon}</div>
//               <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
//               <p className="text-white/80">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatsSection;