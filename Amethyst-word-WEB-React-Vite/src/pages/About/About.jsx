// import AboutBanner from "./AboutBanner";
// import AboutShop from "./AboutShop";
// import StatsSection from "./StatsSection";
// import TeamSection from "./TeamSection";

import { Fa500Px } from "react-icons/fa";
import CompanyIntro from "./CompanyIntro";
import CoreValues from "./CoreValues";
import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import TeamSection from "./TeamSection";
import FaqSection from "./FaqSection";


const About = () => {
  return (
     
      <div className="min-h-screen">
      <HeroSection />
      <CompanyIntro />
      <CoreValues />
      <TeamSection />
      <CtaSection />
      <FaqSection />
    </div>

  );
};

export default About;
 // <main className="flex-grow">
      //   <AboutBanner />
      //   <AboutShop />
      //   <StatsSection />
      //   <TeamSection />
      // </main>

// import React from 'react';
// import { motion } from 'framer-motion';

// const About:  = () => {
//   return (
//     <div>
//       <section className="relative table w-full items-center py-36 bg-[url('../../assets/images/hero/pages.jpg')] bg-top bg-no-repeat bg-cover">
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-gray-900" />
//         <div className="container relative">
//           <div className="grid grid-cols-1 pb-8 text-center mt-10">
//             <h3 className="mb-3 text-5xl font-bold text-white">About Us</h3>
//             <p className="text-gray-300 text-lg max-w-xl mx-auto">Crafting luxurious designs with passion and precision.</p>
//           </div>
//         </div>
//       </section>
      
//       <section className="relative md:py-24 py-16">
//         <div className="container relative">
//           <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }} 
//               animate={{ opacity: 1, x: 0 }} 
//               transition={{ duration: 0.8 }}
//               className="lg:col-span-7 md:col-span-6"
//             >
//               <div className="lg:me-8">
//                 <h6 className="text-gray-500 font-semibold uppercase text-lg">Our Vision</h6>
//                 <h5 className="font-semibold text-4xl leading-normal my-4 text-gray-800">Quality Materials & Timeless Designs</h5>
//                 <p className="text-gray-600 max-w-xl">We believe in combining superior craftsmanship with elegant aesthetics to create timeless pieces that stand the test of time.</p>
//                 <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">Learn More</button>
//               </div>
//             </motion.div>
//             <motion.div 
//               initial={{ opacity: 0, x: 50 }} 
//               animate={{ opacity: 1, x: 0 }} 
//               transition={{ duration: 0.8 }}
//               className="lg:col-span-5 md:col-span-6"
//             >
//               <img src="assets/images/ab1.jpg" className="rounded-xl shadow-lg" alt="Our Shop" />
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;

// import React from 'react'

// const About: =()=> {
//   return (
    

//     <div>
//     <section className="relative table w-full items-center py-36 bg-[url('../../assets/images/hero/pages.jpg')] bg-top bg-no-repeat bg-cover">
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
//         <div className="container relative">
//         <div className="grid grid-cols-1 pb-8 text-center mt-10">
//             <h3 className="mb-3 text-4xl leading-normal tracking-wider font-semibold text-white">About Us</h3>
//             <p className="text-slate-400 text-lg max-w-xl mx-auto">Believe in Craftsmanship and Luxurious Design.</p>
//         </div>{/*end grid*/}
//         </div>{/*end container*/}
//         <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
//         <ul className="tracking-[0.5px] mb-0 inline-block">
//             <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><a href="index.html">Cartzio</a></li>
//             <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right" /></li>
//             <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">About</li>
//         </ul>
//         </div>
//     </section>{/*end section*/}
//     {/* End Hero */}
//     {/* Start */}
//     <section className="relative md:py-24 py-16">
//         <div className="container relative">
//         <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
//             <div className="lg:col-span-5 md:col-span-6">
//             <img src="assets/images/ab1.jpg" className="rounded-t-full shadow-md dark:shadow-gray-800" alt />
//             </div>
//             <div className="lg:col-span-7 md:col-span-6">
//             <div className="lg:ms-8">
//                 <h6 className="text-orange-500 font-semibold uppercase text-lg">Our Shop</h6>
//                 <h5 className="font-semibold text-3xl leading-normal my-4">Focusing on Quality <br /> Material, Good Design</h5>
//                 <p className="text-slate-400 max-w-xl">Donec non interdum nisl. Sed ut est ac lacus sodales convallis. Nam non velit justo. Mauris vel ultrices tortor. Proin bibendum magna porttitor porttitor suscipit. Praesent sit amet consequat eros. Quisque ullamcorper ornare vulputate. Nam sodales sem id diam sollicitudin, id lobortis tellus tincidunt.</p>
//                 <div className="flex items-center mt-6">
//                 <i data-feather="phone" className="w-6 h-6 me-4" />
//                 <div className>
//                     <h5 className="title font-bold mb-0">Phone</h5>
//                     <a href="tel:+152534-468-854" className="tracking-wide text-orange-500">+152 534-468-854</a>
//                 </div>
//                 </div>
//                 <div className="flex items-center mt-6">
//                 <i data-feather="map-pin" className="w-6 h-6 me-4" />
//                 <div className>
//                     <h5 className="title font-bold mb-0">Location</h5>
//                     <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" data-type="iframe" className="tracking-wide text-center text-orange-500 lightbox">View on Google map</a>
//                 </div>
//                 </div>
//             </div>
//             </div>
//         </div>{/*end grid*/}
//         </div>{/*end container*/}
//         <div className="container relative md:mt-24 mt-16">
//         <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
//             <div className="lg:col-span-5 md:col-span-6 md:order-2 order-1">
//             <img src="assets/images/ab2.jpg" className="rounded-b-full shadow-md dark:shadow-gray-800" alt />
//             </div>
//             <div className="lg:col-span-7 md:col-span-6 md:order-1 order-2">
//             <h6 className="text-orange-500 font-semibold uppercase text-lg">Founder</h6>
//             <h5 className="font-semibold text-3xl leading-normal my-4">Maria J. Rose</h5>
//             <p className="text-slate-400 max-w-xl">Donec non interdum nisl. Sed ut est ac lacus sodales convallis. Nam non velit justo. Mauris vel ultrices tortor. Proin bibendum magna porttitor porttitor suscipit. Praesent sit amet consequat eros. Quisque ullamcorper ornare vulputate. Nam sodales sem id diam sollicitudin, id lobortis tellus tincidunt.</p>
//             <ul className="list-none mt-6 space-x-2">
//                 <li className="inline"><a href="https://dribbble.com/shreethemes" target="_blank" className="inline-flex hover:text-orange-500 dark:hover:text-orange-500"><i data-feather="dribbble" className="size-5 align-middle" title="dribbble" /></a></li>
//                 <li className="inline"><a href="http://linkedin.com/company/shreethemes" target="_blank" className="inline-flex hover:text-orange-500 dark:hover:text-orange-500"><i data-feather="linkedin" className="size-5 align-middle" title="Linkedin" /></a></li>
//                 <li className="inline"><a href="https://www.facebook.com/shreethemes" target="_blank" className="inline-flex hover:text-orange-500 dark:hover:text-orange-500"><i data-feather="facebook" className="size-5 align-middle" title="facebook" /></a></li>
//                 <li className="inline"><a href="https://www.instagram.com/shreethemes/" target="_blank" className="inline-flex hover:text-orange-500 dark:hover:text-orange-500"><i data-feather="instagram" className="size-5 align-middle" title="instagram" /></a></li>
//                 <li className="inline"><a href="https://twitter.com/shreethemes" target="_blank" className="inline-flex hover:text-orange-500 dark:hover:text-orange-500"><i data-feather="twitter" className="size-5 align-middle" title="twitter" /></a></li>
//             </ul>{/*end icon*/}
//             </div>
//         </div>{/*end grid*/}
//         </div>{/*end container*/}
//         <div className="container relative md:mt-24 mt-16">
//         <div className="grid grid-cols-1 justify-center text-center mb-4">
//             <h6 className="text-orange-500 font-semibold uppercase text-lg">Our Promise</h6>
//             <h5 className="font-semibold text-3xl leading-normal my-4">We Designed and <br /> Developed Products</h5>
//         </div>{/*end grid*/}
//         <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6">
//             {/* Content */}
//             <div className="p-6 shadow-sm hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-md bg-white dark:bg-slate-900">
//             <i className="mdi mdi-truck-check-outline text-4xl text-orange-500" />
//             <div className="content mt-6">
//                 <a href className="title h5 text-xl font-medium hover:text-orange-500">Free Shipping</a>
//                 <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>
//                 <div className="mt-4">
//                 <a href className="text-orange-500">Read More <i className="mdi mdi-arrow-right" /></a>
//                 </div>
//             </div>
//             </div>
//             {/* Content */}
//             {/* Content */}
//             <div className="p-6 shadow-sm hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-md bg-white dark:bg-slate-900">
//             <i className="mdi mdi-account-wrench-outline text-4xl text-orange-500" />
//             <div className="content mt-6">
//                 <a href className="title h5 text-xl font-medium hover:text-orange-500">24/7 Support</a>
//                 <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>
//                 <div className="mt-4">
//                 <a href className="text-orange-500">Read More <i className="mdi mdi-arrow-right" /></a>
//                 </div>
//             </div>
//             </div>
//             {/* Content */}
//             {/* Content */}
//             <div className="p-6 shadow-sm hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-md bg-white dark:bg-slate-900">
//             <i className="mdi mdi-cash-multiple text-4xl text-orange-500" />
//             <div className="content mt-6">
//                 <a href className="title h5 text-xl font-medium hover:text-orange-500">Payment Process</a>
//                 <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>
//                 <div className="mt-4">
//                 <a href className="text-orange-500">Read More <i className="mdi mdi-arrow-right" /></a>
//                 </div>
//             </div>
//             </div>
//             {/* Content */}
//         </div>
//         </div>{/*end container*/}
//         <div className="container relative md:mt-24 mt-16">
//         <div className="grid grid-cols-1 justify-center text-center mb-4">
//             <h6 className="text-orange-500 font-semibold uppercase text-lg">Our Minds</h6>
//             <h5 className="font-semibold text-3xl leading-normal my-4">Meet Our Team Members</h5>
//         </div>{/*end grid*/}
//         <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-6">
//             <div className="lg:col-span-3 md:col-span-6">
//             <div className="group text-center">
//                 <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
//                 <img src="assets/images/client/04.jpg" className alt />
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 duration-500" />
//                 <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500">
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="facebook" className="h-4 w-4" /></a></li>
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="instagram" className="h-4 w-4" /></a></li>
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="linkedin" className="h-4 w-4" /></a></li>
//                 </ul>{/*end icon*/}
//                 </div>
//                 <div className="content mt-3">
//                 <a href className="text-lg font-semibold hover:text-orange-500 duration-500">Jack John</a>
//                 <p className="text-slate-400">Designer</p>
//                 </div>
//             </div>
//             </div>
//             <div className="lg:col-span-3 md:col-span-6">
//             <div className="group text-center">
//                 <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
//                 <img src="assets/images/client/16.jpg" className alt />
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 duration-500" />
//                 <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500">
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="facebook" className="h-4 w-4" /></a></li>
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="instagram" className="h-4 w-4" /></a></li>
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="linkedin" className="h-4 w-4" /></a></li>
//                 </ul>{/*end icon*/}
//                 </div>
//                 <div className="content mt-3">
//                 <a href className="text-lg font-semibold hover:text-orange-500 duration-500">Krista John</a>
//                 <p className="text-slate-400">Designer</p>
//                 </div>
//             </div>
//             </div>
//             <div className="lg:col-span-3 md:col-span-6">
//             <div className="group text-center">
//                 <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
//                 <img src="assets/images/client/06.jpg" className alt />
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 duration-500" />
//                 <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500">
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="facebook" className="h-4 w-4" /></a></li>
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="instagram" className="h-4 w-4" /></a></li>
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="linkedin" className="h-4 w-4" /></a></li>
//                 </ul>{/*end icon*/}
//                 </div>
//                 <div className="content mt-3">
//                 <a href className="text-lg font-semibold hover:text-orange-500 duration-500">Roger Jackson</a>
//                 <p className="text-slate-400">Designer</p>
//                 </div>
//             </div>
//             </div>
//             <div className="lg:col-span-3 md:col-span-6">
//             <div className="group text-center">
//                 <div className="relative inline-block mx-auto h-52 w-52 rounded-full overflow-hidden">
//                 <img src="assets/images/client/07.jpg" className alt />
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 duration-500" />
//                 <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500">
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="facebook" className="h-4 w-4" /></a></li>
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="instagram" className="h-4 w-4" /></a></li>
//                     <li className="inline"><a href className="size-8 inline-flex items-center justify-center align-middle rounded-full bg-orange-500 text-white"><i data-feather="linkedin" className="h-4 w-4" /></a></li>
//                 </ul>{/*end icon*/}
//                 </div>
//                 <div className="content mt-3">
//                 <a href className="text-lg font-semibold hover:text-orange-500 duration-500">Johnny English</a>
//                 <p className="text-slate-400">Designer</p>
//                 </div>
//             </div>
//             </div>
//         </div>
//         </div>
//     </section>
// </div>

//   )
// }

// export default About

    // <div className="container mx-auto px-4 py-12">
    //       {/* Giới thiệu */}
    //    <section className="py-12">
    //       <div className="max-w-3xl mx-auto text-center mb-16">
    //           <h1 className="text-4xl font-bold mb-6">Về Chúng Tôi</h1>
    //           <p className="text-xl text-muted-foreground">z
    //             Chúng tôi là thương hiệu thời trang và trang sức đẳng cấp, 
    //             mang đến những sản phẩm tinh tế và độc đáo.               </p>
    //         </div>
  
    //         <div className="grid md:grid-cols-2 gap-12 items-center">              <div>
    //              <img 
    //               src="https://images.unsplash.com/photo-1605798410801-31a9341727d2?q=80&w=2070&auto=format&fit=crop" 
    //               alt="Về chúng tôi" 
    //               className="rounded-lg w-full h-auto"
    //             />
    //           </div>
    //           <div className="space-y-6">
    //             <h2 className="text-3xl font-bold">Câu chuyện của chúng tôi</h2>
    //             <p className="text-lg">
    //               Thành lập từ năm 2010, chúng tôi bắt đầu với niềm đam mê về thời trang và trang sức. 
    //               Từ một cửa hàng nhỏ, chúng tôi đã phát triển thành thương hiệu được yêu thích và tin tưởng.
    //             </p>
    //             <p className="text-lg">
    //               Chúng tôi tin rằng mỗi món đồ thời trang và trang sức đều là một tác phẩm nghệ thuật, 
    //               giúp khách hàng thể hiện cá tính và phong cách riêng.
    //             </p>
    //           </div>
    //         </div>
    //       </section>
  
    //       {/* Giá trị cốt lõi */}
    //       <section className="py-12 bg-muted/30 rounded-lg my-12">
    //         <div className="max-w-5xl mx-auto">
    //           <h2 className="text-3xl font-bold text-center mb-12">Giá trị cốt lõi</h2>
    //           <div className="grid md:grid-cols-3 gap-8">
    //             {[
    //               {
    //                 title: "Chất lượng",
    //                 description: "Chúng tôi cam kết mang đến những sản phẩm chất lượng cao, được tuyển chọn kỹ lưỡng."
    //               },
    //               {
    //                 title: "Sáng tạo",
    //                 description: "Không ngừng đổi mới và sáng tạo trong thiết kế để mang đến những sản phẩm độc đáo."
    //               },
    //               {
    //                 title: "Thân thiện",
    //                 description: "Xây dựng mối quan hệ chân thành và lâu dài với khách hàng là ưu tiên hàng đầu."
    //               }
    //             ].map((value, index) => (
    //               <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
    //                 <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
    //                 <p>{value.description}</p>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </section>
  
    //       {/* Đội ngũ */}
    //       <section className="py-12">
    //         <h2 className="text-3xl font-bold text-center mb-12">Đội ngũ của chúng tôi</h2>
    //         <div className="grid md:grid-cols-3 gap-8">
    //           {[
    //             {
    //               name: "Nguyễn Văn A",
    //               position: "Nhà sáng lập & CEO",
    //               image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    //             },
    //             {
    //               name: "Trần Thị B",
    //               position: "Giám đốc thiết kế",
    //               image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
    //             },
    //             {
    //               name: "Lê Văn C",
    //               position: "Giám đốc marketing",
    //               image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
    //             }
    //           ].map((member, index) => (
    //             <div key={index} className="text-center">
    //               <div className="mb-4 overflow-hidden rounded-lg">
    //                 <img 
    //                   src={member.image} 
    //                   alt={member.name} 
    //                   className="w-full h-80 object-cover"
    //                 />
    //               </div>
    //               <h3 className="text-xl font-semibold">{member.name}</h3>
    //               <p className="text-muted-foreground">{member.position}</p>
    //             </div>
    //           ))}
    //         </div>
    //       </section>
  
    //       {/* Liên hệ */}
    //       <section className="py-12 bg-muted/30 rounded-lg my-12">
    //         <div className="text-center max-w-2xl mx-auto">
    //           <h2 className="text-3xl font-bold mb-6">Liên hệ với chúng tôi</h2>
    //           <p className="mb-8">
    //             Bạn có câu hỏi hoặc muốn hợp tác? Đừng ngần ngại liên hệ với chúng tôi.
    //           </p>
    //           <div className="grid md:grid-cols-3 gap-4">
    //             <div className="p-4">
    //               <h3 className="font-semibold mb-2">Địa chỉ</h3>
    //               <p>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
    //             </div>
    //             <div className="p-4">
    //               <h3 className="font-semibold mb-2">Email</h3>
    //               <p>info@thoitrang.vn</p>
    //             </div>
    //             <div className="p-4">
    //               <h3 className="font-semibold mb-2">Điện thoại</h3>
    //               <p>+84 123 456 789</p>
    //             </div>
    //           </div>
    //         </div>
    //       </section>
    //     </div>

// const About = () => {
//     return (
//       <MainLayout>
//         <div className="container mx-auto px-4 py-12">
//           {/* Giới thiệu */}
//           <section className="py-12">
//             <div className="max-w-3xl mx-auto text-center mb-16">
//               <h1 className="text-4xl font-bold mb-6">Về Chúng Tôi</h1>
//               <p className="text-xl text-muted-foreground">
//                 Chúng tôi là thương hiệu thời trang và trang sức đẳng cấp, 
//                 mang đến những sản phẩm tinh tế và độc đáo.
//               </p>
//             </div>
  
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div>
//                 <img 
//                   src="https://images.unsplash.com/photo-1605798410801-31a9341727d2?q=80&w=2070&auto=format&fit=crop" 
//                   alt="Về chúng tôi" 
//                   className="rounded-lg w-full h-auto"
//                 />
//               </div>
//               <div className="space-y-6">
//                 <h2 className="text-3xl font-bold">Câu chuyện của chúng tôi</h2>
//                 <p className="text-lg">
//                   Thành lập từ năm 2010, chúng tôi bắt đầu với niềm đam mê về thời trang và trang sức. 
//                   Từ một cửa hàng nhỏ, chúng tôi đã phát triển thành thương hiệu được yêu thích và tin tưởng.
//                 </p>
//                 <p className="text-lg">
//                   Chúng tôi tin rằng mỗi món đồ thời trang và trang sức đều là một tác phẩm nghệ thuật, 
//                   giúp khách hàng thể hiện cá tính và phong cách riêng.
//                 </p>
//               </div>
//             </div>
//           </section>
  
//           {/* Giá trị cốt lõi */}
//           <section className="py-12 bg-muted/30 rounded-lg my-12">
//             <div className="max-w-5xl mx-auto">
//               <h2 className="text-3xl font-bold text-center mb-12">Giá trị cốt lõi</h2>
//               <div className="grid md:grid-cols-3 gap-8">
//                 {[
//                   {
//                     title: "Chất lượng",
//                     description: "Chúng tôi cam kết mang đến những sản phẩm chất lượng cao, được tuyển chọn kỹ lưỡng."
//                   },
//                   {
//                     title: "Sáng tạo",
//                     description: "Không ngừng đổi mới và sáng tạo trong thiết kế để mang đến những sản phẩm độc đáo."
//                   },
//                   {
//                     title: "Thân thiện",
//                     description: "Xây dựng mối quan hệ chân thành và lâu dài với khách hàng là ưu tiên hàng đầu."
//                   }
//                 ].map((value, index) => (
//                   <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
//                     <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
//                     <p>{value.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
  
//           {/* Đội ngũ */}
//           <section className="py-12">
//             <h2 className="text-3xl font-bold text-center mb-12">Đội ngũ của chúng tôi</h2>
//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 {
//                   name: "Nguyễn Văn A",
//                   position: "Nhà sáng lập & CEO",
//                   image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
//                 },
//                 {
//                   name: "Trần Thị B",
//                   position: "Giám đốc thiết kế",
//                   image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
//                 },
//                 {
//                   name: "Lê Văn C",
//                   position: "Giám đốc marketing",
//                   image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
//                 }
//               ].map((member, index) => (
//                 <div key={index} className="text-center">
//                   <div className="mb-4 overflow-hidden rounded-lg">
//                     <img 
//                       src={member.image} 
//                       alt={member.name} 
//                       className="w-full h-80 object-cover"
//                     />
//                   </div>
//                   <h3 className="text-xl font-semibold">{member.name}</h3>
//                   <p className="text-muted-foreground">{member.position}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
  
//           {/* Liên hệ */}
//           <section className="py-12 bg-muted/30 rounded-lg my-12">
//             <div className="text-center max-w-2xl mx-auto">
//               <h2 className="text-3xl font-bold mb-6">Liên hệ với chúng tôi</h2>
//               <p className="mb-8">
//                 Bạn có câu hỏi hoặc muốn hợp tác? Đừng ngần ngại liên hệ với chúng tôi.
//               </p>
//               <div className="grid md:grid-cols-3 gap-4">
//                 <div className="p-4">
//                   <h3 className="font-semibold mb-2">Địa chỉ</h3>
//                   <p>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold mb-2">Email</h3>
//                   <p>info@thoitrang.vn</p>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold mb-2">Điện thoại</h3>
//                   <p>+84 123 456 789</p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </MainLayout>
//     );
//   };
  
//   export default About;
  