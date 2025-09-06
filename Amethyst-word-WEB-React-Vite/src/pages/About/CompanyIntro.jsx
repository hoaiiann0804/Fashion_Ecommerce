import React from 'react';
import  Button  from '../../components/ui/Button/Button';
import { ArrowRight } from 'lucide-react';

const CompanyIntro = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="rounded-lg overflow-hidden shadow-xl relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Fashion Store" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-fashion-purple-100 rounded-lg -z-10"></div>
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-fashion-purple-200 rounded-lg -z-10"></div>
        </div>
        
        <div className="space-y-6">
          <span className="text-fashion-purple-600 font-medium">Our Story</span>
          <h2 className="text-3xl md:text-4xl font-bold text-fashion-purple-900">
            We're More Than Just A Fashion Brand
          </h2>
          <p className="text-gray-600">
            Founded in 2010, our fashion brand has been dedicated to bringing style, quality, and innovation to fashion enthusiasts around the world. We believe in sustainable practices, ethical sourcing, and creating pieces that stand the test of time.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-fashion-purple-500 flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">Sustainable and ethical manufacturing processes</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-fashion-purple-500 flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">High-quality materials from trusted sources</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 rounded-full bg-fashion-purple-500 flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">Innovative designs that blend tradition with modernity</p>
            </div>
          </div>
          <Button className="bg-fashion-purple-600 hover:bg-fashion-purple-700">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;