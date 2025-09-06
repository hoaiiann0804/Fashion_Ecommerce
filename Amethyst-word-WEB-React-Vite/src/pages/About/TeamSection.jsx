// import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
// import img1 from '../../assets/image/istockphoto-1198428511-612x612 (1).jpg'
// const TeamSection = () => {
//   const teamMembers = [
//     {
//       id: 1,
//       name: 'Sarah Johnson',
//       position: 'Creative Director',
//       image: img1,
//       socials: {
//         facebook: '#',
//         twitter: '#',
//         instagram: '#',
//         linkedin: '#',
//       },
//     },
//     {
//       id: 2,
//       name: 'Michael Brown',
//       position: 'Marketing Manager',
//       image: img1,
//       socials: {
//         facebook: '#',
//         twitter: '#',
//         instagram: '#',
//         linkedin: '#',
//       },
//     },
//     {
//       id: 3,
//       name: 'Emma Davis',
//       position: 'Product Designer',
//       image: img1,
//       socials: {
//         facebook: '#',
//         twitter: '#',
//         instagram: '#',
//         linkedin: '#',
//       },
//     },
//   ];

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-orange-500 font-semibold mb-2">OUR TEAM</h2>
//           <h3 className="text-3xl sm:text-4xl font-bold mb-4">
//             Meet Our Expert Team
//           </h3>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Our talented team is dedicated to bringing you the best fashion experience. 
//             With years of industry expertise, they curate collections that blend quality, 
//             comfort, and style.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {teamMembers.map((member) => (
//             <div key={member.id}>
//               <div className="flex justify-center">
//   <img
//     src={member.image}
//     alt={member.name}
//     className="w-80 h-80 rounded-full object-cover border-4 border-white shadow-md"
//   />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                   <div className="flex justify-center space-x-3">
//                     <a
//                       href={member.socials.facebook}
//                       className="bg-white text-gray-800 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
//                     >
//                       <FiFacebook size={18} />
//                     </a>
//                     <a
//                       href={member.socials.twitter}
//                       className="bg-white text-gray-800 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
//                     >
//                       <FiTwitter size={18} />
//                     </a>
//                     <a
//                       href={member.socials.instagram}
//                       className="bg-white text-gray-800 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
//                     >
//                       <FiInstagram size={18} />
//                     </a>
//                     <a
//                       href={member.socials.linkedin}
//                       className="bg-white text-gray-800 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
//                     >
//                       <FiLinkedin size={18} />
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6 text-center">
//                 <h4 className="text-xl font-bold mb-1">{member.name}</h4>
//                 <p className="text-orange-500">{member.position}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TeamSection;
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// Dữ liệu mẫu cho phần Team
const teamMembers = [
  {
    name: "Emma Thompson",
    title: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Michael Chen",
    title: "Lead Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Sophia Rodriguez",
    title: "Marketing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
  },
  {
    name: "David Kim",
    title: "Chief Product Officer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  }
];

const TeamSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-fashion-purple-800">
          Meet Our Team
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Passionate individuals who bring our vision to life
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="group">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fashion-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                <div className="flex space-x-3">
                  <a href="#" className="bg-white rounded-full p-2 hover:bg-fashion-purple-100 transition-colors">
                    <Facebook className="h-4 w-4 text-fashion-purple-800" />
                  </a>
                  <a href="#" className="bg-white rounded-full p-2 hover:bg-fashion-purple-100 transition-colors">
                    <Twitter className="h-4 w-4 text-fashion-purple-800" />
                  </a>
                  <a href="#" className="bg-white rounded-full p-2 hover:bg-fashion-purple-100 transition-colors">
                    <Instagram className="h-4 w-4 text-fashion-purple-800" />
                  </a>
                  <a href="#" className="bg-white rounded-full p-2 hover:bg-fashion-purple-100 transition-colors">
                    <Linkedin className="h-4 w-4 text-fashion-purple-800" />
                  </a>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-lg text-fashion-purple-800">{member.name}</h3>
            <p className="text-fashion-purple-600">{member.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;