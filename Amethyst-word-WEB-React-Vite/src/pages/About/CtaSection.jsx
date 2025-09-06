import React from 'react';
import  Button  from '../../components/ui/Button/Button';

const CtaSection = () => {
  return (
    <section className="py-20 px-4 bg-purple-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Fashion Journey</h2>
        <p className="text-purple-400 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and fashion tips.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="px-5 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-fashion-purple-400 min-w-[300px]"
          />
          <Button className="bg-purple-600 text-fashion-purple-800 hover:bg-fashion-purple-100">
            Subscribe Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;